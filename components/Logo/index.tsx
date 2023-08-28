import React from 'react'
import { Image, Text, View } from 'react-native'

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
