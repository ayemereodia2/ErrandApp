import { View, Text, Image, SafeAreaView } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'

const ErrandTexts = () => {
  return (
    <SafeAreaView  className='mb-4'>
    <ScrollView>
        <View className='w-[380px] bg-[#f7F0FF] mx-4 mt-6 py-4 px-6'>
            <View className='flex-row items-center justify-between'>
                <Image source={require('../../assets/images/jagger.jpg')}
                className='w-8 h-8 b rounded-full'
                
                />
                <Text className='text-base font-medium'>Michael Jagger McAvoy</Text>
                <Text className='text-[#808080] text-sm'>5 days ago</Text>
            </View>

            {/*Second one */}
            <View className='mt-4'>
                <Text className='text-base font-medium'>I need help repairing my car that’s been faulty over a weekend now.It’s been refusing to start for weeks</Text>
            </View>


                {/* Third one */}

            <View className='flex-row justify-between items-center mt-4'>
                <View className='bg-[#ADF0D1] w-[76px] rounded-md'>
                    <Text className='text-center text-base font-medium'>Active</Text>
                </View>

                <View className='bg-[#6604C8] rounded-md'>
                    <Text className='text-white p-1 text-center'>8</Text>
                </View>

            </View>
            
        </View>


                     {/* Second Part */}

            <View className='w-[380px] mx-4 mt-6 py-4 px-6'>
            <View className='flex-row items-center justify-between'>
                <Image source={require('../../assets/images/loretta.jpg')}
                className='w-8 h-8 b rounded-full'
                
                />
                <Text className='text-base font-medium'>Loretta McAvoy</Text>
                <Text className='text-[#808080] text-sm'>7 days ago</Text>
            </View>

            {/*Second one */}
            <View className='mt-4'>
                <Text className='text-base font-medium'>I need help repairing my car that’s been faulty over a weekend now.It’s been refusing to start for weeks</Text>
            </View>


                {/* Third one */}

            <View className='flex-row justify-between items-center mt-4'>
                <View className='bg-[#FEE1CD] w-[76px] rounded-md'>
                    <Text className='text-center text-base font-medium'>Open</Text>
                </View>

                <View className='bg-[#6604C8] rounded-md'>
                    <Text className='text-white p-1 text-center'>8</Text>
                </View>

            </View>
             </View>



             {/* Third Part */}

        <View className='w-[380px]mx-4 mt-6 py-4 px-6'>
            <View className='flex-row items-center justify-between'>
                <Image source={require('../../assets/images/multiple.jpg')}
                className='w-8 h-8 b rounded-full'
                
                />
                <Text className='text-base font-medium'>Multiple Users Errand</Text>
                <Text className='text-[#808080] text-sm'>7 days ago</Text>
            </View>

            {/*Second one */}
            <View className='mt-4'>
                <Text className='text-base font-medium'>I need help repairing my car that’s been faulty over a weekend now.It’s been refusing to start for weeks</Text>
            </View>


                {/* Third one */}

            <View className='flex-row justify-between items-center mt-4'>
                <View className='bg-[#ADF0D1] w-[76px] rounded-md'>
                    <Text className='text-center text-base font-medium'>Active</Text>
                </View>

                <View className='bg-[#6604C8] rounded-md'>
                    <Text className='text-white p-1 text-center'>8</Text>
                </View>

            </View>
             </View>
             

             {/* Fourth Part */}

             <View className='w-[380px] mx-4 mt-6 py-4 px-6'>
            <View className='flex-row items-center justify-between'>
                <Image source={require('../../assets/images/loretta.jpg')}
                className='w-8 h-8 b rounded-full'
                
                />
                <Text className='text-base font-medium'>Loretta McAvoy</Text>
                <Text className='text-[#808080] text-sm'>7 days ago</Text>
            </View>

            {/*Second one */}
            <View className='mt-4'>
                <Text className='text-base font-medium'>I need help repairing my car that’s been faulty over a weekend now.It’s been refusing to start for weeks</Text>
            </View>


                {/* Third one */}

            <View className='flex-row justify-between items-center mt-4'>
                <View className='bg-[#FEE1CD] w-[76px] rounded-md'>
                    <Text className='text-center text-base font-medium'>Open</Text>
                </View>

                <View className='bg-[#6604C8] rounded-md'>
                    <Text className='text-white p-1 text-center'>8</Text>
                </View>

            </View>
             </View>

             {/* FIfth Part */}
        
             <View className='w-[380px]  mx-4 mt-6 py-4 px-6'>
            <View className='flex-row items-center justify-between'>
                <Image source={require('../../assets/images/multiple.jpg')}
                className='w-8 h-8 b rounded-full'
                
                />
                <Text className='text-base font-medium'>Multiple Users Errand</Text>
                <Text className='text-[#808080] text-sm'>7 days ago</Text>
            </View>

            {/*Second one */}
            <View className='mt-4'>
                <Text className='text-base font-medium'>I need help repairing my car that’s been faulty over a weekend now.It’s been refusing to start for weeks</Text>
            </View>


                {/* Third one */}

            <View className='flex-row justify-between items-center mt-4'>
                <View className='bg-[#ADF0D1] w-[76px] rounded-md'>
                    <Text className='text-center text-base font-medium'>Active</Text>
                </View>

                <View className='bg-[#6604C8] rounded-md'>
                    <Text className='text-white p-1 text-center'>8</Text>
                </View>

            </View>
             </View>
             

             {/* Sixth Part */}

             <View className='w-[380px] mx-4 mt-6 py-4 px-6'>
            <View className='flex-row items-center justify-between'>
                <Image source={require('../../assets/images/multiple.jpg')}
                className='w-8 h-8 b rounded-full'
                
                />
                <Text className='text-base font-medium'>Multiple Users Errand</Text>
                <Text className='text-[#808080] text-sm'>7 days ago</Text>
            </View>

            {/*Second one */}
            <View className='mt-4'>
                <Text className='text-base font-medium'>I need help repairing my car that’s been faulty over a weekend now.It’s been refusing to start for weeks</Text>
            </View>


                {/* Third one */}

            <View className='flex-row justify-between items-center mt-4'>
                <View className='bg-[#ADF0D1] w-[76px] rounded-md'>
                    <Text className='text-center text-base font-medium'>Active</Text>
                </View>

                <View className='bg-[#6604C8] rounded-md'>
                    <Text className='text-white p-1 text-center'>8</Text>
                </View>

            </View>
             </View>


    </ScrollView>
    </SafeAreaView>
  )
}

export default ErrandTexts