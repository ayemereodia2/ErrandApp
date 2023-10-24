import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SliderBox } from 'react-native-image-slider-box'
import { _fetch } from '../../services/axios/http'

const DefaultGuestScreen = ({ navigation }: any) => {
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
        imageLoadingColor="white"
        autoplay={true}
        images={adsImages}
        sliderBoxHeight={740}
        autoplayInterval={14000}
        circleLoop={true}
      />

      <View
        className=" h-[50px] absolute top-32 left-8 flex-row justify-between items-center bg-[#1E3A79] w-[48%] px-3 rounded-lg"
        style={{ display: loading ? 'none' : 'flex' }}
      >
        <TouchableOpacity
          className="bg-[#1E3A79] items-center justify-center flex-row"
          onPress={() => navigation.navigate('GuestScreen')}
        >
          <Text className="text-white text-lg font-medium text-center pr-2">
            Visit the market
          </Text>
          <AntDesign name="arrowright" color="white" size={20} />
        </TouchableOpacity>
      </View>

      {loading ? (
        ''
      ) : (
        <View
          className="w-full h-[60px] absolute bottom-0 flex-row justify-between items-center bg-[#1E3A79]"
          style={{ display: loading ? 'none' : 'flex' }}
        >
          <TouchableOpacity
            className="bg-[#1E3A79] w-[50%] h-[60px] items-center justify-center"
            onPress={() => navigation.navigate('Login')}
          >
            <Text className="text-white text-lg font-medium text-center">
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#2856c1] w-[50%] h-[60px] items-center justify-center"
            onPress={() => navigation.navigate('VerifyPhone')}
          >
            <Text className="text-white text-lg text-center font-medium">
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  )
}

export default DefaultGuestScreen
