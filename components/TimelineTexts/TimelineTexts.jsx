import { View, Text, SafeAreaView, ScrollView, Image } from 'react-native'
import React from 'react'

const TimelineTexts = () => {
  return (
   <SafeAreaView className='mt-9 ml-4'>
    <ScrollView>

            {/*First Chat */}

        <View>

            {/*Profile section */}
            <View className='flex-row'>
                <Image source={require('../../assets/images/meme.jpg')} className='w-10 h-10 mr-5 rounded-full'/>
                <View>
                    <Text className='text-base font-medium'>Enoobong George</Text>
                    <Text className='text-[#777] font-medium text-sm'>14th August 2023</Text>
                </View>
            </View>


            {/*Text section */}

            <View className='mt-2 w-[312px] p-4 bg-[#E6E6E6] b rounded'>  
            <Text className='text-base font-medium'>Please what’s the update on the laundry service that i requested from you? How long more do i have to wait for this to be completed? Kindly respond.</Text>
             </View>

             <View className='mt-2'>
                <Text className='text-[#777] text-sm leading-6 font-mediun'>17:59pm</Text>
             </View>

        </View>


                {/* Second Chat */}
             
        <View className='mt-8 items-end'>

        {/*Profile section */}
        <View className='flex-row mr-28'>
            <Image source={require('../../assets/images/meme.jpg')} className='w-10 h-10 mr-5 rounded-full'/>
            <View>
                <Text className='text-base font-medium'>Azubuike ‘Sean’ Orji</Text>
                <Text className='text-[#777] font-medium text-sm'>14th August 2023</Text>
            </View>
        </View>


        {/*Text section */}

        <View className='mt-2 w-[312px] p-4 bg-[#E6E6E6] b rounded'>  
        <Text className='text-base font-medium'>I’ve been making steady progress on the task that was assigned to me. So far so good and we’re in line with the targeted Completion date.</Text>
        </View>

        <View className='mt-2 mr-64'>
            <Text className='text-[#777] text-sm leading-6 font-mediun'>21:59pm</Text>
        </View>

        </View>

    </ScrollView>
   </SafeAreaView>
  )
}

export default TimelineTexts