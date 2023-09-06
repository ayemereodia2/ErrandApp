import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'

interface Notify {
  imageSource: any;
  name: string;
  text: string

}

const Notify = ({imageSource, name, text}:Notify) => {
  return (
    <View className='md:w-[380px] h-[178px] mx-4 mt-8'>
    <View className='flex-row justify-between items-center'>
      {imageSource}
      <View>
      <Text className='font-semibold text-base'>{name}</Text>
      <Text>Placed a bid on your errand</Text>
      </View>
      <Text className='mb-4 text-[#808080]'>3hrs ago</Text>
      </View>

      <View className='md:w-[320px] h-[50px] mt-4 items-center ml-20 mr-4'>
        <Text className='font-normal'>{text}</Text>
      </View>

      <View className='ml-20 flex-row mt-4'>
        <TouchableOpacity>
        <View className='bg-[#21B06E] w-[76px] h-[37px] justify-center items-center rounded-full'>
          <Text className='text-white'>Accept</Text>
        </View>
        </TouchableOpacity>

        <TouchableOpacity>
        <View className='border border-[#C82332] w-[76px] h-[37px] justify-center items-center ml-4 rounded-full'>
        <Text className='text-[#C82332]'>Reject</Text>
        </View>
       </TouchableOpacity>

       <TouchableOpacity>
        <View className='border border-[#3F60AC]  w-[76px] h-[37px] justify-center items-center ml-4 rounded-full'>
        <Text className='text-[#3F60AC]'>Negotiate</Text>
        </View>
        </TouchableOpacity>
        
      </View>

     


      

  </View>
  )
}

export default Notify