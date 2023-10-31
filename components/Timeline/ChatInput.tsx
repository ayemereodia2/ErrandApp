import { AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import {
  Image,
  Pressable,
  ScrollView,
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
import { useSharedValue } from 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { errandDetails } from '../../services/errands/errandDetails'
import {
  postFiles,
  setUploadedFilesToNull,
} from '../../services/errands/postFiles'
import { getSubErrand } from '../../services/errands/subErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { timelineAction } from '../../services/timeline/sendMessage'
import { MarketData, SingleSubErrand, Timelines } from '../../types'
import { currencyMask, parseAmount } from '../../utils/helper'
import AdjustAmountModal from '../Modals/Bids/Proposal'

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
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [isModalVisible, setModalVisible] = useState(false)
  const [newPriceModal, setNewPriceModal] = useState(false)
  const [amount, setAmount] = useState('')
  const adjustAmountRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['55%'], [])

  function toggleAmountAdjustment(open: boolean) {
    open
      ? adjustAmountRef.current?.present()
      : adjustAmountRef.current?.dismiss()
  }

  const toggleModal = () => {
    setModalVisible(!isModalVisible)
  }

  const toggleImageModal = () => {
    setImageSelected(!imageSelected)
  }

  const toggleNewPriceModal = () => {
    setNewPriceModal(!newPriceModal)
  }

  const { data: runner } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )
  const { data: sender } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const { data: images, loading: uploadingImages } = useSelector(
    (state: RootState) => state.postFilesReducer,
  )

  const handleSheetChanges = useCallback((index: number) => {
    // console.log('handleSheetChanges', index)
    // toggleAmountAdjustment(false)
  }, [])

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior="collapse"
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => toggleAmountAdjustment(false)}
      />
    ),
    [],
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

    console.log('data', data)

    await dispatch(timelineAction(data))
    // dispatch(errandDetails({ errandId: errand.id }))
    setChatBubble('')
    scrollToBottom()
  }

  const sendProposal = async () => {
    if (!amount) {
      return
    }
    let url = `/errand/${errand.id}/adjust-budget`
    if (subErrand?.id) {
      url = `/sub-errand/${subErrand?.id}/adjust-budget`
    }
    try {
      const rs = await _fetch({
        method: 'POST',
        _url: url,
        body: { amount: parseAmount(amount.toString()) * 100 },
      })

      const _rs = await rs.json()

      setAmount('')
      toggleNewPriceModal()
      Toast.show({
        type: 'success',
        text1: 'Renegotiation proposal sent successfully',
      })

      if (subErrand?.id) {
        dispatch(
          getSubErrand({
            errand_id: errand.id,
            runner_id: subErrand.runner_id,
          }),
        )
        setAmount('')
        toggleAmountAdjustment(false)
      } else {
        dispatch(errandDetails({ errandId: errand.id }))
      }
    } catch (err) {
      Toast.show({
        type: 'success',
        text1: err.response?.data.message,
      })
    }
  }

  const getUserLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      Toast.show({
        type: 'error',
        text1: 'Permission to access location was denied',
      })

      return
    }

    let location = await Location.getCurrentPositionAsync({})
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
      const image = result.assets[0].uri
      setSelectedImage(image)
      toggleImageModal()

      const formData = new FormData()

      let localUri = image
      let filename = localUri.split('/').pop() || ''
      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `image/${match[1]}` : `image`

      const fileObj = { uri: localUri, name: filename, type }

      formData.append('type', 'timeline')
      formData.append('files', fileObj)

      dispatch(postFiles({ formData, setUploadedFiles, uploadedFiles }))
    } else {
      alert('You did not select any image.')
    }
  }

  const handleFileUpload = () => {
    if (user_id === sender.id) {
      sendMessage('request', 'image', images[0])
      dispatch(setUploadedFilesToNull([]))
      console.log('Requesting update')
    } else {
      sendMessage('sender', 'image', images[0])
      dispatch(setUploadedFilesToNull([]))
    }
    toggleImageModal()
  }

  return (
    <BottomSheetModalProvider>
      <ScrollView
        className="bg-[#CBD5EC] mx-auto h-60"
        //  style={{ backgroundColor: '#CBD5EC', height: 120 }}
      >
        <View className="flex-row justify-center items-center px-6 mt-2">
          <View className="flex-row justify-between items-center mt-2  bg-white w-full space-x-2 py-2 px-3 h-14">
            <View className="flex-row space-x-2 justify-center items-center">
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
              {/* <MaterialIcons name="attach-file" size={24} /> */}

              <Text
                onPress={() => toggleAmountAdjustment(true)}
                className="text-xl"
              >
                &#8358;
              </Text>
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
              <AntDesign
                name="arrowright"
                className=""
                color="white"
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <Modal
          onBackdropPress={() => {
            toggleModal()
          }}
          isVisible={isModalVisible}
        >
          <View
            style={{ backgroundColor: 'white', height: 300, borderRadius: 10 }}
          >
            <MapView
              style={{
                height: 230,
              }}
              showsUserLocation={true}
              followsUserLocation={true}
              initialRegion={{
                latitude: !!userLocation
                  ? userLocation.coords.latitude
                  : 24.8607,
                longitude: !!userLocation
                  ? userLocation.coords.longitude
                  : 67.0011,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              {userLocation && (
                <Marker
                  coordinate={!!userLocation ? userLocation?.coords : {}}
                />
              )}
            </MapView>

            <View className="flex-row justify-center items-center space-x-4 mt-4 mr-6">
              <Pressable
                onPress={toggleModal}
                className="flex-row items-center"
              >
                <MaterialIcons name="delete" size={24} color="red" />
                <Text className="text-red-500 text-xs">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={() => handleLocationSending()}
                className="flex-row items-center space-x-1"
              >
                <FontAwesome name="send-o" color="#3F60AC" size={20} />
                <Text className="text-[#3F60AC] text-xs">Send</Text>
              </Pressable>
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
            {selectedImage ? (
              <Image
                source={{ uri: selectedImage }}
                className="mx-auto w-[80%] h-[220px] mt-5"
              />
            ) : (
              ''
            )}

            <View className="flex-row justify-center items-center space-x-4 mt-4 mr-6">
              <Pressable
                onPress={() => toggleImageModal()}
                className="flex-row items-center"
              >
                <MaterialIcons name="delete" size={24} color="red" />
                <Text className="text-red-500 text-xs">Cancel</Text>
              </Pressable>
              <Pressable
                onPress={handleFileUpload}
                className="flex-row items-center space-x-1"
              >
                <FontAwesome name="send-o" color="#3F60AC" size={20} />
                <Text className="text-[#3F60AC] text-xs">Send</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          onBackdropPress={() => {
            toggleNewPriceModal()
          }}
          isVisible={newPriceModal}
        >
          <View
            style={{ backgroundColor: 'white', height: 150, borderRadius: 10 }}
          >
            <View className="px-4 mt-4">
              <Text className="text-sm text-[#243763] font-light">
                Set New Errand Amount
              </Text>

              <View className="border border-[#E6E6E6] bg-[#F5F5F5] w-full  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
                <Text className="text-lg ">&#x20A6;</Text>

                <TextInput
                  className="w-full"
                  placeholder="Enter amount"
                  onChangeText={(e) => setAmount(currencyMask(e))}
                  value={amount}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>

            <View className="flex-row justify-center items-center space-x-4 mt-4 mr-6">
              <Pressable
                onPress={() => sendProposal()}
                className="flex-row items-center space-x-1"
              >
                <FontAwesome name="send-o" color="#3F60AC" size={20} />
                <Text className="text-[#3F60AC] text-xs">Submit</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <BottomSheetModal
          ref={adjustAmountRef}
          index={0}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          onChange={handleSheetChanges}
          keyboardBehavior="extend"
          enablePanDownToClose
          keyboardBlurBehavior="restore"
          // android_keyboardInputMode="adjustResize"
        >
          <AdjustAmountModal
            toggleAmountAdjustment={toggleAmountAdjustment}
            amount={amount}
            setAmount={setAmount}
            sendProposal={sendProposal}
          />
        </BottomSheetModal>
      </ScrollView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
})

export default ChatInput
