import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import CategoryBox from '../../components/CategoryBox'
import { categoriesList } from '../../services/PostErrand/categories'
import { RootState, useAppDispatch } from '../../services/store'
import { CategoriesList } from '../../types'
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
    dispatch(categoriesList())
  }, [])

  return (
    <>
      <ScrollView>
        <View className="flex-row mt-[38px] mx-auto items-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#6604C8] b rounded-full justify-center items-center">
            <Text className="text-white mx-auto">1</Text>
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
          <View>
            <Text className="text-[16px] font-medium mt-14 ml-4 mb-4">Tasks</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} >
              {/* <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#CBD5EC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/bicycle.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Pickups
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/truck.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Deliveries
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/cart.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Shopping
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Text className="mx-auto mt-[18px]">
                <MaterialIcons name="groups" size={72} color="black" />
              </Text>
              <Text className="mt-[35px] mx-auto font-semibold text-smk">
                Cleaning/home service
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Text className="mx-auto mt-[18px]">
                <FontAwesome5 name="salesforce" size={75} color="black" />
              </Text>
              <Text className="mt-[28px] mx-auto font-semibold text-smk">
                Sales Persons
              </Text>
            </View>
          </TouchableOpacity> */}

              {categoryLists?.map((item: CategoriesList, index: number) => (
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
              ))}
            </ScrollView>

            {/* Services ScrollView */}

            {/* <Text className="text-[16px] font-medium mt-14 ml-4">Services</Text> */}

            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <TouchableOpacity>
                <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
                  <Image
                    source={require('../../assets/images/garden.jpg')}
                    className="mx-auto mt-[18px]"
                  />
                  <Text className="mt-[28px] mx-auto font-semibold text-sm">
                    Gardening
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
                  <Image
                    source={require('../../assets/images/baby.jpg')}
                    className="mx-auto mt-[18px]"
                  />
                  <Text className="mt-[28px] mx-auto font-semibold text-sm">
                    Baby Sitting
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
                  <Image
                    source={require('../../assets/images/laundry.jpg')}
                    className="mx-auto mt-[18px]"
                  />
                  <Text className="mt-[28px] mx-auto font-semibold text-sm">
                    Laundry
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
                  <Text className="mx-auto mt-[18px]">
                    <MaterialCommunityIcons
                      name="hanger"
                      size={75}
                      color="black"
                    />
                  </Text>
                  <Text className="mt-[28px] mx-auto font-semibold text-sm">
                    Cleaning/home service
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
                  <Text className="mx-auto mt-[18px]">
                    <MaterialCommunityIcons
                      name="hair-dryer"
                      size={75}
                      color="black"
                    />
                  </Text>
                  <Text className="mt-[28px] mx-auto font-semibold text-smk">
                    Hair dressing
                  </Text>
                </View>
              </TouchableOpacity>
            </ScrollView> */}
          </View>
        )}
      </ScrollView>
    </>
  )
}

export default Categories
