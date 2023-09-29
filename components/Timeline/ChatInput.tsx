import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import React, { useState } from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import Modal from 'react-native-modal'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import Animated, { useSharedValue } from 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../services/store'
import { timelineAction } from '../../services/timeline/sendMessage'
import { theme } from '../../theme'
import { MarketData, SingleSubErrand, Timelines } from '../../types'

export interface ChatInputProp {
  message?: string
  time?: string
  timeline?: Timelines
  errand: MarketData
  user_id?: string
  scrollViewRef: React.MutableRefObject<any>
  scrollToBottom: () => void
  subErrand?: SingleSubErrand
}

const ChatInput = ({
  errand,
  user_id,
  scrollToBottom,
  subErrand,
}: ChatInputProp) => {
  const [message, setMessage] = useState('')
  const [chatBubble, setChatBubble] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const height = useSharedValue(70)
  const dispatch = useAppDispatch()
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')
  const [userLocation, setUserLocation] = useState<any>()
  const [selectedImage, setSelectedImage] = useState('')
  const [imageSelected, setImageSelected] = useState(false)

  const [isModalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const toggleImageModal = () => {
    setImageSelected(!imageSelected)
  }

  const { data: runner } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )
  const { data: sender } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const sendMessage = async (
    messageType: string,
    contentType: string,
    message: string[] | string,
  ) => {
    console.log('>>>>>>>message--', message)

    if (!message) {
      return
    }
    const data = {
      errand_id: errand.id,
      sub_errand_id: subErrand?.id,
      message,
      method: 'POST',
      dispatch,
      Toast,
      user_id,
      contentType,
      type: '',
    }
    if (errand?.user_id === user_id || subErrand?.sender_id === user_id) {
      data.type = 'request'
    }
    // if (message) {
    //   errand?.user_id !== user_id
    //     ? dispatch(
    //         timelineAction({
    //           errand_id: errand?.id,
    //           user_id,
    //           method: 'POST',
    //           dispatch,
    //           message,
    //           type: 'text',
    //         }),
    //       )
    //     : dispatch(
    //         timelineAction({
    //           errand_id: errand?.id,
    //           user_id,
    //           method: 'POST',
    //           dispatch,
    //           message,
    //           type: 'request',
    //         }),
    //       )
    // }

    await dispatch(timelineAction(data))
    // dispatch(errandDetails({ errandId: errand.id }))
    setChatBubble('')
    scrollToBottom()
  }

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    console.log('>>>>>>>statys', status)

    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permission to access location was denied',
      })

      return
    }

    let location = await Location.getCurrentPositionAsync({})
    console.log('>>>>locaitom', location)
    setLocation(location)
    setUserLocation(location)
  }

  const handleChatSend = () => {
    if (user_id === sender.id) {
      sendMessage('request', 'text', chatBubble)
    } else {
      sendMessage('sender', 'text', chatBubble)
    }
  }

  const handleLocationSending = () => {
    if (user_id === sender.id) {
      sendMessage(
        'request',
        'location',
        JSON.stringify({
          lat: userLocation.coords.latitude,
          lng: userLocation.coords.longitude,
        }),
      )
    } else {
      sendMessage('sender', 'location', JSON.stringify(userLocation))
    }

    toggleModal()
  }

  const handleFilePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri)
      toggleImageModal()
    } else {
      alert('You did not select any image.')
    }
  }

  return (
    <Animated.View
      className="bg-[#CBD5EC] mx-auto h-44 "
      //  style={{ backgroundColor: '#F8F9FC', height: '78%' }}
      // style={[styles.container, heightAnimatedStyle]}
    >
      <View className="flex-row justify-center items-center px-6 mt-2">
        <View className="flex-row justify-between items-center mt-2  bg-white w-full space-x-2 py-2 px-3 h-14">
          <View className="flex-row space-x-2">
            {/* <FontAwesome
              onPress={() => {
                getUserLocation()
              }}
              name="map-marker"
              size={24}
            /> */}
            {/* <MaterialIcons name="add" size={24} /> */}
            <Menu
              style={{
                shadowColor: 'none',
                shadowOpacity: 0,
                borderRadius: 30,
              }}
            >
              <MenuTrigger onPress={() => getUserLocation()}>
                <MaterialIcons name="add" size={24} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionWrapper: {
                    marginTop: 6,
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              >
                <View className="flex-row justify-start pl-4 items-center">
                  <FontAwesome name="map-marker" size={18} />
                  <MenuOption
                    onSelect={() => {
                      toggleModal()
                    }}
                    text="Share location"
                    customStyles={{
                      optionWrapper: {
                        paddingVertical: 6,
                      },
                      optionText: {
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: '300',
                      },
                    }}
                  />
                </View>
                <View className="flex-row justify-start pl-4 items-center pb-2">
                  <MaterialIcons name="attach-file" size={16} />
                  <MenuOption
                    onSelect={() => {
                      handleFilePicker()
                    }}
                    text="Share file"
                    customStyles={{
                      optionWrapper: {
                        paddingVertical: 2,
                      },
                      optionText: {
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: '300',
                      },
                    }}
                  />
                </View>
              </MenuOptions>
            </Menu>
            <MaterialIcons name="attach-file" size={24} />
          </View>
          <TextInput
            multiline
            placeholder={'Type something...'}
            // style={styles.input}
            className="w-[205px]"
            value={chatBubble}
            onChangeText={(text) => setChatBubble(text)}
          />
          <TouchableOpacity
            onPress={() => {
              handleChatSend()
            }}
            className="bg-[#3F60AC] flex-row justify-center items-center w-10 rounded-lg h-10"
          >
            <AntDesign name="arrowright" className="" color="white" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        onBackdropPress={() => {
          toggleModal()
          console.log('>>>>>userLocation', userLocation)
        }}
        isVisible={isModalVisible}
      >
        <View
          style={{ backgroundColor: 'white', height: 300, borderRadius: 10 }}
        >
          <MapView
            style={{
              height: 200,
            }}
            showsUserLocation={true}
            followsUserLocation={true}
            initialRegion={{
              latitude: !!userLocation ? userLocation.coords.latitude : 24.8607,
              longitude: !!userLocation
                ? userLocation.coords.longitude
                : 67.0011,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {userLocation && (
              <Marker coordinate={!!userLocation ? userLocation?.coords : {}} />
            )}
          </MapView>

          <View className="flex-row justify-center items-center space-x-4 mt-6">
            <TouchableOpacity
              onPress={toggleModal}
              className="w-[100px] py-2 rounded-xl  border border-red-300"
            >
              <Text className="text-red-500 text-center">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLocationSending()}
              className=" py-2 w-[120px] rounded-xl  border-green-400 border"
            >
              <Text className="text-green-400 text-center">Post Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        onBackdropPress={() => {
          toggleImageModal()
        }}
        isVisible={imageSelected}
      >
        <View
          style={{ backgroundColor: 'white', height: 300, borderRadius: 10 }}
        >
          <Image source={{ uri: selectedImage }} className="mx-auto w-[60%] h-[200px] mt-5"  />

          <View className="flex-row justify-end items-center space-x-4 mt-6 mr-6">
            <MaterialIcons onPress={() => toggleImageModal()} name="delete" size={24} color="red" />
            <FontAwesome name="send-o" size={20} />
          </View>
        </View>
      </Modal>
      {/* <EmojiPicker /> */}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#CBD5EC',
  },
  replyContainer: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  closeReply: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
  reply: {
    marginTop: 5,
  },
  innerContainer: {
    paddingHorizontal: 4,
    marginHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 10,
  },
  // inputAndMicrophone: {
  // 	flexDirection: "row",
  // 	backgroundColor: theme.colors.inputBackground,
  // 	flex: 3,
  // 	marginRight: 10,
  // 	paddingVertical: Platform.OS === "ios" ? 10 : 0,
  // 	borderRadius: 30,
  // 	alignItems: "center",
  // 	justifyContent: "space-between",
  // },
  input: {
    backgroundColor: 'transparent',
    paddingLeft: 10,
    color: theme.colors.inputText,
    flex: 3,
    fontSize: 15,
    height: 30,
    alignSelf: 'center',
  },
  rightIconButtonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 15,
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderLeftColor: '#fff',
  },
  swipeToCancelView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 30,
  },
  swipeText: {
    color: theme.colors.description,
    fontSize: 15,
  },
  emoticonButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  recordingActive: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
  },
  recordingTime: {
    color: theme.colors.description,
    fontSize: 20,
    marginLeft: 5,
  },
  microphoneAndLock: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  lockView: {
    backgroundColor: '#eee',
    width: 60,
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: 130,
    paddingTop: 20,
  },
  sendButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default ChatInput
