import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
// import {Input} from 'react-native-elements';
// import Feather from 'react-native-vector-icons/Feather';
// import Geolocation from '@react-native-community/geolocation';

export default class Search extends Component {
  //   state = {
  //     searchFocused: false,
  //   };

  render() {
    // const {searchFocused} = this.state;
    const {onLocationSelected} = this.props;
    const homePlace = {
      description: 'Home',
      geometry: {location: {lat: 48.8152937, lng: 2.4597668}},
    };
    const workPlace = {
      description: 'Work',
      geometry: {location: {lat: 48.8496818, lng: 2.2940881}},
    };
    // navigator.geolocation = require('@react-native-community/geolocation');

    return (
      <View>
        <View style={{...styless.greenDot}} />
        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            console.log(data, details, Config.MAPS_KEY);
          }}
          onPress={onLocationSelected}
          query={{
            key: 'AIzaSyB_bXhFmnZbLk9qSl3z8-1Np2QxZLbMSsY',
            language: 'en',
            components: 'country:in',
          }}
          textInputProps={{
            placeholderTextColor: '#333',
            // InputComp: Input,
            leftIcon: {type: 'font-awesome', name: 'chevron-left'},
            errorStyle: {color: 'red'},
            // onFocus: () => {
            //   this.setState({ searchFocused: true });
            // },
            // onBlur: () => {
            //   this.setState({ searchFocused: false });
            // },
            autoCapitalize: 'none',
            autoCorrect: false,
          }}
          listViewDisplayed="auto"
          fetchDetails={true}
          enablePoweredByContainer={false}
          GooglePlacesSearchQuery={{
            // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
            rankby: 'distance',
          }}
          // renderRightButton={() => <Feather name='heart' size={24}/>}
          // predefinedPlaces={[homePlace, workPlace]}
          minLength={2}
          returnKeyType={'search'}
          disableScroll
          enableHighAccuracyLocation
          // currentLocation={true}
          // currentLocationLabel='Current location'
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={200}
          styles={{
            container: {
              position: 'absolute',
              top: Platform.select({ios: 60, android: 40}),
              width: '100%',
              // shadowRadius: 150,
              // shadowOffset: {width: 20, height: 20},
              // shadowColor: 'black',
              // marginHorizontal: 20
            },
            textInputContainer: {
              flex: 1,
              backgroundColor: 'transparent',
              height: 54,
              marginHorizontal: 20,
              borderTopWidth: 0,
              borderBottomWidth: 0,
            },
            textInput: {
              height: 54,
              margin: 0,
              borderRadius: 0,
              paddingTop: 0,
              paddingBottom: 0,
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 0,
              marginLeft: 0,
              marginRight: 0,
              elevation: 5,
              shadowColor: '#000',
              shadowOpacity: 0.3,
              shadowOffset: {x: 0, y: 0},
              shadowRadius: 15,
              borderWidth: 1,
              borderColor: '#DDD',
              fontSize: 18,
            },
            listView: {
              borderWidth: 1,
              borderColor: '#DDD',
              backgroundColor: '#FFF',
              marginHorizontal: 20,
              elevation: 5,
              shadowColor: '#000',
              shadowOpacity: 0.1,
              shadowOffset: {x: 0, y: 0},
              shadowRadius: 15,
              marginTop: 10,
            },
            description: {
              fontSize: 16,
            },
            row: {
              padding: 20,
              height: 58,
            },
          }}
        />
      </View>
    );
  }
}

const styless = StyleSheet.create({
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#0ddda2',
    marginRight: 10,
  },
});
