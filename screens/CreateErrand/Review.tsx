import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { PostErrandData } from '../../types'
import { ImageViewer } from './Details'

interface ReviewProp {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  postErrandData: PostErrandData
}
const ErrandReview = ({ setActiveStep, postErrandData }: ReviewProp) => {
  return (
    <>
      {/* Header */}

      <ScrollView>
        <View className="flex-row mt-[38px] items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">5</Text>
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

        <View className="border-b-[1px] px-4 pb-2 mt-14 border-[#EEEEEE]">
          <Text className="text-[#243763] font-semibold text-base">
            Errand Category
          </Text>
        </View>

        <View className="ml-4 mt-3">
          <Text className="font-bold text-[14px]">Category Type</Text>
          <Text className="font-medium text-base text-[#333333]">
            {postErrandData.type}
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Activity</Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.categoryName}
          </Text>
        </View>

        <View className="border-b-[1px] px-4 pb-2 mt-6 border-[#EEEEEE]">
          <Text className="text-[#243763] font-semibold text-base">
            Errand Details
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Description</Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.description}
          </Text>
        </View>

        <Text className="font-bold text-[14px] pl-4 pt-4">Images</Text>
        <View className="pl-4 flex-row space-x-3">
          {postErrandData?.images.map((img, index) => {
            return (
              <ImageViewer selectedImage={img} removeImage={''} index={index} />
            )
          })}
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Budget</Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.budget}
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Location</Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.currentLocation}
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Insurance</Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.insurance}
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">Insurance Amount</Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.ins_amount.toLocaleString()}
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">
            Restrict Errand by Qualification
          </Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.res_by_qualification}
          </Text>
        </View>

        <View className="ml-4 mt-6">
          <Text className="font-bold text-[14px]">
            Restrict Errand by Verification
          </Text>
          <Text className="font-light text-base text-[#333333]">
            {postErrandData.res_by_verification}
          </Text>
        </View>
      </ScrollView>
    </>
  )
}

export default ErrandReview
