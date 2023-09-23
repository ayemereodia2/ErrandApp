import { Entypo, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Menu, MenuTrigger } from 'react-native-popup-menu'
import { SafeAreaView } from 'react-native-safe-area-context'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Balance from '../../components/Balance'
import { ProfileInitials } from '../../components/ProfileInitials'
import Transactions from '../../components/Transactions'
import { useAppDispatch } from '../../services/store'
import { getUserId } from '../../utils/helper'

const WalletScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedItem] = useState('balances')
  const [profile, setProfile] = useState(true)
  const [userId, setUserId] = useState('')
  const [errands, setErrands] = useState([])
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const dispatch = useAppDispatch()

  console.log('>>>>>selectedTab', selectedTab)

  useEffect(() => {
    // dispatch(market({}))
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Wallet',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <ProfileInitials
            firstName={firstName.charAt(0).toUpperCase()}
            lastName={lastName.charAt(0).toUpperCase()}
            profile_pic={profilePic}
            textClass="text-white text-base"
            width={40}
            height={40}
          />
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-3 ">
          <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <MaterialIcons name="notifications" color={'black'} size={22} />
          </TouchableOpacity>
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={'black'} size={20} />
            </MenuTrigger>
            {/* <MenuOptions
              customStyles={{
                optionWrapper: {
                  // borderBottomWidth: 0.2,
                  borderBottomColor: '#AAAAAA',
                },
                optionText: { textAlign: 'center', fontWeight: '600' },
              }}
            >
              <MenuOption
                onSelect={() => getMarket()}
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
            </MenuOptions> */}
          </Menu>
        </View>
      ),
    })
  }, [])
  return (
    <SafeAreaView className="m-auto bg-gray-200 w-screen">
      <ScrollView>
        <View className="px-4 mt-4">
          <View className="w-full border-[#243763] border-[0.6px] h-10 rounded-lg flex-row">
            <View
              className={`${
                selectedTab === 'balances'
                  ? 'bg-[#243763] text-white'
                  : 'bg-white'
              }  w-1/2 justify-center items-center text-sm cursor-pointer rounded-lg`}
            >
              <TouchableOpacity onPress={() => setSelectedItem('balances')}>
                <Text
                  className={
                    selectedTab === 'balances' ? 'text-white' : 'text-[#243763]'
                  }
                >
                  Balances
                </Text>
              </TouchableOpacity>
            </View>

            <View
              className={`${
                selectedTab === 'bids' ? 'bg-[#243763] text-white' : 'bg-white'
              } w-1/2 text-sm justify-center items-center cursor-pointer rounded-lg`}
            >
              <TouchableOpacity onPress={() => setSelectedItem('bids')}>
                <Text
                  className={
                    selectedTab === 'bids' ? 'text-white' : 'text-[#243763]'
                  }
                >
                  Transactions
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {selectedTab === 'balances' && <Balance />}
          {selectedTab === 'bids' && <Transactions />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    height: 173,
    width: 355,
    borderRadius: 100,
    overflow: 'hidden',
  },
})

export default WalletScreen
