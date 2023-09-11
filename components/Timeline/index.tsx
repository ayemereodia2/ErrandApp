import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData, SingleSubErrand } from '../../types'
import ChatInput from './ChatInput'
import MessagesList from './MessageList'

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
    <View style={{ flex: 1 }}>
      <MessagesList timeline={timeline} onSwipeToReply={swipeToReply} />
      <ChatInput
        reply={reply}
        isLeft={isLeft}
        closeReply={closeReply}
        username={'helllo'}
      />
    </View>
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
