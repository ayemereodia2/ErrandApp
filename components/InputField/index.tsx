import React from 'react';
import { Controller } from "react-hook-form";
import { Text, TextInput, View } from 'react-native';
import { InputProps } from '../../types';

export default function InputField({
  onChangeText,
  keyboardType,
  label,
  required,
  placeholder,
  control,
  errors,
  name,
  message
}: InputProps): JSX.Element {

  // const { control, handleSubmit, formState: { errors } } = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     lastName: ''
  //   }
  // });

  // console.log(">>>eorrrso", errors);
  
  return (
    <View className="pt-6">
      <Text className="text-[#243763] text-sm">{label}</Text>
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
            className="w-full border border-[#E6E6E6] text-xs py-3.5 mt-2 rounded-lg px-3"
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType={keyboardType}
          />
        )}
        name={name}
      />

      {errors && <Text className='text-red-700 text-xs pt-2'>{message}</Text>}
    </View>
  )
}
