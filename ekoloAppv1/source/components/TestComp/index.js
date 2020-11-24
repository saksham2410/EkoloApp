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
import {TouchableOpacity} from 'react-native-gesture-handler';
import AnimatedPlaceholder from '../AnimatedPlaceholder/AnimatedPlaceholder';
import OverlayBg from '../OverlayBg/OverlayBg';
import SlidingUpPanel from 'rn-sliding-up-panel';
import Animated, {
  useCode,
  cond,
  eq,
  set,
  interpolate,
  SpringUtils,
  call,
  Easing,
} from 'react-native-reanimated';
import {
  withTimingTransition,
  onGestureEvent,
  withSpringTransition,
  delay,
} from 'react-native-redash/lib/module/v1';
// import {SCREEN_HEIGHT, LOGIN_VIEW_HEIGHT} from './Constants';
import {
  TextInput,
  TapGestureHandler,
  State,
} from 'react-native-gesture-handler';
// import mapStyle from './style'
import SecondComp from '../SecondTest/index';

const Comp = () => {
  // useEffect(() => {
  //   Geolocation.getCurrentPosition((info) => console.log(info));
  // });
  const scale = useRef(new Animated.Value(0));
  const isOpen = useRef(new Animated.Value(0));
  const isOpenAnimation = withSpringTransition(isOpen.current, {
    ...SpringUtils.makeDefaultConfig(),
    overshootClamping: true,
    damping: new Animated.Value(20),
  });

  const outerLoginY = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, LOGIN_VIEW_HEIGHT / 2],
  });
  const scaleAnimation = withTimingTransition(scale.current);

  const [region, setRegion] = useState({
    latitude: 26.841762841620753,
    longitude: 75.76300621032716,
    latitudeDelta: 0.009,
    longitudeDelta: 0.009 * ASPECT_RATIO,
  });
  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0, 1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0],
  });
  const textInputRef = useRef(null);
  const gestureState = useRef(new Animated.Value(State.UNDETERMINED));
  const gestureHandler = onGestureEvent({state: gestureState.current});

  return (
    <View style={{flex: 1}}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        // customMapStyle={mapStyle}
        onRegionChangeComplete={(region) => setRegion(region)}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
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
                <Search />
              </View>
            </View>
            <View>
              <Feather name="heart" size={20} />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
      <SlidingUpPanel
        ref={(c) => (this._panel = c)}
        draggableRange={{top: SCREEN_HEIGHT, bottom: 165}}
        onDragEnd={(value, gestureState) => {
          console.log(value, gestureState);
        }}
        // onMomentumDragStart={(value, gestureState) => {
        //   console.log(value, gestureState);
        // }}
        animatedValue={this._draggedValue}
        showBackdrop={false}>
          <SafeAreaView style={styles.panel}>
          <SecondComp />
        </SafeAreaView>
      </SlidingUpPanel>
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
    alignItems: 'center',
  },
  panel: {
    flex: 1,
    backgroundColor: 'white',
    position: 'relative',
  },
  panelHeader: {
    height: 120,
    backgroundColor: '#b197fc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteIcon: {
    position: 'absolute',
    top: -24,
    right: 24,
    backgroundColor: '#2b8a3e',
    width: 48,
    height: 48,
    padding: 8,
    borderRadius: 24,
    zIndex: 1,
  },
});

export default Comp;
