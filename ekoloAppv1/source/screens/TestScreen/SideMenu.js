import React, {Component} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const vw = Dimensions.get('window').width / 100;
const vh = Dimensions.get('window').height / 100;

const SideMenu = (props) => {
  const [cDarkTheme, setcDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setcDarkTheme(!cDarkTheme);
  };
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.userInfoSection}>
          <View style={{flexDirection: 'row', marginTop: 15}}>
            {/* <Avatar.Image 
                            // source={require('../images/123.jpg')}
                            size={50}
                        /> */}
            <View style={{marginLeft: 15, flexDirection: 'column'}}>
              <Title style={styles.title}>Saksham Gupta</Title>
              <Caption style={styles.caption}>Rider Account</Caption>
            </View>
          </View>
        </View>
        {/* Drawer Section */}
        <Drawer.Section style={{marginTop: 20, marginLeft: 10}}>
          <DrawerItem
            icon={() => (
              <Icon
                name="home-outline"
                style={{fontSize: 2.8 * vh, color: 'grey'}}
              />
            )}
            label="Home"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />

          <DrawerItem
            icon={() => (
              <Icon
                name="account-outline"
                style={{fontSize: 2.8 * vh, color: 'grey'}}
              />
            )}
            label="Profile"
            onPress={() => {
              props.navigation.navigate('Rental');
            }}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="wallet-outline"
                style={{fontSize: 2.8 * vh, color: 'grey'}}
              />
            )}
            label="Wallet"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="account-arrow-left"
                style={{fontSize: 2.8 * vh, color: 'grey'}}
              />
            )}
            label="Settings"
            onPress={() => {
              props.navigation.navigate('Rental');
            }}
          />
          <DrawerItem
            icon={() => (
              <Icon
                name="account-check-outline"
                style={{fontSize: 2.8 * vh, color: 'grey'}}
              />
            )}
            label="Support"
            onPress={() => {
              props.navigation.navigate('Home');
            }}
          />
        </Drawer.Section>

        <Drawer.Section title="Choose Preferences">
          <TouchableRipple
            onPress={() => {
              toggleTheme();
            }}>
            <View style={styles.preference}>
              <Text>Dark Theme</Text>
              <View pointerEvents="none">
                <Switch value={cDarkTheme} />
              </View>
            </View>
          </TouchableRipple>
        </Drawer.Section>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={() => (
            <Icon
              name="exit-to-app"
              style={{fontSize: 2.8 * vh, color: 'grey'}}
            />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default SideMenu;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 3 * vh,
    marginTop: 25,
  },
  title: {
    fontSize: 2 * vh,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 2 * vh,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 1 * vh,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 1.5 * vh,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 1 * vw,
  },
  drawerSection: {
    marginTop: 1.5 * vh,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
