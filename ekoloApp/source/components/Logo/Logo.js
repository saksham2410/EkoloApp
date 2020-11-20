import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

const Logo = ({scale}) => {
  return (
    <Animated.View style={{...styles.logo, transform: [{scale}]}}>
      <Text style={{fontWeight: '400', fontSize: 36}}>Ekolo</Text>
    </Animated.View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    height: 120,
    width: 120,
    padding: 10,
  },
});
