import React, { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { ActivityIndicator, SafeAreaView, TouchableOpacity, View } from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { _fetch } from '../../services/axios/http'

const DefaultGuestScreen = ({navigation}: any) => {
  const [adsImages, setAdsImages] = useState([])
  const [loading, setLoading] = useState(false)

  const getAdsImages = async () => {
    setLoading(true)
    const _rs = await _fetch({
      _url: '/advert-image',
      method: 'GET',
    })
    const rs = await _rs.json()
    const images = rs?.data.map((data: any) => data.url)

    setAdsImages(images)
    setLoading(false)
  }

  useEffect(() => {
    getAdsImages()
  }, [])

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '',
        }}
      >
        <ActivityIndicator color={'blue'} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0c1730',
      }}
    >
      {/* <Image
        style={{
          width: 120,
          height: 100,
          resizeMode: 'contain',
        }}
        source={require('../../assets/images/SWAVE-logo.png')}
      /> */}
      <SliderBox
        height={200}
        width={100}
        imageLoadingColor="black"
        autoplay={true}
        images={adsImages}
        sliderBoxHeight={740}
        autoplayInterval={4000}
        circleLoop={true}
      />

      <View
        className="w-full h-[60px] absolute bottom-0 flex-row justify-between items-center bg-[#1E3A79]"
        style={{ display: loading ? 'none' : 'flex' }}
      >
        <TouchableOpacity
          className="bg-[#1E3A79] w-[100%] h-[60px] items-center justify-center"
          onPress={() => navigation.navigate('GuestScreen')}
        >
          <Text className="text-white text-lg font-medium text-center">
            Go to Market
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          className="bg-[#2856c1] w-[50%] h-[60px] items-center justify-center"
          // onPress={() => navigation.navigate('VerifyPhone')}
        >
          <Text className="text-white text-lg text-center font-medium">
            Sign Up
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  )
}

export default DefaultGuestScreen
