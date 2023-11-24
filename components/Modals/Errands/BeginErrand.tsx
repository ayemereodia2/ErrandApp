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
import { startErrand } from '../../../services/errands/beginErrand'
import { RootState, useAppDispatch } from '../../../services/store'
import { Bids, MarketData } from '../../../types'
import { useNavigation } from '@react-navigation/native'

interface BeginErrandModalProp {
  errand: MarketData
  bid: Bids
  user_id: string
  toggleSuccessDialogue: (open: boolean) => void
  toggleBeginErrandModal: (open: boolean) => void
  toggleRejectErrandModal?: (open: boolean) => void
}

const BeginErrandModal = ({
  bid,
  errand,
  user_id,
  toggleSuccessDialogue,
  toggleBeginErrandModal,
  toggleRejectErrandModal,
}: // navigation
BeginErrandModalProp) => {
  const dispatch = useAppDispatch()

  // const navigation = useNavi

  const { loading } = useSelector(
    (state: RootState) => state.startErrandReducer,
  )
const navigation = useNavigation()
  return (
    <View className="py-4 pb-10">
      <Text className="text-xl text-center font-semibold">Bid Accepted</Text>

      <Image
        width={60}
        height={60}
        source={require('../../../assets/images/business_men.png')}
        className="mx-auto"
      />

      <View className="space-y-4 items-center px-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            dispatch(
              startErrand({
                errand_id: errand.id,
                dispatch,
                toggleBeginErrandModal,
                toggleSuccessDialogue,
                Toast,
                bid_id: bid.id,
              }),
            )
          }}
        >
          <Text className="text-white text-base">
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              'Start Errand'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg border-[#e90c0c] border-[0.5px]"
          onPress={() => {
            
            // toggleBeginErrandModal && toggleBeginErrandModal(false)
            // toggleRejectErrandModal && toggleRejectErrandModal(true)
            navigation.navigate('RejectErrand', {errand, bid})
          }}
        >
          <Text className="text-base text-red-600">Reject Errand</Text>
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

export default BeginErrandModal
