// import { fetchMyErrands } from '@app/lib/errand/api'
import { EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Container from '../../components/Container'
import MyErrandCard from '../../components/MyErrandCard'
import { MyErrandEmptyState } from '../../components/MyErrandEmptyState'
import MyErrandToggle from '../../components/MyErrandToggle'
import PostErrandButton from '../../components/PostErrandBtn'
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

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  // console.log(">>>>>>>myErrands", myErrands);

  const errandSearchHandler = (text: string) => {
    const value = text.toLowerCase()

    const searchResult = myErrands.filter((errand) =>
      errand?.description?.toLowerCase().includes(value),
    )
    setSearchedErrand(searchResult)
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

  return (
    <Container>
      <>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <View
            style={{ backgroundColor: backgroundTheme }}
            className="bg-[#e4eaf7]"
          >
            {!searchedErrand ? (
              <MyErrandEmptyState />
            ) : (
              <>
                {loading && <ActivityIndicator color="blue" size="large" />}
                <View>
                  <View>
                    <View
                      style={{ backgroundColor: backgroundTheme }}
                      className="bg-[#e4eaf7] "
                    >
                      <View className="mx-4 mt-4 bg-white">
                        <View className="border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
                          <EvilIcons
                            name="search"
                            size={22}
                            className="w-1/12"
                          />
                          <TextInput
                            className=" w-9/12"
                            placeholder="Search for Errands or Bids"
                            placeholderTextColor="#808080"
                            onChangeText={(text) => errandSearchHandler(text)}
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
                      </View>
                    </View>

                    <MyErrandToggle
                      filterBidByStatus={filterBidByStatus}
                      filterErrandByStatus={filterErrandByStatus}
                    />
                  </View>

                  {searchedErrand?.length === 0 && (
                    <Text className="text-xs text-center pt-3">
                      No {status} Errands at the moment
                    </Text>
                  )}

                  <ScrollView className="mt-6">
                    {searchedErrand?.map((errand, index) => {
                      return (
                        <View key={index}>
                          <MyErrandCard
                            index={index}
                            errand={errand}
                            navigation={navigation}
                            setManageErrandClicked={setManageErrandClicked}
                            setSubErrand={setSubErrand}
                            user_id={userId}
                          />
                        </View>
                      )
                    })}
                  </ScrollView>
                </View>
                {/* )} */}
              </>
            )}
          </View>
        </ScrollView>

        {!loading && <PostErrandButton className="bottom-5 right-3" />}
      </>
    </Container>
  )
}

export default ErrandScreen
