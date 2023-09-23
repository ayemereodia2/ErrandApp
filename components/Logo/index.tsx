import { AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="flex-row justify-end mt-10 mr-3"
      >
        <AntDesign name="close" size={26} />
      </TouchableOpacity>
      <View className="flex-row items-center justify-center mt-2 mb-10">
        <Text
          style={{ fontFamily: 'AbrilFatface_400Regular' }}
          className=" text-black text-4xl"
        >
          <Image
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
            source={require('../../assets/images/new_Swave_2.png')}
          />
        </Text>
      </View>
    </>
  )
}
