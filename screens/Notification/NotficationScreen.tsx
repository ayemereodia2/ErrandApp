import { AntDesign } from '@expo/vector-icons'
import React, { useLayoutEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Notify from '../../components/Notification/Notify'

const NotificationScreen = ({ navigation }: any) => {
  const imageComponent = (
    <Image
      source={require('../../assets/images/franence.jpg')}
      style={{ width: 50, height: 50, borderRadius: 50 }}
    />
  )
  const imageComponent1 = (
    <Image
      source={require('../../assets/images/brandon.jpg')}
      style={{ width: 50, height: 50, borderRadius: 50 }}
    />
  )
  const imageComponent2 = (
    <Image
      source={require('../../assets/images/Alison.jpg')}
      style={{ width: 50, height: 50, borderRadius: 50 }}
    />
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Notifications',
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 py-3 mr-6"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    })
  }, [])

  return (
    <SafeAreaView className="mt-[40px]">
      {/* Indicator */}
      <ScrollView>
        <View className="mt-[25px] h-[64px] w-[380px] mx-4 flex-row bg-[#E6E6E6] justify-center items-center">
          <TouchableOpacity>
            <View className="flex-row w-[180px] h-[40px] bg-[#F7F7F7] justify-center items-center mr-2 ml-2">
              <Text>Incoming Errands</Text>
              <Text className="bg-red-500 text-white ml-2 p-1 rounded-md">
                {' '}
                14{' '}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="flex-row w-[180px] h-[40px] justify-center items-center">
              <Text>Outgoing Errands</Text>
              <Text className="bg-[#999999] text-white ml-2 p-1"> 8 </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Body */}

        <Notify
          imageSource={imageComponent}
          name="Francene Majekodunmi Smith"
          text="“I need someone to help me in repairing my vehicle that broke down along the trenches”"
        />

        <Notify
          imageSource={imageComponent1}
          name="Brandon Vetrovs"
          text="“I need someone to help me in repairing my vehicle that broke down along the trenches”"
        />

        <Notify
          imageSource={imageComponent2}
          name="Allison Bergson"
          text="“I need someone to help me in repairing my vehicle that broke down along the trenches”"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen
