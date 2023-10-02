import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView, { Marker } from 'react-native-maps'
import { PostErrandData } from '../../types'

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
  setDeliveryAddress
}: LocationProp) => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 })
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 })

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
      console.log(">>>>>>dtay", data.description);
      
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
    console.log(">>>>>data", data);
    setRegion(details.geometry.location)
    setMarker(details.geometry.location)
  }

  return (
    <>
      <ScrollView>
        <View className="flex-row mt-[38px] items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">3</Text>
          </View>
          <Text className="font-semibold text-[#243763] text-base">
            Errand Location
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text className="text-[#777777] text-center">
            In this section, you can set the location that you want the errand
            to take place in.
          </Text>
        </View>

        <View className="mt-[56px] ml-4 mt-40">
          <Text className="text-[#243763]">
            <Text className="font-semibold text-sm">Request Location </Text>
            (Provide this if you have a separate Pickup Location or Delivery
            Location)
          </Text>
        </View>

        {/* <View className="mt-[41px] ml-4">
          <Text className="text-[#243763]">What is your Current Location?</Text>
        </View>
        <TextInput
          className="mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter current location"
          defaultValue={postErrandData.cur_loc}
          placeholderTextColor={'#B3B3B3'}
          onChangeText={(text) => handleInputChange(text, 'cur_loc')}
        /> */}

        {/* <View className="mt-[41px] ml-4">
          <Text className="text-[#243763]">
            What Delivery address do you want to provide?
          </Text>
        </View>
        <TextInput
          className="md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter your delivery Address"
          placeholderTextColor={'#B3B3B3'}
          defaultValue={postErrandData.del_add}
          onChangeText={(text) => handleInputChange(text, 'del_add')}
        /> */}

        {/* <View style={styles.inputContainer}>
          <Text>Current Location:</Text>
          <TextInput
            style={styles.input}
            value={currentLocation}
            onChangeText={(text) => setCurrentLocation(text)}
          />
        </View> */}
        <View className='mt-5'>
          <View className="mt-4 px-4">
            <Text className="text-[#243763]">
              What is your Current Location
            </Text>
            <GooglePlacesAutocomplete
              placeholder="Enter Delivery Address"
              onPress={(data, details) => handleLocationSelect(data, details, 'currentLocation')}
              fetchDetails={true}
              query={{
                key: 'AIzaSyDHfdBmUpWupA3f4Ld0lNTuQbbJQGJ4CSo',
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

          <View style={styles.inputContainer} className="mt-20 px-4">
            <Text className="text-[#243763]">
              {' '}
              What Delivery address do you want to provide?
            </Text>
            <GooglePlacesAutocomplete
              placeholder="Enter Delivery Address"
              onPress={(data, details) => handleLocationSelect(data, details, 'deliveryAddress')}
              fetchDetails={true}
              query={{
                key: 'AIzaSyDHfdBmUpWupA3f4Ld0lNTuQbbJQGJ4CSo',
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
        </View>

        <MapView
          style={styles.map}
          region={{
            latitude: regionCoords.lat,
            longitude: regionCoords.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
          />

          {/* {deliveryAddressLatLng && (
          <Marker
            coordinate={deliveryAddressLatLng}
            title="Delivery Location"
            pinColor="red"
          />
        )} */}
        </MapView>
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
