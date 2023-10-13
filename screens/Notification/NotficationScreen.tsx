import { AntDesign } from '@expo/vector-icons'
import React, { useLayoutEffect } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Notify from '../../components/Notification/Notify'
import { _fetch } from '../../services/axios/http'
import { useQuery } from '@tanstack/react-query'
import { ActivityIndicator } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const NotificationScreen = ({ navigation }: any) => {

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const getNotifications = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/app-notification`,
    })
    return await _rs.json()
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ['get-notification'],
    queryFn: getNotifications,
    refetchOnMount: 'always',
  })

  if(isLoading){
    return (
      <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[40vh] mt-5">
        {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }
  // const imageComponent = (
  //   <Image
  //     source={require('../../assets/images/franence.jpg')}
  //     style={{ width: 50, height: 50, borderRadius: 50 }}
  //   />
  // )
  // const imageComponent1 = (
  //   <Image
  //     source={require('../../assets/images/brandon.jpg')}
  //     style={{ width: 50, height: 50, borderRadius: 50 }}
  //   />
  // )
  // const imageComponent2 = (
  //   <Image
  //     source={require('../../assets/images/Alison.jpg')}
  //     style={{ width: 50, height: 50, borderRadius: 50 }}
  //   />
  // )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Notifications',
      headerStyle: {backgroundColor: backgroundTheme, color: textTheme},
      headerTitleStyle: {color: textTheme},
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 py-3 mr-6"
          onPress={() => navigation.goBack()}
          
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
    })
  }, [])

  return (
    <SafeAreaView className=""  style={{backgroundColor: backgroundTheme}}>
      {/* Indicator */}
      <ScrollView  style={{backgroundColor: backgroundTheme}} className='h-full mb-30'>
        <View className="h-[64px] w-[380px] mx-4 flex-row bg-[#E6E6E6] justify-center items-center">
          <TouchableOpacity>
            <View className="flex-row w-full h-[40px] bg-[#F7F7F7] justify-center items-center mr-2 ml-2">
              <Text className='text-center'>Incoming Notifications</Text>
              <Text className="bg-red-500 text-white ml-2 p-1 rounded-md">
                {' '}
                {data.data.length}{' '}
              </Text>
            </View>
          </TouchableOpacity>

          {/* <TouchableOpacity>
            <View className="flex-row w-[180px] h-[40px] justify-center items-center">
              <Text>Outgoing Errands</Text>
              <Text className="bg-[#999999] text-white ml-2 p-1"> 8 </Text>
            </View>
          </TouchableOpacity> */}
        </View>

        {/* Body */}

        <Notify
         data={data}
        />

        {/* <Notify
          imageSource={imageComponent1}
          name="Brandon Vetrovs"
          text="“I need someone to help me in repairing my vehicle that broke down along the trenches”"
        />

        <Notify
          imageSource={imageComponent2}
          name="Allison Bergson"
          text="“I need someone to help me in repairing my vehicle that broke down along the trenches”"
        /> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen