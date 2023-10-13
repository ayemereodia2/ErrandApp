import { AntDesign, Entypo, EvilIcons, FontAwesome } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect } from 'react'
import {
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
import { useSelector } from 'react-redux'
import EscrowDetails from '../../components/Transactions/EscrowDetails'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { EscrowBreakDown } from '../../types'

const EscrowScreen = ({ navigation }: any) => {

  
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()

  const { data, loading: detailsLoading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Escrow Breakdown',
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
    dispatch(walletAction({ request: 'wallet' }))
  }, [])

  return (
    <SafeAreaView style={{backgroundColor: backgroundTheme}} className='h-full'>
      {/* Heder */}

      <View className="bg-[rgb(248,249,252)]">
        <View className="mx-4 flex-row items-center justify-between">
          <View className="mt-6 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
            <EvilIcons
              name="search"
              size={22}
              className="w-1/12"
              color={textTheme}
            />
            <TextInput
              className=" w-9/12"
              placeholder="Search here..."
              placeholderTextColor={textTheme}
            />
          </View>
          <TouchableOpacity>
            <View className="bg-[#fff] mt-6 mr-2 b rounded-md w-[38px]">
              <Text className="p-2 text-center">
                <FontAwesome name="calendar" size={24} color="black" />
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Body */}

      <ScrollView className="mx-4" showsVerticalScrollIndicator={false}>
        <Text className="mt-[34px] text-center" style={{color: textTheme}}>Today</Text>

        {data?.escrow_breakdown?.slice(0, 5).map((escrows: EscrowBreakDown) => {
          return <EscrowDetails {...escrows} />
        })}

        {/* Yesterdy */}

        <Text className="mt-[34px] text-center" style={{color: textTheme}}>Yesterday</Text>

        {data?.escrow_breakdown
          ?.slice(5, 15)
          .map((escrows: EscrowBreakDown) => {
            return <EscrowDetails {...escrows} />
          })}

        <Text className="mt-[34px] text-center" style={{color: textTheme}}>Previous Escrow BreakDown</Text>
        {data?.escrow_breakdown?.map((escrows: EscrowBreakDown) => {
          return <EscrowDetails {...escrows} />
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default EscrowScreen