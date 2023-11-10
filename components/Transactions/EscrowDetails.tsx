import { format } from 'date-fns'
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { EscrowBreakDown } from '../../types'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const EscrowDetails = (escrows: EscrowBreakDown) => {

  const regex = /(<([^>]+)>)/gi

  const date = format(new Date(escrows.created_at), 'd MMMM')
   const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  return (
      <View className="mx-4 py-4 border-b border-[#CCCCCC]">
        <View className="flex-row justify-between items-center mr-2">
          <View className="px-2 mr-2">
            <Text className="text-base font-medium w-56" style={{color: textTheme}}>
              {escrows.description.length > 50 ? 
              
              ( <Text>{escrows.description.replace(regex, '').slice(0, 50)}...</Text> )
              :
              ( <Text>{escrows.description.replace(regex, '')}</Text> )
              }
            </Text>
          </View>
          <Text className={`font-bold text-base text-[#21B06E]`}>
            {' '}
            ₦
            {Number(escrows.amount) === 0
              ? '0.00'
              : (Number(escrows.amount) / 100).toLocaleString()}
          </Text>
        </View>
        <Text className="mt-2 ml-2 text-base font-medium text-[#808080]" style={{color: textTheme}}>
          {date}
        </Text>
      </View>
  )
}

export default EscrowDetails
