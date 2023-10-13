import { format } from 'date-fns'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Transaction } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const TransactionDetails = (transaction: Transaction) => {

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  // console.log(">>>>>>transaction", transaction);
  const date = format(new Date(transaction.created_at), 'd MMMM')

  return (
    // <SafeAreaView className="mx-4">
      <View className="mx-4 py-4 border-b border-[#CCCCCC]">
        <View className="flex-row justify-between items-center">
          <Text className="text-base font-medium w-44" style={{color: textTheme}}>
            {transaction?.description}
          </Text>
          <Text
            className={`font-bold text-base ${
              transaction.type === 'credit' ? 'text-[#21B06E]' : 'text-red-500'
            }`}
            
          >
            {transaction.type === 'credit' ? '+' : '-'} ₦
            {Number(transaction.amount) === 0
              ? '0.00'
              : (Number(transaction.amount) / 100).toLocaleString()}
          </Text>
        </View>
        <Text className="mt-2 text-base font-medium text-[#808080]" style={{color: textTheme}}>
          {date}
        </Text>
      </View>
    // </SafeAreaView>
  )
}

export default TransactionDetails
