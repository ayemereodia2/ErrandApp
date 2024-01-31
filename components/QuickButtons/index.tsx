import { Feather } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { UserDetail } from '../../types'

type Props = {
  navigation: any
}
const QuickButtons = ({ navigation }: Props) => {
  return (
    <View className="flex-row items-center justify-center mt-7 space-x-4">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Market')
        }
        className="border-[0.6px] p-2 rounded-3xl px-5 shadow-xl shadow-[#575656] border-[#09497D80] "
        style={{ backgroundColor: '#fff' }}
      >
        <Text
          className="text-[14px] text-[#09497D] text-center items-center"
          style={{ fontFamily: 'Axiforma' }}
        >
          Find an errand <Feather name="arrow-up-right" size={14} />
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('MyErrands')}
        className="border-[0.6px] p-2 rounded-3xl px-5 shadow-xl shadow-[#575656] border-[#09497D80]"
        style={{ backgroundColor: '#fff' }}
      >
        <Text
          className="text-[14px] text-[#09497D]"
          style={{ fontFamily: 'Axiforma' }}
        >
          Manage Errand <Feather name="arrow-up-right" size={14} />
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default QuickButtons
