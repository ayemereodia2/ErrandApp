import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import React, { useEffect, useLayoutEffect } from 'react'
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'

const CategoryInterest = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const { data: categories } = useSelector(
    (state: RootState) => state.categoriesListReducer,
  )
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Add Category Interest',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            className="flex-row items-center"
          >
            <AntDesign name="arrowleft" size={24} color="#243763" />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    dispatch(getCategoriesList())
  }, [])

  return (
    <ScrollView className="mt-4 px-4 mb-10">
      <View>
        <Text className="text-center text-base font-semibold">
          Choose Your Category Interest
        </Text>
      </View>

      <View className="mx-auto">
        <View className="flex-row items-center border-b p-2 mt-3 border-[#ccc] rounded-lg space-x-2">
          <TextInput
            className="w-[300px] "
            placeholder="Please enter location"
          />
          <FontAwesome name="search" size={16} color="#ccc" />
        </View>
      </View>

      <View>
        <Text className="text-left text-sm font-light pt-3">
          Select the categories you are interested in
        </Text>

        <View className="flex-row py-3 space-x-3 justify-end">
          <Checkbox
            // style={styles.checkbox}
            value={true}
            // onValueChange={setChecked}
            // color={isChecked ? '#4630EB' : undefined}
          />
          <Text>Select All</Text>
        </View>

        <View>
          {categories.map((category) => {
            return (
              <View className="flex-row py-3 space-x-3">
                <Checkbox
                  // style={styles.checkbox}
                  value={true}
                  // onValueChange={setChecked}
                  // color={isChecked ? '#4630EB' : undefined}
                />
                <Text>{category.name}</Text>
              </View>
            )
          })}
        </View>
      </View>

      <View className="flex-row justify-center items-center space-x-3">
        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryInterest')}
          className="mb-101"
        >
          <View className="py-3 px-4 w-[149px] rounded-full bg-[#3F60AC] mt-4 items-center justify-center flex-row space-x-4">
            <Text className="text-white items-center justify-center">
              Submit
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('Settings')}
          className="mb-101"
        >
          <View className="py-3 px-4 w-[149px] rounded-full border border-red-200 bg-white mt-4 items-center justify-center flex-row space-x-4">
            <Text className="text-red-500 ">
              Cancel
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default CategoryInterest
