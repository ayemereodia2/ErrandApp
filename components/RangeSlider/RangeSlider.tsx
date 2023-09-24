import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import Slider from 'rn-range-slider';
import Thumb from '../Slider/Thumb';
import Rail from '../Slider/Rail';
import RailSelected from '../Slider/RailSelected';
import Notch from '../Slider/Notch';
import Label from '../Slider/Label';

const RangeSlider = () => {
  const [low, setLow] = useState(1000);
  const [high, setHigh] = useState(30000);

  const renderThumb = useCallback((name: 'high' | 'low') => <Thumb name={name} />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);
  const renderLabel = useCallback(value => <Label text={value} />, []);
  const renderNotch = useCallback(() => <Notch />, []);

  const handleValueChange = useCallback((lowValue, highValue) => {
    setLow(lowValue);
    setHigh(highValue);
  }, []);

  const handleMinInputChange = (text) => {
    
      setLow(text);
    
  };

  const handleMaxInputChange = (text) => {
    
        setHigh(text);

     
    
  };

  return (
    <>
      <ScrollView className='mt-12'>
        <Text className='font-medium text-base leading-6'>Price Range</Text>

        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}>
          <TextInput
            placeholder='Minimum Range'
            keyboardType="numeric"
            placeholderTextColor={'#AAA'}
            className='w-[320px] h-[44px] bg-white border-[0.5px] border-[#DDD] mx-auto mr-3 pl-2 mt-2 text-center'
            onChangeText={handleMinInputChange}
            value={low.toString()} // Bind the value to 'low'
          />

          <TextInput
            placeholder='Maximum Range'
            keyboardType="numeric"
            placeholderTextColor={'#AAA'}
            className='w-[320px] h-[44px] bg-white border-[0.5px] border-[#DDD] mx-auto mr-3 pl-2 mt-2 text-center'
            onChangeText={handleMaxInputChange}
            value={high.toString()} // Bind the value to 'high'
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View className='mt-12 mx-auto w-[300px]'>
        <Slider
          min={1000}
          max={30000}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
          initialLowValue={low}
          initialHighValue={high}
        />

        <View className='flex-row justify-around items-center mt-5'>
          <View className='bg-[#1E3A79] w-[120px] h-12 px-4 py-2 rounded-3xl mr-5 items-center justify-center'>
            <Text className='text-center text-white text-base font-bold leading-6 '>&#x20A6; {low}</Text>
          </View>

          <View className='bg-[#1E3A79] w-[120px] h-12 px-4 py-2 rounded-3xl items-center justify-center'>
            <Text className='text-center text-white text-base font-bold leading-6 '>&#x20A6; {high}</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default RangeSlider;
