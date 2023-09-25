import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { categoryLists } from '../../utils/helper'
import DropdownComponent from '../Picker/DropdownComponent'
import RangeSlider from '../RangeSlider/RangeSlider'

interface DropDownProp {
  label: string
  value: string
}

interface FilterProp {
  value: string
  setValue: any
  data: DropDownProp[]
  onClose: any
  filterOn: boolean
  low: number
  high: number
  setLow:  React.Dispatch<React.SetStateAction<number>>
  setHigh: React.Dispatch<React.SetStateAction<number>>
  filterMarketList: () => void
  setMinCheck: React.Dispatch<React.SetStateAction<boolean>>
}

const Filter = ({ onClose, filterOn, value, setValue, data, low, high, setHigh, setLow, filterMarketList, setMinCheck }: FilterProp) => {
  console.log(">>>>low, hig", low, high);
  
  return (
    <SafeAreaView>
      <ScrollView>
        <View
          className="fixed top-0 right-[-3%] w-[95%] bg-[#F5F5F5] z-5 duration-200"
          style={{ display: filterOn ? 'flex' : 'none' }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mt-5 mx-4">
            <TouchableOpacity onPress={onClose}>
              <Text>
                <AntDesign name="close" size={24} color="black" />
              </Text>
            </TouchableOpacity>

            <Text className="text-lg font-medium leading-6">
              Filter Errands
            </Text>

            <View className="border py-2 px-[12px]  rounded-md  font-medium leading-6">
              <Text className="font-mdtext-base">Reset</Text>
            </View>
          </View>

          <View className="mt-16 mx-6">
            <Text className="font-medium text-base leading-6">Category</Text>

            <View className="mt-2 bg-[#FCFCFC] h-0 mb-16 ml-[-16px] w-[330px]">
              <DropdownComponent
                data={data}
                value={value}
                setValue={setValue}
                placeHolder={'Choose Category'}
              />
            </View>

            <Text className="mt-6 font-medium text-base leading-6">
              Quick Options
            </Text>

            <FlatList
              data={categoryLists?.slice(0, 5)}
              renderItem={({ item, index }) => (
                <View className="py-2">
                  <TouchableOpacity
                    onPress={() => setValue(item.identifier)}
                    className={` bg-white border-[1px] border-[#1E3A79] px-4 py-3 rounded-3xl mr-5 ${
                      value === item.identifier
                        ? 'bg-[#1E3A79]'
                        : 'bg-white border-[1px] border-[#1E3A79]'
                    }`}
                  >
                    <Text
                      className={`font-md text-base text-[#1E3A79]  ${
                        value === item.identifier
                          ? 'text-white'
                          : 'text-[#1E3A79]'
                      }`}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              numColumns={1}
            />

            <Text className="mt-12 font-medium text-base leading-6">
              Location
            </Text>

            <View className="">
              <TextInput
                placeholder="Find a Location"
                placeholderTextColor={'#AAA'}
                className="w-[310px] bg-white border-[0.5px] border-[#DDD] mx-auto mr-3 pl-4 mt-2 rounded-md py-3.5"
              />
            </View>

            <Text className="mt-6 font-medium text-base leading-6">
              Quick Options
            </Text>

            <View className="mt-2">
              <View className="mb-3">
                <TouchableOpacity
                  className={` bg-white border-[1px] border-[#1E3A79] px-4 py-3 rounded-3xl mr-5 mb-4`}
                >
                  <Text className={`font-md text-base text-[#1E3A79]`}>
                    Lagos - 10 errands
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className={` bg-white border-[1px] border-[#1E3A79] px-4 py-3 rounded-3xl mr-5`}
                >
                  <Text className={`font-md text-base text-[#1E3A79]`}>
                    Uyo - 20 Errands
                  </Text>
                </TouchableOpacity>
              </View>

              {/* <View className="flex-row mt-4">
                <TouchableOpacity className="px-4 py-2 rounded-[20px] bg-white border border-[#1E3A79] mr-6">
                  <Text className="font-medium text-base text-[#1E3A79]">
                    Ogun - 20 Errands
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="px-1 py-2 rounded-[20px] ml-[-15px] bg-white border border-[#1E3A79]">
                  <Text className="font-medium text-base text-[#1E3A79]">
                    Kwara - 20 Errands
                  </Text>
                </TouchableOpacity>
              </View> */}
            </View>

            <RangeSlider setMinCheck={setMinCheck} setHigh={setHigh} setLow={setLow}  low={low} high={high}/>

            <TouchableOpacity
              className="bg-[#1E3A79] w-[300px] h-[56px] rounded-md mx-auto mt-[80px] justify-center items-center mb-[150px]"
              onPress={() => {
                onClose(),
                filterMarketList()
              }}
            
            >
              <Text className="text-white text-center">Filter Errands</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Filter
