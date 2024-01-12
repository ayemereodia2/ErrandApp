import { AxiosError } from 'axios'
import React, { useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { errandDetails } from '../../services/errands/errandDetails'
import { getSubErrand } from '../../services/errands/subErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { UpdateStatus } from '../../types'
import { ChatInputProp } from './ChatInput'

const MessagesList = ({
  timeline,
  scrollViewRef,
  scrollToBottom,
  errand,
  singleSubErrand,
}: ChatInputProp) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  const [acceptProposal, setAcceptProposal] = useState(false)

  const dispatch = useAppDispatch()

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const { data: runner } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )
  const { data: sender } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const respondToProposal = async (answer: string) => {
    let url = `/errand/${errand.id}/adjust-budget`
    if (singleSubErrand?.id) {
      url = `/sub-errand/${singleSubErrand?.id}/adjust-budget`
    }
    try {
      // await htt.patch(url, {
      //   answer: answer,
      // })
      await _fetch({
        method: 'PATCH',
        _url: url,
        body: { answer },
      })

      Toast.show({
        type: 'success',
        text1: 'Renegotiation  sent successfully',
      })

      setAcceptProposal(false)

      if (singleSubErrand?.id) {
        dispatch(
          getSubErrand({
            errand_id: errand.id,
            runner_id: singleSubErrand.runner_id,
          }),
        )
      } else {
        dispatch(errandDetails({ errandId: errand.id }))
      }
    } catch (err) {
      setAcceptProposal(false)

      if (err instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: err.response?.data.message,
        })
      }
    }
  }

  return (
    <ScrollView
      ref={scrollViewRef}
      className="px-2 pb-16"
      style={{ backgroundColor: backgroundTheme, height: '82%' }}
      onContentSizeChange={scrollToBottom}
    >
      <>
        {timeline?.updates.map((update, index) => {
          const checkMessageType = () => {
            switch (update.content_type) {
              case 'text':
                return <Text>{update.message}</Text>
              case 'image':
                return (
                  <View>
                    {update.message ? (
                      <Image
                        source={{ uri: update.message }}
                        alt={update.message}
                        className="w-[240px] h-[300px] object-cover"
                      />
                    ) : (
                      ''
                    )}
                  </View>
                )
              // case 'audio':
              //   return (
              //     <figure>
              //       <audio
              //         src={update.message}
              //         controls
              //         controlsList="play timeline"
              //       ></audio>
              //     </figure>
              //   )
              case 'location':
                const userLocation = JSON.parse(update.message)
                // console.log('>>>>>>>userLocation', update.message)

                return (
                  <MapView
                    style={{
                      height: 200,
                      width: 230,
                    }}
                    initialRegion={{
                      latitude: !!userLocation ? userLocation?.lat : 24.8607,
                      longitude: !!userLocation ? userLocation?.lng : 67.0011,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    {userLocation && (
                      <Marker
                        coordinate={{
                          latitude: userLocation?.lat,
                          longitude: userLocation?.lng,
                        }}
                      />
                    )}
                  </MapView>
                )

              case 'renegotiation-proposal':
                // const confirmModal = useDisclosure()
                return (
                  <View>
                    <Text>{update.message} </Text>
                    {update.status === UpdateStatus.Negotiated ? (
                      <Text className={'text-xs text-blue-300'}>
                        this proposal was negotiated
                      </Text>
                    ) : null}
                    {update.status === UpdateStatus.Rejected ? (
                      <Text className={'text-xs text-red-300'}>
                        this proposal was rejected
                      </Text>
                    ) : null}
                    {update.status === UpdateStatus.Pending &&
                    update.user_id !== currentUser.id ? (
                      <View className={'flex-row justify-between'}>
                        <TouchableOpacity
                          onPress={() => setAcceptProposal(true)}
                        >
                          <Text className={'text-green-600'}>accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => respondToProposal('reject')}
                        >
                          <Text className={'text-red-600'}> reject</Text>
                        </TouchableOpacity>
                      </View>
                    ) : null}

                    <Modal
                      backdropOpacity={0.1}
                      onBackdropPress={() => {
                        setAcceptProposal(false)
                      }}
                      isVisible={acceptProposal}
                    >
                      {/* <View style={styles.modalContainer}> */}
                      <View className="bg-white text-black w-full rounded-lg px-4 py-10 ">
                        <View className={'grid place-content-center px-5 py-3'}>
                          <Text className={'mb-2 text-black text-center'}>
                            Are you sure you want to update Errand Cost?
                          </Text>
                        </View>
                        <View className="flex-row items-center justify-center">
                          <TouchableOpacity
                            className="text-sm text-[#C82332] border-2 border-[#C82332] rounded-3xl flex justify-center font-NeueMontreal items-center p-1 px-4 bg-white"
                            onPress={() => setAcceptProposal(false)}
                          >
                            <Text>Cancel</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            className="text-sm text-[#21B06E] border-2 border-[#21B06E] ml-2 rounded-3xl flex justify-center font-NeueMontreal items-center p-1 px-4 bg-white"
                            onPress={() => respondToProposal('accept')}
                          >
                            <Text>Post update</Text>
                          </TouchableOpacity>
                        </View>
                        {/* </View> */}
                      </View>
                    </Modal>
                  </View>
                )
              default:
                return <Text>{update.message}</Text>
            }
          }

          const getChatBubblePosition = () => {
            if (!update.user_id) return 'justify-center'

            return update.user_id !== currentUser.id
              ? 'justify-end'
              : 'justify-start'
          }

          const checkUser = () => {
            return update.user_id === currentUser.id
          }

          const getUser = () => {
            if (update.source === 'sender') {
              return sender
            }
            return runner
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

          if (!update.user_id) {
            return (
              <View className={'flex-row justify-center text-xs mb-3 mx-3'}>
                <Text className={'px-2 py-1 bg-[#fff6f0] rounded-lg'}>
                  {update.message}
                </Text>
              </View>
            )
          }

          return (
            <View
              key={update.id}
              className={`py-4  px-4 flex-row ${getChatBubblePosition()}`}
            >
              <View
                className={`rounded-lg ${
                  checkUser() ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'
                }`}
              >
                <View>
                  <View className="flex-row text-xs items-center justify-start gap-4 pb-1">
                    {getUser().profile_picture !== undefined ? (
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
                    )}

                    <View>
                      <Text
                        style={{ color: textTheme }}
                        className="text-white capitalize"
                      >
                        {getUser().first_name}
                      </Text>
                      <Text className="text-[#969494]">
                        {getFormattedDate(update.created_at)}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={
                      checkUser()
                        ? 'text-black max-w-[312px] bg-[#DAE1F1] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm'
                        : 'text-black max-w-[312px] bg-[#E6E6E6] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm'
                    }
                  >
                    {checkMessageType()}
                  </View>
                  <Text className="text-[#4D4D4D] pt-2 text-xs">
                    {getFormattedTime(update.created_at)}
                  </Text>
                </View>
              </View>
            </View>
          )
        })}
      </>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})

export default MessagesList
