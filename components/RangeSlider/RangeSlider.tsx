import React, { useCallback } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native'
import Slider from 'rn-range-slider'
import Label from '../Slider/Label'
import Notch from '../Slider/Notch'
import Rail from '../Slider/Rail'
import RailSelected from '../Slider/RailSelected'
import Thumb from '../Slider/Thumb'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

interface Prop {
  low: number
  high: number
  setLow: React.Dispatch<React.SetStateAction<number>>
  setHigh: React.Dispatch<React.SetStateAction<number>>
  setMinCheck: React.Dispatch<React.SetStateAction<boolean>>
}

const RangeSlider = ({ low, setHigh, setLow, high, setMinCheck }: Prop) => {
  const renderThumb = useCallback(
    (name: 'high' | 'low') => <Thumb name={name} />,
    [],
  )
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderLabel = useCallback((value: string) => <Label text={value} />, [])
  const renderNotch = useCallback(() => <Notch />, [])

  const handleValueChange = useCallback((lowValue: number, highValue: number) => {
    setMinCheck(true)
    setLow(lowValue)
    setHigh(highValue)
  }, [])

  const handleMinInputChange = (text: any) => {
    setMinCheck(true)
    setLow(text)
  }

  const handleMaxInputChange = (text: any) => {
    setMinCheck(true)
    setHigh(text)
  }

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <>
      <ScrollView className="mt-12">
        <Text className="font-medium text-base leading-6" style={{color: textTheme}}>Price Range</Text>

        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <TextInput
            placeholder="Minimum Range"
            keyboardType="numeric"
            placeholderTextColor={'#AAA'}
            className="w-[320px] h-[44px] bg-white border-[0.5px] border-[#DDD] mx-auto mr-3 pl-2 mt-2 text-center"
            onChangeText={handleMinInputChange}
            value={low.toString()} // Bind the value to 'low'
          />

          <TextInput
            placeholder="Maximum Range"
            keyboardType="numeric"
            placeholderTextColor={'#AAA'}
            className="w-[320px] h-[44px] bg-white border-[0.5px] border-[#DDD] mx-auto mr-3 pl-2 mt-2 text-center"
            onChangeText={handleMaxInputChange}
            value={high.toString()} // Bind the value to 'high'
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <View className="mt-12 mx-auto w-[300px]">
        {/* <Slider
          low={low}
          high={high}
          min={0}
          max={300000}
          step={1}
          floatingLabel
          renderThumb={renderThumb}
          renderRail={renderRail}
          renderRailSelected={renderRailSelected}
          renderLabel={renderLabel}
          renderNotch={renderNotch}
          onValueChanged={handleValueChange}
        /> */}

        <View className="flex-row justify-around items-center mt-5">
          <View className="bg-[#1E3A79] w-[120px] h-12 px-4 py-2 rounded-3xl mr-5 items-center justify-center">
            <Text className="text-center text-white text-base font-bold leading-6 ">
              &#x20A6; {low}
            </Text>
          </View>

          <View className="bg-[#1E3A79] w-[120px] h-12 px-4 py-2 rounded-3xl items-center justify-center">
            <Text className="text-center text-white text-base font-bold leading-6 ">
              &#x20A6; {high}
            </Text>
          </View>
        </View>
      </View>
    </>
  )
}

export default RangeSlider
