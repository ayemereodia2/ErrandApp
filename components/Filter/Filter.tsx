import { AntDesign, FontAwesome } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { errandMarketList } from '../../services/errands/market'
import { RootState, useAppDispatch } from '../../services/store'
import { CategoriesList, MarketData } from '../../types'
import RangeSlider from '../RangeSlider/RangeSlider'

interface DropDownProp {
  label: string
  value: string
}

interface FilterProp {
  value: string
  setValue: (value: string) => void
  data: DropDownProp[]
  onClose: () => void
  filterOn: boolean
  low: number
  high: number
  setLow: React.Dispatch<React.SetStateAction<number>>
  setHigh: React.Dispatch<React.SetStateAction<number>>
  filterMarketList: () => void
  setMinCheck: React.Dispatch<React.SetStateAction<boolean>>
  setSearchedErrand: React.Dispatch<React.SetStateAction<MarketData[]>>
  setCheckFilterToggle: React.Dispatch<React.SetStateAction<boolean>>
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
  setSearchedErrand,
  setCheckFilterToggle,
}: FilterProp) => {
  const dispatch = useAppDispatch()
  const [searchedItem, setSearchedItem] = useState('')
  const [searchedCategoryList, setSearchedCategoryList] = useState<
    CategoriesList[]
  >([])

  const [toggleState, setToggleState] = useState('filter')

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const [selectedSortAction, setSelectedSortAction] = useState('')

  const { data: errands, loading } = useSelector(
    (state: RootState) => state.errandMarketListReducer,
  )

  const { data: categories } = useSelector(
    (state: RootState) => state.categoriesListReducer,
  )

  const handleSorting = () => {
    if (selectedSortAction === 'duration') {
      const sortByCreatedAt = (a: MarketData, b: MarketData) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      const allErrands = [...errands]
      setSearchedErrand(allErrands?.sort(sortByCreatedAt))
    }
    if (selectedSortAction === 'bids') {
      const allErrands = [...errands]
      const sortByBids = (a: MarketData, b: MarketData) =>
        a.total_bids - b.total_bids

      console.log('>>>>>>>>>ok', allErrands?.sort(sortByBids))

      setSearchedErrand(allErrands?.sort(sortByBids))
    }

    if (selectedSortAction === 'low') {
      const allErrands = [...errands]
      const sortByAmount = (a: MarketData, b: MarketData) => a.budget - b.budget
      setSearchedErrand(allErrands?.sort(sortByAmount))
    }
    if (selectedSortAction === 'high') {
      const allErrands = [...errands]
      const sortByAmount = (a: MarketData, b: MarketData) => a.budget - b.budget
      setSearchedErrand(allErrands?.sort((a, b) => sortByAmount(b, a)))
    }
  }

  // console.log(allCategories);

  const handleSearchCategory = () => {
    if (searchedItem === '') {
      setSearchedCategoryList(categories.slice(0, 5))
    } else {
      let searchedValue = categories.filter((item) => {
        return item.name.toLowerCase().includes(searchedItem.toLowerCase())
      })
      setSearchedCategoryList(searchedValue)
    }
  }

  const handleSelectedItem = (item: any) => {
    if (item.identifier !== value) {
      setValue(item.identifier)
    } else {
      setValue('')
    }
  }

  useEffect(() => {
    handleSearchCategory()
  }, [selectedSortAction, searchedItem])

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: backgroundTheme }}>
        <View
          className="fixed top-0 right-[-3%] w-[95%] bg-[#F5F5F5] z-5 duration-200"
          style={{
            display: filterOn ? 'flex' : 'none',
            backgroundColor: backgroundTheme,
          }}
        >
          {/* Header */}
          <View className="flex-row justify-between items-center mt-5 mx-2">
            <TouchableOpacity
              onPress={() => {
                setCheckFilterToggle(false)
                onClose()
                dispatch(errandMarketList({ setSearchedErrand }))
              }}
            >
              <Text>
                <AntDesign name="close" size={22} color={textTheme} />
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setToggleState('filter')}
              className={toggleState === 'filter' ? 'border-b' : ''}
            >
              <Text
                className="text-sm font-medium leading-6"
                style={{ color: textTheme }}
              >
                Filter Errands
              </Text>
            </TouchableOpacity>

            <Text>|</Text>

            <TouchableOpacity
              onPress={() => {
                setToggleState('Sort')
                setCheckFilterToggle(false)
              }}
              className={toggleState === 'Sort' ? 'border-b' : ''}
            >
              <Text
                className="text-sm font-medium leading-6"
                style={{ color: textTheme }}
              >
                Sort Errands
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                // onClose()
                // dispatch(errandMarketList({}))
                setLow(0)
                setHigh(0)
                setSelectedSortAction('')
                setSearchedItem('')
                setValue('')
                setCheckFilterToggle(false)
              }}
              className="border py-[2px] px-[12px]  rounded-md  font-medium leading-6"
              style={{ borderColor: textTheme }}
            >
              <Text className="font-mdtext-base" style={{ color: textTheme }}>
                Clear
              </Text>
            </TouchableOpacity>
          </View>

          {toggleState === 'filter' ? (
            <View className="mt-14 mx-6">
              <Text
                className="font-medium text-base leading-6"
                style={{ color: textTheme }}
              >
                Category
              </Text>

              <View className="mx-auto">
                <View className="flex-row items-center border-b p-2 mt-3 border-[#ccc] rounded-lg space-x-2">
                  <TextInput
                    className="w-[300px] "
                    placeholder="Type to get top Categories"
                    onChangeText={(text) => setSearchedItem(text)}
                    value={searchedItem}
                  />
                  <FontAwesome name="search" size={16} color="#ccc" />
                </View>
              </View>

              <Text
                className="mt-6 font-medium text-base leading-6"
                style={{ color: textTheme }}
              >
                Top Options
              </Text>

              {searchedCategoryList?.map((item) => {
                return (
                  <View className="py-2">
                    <TouchableOpacity
                      onPress={() => {
                        // setValue(item.identifier)
                        handleSelectedItem(item)
                      }}
                      className={` bg-white border-[1px] border-[#1E3A79] px-4 py-2 rounded-3xl mr-5 ${
                        value === item.identifier
                          ? 'bg-[#1E3A79]'
                          : 'bg-white border-[1px] border-[#1E3A79]'
                      }`}
                    >
                      <Text
                        className={`capitalize font-md text-base text-[#1E3A79]  ${
                          value === item.identifier
                            ? 'text-white'
                            : 'text-[#1E3A79]'
                        }`}
                      >
                        {item.identifier}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              })}

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
            </View>
          ) : (
            <View className="mb-[100px]">
              <Text
                className="mt-6 font-medium text-base leading-6 px-6"
                style={{ color: textTheme }}
              >
                Sort By
              </Text>

              <View className="flex-row ml-5 mt-5">
                <TouchableOpacity
                  onPress={() => setSelectedSortAction('duration')}
                  className={`bg-white  h-12 px-4 py-2 rounded-3xl items-center justify-center ${
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
                  className={`bg-white w-[100px]  h-12 px-4 py-2 rounded-3xl items-center justify-center ml-5 ${
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
              <View className="mt-5 space-y-6 ml-5">
                <TouchableOpacity
                  onPress={() => setSelectedSortAction('high')}
                  className={`bg-white w-[170px]  h-12 py-2 rounded-3xl items-center justify-center ${
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
                  className={`bg-white w-[170px]  h-12 px-4 py-2 rounded-3xl items-center justify-center ${
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Filter
