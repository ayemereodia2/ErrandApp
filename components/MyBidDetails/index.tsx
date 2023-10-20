import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { getSubErrand } from '../../services/errands/subErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { BidsProps } from '../../types'
import { getTimeAgo } from '../../utils/helper'
import ActionButton from '../ActionButtons'
import AcceptBid from '../Modals/Bids/Accept'
import NegotiateBid from '../Modals/Bids/Negotiate'
import RejectBid from '../Modals/Bids/Reject'
import BidHistory from '../Modals/Bids/BidHistory'

const ErrandBid = ({
  navigation,
  // toggleNegotiateModal,
  toggleSuccessDialogue,
  toggleAcceptBidModal,
  errand,
  bid,
  user_id,
  haggle,
  setSubErrand,
  singleSubErrand,
  setManageErrandClicked,
}: BidsProps) => {
  const acceptBidRef = useRef<BottomSheetModal>(null)
  const acceptPoints = ['46%']
  const negotiateRef = useRef<BottomSheetModal>(null)
  const bidHistoryRef = useRef<BottomSheetModal>(null)

  const rejectRef = useRef<BottomSheetModal>(null)

  function toggleAcceptModal(open: boolean) {
    open ? acceptBidRef.current?.present() : acceptBidRef.current?.dismiss()
  }

  function toggleRejectModal(open: boolean) {
    open ? rejectRef.current?.present() : rejectRef.current?.dismiss()
  }

  function toggleNegotiateModal(open: boolean) {
    open ? negotiateRef.current?.present() : negotiateRef.current?.dismiss()
  }

  function toggleBidHistoryModal(open: boolean) {
    open ? bidHistoryRef.current?.present() : bidHistoryRef.current?.dismiss()
  }

  const dispatch = useAppDispatch()

  const [isHidden, setIsHidden] = useState(true)

  const handleReplies = () => {
    setIsHidden(!isHidden)
  }

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          toggleAcceptModal(false)
          toggleRejectModal(false)
          toggleNegotiateModal(false)
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

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

  const negotiatorIsSender = bid?.haggles.slice(-1)[0].source === 'sender'

  // console.log('>>>>>>>negotiator', errand.bids)

  useEffect(() => {
    dispatch(externalUserDetails({ user_id: bid?.runner.id }))
  }, [])

  // const negotiatorIsSender = bid?.haggles.slice(-1)[0].source === 'sender'

  return (
    <>
      <View className=" bg-white py-4 px-6 border-b-[0.2px] border-[#CCCCCC] hover:bg-[#CC9BFD] mt-4">
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

        <View className="flex-row justify-between items-center">
          {/* {bid.state === 'accepted' && (
            <View className="bg-[#ADF0D1] rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-[#115A38] capitalize text-base font-md">
                {bid.state}
              </Text>
            </View>
          )} */}

          {/* {bid.state === 'cancelled' && (
            <View className="bg-[#ADF0D1] rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-[#115A38] capitalize text-base font-md">
                {bid.state}
              </Text>
            </View>
          )} */}

          {/* {bid.state === 'completed' && (
            <View className="bg-[#ADF0D1] rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-[#115A38] capitalize text-sm font-md">
                {bid.state}
              </Text>
            </View>
          )} */}

          <View className="bg-[#FEE1CD] rounded-2xl py-1 px-3 mt-2 ">
            <Text className="text-[#642B02] text-base font-bold">
              &#x20A6;{(haggle?.amount / 100).toLocaleString()}
            </Text>
          </View>
        </View>

        {bid.state === 'cancelled' ||
          bid.state === 'active' ||
          (bid.state === 'completed' && (
            <View className="flex-row justify-between items-center mt-2">
              <View className="bg-[#ADF0D1] rounded-2xl py-1 px-3 mt-2 ">
                <Text className="text-[#115A38] capitalize text-sm font-md">
                  {bid.state}
                </Text>
              </View>

              <TouchableOpacity
                onPress={()=>toggleBidHistoryModal(true)}
                className="flex-row space-x-2 items-center border-[0.3px] rounded-2xl py-1 px-3 mt-2"
              >
                {/* <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
                <Text className="text-xs text-center text-[#243763]">
                  Bid History
                </Text>
              </View> */}

                <Text className="flex-row space-x-2 items-center rounded-xl">
                  Bid History
                </Text>
              </TouchableOpacity>

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
                className="bg-black  p-1 px-3 rounded-2xl mt-2"
              >
                <Text className="font-md text-white text-sm">
                  View Timeline
                </Text>
              </TouchableOpacity>
            </View>
          ))}

        {negotiatorIsSender &&
        user_id === errand.user_id &&
        bid.state !== 'active' &&
        bid.state !== 'completed' &&
        bid.state !== 'cancelled' ? (
          <View className="bg-[#c8e2e8] flex-row justify-center items-center rounded-lg mt-2 w-48 px-1 ">
            <Text className=" text-xs  p-1 rounded-lg font-light">
              waiting for runner's response
            </Text>
          </View>
        ) : (
          <>
            {user_id === errand.user_id &&
              errand.status === 'open' &&
              // bid.state !== 'rejected' &&
              bid.state === 'open' && (
                <View className="flex-row ml-1 mt-6 items-center justify-between">
                  <View className="flex-row gap-2 flex-1 w-3/5">
                    <ActionButton
                      onPress={() => {
                        toggleAcceptModal(true)
                        // setcurBid(bid)
                      }}
                      name="checkmark"
                      iconColor="#33A532"
                      className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#33A532]"
                    />

                    <ActionButton
                      onPress={() => toggleRejectModal(true)}
                      name="x"
                      iconColor="#FF0000"
                      className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#FF0000]"
                    />

                    <ActionButton
                      onPress={() => toggleNegotiateModal(true)}
                      name="comment"
                      iconColor="#317ACF"
                      className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#317ACF]"
                    />
                  </View>

                  <TouchableOpacity onPress={()=>toggleBidHistoryModal(true)} className="">
                    <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
                      <Text className="text-xs text-center text-[#243763]">
                        Bid History
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
          </>
        )}

        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={negotiateRef}
          index={0}
          snapPoints={['60%']}
        >
          <NegotiateBid
            bid={bid}
            errand={errand}
            navigation={navigation}
            user_id={user_id}
            toggleNegotiateModal={toggleNegotiateModal}
            toggleSuccessDialogue={toggleSuccessDialogue}
            haggle={haggle}
          />
        </BottomSheetModal>

        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={bidHistoryRef}
          index={0}
          snapPoints={['60%']}
        >
         <BidHistory />
         
        </BottomSheetModal>

        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={rejectRef} index={0} snapPoints={['40%']}>
          <RejectBid
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleRejectModal={toggleRejectModal}
            bid={bid}
            errand={errand}
            user_id={user_id}
            haggle={haggle}
          />
        </BottomSheetModal>

        <BottomSheetModal
          ref={acceptBidRef}
          index={0}
          snapPoints={acceptPoints}
          backdropComponent={renderBackdrop}
        >
          <AcceptBid
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleAcceptModal={toggleAcceptModal}
            bid={bid}
            errand={errand}
            user_id={user_id}
            haggle={haggle}
          />
        </BottomSheetModal>
      </View>
    </>
  )
}

export default ErrandBid
