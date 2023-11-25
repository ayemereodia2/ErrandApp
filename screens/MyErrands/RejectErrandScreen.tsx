import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
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
import RejectErrandModal from '../../components/Modals/Errands/RejectErrandModal'

const RejectErrandScreen = ({ route }: any) => {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [comment, setComment] = useState('')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const  {errand, bid } = route.params
//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerShown: true,
//       title: 'Errand Action',
//     })
//   }, [])

console.log(errand)
  

  const abandonErrand = async () => {
    setLoading(true)

     const _rs = await _fetch({
      method: 'DELETE',
      _url: `/errand/${errand.id}/bid/${bid.id}/respond`,
      body: { 
        response: 'reject',
        runner_id:  errand.runner_id,
        amount: errand.budget


    
    },
      
    })

    const rs = await _rs.json()
    console.log('omo', rs.status)
    if (rs.success === true) {
      setLoading(false)

      navigation.navigate('MyErrands')
      Toast.show({
        type: 'success',
        text1: rs.message,
      })
      console.log('errand rejected, done')
      
     
      
    } else {
      setLoading(false)
      // console.log(">>>rs", errand.id, errand.status);
      
      Toast.show({
        type: 'error',
        text1: rs.message,
      })
    }
  }

  return (
    <ScrollView style={{ flex: 1, marginTop: 80, padding: 20 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <Text className="text-xl font-semibold text-[#3e3d3d] text-center pb-6">
          Reject Errand
        </Text>

        <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] py-4 px-4 mt-2">
          <Text className="text-center">
            Are you sure you want to Reject this errand?
          </Text>

          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                // setOpen(true)
                abandonErrand()
              }}
              className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
            >
              <Text className="text-center text-white">Reject Errand</Text>
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

           
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default RejectErrandScreen
