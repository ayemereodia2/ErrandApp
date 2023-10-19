import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const ProfileVerification = ({user}:any) => {

    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <View className='mx-4 mt-3'>
      <View className="flex-row justify-between items-center mx-4">
           
            <Text className="font-light leading-8 " style={{color: textTheme}}>Email Verification</Text>
            <View className="w-[100px] h-[34px] bg-[] justify-center items-center rounded-[20px]" style={{backgroundColor: user.has_verified_email ? '#D8F8E9' : '#FEE1CD'}}>
              <Text  className="text-[#115A38] font-md text-sm" style={{color: user.has_verified_email ? 'green' : 'red'}}>
              {user.has_verified_email ? 'Completed' : 'Incomplete'}</Text>
            </View>
          </View>


          <View className="flex-row justify-between items-center mt-3 mx-4">
           
            <Text className="font-light leading-8 " style={{color: textTheme}}>Phone Verification</Text>
            <View className="w-[100px] h-[34px] bg-[#D8F8E9] justify-center items-center rounded-[20px]" style={{backgroundColor: user.has_verified_phone ? '#D8F8E9' : '#FEE1CD'}}>
              <Text  className="text-[#115A38] font-md text-sm" style={{color: user.has_verified_phone ? 'green' : 'red'}}>
                {user.has_verified_phone ? 'Completed' : 'Incomplete'}</Text>
            </View>
          </View>


          <View className="flex-row justify-between items-center mx-4 mt-3">
           
            <Text className="font-light leading-8 " style={{color: textTheme}}>Address Verification</Text>
            <View className="w-[100px] h-[34px] bg-[#D8F8E9] justify-center items-center rounded-[20px] " style={{backgroundColor: user.has_verified_loaction ? '#D8F8E9' : '#FEE1CD'}}>
              <Text  className="text-[#115A38] font-md text-sm" style={{color: user.has_verified_loaction ? '#D8F8E9' : 'red'}}> 
              {user.has_verified_location ? 'Completed' : 'Incomplete'}</Text>
            </View>
          </View>
    </View>
  )
}

export default ProfileVerification