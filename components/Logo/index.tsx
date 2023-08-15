import React from 'react'
import { Image, Text, View } from 'react-native'

export const Logo = () => {
  return (
    <View className="flex-row items-center justify-start mt-20">
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
          source={require('../../assets/images/Swave_3-1-2.png')}
        />
      </Text>
    </View>
  )
}
