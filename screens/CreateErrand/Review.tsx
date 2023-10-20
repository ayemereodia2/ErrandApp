import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { PostErrandData } from '../../types'
import { ImageViewer } from './Details'

interface ReviewProp {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  postErrandData: PostErrandData
}
const ErrandReview = ({ setActiveStep, postErrandData }: ReviewProp) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false
  return (
    <>
      {/* Header */}

      <ScrollView>
        <View className="flex-row mt-[38px] items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">5</Text>
          </View>
          <Text
            className="font-semibold text-[#243763] text-base"
            style={{ color: textTheme }}
          >
            Errand Review
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text
            style={{ color: textTheme }}
            className="text-[#777777] text-center "
          >
            In this section, you can set the location that you want the errand
            to take place in.
          </Text>
        </View>

        <View className="border-b-[1px] px-4 pb-2 mt-10 border-[#EEEEEE]">
          <Text
            style={{ color: textTheme }}
            className="text-[#243763] font-semibold text-base"
          >
            Errand Category
          </Text>
        </View>

        <View className="mx-4 mt-2 flex-row items-center space-x-2">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-28"
          >
            Category Type
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-base text-[#333333] text-left w-[200px]"
          >
            {postErrandData.type}
          </Text>
        </View>

        <View className="mx-4 mt-4 flex-row items-center space-x-10">
          <Text style={{ color: textTheme }} className="font-md text-base w-20">
            Activity
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333] w-[200px]"
          >
            {postErrandData.categoryName}
          </Text>
        </View>

        <View className="border-b-[1px] px-4 pb-2 mt-8 border-[#EEEEEE]">
          <Text
            style={{ color: textTheme }}
            className="text-[#243763] font-semibold text-sm"
          >
            Errand Details
          </Text>
        </View>

        <View className="mx-4 mt-2 flex-row space-x-10 ">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-20"
          >
            Description
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333] w-[200px]"
          >
            {postErrandData.description}
          </Text>
        </View>

        <View className='flex-row space-x-14 pt-4'>
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] pl-4 "
          >
            Images
          </Text>
          <View className="pl-4 flex-row space-x-3 ">
            {postErrandData?.images.length === 0 ? (
              <Text className='font-light' style={{ color: textTheme }}>No Images</Text>
            ) : (
              <>
                {postErrandData?.images.map((img, index) => {
                  return (
                    <ImageViewer
                      selectedImage={img}
                      removeImage={''}
                      index={index}
                    />
                  )
                })}
              </>
            )}
          </View>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-[76px] ">
          <Text style={{ color: textTheme }} className="font-md text-[14px]">
            Budget
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-light text-[#333333]"
          >
            {postErrandData.budget}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-16">
          <Text style={{ color: textTheme }} className="font-md text-[14px]">
            Location
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333] w-[200px]"
          >
            {postErrandData.currentLocation}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-14">
          <Text style={{ color: textTheme }} className="font-md text-[14px]">
            Insurance
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {!postErrandData.insurance ? 'No' : postErrandData.insurance}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-10">
          <Text
            style={{ color: textTheme }}
            className="font-md w-20 text-[14px]"
          >
            Insurance Amount
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {postErrandData.ins_amount.toLocaleString()}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-2 ">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-28"
          >
            Restrict Errand by Qualification
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {postErrandData.res_by_qualification}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-2">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-28"
          >
            Restrict Errand by Verification
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {postErrandData.res_by_verification}
          </Text>
        </View>
      </ScrollView>
    </>
  )
}

export default ErrandReview
