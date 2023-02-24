import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const Modal = () => {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <View style={{ flex: 1, marginTop: 40, padding: 20 }}>
      <TouchableOpacity className="flex-row justify-start" onPress={() => navigation.navigate("Errands")} >
        <EvilIcons name="close" size={30} color="black" />
      </TouchableOpacity>

      <Text className="text-xl font-semibold text-[#3e3d3d] text-center pt-16">
        Bid Request Sent
      </Text>

      <View className='flex-row justify-center items-center pt-5'>
       <Ionicons name="ios-checkmark-circle-sharp" size={120} color="#243763" />
      </View>

       <Text className="text-sm font-semibold text-[#3e3d3d] text-center pt-16">
        Waiting for sender to Accept Bid...
      </Text>
      <Text className="text-xs font-semibold text-[#918f8f] text-center pt-2 px-6">
       You will get a notification once your bid is accepted
      </Text>

      <View className="flex-row justify-center items-center">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Modal")
            }}
            className="bg-[#243763] w-40 py-3  mt-8 rounded-lg shadow-lg shadow-blue-300"
          >
            <Text className="text-center text-white">Okay</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default Modal
