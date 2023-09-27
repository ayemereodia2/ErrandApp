import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import {
  errandMarketList,
  setSortedErrands,
} from '../../services/errands/market'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
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
  setLow: React.Dispatch<React.SetStateAction<number>>
  setHigh: React.Dispatch<React.SetStateAction<number>>
  filterMarketList: () => void
  setMinCheck: React.Dispatch<React.SetStateAction<boolean>>
}

const Filter = ({
  onClose,
  filterOn,
  value,
  setValue,
  data,
  low,
  high,
  setHigh,
  setLow,
  filterMarketList,
  setMinCheck,
}: FilterProp) => {
  const dispatch = useAppDispatch()

  const [selectedSortAction, setSelectedSortAction] = useState('')

  const { data: errands, loading } = useSelector(
    (state: RootState) => state.errandMarketListReducer,
  )

  const handleSorting = () => {
    if (selectedSortAction === 'duration') {
      const sortByCreatedAt = (a: MarketData, b: MarketData) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      const allErrands = [...errands]
      dispatch(setSortedErrands(allErrands?.sort(sortByCreatedAt)))
    }
    if (selectedSortAction === 'bids') {
      const allErrands = [...errands]
      const sortByBids = (a: MarketData, b: MarketData) =>
        a.total_bids - b.total_bids
      dispatch(setSortedErrands(allErrands?.sort(sortByBids)))
    }

    if (selectedSortAction === 'low') {
      const allErrands = [...errands]
      const sortByAmount = (a: MarketData, b: MarketData) => a.budget - b.budget
      dispatch(setSortedErrands(allErrands?.sort(sortByAmount)))
    }
    if (selectedSortAction === 'high') {
      const allErrands = [...errands]
      const sortByAmount = (a: MarketData, b: MarketData) => a.budget - b.budget
      dispatch(setSortedErrands(allErrands?.sort((a, b) => sortByAmount(b, a))))
    }
  }

  useEffect(() => {}, [selectedSortAction])

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

            <TouchableOpacity
              onPress={() => {
                onClose()
                dispatch(errandMarketList({}))
              }}
              className="border py-2 px-[12px]  rounded-md  font-medium leading-6"
            >
              <Text className="font-mdtext-base">Reset</Text>
            </TouchableOpacity>
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
              data={data?.slice(0, 5)}
              renderItem={({ item, index }) => (
                <View className="py-2">
                  <TouchableOpacity
                    onPress={() => setValue(item.value)}
                    className={` bg-white border-[1px] border-[#1E3A79] px-4 py-3 rounded-3xl mr-5 ${
                      value === item.value
                        ? 'bg-[#1E3A79]'
                        : 'bg-white border-[1px] border-[#1E3A79]'
                    }`}
                  >
                    <Text
                      className={`capitalize font-md text-base text-[#1E3A79]  ${
                        value === item.value ? 'text-white' : 'text-[#1E3A79]'
                      }`}
                    >
                      {item.value}
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

            <RangeSlider
              setMinCheck={setMinCheck}
              setHigh={setHigh}
              setLow={setLow}
              low={low}
              high={high}
            />

            <TouchableOpacity
              className="bg-[#1E3A79] w-[330px] h-[56px] rounded-md mx-auto mt-[80px] justify-center items-center mb-[40px]"
              onPress={() => {
                onClose(), filterMarketList()
              }}
            >
              <Text className="text-white text-center">Filter Errands</Text>
            </TouchableOpacity>

            <View className="mb-[100px]">
              <Text className="mt-6 font-medium text-base leading-6">
                Sort By
              </Text>

              <View className="flex-row justify-around items-center mt-5">
                <TouchableOpacity
                  onPress={() => setSelectedSortAction('duration')}
                  className={`bg-white  h-12 px-4 py-2 rounded-3xl mr-5 items-center justify-center ${
                    selectedSortAction === 'duration'
                      ? 'bg-[#1E3A79]'
                      : 'bg-white border-[1px] border-[#1E3A79]'
                  }`}
                >
                  <Text
                    className={`capitalize font-md text-base text-[#1E3A79]  ${
                      selectedSortAction === 'duration'
                        ? 'text-white'
                        : 'text-[#1E3A79]'
                    }`}
                  >
                    Durations of Errands
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedSortAction('bids')}
                  className={`bg-white w-[100px]  h-12 px-4 py-2 rounded-3xl mr-5 items-center justify-center ${
                    selectedSortAction === 'bids'
                      ? 'bg-[#1E3A79]'
                      : 'bg-white border-[1px] border-[#1E3A79]'
                  }`}
                >
                  <Text
                    className={`capitalize font-md text-base text-[#1E3A79]  ${
                      selectedSortAction === 'bids'
                        ? 'text-white'
                        : 'text-[#1E3A79]'
                    }`}
                  >
                    Bids
                  </Text>
                </TouchableOpacity>
              </View>
              <View className="justify-around  mt-5 space-y-6">
                <TouchableOpacity
                  onPress={() => setSelectedSortAction('high')}
                  className={`bg-white w-[200px]  h-12 px-4 py-2 rounded-3xl mr-5 items-center justify-center ${
                    selectedSortAction === 'high'
                      ? 'bg-[#1E3A79]'
                      : 'bg-white border-[1px] border-[#1E3A79]'
                  }`}
                >
                  <Text
                    className={`capitalize font-md text-base text-[#1E3A79]  ${
                      selectedSortAction === 'high'
                        ? 'text-white'
                        : 'text-[#1E3A79]'
                    }`}
                  >
                    Price (Low - High)
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setSelectedSortAction('low')}
                  className={`bg-white w-[200px]  h-12 px-4 py-2 rounded-3xl mr-5 items-center justify-center ${
                    selectedSortAction === 'low'
                      ? 'bg-[#1E3A79]'
                      : 'bg-white border-[1px] border-[#1E3A79]'
                  }`}
                >
                  <Text
                    className={`capitalize font-md text-base text-[#1E3A79]  ${
                      selectedSortAction === 'low'
                        ? 'text-white'
                        : 'text-[#1E3A79]'
                    }`}
                  >
                    Price (High - Low)
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                className="bg-[#1E3A79] w-[330px] h-[56px] rounded-md mx-auto mt-10 justify-center items-center mb-[40px]"
                onPress={() => {
                  onClose(), handleSorting()
                }}
              >
                <Text className="text-white text-center">Sort Errands</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Filter
