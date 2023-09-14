import React, { useRef, useState } from 'react'
import { ScrollView } from 'react-native'

import Message from './Message'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getTimeAgo } from '../../utils/helper'
import { ChatInputProp } from './ChatInput'

const MessagesList = ({ onSwipeToReply, timeline }: ChatInputProp) => {
  const [messages, setMessages] = useState([
    {
      user: 'sender',
      time: '12:07',
      content: "7 o'clock?",
    },
    {
      user: 'runner',
      time: '12:09',
      content: 'Sounds good',
    },
    {
      user: 'runner',
      time: '12:07',
      content: "7 o'clock?",
    },
    {
      user: 'sender',
      time: '12:09',
      content: 'Sounds good',
    },
    {
      user: 'runner',
      time: '12:07',
      content: "7 o'clock?",
    },
    {
      user: 'sender',
      time: '12:09',
      content: 'Sounds good',
    },
    {
      user: 'runner',
      time: '12:07',
      content: "7 o'clock?",
    },
    {
      user: 'sender',
      time: '12:09',
      content: 'Sounds good',
    },
    {
      user: 'runner',
      time: '12:07',
      content: "7 o'clock?",
    },
  ])

  const user = useRef<any>('sender')
  const scrollView = useRef<any>()

  return (
    <ScrollView
      style={{ backgroundColor: '#F8F9FC', height: '80%' }}
      ref={(ref) => (scrollView.current = ref)}
      // onContentChange={() => {
      // 	scrollView.current.scrollToEnd({ animated: true })
      // }}
    >
      <KeyboardAwareScrollView>
        {timeline?.updates.map((message, index) => (
          <Message
            key={index}
            time={getTimeAgo(message.created_at)}
            isLeft={message.source !== user.current}
            message={message.message}
            onSwipe={onSwipeToReply}
          />
        ))}
      </KeyboardAwareScrollView>
    </ScrollView>
  )
}

export default MessagesList
