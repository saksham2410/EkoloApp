import React, {Component, Fragment} from 'react';
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

export default class Map extends Component {
  state = {
    region: null,
    destination: null,
    duration: null,
    location: null,
  };

  async componentDidMount() {
    Geolocation.getCurrentPosition(
      async (info) => {
        console.log(info);
        let latitude = info.coords.latitude;
        let longitude = info.coords.longitude;
        const response = await Geocoder.from({latitude, longitude});
        const address = response.results[0].formatted_address;
        const location = address.substring(0, address.indexOf(','));

        this.setState({
          location,
          region: {
            latitude,
            longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
          },
        });
      }, //sucesso
      () => {}, //erro
      {
        timeout: 2000,
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  }

  handleLocationSelected = (data, {geometry}) => {
    const {
      location: {lat: latitude, lng: longitude},
    } = geometry;

    this.setState({
      destination: {
        latitude,
        longitude,
        title: data.structured_formatting.main_text,
      },
    });
  };

  handleBack = () => {
    this.setState({destination: null});
  };

  render() {
    const {region, destination, duration, location} = this.state;

    return (
      <View style={{flex: 1}}>
        <MapView
          style={StyleSheet.absoluteFillObject}
          initialRegion={region}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          loadingEnabled
          ref={(el) => (this.mapView = el)}>
          {destination && (
            <Fragment>
              <Directions
                origin={region}
                destination={destination}
                onReady={(result) => {
                  console.log(result);
                  this.setState({duration: Math.floor(result.duration)});

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
                coordinate={destination}
                anchor={{x: 0, y: 0}}
                image={markerImage}>
                <LocationBox>
                  <LocationText>{destination.title}</LocationText>
                </LocationBox>
              </Marker>

              <Marker
                coordinate={region}
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

        {destination ? (
          <Fragment>
            <Back onPress={this.handleBack}>
              <Image source={backImage} />
            </Back>
            <Details />
          </Fragment>
        ) : (
          <Search onLocationSelected={this.handleLocationSelected} />
        )}
      </View>
    );
  }
}
