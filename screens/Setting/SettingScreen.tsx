import { View, Text, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import SettingsTest from '../../components/SettingTest/SettingsTest'
import SettingsCategory from '../../components/SettingTest/SettingsCategory'



const SettingScreen = ({navigation}:any) => {


  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Settings',
      headerLeft: () => (
        <ScrollView>
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="flex-row items-center"
          >
            {/* <ProfileInitials firstName="Azubike" lastName="Orji" /> */}
            <Entypo name="menu" size={24} />
          </TouchableOpacity>
        </View>
        </ScrollView>
      ),
    })
  }, [])


  return (
    <SafeAreaView>
      <ScrollView>

      <View className='mt-10'>
      <View className='md:w-[380px] h-[88px] mx-4 mt-8 border-b-[#CCCCCC] border-b-2'>
    <View className='flex-row justify-between items-center'>
     <Image source={require('../../assets/images/mide.jpg')} className='w-[64px] h-[64px] rounded-full'/>
      <View className='mr-14 mb-2'>
      <Text className='font-semibold text-base pb-2'>Mide Eliot AjibadeOkonkwo</Text>
      <Text>midesmailishere@gmail.com</Text>
      </View>
      <Text className='mb-4 text-[#808080]'><MaterialIcons name="keyboard-arrow-right" size={24} color="black" /></Text>
      </View>
    </View>

    
    <SettingsTest />

    <SettingsCategory />

    <View className='mt-8 ml-4'>
      <Text className='pb-2 text-base font-bold leading-6'>REFERRAL CODE</Text>
      </View>

      <View className='w-[390px] h-[350px] bg-[#ECF0F8] mx-auto mt-5 rounded-md pb-4'>
        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Enoobong-ga86P</Text>
               <Text>Tap to Copy Code</Text>
        
            </View>
                
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Share Via Email</Text>
                
            </View>
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Download Invitation</Text>
               <Text><Ionicons name="md-download-sharp" size={24} color="black" /></Text>
            </View>
        </View>



        <View className=' w-[360px] ml-4 mt-5 border-b border-b-[#AAAAAA] bg-[#3F60AC] rounded-md'>
          <Text className='text-[#FAFAFA] text-base font-bold  px-5 py-5'>Invite new members by sharing the invitation code Enoobong-ga86P with them. Registration in your group will then take place automatically.</Text>
               
        </View>
        
    </View>




    <View className='mt-20 ml-4'>
      <Text className='pb-2 text-base font-bold leading-6'>NOTIFICATIONS</Text>
      </View>

      <View className='w-[390px] h-[190px] bg-[#ECF0F8] mx-auto mt-5 rounded-md pb-4'>
        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Send Email notifications</Text>
            </View>
                <View className='bg-[#ADF0D1] w-[64px] h-8 items-center justify-center'>
                  <Text className='text-[14px]'>Enabled</Text>
                </View>
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Send SMS notifications</Text>
                
            </View>
            <View className='bg-[#ADF0D1] w-[64px] h-8 items-center justify-center'>
                  <Text className='text-[14px]'>Enabled</Text>
                </View>
        </View>

     
        

    </View>


      </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingScreen