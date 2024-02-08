import React, { useEffect, useRef, useState } from 'react'
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../services/store'
import { PostErrandData } from '../../types'

interface LocationProp {
  handleInputChange: any
  postErrandData: PostErrandData
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  setCurrentLocation: React.Dispatch<React.SetStateAction<string>>
  setDeliveryAddress: React.Dispatch<React.SetStateAction<string>>
  locationError: string
  currentLocation: string
  deliveryAddres: string
  remote: boolean
  setRemote: React.Dispatch<React.SetStateAction<boolean>>
  navigation: any
}

interface LatLng {
  lat: number
  lng: number
}

const CreateErrandLocation = ({
  setActiveStep,
  handleInputChange,
  postErrandData,
  currentLocation,
  setCurrentLocation,
  setDeliveryAddress,
  locationError,
  remote,
  setRemote,
  navigation,
}: LocationProp) => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 })
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 })
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  const ref = useRef()
  const dispatch = useAppDispatch()
  const [showDelivery, setShowDelivery] = useState(false)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  // useEffect(() => {
  //   ref.current?.setAddressText('Some Text')
  // }, [])

  const [
    currentLocationLatLng,
    setCurrentLocationLatLng,
  ] = useState<LatLng | null>(null)

  const [
    deliveryAddressLatLng,
    setDeliveryAddressLatLng,
  ] = useState<LatLng | null>(null)

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
    } else if (locationType === 'deliveryAddress') {
      setDeliveryAddress(data.description)
      setDeliveryAddressLatLng({ lat, lng })
    }

    setMapRegion({
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
  }

  const onPress = (data: any, details: any) => {
    setRegion(details.geometry.location)
    setMarker(details.geometry.location)
  }

  useEffect(() => {
    if (remote) {
      setCurrentLocation('remote')
    } else {
      setCurrentLocation('')
    }
  }, [remote])

  return (
    <>
      <ScrollView keyboardShouldPersistTaps="always">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <Pressable onPress={() => Keyboard.dismiss()}>
            <View className="flex-row mt-6 items-center justify-center">
              <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
                <Text
                  style={{ fontFamily: 'Chillax-Medium' }}
                  className="text-black mx-auto"
                >
                  3
                </Text>
              </View>
              <Text
                style={{ fontFamily: 'Chillax-Medium' }}
                className="font-semibold text-[#243763] text-base"
              >
                Errand Location
              </Text>
            </View>

            <TouchableOpacity
              // onPress={() => setRemote(val)}
              className="px-4 pt-4 mt-6"
            >
              <Text
                style={{ fontFamily: 'Chillax-Medium' }}
                className="text-red-600 pb-3"
              >
                {locationError}
              </Text>

              <View
                className={
                  remote
                    ? 'w-full space-x-3 flex-row bg-[#09497D] rounded-[60px] py-3 px-4 items-center'
                    : 'w-full space-x-3 flex-row bg-[#dad8d8] rounded-[60px] py-3 px-4 items-center'
                }
              >
                <Switch
                  value={remote}
                  onValueChange={(val: boolean) => {
                    setRemote(val)
                  }}
                />
                <Text
                  className={
                    remote ? 'text-lg text-white' : 'text-lg text-[#a5a3a3]'
                  }
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  Remote
                </Text>
              </View>
            </TouchableOpacity>

            {!remote ? (
              // <TouchableOpacity
              //   onPress={() => navigation.navigate('MapScreen')}
              //   className="px-4 "
              // >
              //   <Text
              //     style={{ fontFamily: 'Chillax-Medium' }}
              //     className="text-red-600 "
              //   >
              //     {locationError}
              //   </Text>

              //   <View className="w-full space-x-3 flex-row bg-[#dad8d8] rounded-[60px] py-3 px-4 items-center">
              //     <Feather name="search" size={30} />

              //     <Text
              //       className="text-lg pl-4"
              //       style={{ fontFamily: 'Chillax-Medium' }}
              //     >
              //       Enter pickup destination
              //     </Text>
              //   </View>
              // </TouchableOpacity>
              <>
                <View className="flex-row items-center gap-1 mt-4 px-5">
                  <GooglePlacesAutocomplete
                    placeholder="Enter Pickup Address"
                    textInputProps={{
                      onChangeText: (text) => {
                        setCurrentLocation(text)
                      },
                      defaultValue: postErrandData.currentLocation,
                    }}
                    onPress={(data, details) => {
                      setShowDelivery(true)
                      handleLocationSelect(data, details, 'currentLocation')
                    }}
                    fetchDetails={true}
                    query={{
                      key: process.env.EXPO_PUBLIC_GOOGLE_KEY,
                      language: 'en',
                    }}
                    styles={{
                      // container: styles.googlePlacesContainer,
                      textInputContainer: styles.textInputContainer,
                      textInput: styles.textInput,
                      fontFamily: 'Axiforma',
                      listView: styles.listView,
                      input: styles.input,
                    }}
                  />
                </View>
                {showDelivery ? (
                  <View className="flex-row items-center gap-1 mt-4 px-5">
                    <GooglePlacesAutocomplete
                      placeholder="Enter Delivery Address"
                      onPress={(data, details) =>
                        handleLocationSelect(data, details, 'deliveryAddress')
                      }
                      textInputProps={{
                        onChangeText: (text) => {
                          setDeliveryAddress(text)
                        },
                        defaultValue: postErrandData.deliveryAddress,
                      }}
                      fetchDetails={true}
                      query={{
                        key: process.env.EXPO_PUBLIC_GOOGLE_KEY,
                        language: 'en',
                      }}
                      styles={{
                        // container: styles.googlePlacesContainer,
                        textInputContainer: styles.textInputContainer,
                        textInput: styles.textInput,
                        fontFamily: 'Axiforma',
                        listView: styles.listView,
                        input: styles.input,
                      }}
                    />
                  </View>
                ) : null}
              </>
            ) : null}

            {/* <View
              style={{ marginBottom: 80 }}
              className=" px-4 space-x-3 items-center flex-row"
            >
              <Text
                style={{ fontFamily: 'Chillax-Medium' }}
                className="text-[#243763]"
              >
                Remote
              </Text>

              <Switch
                value={remote}
                onValueChange={(val: boolean) => {
                  setRemote(val)
                }}
              />
            </View> */}
          </Pressable>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    paddingBottom: 200,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 14,
  },
  googlePlacesContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    flex: 1,
  },
  textInputContainer: {
    fontFamily: 'Axiforma',
  },
  textInput: {
    fontFamily: 'Axiforma',
    backgroundColor: '#dad8d8',
    height: 53,
    borderRadius: 40,
    // borderWidth: 0,
    paddingHorizontal: 20,
    // marginTop: 10,
    // backgroundColor: '#E6E6E6',
  },
  listView: {
    // paddingHorizontal: 2,
    // marginTop: 50,
    width: '100%',
    fontFamily: 'Chillax-Medium',
  },
  map: {
    left: 0,
    right: 0,
    top: 80,
    height: 200,
    bottom: 0,
    position: 'absolute',
  },
})

export default CreateErrandLocation
