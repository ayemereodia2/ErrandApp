import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { currencyMask } from '../../../utils/helper'

interface ProposalModalProp {
  toggleAmountAdjustment: (open: boolean) => void
  amount: string
  setAmount: React.Dispatch<React.SetStateAction<string>>
  sendProposal: () => void
}

const AdjustAmountModal = ({
  amount,
  setAmount,
  toggleAmountAdjustment,
  sendProposal,
}: ProposalModalProp) => {
  return (
    <View className="py-4 pb-10">
      <Text className="text-base text-center font-light">
        Set A New Errand Amount
      </Text>
      <View className="px-4 mt-4">
        <Text className="text-sm text-[#243763] font-light">Amount</Text>

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

      <View className="flex-row justify-center items-center px-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            sendProposal()
          }}
        >
          <Text className="text-white text-base">Submit</Text>
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

export default AdjustAmountModal
