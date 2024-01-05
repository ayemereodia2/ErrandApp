import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { PostErrandData } from '../../types'
import { Platform } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'

interface LocationProp {
  handleInputChange: any
  postErrandData: PostErrandData
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  setCurrentLocation: React.Dispatch<React.SetStateAction<string>>
  setDeliveryAddress: React.Dispatch<React.SetStateAction<string>>
}

interface LatLng {
  lat: number
  lng: number
}

const CreateErrandLocation = ({
  setActiveStep,
  handleInputChange,
  postErrandData,
  setCurrentLocation,
  setDeliveryAddress,
}: LocationProp) => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 })
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 })

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const [
    currentLocationLatLng,
    setCurrentLocationLatLng,
  ] = useState<LatLng | null>(null)

  const [
    deliveryAddressLatLng,
    setDeliveryAddressLatLng,
  ] = useState<LatLng | null>(null)

  const navigation = useNavigation()

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

  const [clicked, setClicked] = useState(false)

  

  const handleClicked = () => {
    setClicked(!clicked)
  }

  return (
    <>




      <ScrollView keyboardShouldPersistTaps="always">
      <KeyboardAvoidingView
  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

>
        <Pressable onPress={()=> Keyboard.dismiss()}>
        <View className="flex-row mt-[38px] items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">3</Text>
          </View>
          <Text
            style={{ color: textTheme }}
            className="font-semibold text-[#243763] text-base"
          >
            Errand Location
          </Text>
        </View>

       

        <View className=" ml-4 mt-8 w-[340px]">
          <Text style={{ color: '#6D6D6D', fontFamily: 'Axiforma' }} className="text-[#243763]">
           
             Kindly provide the location you want the errand to take place
            
          </Text>
        </View>

        <View className="mt-4 px-4">
          <Text style={{ color: '#393F42', fontFamily: 'Axiforma' }} className="text-[#243763] text-base">
          Pick up/ Start Location
          </Text>

          <GooglePlacesAutocomplete
            placeholder="Enter Delivery Address"
            // keepResultsAfterBlur={true}
            keyboardShouldPersistTaps={'handled'}
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
        </View>


        <View style={styles.inputContainer} className="mt-20  px-4">
          <Text style={{ color: '#393F42', fontFamily: 'Axiforma' }} className="text-[#243763] text-base">
            {' '}
            Delivery/End Location
          </Text>
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

        <View className="flex-row items-center mt-10 ml-4">

        <Checkbox 
            value={clicked}
            onValueChange={handleClicked} 
            className='mr-2'
            />

          <Text
            className="text-[16px]"
            style={{ color: '#0C426F', fontFamily: 'Axiforma' }}
          >
            Indicate if it’s remote
          </Text>
          {/* <Text className='text-red-500'>*{financeError}</Text> */}
        </View>

        <View className="px-4 mt-4" style={{display: clicked ? 'flex' : 'none'}}>
          <Text
            style={{ color: '#393F42', fontFamily: 'Axiforma' }}
            className=" overflow-auto font-normal leading-[24px] text-base"
          >
          Work remotely
          </Text>
        </View>


        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude: regionCoords.lat,
            longitude: regionCoords.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          />

        </MapView> */}
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
    paddingBottom: 60,
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  textInput: {
    height: 50,
    borderWidth: 0,
    paddingHorizontal: 8,
    marginTop: 10,
    backgroundColor: '#E6E6E6',
  },
  listView: {
    paddingHorizontal: 2,
    marginTop: 50,
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