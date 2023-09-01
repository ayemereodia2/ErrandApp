import { FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { MarketData } from '../../types'
import { formatDate, getAddress } from '../../utils/helper'

interface MyErrandDetailsProps {
  errand: MarketData
}

const MyErrandDetails = ({ errand }: MyErrandDetailsProps) => {
  const [address, setAddress] = useState('')

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  return (
    <View>
      <View className="space-y-3">
        <View className="space-x-2 flex-row mt-6">
          <Text className=" text-[14px] text-[#666] w-28 font-bold">
            Status
          </Text>

          <View
            className={`bg-yellow-200 rounded-full px-2   ${
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
        </View>

        <View className="space-x-2 flex-row mt-6">
          <Text className=" text-[14px] text-[#666] w-28 font-bold">
            Duration
          </Text>
          <Text className=" text-sm text-[#000] w-60">
            <Ionicons name="calendar-outline" size={18} color="black" />{' '}
            {formatDate(errand.expiry_date)}
          </Text>
        </View>

        <View className="space-x-2 flex-row mt-6">
          <Text className=" text-[14px] text-[#666] w-28 font-bold">
            Location
          </Text>
          <Text className=" text-sm text-[#000] w-60">
            {!address ? errand.dropoff_address?.address_text : address}
          </Text>
        </View>

        <View className="space-x-2 mt-6">
          <Text className=" text-[14px] text-[#666] w-full font-bold pb-2">
            Special Requirements
          </Text>
          <View className="flex-row space-x-3">
            {errand.has_insurance && (
              <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center rounded-[5px]">
                <Text className="text-center text-[#3F60AC] text-xs">
                  <FontAwesome
                    name="check-circle"
                    size={12}
                    color={'#3F60AC'}
                  />{' '}
                  Insurance
                </Text>
              </View>
            )}

            {errand?.restriction && (
              <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center rounded-[5px]">
                <Text className="text-center text-[#3F60AC] text-xs">
                  <FontAwesome
                    name="check-circle"
                    size={12}
                    color={'#3F60AC'}
                  />{' '}
                  Verification
                </Text>
              </View>
            )}

            {errand?.restriction && (
              <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center rounded-[5px]">
                <Text className="text-center text-[#3F60AC] text-xs">
                  <FontAwesome
                    name="check-circle"
                    size={12}
                    color={'#3F60AC'}
                  />{' '}
                  Insurance
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className='mt-[24px]'>
        <Text className=" text-[14px] text-[#666] w-28 font-bold pb-2">
          Errand Cost
        </Text>
        <View  className="flex-row rounded-lg ">
          <Text  className="text-center rounded-lg bg-[#115A38]  p-1 text-white font-bold text-[16px] py-1">
             &#x20A6;{(errand?.amount / 100).toLocaleString()}
          </Text>
        </View>
      </View>

      <View className="mt-4">
        <Text className=" text-[14px] text-[#666] w-28 font-bold">
          Description
        </Text>
        <Text className="text-[#444444] pt-2 leading-[24px] text-[14px]">
          {errand?.description}
        </Text>
      </View>

      {/* <TouchableOpacity>
        <View className="mt-2">
          <Text className="text-[#3F60AC]">Show Less</Text>
        </View>
      </TouchableOpacity>

      <View className="ml-[16px] mt-[32px] leading-[24px] text-[16px]">
        <Text>Supportive Images</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-[8px] "
      >
        <Image
          source={require('../../assets/images/pawpaw.jpg')}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />

        <Image
          source={require('../../assets/images/pawpaw1.jpg')}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />

        <Image
          source={require('../../assets/images/meme.jpg')}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />
      </ScrollView>

      <View className="ml-[16px] mt-8">
        <Text>Supportive Audio</Text>
      </View>

      <View className="ml-[16px] mt-2">
        <Text>
          <AntDesign name="playcircleo" size={32} color="#3F60AC" />
        </Text>
      </View>

      <View className=" mt-[32px] leading-[24px] text-[16px]">
        <Text>Supportive Images</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-row mt-[8px] "
      >
        <Image
          source={require('../../assets/images/pawpaw.jpg')}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />

        <Image
          source={require('../../assets/images/pawpaw1.jpg')}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />

        <Image
          source={require('../../assets/images/meme.jpg')}
          style={{ width: 100, height: 100, marginRight: 16 }}
        />
      </ScrollView>

      <View className="ml-[16px] mt-8">
        <Text>Supportive Audio</Text>
      </View>

      <View className="flex-row mt-3 w-[375px] h-[70px] mx-auto bg-[#011E3E] items-center justify-center b rounded-lg">
        <Text className="">
          <AntDesign name="play" size={24} color="white" />
        </Text>
        <Text className="text-white p-2">0:22</Text>
        <Image
          source={require('../../assets/images/slider.jpg')}
          className="w-[175px] h-1 mr-2"
        />
        <Text className="text-white p-2">1:40</Text>
        <Text>
          <AntDesign name="delete" size={22} color="white" />
        </Text>
      </View> */}
    </View>
  )
}

export default MyErrandDetails
