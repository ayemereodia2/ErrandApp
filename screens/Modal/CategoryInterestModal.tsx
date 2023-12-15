import Checkbox from 'expo-checkbox'
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { getCategoriesList } from '../../services/PostErrand/categories'
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

const CategoryInterestModal = ({ setShowCategoryModal }: any) => {
  const dispatch = useAppDispatch()
  const [selectedCategories, setSelectedCategories] = useState<
    SelectedCategories
  >({})
  const [selectAll, setSelectAll] = useState(false)
  const [locationData, setLocationData] = useState<SelectProp[]>([])

  const { data: categories } = useSelector(
    (state: RootState) => state.categoriesListReducer,
  )

  useEffect(() => {
    getLocations()
    dispatch(getCategoriesList())
  }, [])

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

    console.log('>>>>selected', selectedCategoryNames)

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
          // console.log(">>>>>>pk");

          if (rs.success) {
            await _fetch({
              method: 'GET',
              _url: `/user/category-interest`,
            })
            Toast.show({
              type: 'success',
              text1: 'Categories has been added successfully',
            })
            setShowCategoryModal(false)
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
    <View className="h-[400px]">
        <Text className="text-center text-xl font-semibold">
          What can you do ?
        </Text>

        <View className="flex-row py-2 my-2 border-stone-200 space-x-3 justify-start border rounded-lg px-2 w-28">
          <Checkbox value={selectAll} onValueChange={handleSelectAll} />
          <Text>Select All</Text>
        </View>

        <ScrollView>
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
        </ScrollView>

        <View className="flex-row justify-center items-center space-x-3">
          <TouchableOpacity onPress={AddCategories} className="mb-101">
            <View className="py-3 px-4 w-[149px] rounded-full bg-[#3F60AC] mt-4 items-center justify-center flex-row space-x-4">
              <Text className="text-white items-center justify-center">
                Submit
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setShowCategoryModal(false)}
            className="mb-101"
          >
            <View className="py-3 px-4 w-[149px] rounded-full border border-red-200 bg-white mt-4 items-center justify-center flex-row space-x-4">
              <Text className="text-red-500 ">Close</Text>
            </View>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default CategoryInterestModal
