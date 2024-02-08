import { FontAwesome } from '@expo/vector-icons'
import {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet'
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { errandMarketList } from '../../services/errands/market'
import { RootState, useAppDispatch } from '../../services/store'
import { CategoriesList, MarketData } from '../../types'
import colors from '../../utils/colors'
import RangeSlider from '../RangeSlider/RangeSlider'

interface DropDownProp {
  label: string
  value: string
}

interface FilterProp {
  value: string
  setValue: (value: string) => void
  data: DropDownProp[]
  onClose: any
  low: number
  high: number
  location: string
  setLocation: React.Dispatch<React.SetStateAction<string>>
  setLow: React.Dispatch<React.SetStateAction<number>>
  setHigh: React.Dispatch<React.SetStateAction<number>>
  filterMarketList: () => void
  setMinCheck: React.Dispatch<React.SetStateAction<boolean>>
  setSearchedErrand: React.Dispatch<React.SetStateAction<MarketData[]>>
  setCheckFilterToggle: React.Dispatch<React.SetStateAction<boolean>>
  navigation: any

  firstName: string
  lastName: string
  profilePic: string
}

const NewFilter = ({
  onClose,
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
  navigation,

  firstName,
  lastName,
  profilePic,
  setLocation,
  location,
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
    <BottomSheetScrollView style={{ backgroundColor: '#E6E6E6', flex: 1, marginBottom:60 }}>
      <View className=" mt-4">
        <View className="flex-row px-4 items-center justify-between border-b border-[#96A0A5]">
          <Text
            className="text-[18px] text-[#96A0A5] font-medium"
            style={{ fontFamily: 'Chillax-Medium' }}
          >
            Filter
          </Text>
          <View className="flex-row space-x-2 items-center">
            <Text
              className="text-[14px] mr-1 text-[#A5A4A7]"
              style={{
                fontFamily: 'Chillax-Semibold',
                color: colors.DARK_BLUE,
              }}
              onPress={() => {
                filterMarketList()
              }}
            >
              Apply Filter
            </Text>
            <Text className="text-lg">|</Text>
            <Text
              className="text-[14px] mr-1 text-[#A5A4A7]"
              style={{ fontFamily: 'Chillax-Medium' }}
              onPress={() => {
                onClose()
                dispatch(errandMarketList({ setSearchedErrand }))
                setLow(0)
                setHigh(0)
                setSelectedSortAction('')
                setSearchedItem('')
                setValue('')
                setCheckFilterToggle(false)
                setLocation('')
              }}
            >
              Clear all
            </Text>
          </View>
        </View>

        <RangeSlider
          setMinCheck={setMinCheck}
          setHigh={setHigh}
          setLow={setLow}
          low={low}
          high={high}
        />

        <Text
          className="font-medium text-base  text-[#6D6D6D] leading-6 mt-4 pl-4"
          style={{ fontFamily: 'Chillax-Medium' }}
        >
          Category
        </Text>

        <View className="border border-[#96A0A5] flex-row items-center rounded-xl mt-2 bg-white shadow-inner px-4 py-2 mx-4">
          <FontAwesome name="search" size={16} color="#ccc" className="mr-3" />
          <View className=" pl-4  w-full text-center">
            <BottomSheetTextInput
              placeholder="Search to get the top categories"
              placeholderTextColor={'#AAA'}
              className="bg-white"
              onChangeText={(text) => setSearchedItem(text)}
              value={searchedItem}
              style={{ fontFamily: 'Axiforma' }}
            />
          </View>
        </View>

        <View
          className="py-2 flex-row items-center flex-wrap mt-2 mx-4"
          style={{ gap: 6 }}
        >
          {searchedCategoryList?.map((item) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setValue(item.identifier)
                  handleSelectedItem(item)
                }}
                className={`  border-[1px] border-[#1E3A79] mt-1 p-2 rounded-3xl ${
                  value === item.identifier
                    ? 'bg-[#1E3A79]'
                    : 'bg-lightBlue border-[1px] border-[#1E3A79]'
                }`}
              >
                <Text
                  style={{ fontFamily: 'Axiforma' }}
                  className={`capitalize font-md text-xs  text-[#1E3A79]  ${
                    value === item.identifier ? 'text-white' : 'text-[#1E3A79]'
                  }`}
                >
                  {item.identifier}
                </Text>
              </TouchableOpacity>
            )
          })}
        </View>

        <View>
          <Text
            className="font-medium text-base leading-6 mt-4 pl-4"
            style={{ fontFamily: 'Axiforma' }}
          >
            Location
          </Text>

          <View className="border border-[#96A0A5] flex-row items-center rounded-xl mt-2 bg-white shadow-inner px-4 py-2 mx-4">
            <FontAwesome
              name="search"
              size={16}
              color="#ccc"
              className="mr-3"
            />
            <View className=" pl-4  w-full text-center">
              <BottomSheetTextInput
                placeholder="Enter Location"
                placeholderTextColor={'#AAA'}
                className="bg-white"
                onChangeText={(text) => setLocation(text)}
                value={location}
                style={{ fontFamily: 'Axiforma' }}
              />
            </View>
          </View>
        </View>

        <View className="flex-row items-center justify-between mx-4 . ">
          <TouchableOpacity
            className="bg-[#1E3A79] w-full py-3 rounded-md mx-auto mt-[40px] justify-center items-center "
            onPress={() => {
              filterMarketList()
            }}
          >
            <Text  style={{ fontFamily: 'Axiforma' }} className="text-white text-center">Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* </KeyboardAwareScrollView> */}
    </BottomSheetScrollView>
  )
}

export default NewFilter
