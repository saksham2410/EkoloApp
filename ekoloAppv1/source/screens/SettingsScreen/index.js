import React, {useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import StringsOfLanguages from './StringsOfLanguages';

const SettingsScreen = ({navigation}) => {
  const lang = [
    {shortform: 'hi', longform: 'Hindi'},
    {shortform: 'ma', longform: 'Marathi'},
    {shortform: 'en', longform: 'English'},
    {shortform: 'fr', longform: 'French'},
  ];

  const settext = (value) => {
    console.log(value);
    // StringsOfLanguages.setLanguage(value);
    // navigation.navigate('ContentScreen', {selectedLanguage: value});
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.menuStyle}>
        <Feather
          name="menu"
          size={35}
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.headingStyle}>
          Please Select Preferred Language
        </Text>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/language.png',
          }}
          style={styles.imageStyle}
        />
        <ScrollView style={{marginTop: 30, width: '80%'}}>
          {lang.map((item, key) => (
            <View style={styles.elementContainer} key={key}>
              <TouchableOpacity onPress={() => settext(item.shortform)}>
                <Text style={styles.textStyle}>{item.longform}</Text>
              </TouchableOpacity>
              <View style={styles.saparatorStyle} />
            </View>
          ))}
        </ScrollView>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey',
          }}></Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey',
          }}>
          Ekolo - Ride the green wave
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginTop: 40,
  },
  headingStyle: {
    color: '#191919',
    fontSize: 25,
    textAlign: 'center',
  },
  imageStyle: {
    width: 64,
    height: 64,
    marginTop: 30,
  },
  elementContainer: {
    width: '100%',
    marginTop: 30,
    alignItems: 'center',
  },
  textStyle: {
    color: '#191919',
    fontSize: 25,
  },
  saparatorStyle: {
    height: 0.5,
    width: '60%',
    backgroundColor: '#C2C2C2',
    marginTop: 10,
  },
  menuStyle: {
    marginLeft: 20,
    top: 0,
    // display: destination ? 'none' : 'flex',
  },
});

export default SettingsScreen;
