import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'


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
        className="flex-row justify-end mt-16 mr-3"
      >
        <AntDesign name="close" size={26} />
      </TouchableOpacity>
      <View className="flex-row items-center justify-center mt-2">
        <Text
          style={{ fontFamily: 'AbrilFatface_400Regular' }}
          className=" text-black text-4xl"
        >
          <Image
            style={{
              width: 90,
              height: 90,
              resizeMode: 'contain',
            }}
            source={require('../../assets/images/new_Swave_2.png')}
          />
        </Text>
      </View>
    </>
  )
}
