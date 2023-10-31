import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../services/store'
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
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: backgroundTheme }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      className="py-4 pb-10"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
      >
        <Text className="text-base text-center font-light">
          Set A New Errand Amount
        </Text>
        <View className="px-4 mt-4">
          <Text className="text-sm text-[#243763] font-light">Amount</Text>

          <View className="border border-[#E6E6E6] bg-white  text-xs rounded-lg  flex-row space-x-2 justify-center items-center">
            <Text className="text-lg pl-1 ">&#x20A6;</Text>

            <TextInput
              className="w-full"
              placeholder="Enter amount"
              onChangeText={(e) => setAmount(currencyMask(e))}
              value={amount}
              keyboardType="decimal-pad"
              style={styles.input}
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
      </KeyboardAvoidingView>
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

export default AdjustAmountModal
