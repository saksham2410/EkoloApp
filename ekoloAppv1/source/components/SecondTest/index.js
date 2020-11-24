import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Search from '../Search2/index';
import Geolocation from '@react-native-community/geolocation';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import './data2';
import './data3';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import AnimatedPlaceholder from '../AnimatedPlaceholder/AnimatedPlaceholder';
import OverlayBg from '../OverlayBg/OverlayBg';
import SlidingUpPanel from 'rn-sliding-up-panel';
import data2 from './data2';
import data3 from './data3';
// import mapStyle from './style'

const SecondComp = (props) => {
  const {onLocationSelected, type, dropFocus} = props;
  const [region, setRegion] = useState({
    latitude: 26.841762841620753,
    longitude: 75.76300621032716,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009 * ASPECT_RATIO,
  });
  const [isfocus, setisfocus] = useState(false);
  // const yoyo = (val) => {
  //   if (val === 'true' || val === 'false') setisfocus(val);
  // };
  // useEffect(() => {
  //   dropFocus(isfocus);
  //   console.log('secondtest',isfocus)
  // }, [isfocus]);

  const ref = useCallback((node) => {
    if (node !== null) {
      props.dropFocus(node.isFocused())
      console.log('ref2', node.isFocused()); // node = elRef.current
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{display: 'none'}}>
        <Fontisto name="arrow-left-l" size={24} style={{marginLeft: 10}} />
      </TouchableOpacity>
      <SafeAreaView>
        <View style={styles.card}>
          {/* <View style={styles.drop}>
            <Text style={styles.dropText}>Drop Location?</Text>
            
          </View> */}
          <SafeAreaView>
            <Search
              onLocationSelected={onLocationSelected}
              style={styles.search2}
              ref={ref}
            />
          </SafeAreaView>

          {/* <View style={styles.search}>
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
          </View> */}
          <View style={styles.bottomCard}>
            <View style={styles.bottomCardPin}>
              <Fontisto
                name="map-marker-alt"
                size={20}
                style={styles.bottomCardIcon}
              />
              <Text style={styles.bottomCardText}>
                Tap to select from the map
              </Text>
            </View>
            <TouchableOpacity style={styles.bottomCircle}>
              <Feather name="arrow-right" size={20} style={{marginRight: 20}} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
      <View style={styles.contentWrapper}>
        <Text style={styles.bigTitle}>Favorite Places</Text>
        <View style={{marginBottom: 20}}>
          {data2.map((data) => {
            return (
              <View key={data.id} style={styles.favoriteWrapper}>
                <View style={styles.favoriteWrapper2}>
                  <Fontisto
                    name="heart"
                    size={18}
                    style={{color: '#04dca0', marginRight: 10}}
                  />
                  <View>
                    <Text style={styles.favoriteTitle}>{data.title}</Text>
                    <Text style={styles.favoriteSubTitle}>{data.subtitle}</Text>
                  </View>
                </View>
                <View>
                  <Feather
                    name="minus-circle"
                    size={20}
                    style={{color: '#ff909a'}}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <Text style={styles.bigTitle}>Recently Visited Places</Text>
        {data3.map((data) => {
          return (
            <View key={data.id} style={styles.recentWrapper}>
              <MaterialCommunityIcons
                name="clock-time-five"
                size={20}
                style={{color: '#80828b', marginRight: 10}}
              />
              <Text style={styles.recentText}>{data.title}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  card: {
    paddingTop: 15,
    padding: 5,
    marginHorizontal: 10,
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius: 20,
    marginTop: 5,
    // zIndex: -100
  },
  drop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: -100,
  },
  dropText: {
    fontWeight: 'bold',
    color: 'black',
    zIndex: -100,
  },
  search: {
    marginVertical: 15,
    padding: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#efeff0',
    borderWidth: 2,
    zIndex: -100,
  },
  search2: {
    padding: 0,
    top: 15,
    zIndex: -100,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: -100,
  },
  pinkDot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#ff4858',
    marginRight: 10,
    zIndex: -100,
  },
  bottomCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 70,
    zIndex: -100,
    padding: 5
  },
  bottomCardPin: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: -100,
  },
  bottomCardIcon: {
    marginRight: 10,
    color: '#ff4858',
    zIndex: -100,
  },
  bottomCardText: {
    color: '#92939b',
    fontWeight: '500',
    fontSize: 16,
    zIndex: -100,
  },
  bottomCircle: {},
  contentWrapper: {
    paddingHorizontal: 20,
    marginTop: 40,
    zIndex: -100,
  },
  bigTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#404151',
    marginBottom: 20,
    zIndex: -100,
  },
  favoriteWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: -100,
  },
  favoriteWrapper2: {
    flexDirection: 'row',
    zIndex: -100,
  },
  favoriteTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555664',
    marginBottom: 5,
    zIndex: -100,
  },
  favoriteSubTitle: {
    color: '#a9abb8',
    zIndex: -100,
  },
  recentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: -100,
  },
  recentText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#80828b',
    zIndex: -100,
  },
});

export default SecondComp;
