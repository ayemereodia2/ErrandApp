import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { bidAction } from '../../services/bids/bidsAction'
import { RootState, useAppDispatch } from '../../services/store'
import { BidsProps } from '../../types'
import { getTimeAgo } from '../../utils/helper'
import ActionButton from '../ActionButtons'
import BeginErrandModal from '../Modals/Errands/BeginErrand'

export const HaggleComponent = ({
  navigation,
  toggleNegotiateModal,
  toggleSuccessDialogue,
  errand,
  bid,
  user_id,
  haggle,
}: BidsProps) => {
  // Handles show reply

  const beginErrandRef = useRef<BottomSheetModal>(null)
  const acceptPoints = ['60%']

  function toggleBeginErrandModal(open: boolean) {
    bid.state === 'accepted'
      ? beginErrandRef.current?.present()
      : beginErrandRef.current?.dismiss()
  }

  const dispatch = useAppDispatch()

  const [isHidden, setIsHidden] = useState(true)

  const handleReplies = () => {
    setIsHidden(!isHidden)
  }

  const [isBlue, setIsBlue] = useState(true)

  const [inputValue, setInputValue] = useState('')

  const toggleColor = () => {
    setIsBlue((prevIsBlue) => !prevIsBlue)
  }

  const handleBidNavigation = () => {
    navigation.navigate('Bids')
  }

  const handleErrandDetailsNavigation = () => {
    navigation.navigate('ErrandsAndBids')
  }

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  const handleKeyboardWillShow = () => {
    setIsKeyboardVisible(true)
  }

  const handleKeyboardWillHide = () => {
    setIsKeyboardVisible(false)
  }

  // useEffect(() => {
  //   const keyboardWillShowListener = Keyboard.addListener(
  //     Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
  //     handleKeyboardWillShow,
  //   )
  //   const keyboardWillHideListener = Keyboard.addListener(
  //     Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
  //     handleKeyboardWillHide,
  //   )

  //   return () => {
  //     keyboardWillShowListener.remove()
  //     keyboardWillHideListener.remove()
  //   }
  // }, [])

  const { data: sender } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )

  useEffect(() => {
    dispatch(externalUserDetails({ user_id: bid?.runner.id }))
    bid.state === 'accepted'
      ? beginErrandRef.current?.present()
      : beginErrandRef.current?.dismiss()
  }, [bid])

  const negotiatorIsSender = bid?.haggles.slice(-1)[0]?.source === 'sender'

  return (
    <>
      <View className=" bg-white py-4 px-6 border-b-[0.2em] border-[#CCCCCC] hover:bg-[#CC9BFD] mt-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            {errand.errand_type === 1 ? (
              <Image
                source={require('../../assets/images/mulit.png')}
                className="w-8 h-8 b rounded-full"
              />
            ) : (
              <Image
                source={require('../../assets/images/jagger.jpg')}
                className="w-8 h-8 b rounded-full"
              />
            )}
            <Text className="text-sm font-medium">
              {bid?.runner.first_name} {bid?.runner.last_name}
            </Text>
          </View>

          <Text className="text-[#808080] text-sm">
            {getTimeAgo(haggle.created_at)}{' '}
          </Text>
        </View>

        {/*Second one */}
        <View className="mt-4">
          <Text className="text-sm font-medium">{haggle?.description}</Text>
        </View>

        {/* Third one */}

        <View className="flex-row items-center justify-between pt-3">
          {bid.state === 'accepted' && (
            <View className="bg-[#ADF0D1]  rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-[#115A38] capitalize text-base font-md">
                {bid.state}
              </Text>
            </View>
          )}

          <View className="bg-[#FEE1CD] rounded-2xl py-1 px-3 mt-2 ">
            <Text className="text-[#642B02] text-base font-bold">
              &#x20A6;{(haggle?.amount / 100).toLocaleString()}
            </Text>
          </View>

          {/* <TouchableOpacity onPress={handleReplies} className="">
              <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
                <Text className="text-xs text-center text-[#243763]">
                  Bid History
                </Text>
              </View>
            </TouchableOpacity> */}
        </View>

        <View className="flex-row ml-1 mt-6 items-center justify-between">
          {negotiatorIsSender && errand.status === 'open' && (
            <View className="flex-row space-x-2 w-3/5">
              <ActionButton
                onPress={() =>
                  dispatch(
                    bidAction({
                      method: 'PUT',
                      errand_id: errand.id,
                      description: 'This user has accepted the latest bid',
                      source: 'runner',
                      amount: Number(haggle?.amount),
                      bid_id: bid.id,
                      dispatch,
                      toggleSuccessDialogue,
                      Toast,
                    }),
                  )
                }
                name="checkmark"
                iconColor="#33A532"
                className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#33A532]"
              />

              <ActionButton
                name="x"
                iconColor="#FF0000"
                className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-red-600"
              />

              <ActionButton
                onPress={() => toggleNegotiateModal(true)}
                name="commenting"
                iconColor="#317ACF"
                className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#317ACF]"
              />
            </View>
          )}

          <TouchableOpacity onPress={handleReplies} className="">
            <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
              <Text className="text-xs text-center text-[#243763]">
                Bid History
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <BottomSheetModal
          ref={beginErrandRef}
          index={0}
          snapPoints={acceptPoints}
        >
          <BeginErrandModal
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleBeginErrandModal={toggleBeginErrandModal}
            bid={bid}
            errand={errand}
            user_id={user_id}
          />
        </BottomSheetModal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})
