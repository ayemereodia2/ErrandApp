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
import { postBid } from '../../../services/errands/placeBid'
import { RootState, useAppDispatch } from '../../../services/store'
import { MarketData, UserDetail } from '../../../types'
import { currencyMask, parseAmount } from '../../../utils/helper'
import { ProfileInitials } from '../../ProfileInitials'
interface PlaceBidModalProp {
  owner: UserDetail
  errand: MarketData
  navigation: any
}

const NegotiateBid = ({ owner, errand, navigation }: PlaceBidModalProp) => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const { loading } = useSelector((state: RootState) => state.postBidReducer)

  const handlePlaceBid = () => {
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

  return (
    <View className="py-4 pb-10">
      <View>
        <View className="items-center justify-center">
          <ProfileInitials
            firstName={owner.first_name}
            lastName={owner.last_name}
            className="w-12 h-12 bg-[#616161] rounded-full text-xl"
          />

          <View className="pt-2">
            <Text className="text-center">
              {owner?.first_name} {owner?.last_name}
            </Text>
            <View className="flex items-center space-x-2">
              <Text>{owner?.rating}</Text>
              {/* {showStars(data.rating)} */}
              <Text className="text-[#6D6D6D] text-sm">
                ({owner?.errands_completed}{' '}
                {owner.errands_completed > 1 ? 'errands' : 'errand'} Completed)
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View className="px-4 mt-4">
        <Text className="text-sm text-[#243763] font-semibold">
          Enter your bid Amount
        </Text>

        <View className="border border-[#E6E6E6] w-3/6  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
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
          Enter your bid Comment{' '}
          <Text className="text-xs font-medium">
            (Sell your skills to the poster)
          </Text>
        </Text>

        <TextInput
          className={
            'w-full border border-[#E6E6E6] text-xs py-3.5 mt-2 rounded-lg px-3'
          }
          placeholder="Describe the issue that you need help with."
          onChangeText={(e) => setComment(e)}
          value={comment}
          multiline={true}
          numberOfLines={10}
          style={{ height: 100, textAlignVertical: 'top' }}
          keyboardType="phone-pad"
        />
      </View>

      <View className="flex-row justify-center items-center">
        <TouchableOpacity
          className="bg-[#3F60AC] h-12 w-3/6 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            handlePlaceBid()
          }}
        >
          <Text className="text-white text-xs">
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              'Place Bid'
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
