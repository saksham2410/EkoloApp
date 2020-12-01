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
  Platform,
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
import marker from '../../assets/marker_new_green_full.png';
import marker_red from '../../assets/marker_new_red.png';
import markerImage from '../../assets/marker.png';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  getReduxDrop,
  getReduxPickup,
  setReduxDrop,
  setReduxPickup,
} from '../../store/actions';
import mapStyle from '../MapView/mapstyle';
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
  const [selectPickup, setselectPickup] = useState(true);
  const [duration, setDuration] = useState(null);
  const [tempStateDrop, settempStateDrop] = useState({});
  const [pickupbutton, visiblepickupbutton] = useState(false);
  useEffect(() => {
    async function fetchMyAPI() {
      Geolocation.getCurrentPosition(
        async (info) => {
          let latitude = info.coords.latitude;
          let longitude = info.coords.longitude;
          let newAddress = await getAddressFromCoordinates(latitude, longitude);
          pickupRef.current?.setAddressText(newAddress);
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
    if (
      !_.isEmpty(pickup) &&
      _.isEmpty(dropdata) &&
      !_.isEmpty(pickupdata) &&
      selectPickup
    ) {
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
      if (res > 0.05) visiblepickupbutton(true);
      // optimise this
      dispatch(
        setReduxPickup({
          latitude,
          longitude,
          latitudeDelta: 0.009,
          longitudeDelta: 0.009 * ASPECT_RATIO,
        }),
      );
    } else if (
      !_.isEmpty(pickup) &&
      !selectPickup &&
      _.isEmpty(dropdata) &&
      !_.isEmpty(pickupdata)
    ) {
      let latitude = pickup.latitude;
      let longitude = pickup.longitude;
      settempStateDrop({
        latitude,
        longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009 * ASPECT_RATIO,
      });
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
    animateToRegion(pickupdata);
    setselectPickup(true);
  };
  const handleSelect = () => {
    setselectPickup(false);
  };
  const handleClickDrop = async () => {
    let latitude = tempStateDrop.latitude;
    let longitude = tempStateDrop.longitude;
    let newAddress = await getAddressFromCoordinates(latitude, longitude);
    dropRef.current?.setAddressText(newAddress);
    dispatch(
      setReduxDrop({
        latitude,
        longitude,
        title: newAddress,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009 * ASPECT_RATIO,
      }),
    );
    setselectPickup(true);
  };
  return (
    <View style={{flex: 1}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        // region={pickup}
        customMapStyle={mapStyle}
        onRegionChangeComplete={(pickup) => {
          handleRegionChange(pickup);
        }}
        // region={pickup}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        ref={map}
        showsMyLocationButton={false}
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
      ) : selectPickup ? (
        <Fragment>
          <SafeAreaView>
            <Search
              onLocationSelected={handleLocationSelectedPickup}
              ref={pickupRef}
            />
            <Feather
              name="menu"
              size={28}
              style={styles.menuStyle}
              onPress={() => {
                props.navigation.openDrawer();
              }}
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
          {/* <View style={}> */}

          {/* </View> */}
          <TouchableOpacity
            style={{
              ...styles.pickupButton,
              display: pickupbutton ? 'flex' : 'none',
            }}
            onPress={handleClick}>
            <Text style={{color: '#ffffff', fontSize: 16}}>Pickup here</Text>
          </TouchableOpacity>
          <SlidingUpPanel
            ref={panelRef}
            avoidKeyboard={true}
            backdropOpacity={0.2}
            draggableRange={
              pickupbutton
                ? {top: 0, bottom: 0}
                : {top: (5 * SCREEN_HEIGHT) / 6, bottom: 140}
            }
            onDragEnd={(value, gestureState) => {
              console.log(value, gestureState);
            }}
            // showBackdrop={false}
          >
            <SliderScreen
              ref={dropRef}
              onLocationSelected={handleLocationSelectedDrop}
              handleSelect={handleSelect}
            />
          </SlidingUpPanel>
        </Fragment>
      ) : (
        <Fragment>
          <TouchableOpacity style={styles.dropButton} onPress={handleClickDrop}>
          <Text style={{color: '#ffffff', fontSize: 16}}>Drop here</Text>
          </TouchableOpacity>
          <View style={styles.fakeMarker}>
            <Image style={{height: 48, width: 48}} source={marker_red} />
          </View>
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
    marginTop: Platform.select({ios: -24, android: -48}),
    position: 'absolute',
    top: '50%',
    // display: hasrideStarted ? 'none' : 'flex',
  },
  menuStyle: {
    marginLeft: 20,
    top: Platform.select({ios: 58, android: 38}),
    display: 'flex',
    color: '#000000',
    width: 28,
    // display: destination ? 'none' : 'flex',
  },
  pickupButton: {
    top: (SCREEN_HEIGHT * 2) / 3,
    // display: pickupbutton? 'flex': 'none',
    // zIndex: 100000000,
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363534',
    width: 200,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  dropButton: {
    top: (SCREEN_HEIGHT * 3) / 4,
    // zIndex: 100000000,
    backgroundColor: '#363534',
    alignContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
