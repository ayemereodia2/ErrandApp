import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { errandDetails } from '../../services/errands/errandDetails'
import { useAppDispatch } from '../../services/store'

const CancelErrandModal = ({ route }: any) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { errand, userId, singleSubErrand } = route.params
  const [reason, setReason] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const cancelErrand = async () => {
    setLoading(true)

    // const _rs = await _fetch({
    //   method: 'DELETE',
    //   _url: `/errand/${errand.id}/cancel`,
    //   body: { reason },
    // })

    const token = await AsyncStorage.getItem('accessToken')

    const rs = await axios.delete(
      `${process.env.EXPO_PUBLIC_API_URL}/errand/${errand.id}/cancel`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: {reason}
      },
    )

    // const rs = await _rs.json()

    console.log('>>>>cancel res', rs.data)

    if (rs.data.success === true) {
      navigation.navigate('MyErrands')

      Toast.show({
        type: 'success',
        text1: rs.data.message,
      })
      // dispatch(errandDetails({ errandId: errand.id }))
    } else {
      setLoading(false)

      Toast.show({
        type: 'error',
        text1: rs.data.message,
      })
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Action',
    })
  }, [])

  return (
    <ScrollView style={{ flex: 1, marginTop: 40, padding: 20 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <Text className="text-xl font-semibold text-[#3e3d3d] text-center pt-2 pb-6">
          Cancel Errand
        </Text>

        <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mt-2">
          <Text className="text-center">
            If you wish to cancel this errand, click this button. Please note
            that if this errand has begun you will be fined for this action.
          </Text>

          <Text className="text-center pt-4">
            Are you sure you want to Cancel this errand? you will incur a fine
            for this action
          </Text>

          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setOpen(true)
              }}
              className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
            >
              <Text className="text-center text-white">Yes, Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
              className=" w-40 py-3  mt-4 rounded-lg shadow-lg border-[#C85604] border-[1px]"
            >
              <Text className="text-center text-[#C85604]">No, Not sure</Text>
            </TouchableOpacity>
          </View>

          {open ? (
            <>
              <View className="px-2 mt-4">
                <Text className="text-sm font-semibold text-[#243763]">
                  {' '}
                  Reason{' '}
                </Text>

                <View className="w-[300px] border bg-white border-[#E6E6E6] text-sm py-1 mt-2 rounded-lg px-1">
                  <TextInput
                    className={'w-full  text-sm py-3.5 mt-2 rounded-lg px-3'}
                    placeholder="why do you want to abandon this errand ?"
                    onChangeText={(e) => setReason(e)}
                    value={reason}
                    multiline={true}
                    numberOfLines={10}
                    style={{ height: 100, textAlignVertical: 'top' }}
                    keyboardType="default"
                    // onFocus={handleCommentFocus}
                    // onBlur={handleCommentBlur}
                  />
                </View>
              </View>

              <View className="flex-row justify-center items-center">
                <TouchableOpacity
                  className="bg-[#1E3A79] h-12 w-4/6 mt-6 flex-row justify-center items-center rounded-lg"
                  onPress={() => {
                    cancelErrand()
                  }}
                >
                  <Text className="text-white text-base">
                    {loading ? (
                      <ActivityIndicator size="small" color="#000000" />
                    ) : (
                      'Continue the process'
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            ''
          )}
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default CancelErrandModal
