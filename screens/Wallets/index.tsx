<<<<<<< Updated upstream
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { ProfileInitials } from '../../components/ProfileInitials'
import { Entypo, EvilIcons, FontAwesome, MaterialIcons } from '@expo/vector-icons'
import TransactionDetails from '../../components/Transactions/TransactionDetails'
import EscrowDetails from '../../components/Transactions/EscrowDetails'
=======
import React, { useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Balance from '../../components/Balance'
import Transactions from '../../components/Transactions'
>>>>>>> Stashed changes

const WalletScreen = ({navigation}:any) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Wallet',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <EvilIcons name="navicon" size={24} color="black" />
        </View>
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
    
    <SafeAreaView className='mt-5 mx-4 bg-[#F8F9FC]'>
      <ScrollView className='bg-[#F8F9FC]' showsVerticalScrollIndicator={false}>
      <View className='flex-row items-center justify-between bg-[#F8F9FC] mx-3 mt-2'>
        <Text className='font-medium text-xl leading-[29px]'>Overview</Text>

        <TouchableOpacity className='bg-[#3F60AC] w-[131px] items-center p-3 rounded-md' onPress={()=> navigation.navigate('WalletAccount')}>
          <Text className='text-white'>Quick Links</Text>
        </TouchableOpacity>
      </View>

          {/* Account Balance */}
      <View className='w-[380px] bg-[#FFF] border mt-3 border-[#DAE1F1] rounded-3xl p-6'>
        <View className='bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center'>
          <Text><FontAwesome name="bank" size={24} color="#C85604" /></Text>
        </View>

        <Text className='mt-6 text-[#888] text-base font-medium leading-[24px]'>Account Balance</Text>
        <Text className='font-bold text-[32px] mt-2'>₦9,300,000.00</Text>

        <TouchableOpacity className='w-[230px] h-[44px] mt-5 items-center justify-center border border-[#314B87]'>
          <Text className='text-center text-base'> +  <Text>Fund Wallet</Text></Text> 
        </TouchableOpacity>

      </View>

      {/* Escrow Balance */}

      <View className='w-[380px] bg-[#3F60AC] border mt-4 border-[#DAE1F1] rounded-3xl p-6'>

      <View className='bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center'>
          <Text><FontAwesome name="bank" size={24} color="#C85604" /></Text>
        </View>

        <Text className='mt-6 text-[#fff] text-base font-medium leading-[24px]'>Escrow Account</Text>
        <Text className='font-bold text-[32px] text-white mt-2'>₦90,000.00</Text>

      </View>

      {/* Incoming Funds */}

      <View className='w-[380px] bg-[#1A1A1A] border mt-4 border-[#DAE1F1] rounded-3xl p-6'>

          <View className='bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center'>
              <Text><FontAwesome name="bank" size={24} color="#C85604" /></Text>
            </View>

            <Text className='mt-6 text-[#fff] text-base font-medium leading-[24px]'>Escrow Account</Text>
            <Text className='font-bold text-white text-[32px] mt-2'>₦70,000.00</Text>

          </View>

          {/* Transction */}
        <View className='mt-[64px] mb-8 flex-row justify-between items-center'>
          <Text className='text-xl font-medium'>Transactions</Text>

          <TouchableOpacity className='bg-[#3F60AC] w-[65px] h-[28px] items-center justify-center rounded-md' onPress={()=> navigation.navigate('TransactionScreen')}>
            <Text className='text-white'>View All</Text>
          </TouchableOpacity>
        </View>

        {/*Transctions info */}
        <TransactionDetails />


         {/* Escrow */}
         <View className='mt-[64px] mb-8 flex-row justify-between items-center'>
          <Text className='text-xl font-medium'>Escrow Breakdown</Text>

          <TouchableOpacity className='bg-[#3F60AC] w-[65px] h-[28px] items-center justify-center rounded-md' onPress={()=> navigation.navigate('EscrowScreen')}>
            <Text className='text-white'>View All</Text>
          </TouchableOpacity>
        </View>

        {/*Escrow info */}
        <EscrowDetails />

        </ScrollView>
    </SafeAreaView>
   
  )
}

export default WalletScreen