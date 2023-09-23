import React, { useRef, useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Paystack, paystackProps } from 'react-native-paystack-webview'
// import PaystackWebView from 'react-native-paystack-webview'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../../services/store'
import { currencyMask, parseAmount } from '../../../utils/helper'
interface FundWalletProp {
  toggleFundWalletModal: (open: boolean) => void
}

const FundWalletModal = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [isError, setIsError] = useState(false)
  const [paid, setPaid] = useState(false)

  const paystackWebViewRef = useRef<paystackProps.PayStackRef>()

  const { loading } = useSelector((state: RootState) => state.postBidReducer)

  const handlePlaceBid = () => {
    if (!amount) {
      return setError('Please, make sure you enter all fields for this bid')
    }

    console.log('>>>>>comment', amount)

    // setPay(true)

    const data = {
      amount: parseAmount(amount.toString()) * 100,
      dispatch,
      Toast,
    }

    // console.log(pay)

    setError('')
    // console.log(">>>dtaa", data)
    // dispatch(postBid(data))
  }

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
              <Text className="text-white text-base">
               Go back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="py-4 pb-10">
          <Text className="text-lg text-center font-semibold">
            Fund Your Wallet
          </Text>

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
              onPress={() => paystackWebViewRef.current.startTransaction()}
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
          billingEmail="paystackwebview@something.com"
          amount={parseAmount(amount.toString())}
          onCancel={(e: any) => {
            // handle response here
            navigation.goBack()
          }}
          onSuccess={(res: any) => {
            setPaid(true)
          }}
          ref={paystackWebViewRef}
        />

        {/* <TouchableOpacity
            onPress={() => paystackWebViewRef.current.startTransaction()}
          >
            <Text>Pay Now</Text>
          </TouchableOpacity> */}
      </View>
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
