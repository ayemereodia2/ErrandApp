import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { bidAction } from '../../services/bids/bidsAction'
import { getSubErrand } from '../../services/errands/subErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { BidsProps } from '../../types'
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
  toggleUserInfoModal,
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

  const getChatBubblePosition = () => {
    return haggle.source === 'runner' ? 'justify-end' : 'justify-start'
  }

  const { textTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          toggleBeginErrandModal(false)
          toggleNegotiateModal(false)
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  // const negotiatorIsSender = bid?.haggles.slice(-1)[0]?.source === 'sender'

  const lastNegotiatorIsRunner = bid?.haggles.slice(-1)[0]?.source === 'runner'

  const getFormattedDate = (input: string) => {
    const d = new Date(input)

    return d.toDateString()
  }

  const getFormattedTime = (input: string) => {
    const d = new Date(input)

    return d.toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  const { data: sender } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const getUser = () => {
    if (haggle.source === 'runner') {
      return bid.runner
    }
    return sender
  }

  const negotiatorIsSender = bid?.haggles.slice(-1)[0]?.source === 'sender'

  useEffect(() => {
    dispatch(externalUserDetails({ user_id: bid?.runner.id }))
    bid.state === 'accepted'
      ? beginErrandRef.current?.present()
      : beginErrandRef.current?.dismiss()
  }, [bid])

  const negotiatorIsRunner = bid?.haggles.slice(-1)[0]?.source === 'runner'

  return (
    <>
      <View className={`py-4  px-4 flex-row ${getChatBubblePosition()}`}>
        {/* <View className={`py-4  px-4 flex-row ${getChatBubblePosition()}`}>
        
        </View> */}
        <View
          className={`rounded-lg ${
            haggle.source === 'runner'
              ? 'ml-auto max-w-[80%]'
              : 'mr-auto max-w-[80%]'
          }`}
        >
          <View>
            <View className="flex-row text-xs items-center justify-start gap-4 pb-1">
              {getUser().profile_picture !== undefined ? (
                <Image
                  source={{
                    uri: getUser().profile_picture,
                  }}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
                  <Text
                    // style={{ color: textTheme }}
                    className="uppercase text-lg items-center text-white"
                  >
                    {haggle.source === 'sender'
                      ? sender.first_name.charAt(0).toUpperCase()
                      : bid?.runner?.first_name.charAt(0).toUpperCase()}
                    {haggle.source === 'sender'
                      ? sender.last_name.charAt(0).toUpperCase()
                      : bid?.runner?.last_name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}

              <Text
                style={{ color: textTheme }}
                className="text-base font-medium"
              >
                {haggle.source === 'sender'
                  ? sender.first_name
                  : bid?.runner.first_name}{' '}
              </Text>
            </View>
            <View
              className={
                haggle.source === 'runner'
                  ? 'text-black max-w-[312px] bg-[#DAE1F1] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm mt-2'
                  : 'text-black max-w-[312px] bg-[#E6E6E6] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm mt-2'
              }
            >
              <Text>{haggle?.description}</Text>
            </View>
            <Text className="text-[#4D4D4D] pt-2 text-xs">
              {getFormattedTime(haggle.created_at)}
            </Text>
          </View>
          <View className="bg-[#FEE1CD] rounded-2xl py-1 px-3 text-center mt-2  inline-block">
            <Text className="text-[#642B02] text-base font-bold inline-block">
              &#x20A6;{(haggle?.amount / 100).toLocaleString()}
            </Text>
          </View>

          {bid.state === 'rejected' && (
            <View className="justify-start p-1 px-2 rounded-lg space-x-3 flex bg-red-100">
              <Text>This bid was rejected! try placing another bid</Text>
            </View>
          )}

          {user_id !== errand.user_id && bid.state == 'cancelled' && (
            <View className="justify-start p-1 px-2 rounded-lg space-x-3 flex bg-red-100">
              <Text>This bid has been cancelled</Text>
            </View>
          )}

          {user_id !== errand.user_id &&
            bid.state == 'open' &&
            lastNegotiatorIsRunner && (
              <View className="flex justify-start items-center w-full space-x-3 mt-4">
                <Text className=" bg-[#c8e2e8] inline-block text-xs  p-2 px-4  rounded-2xl">
                  {`You have negotiated this bid, waiting for ${sender.first_name} to respond`}
                </Text>
              </View>
            )}

          {/* {negotiatorIsRunner &&
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
            ''
          )} */}

          <View className="flex-row ml-1 mt-3 items-center justify-between">
            {bid.state === 'active' ||
              (errand?.status === 'completed' && (
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
              ))}

            {bid?.state === 'cancelled' || bid?.state === 'rejected' ? (
              ''
            ) : (
              <>
                {errand.status === 'open' && (
                  <View className="flex-row space-x-2 w-3/5">
                    {negotiatorIsSender && (
                      <>
                        <ActionButton
                          onPress={() =>
                            dispatch(
                              bidAction({
                                method: 'PUT',
                                errand_id: errand.id,
                                image_url: [],
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
                          name="comment"
                          iconColor="#317ACF"
                          className="w-[30px] h-[30px] border-solid rounded-full border items-center justify-center border-[#317ACF]"
                        />
                      </>
                    )}
                  </View>
                )}
              </>
            )}
          </View>
        </View>

        {/* <TouchableOpacity
          onPress={() => {
            toggleUserInfoModal(true, bid.runner)
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
            <Text className="text-base font-medium">
              {bid?.runner.first_name} {bid?.runner.last_name}
            </Text>
          </View>

          <Text className="text-[#808080] text-sm">
            {getTimeAgo(haggle.created_at)}{' '}
          </Text>
        </TouchableOpacity> */}

        {/* <View className="mt-4 pl-3">
          <Text className="text-base font-medium">{haggle?.description}</Text>
        </View> */}

        {/* <View className="flex-row items-center justify-between pt-3">
          {bid.state === 'accepted' && (
            <View className="bg-[#ADF0D1]  rounded-2xl py-1 px-3 mt-2 ">
              <Text className="text-[#115A38] capitalize text-base font-md">
                {bid.state}
              </Text>
            </View>
          )}

          <View className="bg-[#FEE1CD] rounded-2xl py-1 px-3 ">
            <Text className="text-[#642B02] text-base font-bold">
              &#x20A6;{(haggle?.amount / 100).toLocaleString()}
            </Text>
          </View>
        </View> */}

        <BottomSheetModal
          backdropComponent={renderBackdrop}
          ref={negotiateRef}
          index={0}
          snapPoints={['60%']}
        >
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
          backdropComponent={renderBackdrop}
        >
          <BeginErrandModal
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleBeginErrandModal={toggleBeginErrandModal}
            bid={bid}
            errand={errand}
            user_id={user_id}
          />
        </BottomSheetModal>

        {negotiatorIsRunner &&
        user_id !== errand.user_id &&
        bid.state !== 'active' &&
        bid.state !== 'completed' &&
        bid.state !== 'cancelled' ? (
          <View className="bg-[#c8e2e8] flex-row justify-center items-center rounded-lg mt-2 w-48 px-1 ">
           
           
          </View>
        ) : (
          ''
        )}
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
