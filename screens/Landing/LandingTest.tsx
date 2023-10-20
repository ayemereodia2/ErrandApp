import { Feather, FontAwesome } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  BackHandler,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Container from '../../components/Container'
import LandingDetails from '../../components/LandingDetails.tsx/LandingDetails'
import NewNotifications from '../../components/NewNotifications/NewNotifications'
import PostErrandButton from '../../components/PostErrandBtn'
import { _fetch } from '../../services/axios/http'
import { getDraftErrand } from '../../services/errands/getDraftErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { getTimeOfDay, getUserId } from '../../utils/helper'

const LandingTest = ({ navigation }: any) => {
  const loaderGif = '../../assets/images/loading-SWAVE.gif'
  const [clicked, setClicked] = useState(false)
  // const theme = useColorScheme()
  // const isDarkTheme = theme === 'dark'
  // const [darkMode, setDarkMode] = useState(false)

  // const handleDarkMode = () => {
  //   setDarkMode(!darkMode)
  // }

  const dispatch = useAppDispatch()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
    loading,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  useEffect(() => {
    getUserId({})
  }, [])

  // console.log('>>>>>>themeBackgriubd', backgroundTheme, textTheme)

  const getCategory = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/categories?limit=8`,
    })

    return await _rs.json()
    

  }

  const getProfile = async () => {

    const _rs1 = await _fetch({
      method: 'GET',
      _url: `/user/profile`,
    })

    return await _rs1.json()

  }

  

  const { isLoading: isCategoryLoading, data: categoryData, isError:  isCategoryError} = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    refetchOnMount: 'always',
  })

  const { isLoading: isProfileLoading, data: profileData, isError:  isProfileError} = useQuery({
    queryKey: ['get-profile'],
    queryFn: getProfile,
    refetchOnMount: 'always',
  })


  // console.log(data)
  console.log(profileData)

  useFocusEffect(() => {
    const onBackPress = () => {
      if (currentUser) {
        return true // Prevent navigation back to the login screen
      }
      return false // Allow navigation back to the login screen
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  })

  if (loading || isCategoryLoading || isProfileLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
      >
        {/* <Image
          style={styles.image}
          className="mx-auto"
          source={require(loaderGif)}
        /> */}
        <ActivityIndicator color={theme ? 'blue': 'white'} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <Container>
      <SafeAreaView
        className="px-4 w-screen"
        style={{ backgroundColor: backgroundTheme }}
      >
        <StatusBar backgroundColor={backgroundTheme} barStyle={theme ? "light-content" : 'dark-content'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* <View
            style={{
              marginBottom: Platform.OS === 'android' ? 10 : 35,
            }}
          > */}
          <View className="mt-6 flex-row items-center justify-between">
            <Text
              className="font-bold text-[25px] leading-7"
              style={{ color: textTheme }}
            >
              Good {getTimeOfDay()} {profileData.data.first_name ? profileData.data.first_name : ''}
            </Text>

            <View className="items-center flex-row gap-4 mr-2">
              <Text style={{ color: textTheme }}>
                <FontAwesome
                  name="bell-o"
                  size={24}
                  onPress={() => {
                    navigation.navigate('Notification')
                  }}
                />
              </Text>
              <Text style={{ color: textTheme }}>
                <Feather
                  name="help-circle"
                  size={24}
                  onPress={() => {
                    navigation.navigate('Contact')
                  }}
                />
              </Text>
            </View>
          </View>

          <View className="flex-row items-center gap-4 mt-1">
            <TouchableOpacity
              onPress={() => navigation.navigate('Market')}
              className="bg-gray-200 px-4 py-1 rounded-xl border border-[#e9ebf2]"
              style={{ backgroundColor: landingPageTheme }}
            >
              <Text
                className="text-white text-base"
                style={{ color: theme ? 'black' : 'white' }}
              >
                Explore
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate('MyErrands')}
              className=" px-4 py-1 rounded-xl border border-[#e9ebf2] "
              style={{ backgroundColor: landingPageTheme }}
            >
              <Text
                className=" text-base"
                style={{ color: theme ? 'black' : 'white' }}
              >
                Manage your Errands
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mt-10">
            <Text
              className=" text-[25px] leading-7 font-bold"
              style={{ color: textTheme }}
            >
              What do you need help with?
            </Text>

            <View className="mt-4 w-[90vw] flex-row flex-wrap items-center mx-auto">
              {categoryData
                ? categoryData?.data?.map((category: any) => (
                    <>
                      <View className="flex-row mt-3 " key={category.id}>
                        <TouchableOpacity
                          className="border-[#aaa] border px-4 py-1 rounded-xl mr-2 bg-white"
                          style={{
                            backgroundColor: theme ? '#1E3A79' : 'white',
                          }}
                          onPress={() => {
                            dispatch(getDraftErrand())
                            navigation.navigate('LandingForm', { category })
                          }}
                          key={category.id}
                        >
                          <Text
                            className="text-base"
                            style={{ color: textTheme }}
                          >{`${category.description}`}</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ))
                : null}
            </View>
          </View>

          <View className="mt-12">
            <Text
              className=" text-[25px] leading-7 font-bold"
              style={{ color: textTheme }}
            >
              Urgent Errands
            </Text>

            <ScrollView horizontal showHorizontalIndicator={false}>
              <LandingDetails navigation={navigation} />
            </ScrollView>
          </View>

          <View className="mt-4">
            <Text
              className=" text-[25px] leading-7 font-bold"
              style={{ color: textTheme }}
            >
              You may have missed these...
            </Text>
          </View>
          <NewNotifications />
          {/* </View> */}
        </ScrollView>
        {!isCategoryLoading || !isProfileLoading && <PostErrandButton className="bottom-5 right-3" />}
      </SafeAreaView>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#0c1730',
  },
  image: {
    width: 200,
    height: 200,
  },
})

export default LandingTest
