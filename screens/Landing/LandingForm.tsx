import { AntDesign, FontAwesome, Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { createErrand } from '../../services/errands/createErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { CreateErrandRequest, PostErrandData } from '../../types'
import { currencyMask, parseAmount } from '../../utils/helper'
import Checkbox from 'expo-checkbox'

interface LatLng {
  lat: number
  lng: number
}

const LandingForm = ({ navigation, route }: any) => {
  const { category } = route.params
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [firstAddress, setFirstAddress] = useState('')
  const [clicked, setClicked] = useState(false)
  const dispatch = useAppDispatch()
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [deliveryLocation, setDeliveryLocation] = useState<string>('')

  const [
    currentLocationLatLng,
    setCurrentLocationLatLng,
  ] = useState<LatLng | null>(null)
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)

  const { loading: creatingErrand } = useSelector(
    (state: RootState) => state.createErrandReducer,
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

    const {
      dur_period,
      dur_value,
      categoryId,
      audio,
      type,
      ins_amount,
      insurance,
      res_by_qualification,
      res_by_verification,
      errandType,
      deliveryAddress,
    } = postErrandData

    const data: CreateErrandRequest = {
      errand_type: errandType,
      description,
      duration: { period: 'days', value: 0 },
      images: [],
      restriction: res_by_qualification ? 'qualification' : 'verification',
      // pickup_location: { lat: pickup?.lat, lng: pickup?.lng },
      // dropoff_location: { lat: delivery?.lat, lng: delivery?.lng },
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
      dropoff_text: '',
      dispatch,
    }

    dispatch(createErrand({ ...data }))
  }

  useEffect(() => {
    dispatch(walletAction({ request: 'wallet' }))
    // getTransactions()644
  }, [])

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         className="flex-row items-center justify-between mx-0 py-3 mr-6"
  //         onPress={() => navigation.goBack()}
  //       >
  //         <AntDesign name="arrowleft" size={24} color={textTheme} />
  //       </TouchableOpacity>
  //     ),
  //     headerStyle: { backgroundColor: backgroundTheme },
  //     headerTitleStyle: { color: textTheme },
  //     title: 'Quick Errand',
  //   })
  // }, [navigation])

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

  return (
    <>

<ScrollView
        keyboardShouldPersistTaps="always"
        style={{ backgroundColor: backgroundTheme }}
        // className="px-4"
        contentContainerStyle={{ flexGrow: 1 }}
        
      >

<View>
<View className='bg-purple-200 h-[160px] w-screen shadow-md' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
  <View className='bg-[#09497D] h-[150px] pt-[70px] px-6 pb-3 pl-[27px]' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
              <View
                className={
                  Platform.OS === 'android'
                    ? 'flex-row items-center justify-between mt-6'
                    : 'flex-row items-center justify-between'
                }
              >
          <View className='flex-row items-center mt-2'> 
      <TouchableOpacity
          className=" items-center justify-between mr-8 py-3 "
          onPress={() => navigation.goBack()}
        >
      <Ionicons name="chevron-back-outline" size={24} color="white" />
         </TouchableOpacity>

         <Text className='text-white text-xl font-medium' style={{fontFamily: 'Chillax'}}>Create Errand</Text>
               
         </View>
         
            {/* <Text
                  className="font-bold text-[20px] leading-7"
                  style={{ color: textTheme }}
                >
                  Welcome, {currentUser?.first_name}
                </Text> */}

                <View className="items-center flex-row gap-2">
                 
                  <TouchableOpacity
                    // onPress={
                    //   // navigation.navigate('Contact')
                    //   openMoreModal
                    // }
                  >
                    <Text style={{ color: textTheme }}>
                     
                    <Ionicons
                    name="settings-outline"
                    size={22}
                    color={'white'}
                    style={{ marginLeft: 7 }}
                  />
                    </Text>
                  </TouchableOpacity>

                  <Text style={{ color: textTheme }} className='mr-4'>
                    <FontAwesome
                      name="bell-o"
                      size={22}
                      color={'white'}
                      onPress={() => {
                        navigation.navigate('Notification')
                      }}
                    />
                  </Text>
                </View>
              </View>

             
             

                </View>

                </View>
             </View>
            
      



        {/* <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
        > */}
        <TouchableOpacity onPress={()=> Keyboard.dismiss()}>
          <View className="mt-6 flex-row items-center justify-between mx-3">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="font-normal text-[#393F42] text-[18px] leading-5"
            >
              What do you need help with?{' '}
             
            </Text>
          </View>

          <View className='mx-4 flex-row justify-between pl-3 pt-3 pb-3 pr-5 border border-[#96A0A5] mt-2'>
          <Text className="text-base font-normal text-[#6D6D6D]" style={{fontFamily: 'Axiforma'}}>{category?.name}</Text>
          <Text><AntDesign name="lock" size={24} color="black" /></Text>
          </View>
          </TouchableOpacity>

          <View className="px-4 mt-5">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-base font-normal text-[#393F42]"
            >
              Description
            </Text>

            <View className="w-full border bg-[#F5F5F5] border-[#96A0A5] text-sm mt-2 rounded-lg px-1">
              <TextInput
                className={'w-full text-sm py-2 mt-2 rounded-lg px-3'}
                placeholder="Give the full details of what you need help with"
                onChangeText={(e) => setDescription(e)}
                value={description}
                multiline={true}
                numberOfLines={10}
                style={{ height: 100, textAlignVertical: 'top' }}
                keyboardType="default"
              />
            </View>
          </View>
          

          <View className="px-4 mt-5">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma'  }}
              className="text-base font-normal text-[#393F42]"
            >
              Amount
            </Text>

            <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
              {/* <Text className="text-lg ">&#x20A6;</Text> */}
              <Text className="text-base text-[#6D6D6D] font-normal ">NGN</Text>

              <TextInput
                className="w-full"
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
              className="flex-row items-center"
            >
              <Text style={{ color: textTheme, fontFamily: 'Axiforma' }} className="ml-2 pt-2 pr-2 text-[#6D6D6D]">
                Fund Wallet
              </Text>
              <Text
                style={{ color: textTheme }}
                className="text-sm pt-2 font-md"
              >
                ({' '}
                <Text style={{ color: textTheme }} className="font-bold">
                  Balance:
                </Text>{' '}
                ₦
                {Number(data?.balance) === 0
                  ? '0.00'
                  : (Number(data?.balance) / 100).toLocaleString()}
                )
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row mt-6 mx-4 items-center ">

            <Checkbox 
            value={clicked}
            onValueChange={handleClicked} 
            className='mr-2'
            />

            <Text
              style={{ color: textTheme }}
              className="text-base font-normal text-[#0C426F]"
            >
              Address
            </Text>

            {/* <TouchableOpacity onPress={handleClicked}>
              <Text
                style={{ color: textTheme }}
                className="text-[28px] text-center"
              >
                {' '}
                {clicked ? '-' : '+'}{' '}
              </Text>
            </TouchableOpacity> */}
          </View>
          

          {clicked ? (
            <View
              style={{ marginBottom: 80, display: clicked ? 'flex' : 'none' }}
              className="mt-2 px-4"
            >
              <Text className='text-base text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Pick Up Location</Text>
              <GooglePlacesAutocomplete
                placeholder="Enter Pickup Address"
                onPress={(data, details) =>
                  handleLocationSelect(data, details, 'currentLocation')
                }
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

              <Text className='text-base text-[#393F42] mt-3' style={{fontFamily: 'Axiforma'}}>Delivery/ End Location</Text>
              <GooglePlacesAutocomplete
                placeholder="Enter Delivery Address"
                onPress={(data, details) =>
                  handleLocationSelect(data, details, 'deliveryAddress')
                }
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
            
          ) : (
            ''
          )}
        {/* </KeyboardAvoidingView> */}
      </ScrollView>

      <View className="absolute bottom-0 flex-row justify-center w-full">
        <TouchableOpacity
          onPress={() => submitErrandhandler()}
          className="bg-[#1E3A79] h-[66px] w-full mt-6 flex-row justify-center items-center "
        >
          {creatingErrand ? (
            <ActivityIndicator size="small" color="blue" />
          ) : (
            <Text className="text-[#EEF2F3] text-base text-center" style={{fontFamily: 'Axiforma'}}>
              Post Errand
            </Text>
          )}
        </TouchableOpacity>
      </View>
    
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
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    fontSize: 7,
  },
  googlePlacesContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    flex: 1,
  },
  textInputContainer: {
    flex: 1,
    // position: 'absolute',a
    top: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    height: 50,
    borderWidth: 0,
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor: 'white',
  },
  listView: {
    paddingHorizontal: 2,
  },
})
export default LandingForm
