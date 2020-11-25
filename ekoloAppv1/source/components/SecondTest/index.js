import React, {useState, useRef, useEffect, useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  Button,
} from 'react-native';
import Search from '../Search2/index';
import Geolocation from '@react-native-community/geolocation';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
import {TouchableOpacity} from 'react-native-gesture-handler';
import CateGoryCard from '../../components/CategoryCard';
import RecentPlaces from '../../components/RecentPlaces';
import FavoritePlaces from '../../components/FavoritePlaces';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
const SecondComp = (props) => {
  const {onLocationSelected, type, dropFocus, optionSelect} = props;

  const ref = useCallback((node) => {
    if (node !== null) {
      props.dropFocus(node.isFocused());
      console.log('ref2', node.isFocused()); // node = elRef.current
    }
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{display: 'none'}}>
        <Fontisto name="arrow-left-l" size={24} style={{marginLeft: 10}} />
      </TouchableOpacity>
      <SafeAreaView>
        <CateGoryCard optionSelect={optionSelect} />
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
            <TouchableOpacity style={styles.bottomCardPin}>
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
      </SafeAreaView>
      <SafeAreaView style={styles.contentWrapper}>
        <FavoritePlaces />
        <RecentPlaces />
      </SafeAreaView>
    </View>
  );
};

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

export default SecondComp;
