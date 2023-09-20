import React, { useLayoutEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import Balance from '../../components/Balance'
import Transactions from '../../components/Transactions'

const WalletScreen = ({ navigation }: any) => {
  const [selectedTab, setSelectedItem] = useState('balances')

  console.log('>>>>>selectedTab', selectedTab)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: 'Hello',
    })
  }, [])
  return (
    <ScrollView scrollEventThrottle={40}>
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
