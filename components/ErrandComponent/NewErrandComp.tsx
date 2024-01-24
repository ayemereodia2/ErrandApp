import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { errandDetails } from '../../services/errands/errandDetails'
import { RootState, useAppDispatch } from '../../services/store'
import { MarketData } from '../../types'
import { getAddress, getCardTimeAgo, getTimeAgo } from '../../utils/helper'
import HTML from 'react-native-render-html';
import { StyleSheet } from 'react-native'
import { ImageBackground } from 'react-native'
import { ImageBackgroundBase } from 'react-native'



interface ErrandCardProp {
  errand: MarketData
  navigation: any
  toggleAvatarModal: any
}

export default function NewErrandComp({
  errand,
  navigation,
  toggleAvatarModal,
}: ErrandCardProp) {
  const [address, setAddress] = useState('')
  const dispatch = useAppDispatch()

  // const navigation = useNavigation()
  const budgetInNaira = Number(errand?.budget / Number(100))
  const MAX_ADDRESS_LENGTH = 50 // Maximum character length for address

  const truncateAddress = (text: string, maxLength: number) => {
    if (text?.length > maxLength) {
      return text?.substring(0, maxLength) + '...'
    }
    return text
  }

  //  const regex = /(<([^>]+)>)/gi;

  const regex = /(<(?:[^>'"]|(['"])(?:(?!\2).)*\2)*>)/gi;


 

  const result = errand.description.replace(regex, '')
 

  const truncatedAddress = truncateAddress(address, MAX_ADDRESS_LENGTH)

  const truncatedAddressText = truncateAddress(
    errand?.pickup_address?.address_text,
    MAX_ADDRESS_LENGTH,
  )

  // const mob_Address = truncateAddress(address, 20)

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false


 

  return (
<>
<ScrollView>
    <View className='bg-[#09497D] mt-2 pt-[9px] border border-[#C6C3D8] px-[0.2px]  rounded-[10px] '>
  <View className='rounded-b-[14px]'>
  <ImageBackground source={require('../../assets/images/errandCard2.jpg')}
                className=' bg-[#FFF] rounded-2xl  h-[200px] pt-6 pl-4 '
                 resizeMode='cover'>
    <Text>{errand?.user?.first_name} {errand?.user?.last_name}</Text>
    </ImageBackground>
  </View>
  </View>
  </ScrollView>
   
    </>
  )
}