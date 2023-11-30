import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useAppDispatch } from '../../services/store'
import { addAccount } from '../../services/wallet/addAccount'
import { getAccounts } from '../../services/wallet/getAccount'
import { Bank } from '../../types'
import DropdownComponent from '../Picker/DropdownComponent'

interface AddAccountProp {
  toggleAddAccountModal: (open: boolean) => void
}

const AddAccount = ({ toggleAddAccountModal }: AddAccountProp) => {
  const [comment, setComment] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [bankList, setBankList] = useState([])
  const [error, setError] = useState('')
  const [selectedBank, setSelectedBank] = useState('')
  const [accUser, setAccUser] = useState({
    account_name: '',
  })
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  const getBanks = async () => {
    const res = await fetch('https://api.paystack.co/bank', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY}`,
      },
    })

    const banks = await res.json()
    const allBanks = banks.data.map((bank: Bank) => {
      return {
        label: bank.name,
        value: bank.code,
      }
    })

    setBankList(allBanks)
  }


  const getAccountName = async () => {
    const res = await fetch(
      `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${selectedBank}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer sk_test_53131b9d8f105ec9ea2778b0b5ec1a61d69d178f',
        },
      },
    )

    if (!res.ok) return

    const accUser = await res.json()


    setAccUser(accUser.data)
    // setCanProceed(false)
  }

  useEffect(() => {
    if (
      accountNumber === null ||
      accountNumber.length !== 10 ||
      selectedBank === null
    )
      return
    setAccUser({
      account_name: 'loading',
    })
    getAccountName()
  }, [accountNumber, selectedBank])

  const addAccountHandler = () => {
    if (accountNumber?.length !== 10 || selectedBank === null) return
    setLoading(true)

    dispatch(
      addAccount({
        toggleAddAccountModal: toggleAddAccountModal,
        accNum: accountNumber,
        accName: accUser.account_name,
        bankCode: selectedBank,
        setLoading: setLoading,
      }),
    )
    dispatch(getAccounts())
  }

  useEffect(() => {
    getBanks()
  }, [])

  return (
    <View className="py-4 pb-10">
      <Text className="text-lg text-center font-semibold">
        Add Bank Account
      </Text>

      <View className="px-4 mt-6">
        <Text className="text-sm text-black font-semibold">Account Number</Text>

        <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-4 mt-2 rounded-lg px-3 flex-row space-x-2">
          <BottomSheetTextInput
            className="w-full"
            placeholder="Enter your Account Number"
            placeholderTextColor="#999"
            onChangeText={(e) => setAccountNumber(e)}
            value={accountNumber}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View className="px-4 mt-4">
        <Text className="text-sm font-semibold text-black"> Select Bank </Text>

        <DropdownComponent
          data={bankList}
          value={selectedBank}
          setValue={setSelectedBank}
          placeHolder="Select a Bank"
        />
      </View>

      {accUser?.account_name ? (
        <View className="px-4 mt-4">
          <Text className="text-sm font-semibold text-black">
            {' '}
            Account Name{' '}
          </Text>
          <Text className="pl-1 text-sm font-semibold text-black">
            {accUser.account_name}{' '}
          </Text>
        </View>
      ) : (
        ''
      )}

      <View className="flex-row justify-center items-center">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-4/6 mt-10 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            addAccountHandler()
          }}
        >
          <Text className="text-white">
            {loading ? (
              <ActivityIndicator size="small" color="blue" />
            ) : (
              'Add Account'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'white',
  },
})

export default AddAccount
