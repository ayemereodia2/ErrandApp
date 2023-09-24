import React from 'react'
import {
  ActivityIndicator,
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

interface RejectModalProp {
  errand: MarketData
  bid: Bids
  user_id: string
  toggleRejectModal: (open: boolean) => void
  toggleSuccessDialogue: (open: boolean) => void
  haggle: Haggles
}

const RejectBid = ({
  bid,
  errand,
  user_id,
  toggleRejectModal,
  toggleSuccessDialogue,
  haggle,
}: RejectModalProp) => {
  const dispatch = useAppDispatch()

  const { loading } = useSelector((state: RootState) => state.bidActionReducer)

  return (
    <View className="py-4 pb-10">
      <Text className="text-xl text-center font-semibold mt-2">Reject Bid</Text>

      <Text className="text-sm font-light text-[#4D4D4D] text-center px-8 mt-4">
        Are you sure you want to Reject this bid?
      </Text>

      <View className="space-y-4 items-center px-4 mt-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-14 w-[300px] mt-6 flex-row justify-center items-center rounded-md"
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
                toggleRejectModal,
                dispatch,
                Toast,
              }),
            )
          }}
        >
          <Text className="text-white text-base">
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              'Yes, Reject this Bid'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            toggleRejectModal(false)
          }}
        >
          <Text className="text-base text-red-600">
            No, Let me think about it.
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

export default RejectBid