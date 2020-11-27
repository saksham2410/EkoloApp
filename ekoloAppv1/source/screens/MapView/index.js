import React, {useEffect, Fragment, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  ActivityIndicator,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import {getPixelSize} from '../../utils';

import Search from '../../components/Search';
import Directions from '../../components/Directions';
import Details from '../../components/Details';
import Geolocation from '@react-native-community/geolocation';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import marker from '../../assets/marker_new.png';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import SlidingUpPanel from 'rn-sliding-up-panel';
import SliderScreen from '../SliderScreen/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import mapStyle from './mapstyle';
import Loader from './loader';
import {useSelector, useDispatch} from 'react-redux';
import {
  getReduxDrop,
  getReduxPickup,
  setReduxDrop,
  setReduxPickup,
} from '../../store/actions';

import {NavigationContainer} from '@react-navigation/native';

import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';
import {TouchableOpacity} from 'react-native-gesture-handler';

Geocoder.init('AIzaSyB_bXhFmnZbLk9qSl3z8-1Np2QxZLbMSsY');

const Map = (props) => {
  const ref = useRef();
  const [region, setRegion] = useState(null);
  const [pickupbutton, visiblepickupbutton] = useState(false);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [pickupAddress, setPickupAddress] = useState('Pickup Location?');
  const [dropAddress, setdropAddress] = useState('Drop Location?');
  const [focusPickup, setfocusPickup] = useState(false);
  const [focusDrop, setfocusDrop] = useState(false);
  const [hasrideStarted, sethasrideStarted] = useState(false);
  const {navigation, optionSelect} = props;

  const pickupdata = useSelector((state) => state.pickup);
  const dropdata = useSelector((state) => state.drop);
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const map = useRef(null);
  const ref4 = useCallback((node) => {
    if (node !== null) {
      console.log('ref2', node); // node = elRef.current
    }
  }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      Geolocation.getCurrentPosition(
        async (info) => {
          let latitude = info.coords.latitude;
          //       latitude: 26.841762841620753,
          // longitude: 75.76300621032716,
          let longitude = info.coords.longitude;
          console.log(latitude, longitude);

          const response = await Geocoder.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          const location = address.split(',');
          setLocation(location[2] + ',' + location[3]);
          setPickupAddress(location[2] + ',' + location[3]);

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009 * ASPECT_RATIO,
          });
          setPickup({
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009 * ASPECT_RATIO,
          });
          setLoading(false);
        }, //sucesso
        () => {}, //erro
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
      // Geolocation.watchPosition(
      //   async (info) => {
      //     let latitude = info.coords.latitude;
      //     let longitude = info.coords.longitude;
      //     const newCoordinate = {
      //       latitude,
      //       longitude,
      //       latitudeDelta: 0.009,
      //       longitudeDelta: 0.009 * ASPECT_RATIO,
      //     };
      //     if (hasrideStarted) map.current.animateToRegion(newCoordinate);
      //     console.log(newCoordinate, hasrideStarted);
      //   }, //sucesso
      //   () => {}, //erro
      //   {
      //     enableHighAccuracy: true,
      //     timeout: 20000,
      //     maximumAge: 1000,
      //     distanceFilter: 50,
      //   },
      // );
    }

    fetchMyAPI();
  }, []);
  const handleLocationSelectedPickup = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    setfocusPickup(false);
    console.log(geometry);
    setPickup({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009 * ASPECT_RATIO,
    });
  };
  useEffect(() => {
    if (pickup != null) {
      let {latitude, longitude} = pickup;
      dispatch(
        setReduxPickup({
          latitude,
          longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009 * ASPECT_RATIO,
        }),
      );
      map.current && map.current.animateToRegion(pickup);
    }
  }, [pickup]);
  useEffect(() => {
    console.log('pickupButton', pickupbutton);
  }, [pickupbutton]);
  const handleLocationSelectedDrop = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    dispatch(
      setReduxDrop({
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      }),
    );
    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  };
  const handleBack = () => {
    setDestination(null);
    dispatch(setReduxDrop({}));
    setdropAddress('Drop Location?');
  };
  const handlePickupFocus = (val) => {
    if (val != null) {
      setfocusPickup(val);
    }
  };
  const handleDropFocus = (val) => {
    console.log('main', val);
    if (val != null) {
      setfocusDrop(val);
      console.log('main2', val);
    }
  };
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }
  const handleRegionChange = async (newpickup) => {
    if (newpickup != null && pickup != null) {
      let latitude = newpickup.latitude;
      let longitude = newpickup.longitude;
      let latitude2 = region.latitude;
      let longitude2 = region.longitude;
      const res1 = calcCrow(latitude, longitude, latitude2, longitude2);
      if (res1 > 0.05) visiblepickupbutton(true);
      const res = calcCrow(
        pickup.latitude,
        pickup.longitude,
        latitude,
        longitude,
      );
      console.log(res);
      setRegion(newpickup);
      dispatch(setReduxPickup(newpickup));
      if (res > 0.2) {
        let response = await Geocoder.from({latitude, longitude});
        let address = response.results[0].formatted_address;
        let location = address.split(',');
        console.log(location[3]);
        setPickupAddress(location[2] + ',' + location[3]);
      }
    }
  };
  const goToCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async (info) => {
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;
        console.log(latitude, longitude);
        dispatch(
          setReduxPickup({
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009 * ASPECT_RATIO,
          }),
        );
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009 * ASPECT_RATIO,
        });
        visiblepickupbutton(false);
        map.current &&
          map.current.animateToRegion({
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009 * ASPECT_RATIO,
          });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  };
  const handleClick = () => {
    console.log('received', pickupdata);
    visiblepickupbutton(false);
    panelRef.current.show({toValue: SCREEN_HEIGHT / 2, velocity: 50});
    console.log('region', region);
    console.log(
      'distanceeee',
      calcCrow(
        pickupdata.latitude,
        pickupdata.longitude,
        region.latitude,
        region.longitude,
      ),
    );
  };

  return (
    <View style={{flex: 1}}>
      <Loader isLoading={loading} />
      {/* {region != null && pickup != null ? ( */}
      <View style={{flex: 1}}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={region}
          // region={pickup}
          // customMapStyle={mapStyle}
          onRegionChangeComplete={(pickup) => {
            handleRegionChange(pickup);
            // setRegion(pickup);
          }}
          // region={pickup}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          ref={map}
          loadingEnabled>
          {destination && pickupdata && (
            <Fragment>
              <Directions
                origin={pickup}
                destination={dropdata}
                onReady={(result) => {
                  console.log(result);
                  // this.setState({duration: Math.floor(result.duration)});
                  setDuration(Math.floor(result.duration));

                  map.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: getPixelSize(50),
                      left: getPixelSize(50),
                      top: getPixelSize(50),
                      bottom: getPixelSize(350),
                    },
                  });
                }}
              />
              <Marker
                coordinate={destination}
                anchor={{x: 0, y: 0}}
                image={markerImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker
                coordinate={pickupdata}
                anchor={{x: 0, y: 0}}
                image={markerImage}>
                <LocationBox>
                  <LocationTimeBox>
                    <LocationTimeText>{duration}</LocationTimeText>
                    <LocationTimeTextSmall>MIN</LocationTimeTextSmall>
                  </LocationTimeBox>
                  <LocationText>{location}</LocationText>
                </LocationBox>
              </Marker>
            </Fragment>
          )}
        </MapView>
        <View
          style={{
            display: pickupbutton ? 'flex' : 'none',
            top: (SCREEN_HEIGHT * 3) / 4,
            zIndex: 100000000,
            backgroundColor: '#363534',
            width: 200,
            height: 50,
            alignSelf: 'center',
            justifyContent: 'center',
            borderRadius: 20,
          }}>
          <TouchableOpacity onPress={handleClick}>
            <Button title="Pickup here" color="#ffffff"></Button>
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 180,
            zIndex: 100000000,
            right: 30,
            borderRadius: 30,
          }}>
          <TouchableOpacity onPress={goToCurrentLocation}>
            <MaterialIcons
              name="crosshairs-gps"
              size={40}
              onPress={() => {
                goToCurrentLocation;
              }}></MaterialIcons>
          </TouchableOpacity>
        </View>

        <View
          style={{
            left: '50%',
            marginLeft: -24,
            marginTop: -21,
            position: 'absolute',
            top: '50%',
            display: hasrideStarted ? 'none' : 'flex',
          }}>
          <Image style={{height: 48, width: 48}} source={marker} />
        </View>

        {destination && pickup ? (
          <Fragment>
            <Back onPress={handleBack}>
              <Image source={backImage} />
            </Back>
            <Details />
          </Fragment>
        ) : (
          <SafeAreaView>
            <Search
              displayText={pickupAddress}
              onLocationSelected={handleLocationSelectedPickup}
              pickupFocus={handlePickupFocus}
              childFocus={handlePickupFocus}
            />
          </SafeAreaView>
        )}
        <Feather
          name="menu"
          size={35}
          style={{
            marginLeft: 20,
            top: 0,
            display: destination ? 'none' : 'flex',
          }}
          onPress={() => {
            navigation.openDrawer();
            // sethasrideStarted(false);
          }}
        />
      </View>
      <SafeAreaView>
        <SlidingUpPanel
          style={{zIndex: 1000000}}
          ref={panelRef}
          avoidKeyboard={true}
          // ref={(c) => (this._panel = c)}
          // hide=()
          draggableRange={{
            top:
              destination || pickupbutton
                ? 0
                : focusDrop
                ? (5 * SCREEN_HEIGHT) / 6
                : (5 * SCREEN_HEIGHT) / 6,
            bottom:
              destination || pickupbutton
                ? 0
                : focusDrop
                ? SCREEN_HEIGHT / 2
                : 140,
            // bottom: destination ? 0 : focusDrop ? (10*SCREEN_HEIGHT) / 11 : 140,
          }}
          onDragEnd={(value, gestureState) => {
            console.log(value, gestureState);
          }}
          showBackdrop={false}>
          <SafeAreaView
            style={{
              flex: 1,
              backgroundColor: 'white',
              position: 'relative',
            }}>
            <SliderScreen
              onLocationSelected={handleLocationSelectedDrop}
              dropFocus={handleDropFocus}
              optionSelect={optionSelect}
              dropAddress={dropAddress}
            />
          </SafeAreaView>
        </SlidingUpPanel>
      </SafeAreaView>
    </View>
  );
};

export default Map;
