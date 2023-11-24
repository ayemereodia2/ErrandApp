import { AntDesign } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import Toast from 'react-native-toast-message'

type SelectedCategories = {
  [categoryId: string]: boolean
}

const CategoryInterest = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategories
  >({})
  const [selectAll, setSelectAll] = useState(false)

  const { data: categories } = useSelector(
    (state: RootState) => state.categoriesListReducer,
  )
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Add Category Interest',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between pr-4 ">
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

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false })
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined })
  }, [navigation])

  // console.log(categories)

  const handleCategorySelection = (category: any) => {
    setSelectedCategories((prevState) => ({
      ...prevState,
      [category.id]: !prevState[category.id], // Toggle the category state
    }))
  }

  const handleSelectAll = () => {
    const newSelectAllState = !selectAll
    setSelectAll(newSelectAllState)

    // Update the selectedCategories state for all categories
    const updatedSelectedCategories = {} as SelectedCategories
    categories.forEach((category) => {
      updatedSelectedCategories[category.id] = newSelectAllState
    })
    setSelectedCategories(updatedSelectedCategories)
  }

  const AddCategories = async () => {
    // const categoryInterestData = {
    //   category_interest: Object.keys(selectedCategories).filter((categoryId) => selectedCategories[categoryId])
    // };
    const selectedCategoryNames = categories
      .filter((category) => selectedCategories[category.id])
      .map((category) => category.name)

    const categoryInterestData = {
      category_interest: selectedCategoryNames,
    }

    try {
      const _rs = await _fetch({
        method: 'PATCH',
        _url: `/user/category-interest`,
        body: categoryInterestData // Send selected category IDs as JSON data
      })

     

      // console.log(">>>>>>res from patch", JSON.stringify(_rs));
      

      if (_rs.ok) {
        const responseData = await _rs.json()
        await _fetch({
          method: 'GET',
          _url: `/user/category-interest`,
        })
        Toast.show({
           type: 'success',
              text1: 'Add to category was successful',
            }),
        navigation.navigate('Settings')
      } else {
        // Handle error
      }
    } catch (error) {
    }
  }

  return (
    <SafeAreaView className="mt-4">
      <ScrollView className="mt-4 px-4 mb-10">
        <View>
          <Text className="text-center text-base font-semibold">
            Choose Your Category Interest
          </Text>
        </View>

        {/* <View className="mx-auto">
        <View className="flex-row items-center border-b p-2 mt-3 border-[#ccc] rounded-lg space-x-2">
          <TextInput
            className="w-[300px] "
            placeholder="Please enter location"
          />
          <FontAwesome name="search" size={16} color="#ccc" />
        </View>
      </View> */}

        <View>
          <Text className="text-center text-sm font-light pt-3">
            Select the categories you are interested in
          </Text>

          <View className="flex-row py-3 space-x-3 justify-end">
            <Checkbox
              // style={styles.checkbox}
              // value={true}
              value={selectAll}
              onValueChange={handleSelectAll}
              // onValueChange={setChecked}
              // color={isChecked ? '#4630EB' : undefined}
            />
            <Text>Select All</Text>
          </View>

          <View>
            {categories.map((category) => {
              return (
                <View className="flex-row py-3 space-x-3" key={category.id}>
                  <Checkbox
                    // style={styles.checkbox}
                    // value={false}
                    value={selectedCategories[category.id]}
                    onValueChange={() => handleCategorySelection(category)}
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
          <TouchableOpacity onPress={AddCategories} className="mb-101">
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
              <Text className="text-red-500 ">Cancel</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CategoryInterest
