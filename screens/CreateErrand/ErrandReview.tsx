import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View, ScrollView } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'

const ErrandReview = ({ navigation }: any) => {
  return (
    <>
      {/* Header */}

      <View className="w-[430px] h-[120px] bg-[#243763] items-center justify-center">
        <Text className="text-center text-white mt-6 font-semibold text-xl mr-2">
          Create Errand
        </Text>
      </View>

      <ScrollView>
        <View className="flex-row mt-[38px] items-center">
          <View className="mr-[92px] ml-4 bg-[#8098D1] b rounded-full">
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text className="">
                <AntDesign name="arrowleft" size={28} color="white" />
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mr-2 w-[30px] h-[30px] bg-[#6604C8] b rounded-full justify-center items-center">
            <Text className="text-white mx-auto">5</Text>
          </View>
          <Text className="font-semibold text-[#243763] text-base">
            Errand Review
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text className="text-[#777777] text-center">
            In this section, you can set the location that you want the errand
            to take place in.
          </Text>
        </View>

        <View className="w-[390px] b border-b-[3px] ml-4 mt-[56px] border-[#EEEEEE]">
          <Text className="text-[#243763] font-semibold text-[20px]">
            Errand Category
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Category Type</Text>
          <Text className="font-medium text-base text-[#333333]">Services</Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Activity</Text>
          <Text className="font-medium text-base text-[#333333]">
            Baby Sitting
          </Text>
        </View>

        <View className="w-[390px] b border-b-[3px] ml-4 mt-[56px] border-[#EEEEEE]">
          <Text className="text-[#243763] font-semibold text-[20px]">
            Errand Details
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Description</Text>
          <Text className="font-medium text-base text-[#333333]">
            I want someone who is good with watching over babies within the age
            of 0-3 years old while i go out for a conference meeting.
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Activity</Text>
          <Text className="font-medium text-base text-[#333333]">
            Baby Sitting
          </Text>
        </View>

        <View className="mt-4 ml-4">
          <Text className="text-[#3F60AC]">Supporting Images</Text>
        </View>
        <ScrollView horizontal className="ml-4 mt-4">
          <Image
            source={require('../../assets/images/pawpaw.jpg')}
            className="w-[100px] h-[100px] mr-4 rounded-xl"
          />
          <Image
            source={require('../../assets/images/pawpaw1.jpg')}
            className="w-[100px] h-[100px] mr-4 rounded-xl"
          />
          <Image
            source={require('../../assets/images/meme.jpg')}
            className="w-[100px] h-[100px] mr-4 rounded-xl"
          />
        </ScrollView>

        <View className="mt-4 ml-4">
          <Text className="text-[#3F60AC]">Supporting Audio</Text>
        </View>
        <View className="flex-row mt-3 w-[378px] h-[70px] mx-auto bg-[#011E3E] items-center justify-center b rounded-lg">
          <Text className="">
            <AntDesign name="play" size={24} color="white" />
          </Text>
          <Text className="text-white p-2">0:22</Text>
          <Image
            source={require('../../assets/images/slider.jpg')}
            className="w-[175px] h-1 mr-2"
          />
          <Text className="text-white p-2">1:40</Text>
          <Text>
            <AntDesign name="delete" size={24} color="white" />
          </Text>
        </View>

        <View className="ml-4 mt-10">
          <Text className="text-[#314B87] font-normal text-base">
            Restrict Errand by Qualification
          </Text>
          <Text>Yes</Text>
        </View>

        <View className="ml-4 mt-10">
          <Text className="text-[#314B87] font-normal text-base">
            Restrict Errand by Verification
          </Text>
          <Text>Yes</Text>
        </View>

        <View className="ml-4 mt-10">
          <Text className="text-[#314B87] font-normal text-base">
            Restrict Errand by Insurance
          </Text>
          <Text>No</Text>
        </View>

        <View className="w-[390px] b border-b-[3px] ml-4 mt-[56px] border-[#EEEEEE]">
          <Text>Errand Location</Text>
        </View>
        <View></View>

        {/* Proceed Button */}

        <TouchableOpacity onPress={() => navigation.navigate('ErrandReview')}>
          <View className="w-[300px] h-[50px] bg-[#243763] mt-[553px] mb-[37px] mx-auto items-center justify-center">
            <Text className="text-white text-center items-center">
              Proceed to Errand Location{' '}
              <AntDesign name="arrowright" size={18} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

export default ErrandReview
