import { AntDesign, EvilIcons, FontAwesome } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import AddAccount from '../../components/Transactions/AddAccount'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import { getAccounts } from '../../services/wallet/getAccount'

const WalletAccount = ({ navigation }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()
  const bottomSheetRef = useRef<BottomSheetModal>(null)

  function toggleAddAccountModal(open: boolean) {
    open ? bottomSheetRef.current?.present() : bottomSheetRef.current?.dismiss()
  }

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => toggleAddAccountModal(false)}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const { data, loading: loadingAccount } = useSelector(
    (state: RootState) => state.getAccountsReducer,
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Accounts',
      headerStyle: { backgroundColor: backgroundTheme },
      headerTitleStyle:{color: textTheme},
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
    })
  }, [])

  useEffect(() => {
    dispatch(getAccounts())
  }, [])

  const removeBankAcc = async (id: string) => {
    try {
      await _fetch({ method: 'DELETE', _url: `/user/bank-account/${id}` })

      Toast.show({
        type: 'success',
        text1: 'Bank account deleted Successfully',
      })
      dispatch(getAccounts())
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{backgroundColor: backgroundTheme}}>
        <ScrollView className="mt-4 h-full" style={{backgroundColor: backgroundTheme}}>
          <View className="bg-[rgb(248,249,252)]">
            <View className="mx-4 mt-4 flex-row items-center justify-between">
              <View className="border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center px-3 w-full space-x-3">
                <EvilIcons
                  name="search"
                  size={22}
                  className="w-1/12"
                  color={textTheme}
                />
                <TextInput
                  className="w-9/12"
                  placeholder="Search here..."
                  placeholderTextColor={textTheme}
                />
              </View>
              {/* <TouchableOpacity>
              <View className="bg-[#fff] mr-2 b rounded-md w-[38px]">
                <Text className="p-2 text-center">
                  <FontAwesome name="calendar" size={24} color="black" />
                </Text>
              </View>
            </TouchableOpacity> */}
            </View>
          </View>

          {loadingAccount ? (
            <ActivityIndicator className="mt-4" size={'large'} color="blue" />
          ) : (
            <>
              {data?.map((acc) => {
                return (
                  <View className="mx-4 mt-10 border-b border-[#CCCCCC] pb-4">
                    <View className="flex-row  mx-4 gap-3  ">
                      <View className="bg-[#FEE1CD] rounded-full h-[60px] w-[60px] justify-center items-center">
                        <Text>
                          <FontAwesome name="bank" size={24} color="black" />
                        </Text>
                      </View>

                      <View>
                        <Text style={{color: textTheme}} className="font-medium text-base mt-1">
                          {acc.account_number}
                        </Text>

                        <TouchableOpacity
                          onPress={() => removeBankAcc(acc.id)}
                          className="bg-white border border-[#C82332] rounded-2xl w-[82px] h-[28px] items-center justify-center mt-1"
                        >
                          <Text className="text-[#C82332]">Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              })}

              <TouchableOpacity
                className="bg-[#1E3A79] w-[210px] h-10 items-center justify-center rounded-md mx-auto mt-4"
                onPress={() => toggleAddAccountModal(true)}
              >
                <Text className="text-white text-center font-medium">
                  Add Account
                </Text>
              </TouchableOpacity>
            </>
          )}

          <View>
            {data === null ? (
              <Text className="text-black text-base text-center mt-4">
                No Account has been added
              </Text>
            ) : (
              ''
            )}
          </View>

          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={['70%']}
            backdropComponent={renderBackdrop}
          >
            <AddAccount toggleAddAccountModal={toggleAddAccountModal} />
          </BottomSheetModal>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default WalletAccount