import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { AntDesign, EvilIcons, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
// import { ScrollView } from 'native-base'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Container from '../../components/Container'
import ErrandComp from '../../components/ErrandComponent'
import Filter from '../../components/Filter/Filter'
import PostErrandButton from '../../components/PostErrandBtn'
import UserInfo from '../../components/UserInfo/UserInfo'
import { _fetch } from '../../services/axios/http'
import { errandMarketList, setLoading } from '../../services/errands/market'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getUserId } from '../../utils/helper'
import Content from '../../components/AboutContent/Content'

export default function MainScreen() {
  const navigation = useNavigation()
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
  // const [toggleView, setToggleView] = useState(true)
  const [searchedErrand, setSearchedErrand] = useState<MarketData[]>([])
  const [searchValue, setSearchValue] = useState('')

  const [userData, setUserData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [checkFilterToggle, setCheckFilterToggle] = useState(false)

  // const handleViewChange = () => {
  //   setToggleView(!toggleView)
  // }

  // const { data } = useSelector((state: RootState) => state.userDetailsReducer)
  const [filterOn, setFilterOn] = useState(false)

  const loaderGif = '../../assets/images/loading-SWAVE.gif'

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}

        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const bidHistoryRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)

  function toggleBidHistoryModal(open: boolean, user: any) {
    if (open) {
      setUserData(user)
      setModalOpen(true)
      bidHistoryRef.current?.present()
    } else {
      setUserData(null)
      bidHistoryRef.current?.dismiss()
    }
  }

  function openMoreModal() {
    bottomSheetRef1.current?.present()
  }

  function closeMoreModal() {
    bottomSheetRef1.current?.dismiss()
  }

  const handleFilter = () => {
    setFilterOn(!filterOn)
  }
  const { data: errands, loading } = useSelector(
    (state: RootState) => state.errandMarketListReducer,
  )

  // const clearSearchText = () => {
  //   setShowCloseIcon(false)
  // }

  const errandSearchHandler = () => {
    const value = searchValue.toLowerCase()
    const searchResult = errands.filter((errand) =>
      errand?.description?.toLowerCase().includes(value),
    )
    setSearchedErrand(searchResult)
  }

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
    dispatch(errandMarketList({ setSearchedErrand }))
    dispatch(setLoading(false))
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  const max = high * 100
  const min = low * 100

  const filterMarketList = () => {
    const max = high * 100
    const min = low * 100
    dispatch(
      errandMarketList({
        setSearchedErrand,
        category: value,
        minPrice: minCheck ? min : 0,
        maxPrice: minCheck ? max : 0,
      }),
    )
  }

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

  useEffect(() => {
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
    dispatch(errandMarketList({ setSearchedErrand }))
    dispatch(getCategoriesList())
  }, [])

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

  useEffect(() => {
    errandSearchHandler()
  }, [searchValue])

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
      >
        <ActivityIndicator color={theme ? 'white' : 'blue'} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <>
      <Container>
        <BottomSheetModalProvider>
          <SafeAreaView
            style={{ backgroundColor: modalOpen ? 'black' : 'none' }}
          >
            <StatusBar
              backgroundColor={backgroundTheme}
              barStyle={theme ? 'light-content' : 'dark-content'}
            />

           
              <>
                {/* {loading && <MainLoader />} */}

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
                  style={{
                    display: filterOn ? 'none' : 'flex',
                    backgroundColor: backgroundTheme,
                  }}
                >
                  <View className="mx-4">
                    {!loading && (
                      <View
                        className="mt-2 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3 bg-white"
                        style={{ backgroundColor: theme ? '#1E3A79' : 'white' }}
                      >
                        <EvilIcons
                          name="search"
                          size={22}
                          className="w-1/12"
                          color={theme ? 'white' : '#808080'}
                        />
                        <TextInput
                          style={{ color: theme ? 'white' : '#808080' }}
                          className=" w-7/12 pl-1"
                          placeholder="Search for Errands"
                          placeholderTextColor={theme ? 'white' : 'black'}
                          value={searchValue}
                          onChangeText={(text) => setSearchValue(text)}
                        />

                        {searchValue ? (
                          <AntDesign
                            onPress={() => setSearchValue('')}
                            name="close"
                            size={20}
                            color={theme ? 'white' : 'black'}
                          />
                        ) : (
                          ''
                        )}

                        <Pressable onPress={handleFilter}>
                          <View className="bg-[#3F60AC] mr-1 b rounded-md w-[38px]">
                            <Text className="p-2 text-center">
                              <Ionicons
                                name="md-filter-outline"
                                size={18}
                                color="white"
                              />
                            </Text>
                          </View>
                        </Pressable>
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
                            <ErrandComp
                              errand={item}
                              navigation={navigation}
                              key={index}
                              toggleBidHistoryModal={toggleBidHistoryModal}
                            />
                          </>
                        )
                      }}
                      keyExtractor={(item) => item.id}
                      style={{ flexGrow: 0, height: 650 }}
                    />

                    {/* <View className="pt-2">
                      {searchedErrand?.map(
                        (errand: MarketData, index: number) => {
                          return (
                            <>
                              <ErrandComp
                                errand={errand}
                                navigation={navigation}
                                key={index}
                                toggleBidHistoryModal={toggleBidHistoryModal}
                              />
                            </>
                          )
                        },
                      )}
                    </View> */}
                  </View>
                </View>
              </>
          </SafeAreaView>

          <BottomSheetModal
            // backdropComponent={renderBackdrop}
            ref={bidHistoryRef}
            index={0}
            snapPoints={['70%']}
            backdropComponent={renderBackdrop}
          >
            <UserInfo user={userData} navigation={navigation} />
          </BottomSheetModal>

          <BottomSheetModal
            // backdropComponent={renderBackdrop}
            ref={bottomSheetRef1}
            index={0}
            snapPoints={['40%']}
            backdropComponent={renderBackdrop}
          >
            <Content navigation={navigation} />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Container>
      {!loading && <PostErrandButton className="bottom-20 right-3" />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
})
