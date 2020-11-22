import React, {useEffect, Fragment, useState} from 'react';
import {View, Image, StyleSheet, SafeAreaView} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';

import {getPixelSize} from '../../utils';

import Search from '../../components/Search';
import Directions from '../../components/Directions';
import Details from '../../components/Details';
import Geolocation from '@react-native-community/geolocation';

import markerImage from '../../assets/marker.png';
import backImage from '../../assets/back.png';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

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
  const [region, setRegion] = useState(null);
  const [destination, setDestination] = useState(null);
  const [duration, setDuration] = useState(null);
  const [location, setLocation] = useState(null);
  const [pickup, setPickup] = useState(null);

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
          console.log(info);
          let latitude = info.coords.latitude;

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

          //   this.setState({
          //     location,
          //     region: {
          //       latitude,
          //       longitude,
          //       latitudeDelta: 0.009,
          //       longitudeDelta: 0.009 * ASPECT_RATIO,
          //     },
          //     pickup: {
          //       latitude,
          //       longitude,
          //       latitudeDelta: 0.009,
          //       longitudeDelta: 0.009 * ASPECT_RATIO,
          //     },
          //   });
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

  //   async componentDidMount() {
  //     Geolocation.getCurrentPosition(
  //       async (info) => {
  //         console.log(info);
  //         let latitude = info.coords.latitude;
  //         let longitude = info.coords.longitude;
  //         const response = await Geocoder.from({latitude, longitude});
  //         const address = response.results[0].formatted_address;
  //         const location = address.substring(0, address.indexOf(','));

  //         this.setState({
  //           location,
  //           region: {
  //             latitude,
  //             longitude,
  //             latitudeDelta: 0.009,
  //             longitudeDelta: 0.009 * ASPECT_RATIO,
  //           },
  //           pickup: {
  //             latitude,
  //             longitude,
  //             latitudeDelta: 0.009,
  //             longitudeDelta: 0.009 * ASPECT_RATIO,
  //           },
  //         });
  //       }, //sucesso
  //       () => {}, //erro
  //       {
  //         timeout: 2000,
  //         enableHighAccuracy: true,
  //         maximumAge: 1000,
  //       },
  //     );
  //   }
  const handleLocationSelectedPickup = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;
    setPickup({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
      latitudeDelta: 0.009,
      longitudeDelta: 0.009 * ASPECT_RATIO,
    });

    // this.setState({
    //   pickup: {
    //     latitude,
    //     longitude,
    //     title: data.structured_formatting.main_text,
    //     latitudeDelta: 0.009,
    //     longitudeDelta: 0.009 * ASPECT_RATIO,
    //   },
    // });
  };

  const handleLocationSelectedDrop = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    setDestination({
      latitude,
      longitude,
      title: data.structured_formatting.main_text,
    });

    // this.setState({
    //   destination: {
    //     latitude,
    //     longitude,
    //     title: data.structured_formatting.main_text,
    //   },
    // });
  };

  const handleBack = () => {
    setDestination(null);
    // this.setState({destination: null});
  };

  const MarkerDrag = (coordinate, position) => {
    console.log(coordinate, position);
    setPickup(coordinate);
    // this.setState({pickup: coordinate});
  };
  //   const {region, destination, duration, location, pickup} = this.state;

  return (
    <View style={{flex: 1}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={region}
        // region={pickup}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        loadingEnabled
        ref={(el) => (this.mapView = el)}>
        {destination && pickup && (
          <Fragment>
            <Directions
              origin={pickup}
              destination={destination}
              onReady={(result) => {
                console.log(result);
                // this.setState({duration: Math.floor(result.duration)});
                setDuration(Math.floor(result.duration));

                this.mapView.fitToCoordinates(result.coordinates, {
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
              coordinate={(region.latitude, region.longitude)}
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

        <Marker
          coordinate={pickup}
          draggable
          isPreselected={true}
          onDragEnd={(e) => setPickup(e.nativeEvent.coordinate)}
        />
      </MapView>

      {destination ? (
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
          />
          <Search onLocationSelected={handleLocationSelectedDrop} type="drop" />
        </SafeAreaView>
      )}
    </View>
  );
};

export default Map;
