import React, { useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { PostErrandData } from '../../types'

interface FinanceProp {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  handleInputChange: any
  postErrandData: PostErrandData
  toggleFundWalletModal: any
  navigation: any
}

const CreateErrandFinance = ({
  setActiveStep,
  handleInputChange,
  postErrandData,
  toggleFundWalletModal,
  navigation,
}: FinanceProp) => {
  const dispatch = useAppDispatch()

  const { data, loading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  useEffect(() => {
    dispatch(walletAction({ request: 'wallet' }))
  }, [])

  return (
    <>
      {/* Header */}

      <ScrollView>
        <View className="flex-row mt-[38px] items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#6604C8] b rounded-full justify-center items-center">
            <Text className="text-white mx-auto">4</Text>
          </View>
          <Text className="font-semibold text-[#243763] text-base">
            Errand Finances
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text className="text-[#777777] text-center">
            In this section, you can set the financial plan for this request
            regarding the budget of the request
          </Text>
        </View>

        <View className="mt-[41px] ml-4">
          <Text className="text-[#243763]">
            What is your budget for this errand?
          </Text>
        </View>
        <TextInput
          className="md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter your Budget Amount"
          placeholderTextColor={'#B3B3B3'}
          onChangeText={(text) => handleInputChange(text, 'budget')}
          keyboardType="number-pad"
          defaultValue={postErrandData.budget.toString()}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('FundWalletModal')}
          className="flex-row items-center"
        >
          <Text className="ml-4 pt-2 pr-2">Fund Wallet</Text>
          <Text className="text-sm pt-2 font-md">
            ( <Text className="font-bold">Balance:</Text> ₦
            {Number(data?.balance) === 0
              ? '0.00'
              : (Number(data?.balance) / 100).toLocaleString()}
            )
          </Text>
        </TouchableOpacity>

        <View className="mt-4 ml-4">
          <Text className="text-[#FF0000] text-sm font-medium">
            The Budget for this errand is calculated against the current market
            rate and it is currently ₦2,000.{' '}
          </Text>
        </View>

        <View className="mt-10 ml-4 ">
          <Text className="text-[#243763] font-semibold text-[20px]">
            Insurance
          </Text>
        </View>
        <View className="px-4 mt-4">
          <Text className="text-[#243763] overflow-auto font-normal leading-[24px] text-sm">
            Setting an Insurance value on your errand forces bidders to have
            that value in their wallet before they can bid for your errand. The
            value is then held by GOFER until the errand is completed in order
            to secure your valuables.. Use this option carefully as it will
            likely limit the number of bids you receive on this errand
          </Text>
        </View>

        <View className="space-x-6 px-4">
          <View className="mt-[40px]">
            <Text>Restrict Errand by Insurance</Text>
          </View>
          <SelectDropdown
            defaultValue={postErrandData.insurance}
            data={['Yes', 'No']}
            buttonStyle={style.restrictInput}
            onSelect={(selectedItem, index) => {
              handleInputChange(selectedItem, 'insurance')
            }}
          />
        </View>

        <View className="mt-[41px] px-4">
          <Text className="text-[#243763]">
            How much insurance amount do you require from Bidders for this
            errand?
          </Text>
        </View>
        <TextInput
          className="md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter your Insurance Amount"
          placeholderTextColor={'#B3B3B3'}
          onChangeText={(text) => handleInputChange(text, 'ins_amount')}
          keyboardType="number-pad"
          defaultValue={postErrandData.ins_amount?.toString()}
        />
      </ScrollView>
    </>
  )
}

const style = StyleSheet.create({
  dropdownInput: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    width: 170,
    borderColor: '#E6E6E6',
    borderWidth: 1,
  },
  restrictInput: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
    width: 'auto',
    backgroundColor: '#F5F5F5',
    borderColor: '#E6E6E6',
    borderWidth: 1,
  },
})

export default CreateErrandFinance
