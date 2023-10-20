import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet'
import { AxiosError } from 'axios'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
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
    if (amount === '' || selectedAccount === '') return
    openPinModal()
  }

  const makeWithdrawalHandler = async () => {
    if (amount === '' || selectedAccount === '') return

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

  return (
    <SafeAreaView
      className="w-full h-full"
      style={{ backgroundColor: backgroundTheme }}
    >
      <ScrollView className="mx-4 mt-2">
        <Text style={{ color: textTheme }} className="text-base">
          Make Withdrawal
        </Text>

        <View className="mt-8">
          <Text className="font-medium" style={{ color: textTheme }}>
            How much would you like to withdraw?
          </Text>
        </View>

        {/* <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2">
          <Text className="text-lg ">&#x20A6;</Text>

          <BottomSheetTextInput
            className="w-full"
            placeholder="Enter amount"
            onChangeText={(e) => setAmount(currencyMask(e))}
            value={amount}
            keyboardType="decimal-pad"
          />
        </View> */}

        <View className="mt-6">
          <Text
            className="text-sm text-[#243763] font-semibold pb-1"
            style={{ color: textTheme }}
          >
            Amount
          </Text>

          <View className="border border-[#E6E6E6] bg-white  text-xs rounded-lg  flex-row space-x-2 justify-center items-center">
            <Text className="text-lg pl-1 ">&#x20A6;</Text>

            <BottomSheetTextInput
              className="w-full"
              placeholder="Enter Amount"
              onChangeText={(e) => setAmount(currencyMask(e))}
              value={amount}
              keyboardType="numeric"
              style={styles.input}
            />
          </View>
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
                      style={{ flexDirection: 'row', alignItems: 'center' }}
                      onPress={() => setSelectedAccount(acc.id)}
                    >
                      <RadioButton value={acc.id} />
                      <Text
                        className="text-center py-1 font-semibold pr-2"
                        style={{ color: textTheme }}
                      >
                        {getBankName(acc.bank_code)}
                      </Text>
                      <Text
                        className="text-center leading-6"
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
              onPress={() => togglePinModal()}
              className="bg-[#1E3A79] w-[210px] h-14 items-center justify-center rounded-md mx-auto mt-4"
            >
              <Text className="text-white text-center font-medium">
                {loading ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  'Request Withdrawal'
                )}
              </Text>
            </TouchableOpacity>
          </>
        )}
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

      <BottomSheetModal
        ref={feedBackSheetRef}
        index={0}
        snapPoints={['50%']}
        containerStyle={{
          marginHorizontal: 10,
        }}
        backdropComponent={renderBackdrop}
      >
        <View>
          <Text style={{ color: textTheme }} className="text-xl text-center">
            We will get back to you on your request in 24 hours
          </Text>
        </View>
      </BottomSheetModal>
    </SafeAreaView>
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
