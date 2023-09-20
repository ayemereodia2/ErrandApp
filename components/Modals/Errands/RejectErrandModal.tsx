import React from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { bidAction } from '../../../services/bids/bidsAction'
import { RootState, useAppDispatch } from '../../../services/store'
import { Bids, Haggles, MarketData } from '../../../types'

interface RejectErrandModalProp {
  errand: MarketData
  bid: Bids
  user_id: string
  toggleSuccessDialogue: (open: boolean) => void
  toggleRejectErrandModal: (open: boolean) => void
  navigation: any
  haggle: Haggles
}

const RejectErrandModal = ({
  bid,
  errand,
  user_id,
  toggleSuccessDialogue,
  toggleRejectErrandModal,
  haggle,
}: // navigation
RejectErrandModalProp) => {
  const dispatch = useAppDispatch()

  // const navigation = useNavi

  const { loading } = useSelector(
    (state: RootState) => state.bidActionReducer,
  )

  return (
    <View className="py-4 pb-10">
      <Text className="text-xl text-center font-semibold">Reject Errand</Text>

      {/* <Image
        width={60}
        height={60}
        source={require('../../../assets/images/business_men.png')}
        className="mx-auto"
      /> */}

      <Text>Are you sure you want to Reject this Errand?</Text>

      <View className="space-y-4 items-center px-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            dispatch(
              bidAction({
                errand_id: errand.id,
                bid_id: bid.id,
                response: 'reject',
                runner_id: bid.runner.id,
                amount: haggle.amount,
                method: 'PUT',
                type: 'respond',
                toggleSuccessDialogue,
                dispatch,
                toggleRejectErrandModal,
                Toast,
              }),
            )
          }}
        >
          <Text className="text-white text-base">
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              'Yes, Reject Errand'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg border-[#e90c0c] border-[0.5px]"
          onPress={() => {}}
        >
          <Text className="text-base text-red-600">No, I change my mind</Text>
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

export default RejectErrandModal
