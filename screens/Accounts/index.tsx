import { AntDesign, Feather } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import UserProfile from '../../components/UsersProfile/UserProfile'
import UserVerification from '../../components/UsersProfile/UserVerification'
import { _fetch } from '../../services/axios/http'

import AsyncStorage from '@react-native-async-storage/async-storage'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const AccountScreen = ({ navigation }: any) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [profile, setProfile] = useState(true)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const handleProfile = () => {
    setProfile(false)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleStyle: { color: textTheme },
      title: 'My Profile',
      headerStyle: { backgroundColor: backgroundTheme },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 py-3 mr-6"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-3 py-3 space-x-3 ">
          <Feather
            onPress={() => navigation.navigate('Contact')}
            color={textTheme}
            size={24}
            name="help-circle"
          />
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
  console.log(data)

  const clearStorage = async () => {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken', 'user_id', 'last_name', 'first_name', 'profile_pic'])
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  if (isLoading) {
    return (
      <SafeAreaView
        style={{ backgroundColor: backgroundTheme }}
        className="pt-20 bg-gray-200 w-screen h-[100vh] mt-5"
      >
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
      <ScrollView
        style={{ backgroundColor: backgroundTheme }}
        className="bg-white"
      >
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

        <View>
          <View className="flex-row justify-center items-center mt-5">
            <Text
              style={{ color: textTheme }}
              className="text-[18px] font-bold leading-6"
            >
              {data?.data?.first_name} {data?.data?.last_name}{' '}
            </Text>
            {/* <Text>
              <MaterialIcons name="verified" size={20} color="green" />
            </Text> */}
          </View>

          <Text
            style={{ color: textTheme }}
            className="text-center mt-3 text-base font-medium"
          >
            {data?.data?.occupation ? data?.data?.occupation : 'Swave User'}
          </Text>

          <View className="flex-row mt-5 mx-auto">
            <View className="ml-3">
              <Text
                style={{ color: textTheme }}
                className="text-center mb-1 font-bold"
              >
                400
              </Text>
              <Text
                style={{ color: textTheme }}
                className="text-center font-light"
              >
                total Errands{' '}
              </Text>
            </View>

            <View className="ml-3">
              <Text
                style={{ color: textTheme }}
                className="text-center mb-1 font-bold"
              >
                {data?.data?.errands_completed}
              </Text>
              <Text
                style={{ color: textTheme }}
                className="text-center font-light"
              >
                Errands Completed{' '}
              </Text>
            </View>

            <View className="ml-3 ">
              <Text
                style={{ color: textTheme }}
                className="text-center mb-1 font-bold"
              >
                {data?.data?.errands_cancelled}
              </Text>
              <Text
                style={{ color: textTheme }}
                className="text-center font-light"
              >
                Errands Cancelled{' '}
              </Text>
            </View>
          </View>

          {/* Edit BUtton */}
          <View className=" mt-[30px] flex-row justify-center space-x-6">
            <TouchableOpacity
              style={{
                backgroundColor: theme ? '#1E3A79' : 'white',
              }}
              onPress={() => navigation.navigate('EditProfile', { data })}
              className="w-[140px] h-[40px] bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-md"
            >
              <Text
                style={{ color: textTheme }}
                className="text-base font-medium text-center items-center"
              >
                {' '}
                Edit Profile{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('GuestScreen')
                clearStorage()
              }}
              className="w-[140px] h-[40px] bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-md"
              style={{
                backgroundColor: theme ? '#1E3A79' : 'white',
              }}
            >
              <Text
                style={{ color: textTheme }}
                className="text-base font-medium text-center items-center"
              >
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

          {profile ? (
            <UserProfile data={data} />
          ) : (
            <UserVerification data={data} />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen
