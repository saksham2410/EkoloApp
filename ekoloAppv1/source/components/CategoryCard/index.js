import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import data from './data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CateGoryCard = (props) => {
  const {optionSelect} = props;
  return (
    <View style={styles.upperCard}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={styles.category}
            onPress={() => {
              optionSelect(item);
            }}>
            <MaterialCommunityIcons name={item.icon} size={24} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CateGoryCard;

const styles = StyleSheet.create({
  upperCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: 15,
    padding: 5,
    marginHorizontal: 40,
    borderColor: '#efefef',
    borderWidth: 1,
    borderRadius: 20,
    // marginTop: 5,
    // flexDirection: 'row'
    // zIndex: -100
  },
});
