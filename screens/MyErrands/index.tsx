// import { fetchMyErrands } from '@app/lib/errand/api'
import { AntDesign, Entypo, EvilIcons, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect } from 'react'
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import MyErrandCard from '../../components/MyErrandCard'
import { ProfileInitials } from '../../components/ProfileInitials'
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
            className="flex-row items-center mb-2"
          >
            <ProfileInitials
              firstName="Azubike"
              lastName="Orji"
              textClass="text-white"
            />
            {/* <Entypo name="menu" size={24} /> */}
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-3 ">
          <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <MaterialIcons name="notifications" color={'black'} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <Entypo name="dots-three-vertical" color={'black'} size={16} />
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
        {/* <View className="flex-row justify-center items-center gap-2 mt-2 relative">
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
        </View> */}

        <View className="bg-[#F8F9FC] ">
          <View className="mx-4 mt-4">
            <View className="border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
              <EvilIcons name="search" size={22} className="w-1/12" />
              <TextInput
                className=" w-9/12"
                placeholder="Search for Errands or Bids"
                placeholderTextColor="#808080"
              />

              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: 'contain',
                }}
                source={require('../../assets/images/filter.png')}
              />
            </View>
          </View>
        </View>

        <View className="mt-4 mx-4 flex-row space-x-3">
          <View className=" h-[40px] px-6 bg-[#E6E6E6] justify-center rounded-lg border-black border-3">
            <View className="flex-row items-center justify-around space-x-10">
              <Text className="text-center text-base font-medium text-[#4D4D4D]">
                My Bids
              </Text>
              <Text>
                {' '}
                <AntDesign name="down" size={12} color="black" />{' '}
              </Text>
            </View>
          </View>

          {/*Second Part */}
          <View className=" h-[40px] px-6 bg-[#E6E6E6] justify-center rounded-lg">
            <View className="flex-row items-center space-x-8">
              <Text className="text-center text-base font-medium text-[#4D4D4D]">
                All Errands
              </Text>
              <Text>
                {' '}
                <AntDesign name="down" size={12} color="black" />{' '}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView className="mt-6">
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
