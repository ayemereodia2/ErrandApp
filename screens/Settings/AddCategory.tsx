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
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { getCategoriesList } from '../../services/PostErrand/categories'
import { getCategoryIntersts } from '../../services/settings/getCategoryInterests'
import { RootState, useAppDispatch } from '../../services/store'

type SelectedCategories = {
  [categoryId: string]: boolean
}

type LocationProp = {
  city: string
  country: string
  lga: string
  id: string
  state: string
}

type SelectProp = {
  key: string
  value: string
}

const CategoryInterest = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategories
  >({})
  const [selectAll, setSelectAll] = useState(false)
  const [locationData, setLocationData] = useState<SelectProp[]>([])

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
    getLocations()
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
    const selectedCategoryNames = categories
      .filter((category) => selectedCategories[category.id])
      .map((category) => category.name)

    const categoryInterestData = {
      category_interest: selectedCategoryNames,
    }

    try {
      await _fetch({
        method: 'PATCH',
        _url: `/user/category-interest`,
        body: categoryInterestData, // Send selected category IDs as JSON data
      })
        .then((rs) => rs.json())
        .then(async (rs) => {
          if (rs.success) {
            dispatch(getCategoryIntersts())
            Toast.show({
              type: 'success',
              text1: 'Categories has been added successfully',
            })
            navigation.navigate('Settings')
          }
        })
    } catch (error) {}
  }

  const getLocations = async () => {
    const rs = await _fetch({
      method: 'GET',
      _url: `/location/all`,
    })
      .then((rs) => rs.json())
      .then((data) =>
        data?.data.map((d: LocationProp) => {
          return {
            key: d.id,
            value: `${d.state + ', ' + d.lga}`,
          }
        }),
      )

    setLocationData(rs)
  }

  const [selected, setSelected] = React.useState('')

  return (
    <SafeAreaView className="mt-4">
      <ScrollView className="mt-4 px-4 mb-10">
        {/* <Text className="text-center text-base py-6">
          What's your current location
        </Text>

        <SelectList
          setSelected={(val) => setSelected(val)}
          data={locationData}
          save="value"
          dropdownShown={false}
        /> */}

        <View>
          <Text className="text-center text-base font-semibold pt-6">
            Choose Your Category Interest
          </Text>

          <View className="flex-row py-3 space-x-3 justify-end">
            <Checkbox value={selectAll} onValueChange={handleSelectAll} />
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
