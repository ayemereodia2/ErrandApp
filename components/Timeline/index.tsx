import { AntDesign } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData, SingleSubErrand } from '../../types'
import { formatDate } from '../../utils/helper'
import CompleteErrand from '../Modals/Errands/CompletedErrand'
import ChatInput from './ChatInput'
import MessagesList from './MessageList'

interface Props {
  errand: MarketData
  user_id: string
  loadingErrand?: boolean
  singleSubErrand: SingleSubErrand
  manageErrandClicked?: boolean
  setManageErrandClicked?: any
  toggleCompleteDialogue?: any
  toggleSuccessDialogue?: any
}

const Timeline = ({
  errand,
  user_id,
  manageErrandClicked,
  singleSubErrand,
  loadingErrand,
  setManageErrandClicked,
  toggleSuccessDialogue,
  toggleCompleteDialogue,
}: Props) => {
  // const { username, bio, picture, isBlocked, isMuted } = route.params;
  const [reply, setReply] = useState('')
  const [isLeft, setIsLeft] = useState()
  const completeDialogueRef = useRef<BottomSheetModal>(null)
  const swipeToReply = (message: string, isLeft: any) => {
    setReply(message.length > 50 ? message.slice(0, 50) + '...' : message)
    setIsLeft(isLeft)
  }
  const closeReply = () => {
    setReply('')
  }
  const dispatch = useAppDispatch()
  const timeline =
    manageErrandClicked || errand.errand_type === 1
      ? singleSubErrand.timeline
      : errand.timeline

  const { data: runner } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )
  const { data: sender } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  useEffect(() => {
    dispatch(
      externalUserDetails({
        user_id: manageErrandClicked
          ? singleSubErrand.runner_id
          : errand.runner_id,
      }),
    )
  }, [])

  return (
    <BottomSheetModalProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        {loadingErrand ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View>
            <View className="h-[56px] bg-[#FEE1CD] mx-4 items-center justify-center border border-[#C85604] mt-4 rounded-lg">
              {errand.status === 'active' && (
                <Text className="font-medium text-sm px-4">
                  This Errand is expected to be Completed on{' '}
                  {formatDate(errand.updated_at)}
                </Text>
              )}
              {singleSubErrand?.status === 'active' && (
                <View className="flex-row justify-between items-center pl-2">
                  {errand.user_id === user_id && (
                    <AntDesign
                      onPress={() => {
                        setManageErrandClicked(false)
                      }}
                      name="arrowleft"
                      size={20}
                    />
                  )}

                  <Text className="font-medium text-sm px-4">
                    This Errand is expected to be Completed on{' '}
                    {formatDate(errand.updated_at)}
                  </Text>
                </View>
              )}
              {singleSubErrand?.status === 'completed' && (
                <Text className="font-medium text-sm px-4">
                  This Errand has been completed
                </Text>
              )}

              {errand.status === 'completed' && (
                <Text className="font-medium text-sm px-4">
                  This Errand has been completed
                </Text>
              )}

              {errand.status === 'cancelled' ||
                (singleSubErrand?.status === 'cancelled' && (
                  <Text className="font-medium text-sm px-4">
                    This Errand has been cancelled
                  </Text>
                ))}
            </View>
              <MessagesList timeline={timeline} onSwipeToReply={swipeToReply} />
              
              {errand.status === 'completed' || errand.status === 'cancelled'|| singleSubErrand?.status === 'completed' || singleSubErrand?.status === 'cancelled' ? "" :
                <ChatInput
                  reply={reply}
                  isLeft={isLeft}
                  closeReply={closeReply}
                  username={'helllo'}
                  errand={errand}
                  user_id={user_id}
                />
              }
          </View>
        )}

        <BottomSheetModal
          ref={completeDialogueRef}
          index={0}
          snapPoints={['50%']}
        >
          <CompleteErrand
            errand={errand}
            user_id={user_id}
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleCompleteDialogue={toggleCompleteDialogue}
            singleSubErrand={singleSubErrand}
          />
        </BottomSheetModal>
      </KeyboardAvoidingView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Use flex to make the input expand and take the full height of the screen
    justifyContent: 'flex-end', // Align the input to the bottom
    padding: 16, // Add padding if needed
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20, // Adjust this margin as needed
  },
})

export default Timeline
