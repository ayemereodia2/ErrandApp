import React, { useState } from 'react'
import { Controller } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'
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
}: InputProps): JSX.Element {
  // const { control, handleSubmit, formState: { errors } } = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     lastName: ''
  //   }
  // });

  // console.log(">>>eorrrso", errors);

  const [countryCode, setCountryCode] = useState("NG")
  const [callingCode, setCallingCode] = useState("234")

  return (
    <View className="">
      <Text className="text-[#393F42] font-medium text-sm">
        {label} {optional && <Text className="text-[#aaa7a7] pl-3">({optional})</Text>}
      </Text>
      {/* <TextInput
        className="w-full border border-[#E6E6E6] text-xs py-3.5 mt-2 rounded-lg px-3"
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
      /> */}
      <Controller
        control={control}
        rules={{
          required,
        }}
        render={({ field: { onChange, onBlur, value } }) => (

          
          <TextInput
            className="w-full border border-[#96A0A5] text-sm mb-3 py-3.5 h-[53px] rounded-lg px-3 "
            placeholder={placeholder}
            placeholderTextColor={'#AABDC5'}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
          />
        )}
        name={name}
      />

      {errors && <Text className="text-red-700 text-xs pt-2">{message}</Text>}
    </View>
  )
}
