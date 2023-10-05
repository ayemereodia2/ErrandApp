import { View, Text, Image, SafeAreaView } from 'react-native'
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
      backgroundColor: '#1A3A70',
      image: <Image source={require('../../assets/images/part1.jpg')} className='w-screen h-screen mt-28'     />,
      title: '',
      subtitle: '',
      
     
    },

    {
      backgroundColor: '#1A3A70',
      image: <Image source={require('../../assets/images/part2.jpg')}   className='w-screen h-screen mt-28'  />,
      title: '',
      subtitle: '',
     
    },


    {
      backgroundColor: '#1A3A70',
      image: <Image source={require('../../assets/images/part3.jpg')}   className='w-screen h-screen mt-28'  />,
      title: '',
      subtitle: '',
     
    },

    {
      backgroundColor: '#1A3A70',
      image: <Image source={require('../../assets/images/part4.jpg')}   className='w-screen h-screen mt-28'  />,
      title: '',
      subtitle: '',
     
    },


    {
      backgroundColor: '#1A3A70',
      image: <Image source={require('../../assets/images/part5.jpg')}   className='w-screen h-screen mt-28'  />,
      title: '',
      subtitle: '',
     
    },

  ]}
/>


  )
}

export default OnboardingUi