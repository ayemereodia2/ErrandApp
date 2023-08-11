import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { Entypo, EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
// import { ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect } from 'react'
// import AppLoading from 'expo-app-loading';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import ErrandComp from '../../components/ErrandComponent'
import { market } from '../../services/errands/market'
import { RootState, useAppDispatch } from '../../services/store'

export default function MainScreen() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const { data: errands, loading } = useSelector(
    (state: RootState) => state.marketReducer,
  )

  // console.log('>>>>>>errands', errands)

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    dispatch(market({}))
  }, [])

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    )
  } else {
    return (
      <SafeAreaView>
        <ScrollView scrollEventThrottle={16}>
          <View className="flex-row items-center justify-between mx-0 px-2 py-3 shadow-lg mt-2 bg-white">
            <View className="flex-row items-center">
              <Entypo
                onPress={() => navigation.openDrawer()}
                name="menu"
                size={30}
                color="#243763"
              />
              <View className="flex-row items-center justify-center">
                <Text
                  style={{ fontFamily: 'AbrilFatface_400Regular' }}
                  className=" text-[#243763] text-2xl pl-4"
                >
                  Gofer
                </Text>
                <View className="w-1 h-1 bg-[#33A532] rounded-full mt-4"></View>
              </View>
            </View>
            <EvilIcons name="search" size={30} color="#243763" />
          </View>

          {loading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View className="">
              {errands.map((errand) => {
                return <ErrandComp errand={errand} />
              })}

            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
