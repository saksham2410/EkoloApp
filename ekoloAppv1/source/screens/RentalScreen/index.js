import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CateGoryCard from '../../components/CategoryCard';
import RentalDatePicker from '../../components/RentalDatePicker';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const RentalScreen = () => {
  const state = {date: '2016-05-15'};
  const [date, setDate] = useState(new Date(1598051730000));
  const handlestartDate = (val) => {
    console.log(val);
  };
  const onChangePickup = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    // setDate(currentDate);
    console.log('here', currentDate);
  };
  const onChangeDrop = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    // setShow(Platform.OS === 'ios');
    // setDate(currentDate);
    console.log('there', currentDate);
  };
  return (
    <View style={styles.container}>
      {/* <CateGoryCard optionSelect={(item) => console.log(item)} /> */}
      <Image
        source={require('../../assets/scooter.png')}
        style={{width: 150, height: 150, alignSelf: 'center', marginTop: 40}}
      />

      <View>
        <View style={{marginTop: 40}}>
          <RentalDatePicker type="Pickup" timeValue={onChangePickup} />
        </View>
        <View style={{marginTop:40}}>
          <RentalDatePicker type="DropOff" timeValue={onChangeDrop} />
        </View>
      </View>
      <TouchableOpacity
        // onPress={onPress}
        style={[styles.appButtonContainer]}>
        <Text style={styles.appButtonText}>Confirm !</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RentalScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: '#009688',
    borderRadius: 10,
    margin: 20,
    marginTop:50,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  appButtonText: {
    // marginTop:
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  bookcard: {
    // paddingTop: 15,
    // display: 'flex',
    // // flex: 1,
    // // flexDirection: 'row',
    // justifyContent: 'center',
    // alignContent: 'center',
    // // paddingBottom: 5,
    // width: '100%',
    // marginHorizontal: SCREEN_WIDTH / 3,
    // padding: 20,
    // borderColor: '#efefef',
    // borderWidth: 1,
    // borderRadius: 20,
    // marginTop: 5,
  },
});
