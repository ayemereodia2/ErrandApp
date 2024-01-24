import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

const OnboardingUi = () => {
  const navigation = useNavigation()

  const handleDone = () => {
    navigation.navigate('Default')
  }

  const handleOnSkip = () => {
    navigation.navigate('Default')
  }
  return (
    <Onboarding
      onDone={handleDone}
      onSkip={handleOnSkip}
      pages={[
        {
          backgroundColor: '#1A3A70',
          image: (
            <Image
              source={require('../../assets/images/part1.jpg')}
              className="w-screen h-screen mt-28"
            />
          ),
          title: '',
          subtitle: '',
        },

        {
          backgroundColor: '#1A3A70',
          image: (
            <Image
              source={require('../../assets/images/part2.jpg')}
              className="w-screen h-screen mt-28"
            />
          ),
          title: '',
          subtitle: '',
        },

        {
          backgroundColor: '#1A3A70',
          image: (
            <Image
              source={require('../../assets/images/part3.jpg')}
              className="w-screen h-screen mt-28"
            />
          ),
          title: '',
          subtitle: '',
        },

        {
          backgroundColor: '#1A3A70',
          image: (
            <Image
              source={require('../../assets/images/part4.jpg')}
              className="w-screen h-screen mt-28"
            />
          ),
          title: '',
          subtitle: '',
        },

        {
          backgroundColor: '#1A3A70',
          image: (
            <Image
              source={require('../../assets/images/part5.jpg')}
              className="w-screen h-screen mt-28"
            />
          ),
          title: '',
          subtitle: '',
        },
      ]}
    />
  )
}

export default OnboardingUi
