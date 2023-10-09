import React, { useLayoutEffect, useState } from 'react'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const LandingForm = ({ navigation, route }: any) => {
  const { category } = route.params

  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [firstAddress, setFirstAddress] = useState('')
  const [clicked, setClicked] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: '#F8F9FC' },
      title: 'Quick Errand',
    })
  }, [navigation])

  const handleClicked = () => {
    setClicked(true)
  }
  const handleClose = () => {
    setClicked(false)
  }

  const { data, loading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  return (
    <SafeAreaView className="mx-4 mt-10 ">
      <ScrollView>
        <View className="mt-6 flex-row items-center justify-between mx-3">
          <Text className='font-bold text-[18px] leading-5'>What do you need help with? <Text className='text-base font-normal'>{category.name}</Text></Text>
        </View>

        <View className="px-4 mt-5">
          <Text className="text-sm font-semibold text-[#243763]">
            Description
          </Text>

          <View className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-2 mt-2 rounded-lg px-3">
            <TextInput
              className={'w-full text-sm py-2 mt-2 rounded-lg px-3'}
              placeholder="How do we help you.."
              onChangeText={(e) => setDescription(e)}
              value={description}
              multiline={true}
              numberOfLines={10}
              style={{ height: 100, textAlignVertical: 'top' }}
              keyboardType="default"
            />
          </View>
        </View>

        <View className="px-4 mt-5">
          <Text className="text-sm font-semibold text-[#243763]">Amount</Text>

          <View className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-1 mt-2 rounded-lg px-3">
            <TextInput
              className={'w-full text-sm py-2 mt-2 rounded-lg px-3'}
              placeholder="How much will you like to pay.."
              onChangeText={(e) => setAmount(e)}
              value={amount}
              multiline={true}
              style={{ height: 50, textAlignVertical: 'top' }}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('FundWalletModal')}
            className="flex-row items-center"
          >
            <Text className="ml-2 pt-2 pr-2">Fund Wallet</Text>
            <Text className="text-sm pt-2 font-md">
              ( <Text className="font-bold">Balance:</Text> ₦
              {Number(data?.balance) === 0
                ? '0.00'
                : (Number(data?.balance) / 100).toLocaleString()}
              )
            </Text>
          </TouchableOpacity>

          {/* <View className="mt-4 ml-2">
          <Text className="text-[#FF0000] text-sm font-medium">
            The Budget for this errand is calculated against the current market
            rate and it is currently ₦2,000.{' '}
          </Text>
            </View> */}
        </View>

        <View className="flex-row mt-6 mx-4 items-center ">
          <Text className="text-sm font-semibold text-[#243763]">Address</Text>

          <TouchableOpacity onPress={handleClicked}>
            <Text className="ml-2 text-[25px] text-center"> + </Text>
          </TouchableOpacity>
        </View>

        <View
          className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-1 mt-2 rounded-lg px-3 mx-3"
          style={{ display: clicked ? 'flex' : 'none' }}
        >
          <TextInput
            className={'w-full text-sm py-2 mt-2 rounded-lg px-3'}
            placeholder="Pickup Location"
            onChangeText={(e) => setFirstAddress(e)}
            value={firstAddress}
            multiline={true}
            numberOfLines={2}
            style={{ height: 35, textAlignVertical: 'top' }}
            keyboardType="default"
          />
        </View>
        <TouchableOpacity
          className="bg-white h-8 w-[20%] mt-2 flex-row justify-center items-center rounded-lg border border-red-600 mx-4"
          style={{ display: clicked ? 'flex' : 'none' }}
          onPress={handleClose}
        >
          <Text className="text-red-600">Remove </Text>
        </TouchableOpacity>
      </ScrollView>

      <View className="mt-10">
        <TouchableOpacity className="bg-[#1E3A79] h-16 w-[100%] mt-6 flex-row justify-center items-center rounded-lg ">
          <Text className="text-white text-base text-center">
            {/* {loading ? (
              <ActivityIndicator size="small" color="#000000" />
            ) : (
              'Submit'
            )} */}{' '}
            Post Errand
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default LandingForm
