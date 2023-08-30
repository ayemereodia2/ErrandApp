import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView, TextInput} from 'react-native-gesture-handler'
import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import DropdownComponent from '../../components/Picker/DropdownComponent'

const CreateFinance = ({navigation}:any) => {
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
        <Text className='text-white mx-auto'>4</Text>
    </View>
    <Text className='font-semibold text-[#243763] text-base'>Errand Finances</Text>
  </View>

  <View className='mx-auto items-center justify-center w-[309px] h-[48px] mt-5'>
    <Text className='text-[#777777] text-center'>In this section, you can set the financial plan for this request regarding the budget of the request</Text>
  </View>

  <View className='mt-[41px] ml-4'>
      <Text className='text-[#243763]'>What is your budget for this errand?</Text>
    </View>
    <TextInput className='md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]' placeholder='Enter your Budget Amount' placeholderTextColor={'#B3B3B3'}></TextInput>
    <View className='mt-4 ml-4'>
    <Text className='text-[#FF0000] text-sm font-medium'>The Budget for this errand is calculated against the current market rate and it is currently ₦2,000. </Text>
    </View>

    <View className='mt-10 ml-4 '>
        <Text className='text-[#243763] font-semibold text-[20px]'>Insurance</Text>
    </View>
    <View className='ml-4 mt-4 h-[144px]'>
     <Text className='text-[#243763] overflow-auto font-normal leading-[24px] text-sm'>Setting an Insurance value on your errand forces bidders to have that value in their wallet before they can bid for your errand. The value is then held by GOFER until the errand is completed in order to secure your valuables.. Use this option carefully as it will likely limit the number of bids you receive on this errand</Text>

    </View>

    <View className='mt-[41px] md:w-[390px] ml-[16px]'>
      <Text>Request for Insurance</Text>
    </View>
    <DropdownComponent />

    <View className='mt-[41px] ml-4'>
      <Text className='text-[#243763]'>How much insurance amount do you require from Bidders for this errand?</Text>
    </View>
    <TextInput className='md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]' placeholder='Enter your Insurance Amount' placeholderTextColor={'#B3B3B3'}></TextInput>

    
  {/* Proceed Button */}

  <TouchableOpacity onPress={()=> navigation.navigate('ErrandReview')}>
  <View className='w-[300px] h-[50px] bg-[#243763] mt-[75px] mb-[37px] mx-auto items-center justify-center'>
    <Text className='text-white text-center items-center'>Proceed to Errand Review  <AntDesign name="arrowright" size={18} color="white" /></Text>
  </View>
  </TouchableOpacity>



     </ScrollView>
    
    </>
    
  )
}

export default CreateFinance