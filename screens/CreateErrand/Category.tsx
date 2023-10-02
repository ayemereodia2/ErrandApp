import React, { useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView, FlatList, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import CategoryBox from '../../components/CategoryBox'
// import { categoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import { categoryLists } from '../../utils/helper'

type CategoryProp = {
  selectedItem: string
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
  setCategoryType: React.Dispatch<React.SetStateAction<string>>
  setCategoryName: React.Dispatch<React.SetStateAction<string>>
}

const Categories = ({
  selectedItem,
  setSelectedItem,
  setCategoryName,
  setCategoryType,
}: CategoryProp) => {
  const [openLists, setOpenLists] = useState(false)
  const { data, loading } = useSelector(
    (state: RootState) => state.categoriesListReducer,
  )
  const dispatch = useAppDispatch()

  useEffect(() => {
    // dispatch(categoriesList())
  }, [])

  return (
    <>
      <ScrollView>
        <View className="flex-row mt-[38px] mx-auto items-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">1</Text>
          </View>
          <Text className="font-semibold text-[#243763] text-base">
            Select Category
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text className="text-[#777777] text-center">
            In this section, you can select the category which your errand falls
            under here.{' '}
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size={'large'} color="blue" />
        ) : (
          <View className='px-3'>
            <Text className="text-[16px] font-medium mt-14 ml-4 mb-4">
              Services
            </Text>

            {/* <ScrollView className=" flex-columns columns-2">
              {categoryLists?.map((item: CategoriesList, index: number) => (
                <View>
                  <CategoryBox
                    setOpenLists={setOpenLists}
                    id={item.id}
                    identifier={item.identifier}
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    selectedItem={selectedItem}
                    onPress={() => {
                      setSelectedItem(item.id)
                      setCategoryType(item.type)
                      setCategoryName(item.identifier)
                    }}
                  />
                </View>
              ))}
            </ScrollView> */}
            <FlatList
              data={categoryLists}
              renderItem={({ item, index }) => (
                <View style={{ flex: 1, marginHorizontal:2, marginVertical:10, flexDirection: 'column', margin: 1 }}>
                  <CategoryBox
                    index={index}
                    setOpenLists={setOpenLists}
                    id={item.id}
                    identifier={item.identifier}
                    key={item.name}
                    icon={item.icon}
                    name={item.name}
                    selectedItem={selectedItem}
                    iconType={item.iconType}
                    onPress={() => {
                      setSelectedItem(item.id)
                      setCategoryType(item.type)
                      setCategoryName(item.identifier)
                    }}
                  />
                </View>
              )}
              //Setting the number of column
              numColumns={2}
              // keyExtractor={(item, index) => index}
            />

            {/* <FlatList
              data={categoryLists}
              numColumns={2}
              renderItem={(item: CategoriesList) => (
                <CategoryBox
                  setOpenLists={setOpenLists}
                  id={item.id}
                  identifier={item.identifier}
                  key={item.name}
                  icon={item.icon}
                  name={item.name}
                  selectedItem={selectedItem}
                  onPress={() => {
                    setSelectedItem(item.id)
                    setCategoryType(item.type)
                    setCategoryName(item.identifier)
                  }}
                />
              )}
            /> */}
          </View>
        )}
      </ScrollView>
    </>
  )
}

export default Categories
