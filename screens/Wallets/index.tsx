import { Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
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
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
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
import Content from '../../components/AboutContent/Content'
import Container from '../../components/Container'
import { ProfileInitials } from '../../components/ProfileInitials'
import EscrowDetails from '../../components/Transactions/EscrowDetails'
import TransactionDetails from '../../components/Transactions/TransactionDetails'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { Transaction } from '../../types'
import { getUserId } from '../../utils/helper'
import AccountStatement from './AccountStatement'
import WithdrawalScreen from './WithdrawalScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

const balanceLayer = '../../assets/images/balance-bg.png'

const WalletScreen = ({ navigation }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const [userId, setUserId] = useState('')
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)

  const walletBalanceSvg = '../../assets/images/walletbalance.svg'

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()
  const [refreshing, setRefreshing] = React.useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const pinSheetRef = useRef<BottomSheetModal>(null)

  const statementRef = useRef<BottomSheetModal>(null)

  function toggleWithdrawaltModal(open: boolean) {
    open ? bottomSheetRef.current?.present() : bottomSheetRef.current?.dismiss()
  }

  function toggleAccountStatementModal(open: boolean) {
    open ? statementRef.current?.present() : statementRef.current?.dismiss()
  }

  function openPinModal() {
    pinSheetRef.current?.present()
  }

  function closePinModal() {
    pinSheetRef.current?.dismiss()
  }

  const [dateRange, setDateRange] = useState<any>([null, null])
  const [startDate, endDate] = dateRange
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [loading, setLoading] = useState(true)
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)
  const [showBalance, setShowBalance] = useState(true)

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
          pinSheetRef.current?.dismiss()
          bottomSheetRef1.current?.dismiss()
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

  function openMoreModal() {
    bottomSheetRef1.current?.present()
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

  useEffect(() => {
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
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
    <>
    
    
      <BottomSheetModalProvider>

      <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            className="bg-[#e4eaf7] h-full mb-20"
            style={{ backgroundColor: backgroundTheme }}
            showsVerticalScrollIndicator={false}
          >


      <View className='relatvie mb-48'>

        <View className='w-screen h-[196px] bg-[#09497D] px-4' style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>

          <View className='flex-row items-center justify-between ml-1 mt-14'>
            <Text className='text-white text-[20px]' style={{fontFamily: 'Chillax'}}>Wallet</Text>

            <View className='flex-row items-center'>
            <TouchableOpacity
              onPress={
                // navigation.navigate('Contact')
                openMoreModal
              }
            >
              <Text className='mr-2' style={{ color: textTheme }}>
              
              <Ionicons
              name="settings-outline"
              size={26}
              color={'white'}
              style={{ marginRight: 7 }}
            />
              </Text>
              </TouchableOpacity>

              <Text style={{ color: textTheme }} className='mr-1'>
              <FontAwesome
                name="bell-o"
                size={24}
                color={'white'}
                onPress={() => {
                  navigation.navigate('Notification')
                }}
              />
            </Text>

            </View>
          </View>

        </View>

        <View className="pt-4 absolute w-screen top-[98px]">
        <View className="px-4">
          <ImageBackground
            source={{ uri: balanceLayer }}
            resizeMode="cover"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <View
              className="w-full  border mt-3 border-[#DAE1F1] rounded-xl mx-auto z-1 "
              style={{
                backgroundColor: theme ? backgroundTheme : 'white',
              }}
            >
              <ImageBackground source={require('../../assets/images/wallet3.png')}
          className=' bg-[#FFF] p-6 rounded-xl'
          resizeMode='repeat'>

              <View className="bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center">
                <Text>
                  <FontAwesome name="bank" size={24} color="#C85604" />
                </Text>
              </View>

              <Text
                className="mt-6 text-[#888] text-base font-medium leading-[24px]"
                style={{ color: 'black' }}
              >
                Account Balance
              </Text>

              <View className='flex-row items-center justify-between'>
              {showBalance ?
               <Text
               className="font-bold text-[32px] mt-2"
               style={{ color: theme ? 'black' : 'black' }}
             >
               {' '}
               ₦
               {Number(data?.balance) === 0
                 ? '0.00'
                 : (Number(data?.balance) / 100).toLocaleString()}
             </Text>
             :
             <Text className="font-bold text-[32px] mt-2">*********</Text>
          }
           

              <TouchableOpacity
                    onPress={() => setShowBalance(!showBalance)}
                    className=""
                  >
                    <Icon
                      name={showBalance ? 'eye-slash' : 'eye'}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={() => {
                  setCurrentWalletAmount(Number(data?.balance) / 100)
                  navigation.navigate('FundWalletModal', {
                    currentWalletAmount,
                  })
                }}
                className="w-[200px] h-[44px] mt-5 items-center justify-center border border-[#314B87] rounded-lg"
              >
                <Text
                  className="text-center text-base"
                  style={{ color: 'black' }}
                >
                  {' '}
                  + <Text>Fund Wallet</Text>
                </Text>
              </TouchableOpacity>
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
        </View>

        </View>


      
          <StatusBar
            backgroundColor={backgroundTheme}
            barStyle={theme ? 'light-content' : 'dark-content'}
          />

         
            {/* <View
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
                  firstName={currentUser?.first_name.charAt(0).toUpperCase()}
                  lastName={currentUser?.last_name.charAt(0).toUpperCase()}
                  profile_pic={currentUser?.profile_picture}
                  textClass="text-white text-base"
                  width={30}
                  height={30}
                />
              </TouchableOpacity>

              <Text
                className="font-bold text-[20px] leading-7"
                style={{ color: textTheme }}
              >
                Wallet
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
              className="flex-row items-center justify-between bg-[#e4eaf7] px-4 mt-2"
              style={{ backgroundColor: backgroundTheme }}
            >
              <Text
                className="font-medium text-xl leading-[29px]"
                style={{ color: textTheme }}
              >
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
                  <View className="bg-[#3F60AC] w-[131px] items-center p-2 rounded-md">
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
            </View> */}

          

            


            <View className="px-4">
              <View className="">
                <ImageBackground source={ require('../../assets/images/wallet2.png')}
                className='bg-[#3F60AC] border mt-4 border-[#DAE1F1]  py-12 px-8 rounded-xl'
                 resizeMode='repeat'>
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
                </ImageBackground>
              </View>


              <View className=" ">
                
                <ImageBackground source={require('../../assets/images/wallet1.png')}
                  className=' bg-black border mt-4 border-[#DAE1F1] rounded-xl  py-12 px-8'
                   resizeMode='repeat'>
                <View className="bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center">
                  <Text>
                    <FontAwesome name="bank" size={24} color="#C85604" />
                  </Text>
                </View>

                <Text className="mt-6 text-white text-base font-medium leading-[24px]">
                  Incoming Funds
                </Text>
                <Text className="font-bold text-white text-[32px] mt-2">
                  ₦
                  {Number(data?.incoming) === 0
                    ? '0.00'
                    : (Number(data?.incoming) / 100).toLocaleString()}
                </Text>
                </ImageBackground>
              </View>
                  
            </View>
            

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

            <View
              className="bg-white mx-4 rounded-lg"
              style={{ backgroundColor: backgroundTheme }}
            >
              {transactions?.slice(0, 5).map((transaction) => {
                return <TransactionDetails {...transaction} />
              })}
            </View>

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
          
       

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={['60%']}
          backdropComponent={renderBackdrop}
        >
          <WithdrawalScreen
            closePinModal={closePinModal}
            openPinModal={openPinModal}
            toggleWithdrawaltModal={toggleWithdrawaltModal}
          />
        </BottomSheetModal>

        <BottomSheetModal
          ref={statementRef}
          index={0}
          snapPoints={['50%']}
          backdropComponent={renderBackdrop}
        >
          <AccountStatement />
        </BottomSheetModal>

        <BottomSheetModal
          // backdropComponent={renderBackdrop}
          ref={bottomSheetRef1}
          index={0}
          snapPoints={['55%']}
          backdropComponent={renderBackdrop}
        >
          <Content navigation={navigation} />
        </BottomSheetModal>

        {/* <BottomSheetModal
            ref={pinSheetRef}
            index={0}
            snapPoints={['50%']}
            containerStyle={{
              marginHorizontal: 10,
            }}
            backdropComponent={renderBackdrop}
          >
            <PinModal
              createErrand={false}
              submitErrandhandler={() => {}}
              closePinModal={closePinModal}
            />
          </BottomSheetModal> */}
          </ScrollView>
      </BottomSheetModalProvider>
    
    </>
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
