import {
  Entypo,
  EvilIcons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useSelector } from 'react-redux'
import EscrowDetails from '../../components/Transactions/EscrowDetails'
import TransactionDetails from '../../components/Transactions/TransactionDetails'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { Transaction } from '../../types'

const WalletScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [showQuickLinks, setShowQuickLinnks] = useState(false)

  const handleQuickLinks = () => {
    setShowQuickLinnks(!showQuickLinks)
  }

  const [dateRange, setDateRange] = useState<any>([null, null])
  const [startDate, endDate] = dateRange
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [filterText, setFilterText] = useState('All Time')
  const [loading, setLoading] = useState(true)

  const { data, loading: detailsLoading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  const getTransactions = async () => {
    // const params = {
    //   start_date: transformDateTime(startDate),
    //   end_date: transformDateTime(endDate),
    // }

    // console.log(">>>>>>>statss");

    try {
      if (startDate === null || endDate === null) {
        const rs = await _fetch({
          method: 'GET',
          _url: '/user/transactions',
        })

        const res = await rs.json()

        setTransactions(res.data)

        return
      }
      const rs = await _fetch({
        method: 'GET',
        _url: '/user/transactions',
        // body: params,
      })

      const res = await rs.json()
      setTransactions(res.data.data)
    } catch (err) {
      if (err instanceof Error) {
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    dispatch(walletAction({ request: 'wallet' }))
    getTransactions()
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Wallet',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <EvilIcons name="navicon" size={24} color="black" />
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
          {/* <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <MaterialIcons name="notifications" color={'black'} size={22} />
          </TouchableOpacity> */}
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
                // onSelect={}
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
  }, [])

  return (
    <SafeAreaView className=" bg-[#F8F9FC]">
      <ScrollView
        className="bg-[#F8F9FC] mt-4"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row items-center justify-between bg-[#F8F9FC] px-4 mt-2">
          <Text className="font-medium text-xl leading-[29px]">Overview</Text>

          <TouchableOpacity
            className="bg-[#3F60AC] w-[131px] items-center p-2 rounded-md"
            onPress={handleQuickLinks}
          >
            <View className="flex-row items-center justify-center">
              <Text className="text-white text-center">Quick Links </Text>
              <Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color="white"
                />
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="relative ">
          {/* THE SECTION FOR THE DROPDOWN FOR QUICKLINKS */}
          <View
            className="ml-44 bg-white justify-end items-center absolute top-2 left-1 z-10 shadow-xl"
            style={{ display: showQuickLinks ? 'flex' : 'none' }}
          >
            <TouchableOpacity className="border-b border-b-[#E6E6E6] py-3 px-2">
              <Text className="">Generate Account Statement</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="border-b border-b-[#E6E6E6] py-3 px-2"
              onPress={() => navigation.navigate('WithdrawalScreen')}
            >
              <Text className="">Make Withdrawal Request</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              className="border-b border-b-[#E6E6E6] py-3 px-2"
              onPress={() => navigation.navigate('AccountStatement')}
            >
              <Text className="">View Withdrawal Requests</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              className=" border-b-[#E6E6E6] py-3 px-2"
              onPress={() => navigation.navigate('WalletAccount')}
            >
              <Text className="">My Accounts</Text>
            </TouchableOpacity>
          </View>

          <View className="px-4">
            <View className="w-full bg-[#FFF] border mt-3 border-[#DAE1F1] rounded-xl p-6 mx-auto z-1 ">
              <View className="bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center">
                <Text>
                  <FontAwesome name="bank" size={24} color="#C85604" />
                </Text>
              </View>

              <Text className="mt-6 text-[#888] text-base font-medium leading-[24px]">
                Account Balance
              </Text>
              <Text className="font-bold text-[32px] mt-2">
                {' '}
                ₦
                {Number(data?.balance) === 0
                  ? '0.00'
                  : (Number(data?.balance) / 100).toLocaleString()}
              </Text>

              <TouchableOpacity
                onPress={() => navigation.navigate('FundWalletModal')}
                className="w-[200px] h-[44px] mt-5 items-center justify-center border border-[#314B87] rounded-lg"
              >
                <Text className="text-center text-base">
                  {' '}
                  + <Text>Fund Wallet</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* THE END OF QUICKLINKS DROPDOWN */}
        </View>
        {/* Account Balance */}
        <View className="px-4">
          {/* Escrow Balance */}
          <View className=" bg-[#3F60AC] border mt-4 border-[#DAE1F1] rounded-xl p-6">
            <View className="bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center">
              <Text>
                <FontAwesome name="bank" size={24} color="#C85604" />
              </Text>
            </View>

            <Text className="mt-6 text-[#fff] text-base font-medium leading-[24px]">
              Escrow Account
            </Text>
            <Text className="font-bold text-[32px] text-white mt-2">
              ₦
              {Number(data?.escrow) === 0
                ? '0.00'
                : (Number(data?.escrow) / 100).toLocaleString()}
            </Text>
          </View>

          {/* Incoming Funds */}

          <View className="bg-[#FFB536] border mt-4 border-[#DAE1F1] rounded-xl p-6">
            <View className="bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center">
              <Text>
                <FontAwesome name="bank" size={24} color="#C85604" />
              </Text>
            </View>

            <Text className="mt-6 text-black text-base font-medium leading-[24px]">
              Incoming Funds
            </Text>
            <Text className="font-bold text-black text-[32px] mt-2">
              ₦
              {Number(data?.incoming) === 0
                ? '0.00'
                : (Number(data?.incoming) / 100).toLocaleString()}
            </Text>
          </View>
        </View>

        {/* Transction */}
        <View className="mt-[64px] mb-8 flex-row justify-between items-center mx-4">
          <Text className="text-xl font-medium">Transactions</Text>

          <TouchableOpacity
            className="bg-[#3F60AC] w-[65px] h-[28px] items-center justify-center rounded-md"
            onPress={() => navigation.navigate('TransactionScreen')}
          >
            <Text className="text-white">View All</Text>
          </TouchableOpacity>
        </View>

        {/*Transctions info */}
        {transactions?.slice(0, 5).map((transaction) => {
          return <TransactionDetails {...transaction} />
        })}

        {/* Escrow */}
        <View className="mt-[64px] mb-8 flex-row justify-between items-center mx-4">
          <Text className="text-xl font-medium">Escrow Breakdown</Text>

          <TouchableOpacity
            className="bg-[#3F60AC] w-[65px] h-[28px] items-center justify-center rounded-md"
            onPress={() => navigation.navigate('EscrowScreen')}
          >
            <Text className="text-white">View All</Text>
          </TouchableOpacity>
        </View>

        {data?.escrow_breakdown?.slice(0, 5).map((escrows) => {
          return <EscrowDetails {...escrows} />
        })}

        {/*Escrow info */}
        {/* <EscrowDetails /> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default WalletScreen
