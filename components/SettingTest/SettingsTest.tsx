import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { Switch } from 'react-native-gesture-handler'

const SettingsTest = () => {
  return (
    
    <ScrollView>
        
    <View className='mt-8 ml-4'>
      <Text className='pb-2 text-base font-bold leading-6'>GENERAL NOTIFICATIONS</Text>
      <Text className='text-[14px]'>Notifications on all general activities on Swave</Text>
    </View>

    <View className='w-[390px] h-[350px] bg-[#ECF0F8] mx-auto mt-5 rounded-md pb-4'>
        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Account Update Notification</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>You will be notified when an update is available</Text>     
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Newsletters and offers</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>Be in the know when we publish any information</Text>     
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Promotions and adverts</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="grey"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>Stay informed about our amazing offers</Text>     
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Promotions and adverts</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>Stay informed about our amazing offers</Text>     
        </View>
        

    </View>


    <View className='mt-8 ml-4'>
      <Text className='pb-2 text-base font-bold leading-6'>ERRAND NOTIFICATIONS</Text>
      <Text className='text-[14px]'>Errands and bids specific notifications</Text>
    </View>


    <View className='w-[390px] h-[350px] bg-[#ECF0F8] mx-auto mt-5 rounded-md pb-4'>
        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>New errands in your category interest</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>You will be notified when an update is available</Text>     
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Errands within your area</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>Be in the know when we publish any information</Text>     
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Bids on your errands</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="grey"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>Stay informed about our amazing offers</Text>     
        </View>



        <View className=' w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-[18px]'>Errand status updates</Text>
                <Switch
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
        
            </View>
            <Text className='text-[14px]'>Stay informed about our amazing offers</Text>     
        </View>


     
        

    </View>

    

    </ScrollView>
   
  )
}

export default SettingsTest