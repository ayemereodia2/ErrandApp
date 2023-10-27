import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { useNavigation } from '@react-navigation/native'

const AboutSwave = () => {

    const navigation = useNavigation()

    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
        loading,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <SafeAreaView className='px-4 h-full pt-4 w-full' style={{backgroundColor: backgroundTheme}}>

      <ScrollView className='mx-4 mb-5' showsVerticalScrollIndicator={false}>
        
        <View className='flex-row items-center mb-5'>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text  style={{color: textTheme}} className='ml-2'> <AntDesign name="arrowleft" size={24} /> </Text>
            </TouchableOpacity>
            <Text style={{color: textTheme}} className='mx-auto text-lg font-bold'> About Swave</Text>
        </View>

    <Text  className='text-[40px] mx-auto mb-4 text-yellow-200'> We are SWAVE </Text>
      <Text style={{color: textTheme}} className='text-base'>We are rethinking and reshaping how business services and errands will be done with limitless and borderless possibilities for anyone, anywhere all over Africa.</Text>

      <Text  className='text-[40px] mx-auto mb-2 mt-5 text-yellow-200'> OUR MISSION </Text>
      <Text style={{color: textTheme}} className='text-base'>Our Mission is to create a dynamic ecosystem where every interaction enhances lives, where opportunities are accessible to all, and where innovation knows no limits.</Text>
      <Text style={{color: textTheme}} className='text-base'>We're not just building a platform; we're building a movement that amplifies the voices of entrepreneurs, uplifts local businesses, and cultivates a sense of unity across Africa. We are dedicated to erasing geographical boundaries and economic disparities, fostering connections that enable individuals and businesses to thrive.</Text>
      <Text style={{color: textTheme}} className='text-base'>We believe that Africa can only rise when poverty is not continuously managed, but a pathway is created for Africa to proper. This is our SWAVE Mission.</Text>


      <Text  className='text-[40px] mx-auto mb-2 mt-7 text-yellow-200'> OUR VISION </Text>
      <Text style={{color: textTheme}} className='text-[25px] mb-2'> The ROAD ahead. </Text>
      <Text style={{color: textTheme}} className='text-base'>At SWAVE, our Vision is to become Africa's first and leading brand in the creation of an online borderless trade zone in Africa where anyone and everyone can engage in business activities (services, errands, hiring, and more) through a seamless digital marketplace and further unite, empower, and transform our African communities.</Text>
      

      </ScrollView>
    </SafeAreaView>
  )
}

export default AboutSwave