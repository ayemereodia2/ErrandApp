import { Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { postBid } from '../../../services/errands/placeBid'
import { postFiles } from '../../../services/errands/postFiles'
import { RootState, useAppDispatch } from '../../../services/store'
import { MarketData, UserDetail } from '../../../types'
import { currencyMask, formatMoney2, parseAmount } from '../../../utils/helper'
import { ImageViewer } from '../../VerificationModals/GuarantorModal'
interface PlaceBidModalProp {
  owner: UserDetail
  errand: MarketData
  navigation: any
  onSubmit: any
}

const PlaceBidModal = ({
  owner,
  errand,
  navigation,
  onSubmit,
}: PlaceBidModalProp) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [commission, setCommisson] = useState('')
  const [willGet, setWillGet] = useState('')
  const [selectedImage, setSelectedImage] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])

  const { loading } = useSelector((state: RootState) => state.postBidReducer)

  const handlePlaceBid = () => {
    // console.log('>>>>>comment', comment, amount)

    if (!amount) {
      return setError('Please, make sure you enter all fields for this bid')
    }
    if (!comment) {
      return setError('Please, make sure you enter all fields for this bid')
    }

    const data = {
      errand_id: errand.id,
      amount: parseAmount(amount.toString()) * 100,
      description: comment,
      source: 'runner',
      dispatch,
      image_url: uploadedFiles,
      Toast,
      navigation,
    }
    setError('')
    // console.log(">>>dtaa", data)
    dispatch(postBid(data))
    onSubmit()
  }

  const pickImageAsync = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
    })

    if (!results.canceled) {
      setSelectedImage(results.assets)

      const formData = new FormData()

      for (let i = 0; i < results.assets.length; i++) {
        let localUri = results.assets[i].uri
        let filename = localUri.split('/').pop() || ''

        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        const fileObj = { uri: localUri, name: filename, type }

        formData.append('files', fileObj)
      }
      formData.append('type', 'errand')

      dispatch(postFiles({ formData, setUploadedFiles, uploadedFiles }))
    } else {
      alert('You did not select any image.')
    }
  }

  const getCommission = () => {
    let num1 = Number(amount.replace(',', ''))
    if (num1 < 20000) {
      setCommisson(`${num1 * 0.1}`)
    } else if (num1 > 20001 && num1 <= 50000) {
      setCommisson('3000')
    } else if (num1 >= 50001 && num1 <= 75000) {
      setCommisson('5000')
    } else if (num1 >= 75001 && num1 <= 100000) {
      setCommisson('7500')
    } else if (num1 > 100001 && num1 < 150000) {
      setCommisson('10000')
    } else if (num1 >= 150001 && num1 <= 250000) {
      setCommisson('15000')
    } else if (num1 > 250000) {
      setCommisson('25000')
    }

    setWillGet(
      `${
        Number(amount.replaceAll(',', '')) -
        Number(commission.replaceAll(',', ''))
      }`,
    )
  }

  useEffect(() => {
    getCommission()
  })

  const { loading: uploadingImages } = useSelector(
    (state: RootState) => state.postFilesReducer,
  )

  const removeImage = (index: number) => {
    const allFiles = [...uploadedFiles]
    allFiles.splice(index, 1)
    setUploadedFiles(allFiles)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
    >
      <ScrollView
        style={{ backgroundColor: backgroundTheme }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View
          className="py-4 pb-10"
          style={{ backgroundColor: backgroundTheme }}
        >
          <Pressable onPress={() => Keyboard.dismiss()}>
            <Text
              className="text-lg text-center font-semibold"
              style={{ color: textTheme }}
            >
              Enter Your Bid
            </Text>

            <View className="px-4 mt-6">
              <Text
                className="text-sm text-[#243763] font-semibold"
                style={{ color: textTheme }}
              >
                Amount
              </Text>

              <View className="border border-[#E6E6E6] bg-white  text-xs rounded-lg  flex-row space-x-2 justify-center items-center">
                <Text className="text-lg pl-1 ">&#x20A6;</Text>

                <TextInput
                  className="w-full"
                  placeholder="Enter Amount"
                  onChangeText={(e) => setAmount(currencyMask(e))}
                  value={amount}
                  keyboardType="numeric"
                  style={styles.input}
                />
              </View>
            </View>

            <View className="flex-row justify-between pt-2 px-4">
              <Text>
                Amount you will get:{' '}
                <Text className="font-bold">
                  {formatMoney2(willGet).toString().slice(0, -3)}
                </Text>
              </Text>
              <Text>
                Service charge :{' '}
                <Text className="font-bold">
                  {formatMoney2(commission).toString().slice(0, -3)}
                </Text>
              </Text>
            </View>

            <View className="px-4 mt-4">
              <Text
                className="text-sm font-semibold text-[#243763]"
                style={{ color: textTheme }}
              >
                Comment
              </Text>

              <View className="w-full border bg-white border-[#E6E6E6] text-sm py-2.5 mt-2 rounded-lg px-3">
                <TextInput
                  className={'w-full  text-sm py-1.5 mt-2 rounded-lg px-3'}
                  placeholder="Describe the issue that you need help with."
                  onChangeText={(e) => setComment(e)}
                  value={comment}
                  multiline={true}
                  numberOfLines={10}
                  style={{ height: 80, textAlignVertical: 'top' }}
                  keyboardType="default"
                  // onFocus={handleCommentFocus}
                  // onBlur={handleCommentBlur}
                />
              </View>
            </View>

            <View className="px-4 mt-2">
              {uploadingImages ? (
                <View className="flex-row justify-center items-center mt-16 space-x-2">
                  <ActivityIndicator color="blue" size="small" />
                  <Text>Uploading Images..</Text>
                </View>
              ) : (
                <>
                  {uploadedFiles.length === 0 ? (
                    <TouchableOpacity
                      onPress={() => {
                        pickImageAsync()
                      }}
                      className=""
                    >
                      <Text className="mx-auto mt-8">
                        <Feather name="image" size={40} color="#3F60AC" />
                      </Text>
                      <Text className="mx-auto text-[#808080]">
                        Select images or{' '}
                        <Text className="text-[#3F60AC] font-semibold">
                          Browse
                        </Text>
                      </Text>
                      <Text className="mx-auto text-[#808080]">
                        3 images maximum
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    <ScrollView horizontal className="ml mt-4">
                      {uploadedFiles.map((img, index) => {
                        // console.log('>>>>>>img=----', img)
                        return (
                          <ImageViewer
                            placeholderImageSource={''}
                            selectedImage={img}
                            index={index}
                            removeImage={removeImage}
                          />
                        )
                      })}
                    </ScrollView>
                  )}
                </>
              )}
            </View>

            <View className="flex-row justify-center items-center">
              <TouchableOpacity
                className="bg-[#1E3A79] h-12 w-4/6 mt-10 flex-row justify-center items-center rounded-lg"
                onPress={() => {
                  handlePlaceBid()
                }}
              >
                <Text className="text-white text-base">
                  {loading ? (
                    <ActivityIndicator size="small" color="#000000" />
                  ) : (
                    'Submit Your Bid'
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    zIndex: 100,
    backgroundColor: 'white',
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 20,
    width: 300,
    padding: 4,
    backgroundColor: '#fff',
  },
})

export default PlaceBidModal
