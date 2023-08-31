import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons'
import React, { useLayoutEffect } from 'react'
import {
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import MyErrandCard from '../../components/MyErrandCard'

const ErrandScreen = ({ navigation }: any) => {
  const layout = useWindowDimensions()

  const navigateToNewScreen = () => {
    navigation.navigate('ErrandsAndBids')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Errands',
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="flex-row items-center"
          >
            {/* <ProfileInitials firstName="Azubike" lastName="Orji" /> */}
            <Entypo name="menu" size={24} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  return (
    <ScrollView>
      <View className="">
        <View className="flex-row justify-center items-center gap-2 mt-2 relative">
          <View className="bg-[#DAE1F1] flex-row p-2 py-3 rounded-lg w-4/5 space-x-2">
            <EvilIcons name="search" size={24} color="black" />
            <TextInput className="w-5/6" placeholder="Find an Errand" />
          </View>

          <View className="w-[40px] h-[40px] bg-[#243763] justify-center items-center b rounded-md">
            <Ionicons name="filter" size={24} color="white" />
          </View>
        </View>

        <ScrollView>
          <TouchableWithoutFeedback
            className="mx-3 mt-3 shadow-sm rounded-sm"
            onPress={navigateToNewScreen}
          >
            <MyErrandCard />
            <MyErrandCard />
            <MyErrandCard />
            <MyErrandCard />
          </TouchableWithoutFeedback>
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default ErrandScreen
