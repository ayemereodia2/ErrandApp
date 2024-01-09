import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { getSubErrand } from '../../services/errands/subErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { BidsProps } from '../../types'
import { getCardTimeAgo } from '../../utils/helper'
import ActionButton from '../ActionButtons'
import AcceptBid from '../Modals/Bids/Accept'
import BidHistory from '../Modals/Bids/BidHistory'
import NegotiateBid from '../Modals/Bids/Negotiate'
import RejectBid from '../Modals/Bids/Reject'

const ErrandBid = ({
  navigation,
  // toggleNegotiateModal,
  toggleSuccessDialogue,
  toggleAcceptBidModal,
  errand,
  bid,
  user_id,
  haggle,
  singleSubErrand,
  setManageErrandClicked,
  toggleUserInfoModal,
  otherHaggles,
}: BidsProps) => {
  const acceptBidRef = useRef<BottomSheetModal>(null)
  const acceptPoints = ['46%']
  const negotiateRef = useRef<BottomSheetModal>(null)
  const bidHistoryRef = useRef<BottomSheetModal>(null)
  const [showFundWallet, setShowFundWallet] = useState(false)
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)
  const [selectedImage, setSelectedImage] = useState('')

  // console.log('>>>>>>errand', bid)

  const { data, loading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

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
          toggleBidHistoryModal(false)
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  // console.log('>>>>>errandtype', mana)

  const { data: sender } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )

  const lastNegotiatorIsSender = bid?.haggles.slice(-1)[0].source === 'sender'

  useEffect(() => {
    dispatch(externalUserDetails({ user_id: bid?.runner.id }))
    dispatch(walletAction({ request: 'wallet' }))
  }, [])

  const { textTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  // const negotiatorIsSender = bid?.haggles.slice(-1)[0].source === 'sender'

  return (
    <>
      <View className=" bg-white py-4 px-6 border-b-[0.2px] border-[#CCCCCC] hover:bg-[#CC9BFD] mt-4">
        <TouchableOpacity
          onPress={() => {
            toggleUserInfoModal(true, bid?.runner)
          }}
          className="flex-row items-center justify-between"
        >
          <View className="flex-row items-center space-x-3">
            {errand.errand_type === 1 ? (
              <Image
                source={{ uri: bid?.runner.profile_picture }}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
                <Text className="uppercase text-lg items-center text-white">
                  {bid?.runner?.first_name.charAt(0).toUpperCase()}
                  {bid?.runner?.last_name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <Text className="text-sm font-medium">
              {bid?.runner.first_name} {bid?.runner.last_name}
            </Text>
          </View>

          <Text className="text-[#808080] text-sm">
            {getCardTimeAgo(haggle?.created_at)}{' '}
          </Text>
        </TouchableOpacity>

        {/*Second one */}
        <View className="mt-4">
          <Text className="text-sm font-medium">{haggle?.description}</Text>
        </View>

        {/* <View>
          {errand?.images?.map((image, index) => (
            <View className="mt-4">
              <TouchableOpacity
                key={index}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                     borderRadius: 10 
                  }}
                  source={{ uri: image }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View> */}

        <View className="flex-row justify-between items-center">
          <View className="bg-[#FEE1CD] rounded-2xl py-1 px-3 mt-2 ">
            <Text className="text-[#642B02] text-base font-bold">
              &#x20A6;{(haggle?.amount / 100).toLocaleString()}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => {
              dispatch(externalUserDetails({ user_id: errand.user_id }))
              toggleBidHistoryModal(true)
            }}
            className=""
          >
            <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
              <Text className="text-xs text-center text-[#243763]">
                Bid History
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="flex-row space-x-4 mt-4">
          {haggle?.image_url?.map((image, index) => (
            <View className="">
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedImage(image)}
              >
                <Image
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: 10,
                  }}
                  source={{ uri: image }}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {bid.state === 'completed' && (
          <View className="flex-row justify-between items-center mt-2">
            <View className="bg-[#ADF0D1] rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-[#115A38] capitalize text-sm font-md">
                {bid.state}
              </Text>
            </View>

            {errand.errand_type === 1 ? (
              <TouchableOpacity
                onPress={() => {
                  setManageErrandClicked(true)
                  dispatch(
                    getSubErrand({
                      errand_id: errand.id,
                      runner_id: bid.runner.id,
                    }),
                  )
                }}
                className="bg-black  p-1 px-3 rounded-2xl mt-2"
              >
                <Text className="font-md text-white text-sm">
                  View Timeline
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        )}

        {bid.state === 'cancelled' && (
          <View className="flex-row justify-between items-center mt-2">
            <View className="bg-red-50 rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-red-700 capitalize text-sm font-md">
                {bid.state}
              </Text>
            </View>

            {/* <TouchableOpacity
              onPress={() => toggleBidHistoryModal(true)}
              className="flex-row space-x-2 items-center border-[0.3px] rounded-2xl py-1 px-3 mt-2"
            >
              <Text className="flex-row space-x-2 items-center rounded-xl">
                Bid History
              </Text>
            </TouchableOpacity> */}

            {errand.errand_type === 1 ? (
              <TouchableOpacity
                onPress={() => {
                  setManageErrandClicked(true)
                  dispatch(
                    getSubErrand({
                      errand_id: errand.id,
                      runner_id: bid.runner.id,
                    }),
                  )
                }}
                className="bg-black  p-1 px-3 rounded-2xl mt-2"
              >
                <Text className="font-md text-white text-sm">
                  View Timeline
                </Text>
              </TouchableOpacity>
            ) : (
              ''
            )}
          </View>
        )}

        {bid.state === 'active' && (
          <View className="flex-row justify-between items-center mt-2">
            <View className="bg-blue-50 rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-blue-800 capitalize text-sm font-md">
                {bid.state}
              </Text>
            </View>

            {/* <TouchableOpacity
              onPress={() => toggleBidHistoryModal(true)}
              className="flex-row space-x-2 items-center border-[0.3px] rounded-2xl py-1 px-3 mt-2"
            >
              <Text className="flex-row space-x-2 items-center rounded-xl">
                Bid History
              </Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              onPress={() => {
                setManageErrandClicked(true)
                dispatch(
                  getSubErrand({
                    errand_id: errand.id,
                    runner_id: bid.runner.id,
                  }),
                )
              }}
              className="bg-black  p-1 px-3 rounded-2xl mt-2"
            >
              <Text className="font-md text-white text-sm">View Timeline</Text>
            </TouchableOpacity>
          </View>
        )}

        {user_id === errand.user_id && bid.state == 'accepted' && (
          <View className="mt-3">
            <Text className=" bg-[#c8e2e8] inline-block text-xs  p-2  rounded-2xl">
              You have accepted this bid. Waiting for the runner to begin the
              errand
            </Text>

            {/* <button
              onClick={cancelAcceptedBid}
              className="text-xs border-1 border-[#C82332] rounded-2xl flex space-x-1 justify-center items-center p-2 w-20 mx-auto bg-white"
            >
              <p className="text-red-500">Cancel</p>
            </button> */}
          </View>
        )}

        {user_id === errand.user_id &&
          bid.state == 'open' &&
          lastNegotiatorIsSender && (
            <View className="flex justify-start items-center w-full space-x-3 mt-2">
              <Text className=" bg-[#c8e2e8] inline-block text-xs  p-2 px-4  rounded-2xl">
                {`You have negotiated this bid, waiting for ${bid?.runner?.first_name} to respond`}
              </Text>
            </View>
          )}

        {lastNegotiatorIsSender &&
        user_id === errand.user_id &&
        bid.state !== 'active' &&
        bid.state !== 'completed' &&
        bid.state !== 'cancelled' ? (
          <View className="bg-[#c8e2e8] flex-row justify-center items-center rounded-lg mt-2 w-48 px-1 ">
            {/* <Text className=" text-xs  p-1 rounded-lg font-light">
              waiting for runner's response
            </Text> */}
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

                  {/* <TouchableOpacity
                    onPress={() => {
                      dispatch(externalUserDetails({ user_id: errand.user_id }))
                      toggleBidHistoryModal(true)
                    }}
                    className=""
                  >
                    <View className="flex-row space-x-2 items-center border-[0.3px] p-1 px-3 rounded-xl">
                      <Text className="text-xs text-center text-[#243763]">
                        Bid History
                      </Text>
                    </View>
                  </TouchableOpacity> */}
                </View>
              )}

            <Modal visible={showFundWallet} transparent={true}>
              <View style={styles.modalContainer}>
                <View className="bg-white text-black w-[350px] mx-10 rounded-lg px-4 py-6 ">
                  <Text className="text-center font-semibold text-lg">
                    Fund Your Wallet to Accept this bid
                  </Text>
                  <Text
                    style={{ color: textTheme }}
                    className="text-sm pt-2 font-md"
                  >
                    <Text style={{ color: textTheme }} className="font-bold">
                      Your Available Balance:
                    </Text>{' '}
                    ₦
                    {Number(data?.balance) === 0
                      ? '0.00'
                      : (Number(data?.balance) / 100).toLocaleString()}
                  </Text>
                  <View className="flex-row items-center justify-center space-x-3 mt-3">
                    <TouchableOpacity
                      onPress={() => {
                        setCurrentWalletAmount(Number(data?.balance) / 100)
                        navigation.navigate('FundWalletModal', [
                          currentWalletAmount,
                        ])
                      }}
                      className={`bg-[#1E3A79] p-3 rounded-lg mt-2 w-1/2
                      }`}
                    >
                      <Text className="text-white text-center">
                        Fund Your Wallet
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setShowFundWallet(false)
                      }}
                      className="border border-red-500 p-3 rounded-lg mt-2  w-1/2 "
                    >
                      <Text className="text-red-600 text-center">Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>

            <Modal visible={selectedImage !== ''} transparent={true}>
              <View style={styles.modalContainer}>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.modalImage}
                />
                <TouchableOpacity
                  onPress={() => setSelectedImage('')}
                  style={styles.closeButton}
                >
                  {/* You can use a close icon or text */}
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </>
        )}

        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={negotiateRef}
          index={0}
          snapPoints={['70%']}
          keyboardBehavior="extend"
          enablePanDownToClose
          keyboardBlurBehavior="restore"
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
          snapPoints={['80%']}
        >
          <BidHistory
            bid={bid}
            errand={errand}
            user_id={user_id}
            haggle={haggle}
            otherHaggles={otherHaggles}
          />
        </BottomSheetModal>

        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={rejectRef}
          index={0}
          snapPoints={['40%']}
        >
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
            setShowFundWallet={setShowFundWallet}
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
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
    zIndex: 100,
    backgroundColor: 'white',
  },

  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})

export default ErrandBid
