import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Search from '../Search';
import Geolocation from '@react-native-community/geolocation';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import Feather from 'react-native-vector-icons/Feather';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import AnimatedPlaceholder from '../AnimatedPlaceholder/AnimatedPlaceholder';
import OverlayBg from '../OverlayBg/OverlayBg';
import SlidingUpPanel from 'rn-sliding-up-panel';
// import mapStyle from './style'

const SecondComp = () => {
  const [region, setRegion] = useState({
    latitude: 26.841762841620753,
    longitude: 75.76300621032716,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009 * ASPECT_RATIO,
  });

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.card}>
          <View style={styles.drop}>
            <Text style={styles.dropText}>Drop Location?</Text>
            <TouchableOpacity>
              <Feather name="x" size={24} />
            </TouchableOpacity>
          </View>
          <View style={styles.search}>
            <View style={styles.inputWrapper}>
              <View style={styles.pinkDot} />
              <TextInput
                placeholder="Where are you going?"
                placeholderTextColor="#afb1b6"
              />
            </View>
            <View>
              <Feather name="heart" size={24} />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  card: {
    padding: 20,
    marginHorizontal: 10,
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 30,
  },
  drop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropText: {
    fontWeight: 'bold',
    color: 'black',
  },
  search: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#efeff0',
    borderWidth: 2,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pinkDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ff4858',
    marginRight: 10
  },
});

export default SecondComp;
