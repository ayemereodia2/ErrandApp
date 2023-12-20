import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, TouchableOpacity, SafeAreaView, Text, View } from 'react-native'

export const showStars = (rate: number) => {
  if (rate === 0) {
    return <AntDesign name="staro" color={'#243763'} />
  }

  const starImages = Array.from({ length: rate }, (_, index) => (
    <View>
      <AntDesign name="star" color={'#243763'} />
    </View>
  ))

  return <View className="flex space-x-1">{starImages}</View>
}

export const Logo = () => {
  const navigation = useNavigation()

  return (
    <>
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="flex-row justify-end mt-10 mr-3"
      >
        <AntDesign name="close" size={26} />
      </TouchableOpacity>
      <View className="flex-row items-center justify-center mt-2">
       
          <Image
            style={{
              width: 120,
              height: 100,
              resizeMode: 'contain',
            }}
            
            source={require('../../assets/images/SWAVE-logo.png')}
          />
       
      </View>
      </SafeAreaView>
    </>
  )
}
