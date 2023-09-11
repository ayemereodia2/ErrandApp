import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native'
import { Image } from 'react-native'
import UserProfile from '../../components/UsersProfile/UserProfile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { _fetch } from '../../services/axios/http'
import { useQuery } from '@tanstack/react-query'



const AccountScreen = ({navigation}:any) => {

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

 

    const {isLoading, isError, data} = useQuery({ queryKey: ['user-profile'], queryFn: getUserProfile })
    console.log(data);
    
   
    
  if (isLoading){
    return (
      <Text>Loading...</Text>
    )
  }

  if (isError){
    return (
      <Text>{isError}</Text>
    )
  }


  // console.log('data', data?.last_name)


  return (
    <SafeAreaView>
       {/* Header */}

       <View className='flex-row justify-between ml-[58px] mt-10 mr-[50px] pb-2'>

      <TouchableOpacity className='items-center justify-center flex-row' onPress={()=> navigation.goBack()}>
      <Text className='mr-2'><AntDesign name="close" size={16} color="black" /></Text>
      <Text>Close</Text>
     </TouchableOpacity>

    <Text>My Profile</Text>

      </View>

    {/* End Of Header */}

    <ScrollView>
      {/* Top Profile */}


    <View className='mt-20 mx-auto'>
      <Image 
      source={require('../../assets/images/profile.png')}
      className='b rounded-full w-[150px] h-[150px]'
      />
    </View>

    <View>
      {/* Name Area */}

      <View className='flex-row justify-center items-center mt-10'>
      <Text>{data?.data.first_name} {data?.data.last_name} </Text> 
      <Text><MaterialIcons name="verified" size={20} color="green" /></Text>
      </View>

      {/*Occupation */}

      <Text className='text-center mt-3'>{data?.data.occupation}</Text>
      <View className='flex-row justify-center items-center mt-3'>
        <Text className='pl-1 text-[#6604C8]'>Rating</Text>
        <Text className='pl-1'><Entypo name="star" size={20} color="gold" /></Text>
        <Text className='pl-1'><Entypo name="star" size={20} color="gold" /></Text>
        <Text className='pl-1'><Entypo name="star" size={20} color="gold" /></Text>
        <Text className='pl-1'><Entypo name="star" size={20} color="gold" /></Text>
        <Text className='pl-1'><Entypo name="star" size={20} color="gold" /></Text>
      </View>


      {/* Number of errands */}

      <View className='flex-row mt-5 mx-auto'>
        <View className='ml-3 b border-r-[1px]'>
          <Text className='text-center'>400</Text>
          <Text>total Errands </Text>
        </View>

        <View className='ml-3 b border-r-[1px]'>
          <Text className='text-center'>{data?.data.errands_completed}</Text>
          <Text>Errands Completed </Text>
        </View>

        <View className='ml-3 '>
          <Text className='text-center'>{data?.data.errands_cancelled}</Text>
          <Text>Errands Cancelled </Text>
        </View>
      </View>

      {/* Edit BUtton */}
      <TouchableOpacity className=' mt-[30px]' onPress={()=> navigation.navigate('EditProfile')}>
            <View className='w-[250px] h-[50px] bg-[#243763]  mx-auto items-center justify-center'>
            <Text className='text-white text-center items-center'> Edit Profile </Text>
            </View>
         </TouchableOpacity>

         <View className='flex-row mr-[16px] mt-8 ml-[16px] md:w-[398px] mx-auto '>
        <TouchableOpacity >
        <View className='w-[199px] h-[52px] border-b-2 border-blue-500 items-center justify-center '>
          <Text className='text-center text-blue-500' >Profile information</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity>
        <View className='w-[190px] h-[52px] border-b items-center justify-center '>
          <Text className='text-center text-[#243763]' >User verification</Text>
          </View>
        </TouchableOpacity>
          
      </View>

      <UserProfile data={data}/>


      
    </View>

    </ScrollView>
    </SafeAreaView>
  )

}

export default AccountScreen