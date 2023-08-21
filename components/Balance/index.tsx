import { Fontisto, MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { ImageBackground, StyleSheet, Switch, Text, View } from 'react-native'
import { formatMoney } from '../../utils/helper'

export default function index() {
  return (
    <View>
      <View className="w-full h-44 shadow-lg  mt-6 rounded-lg">
        <ImageBackground
          source={require('../../assets/images/cards.jpeg')}
          resizeMode="cover"
          className="w-full rounded-lg"
          style={style.container}
        >
          <View className="flex-row items-center justify-between p-3">
            <Text className="text-xs">Available balance</Text>

            <View className="flex-row justify-center items-center">
              <Text className="text-xs">Hide</Text>
              <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </View>
          </View>

          <Text className="text-2xl px-3">{formatMoney(3000)}</Text>

          <Text className="text-xs px-3 pt-10">
            {' '}
            **** <Text>3445</Text>
          </Text>
        </ImageBackground>
      </View>

      <View className="bg-white text-[#243763] px-4 rounded-lg py-3 w-28 mt-4 shadow-lg">
        <Text>Fund Wallet</Text>
      </View>

      <View className="mt-6 space-y-4">
        <View className="w-full h-20 bg-white shadow-lg rounded-lg flex-row items-center justify-center border-[0.3px]">
          <View className="flex-row justify-center items-center space-x-4">
            <MaterialCommunityIcons name="piggy-bank" size={30} />
            <View>
              <Text className="text-[#757575] sm">Escrow</Text>
              <Text className="text-xl font-bold">{formatMoney(30000)}</Text>
            </View>
          </View>
        </View>
        <View className="w-full h-20 bg-white border-[0.3px] shadow-lg rounded-lg flex-row items-center justify-center">
          <View className="flex-row justify-center items-center space-x-4">
            <Fontisto name="money-symbol" size={30} />
            <View>
              <Text className="text-[#757575] text-sm">Incoming Funds</Text>
              <Text className="text-xl font-bold">{formatMoney(4000)}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="mt-4 border-b-[0.3px]">
        <Text className="font-semibold text-base border-[4px]">
          Escrow Breakdown
        </Text>
      </View>

      <View className="pt-3 px-2 flex-row justify-between items-center">
        <View>
          <Text className="pb-1 font-semibold">I need a Washer</Text>
          <Text className="">20-03-23</Text>
        </View>
        <Text>{formatMoney(4000)}</Text>
      </View>
      <View className="pt-3 px-2 flex-row justify-between items-center">
        <View>
          <Text className="pb-1 font-semibold">I need a Washer</Text>
          <Text className="">20-03-23</Text>
        </View>
        <Text>{formatMoney(4000)}</Text>
      </View>
      <View className="pt-3 px-2 flex-row justify-between items-center">
        <View>
          <Text className="pb-1 font-semibold">I need a Washer</Text>
          <Text className="">20-03-23</Text>
        </View>
        <Text>{formatMoney(4000)}</Text>
      </View>
      <View className="pt-3 px-2 flex-row justify-between items-center">
        <View>
          <Text className="pb-1 font-semibold">I need a Washer</Text>
          <Text className="">20-03-23</Text>
        </View>
        <Text>{formatMoney(4000)}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    height: 173,
    width: 355,
    borderRadius: 100,
    overflow: 'hidden',
  },
})
