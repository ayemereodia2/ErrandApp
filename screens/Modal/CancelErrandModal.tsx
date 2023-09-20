import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { errandAction } from '../../services/errands/errandAction'
import { useAppDispatch } from '../../services/store'

const CancelErrandModal = ({ route }: any) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const { errand, userId, singleSubErrand } = route.params

  console.log('>>>>errand', singleSubErrand, userId)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Action',
    })
  }, [])

  return (
    <View style={{ flex: 1, marginTop: 40, padding: 20 }}>
      <Text className="text-xl font-semibold text-[#3e3d3d] text-center pt-2 pb-6">
        Cancel Errand
      </Text>

      <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mt-2">
        <Text className="text-center">
          If you wish to cancel this errand, click this button. Please note that
          if this errand has begun you will be fined for this action.
        </Text>

        <Text className="text-center pt-4">
          Are you sure you want to Cancel this errand? you will incur a fine for
          this action
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
                  navigation,
                }),
              )
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
            <Text className="text-center text-[#C85604]">
              No, Not sure
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default CancelErrandModal
