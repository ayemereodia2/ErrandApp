import { useNavigation } from '@react-navigation/native'
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
import { _fetch } from '../../services/axios/http'
import { errandDetails } from '../../services/errands/errandDetails'
import { myErrandList } from '../../services/errands/myErrands'
import { useAppDispatch } from '../../services/store'

const AbandonErrandModal = ({ route }: any) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { errand, userId, singleSubErrand } = route.params
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Action',
    })
  }, [])

  const abandonErrand = async () => {
    setLoading(true)

    const _rs = await _fetch({
      method: 'DELETE',
      body: { reason: comment },
      _url: `/errand/${errand.id}/abandon`,
    })

    const rs = await _rs.json()
    if (rs.success === true) {
      setLoading(false)

      navigation.navigate('MyErrands')
      dispatch(errandDetails({ errandId: errand.id }))
      dispatch(myErrandList({}))
    } else {
      setLoading(false)
      console.log(">>>rs", errand.id, errand.status);
      
      Toast.show({
        type: 'error',
        text1: rs.message,
      })
    }
  }

  return (
    <ScrollView style={{ flex: 1, marginTop: 40, padding: 20 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <Text className="text-xl font-semibold text-[#3e3d3d] text-center pb-6">
          Abandon Errand
        </Text>

        <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] py-4 px-4 mt-2">
          <Text className="text-center">
            Are you sure you want to Abandon this errand? you will incure a fine
            for this action
          </Text>

          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                setOpen(true)
              }}
              className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
            >
              <Text className="text-center text-white">Yes, Abandon</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.goBack()
              }}
              className=" w-48 py-3  mt-4 rounded-lg shadow-lg border-[#C85604] border-[1px]"
            >
              <Text className="text-center text-[#C85604]">
                No, I wish to continue this errand
              </Text>
            </TouchableOpacity>

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
                      onChangeText={(e) => setComment(e)}
                      value={comment}
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
                      abandonErrand()
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
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default AbandonErrandModal
