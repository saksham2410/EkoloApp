import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {SCREEN_HEIGHT, SCREEN_WIDTH, LOGIN_VIEW_HEIGHT} from '../../Constants';
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;

const RentalDatePicker = (props) => {
  const {type, timeValue} = props;
  const state = {date: '2016-05-15'};
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };
  return (
    <View
      style={{
        borderColor: '#32a852',
        elevation: 5,
        borderWidth: 2,
        borderRadius: 20,
        margin: 15,
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          // marginHorizontal: 40,
          padding: 20,
          flexDirection: 'row',
          // width: '100%'
        }}>
        <Text style={{fontWeight: '500', fontSize: 18, left: SCREEN_WIDTH / 5}}>
          {type} Date :
        </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          style={{width: '100%', left: (SCREEN_WIDTH * 2) / 5}}
          is24Hour={true}
          display="default"
          onChange={timeValue}
        />
      </View>

      <View
        style={{
          alignItems: 'center',
          justifyContent: 'space-around',
          // marginHorizontal: 40,
          padding: 20,
          flexDirection: 'row',
          // width: '100%'
        }}>
        <Text
          style={{
            fontWeight: '500',
            fontSize: 18,
            left: SCREEN_WIDTH / 5,
          }}>
          {type} Time :
        </Text>
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="time"
          minuteInterval={15}
          style={{width: '100%', left: (SCREEN_WIDTH * 2) / 5}}
          is24Hour={true}
          display="default"
          onChange={timeValue}
        />
      </View>
    </View>
  );
};

export default RentalDatePicker;

const styles = StyleSheet.create({});
