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
import { useSelector } from 'react-redux'
import ErrandComp from '../../components/ErrandComponent'
import Filter from '../../components/Filter/Filter'
import { ProfileInitials } from '../../components/ProfileInitials'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import { getUserId } from '../../utils/helper'

export default function MainScreen({ navigation }: any) {
  // const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  const [errands, setErrands] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState('')

  const { data } = useSelector((state: RootState) => state.userDetailsReducer)
  const [filterOn, setFilterOn] = useState(false)

  const handleFilter = () => {
    setFilterOn(!filterOn)
  }
  // const { data: errands, loading:  } = useSelector(
  //   (state: RootState) => state.marketReducer,
  // )

  const getMarket = async () => {
    try {
      setLoading(true)
      const _rs = await _fetch({
        _url: '/errand/market',
        method: 'GET',
      })
      const rs = await _rs.json()
      setLoading(false)
      setErrands(rs.data)
      // console.log(rs.data)
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
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
    getMarket()
  }, [])

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  // console.log('>>>>>>profile', profilePic)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Market',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <ProfileInitials
            firstName={firstName.charAt(0).toUpperCase()}
            lastName={lastName.charAt(0).toUpperCase()}
            profile_pic={profilePic}
            textClass="text-white text-base"
            width={40}
            height={40}
          />
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-3 ">
          <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <MaterialIcons name="notifications" color={'black'} size={22} />
          </TouchableOpacity>
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={'black'} size={20} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: {
                  // borderBottomWidth: 0.2,
                  borderBottomColor: '#AAAAAA',
                },
                optionText: { textAlign: 'center', fontWeight: '600' },
              }}
            >
              <MenuOption
                onSelect={() => getMarket()}
                text="Refresh"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
              <MenuOption
                onSelect={() => alert(`Save`)}
                text="Profile"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
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
  }, [filterOn])

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
              {filterOn && (
                <Filter onClose={handleFilter} filterOn={filterOn} />
              )}

              <View
                className="bg-[#F8F9FC]"
                style={{ display: filterOn ? 'none' : 'flex' }}
              >
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
                    <TouchableOpacity onPress={handleFilter}>
                      <View className="bg-[#3F60AC] mr-1 b rounded-md w-[38px]">
                        <Text className="p-2 text-center">
                          <Ionicons
                            name="md-filter-outline"
                            size={18}
                            color="white"
                          />
                        </Text>
                      </View>
                    </TouchableOpacity>
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
