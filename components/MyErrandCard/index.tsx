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
      className="mx-4 shadow-sm rounded-sm"
    >
      <View className=" bg-white py-4 px-6 border-b-[0.2em] border-[#CCCCCC] hover:bg-[#CC9BFD]">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center space-x-3">
            {errand.errand_type === 1 ? (
              <Image
                source={require('../../assets/images/mulit.png')}
                className="w-8 h-8 b rounded-full"
              />
            ) : (
              <Image
                source={require('../../assets/images/jagger.jpg')}
                className="w-8 h-8 b rounded-full"
                />
              // <Image
              //   style={{
              //     width: 60,
              //     height: 60,
              //     resizeMode: 'contain',
              //     borderRadius: 30,
              //   }}
              //   alt="okay"
              //   src={errand?.user.profile_picture}
              // />
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

        {/*Second one */}
        <View className="mt-4">
          <Text className="text-sm font-medium">
            {errand?.description?.substring(0, 80).concat('', '....')}
          </Text>
        </View>

        {/* Third one */}

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

          <View className="bg-[#6604C8] rounded-md px-1">
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
