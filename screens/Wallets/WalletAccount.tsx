import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, { useEffect, useLayoutEffect, useMemo, useRef } from 'react'
import {
  ActivityIndicator,
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
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import AddAccount from '../../components/Transactions/AddAccount'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import { getAccounts } from '../../services/wallet/getAccount'

const WalletAccount = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['63%'], [])

  function handleModal() {
    bottomSheetRef.current?.present()
  }

  function closePlaceBid() {
    bottomSheetRef.current?.dismiss()
  }

  const { data, loading: loadingAccount } = useSelector(
    (state: RootState) => state.getAccountsReducer,
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Accounts',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
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
      <SafeAreaView>
        {/* Heder */}

        <View className="bg-[rgb(248,249,252)]">
          <View className="mx-4 flex-row items-center justify-between">
            <View className=" border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
              <EvilIcons
                name="search"
                size={22}
                className="w-1/12"
                color="#808080"
              />
              <TextInput
                className=" w-9/12"
                placeholder="Search here..."
                placeholderTextColor="#808080"
              />
            </View>
            <TouchableOpacity>
              <View className="bg-[#fff] mr-2 b rounded-md w-[38px]">
                <Text className="p-2 text-center">
                  <FontAwesome name="calendar" size={24} color="black" />
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView>
          {/* Body */}

          {/* {loadingAccount ? (
            <ActivityIndicator className="mt-4" size={'large'} color="blue" />
          ) : ( */}
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
                        {/* <Text className="font-bold text-base">
                     {acc.account_name}
                    </Text> */}
                        <Text className="font-medium text-base mt-1">
                          {acc.account_number}
                        </Text>

                        <TouchableOpacity onPress={() => removeBankAcc(acc.id)} className="bg-white border border-[#C82332] rounded-2xl w-[82px] h-[28px] items-center justify-center mt-1">
                          <Text className="text-[#C82332]">Remove</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                )
              })}
            </>
          {/* )} */}

          <TouchableOpacity
            className="bg-[#1E3A79] w-[210px] h-14 items-center justify-center rounded-md mx-auto mt-40"
            onPress={handleModal}
          >
            <View>
              <Text className="text-white text-center font-medium">
                Add Account
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          containerStyle={{ marginHorizontal: 10 }}
        >
          <AddAccount />
        </BottomSheetModal>
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default WalletAccount
