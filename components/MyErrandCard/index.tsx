import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { userDetails } from '../../services/auth/userInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { getSubErrand } from '../../services/errands/subErrand'
import { useAppDispatch } from '../../services/store'
import { MarketData, SingleSubErrand } from '../../types'
import { getTimeAgo } from '../../utils/helper'

interface MyErrandCard {
  errand: MarketData
  navigation: any
  index: number
  setSubErrand?: React.Dispatch<React.SetStateAction<SingleSubErrand>>
  setManageErrandClicked?: React.Dispatch<React.SetStateAction<boolean>>
  user_id: string
}

const MyErrandCard = ({
  errand,
  navigation,
  index,
  setSubErrand,
  user_id,
}: MyErrandCard) => {
  const dispatch = useAppDispatch()

  const regex = /(<([^>]+)>)/gi
  const result = errand.description.replace(regex, '')

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MyErrandDetails', {
          bids: errand.bids,
        })
        dispatch(errandDetails({ errandId: errand.id, navigation }))
        dispatch(userDetails({ user_id: errand.user_id }))
        dispatch(
          getSubErrand({
            errand_id: errand.id,
            runner_id: errand.user_id === user_id ? errand.runner_id : user_id,
            setSubErrand,
          }),
        )
      }}
      key={index}
      className="mx-4 shadow-sm rounded-sm"
    >
      <View className=" bg-white py-4 px-6 border-b-[0.3px] border-[#CCCCCC] hover:bg-[#CC9BFD]">
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
            <Text className="text-sm font-medium">
              {' '}
              {errand.errand_type === 1 ? (
                <>Multiple Users Errand</>
              ) : (
                <>{errand?.category.name.substring(0, 20).concat('', '....')}</>
              )}
            </Text>
          </View>

          <Text className="text-[#808080] text-sm">
            {getTimeAgo(errand?.updated_at)}
          </Text>
        </View>

        <View className="mt-4">
          <Text className="text-sm font-medium">
            {result?.substring(0, 80).concat('', '....')}
          </Text>
        </View>

        <View className="flex-row justify-between items-center mt-4">
          <View
            className={`bg-yellow-200 rounded-md px-3 ${
              errand.status === 'pending'
                ? ' bg-orange-100'
                : errand.status === 'active'
                ? ' bg-[#ADF0D1]'
                : errand.status === 'completed'
                ? ' bg-blue-100'
                : errand.status === 'cancelled'
                ? ' bg-red-100'
                : 'bg-[#FEE1CD]'
            }`}
          >
            <Text
              className={`text-center text-sm capitalize py-1 font-medium ${
                errand.status === 'pending'
                  ? 'text-orange-600'
                  : errand.status === 'active'
                  ? 'text-[#115A38]'
                  : errand.status === 'completed'
                  ? 'text-blue-700'
                  : errand.status === 'cancelled'
                  ? 'text-red-700'
                  : ' text-[#642B02]'
              }`}
            >
              {errand.status}
            </Text>
          </View>

          <View className="bg-[#3F60AC] rounded-md px-1">
            <Text className="text-white p-1 text-center">
              {errand?.total_bids}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MyErrandCard
