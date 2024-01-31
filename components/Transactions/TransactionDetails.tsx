import { format } from 'date-fns'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { Transaction } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { formatDate } from '../../utils/helper'
import { Feather } from '@expo/vector-icons'

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
          <View className='flex-row items-center'>

            {
              transaction.type === 'credit' ?
              <Text className='mr-2'>
            <Feather name="arrow-up-circle" size={33} color="#15D244" />
            </Text>
            :
            <Text className='mr-2'>
            <Feather name="arrow-down-circle" size={33} color="#C82332" />
            </Text>
            }
            

          <View>
          <Text className="text-sm font-medium w-44" style={{color: textTheme, fontFamily: 'Axiforma'}}>
          {transaction?.description}
          </Text>

          <Text className="mt-2 text-xs font-medium text-[#888888]" style={{fontFamily: 'Axiforma'}}>
          {date}
        </Text>

          </View>
          

          </View>
          
          <Text
            className={`font-bold text-base ${
              transaction.type === 'credit' ? 'text-[#21B06E]' : 'text-red-500'
            }`}
            
          >
             ₦
            {Number(transaction.amount) === 0
              ? '0.00'
              : (Number(transaction.amount) / 100).toLocaleString()}
          </Text>
        </View>
        <Text className="mt-2 text-base font-medium text-[#808080]" style={{color: textTheme}}>
          {formatDate(transaction.created_at)}
        </Text>
      </View>
    // </SafeAreaView>
  )
}

export default TransactionDetails
