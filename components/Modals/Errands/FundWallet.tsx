import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
// import { Paystack, paystackProps } from 'react-native-paystack-webview'
// import PaystackWebView from 'react-native-paystack-webview'
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Modal from 'react-native-modal'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../services/store'
import { walletAction } from '../../../services/wallet/walletBalance'
import { PayStackRef } from '../../../types'
import { currencyMask, parseAmount } from '../../../utils/helper'
import Paystack from '../../Paystack'

interface FundWalletProp {
  toggleFundWalletModal: (open: boolean) => void
}

const FundWalletModal = ({ navigation, route }: any) => {
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)
  const [paid, setPaid] = useState(false)
  const [fundWalletLoader, setFundWalletLoader] = useState(false)
  const [walletFundedSuccess, setWalletFundedSuccess] = useState(false)
  const [userId, setUserId] = useState('')

  const { currentWalletAmount, setCurrentWalletAmount } = route.params

  const paystackWebViewRef = useRef<PayStackRef>()
  const { loading } = useSelector((state: RootState) => state.postBidReducer)
  const {
    data,
    loading: walletBalanceLoading,
    success: walletSuccess,
  } = useSelector((state: RootState) => state.walletActionReducer)


  // const handlePlaceBid = () => {
  //   if (!amount) {
  //     return setError('Please, make sure you enter all fields for this bid')
  //   }

  //   console.log('>>>>>comment', amount)

  //   // setPay(true)

  //   const data = {
  //     amount: parseAmount(amount.toString()) * 100,
  //     dispatch,
  //     Toast,
  //   }

  //   // console.log(pay)

  //   setError('')
  //   // console.log(">>>dtaa", data)
  //   // dispatch(postBid(data))
  // }

  // console.log('>>>>>walletSuccs', walletSuccess)

  const getUserId = async () => {
    const userId = (await AsyncStorage.getItem('user_id')) || ''
    setUserId(userId)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Fund Your Wallet',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 py-3"
          onPress={() => {
            navigation.goBack()
          }}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
    })
  }, [])

  console.log(
    '>>>>>>>walletSuccess',
    walletSuccess,
    Number(data?.balance) / 100,
    currentWalletAmount,
  )

  useEffect(() => {
    if (walletSuccess && Number(data?.balance) / 100 > currentWalletAmount) {
      setFundWalletLoader(false)
      navigation.goBack()
      Toast.show({
        text1: 'Your Wallet was funded successfully',
        type: 'success',
      })
    }
  }, [walletSuccess, data?.balance])

  useEffect(() => {
    getUserId()
  }, [])

  return (
    <>
      {paid ? (
        <View className="py-4 pb-10">
          <Text className="text-lg text-center font-semibold">
            We are Processing your payment
          </Text>

          <View className="flex-row justify-center items-center">
            <TouchableOpacity
              className="bg-[#1E3A79] h-12 w-4/6 mt-6 flex-row justify-center items-center rounded-lg"
              // onPress={() => {
              //   handlePlaceBid()

              // }}
              onPress={() => navigation.goBack()}
            >
              <Text className="text-white text-base">Go back</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="py-4 pb-10">
          {/* <Text className="text-lg text-center font-semibold">
            Fund Your Wallet
          </Text> */}

          {error && (
            <Text className="text-red-500 text-sm text-center">{error}</Text>
          )}

          <View className="mt-6 pl-12">
            <Text className="text-sm text-[#243763] font-semibold">
              Enter Amount
            </Text>

            <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2 w-72">
              <Text className="text-lg ">&#x20A6;</Text>

              <TextInput
                className="w-full"
                placeholder="Enter amount"
                onChangeText={(e) => {
                  if (Number(e) < 500) {
                    setIsError(true)
                    setError(
                      'The minimum amount for funding your wallet is ₦500',
                    )
                  } else {
                    setIsError(false)
                    setError('')
                  }
                  setAmount(currencyMask(e))
                }}
                value={amount}
                keyboardType="decimal-pad"
              />
            </View>
          </View>

          <View className="flex-row justify-center items-center">
            <TouchableOpacity
              disabled={isError || !amount}
              className="bg-[#1E3A79] h-12 w-4/6 mt-6 flex-row justify-center items-center rounded-lg"
              // onPress={() => {
              //   handlePlaceBid()

              // }}
              onPress={() => {
                paystackWebViewRef.current.startTransaction()
              }}
            >
              <Text className="text-white text-base">
                {loading ? (
                  <ActivityIndicator size="small" color="#000000" />
                ) : (
                  'Fund Wallet'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* {pay && ( */}
      <View style={{ flex: 1 }}>
        <Paystack
          paystackKey="pk_test_0ea2496d44ff8e00a98762e85ab92a1639d7307e"
          billingEmail={'pearlthelma299@gmail.com'}
          phone={'090644788883'}
          amount={parseAmount(amount.toString())}
          userId={userId}
          onCancel={(e: any) => {
            navigation.goBack()
          }}
          onSuccess={(res: any) => {
            // navigation.navigate('Wallet')
            setFundWalletLoader(true)
            let minutesPassed = 0
            const maxMinutes = 3
            const intervalId = setInterval(() => {
              minutesPassed++
              dispatch(walletAction({ request: 'wallet' }))

              if (minutesPassed >= maxMinutes) {
                clearInterval(intervalId)
              }
            }, 30 * 1000)
          }}
          ref={paystackWebViewRef}
        />
      </View>

      <Modal
        onBackdropPress={() => {
          setFundWalletLoader(false)
        }}
        isVisible={fundWalletLoader}
      >
        <View
          className="flex-row justify-center items-center"
          style={{
            backgroundColor: 'white',
            height: 200,
            borderRadius: 10,
          }}
        >
          <View>
            <Text className="text-xl font-light">
              Request is processing... please wait
            </Text>
            <ActivityIndicator size="small" className="mt-3" color="blue" />
          </View>
        </View>
      </Modal>
      {/* )} */}
    </>
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

export default FundWalletModal
