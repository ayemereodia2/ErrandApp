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
import { useNavigation } from '@react-navigation/native'
// import { ScrollView } from 'native-base'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Container from '../../components/Container'
import ErrandComp, { ListErrandComp } from '../../components/ErrandComponent'
import Filter from '../../components/Filter/Filter'
import PostErrandButton from '../../components/PostErrandBtn'
import { errandMarketList, setLoading } from '../../services/errands/market'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getUserId } from '../../utils/helper'
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import BidHistory from '../../components/Modals/Bids/BidHistory'
import UserInfo from '../../components/UserInfo/UserInfo'


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
  const [toggleView, setToggleView] = useState(true)
  const [searchedErrand, setSearchedErrand] = useState<MarketData[]>([])

  const [userData, setUserData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)



  const handleViewChange = () => {
    setToggleView(!toggleView)
  }


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

  const bidHistoryRef = useRef<BottomSheetModal>(null)

  function toggleBidHistoryModal(open: boolean, user) {
    if (open) {
      setUserData(user);
      setModalOpen(true);
      bidHistoryRef.current?.present();
     
    } else {
      setUserData(null);
      bidHistoryRef.current?.dismiss();
    }
  }
  

  const handleFilter = () => {
    setFilterOn(!filterOn)
  }
  const { data: errands, loading } = useSelector(
    (state: RootState) => state.errandMarketListReducer,
  )

  const errandSearchHandler = (text: string) => {
    const value = text.toLowerCase()

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

  const filterMarketList = () => {
    dispatch(
      errandMarketList({
        setSearchedErrand,
        category: value,
        minPrice: minCheck ? low : 0,
        maxPrice: minCheck ? high : 0,
      }),
    )
  }

  useEffect(() => {
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
    dispatch(errandMarketList({ setSearchedErrand }))
    dispatch(getCategoriesList())
  }, [])

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
        <ActivityIndicator color={userId ? 'white' : 'blue'} size="large" />
      </SafeAreaView>
    )
  }


  return (
    <>
   
      <Container>
      <BottomSheetModalProvider>
        <SafeAreaView style={{backgroundColor: modalOpen ? 'black' : 'none'}}>
        <StatusBar backgroundColor={backgroundTheme} barStyle={theme ? "light-content" : 'dark-content'} />

          <ScrollView
            style={{ backgroundColor: backgroundTheme }}
            scrollEventThrottle={16}
            className={theme ? 'bg-[#e4eaf7]' : '#e9ebf2'}
            refreshControl={
              <RefreshControl
                // tintColor="white"
                // colors={['white']}
                // style={{ backgroundColor: 'white' }}
                refreshing={refreshing}
                onRefresh={onRefresh}
              />
            }
          >
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
                      className="mt-6 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3 bg-white"
                      style={{ backgroundColor: theme ? '#1E3A79' : 'white' }}
                    >
                      <EvilIcons
                        name="search"
                        size={22}
                        className="w-1/12"
                        color={theme ? 'white' : '#808080'}
                      />
                      <TextInput
                        className=" w-8/12"
                        placeholder="Search for Errands"
                        placeholderTextColor={theme ? 'white' : '#808080'}
                        onChangeText={(text) => errandSearchHandler(text)}
                      />
                      <TouchableOpacity onPress={handleViewChange}>
                        <View className="mr-1 b rounded-md w-[38px]">
                          <Text className="p-2 text-center">
                            {toggleView ? (
                              <Feather
                                name="list"
                                size={20}
                                color={theme ? 'white' : 'black'}
                              />
                            ) : (
                              <MaterialCommunityIcons
                                name="view-dashboard"
                                size={20}
                                color={theme ? 'white' : 'black'}
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

                  <View className="pt-2">
                    {searchedErrand?.map(
                      (errand: MarketData, index: number) => {
                        return (
                          <>
                            {toggleView ? (
                              <ErrandComp
                                errand={errand}
                                navigation={navigation}
                                key={index}
                                toggleBidHistoryModal={toggleBidHistoryModal}
                                
                              />
                            ) : (
                              <ListErrandComp
                                errand={errand}
                                navigation={navigation}
                                key={index}
                                toggleBidHistoryModal={toggleBidHistoryModal}
                                
                              />
                            )}
                          </>
                        )
                      },
                    )}
                  </View>
                </View>
              </View>
            </>
            {/* )} */}
          </ScrollView>

          {!loading && <PostErrandButton className="bottom-5 right-3" />}
        </SafeAreaView>

        <BottomSheetModal
          // backdropComponent={renderBackdrop}
          ref={bidHistoryRef}
          index={0}
          snapPoints={['70%']}
        >
         <UserInfo
          user={userData}
          navigation={navigation}
         
         />
         
        </BottomSheetModal>
      </BottomSheetModalProvider>
      </Container>

  
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
