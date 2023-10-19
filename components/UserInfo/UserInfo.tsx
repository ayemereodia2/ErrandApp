import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { RootState, useAppDispatch } from '../../services/store'
import { errandDetails } from '../../services/errands/errandDetails'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { Image } from 'react-native'
import { Entypo, FontAwesome5 } from '@expo/vector-icons'
import ProfileInfo from './ProfileInfo'
import ProfileVerification from '../UsersProfile/ProfileVerification'
import { useSelector } from 'react-redux'

const UserInfo = ({user, key}:any) => {

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

    const dispatch = useAppDispatch()
    const [profile, setProfile] = useState(true)

    const handleProfile = () => {
      setProfile(false)
    }

    const handleVerification = () => {
      setProfile(true)
    }

    console.log(user)

    // dispatch(externalUserDetails({ user_id: errand?.user_id }))

  return (
    <SafeAreaView key={user.id} style={{backgroundColor: backgroundTheme}} className='h-full'>
      <ScrollView>
     <View className='justify-center items-center rounded-full mt-4'>
      <Image source={{uri: user.profile_picture}} style={{width: 100, height: 100, borderRadius: 100}}/>
     </View>
      <Text className='text-center font-extrabold text-3xl mt-2' style={{color: textTheme}}>{user.first_name} {user.last_name}</Text>
      <Text className='text-center font-semibold' style={{color: textTheme}}>{user.occupation ? user.occupation  : 'Swave User'}</Text>

      <View className='flex-row space-x-3 mt-4 items-center justify-center'>

    <View className='flex-row items-center  gap-2 mr-3'>
      <View className='rounded-full bg-gray-200 h-10 w-10 items-center justify-center'>
        <Text className='text-center'> <FontAwesome5 name="running" size={24} color='black' /></Text>
        </View>

        <View>
          <Text className='text-center font-semibold' style={{color: textTheme}}>{user.errands_completed}</Text>
          <Text style={{color: textTheme}}>{user.errands_completed === 1 ? 'Errand' : 'Errands'}</Text>
        </View>
    </View>


    <View className='flex-row items-center gap-2 mr-3'>
        <View className='rounded-full bg-gray-200 h-10 w-10 items-center justify-center'>
        <Text className='text-center'><Entypo name="star" size={20} color="#FBB955" /></Text>
        </View>

        <View>
          <Text className='text-center font-semibold' style={{color: textTheme}}>{user.rating}</Text>
          <Text style={{color: textTheme}}>Rating</Text>
        </View>

     </View>

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
                  Verifications
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {profile ? (
            <ProfileInfo user={user}/>
          ) : (
            <ProfileVerification user={user}/>
          )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserInfo