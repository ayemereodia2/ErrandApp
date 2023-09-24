import { AntDesign, Entypo } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { _fetch } from '../../services/axios/http'
import { useAppDispatch } from '../../services/store'
import { Account } from '../../types'
import { getBankName } from '../../utils/helper'

const WithdrawalScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [accounts, setAccounts] = useState<Account[]>([])
  const [accountNumber, setAccountNumber] = useState('')
  const [selectAccount, setSelectedAccount] = useState('')

  const fetchAccounts = async () => {
    const rs = await _fetch({ method: 'GET', _url: '/user/bank-account' })
    const res = await rs.json()
    setAccounts(res.data)
  }
  useEffect(() => {
    fetchAccounts()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Withdrawal  Request',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
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
      <ScrollView className="mx-4">
        <View className="mt-6">
          <Text>
            Provide details of how much you would like to withdraw and also
            select an account you would like to withdraw from.{' '}
          </Text>
        </View>

        <View className="mt-8">
          <Text className="font-medium">
            How much would you like to withdraw?
          </Text>
        </View>

        <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-5 mt-2 rounded-lg px-3 flex-row space-x-2">
          <TextInput
            className="w-full"
            placeholder="Enter Amount"
            placeholderTextColor="#999"
            onChangeText={(e) => setAccountNumber(e)}
            value={accountNumber}
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="mt-6 font-semibold mb-3">
            Select Withdrawal Account
          </Text>
        </View>

        <View className="flex-row items-center gap-4">
          {accounts?.map((acc, index) => {
            return (
              <TouchableOpacity  onPress={() => {setSelectedAccount(acc.account_number)}}  className={` rounded-xl w-[170px] h-28 pl-4 pr-6 pt-4 pb-4 flex-row justify-center ${selectAccount === acc.account_number ? 'border-[#7bb6f1] border-[1px] bg-[#E6EDFE]' :'bg-white border-[#ccc] border-[1px]'} `}>
                <View className="">
                  <Text className="text-center py-1 font-semibold h-12">
                    {getBankName(acc.bank_code)}
                  </Text>
                  {/* <Image source={{ uri: getBankName(acc.bank_code) }} /> */}
                  <Text className="text-center leading-6">
                    {acc.account_number}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })}
        </View>

        <TouchableOpacity className="bg-[#1E3A79] w-[210px] h-14 items-center justify-center rounded-md mx-auto mt-52">
          <View>
            <Text className="text-white text-center font-medium">
              Request Withdrawal
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default WithdrawalScreen
