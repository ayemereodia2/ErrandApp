import React, { useEffect, useState } from 'react'
import { ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData, SingleSubErrand } from '../../types'
import { formatDate } from '../../utils/helper'
import ChatInput from './ChatInput'
import MessagesList from './MessageList'
import { Dimensions } from 'react-native';

interface Props {
  errand: MarketData
  user_id: string
  loadingErrand?: boolean
  singleSubErrand: SingleSubErrand
  manageErrandClicked?: boolean
  setManageErrandClicked?: any
}

const Timeline = ({
  errand,
  user_id,
  manageErrandClicked,
  singleSubErrand,
  loadingErrand,
}: Props) => {
  // const { username, bio, picture, isBlocked, isMuted } = route.params;
  const [reply, setReply] = useState('')
  const [isLeft, setIsLeft] = useState()

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
    <KeyboardAvoidingView style={{ flex: 1 }}behavior={Platform.OS == "ios" ? "padding" : "height"}>
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
            {errand.status === 'completed' && (
              <Text className="font-medium text-sm px-4">
                This Errand has been completed
              </Text>
            )}
          </View>
            <MessagesList timeline={timeline} onSwipeToReply={swipeToReply} />
            <ChatInput
              reply={reply}
              isLeft={isLeft}
              closeReply={closeReply}
              username={'helllo'}
            />
        </View>
      )}
    </KeyboardAvoidingView>
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
