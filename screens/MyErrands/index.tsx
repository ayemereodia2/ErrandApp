// import { fetchMyErrands } from '@app/lib/errand/api'
import { Entypo, EvilIcons, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect } from 'react'
import {
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useQuery } from 'react-query'
import { useSelector } from 'react-redux'
import MyErrandCard from '../../components/MyErrandCard'
import { fetchMyErrands } from '../../lib/errand/api'
import { myErrandList } from '../../services/errands/myErrands'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'

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
    })
  }, [])

  useEffect(() => {
    dispatch(myErrandList({}))
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
