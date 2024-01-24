import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import {
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
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
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import Container from '../../components/Container'
import ErrandComp from '../../components/ErrandComponent'
import Filter from '../../components/Filter/Filter'
import PostErrandButton from '../../components/PostErrandBtn'
import ScreenHeader from '../../components/ScreenHeader'
import UserInfo from '../../components/UserInfo/UserInfo'
import { _fetch } from '../../services/axios/http'
import { errandMarketList, setLoading } from '../../services/errands/market'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getUserId } from '../../utils/helper'

export default function Market() {
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
  const [location, setLocation] = useState('')
  const [userData, setUserData] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [checkFilterToggle, setCheckFilterToggle] = useState(false)

  function openSettingsModal() {
    bottomSheetRef2.current?.present()
  }
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
        onPress={() => {
          bottomSheetRef1.current?.dismiss()
          avatar.current?.dismiss()
          bottomSheetRef2.current?.dismiss()
        }}

        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const avatar = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const bottomSheetRef2 = useRef<BottomSheetModal>(null)

  function toggleAvatarModal(open: boolean, user: any) {
    if (open) {
      setUserData(user)
      setModalOpen(true)
      avatar.current?.present()
    } else {
      setUserData(null)
      avatar.current?.dismiss()
    }
  }

  function openMoreModal() {
    bottomSheetRef1.current?.present()
  }

  const handleFilter = () => {
    setCheckFilterToggle(true)
    setFilterOn(!filterOn)
  }
  const { data: errands, loading } = useSelector(
    (state: RootState) => state.errandMarketListReducer,
  )

  const errandSearchHandler = () => {
    const value = searchValue.toLowerCase()
    const searchResult = errands?.filter((errand) =>
      errand?.description?.toLowerCase().includes(value),
    )
    setSearchedErrand(searchResult)
  }

  const { data: categories } = useSelector(
    (state: RootState) => state.categoriesListReducer,
  )

  const category = categories?.map((category) => {
    return {
      label: category.name,
      value: category.identifier,
    }
  })

  const onRefresh = React.useCallback(() => {
    setSearchedErrand([])
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
        location,
      }),
    )
  }

  const loadMoreData = async () => {
    if (checkFilterToggle && searchedErrand.length < 5) {
      return null
    }
    if (!loadingMore) {
      const rs = await _fetch({
        method: 'GET',
        _url: `/errand/market?start=${page + 0}&count=10${
          value ? `&category=${value}` : ''
        }${min === 0 ? '' : `&minPrice=${min}`}${
          max === 0 ? '' : `&maxPrice=${max}`
        }`,
        // _url: `/errand/market`,
      })
      const _rs = await rs.json()
      setSearchedErrand([..._rs.data])
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
    if (!loadingMore) {
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
        <ActivityIndicator animating size="large" color="blue" />
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
      {filterOn ? (
        ''
      ) : (
        <ScreenHeader
          navigation={navigation}
          textTheme={textTheme}
          screen={'logo'}
          openSettingsModal={openSettingsModal}
        />
      )}
      <Container>
        <BottomSheetModalProvider>
          <SafeAreaView style={{ backgroundColor: '#FEFEFE' }}>
            <>
              {/* {loading && <MainLoader />} */}

              {filterOn && (
                <ScrollView>
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
                    navigation={navigation}
                    openMoreModal={openMoreModal}
                    firstName={firstName}
                    lastName={lastName}
                    profilePic={profilePic}
                    location={location}
                    setLocation={setLocation}
                  />
                </ScrollView>
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
                      className="mt-2 mb-6 border border-[#F2F2F2] pt-[10px] pb-[9px] pl-[29px] pr-[23.5px] rounded-[15px] flex-row items-center justify-between bg-white"
                      style={{ backgroundColor: theme ? '#1E3A79' : 'white' }}
                    >
                      <View className="flex-row items-center gap-1">
                        <EvilIcons
                          name="search"
                          size={22}
                          className="w-1/12"
                          color={theme ? 'white' : '#808080'}
                        />
                        <TextInput
                          style={{ color: theme ? 'white' : '#808080' }}
                          className=" w-7/12 pl-1"
                          placeholder="Search for errands"
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
                      </View>

                      <Pressable onPress={handleFilter}>
                        <View className=" mr-1 b rounded-md w-[38px]">
                          <Text className="p-2 text-center">
                            {/* <Ionicons
                              name="md-filter-outline"
                              size={18}
                              color="white"
                            /> */}

                            <MaterialCommunityIcons
                              name="tune-variant"
                              size={18}
                              color="black"
                            />
                          </Text>
                        </View>
                      </Pressable>
                    </View>
                  )}

                  <View className="flex-row items-center mb-4 mx-4">
                    <TouchableOpacity className="px-3 md:px-5 py-2 rounded-[20px] border border-[#888] bg-[#09497D] mr-4">
                      <Text
                        className="text-white"
                        style={{ fontFamily: 'Chillax' }}
                      >
                        All
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="px-3 md:px-5 py-2 rounded-[20px] border border-[#888] mr-3">
                      <Text
                        className="text-[#09497D] text-center"
                        style={{ fontFamily: 'Chillax' }}
                      >
                        Newest
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="px-3 md:px-5 py-2 rounded-[20px] border border-[#888] mr-3">
                      <Text
                        className="text-[#09497D] text-center"
                        style={{ fontFamily: 'Chillax' }}
                      >
                        Popular
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity className="px-3 md:px-5 py-2 rounded-[20px] border border-[#888] mr-3">
                      <Text
                        className="text-[#09497D] text-center"
                        style={{ fontFamily: 'Chillax' }}
                      >
                        Urgent
                      </Text>
                    </TouchableOpacity>
                  </View>

                  {searchedErrand?.length === 0 ? (
                    <View className="flex-row justify-center items-center mt-14">
                      <Text>There are no errands at the moment</Text>
                    </View>
                  ) : (
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
                          <View>
                            <ErrandComp
                              errand={item}
                              navigation={navigation}
                              key={index}
                              toggleAvatarModal={toggleAvatarModal}
                            />

                            {/* <NewErrandComp
                             
                              errand={item}
                              navigation={navigation}
                              key={index}
                              toggleAvatarModal={toggleAvatarModal}
                            /> */}
                          </View>
                        )
                      }}
                      contentContainerStyle={{
                        paddingBottom: 150,
                      }}
                      keyExtractor={(item) => item.id}
                      style={{ flexGrow: 0, height: 650 }}
                    />
                  )}
                  {/* <ScrollView>
                    <View className="pt-2">
                      {searchedErrand?.map(
                        (errand: MarketData, index: number) => {
                          return (
                            <>
                              <ErrandComp
                                errand={errand}
                                navigation={navig
                                
                                ation}
                                key={index}
                                toggleBidHistoryModal={toggleBidHistoryModal}
                              />
                            </>
                          )
                        },
                      )}
                    </View>
                  </ScrollView> */}
                </View>
              </View>
            </>
          </SafeAreaView>

          <BottomSheetModal
            // backdropComponent={renderBackdrop}
            ref={avatar}
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
            snapPoints={['67%']}
            backdropComponent={renderBackdrop}
          >
            <Content navigation={navigation} />
          </BottomSheetModal>
          <BottomSheetModal
            ref={bottomSheetRef2}
            index={0}
            snapPoints={['80%']}
            containerStyle={{
              marginHorizontal: 10,
            }}
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