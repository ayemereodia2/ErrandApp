import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { Entypo, EvilIcons, Ionicons, MaterialIcons } from '@expo/vector-icons'
// import { ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import Toast from 'react-native-toast-message'
import ErrandComp from '../../components/ErrandComponent'
import { ProfileInitials } from '../../components/ProfileInitials'
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
              textClass="text-white text-base"
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
          <Menu style={{shadowColor:"none", shadowOpacity:0}}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={'black'} size={20} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  padding: 4,
                  width: 140,
                  marginTop: 20,
                  alignContent: 'center',
                },
              }}
            >
              <MenuOption
                onSelect={() => alert(`Save`)}
                text="Profile"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 0.2,
                    borderBottomColor: '#AAAAAA',
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
              <MenuOption
                onSelect={() => alert(`Save`)}
                text="Contact Us"
                customStyles={{
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
            </MenuOptions>
          </Menu>
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
              <View className="bg-[#F8F9FC] ">
                <View className="mx-4">
                  <View className="mt-6 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
                    <EvilIcons
                      name="search"
                      size={22}
                      className="w-1/12"
                      color="#808080"
                    />
                    <TextInput
                      className=" w-9/12"
                      placeholder="Search for Errands"
                      placeholderTextColor="#808080"
                    />
                    {/* <Image
                      style={{
                        width: 30,
                        height: 30,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/images/filter.png')}
                    /> */}
                    <View className="bg-[#3F60AC] mr-1 b rounded-md w-[38px]">
                      <Text className="p-2 text-center">
                        <Ionicons
                          name="md-filter-outline"
                          size={18}
                          color="white"
                        />
                      </Text>
                    </View>
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
