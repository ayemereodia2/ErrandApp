import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { Entypo, EvilIcons, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
// import { ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Filter from '../../components/Filter/Filter'
import GuestComp, { GuestList } from '../../components/GuestComp/GuestComp'
import { errandMarketList } from '../../services/errands/market'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getUserId } from '../../utils/helper'
import { ProfileInitials } from '../../components/ProfileInitials'
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu'
import { myErrandList } from '../../services/errands/myErrands'
import { Image } from 'react-native'

export default function GuestScreen({ navigation }: any) {
  // const navigation = useNavigation()
  const dispatch = useAppDispatch()
  // const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState('')
  // const [errands, setErrands] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [value, setValue] = useState('')
  const [low, setLow] = useState(0)
  const [high, setHigh] = useState(0)
  const [minCheck, setMinCheck] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false)
  const [toggleView, setToggleView] = useState(true)

  const handleViewChange = () => {
    setToggleView(!toggleView)
  }

  // const { data } = useSelector((state: RootState) => state.userDetailsReducer)
  const [filterOn, setFilterOn] = useState(false)

  const handleFilter = () => {
    setFilterOn(!filterOn)
  }
  const { data: errands, loading } = useSelector(
    (state: RootState) => state.errandMarketListReducer,
  )

  const { data: categories } = useSelector(
    (state: RootState) => state.categoriesListReducer,
  )

  const category = categories.map((category) => {
    return {
      label: category.name,
      value: category.identifier,
    }
  })

  const onRefresh = React.useCallback(() => {
    dispatch(errandMarketList({}))
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  const filterMarketList = () => {
    dispatch(
      errandMarketList({
        category: value,
        minPrice: minCheck ? low : 0,
        maxPrice: minCheck ? high : 0,
      }),
    )
  }

  useEffect(() => {
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
    dispatch(errandMarketList({}))
    dispatch(getCategoriesList())
  }, [])

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })


   useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Market',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          {/* <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="flex-row items-center mb-2"
          > */}
            {/* <ProfileInitials
              firstName={firstName.charAt(0).toUpperCase()}
              lastName={lastName.charAt(0).toUpperCase()}
              profile_pic={profilePic}
              textClass="text-white text-base"
              width={40}
              height={40}
            /> */}
            <Image 
            source={require('../../assets/images/logo.png')}
            className='w-10 h-10 rounded-full bg-blue-100 justify-center mb-1'
            style={{resizeMode: 'cover'}}
            />
            {/* <Entypo name="menu" size={24} /> */}
          {/* </TouchableOpacity> */}
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-3 ">
         
          <TouchableOpacity onPress={() => {}}>
            <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" color={'black'} size={16} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    padding: 4,
                    width: 100,
                    marginTop: 20,
                  },
                }}
              >
                <MenuOption
                  onSelect={() => dispatch(myErrandList({}))}
                  text="Refresh"
                  customStyles={{
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />

              <MenuOption
                 
                  text="Contact Us"
                  customStyles={{
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />
              </MenuOptions>
            </Menu>
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
        <ScrollView
          scrollEventThrottle={16}
          className="bg-[#F8F9FC]"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {loading ? (
            <View style={styles.container} className="mt-10">
              <ActivityIndicator
                size={'large'}
                style={[{ height: 80 }]}
                color="blue"
              />
            </View>
          ) : (

            <>

              {filterOn && (
                <Filter
                  data={category}
                  value={value}
                  setValue={setValue}
                  onClose={handleFilter}
                  filterOn={filterOn}
                  low={low}
                  high={high}
                  setLow={setLow}
                  setHigh={setHigh}
                  filterMarketList={filterMarketList}
                  setMinCheck={setMinCheck}
                />
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
                      className=" w-8/12"
                      placeholder="Search for Errands"
                      placeholderTextColor="#808080"
                    />
                    <TouchableOpacity onPress={handleViewChange}>
                      <View className="mr-1 b rounded-md w-[38px]">
                        <Text className="p-2 text-center">
                          {toggleView ? (
                            <MaterialCommunityIcons
                              name="view-list"
                              size={20}
                              color="black"
                            />
                          ) : (
                            <MaterialCommunityIcons
                              name="view-dashboard"
                              size={20}
                              color="black"
                            />
                          )}
                        </Text>
                      </View>
                    </TouchableOpacity>
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

                  {errands?.map((errand: MarketData, index: number) => {
                    return (
                      <>
                        {toggleView ? (
                          <GuestComp
                            errand={errand}
                            navigate={navigation}
                            key={index}
                          />
                        ) : (
                          <GuestList
                            errand={errand}
                            navigate={navigation}
                            key={index}
                          />
                        )}
                      </>
                    )
                  })}
                 
                </View>
                
              </View>
              
            </>
          )}
        </ScrollView>

              
        <View className="w-full h-[80px] absolute bottom-2 flex-row justify-between items-center bg-[#1E3A79]" style={{display: loading ? 'none' : 'flex'}}>
          <TouchableOpacity className='bg-[#1E3A79] w-[50%] h-[80px] items-center justify-center' onPress={() => navigation.navigate("Login")}>
          <Text className="text-white text-lg font-medium text-center">
                     Login
                    </Text>
          </TouchableOpacity>

          <TouchableOpacity className='bg-[#FFB536] w-[50%] h-[80px] items-center justify-center' onPress={() => navigation.navigate("CreateAccount")}>
          <Text className="text-black text-lg text-center font-medium">
                     Sign Up
                    </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
