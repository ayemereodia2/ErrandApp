import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { categories } from '../../utils/categories'

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<number>()

  return (
    <View>
      <Text className="text-base text-[#5b5a5a] font-semibold pt-8 pl-6">
        What Kind of Errand ?
      </Text>
      <View>
        <ScrollView>
          <View className="pt-3">
            {categories.map((category, index) => (
              <TouchableOpacity
                className={`border-b-[0.3px] border-[#ccc] cursor-pointer ${
                  selectedCategory === index ? 'bg-[#243763]' : ''
                }`}
                onPress={() => {
                  setSelectedCategory(index)
                }}
              >
                <Text
                  className={`pb pl-5 pt-2 border text-[12px] ${
                    selectedCategory === index ? 'text-white' : ''
                  }`}
                >
                  {category.name}
                </Text>
                {selectedCategory === index && (
                  <Text
                    className={`pl-5 text-[10px] pb-1  ${
                      selectedCategory === index ? 'text-white' : ''
                    }`}
                  >
                    {category?.desc}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

export default Category
