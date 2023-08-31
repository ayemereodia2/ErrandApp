import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getAddress } from '../../utils/helper'
import { ProfileInitials } from '../ProfileInitials'

interface ErrandCardProp {
  errand: MarketData
  navigate: any
}

export default function ErrandComp({ errand, navigate }: ErrandCardProp) {
  const [address, setAddress] = useState('')
  const dispatch = useAppDispatch()

  const navigation = useNavigation()
  const budgetInNaira = Number(errand?.budget / Number(100))
  const MAX_ADDRESS_LENGTH = 30 // Maximum character length for address

  const truncateAddress = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + '...'
    }
    return text
  }

  const truncatedAddress = truncateAddress(address, MAX_ADDRESS_LENGTH)

  const truncatedAddressText = truncateAddress(
    errand.dropoff_address?.address_text,
    MAX_ADDRESS_LENGTH,
  )

  // const mob_Address = truncateAddress(address, 20)

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate('ErrandDetails', {
          errand_id: errand.id,
          user_id: errand.user_id,
        })
        dispatch(errandDetails({ errandId: errand.id }))
        dispatch(externalUserDetails({user_id: errand.user_id}))
      }}
      className="mt-4 border-[0.5px] pb-2 border-[#CBD5EC] bg-[#F4F6FB] rounded-lg py-3 px-4"
    >
      {/* <View className="px-3">
        <View className="flex-row items-center">
          <ProfileInitials firstName="Kzu" lastName="Soo" />
          <View className="pl-2 flex-row space-x-48 justify-between">
            <View className="">
              <Text>Jane Doe</Text>
              <View className="flex-row items-center">
                <Entypo name="location-pin" size={14} color="red" />
                <Text className="text-xs text-[#a8a8a8]">Ajah, Lagos</Text>
              </View>
            </View>
            <Text className="text-xs text-[#a8a8a8]">
              {getTimeDiff(errand?.created_at)}
            </Text>
          </View>
        </View>
        <View className="pl-12">
          <Text className="text-xs pt-2">{errand.description}</Text>
          <View className="flex-row justify-between items-center pt-1 ">
            <Text className="text-xs text-[#243763] font-bold">
              {' '}
              &#x20A6; {budgetInNaira.toLocaleString()}
            </Text>
            <Text className="text-xs text-[#243763] font-bold">
              {errand?.category.name}
            </Text>
          </View>
        </View>
      </View> */}

      <View className="bg-[#E6CDFE] rounded-xl px-2 py-1 my-2 flex-row justify-start w-[110px]">
        <Text className="">
          {' '}
          {errand?.category.name?.substring(0, 10).concat('', '....')}
        </Text>
      </View>

      <Text className="text-base font-medium py-2">
        {errand?.description?.length >= 60
          ? errand?.description?.substring(0, 50).concat('', '...')
          : errand?.description}
      </Text>

      <Text className="text-sm py-2">
        {' '}
        {!truncatedAddress ? truncatedAddressText : truncatedAddress}
      </Text>

      <View className="bg-[#FEE1CD] rounded-lg py-2 px-2 w-[65px] mt-2">
        <Text className="text-[#642B02] text-xs">
          {' '}
          {errand?.total_bids} {errand?.total_bids <= 1 ? 'Bid' : 'Bids'}
        </Text>
      </View>

      <View className="h-[0.2px] bg-[#AAAAAA] mt-3"></View>

      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-xl font-semibold ">
          &#x20A6; {budgetInNaira.toLocaleString()}
        </Text>
        <ProfileInitials firstName="Kzu" lastName="Soo" />
      </View>
    </TouchableOpacity>
  )
}
