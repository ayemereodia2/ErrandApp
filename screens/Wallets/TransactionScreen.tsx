import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  RefreshControl,
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
import TransactionDetails from '../../components/Transactions/TransactionDetails'
import { _fetch } from '../../services/axios/http'
import { Transaction } from '../../types'
import { transformDateTime } from '../../utils/helper'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const TransactionScreen = ({ navigation }: any) => {

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  // const [dateRange, setDateRange] = useState<any>([null, null])
  // const [startDate, endDate] = dateRange
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [filterText, setFilterText] = useState('All Time')
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const [date, setDate] = useState(new Date())
  const [startDate, setStartDate] = useState(new Date('2023-04-1'))
  const [endDate, setEndDate] = useState(new Date())
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)

  const onRefresh = React.useCallback(() => {
    getTransactions()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false })
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined })
  }, [navigation])

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate
    setShowStartDatePicker(false)
    setStartDate(currentDate)
  }

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate
    setShowEndDatePicker(false)
    setEndDate(currentDate)
  }

  const getTransactions = async () => {
    setLoading(true)

    try {
      let url = '/user/transactions'
      if (startDate !== null && endDate !== null) {
        url += `?start_date=${transformDateTime(
          startDate,
        )}&end_date=${transformDateTime(endDate)}`
      }
      const rs = await _fetch({
        method: 'GET',
        _url: url,
      })

      const res = await rs.json()
      setTransactions(res.data)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
      }
    } finally {
      setLoading(false)
    }
  }

  const transactionSearchHandler = (text: string) => {
    const value = text.toLowerCase()
    const searchResult = transactions.filter((t) =>
      t?.description?.toLowerCase().includes(value),
    )
    setTransactions(searchResult)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Transactions',
      headerStyle: { backgroundColor: backgroundTheme },
      headerTitleStyle: {color: textTheme},
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
          {/* <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
                <MaterialIcons name="notifications" color={'black'} size={22} />
              </TouchableOpacity> */}
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={textTheme} size={20} />
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
                onSelect={() => navigation.navigate('Contact')}
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

  useEffect(() => {
    getTransactions()
  }, [startDate, endDate])

  return (
    <SafeAreaView className="bg-[#e4eaf7] h-full" style={{backgroundColor: backgroundTheme}}>
      {/* Heder */}
      <View className="mx-3 mt-3 rounded-lg bg-white" style={{backgroundColor: backgroundTheme}}>
        <View className="bg-[rgb(248,249,252)]">
          <View className="mx-4 flex-row items-center justify-between">
            <View className="mt-6 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center  px-3 w-full">
              <EvilIcons
                name="search"
                size={22}
                className="w-[20px]"
                color={textTheme}
              />
              <TextInput
                className="w-10/12 pl-3"
                placeholder="Search here..."
                placeholderTextColor={textTheme}
                onChangeText={(text) => transactionSearchHandler(text)}
              />
            </View>
          </View>

          <TouchableOpacity style={{backgroundColor: backgroundTheme}}>
            <View className="bg-[#fff] mt-6 mr-2 b rounded-md flex-row justify-center items-center space-x-4" style={{backgroundColor: backgroundTheme}}>
              <View className="h-20">
                <Pressable
                  onPress={() => setShowStartDatePicker(true)}
                  className="text-center flex-row items-center space-x-1 "
                >
                  
                  <FontAwesome
                    className="mr-2"
                    name="calendar"
                    size={20}
                    color={textTheme}
                  />
                  <Text className="" style={{color: textTheme}}>Choose Start Date</Text>
                </Pressable>
                <View className="pt-2">
                  <Text style={{color: textTheme}}> {startDate.toDateString()}</Text>
                  {showStartDatePicker && (
                    <DateTimePicker
                      value={startDate}
                      mode="date"
                      display="default"
                      onChange={onStartDateChange}
                    />
                  )}
                </View>
              </View>
              <Text style={{color: textTheme}}>--</Text>
              <View className="h-20">
                <Pressable
                  onPress={() => setShowEndDatePicker(true)}
                  className="text-center flex-row items-center space-x-1 "
                >
                  <FontAwesome name="calendar" size={20} color={textTheme} />
                  <Text style={{color: textTheme}}>Choose End Date</Text>
                </Pressable>
                <View className="pt-2">
                  <Text style={{color: textTheme}}>{endDate.toDateString()}</Text>
                  {showEndDatePicker && (
                    <DateTimePicker
                      value={endDate}
                      mode="date"
                      display="default"
                      onChange={onEndDateChange}
                    />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Body */}

        {loading ? (
          <ActivityIndicator color="blue" className="pt-4" size="large" />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            showsVerticalScrollIndicator={false}
            className="mx-4"
          >
            <Text className="mt-[34px] text-center" style={{color: textTheme}}>Today</Text>

            {transactions?.slice(0, 5).map((transaction) => {
              return <TransactionDetails {...transaction} />
            })}

            <Text className="mt-[34px] text-center" style={{color: textTheme}}>Yesterday</Text>
            {transactions?.slice(0, 10).map((transaction) => {
              return <TransactionDetails {...transaction} />
            })}

            <Text className="mt-[34px] text-center" style={{color: textTheme}}>Previous Transactions</Text>
            {transactions?.map((transaction) => {
              return <TransactionDetails {...transaction} />
            })}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  )
}

export default TransactionScreen