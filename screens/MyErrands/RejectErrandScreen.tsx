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


console.log(bid.runner.id)

console.log(bid.budget)

console.log(errand)
  

  const abandonErrand = async () => {
    setLoading(true)

     const _rs = await _fetch({
      method: 'DELETE',
      _url: `/errand/${errand.id}/bid/${bid.id}/respond`,
      
      // _url: `/errand/656108e5a795601d7362e5c9/cancel`,
      body: { 
        response: 'reject',
         runner_id:  bid.runner.id,
        //  runner_id: '655b63f7174126fdf77c396f',
        // amount: errand.amount,
        // description: errand.description,
        // source: errand.source,
        // reason: comment
    },
      
    })

    const rs = await _rs.json()
    console.log('omo', rs.status)

    if (rs.success === true) {
      setLoading(false)

      // dispatch(errandDetails({ errandId: errand.id }))
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
                setOpen(true)
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

export default RejectErrandScreen




// import React from 'react'
// import {
//   ActivityIndicator,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from 'react-native'
// import Toast from 'react-native-toast-message'
// import { useSelector } from 'react-redux'
// import { bidAction } from '../../services/bids/bidsAction'
// import { RootState, useAppDispatch } from '../../services/store'
// import { Bids, Haggles, MarketData } from '../../types'

// interface RejectErrandModalProp {
//   errand: MarketData
//   bid: Bids
//   user_id: string
//   toggleSuccessDialogue: (open: boolean) => void
//   toggleRejectErrandModal: (open: boolean) => void
//   navigation: any
//   haggle: Haggles
// }

// const RejectErrandScreen = ({
//   bid,
//   errand,
//   user_id,
//   toggleSuccessDialogue,
//   toggleRejectErrandModal,
//   haggle,
// }: // navigation
// RejectErrandModalProp) => {
//   const dispatch = useAppDispatch()

//   // const navigation = useNavi

//   const { loading } = useSelector(
//     (state: RootState) => state.bidActionReducer,
//   )

//   return (
//     <View className="py-4 pb-10">
//       <Text className="text-xl text-center font-semibold">Reject Errand</Text>

//       {/* <Image
//         width={60}
//         height={60}
//         source={require('../../../assets/images/business_men.png')}
//         className="mx-auto"
//       /> */}

//       <Text>Are you sure you want to Reject this Errand?</Text>

//       <View className="space-y-4 items-center px-4">
//         <TouchableOpacity
//           className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
//           onPress={() => {
//             dispatch(
//               bidAction({
//                 errand_id: errand.id,
//                 bid_id: bid.id,
//                 response: 'reject',
//                 runner_id: bid.runner.id,
//                 amount: haggle.amount,
//                 method: 'PUT',
//                 type: 'respond',
//                 toggleSuccessDialogue,
//                 dispatch,
//                 // toggleRejectErrandModal,
//                 Toast,
//               }),
//             )
//           }}
//         >
//           <Text className="text-white text-base">
//             {loading ? (
//               <ActivityIndicator size="small" color="#ffffff" />
//             ) : (
//               'Yes, Reject Errand'
//             )}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           className="bg-white h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg border-[#e90c0c] border-[0.5px]"
//           onPress={() => {}}
//         >
//           <Text className="text-base text-red-600">No, I change my mind</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     backgroundColor: 'grey',
//   },
//   textInput: {
//     alignSelf: 'stretch',
//     marginHorizontal: 12,
//     marginBottom: 12,
//     padding: 12,
//     borderRadius: 12,
//     backgroundColor: 'grey',
//     color: 'white',
//     textAlign: 'center',
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     zIndex: 100,
//     backgroundColor: 'white',
//   },
// })

// export default RejectErrandScreen

