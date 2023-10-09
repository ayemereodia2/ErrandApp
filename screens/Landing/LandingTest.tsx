import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { Feather, FontAwesome } from '@expo/vector-icons'
import LandingDetails from '../../components/LandingDetails.tsx/LandingDetails'
import { _fetch } from '../../services/axios/http'
import { useQuery } from '@tanstack/react-query'
import Toast from 'react-native-toast-message'
import axios from 'axios'

const LandingTest = ({navigation}:any) => {

    const [clicked, setClicked] = useState(false)

    

    const getCategory = async () => {
        const _rs = await _fetch({
          method: 'GET',
          _url: `/errand/categories?limit=8`,
        })
        return await _rs.json()        
       
      }

     
      const { isLoading, data, isError} = useQuery({
        queryKey: ['get-category'],
        queryFn: getCategory,
        refetchOnMount: 'always',
      })
      console.log(data);

      

   

      if (isLoading) {
        return (
          <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[100vh] mt-5">
            {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
            <ActivityIndicator color="black" size="large" />
          </SafeAreaView>
        )
      }

  

  return (
    <SafeAreaView className='mx-4'>

        <ScrollView >
            <View className='mt-6 flex-row items-center justify-between'>
                <Text className='font-bold text-[25px] leading-7'>Good evening</Text>
            

            <View className='items-center flex-row gap-4 mr-2'>
                <Text><FontAwesome name="bell-o" size={24} color="black" /></Text>
                <Text><Feather name="search" size={24} color="black" /></Text>
            </View>

            </View>


            <View className='flex-row items-center gap-4 mt-1'>
                <View className='bg-gray-400 px-4 py-1 rounded-xl'>
                    <Text className='text-white text-base'>Music</Text>
                </View>

                <View className='bg-gray-400 px-4 py-1 rounded-xl'>
                    <Text className='text-white text-base'>Podcasts & Shows</Text>
                </View>

             </View>


             <View className='mt-10'>
                <Text className=' text-[25px] leading-7 font-bold'>What do you need help with?</Text>

                <View className='mt-4 w-[90vw] flex-row flex-wrap items-center mx-auto'>
 
                     {data ? data.data.map((category:any)=>(
                       
                        <>
                <View className='flex-row mt-3 ' key={category.id}>
                <TouchableOpacity className='border-gray-400 border px-4 py-1 rounded-xl mr-2 bg-white' onPress={()=> navigation.navigate('LandingForm', {category})} key={category.id}>
                    <Text className='text-black text-base'>{`${category.description}`}</Text>
                </TouchableOpacity>   
                
                  
            </View>
                        </>
                )) : null} 



          </View> 
          </View>



                
             <View className='mt-12'>
                <Text className=' text-[25px] leading-7 font-bold'>Urgent Errands</Text>

                <ScrollView horizontal>

                <LandingDetails navigation={navigation}/>
               
                </ScrollView>
                </View>
            

        </ScrollView>
        
    </SafeAreaView>
  )
}

export default LandingTest