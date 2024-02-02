import { AntDesign, Entypo, FontAwesome } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Platform,
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
import { ProfileInitials } from '../ProfileInitials'
import RangeSlider from '../RangeSlider/RangeSlider'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

interface DropDownProp {
  label: string
  value: string
}

interface FilterProp {
  value: string
  setValue: (value: string) => void
  data: DropDownProp[]
  onClose: () => void
  
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
   
    <ScrollView>
        <KeyboardAwareScrollView
          style={{ flex: 1, marginTop: 15 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
    <View className='mx-4 mb-28'>
        <View className='flex-row items-center justify-between'>
            <Text className='text-[20px] font-medium' style={{fontFamily: 'Chillax-Medium'}}>Filter</Text>
            <TouchableOpacity 
            onPress={() => {
                 // onClose()
    //             // dispatch(errandMarketList({}))
                setLow(0)
                 setHigh(0)
                setSelectedSortAction('')
                 setSearchedItem('')
                 setValue('')
                 setCheckFilterToggle(false)
                 setLocation('')
               }}>
               <Text className='text-[16px] mr-1 text-[#A5A4A7]' style={{fontFamily: 'Chillax-Medium'}}> Clear all</Text> 
                </TouchableOpacity>
        </View>

        <View className='mt-4 mb-5'>
            <Text className='text-base text-[#6D6D6D]' style={{fontFamily: 'Chillax-Medium'}}>Price Range</Text>
        </View>

       <View>
            <RangeSlider
                 setMinCheck={setMinCheck}
                 setHigh={setHigh}
                setLow={setLow}
                low={low}
                 high={high}
               />
       </View>

       <Text
                 className="font-medium text-base leading-6 mt-2"
                  style={{ color: textTheme }}
               >
                   Category
                 </Text>

                 <View className="mx-2">
                   <View className="flex-row items-center border p-2 mt-3 border-[#ccc] rounded-lg">
                     <TextInput
                       className="w-[90%] py-2"
                       placeholderTextColor={theme ? '#cccccc' : 'black'}
                       placeholder="Type to get top Categories"
                       onChangeText={(text) => setSearchedItem(text)}
                       value={searchedItem}
                       style={{ color: theme ? 'white' : 'black' }}
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

                 <View className="py-2 flex-row items-center flex-wrap" style={{gap: 5}}>
                 {searchedCategoryList?.map((item) => {
                   return (
                     
                       <TouchableOpacity
                         onPress={() => {
                              setValue(item.identifier)
                           handleSelectedItem(item)
                         }}
                         className={` bg-white border-[1px] border-[#1E3A79] mt-1 px-2 py-2 rounded-3xl ${
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
                    
                  )
               })}
                </View>

               <View>
               <Text
                 className="font-medium text-base leading-6 mt-4"
                 style={{ color: textTheme }}
               >
                 Location
               </Text>

               <View className="mx-2">
                 <View className="flex-row items-center border p-2 mt-1 border-[#ccc] rounded-lg ">
                   <TextInput
                     className="w-[90%] py-2"
                     placeholderTextColor={theme ? '#cccccc' : 'black'}
                     placeholder="Enter Location"
                     onChangeText={(text) => setLocation(text)}
                     value={location}
                     style={{ color: theme ? 'white' : 'black' }}
                   />
                  <FontAwesome name="search" size={16} color="#ccc" />
                 </View>
                    </View>
               </View>

               <View className="flex-row items-center justify-between">
             <TouchableOpacity
               className="bg-[#1E3A79] w-full py-5 rounded-md mx-auto mt-[40px] justify-center items-center mb-[10px]"
               onPress={() => {
                  filterMarketList()
               }}
             >
               <Text className="text-white text-center">Filter</Text>
             </TouchableOpacity>
                </View>
    </View>
    </KeyboardAwareScrollView>
    </ScrollView>
  )
}

export default NewFilter
