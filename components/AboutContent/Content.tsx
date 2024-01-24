import {
  AntDesign,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { navigateToScreen } from '../../navigation/StackNavigation'
import { RootState } from '../../services/store'

const Content = ({ navigation }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
    loading,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <View style={{ backgroundColor: '#E6E6E6' }} className="h-full px-4 pt-4">
      {/* <TouchableOpacity className='mb-2 mt-4 w-[300px] border rounded-full py-4 mx-auto' onPress={()=> navigation.navigate('Profile')} style={{borderColor: textTheme}}>
   <Text style={{color: textTheme}} className='text-center text-base'> My Profile </Text>
   </TouchableOpacity>

   <TouchableOpacity className='mb-2 mt-2 w-[300px] border rounded-full py-4 mx-auto' style={{borderColor: textTheme}} onPress={()=> navigation.navigate('About')}>
   <Text className='text-center text-base' style={{color: textTheme}}> About Swave</Text>
   </TouchableOpacity>

   <TouchableOpacity className='mt-2 w-[300px] border rounded-full py-4 mx-auto' onPress={()=> navigation.navigate('Contact')} style={{borderColor: textTheme}}>
   <Text  className='text-center text-base' style={{color: textTheme}}> Contact Us </Text>
   </TouchableOpacity>

   <TouchableOpacity className=' mt-3' onPress={()=> navigation.navigate('Terms')} >
   <Text style={{color: textTheme}} className='text-center text-base'> Terms and Conditions</Text>
   </TouchableOpacity>

   <TouchableOpacity className='mb-4 mt-2 ' onPress={()=> navigation.navigate('Privacy')}>
   <Text style={{color: textTheme}} className='text-center text-base'> Privacy Policy</Text>
   </TouchableOpacity> */}

      <View className="flex-row items-center justify-between">
        <Text
          className="text-[#09497D] text-[20px]"
          style={{ fontFamily: 'Chillax' }}
        >
          Settings
        </Text>

        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Text
            className="text-[#09497D] text-base"
            style={{ textDecorationLine: 'underline', fontFamily: 'Axiforma' }}
          >
            See all Settings
          </Text>
        </TouchableOpacity>
      </View>

      <View className="mt-[41px]">
        <Text
          className="text-base text-[#444]"
          style={{ fontFamily: 'Axiforma' }}
        >
          Helpful Links
        </Text>
      </View>

      <View className="mt-4 bg-white pt-4 pl-[18px] pb-5 pr-6 rounded-[15px]">
        <TouchableOpacity
          className="flex-row items-center justify-between mx-2"
          onPress={() => navigation.navigate('About')}
        >
          <View className="flex-row items-center">
            <Text className="mr-2">
              {' '}
              <AntDesign name="infocirlceo" size={12} color="black" />{' '}
            </Text>
            <Text
              className="text-base text-[#444]"
              style={{ fontFamily: 'Axiforma' }}
            >
              About Swave
            </Text>
          </View>

          <Text>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between mt-[25px] mx-2"
          onPress={() => navigation.navigate('Profile')}
        >
          <View className="flex-row items-center">
            <Text className="mr-2">
              {' '}
              <Feather name="help-circle" size={12} color="black" />{' '}
            </Text>
            <Text
              className="text-base text-[#444]"
              style={{ fontFamily: 'Axiforma' }}
            >
              Help & Support
            </Text>
          </View>

          <Text>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between mt-[25px] mx-2"
          onPress={() => navigation.navigate('Terms')}
        >
          <View className="flex-row items-center">
            <Text className="mr-2">
              {' '}
              <Ionicons
                name="information-circle-outline"
                size={11}
                color="black"
              />{' '}
            </Text>
            <Text
              className="text-base text-[#444]"
              style={{ fontFamily: 'Axiforma' }}
            >
              Terms and Conditions
            </Text>
          </View>

          <Text>{'>'}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-between mt-[25px] mx-2"
          onPress={() => navigation.navigate('Privacy')}
        >
          <View className="flex-row items-center">
            <Text className="mr-2 ">
              {' '}
              <MaterialCommunityIcons
                name="shield-alert-outline"
                size={12}
                color="black"
              />{' '}
            </Text>
            <Text
              className="text-base text-[#444]"
              style={{ fontFamily: 'Axiforma' }}
            >
              Privacy Policy
            </Text>
          </View>

          <Text>{'>'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Content
