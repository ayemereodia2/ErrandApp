import Checkbox from 'expo-checkbox'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../../services/store'
import { walletAction } from '../../services/wallet/walletBalance'
import { PostErrandData } from '../../types'
import { currencyMask } from '../../utils/helper'

interface FinanceProp {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  handleInputChange: any
  postErrandData: PostErrandData
  toggleFundWalletModal: any
  navigation: any
  financeError: string
}

const CreateErrandFinance = ({
  setActiveStep,
  handleInputChange,
  postErrandData,
  toggleFundWalletModal,
  navigation,
  financeError,
}: FinanceProp) => {
  const dispatch = useAppDispatch()
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)

  const [clicked, setClicked] = useState(false)

  const { data, loading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  const handleClicked = () => {
    setClicked(!clicked)
  }

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  useEffect(() => {
    dispatch(walletAction({ request: 'wallet' }))
  }, [])

  const insuranceRestrictions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]

  return (
    <>
      {/* Header */}

      <ScrollView>
        <View className="flex-row mt-[38px] items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">4</Text>
          </View>
          <Text
            style={{ color: textTheme }}
            className="font-semibold text-[#243763] text-base"
          >
            Errand Finance
          </Text>
        </View>

        <View className="px-4  mt-5">
          <Text
            style={{ color: textTheme, fontFamily: 'Axiforma' }}
            className="text-[#6D6D6D] text-base "
          >
            Kindly provide the financial plan for this request regarding the
            budget of the request
          </Text>
        </View>

        <View className="mt-5 ml-4">
          <Text
            style={{ color: '#393F42', fontFamily: 'Axiforma' }}
            className="text-[#243763] text-base"
          >
            What is your budget for this errand?
          </Text>

          {financeError && <Text className="text-red-500">{financeError}</Text>}
        </View>

        <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2 mx-4">
          <Text className="text-lg ">&#x20A6;</Text>

          <TextInput
            className="w-full"
            placeholder="Enter your Budget Amount"
            // onChangeText={(e) => setAmount(currencyMask(e))}
            onChangeText={(text) =>
              handleInputChange(currencyMask(text), 'budget')
            }
            keyboardType="number-pad"
            defaultValue={postErrandData.budget.toString()}
          />
        </View>

        {/* <TextInput
          className="md:w-[390px] mt-2 p-2 h-[50px] b rounded-md mx-[16px] bg-[#E6E6E6]"
          placeholder="Enter your Budget Amount"
          placeholderTextColor={'#B3B3B3'}
          onChangeText={(text) => handleInputChange(text, 'budget')}
          keyboardType="number-pad"
          defaultValue={postErrandData.budget.toString()}
        /> */}
        <View className="flex-row items-center justify-between mr-4">
          <View className="flex-row items-center">
            <View className="border py-1 border-amber-50 shadow-lg bg-slate-300 ml-4 rounded-md mt-2 mr-2 ">
              <Text className="ml-4  pr-2" style={{ color: textTheme }}>
                Fund Wallet
              </Text>
            </View>

            <Text style={{ color: textTheme }} className="text-sm pt-2 font-md">
              ( ₦
              {Number(data?.balance) === 0
                ? '0.00'
                : (Number(data?.balance) / 100).toLocaleString()}
              )
            </Text>
          </View>

          {/* <TouchableOpacity
          onPress={() => {
            setCurrentWalletAmount(Number(data?.balance) / 100)
            navigation.navigate('FundWalletModal', [currentWalletAmount])
          }}
          className="flex-row items-center"
        >
          <Text className='text-[#09497D] text-sm' style={{fontFamily: 'Axiforma'}}>Fund Wallet</Text>
        </TouchableOpacity> */}
        </View>

        {/* <View className="mt-4 ml-4">
          <Text
            style={{ color: textTheme }}
            className="text-[#FF0000] text-sm font-medium"
          >
            The Budget for this errand is calculated against the current market
            rate and it is currently ₦2,000.{' '}
          </Text>
        </View> */}

        <View className="flex-row items-center mt-10 ml-4">
          <Checkbox
            value={clicked}
            onValueChange={handleClicked}
            className="mr-2"
          />

          <Text
            className="text-[16px]"
            style={{ color: '#0C426F', fontFamily: 'Axiforma' }}
          >
            Insurance
          </Text>
        </View>

        <View
          className="px-4 mt-4"
          style={{ display: clicked ? 'flex' : 'none' }}
        >
          <Text
            style={{ color: '#393F42', fontFamily: 'Axiforma' }}
            className=" overflow-auto font-normal leading-[24px] text-base"
          >
            Setting an insurance value on your errand forces bidders to have
            that value in their wallet before they can bid for your errand. The
            value is then held by SWAVE until the errand is completed in order
            to secure your valuables. Use this option carefully as it will
            likely limit the number of bids you receive on this errand.
          </Text>
        </View>

        <View className="px-4">
          <View className="mt-[25px]">
            <Text
              style={{ color: '#393F42', fontFamily: 'Axiforma' }}
              className="text-base"
            >
              Restrict Errand by Insurance
            </Text>
          </View>
          {/* <SelectDropdown
            defaultValue={postErrandData.insurance}
            data={['Yes', 'No']}
            buttonStyle={style.restrictInput}
            onSelect={(selectedItem, index) => {
              handleInputChange(selectedItem, 'insurance')
            }}
          /> */}

          <Dropdown
            style={style.dropdown}
            placeholderStyle={style.placeholderStyle}
            selectedTextStyle={style.selectedTextStyle}
            inputSearchStyle={style.inputSearchStyle}
            iconStyle={style.iconStyle}
            data={insuranceRestrictions}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'No'}
            value={postErrandData.insurance}
            onChange={(item) => {
              handleInputChange(item.label, 'insurance')
            }}
          />
        </View>

        {postErrandData.insurance === 'Yes' ? (
          <>
            <View className="mt-[41px] px-4">
              <Text style={{ color: textTheme }} className="text-[#243763]">
                How much insurance amount do you require from Bidders for this
                errand?
              </Text>
            </View>
            <View className="border border-[#E6E6E6] bg-[#F5F5F5]  text-xs py-2 mt-2 rounded-lg px-3 flex-row space-x-2 mx-4">
              <Text className="text-lg ">&#x20A6;</Text>

              <TextInput
                className="w-full"
                placeholder="Enter your Insurance Amount"
                onChangeText={(text) => handleInputChange(text, 'ins_amount')}
                keyboardType="number-pad"
                defaultValue={postErrandData.budget.toString()}
              />
            </View>
          </>
        ) : (
          ''
        )}
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
  dropdown: {
    margin: 4,
    height: 45,
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 6,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 4,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
    fontSize: 16,
    paddingVertical: 0,
  },
})

export default CreateErrandFinance
