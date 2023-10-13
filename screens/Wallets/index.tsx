import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { LinearGradient } from 'expo-linear-gradient'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import {
  ActivityIndicator,
  ImageBackground,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
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
import Container from '../../components/Container'
import EscrowDetails from '../../components/Transactions/EscrowDetails'
import TransactionDetails from '../../components/Transactions/TransactionDetails'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { Transaction } from '../../types'
import AccountStatement from './AccountStatement'
import WithdrawalScreen from './WithdrawalScreen'

const balanceLayer = '../../assets/images/balance-bg.png'

const WalletScreen = ({ navigation }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const walletBalanceSvg = '../../assets/images/walletbalance.svg'

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()
  const [refreshing, setRefreshing] = React.useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const statementRef = useRef<BottomSheetModal>(null)

  function toggleWithdrawaltModal(open: boolean) {
    open ? bottomSheetRef.current?.present() : bottomSheetRef.current?.dismiss()
  }

  function toggleAccountStatementModal(open: boolean) {
    open ? statementRef.current?.present() : statementRef.current?.dismiss()
  }

  const [dateRange, setDateRange] = useState<any>([null, null])
  const [startDate, endDate] = dateRange
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [loading, setLoading] = useState(true)
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)

  const { data, loading: detailsLoading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          statementRef.current?.dismiss()
          bottomSheetRef.current?.dismiss()
        }}
      />
    ),
    [],
  )

  const getTransactions = async () => {
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

  const onRefresh = React.useCallback(() => {
    dispatch(walletAction({ request: 'wallet' }))
    getTransactions()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  useEffect(() => {
    dispatch(walletAction({ request: 'wallet' }))
    getTransactions()
  }, [])

  useEffect(() => {
    setCurrentWalletAmount(Number(data?.balance) / 100)
  }, [data?.balance])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Wallet',
    })
  }, [])

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode)

  if (detailsLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
      >
        <ActivityIndicator color={theme ? '#e4eaf7' : ''} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <BottomSheetModalProvider>
      <Container>
        <>
          <SafeAreaView
            className=" bg-[#e4eaf7]"
            style={{ backgroundColor: backgroundTheme }}
          >
            <ScrollView
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              className="bg-[#e4eaf7] mt-4"
              style={{ backgroundColor: backgroundTheme }}
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-row items-center justify-between bg-[#e4eaf7] px-4 mt-2">
                <Text className="font-medium text-xl leading-[29px]">
                  Overview
                </Text>

                <Menu
                  style={{
                    shadowColor: 'none',
                    shadowOpacity: 0,
                    borderRadius: 30,
                  }}
                >
                  <MenuTrigger>
                    <View
                      className="bg-[#3F60AC] w-[131px] items-center p-2 rounded-md"
                      // onPress={handleQuickLinks}
                    >
                      <View className="flex-row items-center justify-center">
                        <Text className=" text-center text-white">
                          Quick Links{' '}
                        </Text>
                        <Text>
                          <MaterialIcons
                            name="keyboard-arrow-down"
                            size={24}
                            color="white"
                          />
                        </Text>
                      </View>
                    </View>
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{
                      optionWrapper: {
                        marginTop: 20,
                      },
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  >
                    <MenuOption
                      onSelect={() => toggleAccountStatementModal(true)}
                      text="Generate Account Statement"
                      customStyles={{
                        optionWrapper: {
                          paddingVertical: 6,
                        },
                        optionText: {
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: '300',
                        },
                      }}
                    />
                    <MenuOption
                      onSelect={() => toggleWithdrawaltModal(true)}
                      text="Make Withdrawal Request"
                      customStyles={{
                        optionWrapper: {
                          paddingVertical: 6,
                        },
                        optionText: {
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: '300',
                        },
                      }}
                    />
                    <MenuOption
                      onSelect={() => navigation.navigate('WalletAccount')}
                      text="My Accounts"
                      customStyles={{
                        optionWrapper: {
                          paddingVertical: 6,
                        },
                        optionText: {
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: '300',
                        },
                      }}
                    />
                  </MenuOptions>
                </Menu>
              </View>

              <View className="pt-4 ">
                  <View className="px-4">
                  <ImageBackground
                    source={{uri: balanceLayer}}
                    resizeMode="cover"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
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
                        onPress={() => {
                          setCurrentWalletAmount(Number(data?.balance) / 100)
                          navigation.navigate('FundWalletModal', {
                            currentWalletAmount,
                          })
                        }}
                        className="w-[200px] h-[44px] mt-5 items-center justify-center border border-[#314B87] rounded-lg"
                      >
                        <Text className="text-center text-base">
                          {' '}
                          + <Text>Fund Wallet</Text>
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </ImageBackground>
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
                <Text
                  className="text-xl font-medium"
                  style={{ color: textTheme }}
                >
                  Transactions
                </Text>
                <TouchableOpacity
                  className="bg-[#3F60AC] w-[65px] h-[28px] items-center justify-center rounded-md"
                  onPress={() => navigation.navigate('TransactionScreen')}
                >
                  <Text className="text-white">View All</Text>
                </TouchableOpacity>
              </View>

              {/*Transctions info */}
              <View
                className="bg-white mx-4 rounded-lg"
                style={{ backgroundColor: backgroundTheme }}
              >
                {transactions?.slice(0, 5).map((transaction) => {
                  return <TransactionDetails {...transaction} />
                })}
              </View>

              {/* Escrow */}
              <View className="mt-[64px] mb-8 flex-row justify-between items-center mx-4">
                <Text
                  className="text-xl font-medium"
                  style={{ color: textTheme }}
                >
                  Escrow Breakdown
                </Text>

                <TouchableOpacity
                  className="bg-[#3F60AC] w-[65px] h-[28px] items-center justify-center rounded-md"
                  onPress={() => navigation.navigate('EscrowScreen')}
                >
                  <Text className="text-white">View All</Text>
                </TouchableOpacity>
              </View>

              <View
                className="bg-white mx-4 rounded-lg"
                style={{ backgroundColor: backgroundTheme }}
              >
                {data?.escrow_breakdown?.slice(0, 5).map((escrows) => {
                  return <EscrowDetails {...escrows} />
                })}
              </View>
            </ScrollView>
          </SafeAreaView>

          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={['70%']}
            backdropComponent={renderBackdrop}
          >
            <WithdrawalScreen toggleWithdrawaltModal={toggleWithdrawaltModal} />
          </BottomSheetModal>

          <BottomSheetModal
            ref={statementRef}
            index={0}
            snapPoints={['50%']}
            backdropComponent={renderBackdrop}
          >
            <AccountStatement />
          </BottomSheetModal>
        </>
      </Container>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imgBackground: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  linearGradient: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})

export default WalletScreen
