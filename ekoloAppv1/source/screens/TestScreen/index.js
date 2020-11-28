import * as React from 'react';
import {Text, View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Map from '../MapView/index';
import YourRide from '../RideComplete/index';
import RentalScreen from '../RentalScreen/index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LocationScreen from '../LocationScreen/index';
import {store} from '../../store/store';
import SideMenu from './SideMenu';
const Drawer = createDrawerNavigator();
function HomeScreen() {
  return (
    <View style={{flex: 1}}>
      <Counter />
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
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map"
        component={LocationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Rental"
        component={RentalScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <SideMenu {...props} />}>
      <Drawer.Screen name="Home" component={BottomTabNavigator} />
      <Drawer.Screen name="Rental" component={RentalScreen} />
    </Drawer.Navigator>
  );
};
const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          size = 30;

          if (route.name === 'Ride') {
            iconName = 'motorbike';
          } else if (route.name === 'Rent') {
            iconName = 'alarm';
          }

          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: '#32a852',
        inactiveTintColor: '#000000',
      }}>
      <Tab.Screen name="Ride" component={MainStackNavigator} />
      <Tab.Screen name="Rent" component={RentalScreen} />
    </Tab.Navigator>
  );
};

// const Drawer = createDrawerNavigator(
//   {
//     drawer: MainStack,
//   },
//   {
//       contentComponent: SideMenu,
//     drawerWidth: (Dimensions.get('window').width * 3) / 4,
//   },
// );
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
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  );
}
