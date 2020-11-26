import React, {useEffect, Fragment, useState, useRef, useCallback} from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  Button,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import {getPixelSize} from '../../utils';

import Search from '../../components/Search';
import Directions from '../../components/Directions';
import Details from '../../components/Details';
import Geolocation from '@react-native-community/geolocation';
import Feather from 'react-native-vector-icons/Feather';
import marker from '../../assets/marker_new.png';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import SlidingUpPanel from 'rn-sliding-up-panel';
import SliderScreen from '../SliderScreen/index';
import {createDrawerNavigator} from '@react-navigation/drawer';
import mapStyle from './mapstyle';

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
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);
  const [pickup, setPickup] = useState(null);
  const [currentLocation, setcurrentLocation] = useState(null);
  const [focusPickup, setfocusPickup] = useState(false);
  const [focusDrop, setfocusDrop] = useState(false);
  const [hasrideStarted, sethasrideStarted] = useState(false);
  const {navigation, optionSelect} = props;

  const map = useRef(null);
  const ref4 = useCallback((node) => {
    if (node !== null) {
      console.log('ref2', node); // node = elRef.current
    }
  }, []);
  //   state = {
  //     region: null,
  //     destination: null,
  //     duration: null,
  //     location: null,
  //     pickup: null,
  //   };

  useEffect(() => {
    async function fetchMyAPI() {
      Geolocation.getCurrentPosition(
        async (info) => {
          // console.log(info);
          let latitude = info.coords.latitude;
          //       latitude: 26.841762841620753,
          // longitude: 75.76300621032716,
          let longitude = info.coords.longitude;
          const response = await Geocoder.from({latitude, longitude});
          const address = response.results[0].formatted_address;
          const location = address.substring(0, address.indexOf(','));
          setLocation(location);
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
        }, //sucesso
        () => {}, //erro
        {
          timeout: 2000,
          enableHighAccuracy: true,
          maximumAge: 1000,
        },
      );
      Geolocation.watchPosition(
        async (info) => {
          // console.log(info);
          let latitude = info.coords.latitude;
          //       latitude: 26.841762841620753,
          // longitude: 75.76300621032716,
          let longitude = info.coords.longitude;
          const newCoordinate = {
            latitude,
            longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009 * ASPECT_RATIO,
          };
          // const response = await Geocoder.from({latitude, longitude});
          // const address = response.results[0].formatted_address;
          // const location = address.substring(0, address.indexOf(','));
          // setcurrentLocation(newCoordinate);
          if (hasrideStarted) map.current.animateToRegion(newCoordinate);
          console.log(newCoordinate, hasrideStarted);
        }, //sucesso
        () => {}, //erro
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 50,
        },
      );
    }

    fetchMyAPI();
  }, []);
  const handleLocationSelectedPickup = (data, {geometry}) => {
    setfocusPickup(false);
    // const {
    //   location: {lat: latitude, lng: longitude},
    // } = geometry;
    setPickup({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009 * ASPECT_RATIO,
    });
  };
  useEffect(() => {
    map.current && map.current.animateToRegion(pickup);
    // ref.current?.animateToRegion(pickup);
  }, [pickup]);
  // useEffect(() => {
  //   map.current && map.current.animateToRegion(currentLocation);
  //   // ref.current?.animateToRegion(pickup);
  // }, [currentLocation]);
  // useEffect(() => {
  //   console.log(focusPickup);
  // }, [focusPickup]);

  const handleLocationSelectedDrop = (data, {geometry}) => {
    // console.log(data,geometry)
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });
  };

  const handleBack = () => {
    setDestination(null);
  };
  const handlePickupFocus = (val) => {
    if (val != null) {
      setfocusPickup(val);
      // console.log(val);
    }
  };
  const handleDropFocus = (val) => {
    console.log('main', val);
    if (val != null) {
      setfocusDrop(val);
      console.log('main2', val);
    }
  };

  // const MarkerDrag = (coordinate, position) => {
  //   console.log(coordinate, position);
  //   setPickup(coordinate);
  // };
  const AnimateRegion = (pickup) => {};

  return (
    <View style={{flex: 1}}>
      {/* <TouchableOpacity>
        <Text>Hello</Text>
      </TouchableOpacity> */}
      {/* <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator> */}
      {region != null && pickup != null ? (
        <View style={{flex: 1}}>
          <MapView
            style={StyleSheet.absoluteFillObject}
            initialRegion={pickup}
            // region={pickup}
            // customMapStyle={mapStyle}
            onRegionChangeComplete={(pickup) => {
              setRegion(pickup);

              //
            }}
            // region={pickup}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            ref={map}
            loadingEnabled>
            {destination && pickup && (
              <Fragment>
                <Directions
                  origin={pickup}
                  destination={destination}
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
                  coordinate={pickup}
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

            {/* <Marker
              coordinate={pickup}
              anchor={{x: 0, y: 0}}
              draggable
              image={markerImage}
              isPreselected={true}
              title="Your Location"

              // onDragEnd={(e) => setPickup(e.nativeEvent.coordinate)}
              // onDragEnd={(e) => console.log(e)}
            /> */}
          </MapView>
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
                onLocationSelected={handleLocationSelectedPickup}
                type="pickup"
                pickupFocus={handlePickupFocus}
                childFocus={handlePickupFocus}
              />
              {/* <Search
                onLocationSelected={handleLocationSelectedDrop}
                type="drop"
              /> */}
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
      ) : (
        <View>
          <Text>Loading</Text>
        </View>
      )}
      <SlidingUpPanel
        style={{zIndex: 1000000}}
        // ref={(c) => (this._panel = c)}
        draggableRange={{
          top: destination ? 0 : focusDrop ? 10*SCREEN_HEIGHT/11 :10*SCREEN_HEIGHT/11,
          bottom: destination ? 0 : focusDrop ? SCREEN_HEIGHT / 2 : 140,
        }}
        onDragEnd={(value, gestureState) => {
          console.log(value, gestureState);
        }}
        // height={
        //   destination || focusPickup
        //     ? 0
        //     : focusDrop
        //     ? SCREEN_HEIGHT
        //     : SCREEN_HEIGHT
        // }
        // height={draggableRange}
        // onMomentumDragStart={(value, gestureState) => {
        //   console.log(value, gestureState);
        // }}
        // animatedValue={this._draggedValue}
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
          />
        </SafeAreaView>
      </SlidingUpPanel>
    </View>
  );
};

export default Map;
