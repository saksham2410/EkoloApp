import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Map from '../MapView/index';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import MapView from 'react-native-maps';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const HomeScreen = (props) => {
  const {navigation} = props;
  const [selectedCategory, setselectedCategory] = useState(1);
  const alertItemName = (item) => {
    console.log('home', item);
    setselectedCategory(item.id);
    switch (item.id) {
      case '1':
        return console.log('1');
      case '2':
        return console.log('2');
      case '3':
        return console.log('3');
      default:
        return console.log('1');
    }
  };
  return (
    <View style={{flex:1}}>
      <Map optionSelect={(item) => alertItemName(item)} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
