import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React, { useCallback } from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import Label from '../Slider/Label'
import Notch from '../Slider/Notch'
import Rail from '../Slider/Rail'
import RailSelected from '../Slider/RailSelected'
import Thumb from '../Slider/Thumb'

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

  const handleValueChange = useCallback(
    (lowValue: number, highValue: number) => {
      setMinCheck(true)
      setLow(lowValue)
      setHigh(highValue)
    },
    [],
  )

  const handleMinInputChange = (text: any) => {
    setMinCheck(true)
    const formattedInput = text
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    setLow(formattedInput)
  }

  const handleMaxInputChange = (text: any) => {
    setMinCheck(true)
    const formattedInput = text
      .replace(/\D/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    setHigh(formattedInput)
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
      <Text
        style={{ fontFamily: 'Chillax-Medium' }}
        className="leading-6 text-base mt-4 text-[#6D6D6D] pl-4"
      >
        Price Range
      </Text>

      <View className="flex-row items-center mt-2 px-6 space-x-2">
        <View className="w-6/12">
          <Text className=" text-[#393F42]" style={{ fontFamily: 'Axiforma' }}>
            Min
          </Text>
          <View className=" bg-white border border-[#96A0A5] mt-2 py-1.5 rounded-lg text-center px-2">
            <BottomSheetTextInput
              placeholder="Minimum Range"
              keyboardType="numeric"
              placeholderTextColor={'#AAA'}
              onChangeText={handleMinInputChange}
              value={low.toString()} // Bind the value to 'low'
              style={{ fontFamily: 'Axiforma' }}
            />
          </View>
        </View>

        <View className="w-6/12">
          <Text className="text-[#393F42]" style={{ fontFamily: 'Axiforma' }}>
            Max
          </Text>
          <View className=" bg-white border border-[#96A0A5] mt-2 py-1.5 rounded-lg text-center px-2">
            <BottomSheetTextInput
              placeholder="Maximum Range"
              keyboardType="numeric"
              placeholderTextColor={'#AAA'}
              onChangeText={handleMaxInputChange}
              value={high.toString()} // Bind the value to 'high'
              style={{ fontFamily: 'Axiforma' }}
            />
          </View>
        </View>
      </View>
      {/* </KeyboardAvoidingView> */}
    </>
  )
}

export default RangeSlider
