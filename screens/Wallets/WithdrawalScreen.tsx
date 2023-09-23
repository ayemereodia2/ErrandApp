import { View, Text, SafeAreaView } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { AntDesign, Entypo } from '@expo/vector-icons'
import { ScrollView } from 'react-native'
import { TextInput } from 'react-native'

const WithdrawalScreen = ({navigation}:any) => {

    const [accountNumber, setAccountNumber] = useState('')

    useLayoutEffect(() => {
        navigation.setOptions({
          headerShown: true,
          title: 'Withdrawal  Request',
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
      <ScrollView className='mx-4'>

        <View className='mt-6'>
            <Text>Provide details of how much you would like to withdraw and also select an account you would like to withdraw from. </Text>
        </View>

        <View className='mt-8'>
            <Text className='font-medium'>How much would you like to withdraw?</Text>
        </View>

        <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-5 mt-2 rounded-lg px-3 flex-row space-x-2">
          

          <TextInput
            className="w-full"
            placeholder="Enter Amount"
            placeholderTextColor='#999'
            onChangeText={(e) => setAccountNumber(e)}
            value={accountNumber}
            keyboardType="numeric"
          />
        </View>


        <View>
            <Text className='mt-6 font-semibold mb-3'>Select Withdrawal Account</Text>
        </View>

        <View className='flex-row items-center gap-2'>

        <TouchableOpacity className='bg-[#E6EDFE] w-[186px] pl-4 pr-6 pt-4 pb-4 flex-row justify-center'>

            <View>
                <Text className='text-center py-1 font-semibold'>First City Monument Bank</Text>
                <Text className='text-center py-1 font-semibold'>FCMB</Text> 
                <Text className='mt-4 text-center leading-6'>3115679989</Text>
            </View>    
       </TouchableOpacity>


        <View className='border-[#E6E6E6] rounded-xl w-[186px] pl-4 pr-6 pt-4 pb-4 flex-row justify-center'>

            <View>
                <Text className='text-center py-1 font-semibold'>Moniepoint Microfinance Bank</Text>
                <Text className='text-center py-1 font-semibold'>FCMB</Text> 
                <Text className='mt-4 text-center leading-6'>3115679989</Text>
            </View>    
        </View>

        </View>


        <TouchableOpacity className='bg-[#1E3A79] w-[210px] h-14 items-center justify-center rounded-md mx-auto mt-52'>
            <View >
                <Text className='text-white text-center font-medium'>Request Withdrawal</Text>
            </View>
            </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  )
}

export default WithdrawalScreen