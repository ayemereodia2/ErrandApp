import { BottomSheetTextInput } from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
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
import { RootState } from '../../services/store'
import Colors from '../../utils/colors'
import { setHeight, setWidth } from '../../utils/Display'
import Fonts from '../../utils/fonts'

interface PinModalProps {
  createErrand?: boolean
  closePinModal: () => void
  submitErrandhandler: () => void
  verifyPin?: boolean
  makeWithdrawalHandler: () => void
  withdraw?: boolean
}

const PinModal = ({
  closePinModal,
  createErrand,
  submitErrandhandler,
  verifyPin,
  withdraw,
  makeWithdrawalHandler,
}: PinModalProps) => {
  const firstInput = useRef()
  const secondInput = useRef()
  const thirdInput = useRef()
  const fourthInput = useRef()
  const [otp, setOtp] = useState({ 1: '', 2: '', 3: '', 4: '' })
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

  const pinTextStyle = {
    fontSize: 25,
    color: Colors.DEFAULT_BLACK,
    padding: 0,
    textAlign: 'center',
    paddingHorizontal: 18,
    paddingVertical: 10,
  }

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
      backgroundColor: Colors.DEFAULT_GREEN,
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
      color: Colors.DEFAULT_WHITE,
    },
  })

  const saveTransactionPin = async (pin: string) => {
    if (pin.length < 4) {
      Toast.show({
        text1: 'Please make sure your pin is 4 digits',
        type: 'error',
      })
      return
    }
    setLoader(true)

    const _rs = await _fetch({
      _url: `/user/security/${verifyPin ? 'verify-pin' : 'pin'}`,
      method: 'POST',
      body: { transaction_pin: pin },
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
      if (createErrand) {
        submitErrandhandler()
        Toast.show({
          type: 'success',
          text1: 'Pin was confirmed successfully',
        })
        setLoader(false)
        closePinModal()
        return
      }
      if (withdraw) {
        Toast.show({
          type: 'success',
          text1: 'Pin was confirmed successfully',
        })
        makeWithdrawalHandler()
        setLoader(false)
        closePinModal()
      }
      closePinModal()
      Toast.show({
        type: 'success',
        text1: 'Your Pin has been set successfully',
      })
      setLoader(false)
    }
  }

  return (
    <View className="mb-20">
      <View style={{ backgroundColor: backgroundTheme, paddingBottom: 20 }}>
        <Text
          style={{ color: theme ? 'white' : 'blue' }}
          className="text-center mt-6 text-lg"
        >
          {createErrand ? 'Confirm Your Pin' : 'Set Your Pin'}
        </Text>
        <Text
          style={{ color: theme ? 'white' : 'blue' }}
          className="text-center py-4 text-base font-light"
        >
          Please Enter the Pin
        </Text>

        <View style={styles.otpContainer}>
          <View style={styles.otpBox}>
            <BottomSheetTextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 1: text })
                text && secondInput.current.focus()
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <BottomSheetTextInput
              style={styles.otpText}
              className="px-10"
              keyboardType="number-pad"
              maxLength={1}
              ref={secondInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 2: text })
                text ? thirdInput.current.focus() : firstInput.current.focus()
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <BottomSheetTextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={thirdInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 3: text })
                text ? fourthInput.current.focus() : secondInput.current.focus()
              }}
            />
          </View>
          <View style={styles.otpBox}>
            <BottomSheetTextInput
              style={styles.otpText}
              keyboardType="number-pad"
              maxLength={1}
              ref={fourthInput}
              onChangeText={(text) => {
                setOtp({ ...otp, 4: text })
                !text && thirdInput.current.focus()
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.signinButton}
          onPress={() => saveTransactionPin(Object.values(otp).join(''))}
        >
          {loader ? (
            <ActivityIndicator color="blue" size="small" />
          ) : (
            <Text style={styles.signinButtonText}>
              {createErrand ? 'Confirm' : 'Set Pin'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default PinModal
