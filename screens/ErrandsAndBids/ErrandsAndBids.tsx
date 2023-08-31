import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

const ErrandsAndBids = ({ navigation }: any) => {
  const layout = useWindowDimensions()

  const [isBlue, setIsBlue] = useState(true)

  const toggleColor = () => {
    setIsBlue((prevIsBlue) => !prevIsBlue)
  }

  const handleBidNavigation = () => {
    navigation.navigate('Bids')
  }

  const handleErrandDetailsNavigation = () => {
    navigation.navigate('ErrandsAndBids')
  }

  const handleBoth1 = () => {
    handleErrandDetailsNavigation()
  }

  const handleBoth2 = () => {
    toggleColor()
    handleBidNavigation()
  }

  return (
    <ScrollView>
      <SafeAreaView>
        <View className="flex-row mr-[16px] ml-[16px] ">
          <TouchableOpacity onPress={handleBoth1}>
            <View className="w-[199px] h-[52px] bg-[#243763]  items-center justify-center ">
              <Text className="text-center text-white">Errand Details</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleBoth2}>
            <View className="w-[193px] h-[52px] bg-[#fff]  items-center justify-center ">
              <Text className="text-center text-[#243763]">Bids</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6 mx-[16px] w-[399px]">
          <Text className="text-[18px] leading-6">
            I need a mechanic to fix a broken windshield
          </Text>
        </View>

        <View className="flex-row ml-[16px] mt-6">
          <Text className="pr-[75px] leading-[24px] text-[16px] text-[#666]">
            Status
          </Text>
          <Text className="  leading-[24px] text-[16px] text-[#000]">Open</Text>
        </View>

        <View className="flex-row ml-[16px] mt-6">
          <Text className="pr-[75px] leading-[24px] text-[16px] text-[#666]">
            Duration
          </Text>
          <Text className="  leading-[24px] text-[16px] text-[#000]">
            <Ionicons name="calendar-outline" size={18} color="black" /> Jan 14,
            2023-Feb 14, 2023
          </Text>
        </View>

        <View className="flex-row ml-[16px] mt-6">
          <Text className="pr-[75px] leading-[24px] text-[16px] text-[#666]">
            Location
          </Text>
          <Text className="  leading-[24px] text-[16px] text-[#000]">
            Sangotedo, Lagos
          </Text>
        </View>

        <View className="mt-[16px] ml-[16px]">
          <Text className="  leading-[24px] text-[16px] text-[#666]">
            Special Requirements
          </Text>
        </View>

        <View className="flex-row">
          <View className="w-[96px] h-[24px] ml-[16px] mt-[14px] bg-[#DAE1F1] justify-center rounded-[5px]">
            <Text className="text-center text-[#3F60AC] text-xs">
              <FontAwesome name="check-circle" size={12} color={'#3F60AC'} />{' '}
              Insurance
            </Text>
          </View>

          <View className="w-[96px] h-[24px] ml-[16px] mt-[14px] bg-[#E6CDFE] justify-center items-center rounded-[5px]">
            <Text className="text-center text-[#6604C8] text-xs">
              <FontAwesome name="envelope" size={12} color="#6604C8" />{' '}
              Qualifications{' '}
            </Text>
          </View>

          <View className="w-[96px] h-[24px] ml-[16px] mt-[14px] bg-[#D8F8E9] justify-center rounded-[5px]">
            <Text className="text-center text-xs text-[#198553]">
              <Entypo name="add-user" size={12} color="#198553" /> Verification
            </Text>
          </View>
        </View>

        <View className="w-[68px] h-[38px] ml-[16px] bg-[#115A38] justify-center mt-[24px]">
          <Text className="text-center text-white font-bold text-[18px]">
            N50k
          </Text>
        </View>

        <View className="ml-[16px] mt-[40px]">
          <Text className="leading-[24px] text-[#444] text-[16px]">
            Description
          </Text>
          <Text className="text-[#444444] pt-2 leading-[24px] text-[16px]">
            Lorem ipsum dolor sit amet consectetur. At convallis lacus sodales
            lorem et. Consectetur est posuere fermentum egestas congue lectus
            purus. Mattis libero ultrices at massa hendrerit purus. Eget netus
            non vel duis hendrerit mi gravida. In sed elit elit morbi vitae nisl
            malesuada aliquam ultricies.
          </Text>
        </View>

        <TouchableOpacity>
          <View className="ml-[16px] mt-2">
            <Text className="text-[#3F60AC]">Show Less</Text>
          </View>
        </TouchableOpacity>

        <View className="ml-[16px] mt-[32px] leading-[24px] text-[16px]">
          <Text>Supportive Images</Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row ml-[16px] mt-[8px] "
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
      </SafeAreaView>
    </ScrollView>
  )
}

export default ErrandsAndBids
