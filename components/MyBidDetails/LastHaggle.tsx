import { useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../services/store'
import { BidsProps } from '../../types'

export const LastHaggleComponent = ({
  navigation,
  toggleNegotiateModal,
  toggleSuccessDialogue,
  errand,
  bid,
  user_id,
  haggle,
  lastHaggle,
}: BidsProps) => {
  // Handles show reply

  // console.log('>>>>>bid', bid.haggles)

  const dispatch = useAppDispatch()

  const [isHidden, setIsHidden] = useState(true)

  const handleReplies = () => {
    setIsHidden(!isHidden)
  }

  const [isBlue, setIsBlue] = useState(true)

  const [inputValue, setInputValue] = useState('')

  const toggleColor = () => {
    setIsBlue((prevIsBlue) => !prevIsBlue)
  }

  const handleBidNavigation = () => {
    navigation.navigate('Bids')
  }

  const handleErrandDetailsNavigation = () => {
    navigation.navigate('ErrandsAndBids')
  }

  const handleBoth1 = () => {
    handleErrandDetailsNavigation()
  }

  const handleBoth2 = () => {
    handleBidNavigation()
  }

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  const { textTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const getChatBubblePosition = () => {
    // if (!update.user_id) return 'justify-center'

    return haggle.source === 'runner' ? 'justify-end' : 'justify-start'
  }

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

  return (
    <>
      {errand.errand_type === 1 && bid.state === 'accepted' ? (
        ''
      ) : (
        <>
          {haggle.id !== lastHaggle.id && (
            <>
              <View
                className={`py-4  px-4 flex-row ${getChatBubblePosition()}`}
              >
                <View
                  className={`rounded-lg ${
                    haggle.source === 'runner'
                      ? 'ml-auto max-w-[80%]'
                      : 'mr-auto max-w-[80%]'
                  }`}
                >
                  <View>
                    <View className="flex-row text-xs items-center justify-start gap-4 pb-1">
                      {/* {getUser().profile_picture !== undefined ? (
                        <Image
                          source={{ uri: getUser().profile_picture }}
                          className="w-10 h-10 rounded-full"
                        />
                      ) : (
                        <View className="bg-[#616161] rounded-full w-10 h-10 flex-row justify-center items-center">
                          <Text
                            // style={{ color: textTheme }}p
                            className="text-white"
                          >
                            {getUser().first_name.charAt(0).toUpperCase()}
                            {getUser().last_name.charAt(0).toUpperCase()}
                          </Text>
                        </View>
                      )} */}

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
                  <View className="bg-[#FEE1CD] rounded-2xl py-1 px-3 text-center mt-2 ">
                    <Text className="text-[#642B02] text-base font-bold inline-block">
                      &#x20A6;{(haggle?.amount / 100).toLocaleString()}
                    </Text>
                  </View>
                  {bid.state === 'rejected' && (
                    <View className="ml-14 text-center mt-2 inline-block bg-red-200 text-xs  px-4 py-1 rounded-2xl ">
                      <Text>
                        This bid was rejected! try placing another bid
                      </Text>
                    </View>
                  )}

                  {user_id !== errand.user_id && bid.state === 'accepted' && (
                    <View className="ml-8 mt-2 bg-[#c8e2e8] inline-block text-xs  px-2 py-1 rounded-2xl">
                      <Text>
                        Congratulations! your bid has been accepted. You can
                        begin the errand now
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </>
          )}
        </>
      )}
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
