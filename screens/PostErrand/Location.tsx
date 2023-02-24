import * as Location from 'expo-location'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import MapView, { Marker } from 'react-native-maps'

const LocationScreen = () => {
  const [errorMsg, setErrorMsg] = useState<any>(null)
  const [location, setLocation] = useState<any>(null)
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }
    let location = await Location.getCurrentPositionAsync()

    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    })
    setLocation(location)
  }
  useEffect(() => {
    userLocation()
  }, [])

  return (
    <ScrollView className="flex-row mt-2 h-[500px] ">
      <MapView style={styles.map} region={mapRegion}>
        <Marker coordinate={mapRegion} title="Marker" />
      </MapView>
      {/* <Button title="Get Location" onPress={() => userLocation()} /> */}

      <Text className="pl-6 w-[300px] pt-4 text-[16px]">
        What is your Pick-up & Delivery Address?
      </Text>

      <View className="px-6 pt-3 space-y-6">
        <TextInput
          className="w-full border border-[#E6E6E6] text-xs py-3.5 mt-2 rounded-lg px-3"
          placeholder="Pick-up Address"
        />

        <TextInput
          className="w-full border border-[#E6E6E6] text-xs py-3.5 mt-2 rounded-lg px-3"
          placeholder="Delivery Address"
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    width: Dimensions.get('window').width,
    height: 300,
  },
})
export default LocationScreen
