import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet'
import { AxiosError } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { RadioButton } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import PinModal from '../../components/VerificationModals/PinModal'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { Account } from '../../types'
import { currencyMask, getBankName, parseAmount } from '../../utils/helper'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { ImageBackground } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TextInput } from 'react-native'
const balanceLayer = '../../assets/images/balance-bg.png'

interface WithdrawalProps {
  toggleWithdrawaltModal: (open: boolean) => void
  openPinModal: () => void
  closePinModal: () => void
}

const WithdrawalScreen = ({ toggleWithdrawaltModal }: WithdrawalProps) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          pinSheetRef.current?.dismiss()
          feedBackSheetRef.current?.dismiss()
        }}
      />
    ),
    [],
  )

  const dispatch = useAppDispatch()
  const [accLoading, setAccLoading] = useState(false)
  const [loading, setLoading] = useState(false)

  const [accounts, setAccounts] = useState<Account[]>([])
  const [accountNumber, setAccountNumber] = useState('')
  const [selectedAccount, setSelectedAccount] = useState('')
  const [amount, setAmount] = useState('')
  const pinSheetRef = useRef<BottomSheetModal>(null)
  const feedBackSheetRef = useRef<BottomSheetModal>(null)
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)
  const [showBalance, setShowBalance] = useState(true)
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')



  const { data, loading: detailsLoading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  function openPinModal() {
    pinSheetRef.current?.present()
  }

  function closePinModal() {
    pinSheetRef.current?.dismiss()
  }

  function openFeedbackModal() {
    feedBackSheetRef.current?.present()
  }

  function closeFeedbackModal() {
    feedBackSheetRef.current?.dismiss()
  }

  const fetchAccounts = async () => {
    setAccLoading(true)
    const rs = await _fetch({ method: 'GET', _url: '/user/bank-account' })
    const res = await rs.json()
    setAccounts(res.data)
    setAccLoading(false)
  }
  useEffect(() => {
    fetchAccounts()
  }, [])

  const togglePinModal = () => {
    if (amount !== '' || selectedAccount !== ''){
      openPinModal()
    } else{

      
        setError('Please input an amount or select an Account')
    

      setTimeout( () => {
        setError(' ')
      }, 3000)
    }
    
  }

  const makeWithdrawalHandler = async () => {
    if (amount !== '' || selectedAccount !== ''){

    

    setLoading(true)
    try {
      const rs = await _fetch({
        method: 'POST',
        _url: '/user/withdrawal-request',
        body: {
          amount: parseAmount(amount.toString()) * 100,
          bank_account_id: selectedAccount,
        },
      })

      const _rs = await rs.json()

      if (_rs.success === true) {
        Toast.show({
          type: 'success',
          text1: 'Withdrawal request made successfully',
        })

        toggleWithdrawaltModal(false)
        dispatch(walletAction({ request: 'wallet' }))
        setAmount('')
        openFeedbackModal()
      } else
        Toast.show({
          type: 'error',
          text1: _rs.message,
        })
    } catch (err) {
      if (err instanceof AxiosError) {
        Toast.show({
          type: 'error',
          text1: 'Sorry, something went wrong',
        })
      }
    } finally {
      setLoading(false)
    }

  }
  }

  const navigation = useNavigation()

  return (
   // <SafeAreaView
    //   className="w-full h-screen"
    //   style={{ backgroundColor: backgroundTheme }}
    // >
    //   <ScrollView className="mx-4 mt-2">
    //     <Text style={{ color: textTheme }} className="text-base font-bold">
    //       Make Withdrawal
    //     </Text>

    //     <View className="mt-8">
    //       <Text className="font-medium" style={{ color: textTheme }}>
    //         How much would you like to withdraw?
    //       </Text>
    //     </View>

    //     {/* <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
    //       <Text className="text-lg ">&#x20A6;</Text>

    //       <BottomSheetTextInput
    //         className="w-full"
    //         placeholder="Enter amount"
    //         onChangeText={(e) => setAmount(currencyMask(e))}
    //         value={amount}
    //         keyboardType="decimal-pad"
    //       />
    //     </View> */}

    //     <View className="mt-6">
    //       <Text
    //         className="text-sm text-[#243763] font-semibold pb-1"
    //         style={{ color: textTheme }}
    //       >
    //         Amount
    //       </Text>

    //       <View className="border border-[#E6E6E6] bg-white  text-xs rounded-lg  flex-row space-x-2 justify-center items-center">
    //         <Text className="text-lg pl-1 ">&#x20A6;</Text>

    //         <BottomSheetTextInput
    //           className="w-full"
    //           placeholder="Enter Amount"
    //           onChangeText={(e) => setAmount(currencyMask(e))}
    //           value={amount}
    //           keyboardType="numeric"
    //           style={styles.input}
    //         />
    //       </View>
    //     </View>

    //     <View>
    //       <Text
    //         className="mt-6 font-semibold mb-3"
    //         style={{ color: textTheme }}
    //       >
    //         Select Withdrawal Account
    //       </Text>
    //     </View>

    //     {accLoading ? (
    //       <ActivityIndicator size="small" color="blue" />
    //     ) : (
    //       <>
    //         <View className=" gap-4 pl-4 pt-2">
    //           {accounts?.map((acc, index) => {
    //             return (
    //               <RadioButton.Group
    //                 key={index}
    //                 onValueChange={setSelectedAccount}
    //                 value={selectedAccount}
    //               >
    //                 <TouchableOpacity
    //                   style={{ flexDirection: 'row', alignItems: 'center' }}
    //                   onPress={() => setSelectedAccount(acc.id)}
    //                 >
    //                   <RadioButton value={acc.id} />
    //                   <Text
    //                     className="text-center py-1 font-semibold pr-2"
    //                     style={{ color: textTheme }}
    //                   >
    //                     {getBankName(acc.bank_code)}
    //                   </Text>
    //                   <Text
    //                     className="text-center leading-6"
    //                     style={{ color: textTheme }}
    //                   >
    //                     {acc.account_number}
    //                   </Text>
    //                 </TouchableOpacity>
    //               </RadioButton.Group>
    //             )
    //           })}
    //         </View>
    //         <TouchableOpacity
    //           onPress={togglePinModal}
    //           className="bg-[#1E3A79] w-[210px] h-14 items-center justify-center rounded-md mx-auto mt-4"
    //         >
    //           <Text className="text-white text-center font-medium">
    //             {loading ? (
    //               <ActivityIndicator color="white" size="small" />
    //             ) : (
    //               'Request Withdrawal'
    //             )}
    //           </Text>
    //         </TouchableOpacity>
    //       </>
    //     )}
    //   </ScrollView>

    //   <BottomSheetModal
    //     ref={pinSheetRef}
    //     index={0}
    //     snapPoints={['50%']}
    //     containerStyle={{
    //       marginHorizontal: 10,
    //     }}
    //     backdropComponent={renderBackdrop}
    //   >
    //     <PinModal
    //       verifyPin={true}
    //       withdraw={true}
    //       createErrand={false}
    //       submitErrandhandler={() => {}}
    //       closePinModal={closePinModal}
    //       makeWithdrawalHandler={makeWithdrawalHandler}
    //     />
    //   </BottomSheetModal>

    //   <BottomSheetModal
    //     ref={feedBackSheetRef}
    //     index={0}
    //     snapPoints={['50%']}
    //     containerStyle={{
    //       marginHorizontal: 10,
    //     }}
    //     backdropComponent={renderBackdrop}
    //   >
    //     <View>
    //       <Text style={{ color: textTheme }} className="text-xl text-center">
    //         We will get back to you on your request in 24 hours
    //       </Text>
    //     </View>
    //   </BottomSheetModal>
    // </SafeAreaView>

    <>
    <BottomSheetModalProvider>
    <ScrollView>
       <View className='relatvie mb-48'>

        <View className='w-screen h-[196px] bg-[#09497D] px-4' style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>

          <View className='flex-row items-center justify-between ml-1 mt-[60px] mb-5'>
            <View className='flex-row items-center'>
            <TouchableOpacity
            className=" items-center justify-between mr-3 py-3 "
            onPress={() => navigation.goBack()}
          >
        <Ionicons name="chevron-back-outline" size={24} color="white" />
          </TouchableOpacity>
            <Text className='text-white text-[20px]' style={{fontFamily: 'Chillax'}}> Make Withdrawal Request </Text>

            </View>

            <View className='flex-row items-center'>
            <TouchableOpacity
              // onPress={
              //   // navigation.navigate('Contact')
              //   // openMoreModal
              // }
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
                    currentWalletAmount
                  })
                }}
                className="w-[200px] h-[44px] mt-5 flex-row items-center justify-center border border-[#314B87] rounded-lg"
              >
                <Image source={require('../../assets/images/fund.jpg')}/>
                <Text
                  className="text-center text-base"
                  style={{ color: 'black' }}
                >
                  {' '}
                   <Text>Fund Wallet</Text>
                </Text>
              </TouchableOpacity>
              </ImageBackground>
            </View>
          </ImageBackground>
        </View>
        </View>

        </View>

        <View className='mx-4 mt-5'>

          <View>
          <Text className="text-base text-[#393F42] mb-2" style={{fontFamily: 'Axiforma'}}>Amount</Text>
            <TextInput
              className="border border-[#96A0A5] h-[52px] rounded-[8px] pl-3"
            placeholder="&#x20A6 20,000"
              onChangeText={(e) => setAmount(currencyMask(e))}
              value={amount}
              keyboardType="decimal-pad"
            />
          </View>

          
          <View>
          <Text className="text-sm text-[#393F42] mb-2 mt-6" style={{fontFamily: 'Axiforma'}}>What is it for? <Text className='text-xs'>(Optional)</Text></Text>
            <TextInput
              className="border border-[#96A0A5] h-[52px] rounded-[8px] pl-3"
            placeholder="&#x20A6 20,000"
              onChangeText={(e) => setReason(e)}
              value={reason}
              keyboardType="decimal-pad"
            />
          </View>


          <View>
           <Text
             className="mt-6 font-semibold mb-3"
             style={{ color: textTheme }}
           >
             Select Withdrawal Account
         </Text>
         </View>

          {accLoading ? (
           <ActivityIndicator size="small" color="blue" />
         ) : (
           <>
             <View className=" gap-4 pl-4 pt-2">
               {accounts?.map((acc, index) => {
                 return (
                   <RadioButton.Group
                     key={index}
                     onValueChange={setSelectedAccount}
                     value={selectedAccount}
                   >
                     <TouchableOpacity
                     className='h-[50px] border border-[#393F42] mt-2 mb-6 rounded'
                       style={{ flexDirection: 'row', alignItems: 'center' }}
                       onPress={() => setSelectedAccount(acc.id)}
                     >
                       <RadioButton value={acc.id} />
                       <Text
                         className=" py-1 font-semibold pr-2 text-[#444444] text-base"
                         style={{ color: textTheme, fontFamily: 'Axiforma' }}
                       >
                         {getBankName(acc.bank_code)}
                       </Text>
                       <Text
                         className="text-center leading-6 font-semibold text-base"
                         style={{ color: textTheme }}
                       >
                         {acc.account_number}
                       </Text>
                     </TouchableOpacity>
                   </RadioButton.Group>
                 )
               })}
             </View>
             <TouchableOpacity
               onPress={togglePinModal}
               className="bg-[#1E3A79] w-[280px] h-14 items-center justify-center rounded-md mx-auto mt-4"
             >
               <Text className="text-white text-center font-medium">
                 {loading ? (
                   <ActivityIndicator color="white" size="small" />
                 ) : (
                   'Request Withdrawal'
                 )}
               </Text>
             </TouchableOpacity>
             <Text className='text-red-600 mt-2 mx-auto'>{error}</Text>
           </>
         )}
        
          
        
        </View>
        </ScrollView>

        <BottomSheetModal
         ref={pinSheetRef}
         index={0}
         snapPoints={['50%']}
         containerStyle={{
           marginHorizontal: 10,
         }}
         backdropComponent={renderBackdrop}
       >
         <PinModal
           verifyPin={true}
           withdraw={true}
           createErrand={false}
           submitErrandhandler={() => {}}
           closePinModal={closePinModal}
           makeWithdrawalHandler={makeWithdrawalHandler}
         />
       </BottomSheetModal>
        </BottomSheetModalProvider>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 14,
    lineHeight: 20,
    width: 300,
    padding: 4,
    backgroundColor: '#fff',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
})
export default WithdrawalScreen
