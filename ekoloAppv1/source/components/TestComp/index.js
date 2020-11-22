import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, SafeAreaView} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Search from '../Search';
import Geolocation from '@react-native-community/geolocation';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import Feather from 'react-native-vector-icons/Feather';
import {TouchableOpacity} from 'react-native-gesture-handler';
// import mapStyle from './style'

const App = () => {
  // useEffect(() => {
  //   Geolocation.getCurrentPosition((info) => console.log(info));
  // });

  const [region, setRegion] = useState({
    latitude: 26.841762841620753,
    longitude: 75.76300621032716,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009 * ASPECT_RATIO,
  });

  return (
    <View style={{flex: 1}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        // customMapStyle={mapStyle}
        // onRegionChangeComplete={(region) => setRegion(region)}
      >
        {/* <Marker
        coordinate={{latitude: region.latitude, longitude: region.longitude}}
      /> */}
      </MapView>
      <View>
        <SafeAreaView style={{...styles.container}}>
          <View>
            <Feather name="menu" size={24} />
          </View>
          <TouchableOpacity style={{...styles.search}}>
            <View style={{...styles.inputWrapper}}>
              <View style={{...styles.greenDot}} />
              <View style={{...styles.inputText}}>
                <Text>Pickup location?</Text>
                <Search/>
              </View>
            </View>
            <View>
              <Feather name="heart" size={20} />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },
  search: {
    marginVertical: 20,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greenDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#0ddda2',
    marginRight: 10,
  },
  inputText: {},
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default App;
