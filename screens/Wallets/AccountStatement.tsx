import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DatePicker from 'react-native-community/datetimepicker';


const AccountStatement = () => {

    const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const displayDates = () => {
    if (startDate && endDate) {
      return (
        <View>
          <Text>Start Date: {startDate}</Text>
          <Text>End Date: {endDate}</Text>
        </View>
      );
    } else {
      return <Text>Please select start and end dates.</Text>;
    }
  };

  return (
    <View>
    <Text>Select Start Date:</Text>
    <DatePicker
      style={{ width: 200 }}
      date={startDate}
      mode="date"
      format="YYYY-MM-DD"
      onDateChange={handleStartDateChange}
    />
    <Text>Select End Date:</Text>
    <DatePicker
      style={{ width: 200 }}
      date={endDate}
      mode="date"
      format="YYYY-MM-DD"
      onDateChange={handleEndDateChange}
    />
    <Button title="Display Dates" onPress={displayDates} />
    {displayDates()}
  </View>
);
};



export default AccountStatement