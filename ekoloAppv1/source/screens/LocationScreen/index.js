import React, {
  useEffect,
  Fragment,
  useState,
  useRef,
  useCallback,
  createRef,
} from 'react';
import _ from 'lodash';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import {useSelector, useDispatch} from 'react-redux';
import Geocoder from 'react-native-geocoding';
import Feather from 'react-native-vector-icons/Feather';
import Search from '../../components/Search4';
import SlidingUpPanel from 'rn-sliding-up-panel';
import SliderScreen from '../SliderScreen/index';
import marker from '../../assets/marker_new.png';
import markerImage from '../../assets/marker.png';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getReduxDrop,
  getReduxPickup,
  setReduxDrop,
  setReduxPickup,
} from '../../store/actions';
import Directions from '../../components/Directions';
import Details from '../../components/Details';
import backImage from '../../assets/back.png';
import {
  Back,
  LocationBox,
  LocationText,
  LocationTimeBox,
  LocationTimeText,
  LocationTimeTextSmall,
} from './styles';
import {getPixelSize} from '../../utils';

const LocationScreen = (props) => {
  const pickupdata = useSelector((state) => state.pickup);
  const dropdata = useSelector((state) => state.drop);
  const dispatch = useDispatch();
  const panelRef = useRef(null);
  const pickupRef = createRef();
  const dropRef = createRef();
  const map = useRef(null);
  const [region, setRegion] = useState(null);
  const [focusPickup, setfocusPickup] = useState(false);
  const [duration, setDuration] = useState(null);
  const [dropAddress, setdropAddress] = useState('Drop Location?');
  const [pickupbutton, visiblepickupbutton] = useState(false);
  const [focusDrop, setfocusDrop] = useState(false);
  //   const [pickupAddress, setPickupAddress] = useState('Pickup Location?');
  useEffect(() => {
    async function fetchMyAPI() {
      Geolocation.getCurrentPosition(
        async (info) => {
          let latitude = info.coords.latitude;
          let longitude = info.coords.longitude;
          let newAddress = await getAddressFromCoordinates(latitude, longitude);
          pickupRef.current?.setAddressText(newAddress);
          //   let newAddress = await getAddressFromCoordinates(latitude, longitude);
          //   const response = await Geocoder.from({latitude, longitude});
          //   const address = response.results[0].formatted_address;
          //   const location = address.split(',');
          //   setLocation(location[2] + ',' + location[3]);
          //   setPickupAddress(location[2] + ',' + location[3]);

          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009 * ASPECT_RATIO,
          });
          dispatch(
            setReduxPickup({
              latitude,
              longitude,
              latitudeDelta: 0.009,
              longitudeDelta: 0.009 * ASPECT_RATIO,
            }),
          );
        }, //sucesso
        () => {}, //erro
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
    }

    fetchMyAPI();
  }, []);
  const handleLocationSelectedPickup = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    dispatch(
      setReduxPickup({
        latitude,
        longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009 * ASPECT_RATIO,
      }),
    );
    animateToRegion({
      latitude,
      longitude,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009 * ASPECT_RATIO,
    });
  };
  const handlePickupFocus = (val) => {
    if (val?.isFocused() == true || false) {
      setfocusPickup(val.isFocused());
    }
  };
  const goToCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async (info) => {
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;
        animateToRegion({
          latitude,
          longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009 * ASPECT_RATIO,
        });
        let newAddress = await getAddressFromCoordinates(latitude, longitude);
        pickupRef.current?.setAddressText(newAddress);
        visiblepickupbutton(false);
        panelRef.current?.show({toValue: 140, velocity: 50});
        dispatch(
          setReduxPickup({
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009 * ASPECT_RATIO,
          }),
        );
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  };
  const animateToRegion = (obj) => {
    map && map.current && map.current.animateToRegion(obj);
  };
  const getAddressFromCoordinates = async (latitude, longitude) => {
    let response = await Geocoder.from({latitude, longitude});
    let address = response.results[0].formatted_address;
    let location = address.split(',');
    // setPickupAddress(location[2] + ',' + location[3]);
    return location[2] + ',' + location[3];
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
  const handleRegionChange = async (pickup) => {
    if (!_.isEmpty(pickup) && _.isEmpty(dropdata) && !_.isEmpty(pickupdata)) {
      let latitude = pickup.latitude;
      let longitude = pickup.longitude;
      let latitude2 = pickupdata.latitude;
      let longitude2 = pickupdata.longitude;
      const res = calcCrow(
        pickup.latitude,
        pickup.longitude,
        latitude2,
        longitude2,
      );
      if (res > 0.2) {
        let newAddress = await getAddressFromCoordinates(latitude, longitude);
        pickupRef.current?.setAddressText(newAddress);
      }
      // const res1 = calcCrow(latitude,longitude,origin.latitude)
      if (res > 0.05) visiblepickupbutton(true); // optimise this
      dispatch(
        setReduxPickup({
          latitude,
          longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009 * ASPECT_RATIO,
        }),
      );
    }
  };
  const handleLocationSelectedDrop = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    // dropRef.current?.setAddressText
    dispatch(
      setReduxDrop({
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009 * ASPECT_RATIO,
      }),
    );
  };
  //   const handleDropFocus = (val) => {
  //     if (val?.isFocused() == true || false) {
  //       setfocusDrop(val.isFocused());
  //     }
  //   };
  const handleClick = () => {
    visiblepickupbutton(false);
    panelRef.current?.show({toValue: SCREEN_HEIGHT / 2, velocity: 50});
  };
  const handleBack = () => {
    dropRef.current?.setAddressText('Drop Location?');
    dispatch(setReduxDrop({}));
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        // region={pickup}
        // customMapStyle={mapStyle}
        onRegionChangeComplete={(pickup) => {
          handleRegionChange(pickup);
        }}
        // region={pickup}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        ref={map}
        loadingEnabled>
        {!_.isEmpty(dropdata) && !_.isEmpty(pickupdata) && (
          <Fragment>
            <Directions
              origin={pickupdata}
              destination={dropdata}
              onReady={(result) => {
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
              coordinate={dropdata}
              anchor={{x: 0, y: 0}}
              image={markerImage}>
              <LocationBox>
                <LocationText>{dropdata.title}</LocationText>
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
                <LocationText>Pickup</LocationText>
              </LocationBox>
            </Marker>
          </Fragment>
        )}
      </MapView>
      {!_.isEmpty(dropdata) && !_.isEmpty(pickupdata) ? (
        <Fragment>
          <Back onPress={handleBack}>
            <Image source={backImage} />
          </Back>
          <Details />
        </Fragment>
      ) : (
        <Fragment>
          <SafeAreaView>
            <Search
              //   displayText={pickupAddress}
              onLocationSelected={handleLocationSelectedPickup}
              ref={pickupRef}
            />
          </SafeAreaView>
          <View style={styles.locationIcon}>
            <TouchableOpacity onPress={goToCurrentLocation}>
              <MaterialIcons name="crosshairs-gps" size={40}></MaterialIcons>
            </TouchableOpacity>
          </View>

          <View style={styles.fakeMarker}>
            <Image style={{height: 48, width: 48}} source={marker} />
          </View>
          <View style={styles.menuStyle}>
            <Feather
              name="menu"
              size={35}
              onPress={() => {
                props.navigation.openDrawer();
              }}
            />
          </View>
          <TouchableOpacity style={styles.pickupButton}>
            <Button
              title="Pickup here"
              color="#ffffff"
              onPress={handleClick}></Button>
          </TouchableOpacity>
          <Button title="Show panel" />
          <SlidingUpPanel
            ref={panelRef}
            avoidKeyboard={true}
            draggableRange={
              pickupbutton
                ? {top: 0, bottom: 0}
                : {top: (5 * SCREEN_HEIGHT) / 6, bottom: 140}
              // bottom: destination ? 0 : focusDrop ? (10*SCREEN_HEIGHT) / 11 : 140,
            }
            onDragEnd={(value, gestureState) => {
              console.log(value, gestureState);
            }}
            // showBackdrop={false}
          >
            <SliderScreen
              ref={dropRef}
              onLocationSelected={handleLocationSelectedDrop}
              //   optionSelect={optionSelect}
              //   dropAddress={dropAddress}
            />
          </SlidingUpPanel>
        </Fragment>
      )}
    </View>
  );
};

export default LocationScreen;

const styles = StyleSheet.create({
  locationIcon: {
    position: 'absolute',
    bottom: 180,
    // zIndex: 100000000,
    right: 30,
    borderRadius: 30,
  },
  fakeMarker: {
    left: '50%',
    marginLeft: -24,
    marginTop: -21,
    position: 'absolute',
    top: '50%',
    // display: hasrideStarted ? 'none' : 'flex',
  },
  menuStyle: {
    marginLeft: 20,
    top: 0,
    // display: destination ? 'none' : 'flex',
  },
  pickupButton: {
    top: (SCREEN_HEIGHT * 2) / 3,
    // zIndex: 100000000,
    backgroundColor: '#363534',
    width: 200,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
