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
import DropdownComponent from '../Picker/DropdownComponent'


const AddAccount = () => {
  const [comment, setComment] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [error, setError] = useState('')


  const handlePlaceBid = () => {
    // console.log('>>>>>comment', comment, amount)

    if (!accountNumber) {
      return setError('Please, make sure you enter all fields for this bid')
    }
    if (!comment) {
      return setError('Please, make sure you enter all fields for this bid')
    }

    
    setError('')
    // console.log(">>>dtaa", data)
   
  }

  return (
    <View className="py-4 pb-10">
   

      <Text className="text-lg text-center font-semibold">Add Bank Account</Text>

      <View className="px-4 mt-6">
        <Text className="text-sm text-black font-semibold">Account Number</Text>

        <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-5 mt-2 rounded-lg px-3 flex-row space-x-2">
          

          <BottomSheetTextInput
            className="w-full"
            placeholder="Enter your Account Number"
            placeholderTextColor='#999'
            onChangeText={(e) => setAccountNumber(e)}
            value={accountNumber}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View className="px-4 mt-4">
        <Text className="text-sm font-semibold text-black"> Select Bank </Text>

      
            <DropdownComponent placeHolder='Select a Bank' />
        
      </View>

      <View className="flex-row justify-center items-center">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-4/6 mt-10 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            handlePlaceBid()
          }}
        >
         <Text className='text-white'>Add Bank Account</Text>
         
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

export default AddAccount
