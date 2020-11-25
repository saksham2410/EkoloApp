import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import data2 from './data2';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';

const FavoritePlaces = () => {
  return (
    <View>
      <Text style={styles.bigTitle}>Favorite Places</Text>
      <View style={{marginBottom: 20}}>
        {data2.map((data) => {
          return (
            <View key={data.id} style={styles.favoriteWrapper}>
              <View style={styles.favoriteWrapper2}>
                <Fontisto
                  name="heart"
                  size={18}
                  style={{color: '#04dca0', marginRight: 10}}
                />
                <View>
                  <Text style={styles.favoriteTitle}>{data.title}</Text>
                  <Text style={styles.favoriteSubTitle}>{data.subtitle}</Text>
                </View>
              </View>
              <View>
                <Feather
                  name="minus-circle"
                  size={20}
                  style={{color: '#ff909a'}}
                />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FavoritePlaces;

const styles = StyleSheet.create({
  bigTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#404151',
    marginBottom: 20,
    zIndex: -100,
  },
  favoriteWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: -100,
  },
  favoriteWrapper2: {
    flexDirection: 'row',
    zIndex: -100,
  },
  favoriteTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555664',
    marginBottom: 5,
    zIndex: -100,
  },
  favoriteSubTitle: {
    color: '#a9abb8',
    zIndex: -100,
  },
});
