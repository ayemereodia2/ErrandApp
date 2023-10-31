import React, { useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { bidAction } from '../../../services/bids/bidsAction'
import { RootState, useAppDispatch } from '../../../services/store'
import { Bids, Haggles, MarketData } from '../../../types'
import { currencyMask, parseAmount } from '../../../utils/helper'

interface NegotiateModalProp {
  // owner: UserDetail
  errand: MarketData
  navigation: any
  bid: Bids
  user_id: string
  toggleNegotiateModal: (open: boolean) => void
  toggleSuccessDialogue: (open: boolean) => void
  haggle: Haggles
}

const NegotiateBid = ({
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

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const negotiateBid = () => {
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
    <ScrollView
      style={{ flex: 1, backgroundColor: backgroundTheme }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View className="py-4 pb-10">
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
        >
          <Text className="text-xl text-center font-semibold">
            Negotiate Bid
          </Text>

          {/* <View className="px-4 mt-4">
            <Text className="text-sm text-[#243763] font-semibold">Amount</Text>

            <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
              <Text className="text-lg ">&#x20A6;</Text>

              <TextInput
                className="w-full"
                placeholder="Enter amount"
                onChangeText={(e) => setAmount(currencyMask(e))}
                value={amount}
                keyboardType="decimal-pad"
              />
            </View>
          </View> */}
          <View className="px-4 mt-6">
            <Text
              className="text-sm text-[#243763] font-semibold"
              style={{ color: textTheme }}
            >
              Amount
            </Text>

            <View className="bg-white text-xs rounded-lg  flex-row space-x-2 justify-center items-center">
              <Text className="text-lg pl-1 ">&#x20A6;</Text>

              <TextInput
                className="w-full border-none"
                placeholder="Enter Amount"
                onChangeText={(e) => setAmount(currencyMask(e))}
                value={amount}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>
          </View>

          {/* <View className="px-4 mt-4">
            <Text className="text-sm font-semibold text-[#243763]">
              {' '}
              Enter Comment{' '}
            </Text>

            <View className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3">
              <TextInput
                className={
                  'w-full border bg-w border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3'
                }
                placeholder="Enter your bids comment"
                onChangeText={(e) => setComment(e)}
                value={comment}
                multiline={true}
                numberOfLines={10}
                style={{ height: 100, textAlignVertical: 'top' }}
                keyboardType="default"
              />
            </View>
          </View> */}
          <View className="px-4 mt-4">
            <Text
              className="text-sm font-semibold text-[#243763]"
              style={{ color: textTheme }}
            >
              {' '}
              Comment{' '}
            </Text>

            <View className="w-full bg-white border-[#E6E6E6] text-sm py-1 mt-2 rounded-lg px-3">
              <TextInput
                className={'w-full bg-white text-sm mt-2 rounded-lg px-3'}
                placeholder="Describe the issue that you need help with."
                onChangeText={(e) => setComment(e)}
                value={comment}
                multiline={true}
                numberOfLines={10}
                style={{ textAlignVertical: 'top' }}
                keyboardType="default"
                // onFocus={handleCommentFocus}
                // onBlur={handleCommentBlur}
              />
            </View>
          </View>

          <View className="flex-row justify-center items-center px-4">
            <TouchableOpacity
              className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
              onPress={() => {
                negotiateBid()
              }}
            >
              {loading ? (
                <Text>Loading</Text>
              ) : (
                <Text className="text-white text-base">Negotiate</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
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

  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 20,
    width: 300,
    // padding: 4,
    backgroundColor: '#fff',
  },
})

export default NegotiateBid
