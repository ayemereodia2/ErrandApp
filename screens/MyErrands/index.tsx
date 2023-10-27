// import { fetchMyErrands } from '@app/lib/errand/api'
import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import Container from '../../components/Container'
import MyErrandCard from '../../components/MyErrandCard'
import { MyErrandEmptyState } from '../../components/MyErrandEmptyState'
import MyErrandToggle from '../../components/MyErrandToggle'
import PostErrandButton from '../../components/PostErrandBtn'
import { ProfileInitials } from '../../components/ProfileInitials'
import { myErrandList } from '../../services/errands/myErrands'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData, SingleSubErrand } from '../../types'
import { getUserId } from '../../utils/helper'

const ErrandScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [searchedErrand, setSearchedErrand] = useState<MarketData[]>([])
  const [profilePic, setProfilePic] = useState('')
  const navigate = useNavigation()
  const [manageErrandClicked, setManageErrandClicked] = useState(false)
  const [userId, setUserId] = useState('')
  const [refreshing, setRefreshing] = React.useState(false)
  const [status, setStatus] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [loadingMore, setLoadingMore] = useState(false)
  const [page, setPage] = useState(1)
  const [checkFilterToggle, setCheckFilterToggle] = useState(false)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const [subErrand, setSubErrand] = useState<SingleSubErrand>({
    id: '',
    original_errand_id: '',
    sender_id: '',
    runner_id: '',
    amount: 0,
    timeline: {
      id: '',
      errand_id: '',
      updates: [],
      created_at: '',
      updated_at: '',
    },
    status: '',
    cancellation_reason: '',
    created_at: '',
    updated_at: '',
  })

  const dispatch = useAppDispatch()
  const layout = useWindowDimensions()

  const { data: myErrands, loading } = useSelector(
    (state: RootState) => state.myErrandReducer,
  )

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
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  // console.log(">>>>>>>myErrands", myErrands);

  const errandSearchHandler = () => {
    const value = searchValue.toLowerCase()

    const searchResult = myErrands.filter((errand) =>
      errand?.description?.toLowerCase().includes(value),
    )
    setSearchedErrand(searchResult)
  }

  function openMoreModal() {
    bottomSheetRef1.current?.present()
  }

  const filterErrandByStatus = (status: string) => {
    setStatus(status)
    if (status === 'all') {
      setSearchedErrand(myErrands)
      return
    }
    const errands = myErrands.filter((errand) => errand.status === status)
    setSearchedErrand(errands)
  }

  const filterBidByStatus = (status: string) => {
    setStatus(status)
    if (status === 'all') {
      setSearchedErrand(myErrands)
      return
    }
    const errands = myErrands.filter(
      (errand) => errand.status === status && userId !== errand.user_id,
    )
    setSearchedErrand(errands)
  }

  // const renderListFooter = () => {
  //   if (checkFilterToggle) {
  //     return null
  //   }
  //   if (!loadMoreData) {
  //     return null
  //   }
  //   return (
  //     <View
  //       style={{
  //         paddingVertical: 20,
  //         borderTopWidth: 1,
  //         borderColor: '#CED0CE',
  //       }}
  //     >
  //       <ActivityIndicator animating size="large" />
  //     </View>
  //   )
  // }

  // const loadMoreData = async () => {
  //   if (!loadingMore) {
  //     const rs = await _fetch({
  //       _url: `/user/errands/?start=${page + 1}&count=5`,
  //       method: 'GET',
  //     })
  //     const _rs = await rs.json()
  //     setSearchedErrand([...searchedErrand, ..._rs.data])
  //     setPage(page + 1)
  //     setLoadingMore(false)
  //   }
  // }

  const onRefresh = React.useCallback(() => {
    dispatch(myErrandList({ setSearchedErrand }))
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  useEffect(() => {
    dispatch(myErrandList({ setSearchedErrand }))
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [])

  useEffect(() => {
    errandSearchHandler()
  }, [searchValue])

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
          <View className="">
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <StatusBar
                backgroundColor={backgroundTheme}
                barStyle={theme ? 'light-content' : 'dark-content'}
              />

              <View
                className={
                  Platform.OS === 'android'
                    ? 'flex-row items-center justify-between mt-6'
                    : 'flex-row items-center justify-between'
                }
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}
                  style={{ marginLeft: 20 }}
                  className="flex-row items-center justify-between my-3"
                >
                  <ProfileInitials
                    firstName={firstName.charAt(0).toUpperCase()}
                    lastName={lastName.charAt(0).toUpperCase()}
                    profile_pic={profilePic}
                    textClass="text-white text-base"
                    width={35}
                    height={35}
                  />
                </TouchableOpacity>

                <Text
                  className="font-bold text-[20px] leading-7"
                  style={{ color: textTheme }}
                >
                  My Errands
                </Text>

                <View className="items-center flex-row gap-4 mr-2">
                  <Text style={{ color: textTheme }}>
                    <FontAwesome
                      name="bell-o"
                      size={24}
                      onPress={() => {
                        navigation.navigate('Notification')
                      }}
                    />
                  </Text>
                  <TouchableOpacity onPress={openMoreModal}>
                    <Text style={{ color: textTheme }}>
                      <Entypo name="dots-three-vertical" size={24} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{ backgroundColor: backgroundTheme }}
                className="bg-[#e4eaf7]"
              >
                {!searchedErrand ? (
                  <MyErrandEmptyState />
                ) : (
                  <>
                    <View>
                      <View
                        // style={{ backgroundColor: backgroundTheme }}
                        className=""
                      >
                        <View
                          className="mx-4 mt-2"
                          // style={{ backgroundColor: theme ? '#1E3A79' : 'white' }}
                        >
                          <View
                            className="border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3"
                            style={{
                              backgroundColor: theme ? '#1E3A79' : 'white',
                            }}
                          >
                            <EvilIcons
                              name="search"
                              size={22}
                              className="w-1/12"
                              color={theme ? 'white' : 'black'}
                            />
                            <TextInput
                              className=" w-9/12"
                              placeholder="Search for Errands or Bids"
                              placeholderTextColor={theme ? 'white' : '#808080'}
                              onChangeText={(text) => setSearchValue(text)}
                              style={{
                                backgroundColor: theme ? '#1E3A79' : 'white',
                                color: theme ? 'white' : '#808080',
                              }}
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
                            {/* <Image
                            style={{
                              width: 30,
                              height: 30,
                              resizeMode: 'contain',
                            }}
                            source={require('../../assets/images/filter.png')}
                          /> */}
                          </View>
                        </View>

                        <MyErrandToggle
                          filterBidByStatus={filterBidByStatus}
                          filterErrandByStatus={filterErrandByStatus}
                        />
                      </View>

                      {searchedErrand?.length === 0 && (
                        <Text
                          style={{
                            color: theme ? 'white' : '#808080',
                          }}
                          className="text-xs text-center pt-3"
                        >
                          No {status} Errands at the moment
                        </Text>
                      )}

                      <ScrollView className="mt-2">
                        <>
                          {searchedErrand?.map((errand, index) => {
                            return (
                              <View key={index}>
                                <MyErrandCard
                                  index={index}
                                  errand={errand}
                                  navigation={navigation}
                                  setManageErrandClicked={
                                    setManageErrandClicked
                                  }
                                  setSubErrand={setSubErrand}
                                  user_id={userId}
                                />
                              </View>
                            )
                          })}
                        </>
                      </ScrollView>

                      {/* <FlatList
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
                              <MyErrandCard
                                index={index}
                                errand={item}
                                navigation={navigation}
                                setManageErrandClicked={setManageErrandClicked}
                                setSubErrand={setSubErrand}
                                user_id={userId}
                              />
                            </>
                          )
                        }}
                        keyExtractor={(item) => item.id}
                        style={{ flexGrow: 0, height: 650 }}
                      /> */}
                    </View>
                    {/* )} */}
                  </>
                )}
              </View>
            </ScrollView>
          </View>

          <BottomSheetModal
            // backdropComponent={renderBackdrop}
            ref={bottomSheetRef1}
            index={0}
            snapPoints={['45%']}
            backdropComponent={renderBackdrop}
          >
            <Content navigation={navigation} />
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </Container>

      <PostErrandButton className="bottom-20 right-3" />
    </>
  )
}

export default ErrandScreen
