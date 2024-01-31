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
import { _fetch } from '../../services/axios/http'



const EmailModal = ({closeEmailModal}:any) => {

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)


  const updateEmail = async (emailData: any) => {
    setLoading(true)
    try {
      const _rs = await _fetch({
        method: 'PUT',
        _url: `/user/profile`,
        body: emailData,
      })

      // Check if the response status code indicates an error
      if (!_rs.ok) {
        const errorResponse = await _rs.json()
        throw new Error(`Server error: ${errorResponse.message}`)
      }

      setLoading(false)
  
      const responseData = await _rs.json()

      return responseData
    } catch (error) {
      throw error
    }
  }

  const handleUpdateProfile = async () => {
    const updatedData = {
     
      email: email,
     
    }

    try {
      const responseData = await updateEmail(updatedData)

      // Checking if the response indicates success
      if (responseData.success) {
        // Handling a successful response from the server here

        // Show a success message to the user.
        Toast.show({
          type: 'success',
          text1: 'An email verification will be sent to you shortly',
        })

        

        closeEmailModal()
      } else {
        // Handle the case where the server responded with an error message

        Toast.show({
          type: 'error',
          text1: 'Profile update failed:' + responseData.message,
        })
      }
    } catch (error) {
      // Handle errors here, such as network errors or server-side errors

      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }


  return (
    <View className="py-4">
     

      <View className="px-4 mt-6">
        <Text className="text-base text-[#6D6D6D] font-semibold" style={{fontFamily: 'Axiforma'}}>Kindly enter your email for verification</Text>

      </View>

      <View className="px-4 mt-5">
        <Text className="text-base font-semibold text-[#393F42]" style={{fontFamily: 'Axiforma'}}> Email Address</Text>

        <View className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-2 mt-2 rounded-lg px-3">
          <BottomSheetTextInput
            className={
              'w-full border  border-[#96A0A5]  text-sm py-2 mt-2 rounded-lg px-3'
            }
            placeholder="Enter Your Email Address.."
            placeholderTextColor={'#6D6D6D'}
            onChangeText={(e) => setEmail(e)}
            value={email}
            multiline={true}
            numberOfLines={2}
            style={{ height: 45, textAlignVertical: 'top' }}
            keyboardType="default"
          />
        </View>
      </View>

      <View className="flex-row justify-around items-center mt-4">
        <TouchableOpacity className="bg-white h-12 w-[40%] mt-6 flex-row justify-center items-center rounded-lg border border-red-600" onPress={closeEmailModal}>

            <Text className='text-red-600'>Close</Text>

        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-[40%] mt-6 flex-row justify-center items-center rounded-lg"   onPress={()=> handleUpdateProfile()}>
          <Text className="text-white text-base">
            {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              'Submit'
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

export default EmailModal
