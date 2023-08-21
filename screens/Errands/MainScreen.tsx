import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
// import { ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import ErrandComp from '../../components/ErrandComponent'
import { _fetch } from '../../services/axios/http'
import { useAppDispatch } from '../../services/store'

export default function MainScreen({ navigation }: any) {
  // const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [errands, setErrands] = useState([])

  // const { data: errands, loading:  } = useSelector(
  //   (state: RootState) => state.marketReducer,
  // )

  // console.log('>>>>>>errands', errands)

  const getMarket = async () => {
    try {
      setLoading(true)
      const _rs = await _fetch({
        _url: '/errand/market',
        method: 'GET',
      })
      const rs = await _rs.json()
      setLoading(false)
      // console.log(">>>>>rs", rs)
      setErrands(rs.data)
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    // dispatch(market({}))
    getMarket()
  }, [])

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
      <SafeAreaView>
        <ScrollView scrollEventThrottle={16}>
          {loading ? (
            <View>
              <ActivityIndicator size={'large'} />
            </View>
          ) : (
            <View className="">
              {errands?.map((errand, index) => {
                return (
                  <ErrandComp
                    errand={errand}
                    navigate={navigation}
                    key={index}
                  />
                )
              })}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
