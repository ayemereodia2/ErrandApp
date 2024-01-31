import { AntDesign } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { InputProps } from '../../types'

export default function InputField({
  onChangeText,
  keyboardType,
  label,
  required,
  placeholder,
  control,
  errors,
  name,
  message,
  className,
  secureTextEntry,
  optional,
  country,
}: InputProps): JSX.Element {
  const [countryCode, setCountryCode] = useState('NG')
  const [callingCode, setCallingCode] = useState('234')
  return (
    <View className="">
      <Text className="text-[#5E6366] pb-2" style={{ fontFamily: 'Axiforma' }}>
        {label}{' '}
        {optional && <Text className="text-[#aaa7a7] pl-3">({optional})</Text>}
      </Text>

      <View className="flex-row items-center  w-full">
        {country ? (
          <View className=" flex-row items-center mr-2 px-[22px] py-[9px] w-[81px] border rounded-lg border-[#96A0A5]">
            <CountryPicker
              withFilter
              countryCode={countryCode}
              withFlag
              withAlphaFilter={false}
              withCurrencyButton={false}
              withCallingCode
              onSelect={(country) => {
                const { cca2, callingCode } = country
                setCountryCode(cca2)
                setCallingCode(callingCode[0])
              }}
              containerButtonStyle={{
                alignItems: 'center',
                marginRight: 18,
              }}
            />

            <Text className="mt-1">
              <AntDesign name="down" size={16} color="#130F26" />
            </Text>
          </View>
        ) : (
          ''
        )}
        <Controller
          control={control}
          rules={{
            required,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              className="w-full border border-[#96A0A5] text-[14px]  py-2.5 rounded-lg px-3 "
              placeholder={placeholder}
              placeholderTextColor={'#AABDC5'}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              keyboardType={keyboardType}
              style={{ fontFamily: 'Axiforma' }}
            />
          )}
          name={name}
        />
      </View>

      {errors && <Text className="text-red-700 text-xs pt-2">{message}</Text>}
    </View>
  )
}
