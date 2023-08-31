import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput} from 'react-native-gesture-handler'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Dropdown from '../../components/Picker/DropdownComponent'
import DropdownComponent from '../../components/Picker/DropdownComponent'

const CreateTasks = ({navigation}:any) => {
  return (
    <>
     {/* Header */}
      
    <View className='w-[430px] h-[120px] bg-[#243763] items-center justify-center'>
    <Text className='text-center text-white mt-6 font-semibold text-xl mr-2'>Create Errand</Text>
  </View>

  <ScrollView>
  <View className='flex-row mt-[38px] items-center'>
    <View className='mr-[92px] ml-4 bg-[#8098D1] b rounded-full'>
    <TouchableOpacity onPress={()=>navigation.goBack()}><Text className=''><AntDesign name="arrowleft" size={28} color="white" /></Text></TouchableOpacity>
    </View>
    
    <View className='mr-2 w-[30px] h-[30px] bg-[#6604C8] b rounded-full justify-center items-center'>
        <Text className='text-white mx-auto'>2</Text>
    </View>
    <Text className='font-semibold text-[#243763] text-base'>Errand Details</Text>
  </View>

  <View className='mx-auto items-center justify-center w-[309px] h-[48px] mt-5'>
    <Text className='text-[#777777] text-center'>In this section, you can supply additional information about the errand you wish to post.</Text>
  </View>

  <View className='mt-[56px] ml-[16px]'>
    <Text>Description</Text>
  </View>
    <TextInput className='w-[380px] mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm'
     placeholder='Describe the issue that you need help with'
     placeholderTextColor={'#000'}>

    </TextInput>

    <View className='mt-[40px] ml-4'>
      <Text>Duration</Text>
    </View>

    <View className='mt-[25px] ml-4'>
      <Text>Number</Text>
    </View>
    <TextInput className='w-[380px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#FAFAFA]' keyboardType={'numeric'} placeholder='Enter a Number' placeholderTextColor={'#888888'}></TextInput>

    <View className='w-[398px] h-[38px] mx-auto mt-10 ml-4'>
    </View>
    <View className='w-[380px] h-[150px] bg-[#FCFCFC] mx-auto mt-4'>
      <Text className='mx-auto mt-8'><Feather name="image" size={40} color="#3F60AC" /></Text>
      <Text className='mx-auto text-[#808080]'>Drag and Drop an image or <Text className='text-[#3F60AC] font-semibold'>Browse</Text></Text>
      <Text className='mx-auto text-[#808080]'>3 images maximum</Text>
    </View>

    <View className='mt-4 ml-4'>
      <Text className='text-[#3F60AC]'>3 images selected</Text>
    </View>
    <ScrollView horizontal className='ml-4 mt-4'>
      <Image source={require('../../assets/images/pawpaw.jpg')} className='w-[100px] h-[100px] mr-4 rounded-xl' />
      <Image source={require('../../assets/images/pawpaw1.jpg')} className='w-[100px] h-[100px] mr-4 rounded-xl' />
      <Image source={require('../../assets/images/meme.jpg')} className='w-[100px] h-[100px] mr-4 rounded-xl' />
      

    </ScrollView>

    <View className='w-[398px] h-[38px] mx-auto mt-10 ml-4'>
      <Text className='text-[#243763]'><Text className='font-semibold text-sm'>Supporting Audio </Text>(Upload a voice note to further describe your request)</Text>
    </View>

    <View className='w-[380px] h-[150px] bg-[#FCFCFC] mx-auto mt-4'>
      <Text className='mx-auto mt-8'><FontAwesome name="microphone" size={40} color="#3F60AC" /></Text>
      <Text className='mx-auto text-[#808080]'>Click on the Mic icon above to record</Text>
      <Text className='mx-auto text-[#808080]'>your voice message</Text>
    </View>

    <View className='ml-4 mt-4 flex-row items-center '>
      <View className='mr-10'>
        <Text><FontAwesome name="stop-circle-o" size={48} color="#3F60AC" /></Text>
      </View>
      <View className='mr-10'>
        <Image source={require('../../assets/images/audio.jpg')} />
      </View>
      <View>
        <Text className='text-black font-semibold text-lg'>1:30</Text>
      </View>
    </View>

    <View className='mt-[41px] ml-[16px]'>
      <Text>Restrict Errand by Insurance</Text>
    </View>
    <DropdownComponent />
    

    <View className='mt-[41px] ml-[16px]'>
      <Text>Restrict Errand by Qualification</Text>
    </View>
    <DropdownComponent />

    <View className='mt-[41px] ml-[16px]'>
      <Text>Restrict Errand by Verification</Text>
    </View>
    <DropdownComponent />

     {/* Proceed Button */}

  <TouchableOpacity onPress={()=> navigation.navigate('ErrandLocation')}>
  <View className='w-[300px] h-[50px] bg-[#243763] mt-[52px] mb-[50px] mx-auto items-center justify-center'>
    <Text className='text-white text-center items-center'>Proceed to Errand Location  <AntDesign name="arrowright" size={18} color="white" /></Text>
  </View>
  </TouchableOpacity>



  </ScrollView>


   </>
  )
}

export default CreateTasks