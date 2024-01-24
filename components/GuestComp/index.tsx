import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getAddress, getCardTimeAgo } from '../../utils/helper'

interface ErrandCardProp {
  errand: MarketData
  // navigate: any
}

interface Item {
  errand: MarketData
  navigate: any
}

export default function GuestComp({ errand, navigate }: Item) {
  
  const [address, setAddress] = useState('')
  const dispatch = useAppDispatch()

  const navigation = useNavigation()
  const budgetInNaira = Number(errand?.budget / Number(100))
  const MAX_ADDRESS_LENGTH = 50 // Maximum character length for address

  const truncateAddress = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + '...'
    }
    return text
  }

  const truncatedAddress = truncateAddress(address, MAX_ADDRESS_LENGTH)

  const truncatedAddressText = truncateAddress(
    errand?.dropoff_address?.address_text,
    MAX_ADDRESS_LENGTH,
  )

  const regex = /(<([^>]+)>)/gi
  const result = errand.description.replace(regex, '')

  // const mob_Address = truncateAddress(address, 20)

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  return (
    <View
      className="pt-1 mt-2 pb-1 bg-[#fff] rounded-xl py-1 px-6 border"
      style={{
        backgroundColor: 'white',
        borderColor: 'lightgrey',
      }}
    >
      {/* <BottomSheetModalProvider> */}
      {/* <TouchableOpacity
      onPress={() => {
        navigation.navigate('ErrandDetails', {
          errand_id: errand?.id,
          user_id: errand?.user_id,
        })
        dispatch(errandDetails({ errandId: errand?.id, navigation }))
        dispatch(externalUserDetails({ user_id: errand?.user_id }))
      }}
      className="pt-4 mt-4 pb-2 bg-[#fff] rounded-xl py-3 px-6 border"
      style={{
        backgroundColor: theme ? '#152955' : 'white',
        borderColor: theme ? '' : 'lightgrey',
      }}
    > */}
      <View className=" flex-row items-start mt-4">
        <View className="flex-row items-start justify-center gap-3">
          <TouchableOpacity
            // onPress={() => toggleBidHistoryModal(true, errand.user)}
            className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center"
          >
            {errand?.user?.profile_picture ? (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                  borderRadius: 20,
                }}
                alt="okay"
                source={{ uri: errand?.user?.profile_picture }}
                // source={require(errand.user.profile_picture)}
              />
            ) : (
              <Text className="uppercase text-lg items-center text-white">
                {errand?.user?.first_name.charAt(0).toUpperCase()}
                {errand?.user?.last_name.charAt(0).toUpperCase()}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              navigate.navigate('GuestDetails', {
                errand_id: errand?.id,
                user_id: errand?.user_id,
              })
              dispatch(errandDetails({ errandId: errand?.id, navigation }))
              // dispatch(externalUserDetails({ user_id: errand?.user_id }))
            }}
          >
            <View>
              <Text className="font-semibold ">
                {errand?.user?.first_name} {errand?.user?.last_name}
              </Text>

              <View className="flex-row justify-between -mt-4">
                <View className="w-60">
                  <Text className="text-[#000000] text-sm font-bold"></Text>
                  <View className="text-sm font-semibold flex-row items-center space-x-1">
                    <View>
                      <Text className="text-[14px] text-[#777777] font-medium">
                        <Entypo name="star" size={16} color="#FBB955" />
                        {errand?.user?.rating}
                      </Text>
                    </View>

                    <Text className="text-[#ccc] font-light text-2xl ">|</Text>
                    <View>
                      <Text className="text-[14px] text-[#777777] font-medium">
                        <FontAwesome5 name="running" size={14} color="black" />{' '}
                        {errand?.user?.errands_completed}
                      </Text>
                    </View>
                  </View>
                </View>
                <Text className="mr-6">
                  {' '}
                  {getCardTimeAgo(errand?.updated_at)}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigate.navigate('GuestDetails', {
            errand_id: errand?.id,
            user_id: errand?.user_id,
          })
          dispatch(errandDetails({ errandId: errand?.id, navigation }))
          // dispatch(externalUserDetails({ user_id: errand?.user_id }))
        }}
      >
        <Text className="text-[16px] font-medium py-4 pt-4 text-[#000000] w-[300px]">
          {result?.length >= 60
            ? result?.substring(0, 120).concat('', '...')
            : result}
        </Text>

        <Text className="text-sm text-[#a09e9e] font-light">
          {' '}
          <Text>
            <EvilIcons name="location" size={16} color={'green'} />{' '}
          </Text>
          {errand.dropoff_address?.address_text ? (
            <Text> {truncatedAddressText} </Text>
          ) : (
            <Text>No Location</Text>
          )}
        </Text>

        <View className="flex-row items-center">
          {/* <View className=" rounded-3xl mt-2">
            <Text
              className="font-medium text-sm inline-block"
              style={{ color: textTheme }}
            >
              {' '}
              {errand?.category.name} ?.substring(0, 20)
            </Text>
          </View> */}
        </View>

        {/* <View className="h-[0.3px] bg-[#AAAAAA] mt-3 items-center"></View> */}

        <View className="flex-row justify-between items-center">
          <Text className="text-[20px] font-bold text-[#1E3A79] ">
            &#x20A6; {budgetInNaira.toLocaleString()}
          </Text>
          {/* <ProfileInitials firstName="Kzu" lastName="Soo" /> */}

          <View className=" rounded-2xl py-2 px-2  items-center mt-2">
            <Text className="text-orange-500 text-center text-[17px] mb-1 font-semibold">
              {' '}
              {errand?.total_bids === 0 ? '' : errand?.total_bids}{' '}
              {errand?.total_bids === 0
                ? ''
                : errand?.total_bids <= 1
                ? 'Bid'
                : 'Bids'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* </TouchableOpacity> */}

      {/* <BottomSheetModal
          // backdropComponent={renderBackdrop}
          ref={bidHistoryRef}
          index={0}
          snapPoints={['60%']}
        >
         <BidHistory />
         
        </BottomSheetModal> */}
      {/* </BottomSheetModalProvider> */}
    </View>
  )
}

