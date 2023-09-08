import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { bidAction } from '../../../services/bids/bidsAction'
import { RootState, useAppDispatch } from '../../../services/store'
import { Bids, MarketData, UserDetail } from '../../../types'
import { currencyMask, parseAmount } from '../../../utils/helper'

interface NegotiateModalProp {
  owner: UserDetail
  errand: MarketData
  navigation: any
  bid: Bids
  user_id: string
  toggleNegotiateModal: (open: boolean) => void
  toggleSuccessDialogue: (open: boolean) => void
}

const NegotiateBid = ({
  owner,
  bid,
  errand,
  navigation,
  user_id,
  toggleNegotiateModal,
  toggleSuccessDialogue,
}: NegotiateModalProp) => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const { loading } = useSelector((state: RootState) => state.bidActionReducer)

  const negotiateBid = () => {
    console.log("<<<<<<hello");
    
    if (!amount) {
      return setError('Please, make sure you enter all fields for this bid')
    }
    if (!comment) {
      return setError('Please, make sure you enter all fields for this bid')
    }

    dispatch(
      bidAction({
        method: 'PUT',
        errand_id: errand.id,
        description: comment,
        source: errand.user_id === user_id ? 'sender' : 'runner',
        amount: parseAmount(amount.toString()) * 100,
        bid_id: bid.id,
        dispatch,
        toggleNegotiateModal,
        toggleSuccessDialogue,
        Toast,
      }),
    )
  }

  return (
    <View className="py-4 pb-10">
      <Text className="text-xl text-center font-semibold">Negotiate Bid</Text>
      <View className="px-4 mt-4">
        <Text className="text-sm text-[#243763] font-semibold">Amount</Text>

        <View className="border border-[#E6E6E6] bg-[#CBD5EC]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
          <Text className="text-lg ">&#x20A6;</Text>

          <TextInput
            className="w-full"
            placeholder="Enter amount"
            onChangeText={(e) => setAmount(currencyMask(e))}
            value={amount}
            keyboardType="decimal-pad"
          />
        </View>
      </View>

      <View className="px-4 mt-4">
        <Text className="text-sm font-semibold text-[#243763]">
          {' '}
          Enter Comment{' '}
        </Text>

        <TextInput
          className={
            'w-full border bg-[#CBD5EC] border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3'
          }
          placeholder="Enter your bids comment"
          onChangeText={(e) => setComment(e)}
          value={comment}
          multiline={true}
          numberOfLines={10}
          style={{ height: 100, textAlignVertical: 'top' }}
          keyboardType="phone-pad"
        />
      </View>

      <View className="flex-row justify-center items-center px-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            negotiateBid()
          }}
        >
          <Text className="text-white text-base">
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              'Negotiate'
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

export default NegotiateBid
