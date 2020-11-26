import React, {useEffect, useRef, useCallback} from 'react';
import {Platform, StyleSheet, View, Image, Text} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Comp from '../TestComp/index';
// import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Geolocation from '@react-native-community/geolocation';

const Search = React.forwardRef((props, ref) => {
  //   state = {
  //     searchFocused: false,
  //   };

  // const ref = useRef();
  // const dropFocused = ref.current?.isFocused();

  // useEffect(() => {
  //   console.log(dropFocused);
  // }, [dropFocused]);

  // const {searchFocused} = this.state;
  const {onLocationSelected, type, dropFocus, dropAddress} = props;
  console.log('drop', dropAddress);
  useEffect(() => {
    ref.current?.setAddressText(dropAddress);
  }, []);
  // const ref = useCallback((node) => {
  //   if (node !== null) {
  //     props.dropFocus(node.isFocused())
  //     // console.log('ref', node.isFocused()); // node = elRef.current
  //   }
  // }, []);
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
      <View />
      <GooglePlacesAutocomplete
        ref={ref}
        placeholder={dropAddress}
        // onPress={(data, details) => {
        //   // 'details' is provided when fetchDetails = true
        //   console.log(data, details);
        // }}
        onPress={onLocationSelected}
        query={{
          key: 'AIzaSyB_bXhFmnZbLk9qSl3z8-1Np2QxZLbMSsY',
          language: 'en',
          components: 'country:in',
          location: '26.841762841620753,75.76300621032716',
          radius: '1200000',
          // strictbounds: true
        }}
        // renderRow={(results) => {
        //   if(results.types[0]==='university')
        //   return (
        //     <>
        //       {results.type[0]==='university'?<MaterialCommunityIcons name='school'/>:results.type[0]===''}
        //       <Text>{results.description}</Text>
        //     </>
        //   );
        // }}
        textInputProps={{
          // onFocus,
          placeholderTextColor: '#333',
          // InputComp: Input,
          // leftIcon: {type: 'font-awesome', name: 'chevron-left'},
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
        // GooglePlacesDetailsQuery={{
        //   fields: 'icon',
        // }}
        // renderLeftButton={() => (
        //   <Feather
        //     name="menu"
        //     size={25}
        //     style={{
        //       alignContent: 'center',
        //       alignSelf: 'center',
        //       justifyContent: 'center',
        //       backgroundColor: 'transparent',
        //     }}
        //   />
        // )}
        // predefinedPlaces={[homePlace, workPlace]}
        minLength={2}
        returnKeyType={'search'}
        // disableScroll
        enableHighAccuracyLocation
        // currentLocation={true}
        // currentLocationLabel='Current location'
        nearbyPlacesAPI="GooglePlacesSearch"
        debounce={200}
        styles={{
          container: {
            position: 'absolute',
            top: 10,
            // type === 'pickup'
            //   ? Platform.select({ios: 50, android: 30})
            //   : Platform.select({ios: 0, android: 90}),
            width: '100%',
            zIndex: 1000,
            // shadowRadius: 150,
            // shadowOffset: {width: 20, height: 20},
            // shadowColor: 'black',
            // marginHorizontal: 20
          },
          textInputContainer: {
            backgroundColor: 'transparent',
            marginTop: 0,
            width: '100%',
            padding: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            // backgroundColor: '#F9F5F4',
            borderRadius: 10,
            width: '100%',
            height: 45,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            paddingLeft: 30,
            fontSize: 15,
            elevation: 0,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowOffset: {x: 0, y: 4},
            shadowRadius: 15,
            borderWidth: 1,
            borderColor: '#DDD',
            fontSize: 18,
          },
          description: {
            color: 'black',
            fontWeight: '300',
            fontWeight: '400',
          },
          listView: {
            position: 'absolute',
            top: 50,
            left: 10,
            right: 10,
            backgroundColor: 'transparent',
            borderRadius: 5,
            flex: 1,
            elevation: 3,
            zIndex: 1000,
            margin: 0,
          },
          // description: {
          //   fontSize: 16,
          //   // zIndex: 10000
          // },
          row: {
            padding: 20,
            height: 58,
            // zIndex: 100000
          },
        }}
      />
    </View>
  );
});

export default Search;

const styless = StyleSheet.create({
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#0ddda2',
    marginRight: 10,
  },
});
