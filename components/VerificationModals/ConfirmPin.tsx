import React, { useState } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { RootState } from '../../services/store'
import Colors from '../../utils/colors'
import { setHeight, setWidth } from '../../utils/Display'
import Fonts from '../../utils/fonts'

interface PinModalProps {
  closeConfirmPinModal: () => void
  openPinModal: () => void
}

const ConfirmPinModal = ({openPinModal, closeConfirmPinModal }: PinModalProps) => {
  const [otp, setOtp] = useState('')
  const [loader, setLoader] = useState(false)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
    loading,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const textInputStyle = theme ? 'white' : '#0c1730'

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.DEFAULT_WHITE,
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: Fonts.POPPINS_MEDIUM,
      lineHeight: 20 * 1.4,
      width: setWidth(80),
      textAlign: 'center',
    },
    title: {
      fontSize: 20,
      lineHeight: 20 * 1.4,
      marginTop: 50,
      marginBottom: 10,
      marginHorizontal: 20,
    },
    content: {
      fontSize: 20,
      marginTop: 10,
      marginBottom: 20,
      marginHorizontal: 20,
      textAlign: 'center',
    },
    phoneNumberText: {
      fontSize: 18,
      lineHeight: 18 * 1.4,
      color: Colors.DEFAULT_YELLOW,
    },
    otpContainer: {
      marginHorizontal: 20,
      marginBottom: 20,
      justifyContent: 'space-evenly',
      alignItems: 'center',
      flexDirection: 'row',
    },
    otpBox: {
      borderRadius: 5,
      borderColor: '#cccccc',
      borderWidth: 0.6,
      width: 50,
    },
    otpText: {
      fontSize: 25,
      color: textInputStyle,
      padding: 0,
      textAlign: 'center',
      paddingHorizontal: 18,
      paddingVertical: 10,
    },
    signinButton: {
      backgroundColor: theme ? 'white' : '#1E3A79',
      borderRadius: 8,
      margintop: 30,
      height: setHeight(6),
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 80,
      marginHorizontal: 20,
      // paddingBottom:40
    },
    signinButtonText: {
      fontSize: 18,
      lineHeight: 18 * 1.4,
      color: theme ? 'black' : 'white',
    },
  })

  const saveTransactionPin = async () => {
    if (otp.length < 4) {
      Toast.show({
        text1: 'Please make sure your pin is 4 digits',
        type: 'error',
      })
      return
    }
    setLoader(true)

    const _rs = await _fetch({
      _url: `/user/security/verify-pin`,
      method: 'POST',
      body: { transaction_pin: otp },
    })

    const rs = await _rs.json()
    if (rs.success === false) {
      Toast.show({
        type: 'error',
        text1: rs.message,
      })
      setLoader(false)
    }

    if (rs.success === true) {
      Toast.show({
        type: 'success',
        text1: 'Pin was confirmed successfully',
      })
      setLoader(false)

      openPinModal()
      closeConfirmPinModal()

      return
    }
  }

  return (
    // <ScrollView
    //   style={{ flex: 1, backgroundColor: backgroundTheme }}
    //   contentContainerStyle={{ flexGrow: 1 }}
    //   keyboardShouldPersistTaps="handled"
    // >
    <View className="">
      <Text
        style={{ color: theme ? 'white' : 'black' }}
        className="text-center mt-6 pb-2 text-lg font-semibold"
      >
        Confirm Your Pin
      </Text>

      <View className="bg-white mx-4 border-[#ccc] border text-base rounded-lg  flex-row space-x-2 justify-center items-center h-14 mb-4">
        <TextInput
          className="w-full px-2 text-lg "
          placeholder="Enter Your Pin"
          onChangeText={(e) => setOtp(e)}
          value={otp}
          keyboardType="numeric"
          secureTextEntry={true}
          maxLength={4}
        />
      </View>
      <TouchableOpacity
        style={styles.signinButton}
        onPress={() => saveTransactionPin()}
      >
        {loader ? (
          <ActivityIndicator color="blue" size="small" />
        ) : (
          <Text style={styles.signinButtonText}>Confirm Pin</Text>
        )}
      </TouchableOpacity>
    </View>

    // </ScrollView>
  )
}

export default ConfirmPinModal
