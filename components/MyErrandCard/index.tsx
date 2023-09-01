import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { userDetails } from '../../services/auth/userInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getTimeAgo } from '../../utils/helper'

interface MyErrandCard {
  errand: MarketData
  navigation: any
  index: number
}

const MyErrandCard = ({ errand, navigation, index }: MyErrandCard) => {
  const dispatch = useAppDispatch()

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('MyErrandDetails')
        dispatch(errandDetails({ errandId: errand.id }))
        dispatch(userDetails({ user_id: errand.user_id }))
      }}
      key={index}
      className="mx-3 mt-3 shadow-sm rounded-sm"
    >
      <View className="border-b-[0.3px] py-2 border-[#ccc] shadow-lg">
        <View className="flex-row justify-between items-center space-x-2">
          <Image
            source={require('../../assets/images/timothy.jpg')}
            style={{ width: 40, height: 40, borderRadius: 50 }}
          />
          <View className="flex-row items-center space-x-2">
            <View className="mt-2">
              <Text className="text-[#011E3E] text-sm w-56">
                {errand?.description?.substring(0, 30).concat('', '....')}
              </Text>
              <View className="flex-row gap-4 items-center mb-3 pt-2">
                <View
                  className={`bg-yellow-200 rounded-full px-2 ${
                    errand.status === 'pending'
                      ? ' bg-orange-100'
                      : errand.status === 'active'
                      ? ' bg-green-100'
                      : errand.status === 'completed'
                      ? ' bg-blue-100'
                      : errand.status === 'cancelled'
                      ? ' bg-red-100'
                      : 'bg-yellow-100'
                  }`}
                >
                  <Text
                    className={` ${
                      errand.status === 'pending'
                        ? 'text-orange-600'
                        : errand.status === 'active'
                        ? 'text-green-700 '
                        : errand.status === 'completed'
                        ? 'text-blue-700'
                        : errand.status === 'cancelled'
                        ? 'text-red-700'
                        : ' text-[#4f4e4e]'
                    }`}
                  >
                    {errand?.status}
                  </Text>
                </View>
                <Text>
                  {errand?.category.name.substring(0, 10).concat('', '...')}
                </Text>
              </View>
            </View>
          </View>

          <View className="space-y-2">
            <View className=" rounded-full bg-green-500 mx-auto w-4 ">
              <Text className="text-white text-center">
                {errand?.total_bids}
              </Text>
            </View>
            <Text className="text-[#a09e9e]">
              {getTimeAgo(errand?.updated_at)}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default MyErrandCard
