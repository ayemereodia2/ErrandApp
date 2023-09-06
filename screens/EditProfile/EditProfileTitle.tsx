import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native'
import { Image } from 'react-native'
import UpdateProfile from '../../components/ProfileUpdate/UpdateProfile'

const EditProfileTitle = ({navigation}:any) => {
  return (
    <SafeAreaView>
        {/* Header */}

       <View className='flex-row justify-between ml-[58px] mt-10 mr-[50px] pb-2'>

      <TouchableOpacity className='items-center justify-center flex-row' onPress={()=> navigation.goBack()}>
    <Text className='mr-2'><AntDesign name="close" size={16} color="black" /></Text>
    <Text>Close</Text>
    </TouchableOpacity>

    <Text>Edit Profile</Text>

    </View>

    {/* End Of Header */}

    <ScrollView>
       {/* Top Profile */}


    <View className='mt-20 mx-auto relative'>
      <Image 
      source={require('../../assets/images/profile.png')}
      className='b rounded-full w-[150px] h-[150px]'
      />
      <Image source={require('../../assets/images/camera.jpg')} className='absolute left-12 top-11 w-[60px] h-[50px] b rounded-md'/>
    </View>

    <View>
      {/* Name Area */}

      <View className='flex-row justify-center items-center mt-10'>
      <Text>Zebrudaya Owonikoko </Text> 
      <Text><MaterialIcons name="verified" size={20} color="green" /></Text>
      </View>

      {/*Occupation */}

      <Text className='text-center mt-3'>UI/UX Designer</Text>
      </View>

      <UpdateProfile />


    </ScrollView>

    </SafeAreaView>
  )
}

export default EditProfileTitle