import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { Entypo, EvilIcons } from '@expo/vector-icons'
// import { ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
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
      headerShown: true,
      title: 'Errand Market',
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
            <>
              <View className="bg-white ">
                <View className='mx-4'>
                  <View className="mt-6 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
                    <EvilIcons name="search" size={22} className="w-1/12" />
                    <TextInput
                      className=" w-9/12"
                      placeholder="Search for Errands"
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
              </View>
            </>
          )}
        </ScrollView>
      </SafeAreaView>
    )
  }
}
