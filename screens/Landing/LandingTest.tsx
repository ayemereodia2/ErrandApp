import { Feather, FontAwesome } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View, useColorScheme } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import LandingDetails from '../../components/LandingDetails.tsx/LandingDetails'
import PostErrandButton from '../../components/PostErrandBtn'
import { _fetch } from '../../services/axios/http'
import { getDraftErrand } from '../../services/errands/getDraftErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { Switch } from 'react-native'
import { toggleDarkMode } from '../../services/DarkMode/DarkMode'
import { useSelector } from 'react-redux'

const LandingTest = ({ navigation }: any) => {

  const [clicked, setClicked] = useState(false)
  // const theme = useColorScheme()
  // const isDarkTheme = theme === 'dark'
  // const [darkMode, setDarkMode] = useState(false)

  // const handleDarkMode = () => {
  //   setDarkMode(!darkMode)
  // }


  const dispatch = useAppDispatch()
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode);


  const getCategory = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/categories?limit=8`,
    })
    return await _rs.json()
  }

  const { isLoading, data, isError } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    refetchOnMount: 'always',
  })
  // console.log(data)

  if (isLoading) {
    return (
      <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[100vh] mt-5">
        {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }

  return (
    
      <>
     

    <SafeAreaView className="px-4 w-[100%]" style={{backgroundColor: darkMode ? '#0c1730' : '#e9ebf2'}}>
      <ScrollView >
        <View className="mt-6 flex-row items-center justify-between">
          <Text className="font-bold text-[25px] leading-7" style={{color: darkMode ? 'white' : 'black'}}>Good evening</Text>

          <View className="items-center flex-row gap-4 mr-2">
            <Text style={{color: darkMode ? 'white' : 'black'}}>
              <FontAwesome name="bell-o" size={24} onPress={() => {
                navigation.navigate('Notification')
              }} />
            </Text>
            <Text style={{color: darkMode ? 'white' : 'black'}}>
              <Feather name="search" size={24} />
            </Text>

           
          </View>
        </View>

        <View className="flex-row items-center gap-4 mt-1">
          <View className="bg-gray-400 px-4 py-1 rounded-xl border border-[#e9ebf2]" style={{backgroundColor: darkMode ? '#d2d8e4' : 'grey'}}>
            <Text className="text-white text-base" style={{color: darkMode ? 'black' : 'white'}}>Explore</Text>
          </View>

          <View className=" px-4 py-1 rounded-xl border border-[#e9ebf2]" style={{backgroundColor: darkMode ? '#d2d8e4' : 'grey'}}>
            <Text className="text-white text-base" style={{color: darkMode ? 'black' : 'white'}}>Manage your Errands</Text>
          </View>
        </View>

        <View className="mt-10">
          <Text className=" text-[25px] leading-7 font-bold" style={{color: darkMode ? 'white' : 'black'}}>
            What do you need help with?
          </Text>

          <View className="mt-4 w-[90vw] flex-row flex-wrap items-center mx-auto">
            {data
              ? data?.data?.map((category: any) => (
                  <>
                    <View className="flex-row mt-3 " key={category.id}>
                      <TouchableOpacity
                        className="border-[#e9ebbf2] border px-4 py-1 rounded-xl mr-2 bg-white"
                        style={{backgroundColor: darkMode ? '#1E3A79' : 'white'}}
                        onPress={() => {
                          dispatch(getDraftErrand())
                          navigation.navigate('LandingForm', { category })
                        }}
                        key={category.id}
                      >
                        <Text className="text-base" style={{color: darkMode ? 'white' : 'black'}}>{`${category.description}`}</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ))
              : null}
          </View>
        </View>

        <View className="mt-12">
          <Text className=" text-[25px] leading-7 font-bold" style={{color: darkMode ? 'white' : 'black'}}>
            Urgent Errands
          </Text>

          <ScrollView horizontal>
            <LandingDetails navigation={navigation} darkMode={darkMode}/>
          </ScrollView>
        </View>
      </ScrollView>
      <PostErrandButton className='bottom-20 right-0' />
    </SafeAreaView>
    </>
  )
}

export default LandingTest
