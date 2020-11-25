import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import data3 from './data3';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const RecentPlaces = () => {
  return (
    <View>
      <Text style={styles.bigTitle}>Recently Visited Places</Text>
      {data3.map((data) => {
        return (
          <View key={data.id} style={styles.recentWrapper}>
            <MaterialCommunityIcons
              name="clock-time-five"
              size={20}
              style={{color: '#80828b', marginRight: 10}}
            />
            <Text style={styles.recentText}>{data.title}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default RecentPlaces;

const styles = StyleSheet.create({
  recentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: -100,
  },
  recentText: {
    fontWeight: '500',
    fontSize: 14,
    color: '#80828b',
    zIndex: -100,
  },

  bigTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#404151',
    marginBottom: 20,
    zIndex: -100,
  },
});
