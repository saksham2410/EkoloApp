/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, View, Button} from 'react-native';
import * as React from 'react';
import Comp from './source/components/TestComp/index';
import SecondComp from './source/components/SecondTest/index';
import Map from './source/screens/MapView/index';
import HomeScreen from './source/screens/HomeScreen/index';
import Login from './source/App';
import {name as appName} from './app.json';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MapView from 'react-native-maps';
const Drawer = createDrawerNavigator();

const NotificationsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

const AppDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => App);
