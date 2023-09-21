import { View, Text, TouchableOpacity, SafeAreaView, TextInput } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { ScrollView } from 'react-native-gesture-handler'

const EscrowScreen = ({navigation}:any) => {

    useLayoutEffect(() => {
        navigation.setOptions({

          headerShown: true,
          title: 'Escrow Breakdown',
          headerStyle: { backgroundColor: '#F8F9FC' },
          headerLeft: () => (
            <TouchableOpacity className="flex-row items-center justify-between mx-0 px-3 py-3" onPress={()=> navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="black" />            
            </TouchableOpacity>
          ),
          headerRight: () => (
            <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
              {/* <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
                <MaterialIcons name="notifications" color={'black'} size={22} />
              </TouchableOpacity> */}
              <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
                <MenuTrigger>
                  <Entypo name="dots-three-vertical" color={'black'} size={20} />
                </MenuTrigger>
                <MenuOptions
                  customStyles={{
                    optionWrapper: {
                      // borderBottomWidth: 0.2,
                      borderBottomColor: '#AAAAAA',
                    },
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                >
                  <MenuOption
                    // onSelect={}
                    text="Refresh"
                    customStyles={{
                      optionWrapper: {
                        borderBottomWidth: 1,
                        borderBottomColor: '#AAAAAA',
                      },
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                  <MenuOption
                    onSelect={() => alert(`Save`)}
                    text="Profile"
                    customStyles={{
                      optionWrapper: {
                        borderBottomWidth: 1,
                        borderBottomColor: '#AAAAAA',
                      },
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                  <MenuOption
                    onSelect={() => alert(`Save`)}
                    text="Contact Us"
                    customStyles={{
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                </MenuOptions>
              </Menu>
            </View>
          ),
        })
      }, [])


  return (
    <SafeAreaView>
      
        {/* Heder */}

        <View className="bg-[rgb(248,249,252)]">
                <View className="mx-4 flex-row items-center justify-between">
                  <View className="mt-6 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
                    <EvilIcons
                      name="search"
                      size={22}
                      className="w-1/12"
                      color="#808080"
                    />
                    <TextInput
                      className=" w-9/12"
                      placeholder="Search here..."
                      placeholderTextColor="#808080"
                    />
                    
                  </View>
                  <TouchableOpacity >
                      <View className="bg-[#fff] mt-6 mr-2 b rounded-md w-[38px]">
                        <Text className="p-2 text-center">
                        <FontAwesome 
                        name="calendar" 
                        size={24}
                         color="black" />
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                  </View>



                  {/* Body */}

        <ScrollView className='mx-4' showsVerticalScrollIndicator={false}>

        <Text className='mt-[34px] text-center'>Today</Text>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
        <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>



        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
        <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>


            {/* Yesterdy */}

        <Text className='mt-[34px] text-center'>Yesterday</Text>


<View className='mx-2 py-4 border-b border-[#CCCCCC]'>
    <View className='flex-row justify-between items-center mr-2'>
    <View className='w-[276px] px-2 mr-2'>
    <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
    </View>
      <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
    </View>
    <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

</View>


<View className='mx-2 py-4 border-b border-[#CCCCCC]'>
<View className='flex-row justify-between items-center mr-2'>
    <View className='w-[276px] px-2 mr-2'>
    <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
    </View>
      <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
    </View>
    <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

</View>








<Text className='mt-[34px] text-center'>17th September 2023</Text>


<View className='mx-2 py-4 border-b border-[#CCCCCC]'>
    <View className='flex-row justify-between items-center mr-2'>
    <View className='w-[276px] px-2 mr-2'>
    <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
    </View>
      <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
    </View>
    <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

</View>


<View className='mx-2 py-4 border-b border-[#CCCCCC]'>
<View className='flex-row justify-between items-center mr-2'>
    <View className='w-[276px] px-2 mr-2'>
    <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
    </View>
      <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
    </View>
    <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

</View>


<View className='mx-2 py-4 border-b border-[#CCCCCC] mb-10'>
    <View className='flex-row justify-between items-center mr-2 '>
    <View className='w-[276px] px-2 mr-2'>
    <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
    </View>
      <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
    </View>
    <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

</View>




        </ScrollView>
    </SafeAreaView>
  )
}

export default EscrowScreen