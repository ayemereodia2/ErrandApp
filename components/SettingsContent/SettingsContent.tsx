import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { AntDesign, Feather, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const SettingsContent = ({navigation}:any) => {
    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
        loading,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <View style={{}} className=' px-4 pt-4'>


   <View className='mt-[14px]'>
    <Text className='text-base text-[#444]' style={{fontFamily: 'Axiforma'}}>Helpful Links</Text>
   </View>

   <View className='mt-4 bg-white pt-4 pl-[18px] pb-5 pr-6 rounded-[15px]'>

   <TouchableOpacity className='flex-row items-center justify-between mx-2' onPress={()=> navigation.navigate('About')}>

    <View className='flex-row items-center'>
    <Text className='mr-2'> <AntDesign name="infocirlceo" size={12} color="black" /> </Text>
    <Text className='text-base text-[#444]' style={{fontFamily: 'Axiforma'}}>About Swave</Text>
    </View>
    
    <Text><AntDesign name="right" size={20} color="black" /></Text>
   </TouchableOpacity>


   <TouchableOpacity className='flex-row items-center justify-between mt-[25px] mx-2' onPress={()=> navigation.navigate('Profile')}>

      <View className='flex-row items-center'>
      <Text className='mr-2'> <Feather name="help-circle" size={12} color="black" /> </Text>
      <Text className='text-base text-[#444]' style={{fontFamily: 'Axiforma'}}>Help & Support</Text>
      </View>

      <Text><AntDesign name="right" size={20} color="black" /></Text>
      </TouchableOpacity>


      <TouchableOpacity className='flex-row items-center justify-between mt-[25px] mx-2' onPress={()=> navigation.navigate('Terms')}>

        <View className='flex-row items-center'>
        <Text className='mr-2'> <Ionicons name="information-circle-outline" size={11} color="black" /> </Text>
        <Text className='text-base text-[#444]' style={{fontFamily: 'Axiforma'}}>Terms and Conditions</Text>
        </View>

        <Text><AntDesign name="right" size={20} color="black" /></Text>
        </TouchableOpacity>


        <TouchableOpacity className='flex-row items-center justify-between mt-[25px] mx-2 ' onPress={()=> navigation.navigate('Privacy')}>

        <View className='flex-row items-center'>
        <Text className='mr-2 '> <MaterialCommunityIcons name="shield-alert-outline" size={12} color="black" /> </Text>
        <Text className='text-base text-[#444]' style={{fontFamily: 'Axiforma'}}>Privacy Policy</Text>
        </View>

        <Text><AntDesign name="right" size={20} color="black" /></Text>
        </TouchableOpacity>



   </View>


   </View>

  )
}

export default SettingsContent