import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import data from './data';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CateGoryCard = (props) => {
  const {optionSelect} = props;
  const [selected, setselected] = useState('1');
  const setIconcolor = (item) => {
    setselected(item.id);
  };
  return (
    <View style={styles.upperCard}>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={item.id}
            style={
              selected == item.id ? styles.categorySelected : styles.category
            }
            onPress={() => {
              optionSelect(item);
              setIconcolor(item);
            }}>
            <MaterialCommunityIcons
              name={item.icon}
              size={30}
              style={{color: '#32a852'}}
            />
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
    justifyContent: 'space-around',
    flexDirection: 'row',
    paddingTop: 15,
    padding: 5,
    marginHorizontal: 10,
    borderColor: '#efefef',
    // borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    // flexDirection: 'row'
    // zIndex: -100
  },
  category: {
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
    // padding: 10,
    // borderRadius: 15
  },
  categorySelected: {
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
  },
});
