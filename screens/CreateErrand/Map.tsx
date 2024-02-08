import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import MapView from 'react-native-maps'
import { setDestination, setOrigin } from '../../services/map/mapslice'
import { useAppDispatch } from '../../services/store'

export default function MapScreen({ navigation }: any) {
  const [show, setShow] = useState(true)
  const [delInput, setDelInput] = useState('')
  const dispatch = useAppDispatch()

  console.log('>>>>shw', show, delInput)

  useEffect(() => {
    if (!delInput) {
      setShow(true)
    }
  }, [show])

  return (
    // <KeyboardAvoidingView
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   style={{ flex: 1 }}
    // >
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
        style={{ position: 'absolute', top: 20, left: 16, zIndex: 99 }}
        className="bg-[#ccc] p-3 rounded-full"
      >
        <AntDesign name="arrowleft" color={'black'} size={30} />
      </TouchableOpacity>

      <View className="h-1/2">
        <MapView
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{
            width: 400,
            height: 400,
          }}
        ></MapView>
      </View>

      <View
        className={
          Platform.OS === 'android'
            ? 'bg-white w-screen shadow-md px-6 h-1/2 relative'
            : ' bg-white w-screen shadow-md px-6'
        }
      >
        <View className="flex-row mt-4 ">
          <Text
            style={{
              fontFamily: 'Axiforma',
            }}
            className="mx-auto text-black"
          >
            Search location
          </Text>
        </View>
        {/* <View className={Platform.OS === 'android' ? 'mt-3' : 'mt-6'}>
          <View className="mt-2 flex-row items-center justify-between w-full">
            <View className="flex-row items-center gap-1">
              <GooglePlacesAutocomplete
                placeholder="Enter Pickup Address"
                onPress={(data, details) => {
                  // handleLocationSelect(data, details, 'deliveryAddress')
                  dispatch(
                    setOrigin({
                      location: details?.geometry.location,
                      description: data.description,
                    }),
                  )
                  dispatch(setDestination(null))
                }}
                fetchDetails={true}
                query={{
                  key: process.env.EXPO_PUBLIC_GOOGLE_KEY,
                  language: 'en',
                }}
                textInputProps={{
                  onChangeText: (text) => {
                    // setDeliveryAddress(text)
                    setDelInput(text)
                    setShow(false)
                  },
                }}
                styles={{
                  // container: styles.googlePlacesContainer,
                  textInputContainer: styles.textInputContainer,
                  textInput: styles.textInput,
                  fontFamily: 'Axiforma',
                  listView: styles.listView,
                }}
              />
            </View>
          </View>

          {show ? (
            <View className="flex-row items-center">
              <View
                className="mt-2 flex-row items-center justify-between w-full"
                // style={{ backgroundColor: theme ? '#1E3A79' : 'white' }}
              >
                <View className="flex-row items-center gap-1">
                  <GooglePlacesAutocomplete
                    placeholder="Delivery Address"
                    onPress={(data, details) =>
                      // handleLocationSelect(data, details, 'deliveryAddress')
                      console.log('<<<')
                    }
                    fetchDetails={true}
                    query={{
                      key: process.env.EXPO_PUBLIC_GOOGLE_KEY,
                      language: 'en',
                    }}
                    textInputProps={{
                      onChangeText: (text) => {
                        // setDeliveryAddress(text)
                      },
                    }}
                    styles={{
                      // container: styles.googlePlacesContainer,
                      textInputContainer: styles.textInputContainer,
                      textInput: styles.textInput,
                      fontFamily: 'Axiforma',
                      listView: styles.listView,
                    }}
                  />
                </View>
              </View>
            </View>
          ) : null}
        </View> */}

        <View className="flex-row items-center gap-1 mt-4 px-2">
          <GooglePlacesAutocomplete
            placeholder="Enter Delivery Address"
            onPress={(data, details) => {
              // handleLocationSelect(data, details, 'deliveryAddress')
              dispatch(
                setOrigin({
                  location: details?.geometry.location,
                  description: data.description,
                }),
              )
              dispatch(setDestination(null))
            }}
            fetchDetails={true}
            query={{
              key: process.env.EXPO_PUBLIC_GOOGLE_KEY,
              language: 'en',
            }}
            textInputProps={{}}
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

        <View className="flex-row justify-end mt-4">
          <TouchableOpacity className="bg-[#09497D] py-3 px-6 rounded-[50px]">
            <Text style={{ fontFamily: 'Chillax-Medium' }} className="text-white ">Skip</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    // </KeyboardAvoidingView>
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
