import { AntDesign } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  Platform,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import ScreenHeader from '../../components/ScreenHeader'
import { createErrand } from '../../services/errands/createErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { CreateErrandRequest, PostErrandData } from '../../types'
import { currencyMask, parseAmount } from '../../utils/helper'

interface LatLng {
  lat: number
  lng: number
}

const QuickErrand = ({ navigation, route }: any) => {
  const { category } = route.params
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [firstAddress, setFirstAddress] = useState('')
  const [clicked, setClicked] = useState(false)
  const dispatch = useAppDispatch()
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [deliveryLocation, setDeliveryLocation] = useState<string>('')
  const bottomSheetRef2 = useRef<BottomSheetModal>(null)
  const [remote, setRemote] = useState(false)

  function openSettingsModal() {
    bottomSheetRef2.current?.present()
  }

  const [
    currentLocationLatLng,
    setCurrentLocationLatLng,
  ] = useState<LatLng | null>(null)
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)
  const [locationError, setLocationError] = useState('')

  const { loading: creatingErrand } = useSelector(
    (state: RootState) => state.createErrandReducer,
  )

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          bottomSheetRef2.current?.dismiss()
          bottomSheetRef2.current?.dismiss()
        }}
      />
    ),
    [],
  )

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const [postErrandData, setPostErrandData] = useState<PostErrandData>({
    errandType: 'single',
    description: '',
    categoryId: '',
    categoryName: '',
    deliveryAddress: '',
    currentLocation: '',
    type: '',
    budget: 0,
    audio: '',
    images: [],
    dur_value: '',
    dur_period: 1,
    res_by_qualification: 'No',
    res_by_verification: 'No',
    ins_amount: 0.0,
    insurance: '',
  })

  const submitErrandhandler = async () => {
    const errandId = (await AsyncStorage.getItem('errandId')) || ''

    if (!description) {
      return setLocationError('Description is required')
    }

    if (!amount) {
      return setLocationError('Amount is required')
    }

    if (!currentLocation && !deliveryLocation) {
      return setLocationError('Please enter a location to continue')
    }

    const { type, res_by_qualification, errandType } = postErrandData

    const data: CreateErrandRequest = {
      errand_type: errandType,
      description,
      duration: { period: 'days', value: 0 },
      images: [],
      restriction: res_by_qualification ? 'qualification' : 'verification',
      pickup_location: { lat: 0, lng: 0 },
      dropoff_location: { lat: 0, lng: 0 },
      budget: parseAmount(amount.toString()) * 100,
      type,
      category: category.id,
      audio: '',
      errandId,
      navigation,
      Toast,
      has_insurance: false,
      insurance_amount: 0,
      pickup_text: currentLocation,
      dropoff_text: deliveryLocation,
      dispatch,
    }

    dispatch(createErrand({ ...data }))
  }

  useEffect(() => {
    dispatch(walletAction({ request: 'wallet' }))
  }, [])

  const handleClicked = () => {
    setClicked(!clicked)
  }

  const { data, loading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  const [mapRegion, setMapRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const handleLocationSelect = (
    data: any,
    details: any,
    locationType: 'currentLocation' | 'deliveryAddress',
  ) => {
    const { lat, lng } = details.geometry.location

    if (locationType === 'currentLocation') {
      setCurrentLocation(data.description)
      setCurrentLocationLatLng({ lat, lng })
    }
    setDeliveryLocation(data.description)

    setMapRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }

  useEffect(() => {
    setCurrentWalletAmount(Number(data?.balance) / 100)
  }, [data?.balance])

  useEffect(() => {
    if (remote) {
      setCurrentLocation('remote')
    } else {
      setCurrentLocation('')
    }
  }, [remote])

  return (
    <>
      <BottomSheetModalProvider>
        <ScrollView
          keyboardShouldPersistTaps="always"
          style={{ backgroundColor: backgroundTheme }}
          // className="px-4"
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <ScreenHeader
            navigation={navigation}
            textTheme={textTheme}
            screen={'Create Errand'}
            openSettingsModal={openSettingsModal}
          />
          <KeyboardAwareScrollView
            style={{ backgroundColor: backgroundTheme }}
            contentContainerStyle={{ flexGrow: 1 }}
            extraScrollHeight={Platform.OS === 'ios' ? -100 : 0}
            enableOnAndroid={true}
            keyboardShouldPersistTaps="always"
          >
            <View className="px-6">
              <TouchableOpacity onPress={() => Keyboard.dismiss()}>
                {locationError ? (
                  <Text className="text-red-500 text-base mt-6">
                    {locationError}
                  </Text>
                ) : (
                  ''
                )}
                <View className="mt-6 flex-row items-center justify-between">
                  <Text
                    style={{ color: textTheme, fontFamily: 'Axiforma' }}
                    className="font-normal text-[#393F42] text-[16px] leading-5"
                  >
                    What do you need help with?{' '}
                  </Text>
                </View>

                <View className="flex-row bg-white justify-between pl-3 py-2 pr-5 border border-[#96A0A5] mt-2 rounded-lg">
                  <Text
                    className="text-[16px] font-normal text-[#6D6D6D]"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    {category?.name}
                  </Text>
                  <Text>
                    <AntDesign name="lock" size={24} color="black" />
                  </Text>
                </View>
              </TouchableOpacity>

              <View className="mt-5">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-[16px] font-normal text-[#393F42]"
                >
                  Description
                </Text>

                <View className="w-full bg-white border border-[#96A0A5] text-sm mt-2 rounded-lg">
                  <TextInput
                    className={'w-full text-[14px] mt-2 rounded-lg px-3'}
                    placeholder="Give the full details of what you need help with"
                    onChangeText={(e) => setDescription(e)}
                    value={description}
                    multiline={true}
                    numberOfLines={10}
                    style={{
                      height: 100,
                      textAlignVertical: 'top',
                      fontFamily: 'Axiforma',
                    }}
                    keyboardType="default"
                  />
                </View>
              </View>

              <View className=" mt-5">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-[16px] font-normal text-[#393F42]"
                >
                  Amount
                </Text>

                <View className="border border-[#96A0A5] bg-white text-[14px] py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
                  {/* <Text className="text-lg ">&#x20A6;</Text> */}
                  <Text
                    style={{ fontFamily: 'Axiforma' }}
                    className="text-[16px] text-[#6D6D6D] font-normal pt-1 "
                  >
                    NGN
                  </Text>

                  <TextInput
                    className="w-full text-[14px]"
                    style={{ fontFamily: 'Axiforma' }}
                    placeholder="Enter amount"
                    onChangeText={(e) => setAmount(currencyMask(e))}
                    value={amount}
                    keyboardType="decimal-pad"
                  />
                </View>

                <TouchableOpacity
                  onPress={() => {
                    setCurrentWalletAmount(Number(data?.balance) / 100)
                    navigation.navigate('FundWalletModal', {
                      currentWalletAmount,
                    })
                  }}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-row items-center">
                    <Text
                      style={{ color: textTheme, fontFamily: 'Axiforma' }}
                      className="ml-2 pt-2 pr-2 text-[#6D6D6D] text-[12px]"
                    >
                      Wallet Balance:
                    </Text>
                    <Text
                      style={{ fontFamily: 'Axiforma' }}
                      className="text-sm pt-2 font-md text-[#1E3A79]"
                    >
                      ₦
                      {Number(data?.balance) === 0
                        ? '0.00'
                        : (Number(data?.balance) / 100).toLocaleString()}
                    </Text>
                  </View>

                  <Text
                    style={{ fontFamily: 'Axiforma' }}
                    className="ml-2 pt-2 pr-2 text-[#1E3A79] text-[12px] underline"
                  >
                    Fund Wallet
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text
              style={{ fontFamily: 'Axiforma' }}
              className="text-base font-normal text-[16px] text-[#0C426F] px-6 pt-4"
            >
              Add your address
            </Text>
            {!remote ? (
              <View style={{ display: 'flex' }} className=" px-6 ">
                <Text
                  className="text-base text-[#393F42] mt-6 text-[16px]"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  Pick Up Location
                </Text>
                <GooglePlacesAutocomplete
                  placeholder="Enter Pickup Address"
                  onPress={(data, details) =>
                    handleLocationSelect(data, details, 'currentLocation')
                  }
                  textInputProps={{
                    onChangeText: (text) => {
                      setCurrentLocation(text)
                    },
                    defaultValue: postErrandData.currentLocation,
                  }}
                  fetchDetails={true}
                  query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_KEY,
                    language: 'en',
                  }}
                  styles={{
                    container: styles.googlePlacesContainer,
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    listView: styles.listView,
                  }}
                />

                <Text
                  className="text-base text-[#393F42] mt-3"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  Delivery/ End Location
                </Text>
                <GooglePlacesAutocomplete
                  placeholder="Enter Delivery Address"
                  onPress={(data, details) =>
                    handleLocationSelect(data, details, 'deliveryAddress')
                  }
                  textInputProps={{
                    onChangeText: (text) => {
                      setDeliveryLocation(text)
                    },
                    defaultValue: postErrandData.deliveryAddress,
                  }}
                  fetchDetails={true}
                  query={{
                    key: process.env.EXPO_PUBLIC_GOOGLE_KEY,
                    language: 'en',
                  }}
                  styles={{
                    container: styles.googlePlacesContainer,
                    textInputContainer: styles.textInputContainer,
                    textInput: styles.textInput,
                    listView: styles.listView,
                  }}
                />
              </View>
            ) : null}

            <View className=" px-6 flex-row items-center pb-[50px] pt-2">
              <Text
                style={{ fontFamily: 'Axiforma' }}
                className="text-[#243763] pr-2"
              >
                Remote
              </Text>

              <Switch
                value={remote}
                onValueChange={(val: boolean) => {
                  setRemote(val)
                }}
              />
            </View>

            <View className="flex-row justify-center w-full mb-20">
              <TouchableOpacity
                onPress={() => submitErrandhandler()}
                className="bg-[#09497D] py-3 w-[350px] flex-row justify-center items-center rounded-lg "
              >
                {creatingErrand ? (
                  <ActivityIndicator size="small" color="blue" />
                ) : (
                  <Text
                    className="text-[#EEF2F3] text-base text-center"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    Post Errand
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetRef2}
          index={0}
          snapPoints={['55%']}
          containerStyle={{
            marginHorizontal: 10,
          }}
          backdropComponent={renderBackdrop}
        >
          <Content navigation={navigation} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
    backgroundColor: 'red',
  },
  input: {
    borderWidth: 1,

    padding: 10,
    fontSize: 7,
  },
  googlePlacesContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    fontFamily: 'Axiforma',
    height: 45,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#96A0A5',
    paddingHorizontal: 14,
    marginTop: 10,
    backgroundColor: '#fff',
  },
  listView: {
    paddingHorizontal: 2,
  },
})
export default QuickErrand
