import { View, Text, Image } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';

const OnboardingUi = () => {
  const navigation = useNavigation()

  const handleDone = () =>{
    navigation.navigate('GuestScreen')
  }

  const handleOnSkip = () =>{
    navigation.navigate('GuestScreen')
  }
  return (

    <Onboarding
    onDone={handleDone}
    onSkip={handleOnSkip}

  pages={[


    {
      backgroundColor: 'black',
      image: <Image source={require('../../assets/images/Swave_2.png')}
      
      />,
      title: '',
      subtitle: '',
     
    },

    {
      backgroundColor: 'black',
      image: <Image source={require('../../assets/images/Swave_2.png')}
      
      />,
      title: '',
      subtitle: '',
     
    },


    {
      backgroundColor: 'black',
      image: <Image source={require('../../assets/images/Swave_2.png')}
      
      />,
      title: '',
      subtitle: '',
     
    },

  ]}
/>

  )
}

export default OnboardingUi