import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React, { useState } from 'react'
import {
  ActivityIndicator,
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

  return (
    <View className="py-4 pb-10" style={{backgroundColor: backgroundTheme}}>
      {/* <View>
        <View className="items-center justify-center">
          <ProfileInitials
            firstName={owner.first_name}
            lastName={owner.last_name}
            className="w-12 h-12 bg-[#616161] rounded-full text-xl"
            textClass="text-white text-lg"
          />

          <View className="pt-2">
            <View className="flex-row space-x-2 items-center justify-center">
              <Text className="text-center text-base font-semibold">
                {owner?.first_name} {owner?.last_name}
              </Text>
              <MaterialIcons name="verified" color="green" size={20} />
            </View>
            <Text className="text-[#555555] text-center py-2 text-base font-semibold">
              Swave User
            </Text>
            <View className="flex-row items-center">
              <Text>
                {owner?.rating} <Entypo name="star" size={16} color="#FBB955" />{' '}
              </Text>
              <Text className="text-[#6D6D6D] text-sm">
                ( {owner?.errands_completed}{' '}
                {owner.errands_completed > 1 ? 'errands' : 'errand'} Completed)
              </Text>
            </View>
          </View>
        </View>
      </View> */}

      <Text className="text-lg text-center font-semibold" style={{color: textTheme}}>Enter Your Bid</Text>

      <View className="px-4 mt-6">
        <Text className="text-sm text-[#243763] font-semibold" style={{color: textTheme}}>Amount</Text>

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
      </View>

      <View className="px-4 mt-4">
        <Text className="text-sm font-semibold text-[#243763]" style={{color: textTheme}}> Comment </Text>

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

export default PlaceBidModal
