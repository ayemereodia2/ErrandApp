import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { BidsProps } from '../../types'
import { getTimeAgo } from '../../utils/helper'
import ActionButton from '../ActionButtons'

const ErrandBid = ({
  navigation,
  toggleNegotiateModal,
  toggleSuccessDialogue,
  errand,
  bid,
  user_id,
  haggle,
}: BidsProps) => {
  const acceptBidRef = useRef<BottomSheetModal>(null)
  const acceptPoints = ['40%']
  function toggleAcceptModal(open: boolean) {
    open ? acceptBidRef.current?.present() : acceptBidRef.current?.dismiss()
  }

  const dispatch = useAppDispatch()

  const [isHidden, setIsHidden] = useState(true)

  const handleReplies = () => {
    setIsHidden(!isHidden)
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
  }, [])

  // const negotiatorIsSender = bid?.haggles.slice(-1)[0].source === 'sender'

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

        <View className="flex-row items-center">
          <View className="bg-[#FEE1CD] rounded-2xl py-2 px-3 mt-2 ">
            <Text className="text-[#642B02] text-base font-bold">
              &#x20A6;{(haggle?.amount / 100).toLocaleString()}
            </Text>
          </View>
        </View>

        {user_id === errand.user_id &&
          errand.status === 'open' &&
          // bid.state !== 'rejected' &&
          bid.state === 'open' && (
            <View className="flex-row ml-1 mt-6 items-center justify-between">
              <View className="flex-row gap-2 flex-1 w-3/5">
                <ActionButton
                  onPress={() => toggleAcceptModal(true)}
                  name="checkmark"
                  iconColor="#33A532"
                  className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#33A532]"
                />

                <ActionButton
                  name="x"
                  iconColor="#FF0000"
                  className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#0e0d0d]"
                />

                <ActionButton
                  onPress={() => toggleNegotiateModal(true)}
                  name="comment"
                  iconColor="#317ACF"
                  className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#317ACF]"
                />
              </View>

              <TouchableOpacity onPress={handleReplies} className="">
                <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
                  <Text className="text-xs text-center text-[#243763]">
                    Bid History
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
    </>
  )
}

export default ErrandBid
