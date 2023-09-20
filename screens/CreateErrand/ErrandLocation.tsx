import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { PostErrandData } from '../../types'

interface LocationProp {
  handleInputChange: any
  postErrandData: PostErrandData
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const CreateErrandLocation = ({ setActiveStep, handleInputChange, postErrandData}: LocationProp) => {
  return (
    <>
      {/* Header */}

      <ScrollView>
        <View className="flex-row mt-[38px] items-center">
          <View className="mr-[92px] ml-4 bg-[#8098D1] b rounded-full">
            <TouchableOpacity onPress={() => setActiveStep(2)}>
              <Text className="">
                <AntDesign name="arrowleft" size={28} color="white" />
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mr-2 w-[30px] h-[30px] bg-[#6604C8] b rounded-full justify-center items-center">
            <Text className="text-white mx-auto">3</Text>
          </View>
          <Text className="font-semibold text-[#243763] text-base">
            Errand Location
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text className="text-[#777777] text-center">
            In this section, you can set the location that you want the errand
            to take place in.
          </Text>
        </View>

        <View className="mt-[56px] ml-4">
          <Text className="text-[#243763]">
            <Text className="font-semibold text-sm">Request Location </Text>
            (Provide this if you have a separate Pickup Location or Delivery
            Location)
          </Text>
        </View>

        <View className="mt-[41px] ml-4">
          <Text className="text-[#243763]">What is your Current Location?</Text>
        </View>
        <TextInput
          className="mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter current location"
          defaultValue={postErrandData.cur_loc}
          placeholderTextColor={'#B3B3B3'}
          onChangeText={(text) => handleInputChange(text, 'cur_loc')}
        />

        <View className="mt-[41px] ml-4">
          <Text className="text-[#243763]">
            What Delivery address do you want to provide?
          </Text>
        </View>
        <TextInput
          className="md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter your delivery Address"
          placeholderTextColor={'#B3B3B3'}
           defaultValue={postErrandData.del_add}
           onChangeText={(text) => handleInputChange(text, 'del_add')}
        />

        {/* <View className="mt-[41px] ml-4">
          <Text className="text-[#243763]">Google Map Address (If any)</Text>
        </View>
        <TextInput
          className="md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter your address registered on Google Maps if any."
          placeholderTextColor={'#B3B3B3'}
        ></TextInput> */}
      </ScrollView>
    </>
  )
}

export default CreateErrandLocation
