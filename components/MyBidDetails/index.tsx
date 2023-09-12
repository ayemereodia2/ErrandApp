import { MaterialIcons } from '@expo/vector-icons'
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
      {/* <View className="py-5 border-b-[0.2px] border-[#ccc] shadow-lg">
        <View className="">
          <View className=" flex-row items-start ">
            <View className="flex-row items-start justify-between gap-3">
              <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
                <Text className="uppercase text-lg items-center text-white">
                  {haggle.source === 'sender'
                    ? sender.first_name.charAt(0).toUpperCase()
                    : bid?.runner?.first_name.charAt(0).toUpperCase()}

                  {haggle.source === 'sender'
                    ? sender.last_name.charAt(0).toUpperCase()
                    : bid?.runner?.last_name.charAt(0).toUpperCase()}
                </Text>
              </View>
              <View className="flex-row justify-between items-center">
                <View className="w-60">
                  <Text className="text-[#011E3E] text-sm">
                    {bid?.runner.first_name} {bid?.runner.last_name}
                  </Text>
                </View>
                <View>
                  <View className=" py-[2px] rounded-lg bg-[#115A38] justify-center mr-1">
                    <Text className="text-center text-white font-bold text-sm">
                      &#x20A6;{(haggle?.amount / 100).toLocaleString()}
                    </Text>
                  </View>
                  <Text className="text-[#6c6a6a] text-xs pt-1">
                    {' '}
                    {getTimeAgo(haggle.created_at)}{' '}
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <View className=" w-[380px]">
            <Text className="leading-[24px] text-[14px] text-[#444444]">
              {haggle?.description}
            </Text>
          </View>
        </View>

        {user_id === errand.user_id && bid.state == 'accepted' && (
          <View className="justify-start w-80 space-x-3 mt-2 mx-auto rounded-lg bg-[#c8e2e8] py-2">
            <Text className="text-xs  px-2 text-center">
              You have accepted this bid. Waiting for the runner to begin the
              errand
            </Text>
          </View>
        )}

        {negotiatorIsSender && user_id === errand.user_id && (
          <View className="ml-14 text-center mt-2 inline-block bg-[#c8e2e8] text-xs  px-2 py-1 rounded-2xl ">
            <Text>waiting for runner's response</Text>
          </View>
        )}

        {user_id === errand.user_id &&
          errand.status === 'open' &&
          bid.state === 'open' && (
            <View className="flex-row ml-1 mt-6 items-center">
              <View className="flex-row gap-2 flex-1 w-3/5">
                <ActionButton
                  onPress={() => toggleAcceptModal(true)}
                  name="checkmark"
                  iconColor="#33A532"
                  className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#33A532]"
                />

                <ActionButton
                  // onPress={() => toggleSuccessDialogue(true)}
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

              <TouchableOpacity onPress={handleReplies} className="w-2/5">
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-xs text-center text-[#243763]">
                    View Replies
                  </Text>
                  {isHidden ? (
                    <MaterialIcons name="keyboard-arrow-up" size={24} />
                  ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={24} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}

        <>
          {bid.haggles?.map((haggle) => {
            return (
              <View
                className="mt-[32px] space-y-4"
                style={{ display: isHidden ? 'none' : 'flex' }}
              >
                <View className="flex-row ">
                  <Image
                    source={require('../../assets/images/george.jpg')}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                  <View className="w-[340px] h-[200px] ml-2 bg-[#DAE1F1] b rounded-xl px-3">
                    <View className="flex-row items-center justify-between mt-4 ">
                      <Text className="leading-6 w-4/6 font-semibold text-sm">
                        Enoobong George
                      </Text>
                      <Text className="leading-6 font-semibold text-sm w-2/4">
                        {getTimeAgo(haggle.created_at)}{' '}
                      </Text>
                    </View>

                    <View className="mt-3 w-[300px]">
                      <Text className="leading-[24px] text-sm font-normal">
                        {haggle?.description}
                      </Text>
                    </View>

                    <View className="w-[76px] h-[32px] ml-[16px] bg-[#115A38] justify-center mr-1 mt-3 mb-4 b rounded">
                      <Text className="text-center text-white font-normal text-base">
                        &#x20A6;{(haggle?.amount / 100).toLocaleString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            )
          })}
        </>

        <BottomSheetModal
          ref={acceptBidRef}
          index={0}
          snapPoints={acceptPoints}
        >
          <AcceptBid
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleAcceptModal={toggleAcceptModal}
            bid={bid}
            errand={errand}
            user_id={user_id}
          />
        </BottomSheetModal>
      </View> */}

      <View className=" bg-white py-4 px-6 border-b-[0.2em] border-[#CCCCCC] hover:bg-[#CC9BFD]">
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
            <View className="flex-row ml-1 mt-6 items-center">
              <View className="flex-row gap-2 flex-1 w-3/5">
                <ActionButton
                  onPress={() => toggleAcceptModal(true)}
                  name="checkmark"
                  iconColor="#33A532"
                  className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#33A532]"
                />

                <ActionButton
                  // onPress={() => toggleSuccessDialogue(true)}
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

              <TouchableOpacity onPress={handleReplies} className="w-2/5">
                <View className="flex-row space-x-2 items-center">
                  <Text className="text-xs text-center text-[#243763]">
                    View Replies
                  </Text>
                  {isHidden ? (
                    <MaterialIcons name="keyboard-arrow-up" size={24} />
                  ) : (
                    <MaterialIcons name="keyboard-arrow-down" size={24} />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>
    </>
  )
}

export default ErrandBid
