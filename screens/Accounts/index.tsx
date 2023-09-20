import { View, Text, SafeAreaView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo, EvilIcons, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native'
import { Image } from 'react-native'
import UserProfile from '../../components/UsersProfile/UserProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { _fetch } from '../../services/axios/http'
import { useQuery } from '@tanstack/react-query'
import UserVerification from '../../components/UsersProfile/UserVerification'

import Toast from 'react-native-toast-message'
import { useFocusEffect } from '@react-navigation/native'



const AccountScreen = ({navigation}:any) => {

  const [profile, setProfile] = useState(true);

  const handleProfile = () => {
    setProfile(false)
  }

  const handleVerification = () => {
    setProfile(true)
  }


  const getUserProfile = async () => {
    console.log('get user profile is called')
    const token = await AsyncStorage.getItem('accessToken');
  
  
    const _rs = await _fetch({
      method: "GET",
      _url: `/user/profile`,
  })
  console.log('response', _rs)
  console.log(token)
  return await _rs.json()
  
  }

 

    const {isLoading, isError, data} = useQuery({ queryKey: ['user-profile'], queryFn: getUserProfile, refetchOnMount: 'always'})
    console.log(data);

    
    
   
    
  if (isLoading){
    return (
      <SafeAreaView className='m-auto bg-gray-200 w-screen h-screen'>
          {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
          <ActivityIndicator color="black" size="large" />

       </SafeAreaView>
    )
  }

  if (isError){
    return (
      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    )
  }


  // console.log('data', data?.last_name)


  return (
    <SafeAreaView>
       {/* Header */}

       <View className='flex-row items-center ml-[36px] mt-10 mr-[50px] pb-2'>

      <TouchableOpacity className='items-center justify-center flex-row' onPress={()=> navigation.goBack()}>
      <Text className='mr-[105px]'><AntDesign name="close" size={20} color="black" /></Text>
      
     </TouchableOpacity>

    <Text className='text-[18px] font-bold'>My Profile</Text>

      </View>

    {/* End Of Header */}

    <ScrollView>
      {/* Top Profile */}

    { data?.data.profile_picture ? 

    <View className='mt-8 mx-auto'>
      <Image 
      source={{uri: data?.data.profile_picture}}
      className='b rounded-full w-[100px] h-[100px]'
      />
    </View> : 

    <View className='bg-gray-700 w-[80px] h-[80px] rounded-full items-center justify-center mx-auto mt-8'>
      <Text className='text-white font-bold text-center text-2xl'>{data?.data.first_name.charAt(0)}{data?.data.last_name.charAt(0)}</Text>
    </View> }
    

      {/* Name Area */}

    <View> 
      <View className='flex-row justify-center items-center mt-5'>
      <Text className='text-[18px] font-bold leading-6'>{data?.data.first_name}  {data?.data.last_name} </Text> 
      <Text><MaterialIcons name="verified" size={20} color="green" /></Text>
      </View>

      {/*Occupation */}

      <Text className='text-center mt-3 text-base font-medium'>{data?.data.occupation ? data.occupation : 'Swave User'}</Text>
      


      {/* Number of errands */}

      <View className='flex-row mt-5 mx-auto'>
        <View className='ml-3'>
          <Text className='text-center mb-1 font-bold'>400</Text>
          <Text className='text-center font-medium'>total Errands </Text>
        </View>

        <View className='ml-3'>
          <Text className='text-center mb-1 font-bold'>{data?.data.errands_completed}</Text>
          <Text className='text-center font-medium'>Errands Completed </Text>
        </View>

        <View className='ml-3 '>
          <Text className='text-center mb-1 font-bold'>{data?.data.errands_cancelled}</Text>
          <Text className='text-center font-medium'>Errands Cancelled </Text>
        </View>
      </View>

      {/* Edit BUtton */}
      <TouchableOpacity className=' mt-[30px]' onPress={()=> navigation.navigate('EditProfile', {data}) }>

            <View className='w-[140px] h-[40px] bg-[#E6E6E6] border border-[#CCC] mx-auto items-center justify-center rounded-md'>
            <Text className='text-base font-medium text-center items-center'> Edit Profile </Text>
            </View>
         </TouchableOpacity>

         <View className='flex-row mr-[16px] mt-8 ml-[16px] md:w-[398px] mx-auto '>
        <TouchableOpacity onPress={handleVerification}>
        <View className='w-[199px] h-[52px] border-b items-center justify-center '
         style={{borderBottomColor: profile ? '#3F60AC' : '#243763', borderBottomWidth: profile ? 2 : 1}}>
          <Text className='text-center font-medium' style={{color: profile ? '#3F60AC' : '#243763'}} >Profile information</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleProfile}>
        <View className='w-[190px] h-[52px] border-b items-center justify-center ' style={{borderBottomColor: profile ? '#243763' : '#3F60AC', borderBottomWidth: profile ? 1 : 2}}>
          <Text className='text-center font-medium' style={{color: profile ? '#243763' : '#3F60AC'}}>User verification</Text>
          </View>
        </TouchableOpacity>
          
      </View>

        { profile ? <UserProfile data={data}/> : <UserVerification /> }


      
    </View>

    </ScrollView>
    </SafeAreaView>
  )

}

export default AccountScreen