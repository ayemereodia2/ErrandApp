import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React, { useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'

import UserProfile from '../../components/UsersProfile/UserProfile'
import UserVerification from '../../components/UsersProfile/UserVerification'
import { _fetch } from '../../services/axios/http'

import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import Toast from 'react-native-toast-message'

const AccountScreen = ({ navigation }: any) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [profile, setProfile] = useState(true)

  const handleProfile = () => {
    setProfile(false)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Profile',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={'black'} size={20} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: {
                  // borderBottomWidth: 0.2,
                  borderBottomColor: '#AAAAAA',
                },
                optionText: { textAlign: 'center', fontWeight: '600' },
              }}
            >
              <MenuOption
                onSelect={() => navigation.navigate('Settings')}
                text="Settings"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />

              <MenuOption
                onSelect={() => navigation.navigate('Contact Us')}
                text="Contact Us"
                customStyles={{
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      ),
    })
  }, [])

  const handleVerification = () => {
    setProfile(true)
  }

  const getUserProfile = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/profile`,
    })
    return await _rs.json()
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    refetchOnMount: 'always',
  })

  const clearStorage = async () => {
    await AsyncStorage.clear()
  }

  if (isLoading) {
    return (
      <SafeAreaView className="m-auto bg-gray-200 w-screen h-screen">
        {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }

  if (isError) {
    return Toast.show({
      type: 'error',
      text1: 'Sorry, something went wrong',
    })
  }

  // console.log('data', data?.last_name)

  return (
    <SafeAreaView>
      <ScrollView>
        {/* Top Profile */}

        {data?.data?.profile_picture ? (
          <View className="mt-8 mx-auto">
            <Image
              source={{ uri: data?.data?.profile_picture }}
              className="b rounded-full w-[100px] h-[100px]"
            />
          </View>
        ) : (
          <View className="bg-gray-700 w-[80px] h-[80px] rounded-full items-center justify-center mx-auto mt-8">
            <Text className="text-white font-bold text-center text-2xl">
              {data?.data?.first_name.charAt(0)}
              {data?.data?.last_name.charAt(0)}
            </Text>
          </View>
        )}

        {/* Name Area */}

        <View>
          <View className="flex-row justify-center items-center mt-5">
            <Text className="text-[18px] font-bold leading-6">
              {data?.data?.first_name} {data?.data?.last_name}{' '}
            </Text>
            <Text>
              <MaterialIcons name="verified" size={20} color="green" />
            </Text>
          </View>

          {/*Occupation */}

          <Text className="text-center mt-3 text-base font-medium">
            {data?.data?.occupation ? data?.data?.occupation : 'Swave User'}
          </Text>

          {/* Number of errands */}

          <View className="flex-row mt-5 mx-auto">
            <View className="ml-3">
              <Text className="text-center mb-1 font-bold">400</Text>
              <Text className="text-center font-light">total Errands </Text>
            </View>

            <View className="ml-3">
              <Text className="text-center mb-1 font-bold">
                {data?.data?.errands_completed}
              </Text>
              <Text className="text-center font-light">Errands Completed </Text>
            </View>

            <View className="ml-3 ">
              <Text className="text-center mb-1 font-bold">
                {data?.data?.errands_cancelled}
              </Text>
              <Text className="text-center font-light">Errands Cancelled </Text>
            </View>
          </View>

          {/* Edit BUtton */}
          <View className=" mt-[30px] flex-row justify-center space-x-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('EditProfile', { data })}
              className="w-[140px] h-[40px] bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-md"
            >
              <Text className="text-base font-medium text-center items-center">
                {' '}
                Edit Profile{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Login')
                clearStorage()
              }}
              className="w-[140px] h-[40px] bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-md"
            >
              <Text className="text-base font-medium text-center items-center">
                {' '}
                Logout{' '}
              </Text>
            </TouchableOpacity>
          </View>

          <View className="flex-row mr-[16px] mt-8 ml-[16px] md:w-[398px] mx-auto ">
            <TouchableOpacity onPress={handleVerification}>
              <View
                className="w-[199px] h-[52px] border-b items-center justify-center "
                style={{
                  borderBottomColor: profile ? '#3F60AC' : '#243763',
                  borderBottomWidth: profile ? 2 : 1,
                }}
              >
                <Text
                  className="text-center font-medium"
                  style={{ color: profile ? '#3F60AC' : '#243763' }}
                >
                  Profile information
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleProfile}>
              <View
                className="w-[190px] h-[52px] border-b items-center justify-center "
                style={{
                  borderBottomColor: profile ? '#243763' : '#3F60AC',
                  borderBottomWidth: profile ? 1 : 2,
                }}
              >
                <Text
                  className="text-center font-medium"
                  style={{ color: profile ? '#243763' : '#3F60AC' }}
                >
                  User verification
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {profile ? <UserProfile data={data} /> : <UserVerification />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen
