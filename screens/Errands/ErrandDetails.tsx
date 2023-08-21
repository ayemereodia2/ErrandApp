import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import React, { useEffect, useLayoutEffect, useState } from 'react'
// import AppLoading from 'expo-app-loading';
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import PlaceBidInput from '../../components/PlaceBidInputs'
import { ProfileInitials } from '../../components/ProfileInitials'
import { userDetails } from '../../services/auth/userInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { RootState, useAppDispatch } from '../../services/store'
import { formatDate } from '../../utils/helper'

export default function ErrandDetails({ route, navigation }: any) {
  const dispatch = useAppDispatch()
  const [showBid, setShowBid] = useState(false)

  const { errand_id, user_id } = route.params

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  const { data } = useSelector((state: RootState) => state.userDetailsReducer)
  const { data: errand, loading } = useSelector(
    (state: RootState) => state.errandDetailsReducer,
  )

  // console.log('>>>>>>>errandId', user_id, errand_id, data)

  const budgetInNaira = Number(errand?.budget / Number(100))

  const toggleShowBid = () => {
    setShowBid(!showBid)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
    })
  }, [])

  useEffect(() => {
    dispatch(errandDetails({ errandId: errand_id }))
    dispatch(userDetails({ user_id }))
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
        {loading ? (
          <View>
            <ActivityIndicator size={'large'} />
          </View>
        ) : (
          <View className="p-4">
            <View className="flex-row items-center">
              <ProfileInitials
                firstName={data.first_name}
                lastName={data.last_name}
              />
              <View className="pl-2 flex-row space-x-40 justify-between">
                <View className="">
                  <View className="flex-row items-center">
                    <Text className="text-xs text-[#959494]">
                      {errand?.category.name}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            <Text className="text-xs pt-3 text-[#383737]">
              {errand.description}
            </Text>

            <Text className="pt-4 text-xs text-[#818080]">
              Reward{' '}
              <Text className="text-[#b2b1b1]">
                (this includes all cost of running the errand)
              </Text>{' '}
            </Text>
            <Text className="text-sm">
              {' '}
              &#x20A6; {budgetInNaira.toLocaleString()}
            </Text>

            <Text className="pt-4 text-xs text-[#818080]">Deadline</Text>
            <Text className="text-xs">{formatDate(errand.expiry_date)}</Text>

            <Text className="pt-4 text-xs text-[#818080]">Location</Text>
            <Text className="text-xs">
              From Road 1, ikota shopping complex, Ajah, lagos. To No. 126,
              Mende, Maryland, Lagos
            </Text>
          </View>
        )}

        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity
            className="bg-[#243763] h-12 w-full flex-row justify-center items-center"
            onPress={() => toggleShowBid()}
          >
            <Text className="text-white text-sm">Place your Bid</Text>
          </TouchableOpacity>
        </View>

        {showBid && <PlaceBidInput toggleShowBid={toggleShowBid} />}
      </SafeAreaView>
    )
  }
}
