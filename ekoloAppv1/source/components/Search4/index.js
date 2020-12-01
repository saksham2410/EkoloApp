import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  createRef,
} from 'react';
import {Platform, StyleSheet, View, Image} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

// import {Input} from 'react-native-elements';
import Feather from 'react-native-vector-icons/Feather';
// import Geolocation from '@react-native-community/geolocation';

const Search = React.forwardRef((props, ref) => {
  const {
    onLocationSelected,
    pickupFocus,
    childFocus,
    clearText,
    displayText,
  } = props;

  //   state = {
  //     searchFocused: false,
  //   };

  // const ref = createRef();

  const [searchFocused, setsearchFocus] = useState(false);

  // useEffect(() => {
  //   // searchFocused = ref.current?.isFocused();
  //   console.log('not here', searchFocused);
  //   setsearchFocus(ref.current?.isFocused());
  //   // pickupFocus(ref.current?.isFocused());
  // }, [ref.current?.isFocused(), searchFocused]);
  // const ref = useCallback((node) => {
  //   // if (node !== null) {
  //   props.childFocus(node);
  //   props.clearText(node);
  //   // node?.setAddressText('Demo');
  //   // if (node.isFocused() == true) node.clear();
  //   // console.log('ref', node.isFocused()); // node = elRef.current
  //   // }
  // }, []);

  // useEffect(() => {
  //   pickupFocus;
  // }, [pickupFocus]);

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
        placeholder="Pickup Location?"
        onPress={onLocationSelected}
        query={{
          key: 'AIzaSyB_bXhFmnZbLk9qSl3z8-1Np2QxZLbMSsY',
          language: 'en',
          components: 'country:in',
          location: '26.841762841620753,75.76300621032716',
          radius: '120000',
        }}
        textInputProps={{
          selectTextOnFocus: true,
          onFocus: childFocus,
          placeholderTextColor: '#333',
          // InputComp: Input,
          // leftIcon: {Feather},
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
        // renderLeftButton={() => (
        //   <Feather
        //     name="menu"
        //     size={45}
        //     style={{
        //       alignContent: 'center',
        //       alignSelf: 'center',
        //       justifyContent: 'center',
        //       backgroundColor: 'white',
        //       left:0,
        //       shadowColor: '#000',
        //       shadowOpacity: 0.1,
        //       shadowOffset: {x: 0, y: 4},
        //       shadowRadius: 15,
        //       borderWidth: 1,
        //       borderColor: '#DDD',
        //       borderRadius: 10,
        //     }}
        //   />
        // )}
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
            top: Platform.select({ios: 50, android: 30}),
            width: '100%',
            // height: '100%',
            // shadowRadius: 150,
            // shadowOffset: {width: 20, height: 20},
            // shadowColor: 'black',
            // marginHorizontal: 20
          },
          // textInputContainer: {
          //   backgroundColor: 'rgba(0,0,0,0)',
          //   borderTopWidth: 0,
          //   borderBottomWidth: 0,
          // },
          // textInput: {
          //   marginLeft: 0,
          //   marginRight: 0,
          //   height: 38,
          //   color: '#5d5d5d',
          //   fontSize: 16,
          // },
          // predefinedPlacesDescription: {
          //   color: '#1faadb',
          // },
          textInputContainer: {
            flex: 1,
            backgroundColor: 'transparent',
            height: '100%',
            marginHorizontal: 10,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            borderRadius: 10,
            width: '100%',
            height: 45,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
            paddingLeft: 40,
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
            marginHorizontal:10,
            // alignSelf: 'flex-start',
            // alignContent: 'flex-start',
            // alignItems: 'flex-start',
            // top: 50,
            marginTop: 45,
            // left: 10,
            // right: 10,
            backgroundColor: 'transparent',
            borderRadius: 5,
            flex: 1,
            elevation: 3,
            zIndex: 1000,
            margin: 0,
          },
          row: {
            padding: 20,
            height: 58,
            // backgroundColor: 'black'
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
