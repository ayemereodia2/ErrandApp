// import { fetchMyErrands } from '@app/lib/errand/api'
import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect } from 'react'
import {
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import MyErrandCard from '../../components/MyErrandCard'
import { myErrandList } from '../../services/errands/myErrands'
import { RootState, useAppDispatch } from '../../services/store'

const ErrandScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const layout = useWindowDimensions()

  const { data: myErrands } = useSelector(
    (state: RootState) => state.myErrandReducer,
  )

  const navigateToNewScreen = () => {
    navigation.navigate('MyErrandDetails')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Errands',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="flex-row items-center"
          >
            <Entypo name="menu" size={24} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="pr-3">
          <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <Entypo name="dots-three-vertical" color={'black'} size={20} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    dispatch(myErrandList({}))
  }, [])

  return (
    <ScrollView>
      <View className="bg-[#F8F9FC]">
        <View className="flex-row justify-center items-center gap-2 mt-2 relative">
          <View className="bg-white flex-row py-1.5 px-3 items-center justify-between rounded-lg border-[#808080] border-[0.5px] space-x-2">
            <View className="flex-row items-center space-x-2 ">
              <EvilIcons name="search" size={20} color="black" />
              <TextInput
                className="w-[270px]"
                placeholder="Search for Errands or Bids"
              />
            </View>

            <View className="w-8 h-[30px] bg-[#243763] justify-center items-center rounded-md">
              <Ionicons name="filter" size={24} color="white" />
            </View>
          </View>
        </View>

        <ScrollView>
          {myErrands?.map((errand, index) => {
            return (
              <MyErrandCard
                index={index}
                errand={errand}
                navigation={navigation}
              />
            )
          })}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default ErrandScreen
