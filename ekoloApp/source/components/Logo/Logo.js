import React from 'react';
import Animated from 'react-native-reanimated';
import {View, Text, StyleSheet, Image} from 'react-native';

const Logo = ({scale}) => (
  <Animated.View style={{...styles.logo, transform: [{scale}]}}>
    <Image
      source={require('../../assets/ekolo.png')}
      style={{...styles.image}}
    />
    {/* <Text style={{fontWeight: '400', fontSize: 36}}>Ekolo</Text> */}
  </Animated.View>
);
export default Logo;

const styles = StyleSheet.create({
  logo: {
    backgroundColor: 'white',
    height: 120,
    width: 120,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 160,
    width: 160,
    resizeMode: 'contain',
    shadowRadius: 8,
    shadowOpacity: 0.8
  },
});
