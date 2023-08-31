import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Image, Text, View } from 'react-native'

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
  return (
    <View className="flex-row items-center justify-center mt-16">
      <Text
        style={{ fontFamily: 'AbrilFatface_400Regular' }}
        className=" text-black text-4xl"
      >
        <Image
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/new_Swave_2.png')}
        />
      </Text>
    </View>
  )
}
