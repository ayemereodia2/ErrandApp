import React from 'react'
import { StyleSheet } from 'react-native'
import { FlingGestureHandler } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { theme } from '../../theme'

import { ChatInputProp } from './ChatInput'

const Message = ({ time, isLeft, message }: ChatInputProp) => {
  const startingPosition = 0
  const x = useSharedValue(startingPosition)

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    }
  })

  return (
    <FlingGestureHandler>
      <Animated.View style={[styles.container, uas]}>
        {/* <View
          style={[styles.messageContainer, isOnLeft('grey_messageContainer')]}
        >
          <View className="flex-row space-x-3">
            <View className="w-8 h-8 bg-[#616161] rounded-full flex-row justify-center items-center">
              <Text className="uppercase text-base items-center text-white">
                SO
              </Text>
            </View>
            <View>
              <Text className="font-semibold">Enoobong George</Text>
              <Text className="text-xs text-[#777777]">14th August 2023</Text>
            </View>
          </View>
          <View
            style={[
              styles._messageContainer,
              isOnLeft('grey__messageContainer'),
            ]}
          >
            <View style={styles.messageView}>
              <Text className="" style={[styles.message, isOnLeft('message')]}>
                {message}
              </Text>
            </View>
          </View>
          <Text className="text-xs pt-2 ml-4">{time}</Text>
        </View> */}
      </Animated.View>
    </FlingGestureHandler>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    // backgroundColor: theme.colors.messageBackground,
    maxWidth: '100%',
    alignSelf: 'flex-end',
    // flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 5,
    paddingBottom: 10,
  },
  _messageContainer: {
    backgroundColor: theme.colors.messageBackground,
    maxWidth: '100%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 6,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingTop: 7,
    paddingBottom: 10,
    marginTop: 10,
  },
  messageView: {
    backgroundColor: 'transparent',
    maxWidth: '80%',
  },
  timeView: {
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    paddingLeft: 10,
  },
  message: {
    color: 'black',
    alignSelf: 'flex-start',
    fontSize: 16,
  },
  time: {
    color: 'lightgray',
    alignSelf: 'flex-end',
    fontSize: 10,
  },
})

export default Message
