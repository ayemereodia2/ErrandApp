import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import {
  EvilIcons,
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
// import { ScrollView } from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Platform,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Filter from '../../components/Filter/Filter'
import GuestComp from '../../components/GuestComp/GuestComp'
import { _fetch } from '../../services/axios/http'
import { errandMarketList, setLoading } from '../../services/errands/market'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getUserId } from '../../utils/helper'

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
  const [searchedErrand, setSearchedErrand] = useState<MarketData[]>([])
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [checkFilterToggle, setCheckFilterToggle] = useState(false)

  const handleViewChange = () => {
    setToggleView(!toggleView)
  }

  // const { data } = useSelector((state: RootState) => state.userDetailsReducer)
  const [filterOn, setFilterOn] = useState(false)

  const handleFilter = () => {
    setCheckFilterToggle(true)
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
    dispatch(setLoading(false))
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  console.log(">>>>>fiterOn", filterOn);
  

  const max = high * 100
  const min = low * 100

  const filterMarketList = () => {
    dispatch(
      errandMarketList({
        setSearchedErrand,
        category: value,
        minPrice: minCheck ? min : 0,
        maxPrice: minCheck ? max : 0,
      }),
    )
  }

  useEffect(() => {
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
    dispatch(errandMarketList({ setSearchedErrand }))
    dispatch(getCategoriesList())
  }, [])

  const loadMoreData = async () => {
    if (!loadingMore) {
      if (checkFilterToggle && searchedErrand.length < 5) {
        return null
      }
      const rs = await _fetch({
        _url: `/errand/market?start=${page + 1}&count=5${
          value ? `&category=${value}` : ''
        }${min === 0 ? '' : `&minPrice=${min}`}${
          max === 0 ? '' : `&maxPrice=${max}`
        }`,
        method: 'GET',
      })
      const _rs = await rs.json()
      setSearchedErrand([...searchedErrand, ..._rs.data])
      setPage(page + 1)
      setLoadingMore(false)
    }
  }

  const renderListFooter = () => {
    if (checkFilterToggle) {
      return null
    }
    if (!loadMoreData) {
      return null
    }
    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: '#CED0CE',
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    )
  }

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Market',
      headerStyle: { backgroundColor: '#e4eaf7' },
      headerTitleStyle: 'black',
      headerLeft: () => (
        <View
          style={{ marginRight: 6 }}
          className="flex-row items-center justify-between mx-0 px-3 pb-1 w-10 h-10 rounded-full "
        >
          <Ionicons
            name="arrow-back"
            color="#0c1730"
            size={24}
            onPress={() => navigation.navigate('Default')}
          />
        </View>
      ),
      headerRight: () => (
        <View className="pr-3">
          <Feather
            name="help-circle"
            color="#1E3A79"
            size={24}
            onPress={() => navigation.navigate('Contact')}
          />
        </View>
      ),
    })
  }, [])

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: userId ? '#0c1730' : '',
        }}
      >
        <ActivityIndicator color="blue" size="large" />
      </SafeAreaView>
    )
  }
  return (
    <>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'column-reverse',
            marginBottom: Platform.OS === 'android' ? 40 : 20,
          }}
        >
          {/* <ScrollView
            scrollEventThrottle={16}
            className="bg-[#e4eaf7]"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          > */}
          {loading && (
            <View style={styles.container} className="mt-10">
              <ActivityIndicator
                size={'large'}
                style={[{ height: 80 }]}
                color="blue"
              />
            </View>
          )}
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
                setSearchedErrand={setSearchedErrand}
                setCheckFilterToggle={setCheckFilterToggle}
              />
            )}

            <View
              className="bg-[#e4eaf7]"
              style={{ display: filterOn ? 'none' : 'flex' }}
            >
              <View className="mx-4">
                {!loading && (
                  <View className="mt-4 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3 bg-white">
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
                            <Feather name="list" size={20} color="black" />
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
                )}

                <FlatList
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                  onEndReached={loadMoreData}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={renderListFooter}
                  data={searchedErrand}
                  renderItem={({ item, index }) => {
                    return (
                      <>
                        <GuestComp
                          errand={item}
                          navigate={navigation}
                          key={index}
                        />
                      </>
                    )
                  }}
                  keyExtractor={(item) => item.id}
                  style={{ flexGrow: 0, height: 650 }}
                />
              </View>
            </View>
          </>

          {/* </ScrollView> */}
        </View>
      </SafeAreaView>

      <View
        className="w-full h-[60px] absolute bottom-0 flex-row justify-between items-center bg-[#1E3A79]"
        style={{ display: loading ? 'none' : 'flex' }}
      >
        <TouchableOpacity
          className="bg-[#1E3A79] w-[50%] h-[60px] items-center justify-center"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white text-lg font-medium text-center">
            Login
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#2856c1] w-[50%] h-[60px] items-center justify-center"
          onPress={() => navigation.navigate('VerifyPhone')}
        >
          <Text className="text-white text-lg text-center font-medium">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
