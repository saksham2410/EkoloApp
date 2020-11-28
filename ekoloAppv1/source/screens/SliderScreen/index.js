import React, {useState, useRef, useEffect, useCallback, createRef} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Button,
  TextInput,
} from 'react-native';
import Search from '../../components/Search2/index';
import Geolocation from '@react-native-community/geolocation';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import {TouchableOpacity} from 'react-native-gesture-handler';
import CateGoryCard from '../../components/CategoryCard';
import RecentPlaces from '../../components/RecentPlaces';
import FavoritePlaces from '../../components/FavoritePlaces';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
const SliderScreen = React.forwardRef((props,ref) => {
  const {
    onLocationSelected,
    type,
    dropFocus,
    optionSelect,
    dropAddress,
    handleSelect
  } = props;
  // tempRef = 

  // const ref = useCallback((node) => {
  //   if (node !== null) {
  //     props.dropFocus(node);
  //     // props.setAddress(node.setAddressText())
  //   }
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={{display: 'none'}}>
        <Fontisto name="arrow-left-l" size={24} style={{marginLeft: 10}} />
      </TouchableOpacity>

      <View>
        <View style={styles.card}>
          <View>
            <Search
              onLocationSelected={onLocationSelected}
              style={styles.search2}
              ref={ref}
              dropAddress={dropAddress}
            />
          </View>

          <View style={styles.bottomCard}>
            <TouchableOpacity style={styles.bottomCardPin} onPress={handleSelect}>
              <Fontisto
                name="map-marker-alt"
                size={20}
                style={styles.bottomCardIcon}
              />
              <Text style={styles.bottomCardText}>
                Tap to select from the map
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.bottomCircle}>
              <Feather name="arrow-right" size={20} style={{marginRight: 20}} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.contentWrapper}>
        {/* <FavoritePlaces /> */}
        <RecentPlaces />
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  category: {
    alignItems: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  card1: {
    margin: 20,
    zIndex: 1,
  },
  upperCard: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 15,
    padding: 5,
    marginHorizontal: 10,
    borderColor: '#efefef',
    width: '100%',
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 10,
    marginTop: 5,
    // flexDirection: 'row'
    // zIndex: -100
  },
  card: {
    // paddingTop: 15,
    paddingBottom: 5,
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
  search2: {
    padding: 0,
    top: 15,
    zIndex: -100,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // zIndex: -100,
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
    padding: 5,
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
});

export default SliderScreen;
