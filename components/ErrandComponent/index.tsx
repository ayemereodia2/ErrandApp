import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getAddress } from '../../utils/helper'

interface ErrandCardProp {
  errand: MarketData
  navigate: any
}

export default function ErrandComp({ errand, navigate }: ErrandCardProp) {
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

  // const mob_Address = truncateAddress(address, 20)

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  return (
    <TouchableOpacity
      onPress={() => {
        navigate.navigate('ErrandDetails', {
          errand_id: errand?.id,
          user_id: errand?.user_id,
        })
        dispatch(errandDetails({ errandId: errand?.id }))
        dispatch(externalUserDetails({ user_id: errand?.user_id }))
      }}
      className="mt-4 pb-2 bg-[#fff] rounded-xl py-3 px-6 border-2 border-[#f3f3f3]"
    >
      <View className=" flex-row items-start mt-4">
        <View className="flex-row items-start justify-between gap-3">
          <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
            {errand?.user?.profile_picture ? (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                  borderRadius: 20,
                }}
                alt="okay"
                src={errand?.user?.profile_picture}
                // source={require(errand.user.profile_picture)}
              />
            ) : (
              <Text className="uppercase text-lg items-center text-white">
                {errand?.user?.first_name.charAt(0).toUpperCase()}
                {errand?.user?.last_name.charAt(0).toUpperCase()}
              </Text>
            )}
          </View>

          <View>
            <Text className="font-semibold pt-2">
              {errand?.user?.first_name} {errand?.user?.last_name}
            </Text>

            <View className="flex-row justify-between -mt-2">
              <View className="w-60">
                <Text className="text-[#000000] text-sm font-bold"></Text>
                <Text className="text-sm font-semibold">
                  <Entypo name="star" size={16} color="#FBB955" />
                  <Text className="text-[14px] text-[#777777] font-medium">
                    <View className="px-1">
                      <Text>{errand?.user?.rating}</Text>
                    </View>
                    <Text className="text-[#ccc] font-light text-2xl ">|</Text>
                    {/* {sender.errands_completed} */}{' '}
                    <FontAwesome5 name="running" size={14} color="black" />{' '}
                    {errand?.user?.errands_completed}
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Text className="text-[16px] font-medium py-4 pt-4 text-[#000000]">
        {errand?.description?.length >= 60
          ? errand?.description?.substring(0, 50).concat('', '...')
          : errand?.description}
      </Text>

      <Text className="text-sm text-[#666666] font-light">
        {' '}
        <Text>
          <EvilIcons name="location" size={14} color="green" />{' '}
        </Text>
        {errand.dropoff_address?.address_text ? (
          truncatedAddressText
        ) : (
          <Text>No Location</Text>
        )}
      </Text>

      <View className="flex-row items-center">
        <View className=" rounded-3xl mt-2">
          <Text className="font-medium text-sm inline-block">
            {' '}
            {errand?.category.name} {/*?.substring(0, 20)} */}
          </Text>
        </View>
      </View>

      <View className="h-[0.3px] bg-[#AAAAAA] mt-3 items-center"></View>

      <View className="flex-row justify-between items-center mt-2">
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
  )
}
