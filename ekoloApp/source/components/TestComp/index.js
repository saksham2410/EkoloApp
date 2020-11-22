import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import Search from '../Search';
import Geolocation from '@react-native-community/geolocation';
import {SCREEN_HEIGHT,SCREEN_WIDTH ,LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH/SCREEN_HEIGHT;

const App = () => {
  useEffect(() => {
    Geolocation.getCurrentPosition((info) => console.log(info));
  });

  const [region, setRegion] = useState({
    latitude: 26.841762841620753,
    longitude: 75.76300621032716,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009,
  });

  return (
    <View style={{flex: 1}}>
      <MapView
        style={{flex: 1}}
        provider='google'
        region={region}
        onRegionChangeComplete={(region) => setRegion(region)}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView>
      <Search />
    </View>
  );
};

export default App;
