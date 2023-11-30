import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import {errandAction} from '../../services/errands/errandAction'
import { useAppDispatch } from '../../services/store'

const CompleteErrandModal = ({route}: any) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { errand, userId, singleSubErrand } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Action',
    })
  }, [])

  return (
    <View style={{ flex: 1, marginTop: 40, padding: 20 }}>
      <Text className="text-xl font-semibold text-[#3e3d3d] text-center pt-2 pb-6">
        Complete Errand
      </Text>

      <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mt-2">
        <Text className="text-center">
          Confirm that this errand has been completed successfully
        </Text>

        <View className="items-center">
          <TouchableOpacity
            onPress={() => {
              dispatch(
                errandAction({
                  sub_errand_id: singleSubErrand?.id,
                  type: 'complete',
                  method: 'PATCH',
                  source: userId === errand.user_id ? 'sender' : 'runner',
                  errandId: errand.id,
                  dispatch,
                  navigation
                
                }),
              )
            }}
            className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
          >
            <Text className="text-center text-white">Yes, Pay the runner</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigation.goBack()
            }}
            className=" w-48 py-3  mt-4 rounded-lg shadow-lg border-[#C85604] border-[1px]"
          >
            <Text className="text-center text-[#C85604]">No, it's not completed yet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CompleteErrandModal
