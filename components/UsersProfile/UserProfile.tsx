import { Entypo, MaterialIcons } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useRef } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { getCardTimeAgo } from '../../utils/helper'
import Content from '../AboutContent/Content'
import { ProfileInitials } from '../ProfileInitials'
import ScreenHeader from '../ScreenHeader'

const UserProfile = ({ navigation }: any) => {
  const { data, backgroundTheme, textTheme, landingPageTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )
  const bottomSheetRef4 = useRef<BottomSheetModal>(null)

  function openSettingsModal() {
    bottomSheetRef4.current?.present()
  }

  const theme = data?.preferred_theme === 'light' ? true : false

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          bottomSheetRef4.current?.dismiss()
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  return (
    <>
      <ScreenHeader
        navigation={navigation}
        textTheme={textTheme}
        screen={'Profile Details'}
        openSettingsModal={openSettingsModal}
      />
      <BottomSheetModalProvider>
        <SafeAreaView className="mt-6 h-screen">
          <ScrollView className="px-6">
            <View className="px-5  rounded-[15px] bg-white mt-5 shadow-lg flex-row  ">
              <View className="border-r border-[#DBD6D6] w-4/12 py-3">
                <ProfileInitials
                  textClass="text-white text-3xl"
                  firstName={data.first_name}
                  lastName={data.last_name}
                  profile_pic={data.profile_picture}
                  className="w-20 h-20 bg-[#616161] rounded-full text-2xl"
                />
              </View>
              <View className="rounded-lg pl-4 flex-row items-center">
                <View className="">
                  <View className=" flex-row">
                    <Text
                      style={{
                        color: '#09497D',
                        fontFamily: 'Chillax-Semibold',
                      }}
                      className="text-lg"
                    >
                      {data?.first_name} {data?.last_name}
                    </Text>
                    {data?.verification === 100 ? (
                      <Text>
                        <MaterialIcons
                          name="verified"
                          color="green"
                          size={20}
                        />
                      </Text>
                    ) : null}
                  </View>
                  <Text
                    style={{
                      fontFamily: 'Chillax-Medium',
                    }}
                    className="text-[#767575] text-[14px]"
                  >
                    {data.occupation ? data.occupation : 'Swave User'}
                  </Text>
                  <View className="flex-row items-center pt-1">
                    <Text
                      style={{
                        fontFamily: 'Chillax-Medium',
                      }}
                      className="text-[#767575] text-[14px]"
                    >
                      <Entypo name="star" size={16} color="#FBB955" />
                      {data?.rating} |{' '}
                      <Text> {getCardTimeAgo(data?.updated_at)} </Text>
                    </Text>
                    {/* <Text
                              style={{ color: textTheme }}
                              className="text-[#6D6D6D] text-sm"
                            >
                              ( {user?.errands_completed}
                              {user.errands_completed > 1
                                ? 'errands'
                                : 'errand'}
                              Completed)
                            </Text> */}
                  </View>
                </View>
              </View>
            </View>

            <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
              <View className="mb-2 border-b border-[#DBD6D6]">
                <Text
                  className="mb-2 text-[16px] text-[#09497D] font-medium"
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  Bio
                </Text>
              </View>
              <View className="rounded-lg flex-row justify-between mt-1">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-sm  text-[#383737] font-light"
                >
                  {data.bio ? data?.bio : 'N/A'}
                </Text>
              </View>
            </View>

            <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
              <View className="mb-2 border-b border-[#DBD6D6]">
                <Text
                  className="mb-2 text-[16px] text-[#09497D] font-medium"
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  Email Address
                </Text>
              </View>
              <View className="rounded-lg flex-row justify-between mt-1">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-sm  text-[#383737] font-light"
                >
                  {data.email ? data?.email : 'N/A'}
                </Text>
              </View>
            </View>

            <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
              <View className="mb-2 border-b border-[#DBD6D6]">
                <Text
                  className="mb-2 text-[16px] text-[#09497D] font-medium"
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  Phone number
                </Text>
              </View>
              <View className="rounded-lg flex-row justify-between mt-1">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-sm  text-[#383737] font-light"
                >
                  {data?.phone_number}
                </Text>
              </View>
            </View>

            <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
              <View className="mb-2 border-b border-[#DBD6D6]">
                <Text
                  className="mb-2 text-[16px] text-[#09497D] font-medium"
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  Date of birth
                </Text>
              </View>
              <View className="rounded-lg flex-row justify-between mt-1">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-sm  text-[#383737] font-light"
                >
                  {data.dob ? data?.dob.slice(0, 10) : 'N/A'}
                </Text>
              </View>
            </View>

            {/* <View className="w-[380px] mx-auto">
        <View className="flex-row justify-between items-center ml-4 mr-4 pb-1">
          <Text
            style={{ color: textTheme }}
            className="text-base font-semibold"
          >
            Referral code
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" ml-4 pb-6 leading-6 font-light"
        >
          {data?.referral_code}
        </Text>
      </View> */}

            {/* <View className="w-[380px] mx-auto mb-14">
        <View className="flex-row justify-between items-center ml-4 mr-4">
          <Text
            style={{ color: textTheme }}
            className="text-base font-semibold pb-1"
          >
            Referral information
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" ml-4 pb-6 leading-6 font-light "
        >
          {data?.referred_by ? data?.referred_by : 'N/A'}
        </Text>
      </View> */}
          </ScrollView>

          <BottomSheetModal
            ref={bottomSheetRef4}
            index={0}
            snapPoints={['50%']}
            containerStyle={{
              marginHorizontal: 10,
            }}
            backdropComponent={renderBackdrop}
          >
            <Content navigation={navigation} />
          </BottomSheetModal>
        </SafeAreaView>
      </BottomSheetModalProvider>
    </>
  )
}

export default UserProfile
