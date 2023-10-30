import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { postBid } from '../../../services/errands/placeBid'
import { RootState, useAppDispatch } from '../../../services/store'
import { MarketData, UserDetail } from '../../../types'
import { currencyMask, parseAmount } from '../../../utils/helper'
import { TouchableWithoutFeedback } from 'react-native'
import { Keyboard } from 'react-native'
import { ScrollView } from 'react-native'
interface PlaceBidModalProp {
  owner: UserDetail
  errand: MarketData
  navigation: any
}

const PlaceBidModal = ({ owner, errand, navigation }: PlaceBidModalProp) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const { loading } = useSelector((state: RootState) => state.postBidReducer)

  const handlePlaceBid = () => {
    // console.log('>>>>>comment', comment, amount)

    if (!amount) {
      return setError('Please, make sure you enter all fields for this bid')
    }
    if (!comment) {
      return setError('Please, make sure you enter all fields for this bid')
    }

    const data = {
      errand_id: errand.id,
      amount: parseAmount(amount.toString()) * 100,
      description: comment,
      source: 'runner',
      dispatch,
      Toast,
      navigation,
    }
    setError('')
    // console.log(">>>dtaa", data)
    dispatch(postBid(data))
  }

  
  const [commentFocused, setCommentFocused] = useState(false);

  const handleCommentFocus = () => {
    setCommentFocused(true);
  };

  const handleCommentBlur = () => {
    setCommentFocused(false);
  };

  return (
    <ScrollView
    style={{ flex: 1, backgroundColor: backgroundTheme }}
    contentContainerStyle={{ flexGrow: 1 }}
    keyboardShouldPersistTaps="handled"
  >
    <View
      className="py-4 pb-10 h-full"
      style={{ backgroundColor: backgroundTheme }}
    >
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <KeyboardAvoidingView
       style={{ flex: 1 }}
       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
       keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100} 
      >
        
      <Text
        className="text-lg text-center font-semibold"
        style={{ color: textTheme }}
      >
        Enter Your Bid
      </Text>

      <View className="px-4 mt-6">
        <Text
          className="text-sm text-[#243763] font-semibold"
          style={{ color: textTheme }}
        >
          Amount
        </Text>

        <View className="border border-[#E6E6E6] bg-white  text-xs rounded-lg  flex-row space-x-2 justify-center items-center">
          <Text className="text-lg pl-1 ">&#x20A6;</Text>

          <BottomSheetTextInput
            className="w-full"
            placeholder="Enter Amount"
            onChangeText={(e) => setAmount(currencyMask(e))}
            value={amount}
            keyboardType="numeric"
            style={styles.input}
            
          />
        </View>
      </View>

      <View className="px-4 mt-4">
        <Text
          className="text-sm font-semibold text-[#243763]"
          style={{ color: textTheme }}
        >
          {' '}
          Comment{' '}
        </Text>

        <View className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3">
          <BottomSheetTextInput
            className={
              'w-full border bg-[#CBD5EC] border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3'
            }
            placeholder="Describe the issue that you need help with."
            onChangeText={(e) => setComment(e)}
            value={comment}
            multiline={true}
            numberOfLines={10}
            style={{ height: 100, textAlignVertical: 'top' }}
            keyboardType="default"
            onFocus={handleCommentFocus}
            onBlur={handleCommentBlur}
          />
        </View>
      </View>

      <View className="flex-row justify-center items-center">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-4/6 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            handlePlaceBid()
          }}
        >
          <Text className="text-white text-base">
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              'Submit Your Bid'
            )}
          </Text>
        </TouchableOpacity>
      </View>
      
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    padding: 4,
    backgroundColor: '#fff',
  },
})

export default PlaceBidModal
