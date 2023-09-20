import { View, Text, SafeAreaView, ScrollView, TextInput } from 'react-native'
import React, { useState } from 'react'
import DropdownComponent from '../Picker/DropdownComponent'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import RangeSlider from '../RangeSlider/RangeSlider'




const Filter = ({onClose, filterOn}:any) => {


  return (
   <SafeAreaView>

    <ScrollView>
        
        <View className='fixed top-0 left-11 w-[89%] bg-[#F5F5F5] z-5 duration-200' style={{display: filterOn ? 'flex' : 'flex'}}>

            {/* Header */}
            <View className='flex-row justify-between items-center mt-5 mx-4'>

                <TouchableOpacity onPress={onClose}>
                <Text><AntDesign name="close" size={20} color="black" /></Text>
                </TouchableOpacity>

                <Text className='text-[20px] font-medium leading-6'>Filter Errands</Text>

                <View className='border p-1 px-[12px] text-base font-medium leading-6'>
                    <Text className='font-medium text-base'>Reset</Text>
                </View>
            </View>

            <View className='mt-16 mx-6'>

                <Text className='font-medium text-base leading-6'>Category</Text>

                
                <View className='mt-2 bg-[#FCFCFC] h-0 mb-16 ml-[-16px] w-[300px]'>
                <DropdownComponent placeHolder={'Choose Category'} />
                </View>
                

                <Text className='mt-6 font-medium text-base leading-6'>Quick Options</Text>

            <View className='mt-2'>
                <View className='flex-row'>

                    <TouchableOpacity className='bg-[#1E3A79] px-4 py-2 rounded-[20px] mr-5'>
                        <Text className='font-medium text-base text-white'>Laundry</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='px-4 py-2 rounded-[20px] bg-white border border-[#1E3A79]'>
                        <Text className='font-medium text-base text-[#1E3A79]'>Baby Sitting</Text>
                    </TouchableOpacity>

                </View>

            <View className='flex-row mt-4'>
                <TouchableOpacity className='px-4 py-2 rounded-[20px] bg-white border border-[#1E3A79] mr-6'>
                    <Text className='font-medium text-base text-[#1E3A79]'>Baking & Catering</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='px-4 py-2 rounded-[20px] bg-white border border-[#1E3A79]'>
                        <Text className='font-medium text-base text-[#1E3A79]'>Gardening</Text>
                    </TouchableOpacity>
            </View>
            </View>


            <Text className='mt-12 font-medium text-base leading-6'>Location</Text>

                <View className=''>
                <TextInput 
                placeholder='Find a Location'
                placeholderTextColor={'#AAA'}
                className='w-[320px] h-[44px] bg-white border-[0.5px] border-[#DDD] mx-auto mr-3 pl-2 mt-2'
                
                />
                </View>



                <Text className='mt-6 font-medium text-base leading-6'>Quick Options</Text>

            <View className='mt-2'>
                <View className='flex-row'>

                    <TouchableOpacity className='bg-[#1E3A79] px-4 py-2 rounded-[20px] mr-5'>
                        <Text className='font-medium text-base text-white'>Lagos - 20 Errands</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='px-4 py-2 ml-[-8px] rounded-[20px] bg-white border border-[#1E3A79]'>
                        <Text className='font-medium text-base text-[#1E3A79]'>Uyo - 20 Errands</Text>
                    </TouchableOpacity>

                </View>

            <View className='flex-row mt-4'>
                <TouchableOpacity className='px-4 py-2 rounded-[20px] bg-white border border-[#1E3A79] mr-6'>
                    <Text className='font-medium text-base text-[#1E3A79]'>Ogun - 20 Errands</Text>
                    </TouchableOpacity>

                    <TouchableOpacity className='px-4 py-2 rounded-[20px] ml-[-15px] bg-white border border-[#1E3A79]'>
                        <Text className='font-medium text-base text-[#1E3A79]'>Kwara - 20 Errands</Text>
                    </TouchableOpacity>
            </View>
            </View>

            <RangeSlider />

            <TouchableOpacity className='bg-[#1E3A79] w-[300px] h-[56px] rounded-md mx-auto mt-[256px] justify-center items-center mb-[62px]'>
                <Text className='text-white text-center'>Filter Errands</Text>
            </TouchableOpacity>

        </View>
                

        </View>
    </ScrollView>


   </SafeAreaView>
  )
}

export default Filter