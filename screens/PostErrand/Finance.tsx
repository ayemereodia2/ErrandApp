import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
// import { CheckBox } from '@rneui/themed';

const Finance = () => {
  const [toggleDuration, setToggleDuration] = useState(false)
  const [status, setStatus] = React.useState('checked')
  const [checked, setChecked] = useState(false)
  const [check1, setCheck1] = useState(false)

  const toggleSwitch = () => {
    setChecked(!checked)
  }

  return (
    <ScrollView>
      <View className="my-6 pl-6 pb-1">
        <Text className="text-lg">Finance</Text>
      </View>

      <View className="mx-3 shadow shadow-[#ccc]  bg-white rounded-lg">
        <View className="px-6">
          <Text className="text-xs pt-6">
            What is your budget for this errand
          </Text>
          <View className="border-b-[0.5px] flex-row justify-center items-center w-[100px]">
            <Text className="text-[13px] pt-1 pl-2">&#8358;</Text>
            <TextInput
              keyboardType="numeric"
              className="w-full border-[#acacac] text-xs py-2 rounded-xl px-1"
            />
          </View>
          <Text className="text-[12px] pt-2 text-[#5b5959] w-full">
            The going market rate for this type of errand is currently{' '}
            <Text className="text-[#243763] font-semibold">
              (&#8358; 2,000)
            </Text>
          </Text>
        </View>

        <View className="px-6 pt-8 pb-5">
          <Text className="text-[#243763] font-semibold">Insurance</Text>
          <Text className="text-[12px] text-[#5b5959] pt-4">
            Setting an Insurance value on your errand forces bidders to have
            that value in their wallet before they can bid for your errand. The
            value is then held by GOFER until the errand is completed in order
            to secure your valuables
          </Text>
          <Text className="text-[12px] text-[#5b5959] pt-2">
            Use this option sparingly as it will likely limit the number of bids
            you receive on this errand
          </Text>

          <TouchableOpacity className="flex-row items-center space-x-1 shadow-sm shadow-[#ccc] w-[150px] py-1 bg-white rounded-lg px-2 mt-7">
            <AntDesign name="Safety" size={20} color="black" />
            <Text className='text-[12px]'>Request Insurance</Text>
          </TouchableOpacity>

          <View className="flex-row pt-6 ">
            <View className='border-b-[0.5px] flex-row justify-center items-center w-[100px]'>
              <Text className="text-[13px] pt-1 pl-2">&#8358;</Text>
              <TextInput
                keyboardType="numeric"
                className="w-full border-[#acacac] text-xs py-2 rounded-xl px-2"
              />
            </View>
            <Text className='text-[12px] w-[230px] px-2 pt-1 text-[#5b5959]'>How much insurance amount do you require from Bidders for this errand?</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default Finance
