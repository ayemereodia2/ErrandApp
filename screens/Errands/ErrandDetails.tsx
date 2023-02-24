import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
// import AppLoading from 'expo-app-loading';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import PlaceBidInput from '../../components/PlaceBidInputs'

export default function ErrandDetails() {
  const navigation = useNavigation()
  const [showBid, setShowBid] = useState(false)

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  const toggleShowBid = () => {
    setShowBid(!showBid)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    })
  }, [])

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    )
  } else {
    return (
      <SafeAreaView style={{ flex: 1, zIndex: 1 }} className="">
        <View className="p-4">
          <View className="flex-row items-center">
            <View className="w-12 border h-12 rounded-full "></View>
            <View className="pl-2 flex-row space-x-40 justify-between">
              <View className="">
                <Text>Jane Doe</Text>
                <View className="flex-row items-center">
                  <Text className="text-xs text-[#b1b0b0]">
                    Pick-up & delivery
                  </Text>
                </View>
              </View>
            </View>
          </View>

          <Text className="text-xs pt-3 text-[#383737]">
            I want to deliver some clothes to my Aunt that stays in Maryland
            urgently, Before 6:00pm today
          </Text>

          <Text className="pt-4 text-xs text-[#818080]">
            Reward{' '}
            <Text className="text-[#b2b1b1]">
              (this includes all cost of running the errand)
            </Text>{' '}
          </Text>
          <Text className="text-sm">N2,500</Text>

          <Text className="pt-4 text-xs text-[#818080]">Deadline</Text>
          <Text className="text-xs">17, January, 2020. 6:00pm</Text>

          <Text className="pt-4 text-xs text-[#818080]">Location</Text>
          <Text className="text-xs">
            From Road 1, ikota shopping complex, Ajah, lagos. To No. 126, Mende,
            Maryland, Lagos
          </Text>
        </View>

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            className="bg-[#243763] h-12 w-full flex-row justify-center items-center"
            onPress={() => toggleShowBid()}
          >
            <Text className="text-white text-sm">Place your Bid</Text>
          </TouchableOpacity>
        </View>

        {showBid && <PlaceBidInput toggleShowBid={toggleShowBid}/>}
      </SafeAreaView>
    )
  }
}
