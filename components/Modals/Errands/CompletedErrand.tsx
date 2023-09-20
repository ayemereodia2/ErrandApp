import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { errandAction } from '../../../services/errands/errandAction'
import { RootState, useAppDispatch } from '../../../services/store'
import { MarketData, SingleSubErrand } from '../../../types'

interface Prop {
  errand: MarketData
  user_id: string
  toggleSuccessDialogue: (open: boolean) => void
  navigation?: any
  singleSubErrand: SingleSubErrand
  toggleCompleteDialogue: any
}

const CompleteErrand = ({
  errand,
  user_id,
  toggleSuccessDialogue,
  singleSubErrand,
  toggleCompleteDialogue,
}: Prop) => {
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')

  const { loading } = useSelector((state: RootState) => state.bidActionReducer)

  return (
    <View className="py-4 pb-10">
      <Text className="text-xl text-center font-semibold mt-2">Accept Bid</Text>

      <Text className="text-sm font-light text-[#4D4D4D] text-center px-8 mt-4">
        Confirm that this errand has been completed successfully
      </Text>

      <View className="space-y-4 items-center px-4 mt-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-14 w-[300px] mt-6 flex-row justify-center items-center rounded-md"
          onPress={() => {
            dispatch(
              errandAction({
                sub_errand_id: singleSubErrand.id,
                type: 'complete',
                method: 'PATCH',
                source: user_id === errand.user_id ? 'sender' : 'runner',
                errandId: errand.id,
                dispatch,
                toggleCompleteDialogue,
                toggleSuccessDialogue,
              }),
            )
          }}
        >
          <Text className="text-white text-base">
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              'Yes, Pay Runner'
            )}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            toggleCompleteDialogue(false)
          }}
        >
          <Text className="text-base text-red-600">No, it's not completed yet</Text>
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

export default CompleteErrand
