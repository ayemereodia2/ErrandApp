import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, Switch, Text, TextInput, View } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'

const PostErrandDetails = () => {
  const countries = ['Mins', 'Hours', 'Days', 'Weeks']
  const [toggleDuration, setToggleDuration] = useState(false)
  const [status, setStatus] = React.useState('checked')
  const [checked, setChecked] = useState(false)
  const [check1, setCheck1] = useState(false)

  const toggleSwitch = () => {
    setChecked(!checked)
  }

  return (
    <ScrollView>
      <View className="my-6 pl-6 pb-3">
        <Text className="text-lg">Errand Details</Text>
      </View>

      <View className="mx-3 shadow-sm bg-white rounded-lg">
        <View className="px-6">
          <Text className="text-xs pt-6">
            Give us more information about your errand
          </Text>
          <TextInput
            numberOfLines={4}
            multiline={true}
            className="w-full border-[1px] border-[#acacac] text-xs py-3 mt-1 rounded-xl px-3 h-20"
          />
        </View>

        <View className="px-6">
          <Text className="text-sm pt-6 text-[#243763] font-semibold">
            Duration
          </Text>

          <Text className="text-[12px] pt-2 pb-2">No time limit</Text>
          <View className=" h-10">
            <Switch
              trackColor={{ false: 'green', true: '#ccc' }}
              // thumbColor={checked ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={checked}
            />
          </View>

          <View className="flex-row items-center pb-4">
            <View className="w-36 h-9 bg-white rounded-lg flex-row items-center justify-between mt-4 shadow-md ">
              <View className="w-12 h-9 bg-[#243763] rounded-l-lg flex-row justify-center items-center">
                <Entypo name="plus" size={16} color="white" />
              </View>
              <Text className="text-xl">1</Text>
              <View className="w-12 h-9 bg-[#243763] rounded-r-lg flex-row justify-center items-center">
                <Entypo name="minus" size={16} color="white" />
              </View>
            </View>

            <View className="pl-4">
              <Text>units</Text>
              <SelectDropdown
                data={countries}
                onSelect={(selectedItem, index) => {
                  console.log(selectedItem, index)
                }}
                buttonStyle={{
                  width: 150,
                  height: 30,
                  borderBottomColor: '#ccc',
                  borderStyle: 'solid',
                  backgroundColor: 'white',
                }}
                buttonTextStyle={{
                  fontSize: 14,
                  shadowOpacity: 1,
                  shadowColor: '#ccc',
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextStyle={{ fontSize: 14, borderRadius:10 }}
                rowStyle={{ height: 20, borderRadius:30, padding:2 }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
              />
            </View>
          </View>
        </View>

        <View className="px-6 flex-row justify-end space-x-4 pt-2">
          <View className="flex-row items-center">
            <Ionicons
              name="add-circle"
              size={18}
              color="black"
              className="mr-2"
            />
            <Text className="text-[12px]">Add Photo</Text>
          </View>
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="record-circle"
              size={18}
              color="black"
            />
            <Text className="text-[12px]">Send Audio</Text>
          </View>
        </View>

        <View className="my-8 rounded-lg w-[150px] ml-2 ">
          <View className="flex-row items-center justify-center">
            <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
            <Text className="text-[12px]">Advanced Option</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

export default PostErrandDetails