// export function GuestList({ errand, navigate }: ErrandCardProp) {
//   const [address, setAddress] = useState('')
//   const dispatch = useAppDispatch()

//   const navigation = useNavigation()
//   const budgetInNaira = Number(errand?.budget / Number(100))
//   const MAX_ADDRESS_LENGTH = 50 // Maximum character length for address

//   const truncateAddress = (text: string, maxLength: number) => {
//     if (text?.length > maxLength) {
//       return text?.substring(0, maxLength) + '...'
//     }
//     return text
//   }

//   const truncatedAddress = truncateAddress(address, MAX_ADDRESS_LENGTH)

//   const truncatedAddressText = truncateAddress(
//     errand?.dropoff_address?.address_text,
//     MAX_ADDRESS_LENGTH,
//   )

//   const truncResult = (text: string, maxLength: number) => {
//     if (text?.length > maxLength) {
//       return text?.substring(0, maxLength) + '...'
//     }
//     return text
//   }

//   const regex = /(<([^>]+)>)/gi
//   const result = errand.description.replace(regex, '')

//   useEffect(() => {
//     getAddress({ errand, setAddress })
//   }, [])

//   return (
//     <TouchableOpacity
//       onPress={() => {
//         navigate.navigate('GuestDetails', {
//           errand_id: errand?.id,
//           user_id: errand?.user_id,
//         })
//         dispatch(errandDetails({ errandId: errand?.id, navigation }))
//         dispatch(externalUserDetails({ user_id: errand?.user_id }))
//       }}
//       className="mx-0 shadow-sm rounded-sm"
//     >
//       <View className=" bg-white py-4 px-5 border-b-[0.3px] border-[#CCCCCC] hover:bg-[#CC9BFD]">
//         <View className="flex-row gap-3">
//           <View className="mt-4 w-[230px] ">
//             <Text className="text-base font-medium">
//               {truncResult(result, 55)}
//             </Text>
//             <Text className="text-sm text-[#666666] font-light pt-1 w-[200px]">
//               <Text>
//                 <EvilIcons name="location" size={14} color="green" />{' '}
//               </Text>
//               {errand.dropoff_address?.address_text ? (
//                 <Text>{truncatedAddressText}</Text>
//               ) : (
//                 <Text>No Location</Text>
//               )}
//             </Text>
//           </View>

//           <Text className="text-[18px] font-bold text-[#1E3A79] w-[100px]">
//             &#x20A6; {budgetInNaira.toLocaleString()}
//           </Text>
//         </View>

//         <View className="flex-row justify-between items-center"></View>
//       </View>
//     </TouchableOpacity>
//   )
// }
