import React from 'react'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { bidAction } from '../../services/bids/bidsAction'
import { getSubErrand } from '../../services/errands/subErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { BidsProps } from '../../types'
import { getTimeAgo } from '../../utils/helper'
import ActionButton from '../ActionButtons'
import NegotiateBid from '../Modals/Bids/Negotiate'
import BeginErrandModal from '../Modals/Errands/BeginErrand'

export const HaggleComponent = ({
  navigation,
  toggleSuccessDialogue,
  errand,
  bid,
  user_id,
  haggle,
  setSubErrand,
  setManageErrandClicked,
}: BidsProps) => {
  const negotiateRef = useRef<BottomSheetModal>(null)

  // Handles show reply

  const beginErrandRef = useRef<BottomSheetModal>(null)
  const acceptPoints = ['60%']

  function toggleBeginErrandModal(open: boolean) {
    bid.state === 'accepted'
      ? beginErrandRef.current?.present()
      : beginErrandRef.current?.dismiss()
  }

  function toggleNegotiateModal(open: boolean) {
    open ? negotiateRef.current?.present() : negotiateRef.current?.dismiss()
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

  const negotiatorIsRunner = bid?.haggles.slice(-1)[0]?.source === 'runner'

  return (
    <>
      <View className=" bg-white py-4 px-6 border-b-[0.3px] border-[#CCCCCC] hover:bg-[#CC9BFD] mt-4">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            {errand.errand_type === 1 ? (
              <Image
                source={require('../../assets/images/mulit.png')}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <Image
                source={require('../../assets/images/jagger.jpg')}
                className="w-8 h-8 rounded-full"
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

        {negotiatorIsRunner &&
        user_id !== errand.user_id &&
        bid.state !== 'active' &&
        bid.state !== 'completed' &&
        bid.state !== 'cancelled' ? (
          <View className="bg-[#c8e2e8] flex-row justify-center items-center rounded-lg mt-2 w-48 px-1 ">
            <Text className=" text-xs  p-1 rounded-lg font-light">
              waiting for Sender's response
            </Text>
          </View>
        ) : (
          <View className="flex-row ml-1 mt-6 items-center justify-between">
            {bid.state === 'active' ? (
              <TouchableOpacity
                onPress={() => {
                  setManageErrandClicked(true)
                  dispatch(
                    getSubErrand({
                      errand_id: errand.id,
                      runner_id: bid.runner.id,
                      setSubErrand,
                    }),
                  )
                }}
                className="bg-black  p-1 px-3 rounded-2xl"
              >
                <Text className="font-md text-white text-sm">
                  View Timeline
                </Text>
              </TouchableOpacity>
            ) : (
              <>
                {errand.status === 'open' && bid.state !== 'accepted' && (
                  <View className="flex-row space-x-2 w-3/5">
                    <ActionButton
                      onPress={() =>
                        dispatch(
                          bidAction({
                            method: 'PUT',
                            errand_id: errand.id,
                            description:
                              'This user has accepted the latest bid',
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
              </>
            )}

            <TouchableOpacity onPress={handleReplies} className="">
              <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
                <Text className="text-xs text-center text-[#243763]">
                  Bid History
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <BottomSheetModal ref={negotiateRef} index={0} snapPoints={['60%']}>
          <NegotiateBid
            haggle={haggle}
            bid={bid}
            errand={errand}
            navigation={navigation}
            user_id={user_id}
            toggleNegotiateModal={toggleNegotiateModal}
            toggleSuccessDialogue={toggleSuccessDialogue}
          />
        </BottomSheetModal>

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
