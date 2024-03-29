import { Entypo, EvilIcons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../services/auth/externalUserInfo'
import { errandDetails } from '../services/errands/errandDetails'
import { RootState, useAppDispatch } from '../services/store'
import colors from '../utils/colors'
import { getCardTimeAgo } from '../utils/helper'

const UrgentErrandCard = ({ card, isLoading, navigation }: any) => {
  const dispatch = useAppDispatch()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
        className="pt-20 bg-gray-200 w-screen h-[40vh] mt-5"
      >
        <ActivityIndicator color={textTheme} size="large" />
      </SafeAreaView>
    )
  }

  const regex = /(<([^>]+)>)/gi

  if (card === null) {
    card = []
  }

  return (
    <>
      {card === null ? (
        <>
          <Text className="pt-2" style={{ color: textTheme }}>
            There are no urgent errands at the moment{' '}
          </Text>
        </>
      ) : (
        <SafeAreaView className="mb-10 w-full px-6">
          <View
            className=" pt-[17px] mt-2 pb-[17px] justify-around  bg-[#09497D] rounded-[16px] px-[16px] border border-white"
            key={card.errand_id}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center justify-center gap-2">
                <View className="w-10 h-10 border border-[#ccc] bg-white rounded-full flex-row justify-center items-center">
                  {card.user?.profile_picture ? (
                    <Image
                      style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'contain',
                        borderRadius: 20,
                      }}
                      alt="okay"
                      source={{ uri: card.user?.profile_picture }}
                    />
                  ) : (
                    <Text
                      className="uppercase text-lg items-center "
                      style={{ fontFamily: 'Chillax-Medium', color: colors.DARK_BLUE }}
                    >
                      {card.user?.first_name.charAt(0).toUpperCase()}
                      {card.user?.last_name.charAt(0).toUpperCase()}
                    </Text>
                  )}
                </View>

                <View>
                  <Text
                    className=" text-[18px] text-white"
                    // style={{ color: textTheme }}
                    style={{ fontFamily: 'Chillax-Medium' }}
                  >
                    {card?.user?.first_name}
                  </Text>
                  <Text
                    className="font-semibold text-[18px] text-white"
                    style={{ fontFamily: 'Chillax-Medium' }}
                  >
                    {card?.user?.last_name}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between ">
                <Text
                  className="text-[14px] text-white font-medium pr-1"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  <Entypo name="star" size={16} color="#FBB955" />{' '}
                  {card?.user?.rating}
                </Text>
                <Text
                  className=" text-white"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  | {getCardTimeAgo(card?.updated_at)}
                </Text>
              </View>
            </View>

            <Text
              className="text-sm leading-6 font-[14px] mb-3 mt-7 text-white"
              // style={{ color: textTheme }}
              style={{ fontFamily: 'Axiforma' }}
            >
              {card.description?.length >= 60
                ? card?.description
                    ?.substring(0, 40)
                    .concat('', '...')
                    .replace(regex, '')
                : card?.description.replace(regex, '')}
            </Text>

            <Text
              className="text-sm font-light h-6 text-white"
              // style={{ color: theme ? 'white' : '#666666' }}
              style={{ fontFamily: 'Axiforma' }}
            >
              {' '}
              <Text className="text-sm leading-6 font-[14px]">
                <EvilIcons name="location" size={20} color="#FBB955" />{' '}
              </Text>
              {card.dropoff_address?.address_text ? (
                card.dropoff_address?.address_text
              ) : (
                <Text
                  className="text-sm leading-6 font-[14px]"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  No Location
                </Text>
              )}
            </Text>

            <View className="flex-row items-center"></View>

            <View className="flex-row justify-between items-center mt-[31px]">
              <Text
                className="text-[24px] leading-6 font-medium text-white"
                // style={{ color: theme ? 'white' : '#1E3A79' }}
                style={{ fontFamily: 'Axiforma' }}
              >
                &#x20A6;
                {(card?.budget / 100).toLocaleString()}
              </Text>

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ErrandDetails', {
                    errand_id: card?.id,
                    user_id: card?.user_id,
                  })
                  dispatch(errandDetails({ errandId: card?.id }))
                  dispatch(externalUserDetails({ user_id: card?.user_id }))
                }}
                className="pt-[4px] pb-[4px] bg-[#fff] rounded-xl px-[11px] border border-[#ddd]"
                style={{
                  backgroundColor: theme ? '#152955' : 'white',
                  borderColor: theme ? '#e9ebbf2' : 'lightgrey',
                }}
                key={card.errand_id}
              >
                <Text
                  className="text-sm text-[#09497D]"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  {' '}
                  See details{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row justify-between items-center mt-[25px]">
              <Text
                className="text-[14px] leading-6 font-medium text-white"
                // style={{ color: theme ? 'white' : '#1E3A79' }}
                style={{ fontFamily: 'Axiforma' }}
              >
                {' '}
                {card?.total_bids === 0 ? '' : card?.total_bids}{' '}
                {card?.total_bids === 0
                  ? ''
                  : card?.total_bids <= 1
                  ? 'Bid'
                  : 'Bids'}
              </Text>

              <Text
                className="text-sm text-white"
                style={{ fontFamily: 'Axiforma' }}
              >
                Swipe <MaterialIcons name="swipe" size={14} color="white" />{' '}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c1730',
  },
  image: {
    width: 200,
    height: 200,
  },
})
export default UrgentErrandCard
