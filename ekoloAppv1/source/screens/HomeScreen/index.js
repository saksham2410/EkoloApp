import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Map from '../MapView/index';

const alertItemName = (item) => {
  console.log('home', item);
};

const HomeScreen = () => {
  return (
    <View style={{flex: 1}}>
      <Map optionSelect={(item) => alertItemName(item)} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
