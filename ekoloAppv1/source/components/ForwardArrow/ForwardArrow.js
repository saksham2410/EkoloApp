import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet} from 'react-native';
import Animated, { interpolate } from 'react-native-reanimated';
import { LOGIN_VIEW_HEIGHT } from '../../Constants';

const ForwardArrow = ({keyboardHeight}) => {
    const opacity = interpolate(keyboardHeight, {
        inputRange: [0,keyboardHeight],
        outputRange: [0,1],
    })
    return(
  <Animated.View
    style={{...styles.ForwardArrow, opacity: opacity, transform: [{translateY: keyboardHeight}]}}>
    <Icon name="east" size={24} color='white'/>
  </Animated.View>)
};

export default ForwardArrow;

const styles = StyleSheet.create({
  ForwardArrow: {
    position: 'absolute',
    height: 60,
    width: 60,
    right:10,
    bottom: LOGIN_VIEW_HEIGHT/2,
    zIndex: 1000000000,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: 'black'
  },
});
