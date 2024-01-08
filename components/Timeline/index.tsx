import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { userDetails } from '../../services/auth/userInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData, SingleSubErrand } from '../../types'
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
  setSubErrand: React.Dispatch<React.SetStateAction<SingleSubErrand>>

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
  setSubErrand
}: Props) => {
  // const { username, bio, picture, isBlocked, isMuted } = route.params;
  const [reply, setReply] = useState('')
  const completeDialogueRef = useRef<BottomSheetModal>(null)
  const scrollViewRef = useRef<any>()
  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true })
    }
  }

  const closeReply = () => {
    setReply('')
  }
  const dispatch = useAppDispatch()
  const timeline =
    manageErrandClicked || errand.errand_type === 1
      ? singleSubErrand.timeline
      : errand.timeline

  console.log('>>>>>sub', timeline.updates)

  useEffect(() => {
    // if (singleSubErrand !== undefined) {
    //   dispatch(userDetails({ user_id: errand.user_id }))

    //   dispatch(
    //     externalUserDetails({
    //       user_id: singleSubErrand?.runner_id,
    //     }),
    //   )
    // }
    if (errand.runner_id) {
      dispatch(
        externalUserDetails({
          user_id: errand.user_id,
        }),
      )

      dispatch(userDetails({ user_id: errand.runner_id }))
    }
  }, [])

  const keyboardVerticalOffset = Platform.OS === 'ios' ? -60 : 80

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  if (loadingErrand) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
      >
        <ActivityIndicator color={theme ? 'white' : 'blue'} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <BottomSheetModalProvider>
      {/* <KeyboardAvoidingView
        keyboardVerticalOffset={keyboardVerticalOffset}
        // keyboardVerticalOffset={Platform.OS === 'ios' ? 64 :  StatusBar.currentHeight || 0 + 450}
        // style={{ flex: 1, backgroundColor: backgroundTheme }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
          // behavior="position"
        style={{
          flex: 1,
          height: Platform.OS === 'android' ? Dimensions.get('window').height - (30) : '80%',
        }}
      > */}

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <View>
          {/* <View className="h-[56px] bg-[#FEE1CD] mx-4 items-center justify-center border border-[#C85604] mt-4 rounded-lg">
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

            {errand.status === 'abandoned' && (
              <Text className="font-medium text-sm px-4">
                This Errand has been abandoned
              </Text>
            )}

            {errand.status === 'cancelled' ||
              (singleSubErrand?.status === 'cancelled' && (
                <Text className="font-medium text-sm px-4">
                  This Errand has been cancelled
                </Text>
              ))}

            {errand.status === 'cancelled' && (
              <Text className="font-medium text-sm px-4">
                This Errand has been cancelled
              </Text>
            )}
          </View> */}

          <MessagesList
            timeline={timeline}
            errand={errand}
            scrollViewRef={scrollViewRef}
            scrollToBottom={scrollToBottom}
            singleSubErrand={singleSubErrand}
            setSubErrand={setSubErrand}
          />

          {errand.status === 'completed' ||
          errand.status === 'cancelled' ||
          errand.status === 'abandoned' ||
          singleSubErrand?.status === 'completed' ||
          singleSubErrand?.status === 'cancelled' ? (
            <View
              style={{ backgroundColor: backgroundTheme }}
              className={`h-44 flex`}
            >
              {/* <View className="flex-row justify-center items-center px-6 mt-6">
                <Text
                  className={`${
                    errand.status === 'completed' ||
                    singleSubErrand?.status === 'completed'
                      ? ' text-green-700 '
                      : errand.status === 'cancelled' ||
                        singleSubErrand?.status === 'cancelled'
                      ? ' text-red-700'
                      : ''
                  } font-md text-base px-4`}
                >
                  This Errand has been{' '}
                  {singleSubErrand?.status === 'completed' ||
                  singleSubErrand?.status === 'cancelled'
                    ? singleSubErrand.status
                    : errand.status}
                </Text>
              </View> */}
            </View>
          ) : (
            <ChatInput
              errand={errand}
              subErrand={singleSubErrand}
              user_id={user_id}
              scrollViewRef={scrollViewRef}
              scrollToBottom={scrollToBottom}
            />
          )}
        </View>

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
