import React, { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

interface Props {
  openPinModal: () => void
  closeVerifyModal: () => void
}

export default function VerifyPassword({
  closeVerifyModal,
  openPinModal,
}: Props) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const verifyPassword = async () => {
    setLoading(true)
    const _rs = await _fetch({
      _url: `/user/verify-password`,
      method: 'POST',
      body: {
        password,
        phone_number: `+${currentUser?.phone_number.substring(1)}`,
      },
    })

    const rs = await _rs.json()

    console.log('>>>>>rs', rs)

    if (rs.success === false) {
      Toast.show({
        text1: 'Incorrect password',
        type: 'error',
      })
      setLoading(false)
      return
    }
    closeVerifyModal()
    openPinModal()
    Toast.show({
      text1: rs.message,
      type: 'success',
    })
    setLoading(false)
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: backgroundTheme }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <View
        style={{ backgroundColor: backgroundTheme, paddingBottom: 20 }}
        className="py-4 pb-10 h-full"
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
        >
          <Text className="text-lg text-center font-semibold">
            Verify Your Password
          </Text>

          <View className="px-4 mt-6">
            <Text>Password</Text>
            <View className="border border-[#E6E6E6]  bg-white text-sm rounded-lg mt-2 pl-3 py-1">
              <TextInput
                className="w-full text-sm bg-transparent"
                placeholder="Enter your password"
                onChangeText={(e) => setPassword(e)}
                value={password}
                keyboardType="default"
                style={styles.input}
              />
            </View>
          </View>

          <View className="flex-row justify-center items-center">
            <TouchableOpacity
              className="bg-[#1E3A79] h-12 w-4/6 mt-6 flex-row justify-center items-center rounded-lg"
              onPress={() => verifyPassword()}
            >
              <Text className="text-white text-base">
                {loading ? (
                  <ActivityIndicator size="small" color="#000000" />
                ) : (
                  'Verify Password'
                )}
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
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
