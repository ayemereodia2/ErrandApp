import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Entypo, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import { ScrollView } from 'react-native-gesture-handler'
import { TextInput } from 'react-native'
import { Image } from 'react-native'

const AccountScreen = ({navigation}:any) => {
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
      <Text>Zebrudaya Owonikoko </Text> 
      <Text><MaterialIcons name="verified" size={20} color="green" /></Text>
      </View>

      {/*Occupation */}

      <Text className='text-center mt-3'>UI/UX Designer</Text>
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
          <Text className='text-center'>400</Text>
          <Text>total Errands </Text>
        </View>

        <View className='ml-3 '>
          <Text className='text-center'>400</Text>
          <Text>total Errands </Text>
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

      <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base text-[#1E3A79] font-semibold pt-6 pb-6'>About</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 pb-10 leading-6'>
        Lorem ipsum dolor sit amet consectetur. At convallis lacus sodales lorem et.  MakakdacConsectetur est posuere fermentum egestas congue lectus purus. Mattis libero  ultrices at massa hendrerit purus. Ege
        </Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base text-[#1E3A79] font-semibold pt-6 pb-6'>Email address / Phone number</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 leading-6  pb-10'>
        adeoti3123@gmail.com  <Text>adeoti3123@gmail.com</Text>   </Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4 pt-6 pb-6'>
          <Text className='text-base text-[#1E3A79] font-semibold'>Referral code / Date of birth</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 pb-10 leading-6'>
        QE35FG0   <Text>December 18, 2023</Text>     </Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4'>
          <Text className='text-base text-[#1E3A79] font-semibold pt-6 pb-6'>Referral information</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 pb-10 leading-6 mb-20'>
        Lorem ipsum dolor sit amet consectetur. At convallis lacus sodales lorem et.  MakakdacConsectetur est posuere fermentum egestas congue lectus purus. Mattis libero  ultrices at massa hendrerit purus. Ege
        </Text>
      </View>



      
    </View>

    </ScrollView>
    </SafeAreaView>
  )
}

export default AccountScreen