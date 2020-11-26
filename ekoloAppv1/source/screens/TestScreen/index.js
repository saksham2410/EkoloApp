import * as React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../MapView/index';
import RentalScreen from '../RentalScreen/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
// const Drawer = createDrawerNavigator();

function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <Map />
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1}}>
      <RentalScreen />
    </View>
  );
}

const Tab = createBottomTabNavigator();

// const navOptionHandler = (navigation) => ({
//     header:null
// })

// const MapStack = createStackNavigator({
//     RideView: {
//         screen: RideView,
//         navigationOptions: navOptionHandler
//     },
//     TrackView: {
//         screen: TrackView,
//         navigationOptions: navOptionHandler
//     }
// })

// const RentalStack = createStackNavigator({
//     RentalView: {
//         screen: RentalView,
//         navigationOptions: navOptionHandler
//     },
//     BookingView: {
//         screen: BoookingView,
//         navigationOptions: navOptionHandler
//     }
// })

export default function App2() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            size=30

            if (route.name === 'Ride') {
              iconName = 'motorbike';
            } else if (route.name === 'Rent') {
              iconName = 'alarm';
            }

            // You can return any component that you like here!
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size}
                color={color}
              />
            );
          },
        })}
        tabBarOptions={{
          activeTintColor: '#32a852',
          inactiveTintColor: '#000000',
        }}>
        <Tab.Screen name="Ride" component={HomeScreen} />
        <Tab.Screen name="Rent" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
