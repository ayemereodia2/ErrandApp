import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { _fetch } from '../../services/axios/http'
import { useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { Account } from '../../types'
import { currencyMask, getBankName, parseAmount } from '../../utils/helper'

interface WithdrawalProps {
  toggleWithdrawaltModal: (open: boolean) => void
}

const WithdrawalScreen = ({ toggleWithdrawaltModal }: WithdrawalProps) => {
  const dispatch = useAppDispatch()
  const [accLoading, setAccLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const [accounts, setAccounts] = useState<Account[]>([])
  const [accountNumber, setAccountNumber] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amount, setAmount] = useState('')

  const fetchAccounts = async () => {
    setAccLoading(true)
    const rs = await _fetch({ method: 'GET', _url: '/user/bank-account' })
    const res = await rs.json()
    setAccounts(res.data)
    setAccLoading(false)
  }
  useEffect(() => {
    fetchAccounts()
  }, [])

  const makeWithdrawalHandler = async () => {
    if (amount === '' || selectedAccount === '') return

    console.log('>>>>>>amount', amount, selectedAccount)

    setLoading(true)
    try {
      await _fetch({
        method: 'POST',
        _url: '/user/withdrawal-request',
        body: {
          amount: parseAmount(amount.toString()) * 100,
          bank_account_id: selectedAccount,
        },
      })

      Toast.show({
        type: 'success',
        text1: 'Withdrawal request made successfully',
      })

      toggleWithdrawaltModal(false)
      dispatch(walletAction({ request: 'wallet' }))
      setAmount('')
    } catch (err) {
      if (err instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: 'Sorry, something went wrong',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScrollView className="mx-4">
      <Text>Make Withdrawal</Text>

      <View className="mt-8">
        <Text className="font-medium">
          How much would you like to withdraw?
        </Text>
      </View>

      <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
        <Text className="text-lg ">&#x20A6;</Text>

        <BottomSheetTextInput
          className="w-full"
          placeholder="Enter amount"
          onChangeText={(e) => setAmount(currencyMask(e))}
          value={amount}
          keyboardType="decimal-pad"
        />
      </View>

      <View>
        <Text className="mt-6 font-semibold mb-3">
          Select Withdrawal Account
        </Text>
      </View>

      {accLoading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (
        <>
          <View className=" gap-4 pl-4 pt-2">
            {accounts?.map((acc, index) => {
              return (
                <RadioButton.Group
                  key={index}
                  onValueChange={setSelectedAccount}
                  value={selectedAccount}
                >
                  <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={() => setSelectedAccount(acc.id)}
                  >
                    <RadioButton value={acc.id} />
                    <Text className="text-center py-1 font-semibold pr-2">
                      {getBankName(acc.bank_code)}
                    </Text>
                    <Text className="text-center leading-6">
                      {acc.account_number}
                    </Text>
                  </TouchableOpacity>
                </RadioButton.Group>
              )
            })}
          </View>
          <TouchableOpacity
            onPress={() => makeWithdrawalHandler()}
            className="bg-[#1E3A79] w-[210px] h-14 items-center justify-center rounded-md mx-auto mt-4"
          >
            <Text className="text-white text-center font-medium">
              {loading ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                'Request Withdrawal'
              )}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
})
export default WithdrawalScreen
