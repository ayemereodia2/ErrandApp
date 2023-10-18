import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getAddress, getTimeAgo } from '../../utils/helper'
import { useSelector } from 'react-redux'

interface ErrandCardProp {
  errand: MarketData
  navigation: any
}

export default function ErrandComp({ errand, navigation }: ErrandCardProp) {
  const [address, setAddress] = useState('')
  const dispatch = useAppDispatch()

  // const navigation = useNavigation()
  const budgetInNaira = Number(errand?.budget / Number(100))
  const MAX_ADDRESS_LENGTH = 50 // Maximum character length for address

  const truncateAddress = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + '...'
    }
    return text
  }

  const regex = /(<([^>]+)>)/gi
  const result = errand.description.replace(regex, '')

  const truncatedAddress = truncateAddress(address, MAX_ADDRESS_LENGTH)

  const truncatedAddressText = truncateAddress(
    errand?.dropoff_address?.address_text,
    MAX_ADDRESS_LENGTH,
  )

  // const mob_Address = truncateAddress(address, 20)

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <TouchableOpacity
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
    >
      <View className=" flex-row items-start mt-4">
        <View className="flex-row items-start justify-center gap-3">
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
                source={{ uri: errand?.user?.profile_picture }}
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
            <Text
              className="font-semibold "
              style={{ color: textTheme}}
            >
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
                    <Text
                      className="text-[14px] text-[#777777] font-medium"
                      style={{ color: textTheme }}
                    >
                      <FontAwesome5 name="running" size={14} color="black" />{' '}
                      {errand?.user?.errands_completed}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      <Text
        style={{ color: textTheme }}
        className="text-[16px] font-medium py-4 pt-4 text-[#000000]"
      >
        {result?.length >= 60
          ? result?.substring(0, 120).concat('', '...')
          : result}
      </Text>

      <Text style={{color: theme ? '#a09e9e' : '#666666',}} className="text-sm text-[#a09e9e] font-light">
        {' '}
        <Text>
          <EvilIcons name="location" size={16} color={ "green"} />{' '}
        </Text>
        {errand.dropoff_address?.address_text ? (
         <Text style={{color: textTheme}}> truncatedAddressText </Text>
        ) : (
          <Text style={{color: textTheme}}>No Location</Text>
        )}
      </Text>

      <View className="flex-row items-center">
        <View className=" rounded-3xl mt-2">
          <Text
            className="font-medium text-sm inline-block"
            style={{ color: textTheme }}
          >
            {' '}
            {errand?.category.name} {/*?.substring(0, 20)} */}
          </Text>
        </View>
      </View>

      <View className="h-[0.3px] bg-[#AAAAAA] mt-3 items-center"></View>

      <View className="flex-row justify-between items-center mt-2">
        <Text style={{ color: textTheme }} className="text-[20px] font-bold text-[#1E3A79] ">
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

export function ListErrandComp({ errand, navigation }: ErrandCardProp) {
  const [address, setAddress] = useState('')
  const dispatch = useAppDispatch()

  // const navigation = useNavigation()
  const budgetInNaira = Number(errand?.budget / Number(100))
  const MAX_ADDRESS_LENGTH = 50 // Maximum character length for address

  const truncateAddress = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + '...'
    }
    return text
  }

  const regex = /(<([^>]+)>)/gi
  const result = errand.description.replace(regex, '')

  const truncResult = (text: string, maxLength: number) => {
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
    <>
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('ErrandDetails', {
          errand_id: errand?.id,
          user_id: errand?.user_id,
        })
        dispatch(errandDetails({ errandId: errand?.id, navigation }))
        dispatch(externalUserDetails({ user_id: errand?.user_id }))
      }}
      className="mx-0 shadow-sm rounded-sm"
    >
      {/* <View className=" bg-white py-4 px-6 border-b-[0.3px] border-[#CCCCCC] hover:bg-[#CC9BFD]">
        <View className="flex-row  gap-3">
          <View className="mt-4 w-[230px]">
            <Text className="text-base font-medium">
              {result?.substring(0, 80).concat('', '....')}
              {truncResult(result, 60)}
            </Text>
            <Text className="text-sm text-[#666666] font-light pt-1 w-[200px]">
              {' '}
              <Text>
                <EvilIcons name="location" size={14} color="green" />{' '}
              </Text>
              {errand.dropoff_address?.address_text ? (
                <Text>{truncatedAddressText}</Text>
              ) : (
                <Text>No Location</Text>
              )}
            </Text>
          </View>

          <Text className="text-[18px] font-bold text-[#1E3A79] w-[100px]">
            &#x20A6; {budgetInNaira.toLocaleString()}
          </Text>
        </View>

        <View className="flex-row justify-between items-center"></View>
      </View> */}

<View className=" bg-white py-4 px-5 border-b-[0.3px] border-[#CCCCCC] hover:bg-[#CC9BFD]">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            {errand?.user?.profile_picture === undefined ? (
              <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
                <Text className="uppercase text-lg items-center text-white">
                  {errand?.user?.first_name.charAt(0).toUpperCase()}
                  {errand?.user?.last_name.charAt(0).toUpperCase()}
                </Text>
              </View>
            ) : (
              <Image
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: 'contain',
                  borderRadius: 20,
                }}
                alt="okay"
                source={{ uri: errand?.user?.profile_picture }}
              />
            )}
            <Text className="text-sm font-medium w-[190px]">
             
            {errand?.user?.first_name} {errand?.user?.last_name}
              
            </Text>
            
          </View>

          <Text className="text-[#808080] text-sm w-[100px]">
            {/* {getTimeAgo(errand?.updated_at)} */}
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium">
            {result?.substring(0, 80).concat('', '....')}
          </Text>
        </View>

        {/* <View className="flex-row justify-between items-center mt-4">
          <View
            className={` px-2 `}
          >
            <Text
              className={`text-center text-sm capitalize py-1 font-medium mr-2`}
            >
             {errand.dropoff_address?.address_text ? (
          truncatedAddressText
        ) : (
          <Text>No Location</Text>
        )}
            </Text>
          </View>

          <View className=" px-1 ">
            <Text className="text-[20px] font-bold text-[#1E3A79] ">
            &#x20A6; {budgetInNaira.toLocaleString()}           
             </Text>
          </View>
        </View> */}
        <View className='flex-row justify-between items-center mt-2'>
          <View className='w-[60%] pr-10'>
          <Text className='text-center text-sm capitalize font-medium'>

          {errand.dropoff_address?.address_text ? (
          truncatedAddressText
        ) : (
          <Text>No Location</Text>
        )}
          </Text>
          </View>

          <View className=" px-1 ">
            <Text className="text-[20px] font-bold text-[#1E3A79] ">
            &#x20A6; {budgetInNaira.toLocaleString()}           
             </Text>
          </View>



        </View>
      </View>
    </TouchableOpacity>
    </>
  )
}
