import { AntDesign } from '@expo/vector-icons';
import { Restart } from 'fiction-expo-restart';
import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';


import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Swiper from 'react-native-swiper';

type Props = {
  navigation: any
}

function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

const ImageViewer = ({ navigation }: Props) => {
  return (
    <>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          backgroundColor: '#000',
          opacity: 0.3,
        }}
      ></View>
      <View className=" h-[50px] absolute top-24 left-6 flex-row justify-between items-center bg-[#1E3A79] w-[48%] px-3 rounded-lg">
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

      <View className=" h-[50px] absolute bottom-14 flex-row px-3 rounded-lg w-[80%] space-x-4">
        <TouchableOpacity
          className="bg-[#1E3A79] items-center justify-center flex-row py-2 px-4 rounded-lg w-[60%]"
          onPress={() => navigation.navigate('Login')}
        >
          <Text className="text-white text-lg font-medium text-center">
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-[#1E3A79] items-center justify-center flex-row py-2 px-4 rounded-lg w-[60%]"
          onPress={() => navigation.navigate('VerifyPhone')}
        >
          <Text className="text-white text-lg font-medium text-center pr-2">
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const DefaultGuestScreen = ({ navigation }: any) => {
  const [adsImages, setAdsImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [appIsReady, setAppIsReady] = useState(false)

  



  async function loadResourcesAndDataAsync() {
    try {
      SplashScreen.preventAutoHideAsync()

      const imageAssets = cacheImages([
        require('../../assets/images/slide--1.jpeg'),
        require('../../assets/images/slide--2.jpeg'),
        require('../../assets/images/slide--3.jpeg'),
        require('../../assets/images/slide--4.jpeg'),
        require('../../assets/images/slide--5.jpeg'),
      ])

      await Promise.all([...imageAssets])
    } catch (e) {
      // You might want to provide this error information to an error reporting service
      console.warn(e)
    } finally {
      setAppIsReady(true)
      SplashScreen.hideAsync()
    }
  }

  // const getAdsImages = async () => {
  //   setLoading(true)
  //   const _rs = await _fetch({
  //     _url: '/advert-image',
  //     method: 'GET',
  //   })
  //   const rs = await _rs.json()
  //   const images = rs?.data.map((data) => data.url)

  //   setAdsImages(images)
  //   setLoading(false)
  // }

  useEffect(() => {
    Restart()
    loadResourcesAndDataAsync()
    // getAdsImages()
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

  if (!appIsReady) {
    return null
  }

  // const ads = [
  //   'https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_1.png',
  //   'https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_2.png',
  //   'https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_3.png',
  //   'https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_5.png',
  //   'https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_4.png',
  // ]

  // const ads = [
  //  '../../assets/images/slide--1.jpeg','../../assets/images/slide--2.jpeg', '../../assets/images/slide--3.jpeg', '../../assets/images/slide--4.jpeg', '../../assets/images/slide--5.jpeg'
  // ]

  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: '#0c1730',
    //   }}
    // >

    //   <SliderBox
    //     height={200}
    //     width={100}
    //     imageLoadingColor="white"
    //     autoplay={true}
    //     images={adsImages}
    //     sliderBoxHeight={740}
    //     autoplayInterval={14000}
    //     circleLoop={true}
    //   />

    //   <View
    //     className=" h-[50px] absolute top-32 left-8 flex-row justify-between items-center bg-[#1E3A79] w-[48%] px-3 rounded-lg"
    //     style={{ display: loading ? 'none' : 'flex' }}
    //   >
    //     <TouchableOpacity
    //       className="bg-[#1E3A79] items-center justify-center flex-row"
    //       onPress={() => navigation.navigate('GuestScreen')}
    //     >
    //       <Text className="text-white text-lg font-medium text-center pr-2">
    //         Visit the market
    //       </Text>
    //       <AntDesign name="arrowright" color="white" size={20} />
    //     </TouchableOpacity>
    //   </View>

    //   {loading ? (
    //     ''
    //   ) : (
    //     <View
    //       className="w-full h-[60px] absolute bottom-0 flex-row justify-between items-center bg-[#1E3A79]"
    //       style={{ display: loading ? 'none' : 'flex' }}
    //     >
    //       <TouchableOpacity
    //         className="bg-[#1E3A79] w-[50%] h-[60px] items-center justify-center"
    //         onPress={() => navigation.navigate('Login')}
    //       >
    //         <Text className="text-white text-lg font-medium text-center">
    //           Login
    //         </Text>
    //       </TouchableOpacity>

    //       <TouchableOpacity
    //         className="bg-[#2856c1] w-[50%] h-[60px] items-center justify-center"
    //         onPress={() => navigation.navigate('VerifyPhone')}
    //       >
    //         <Text className="text-white text-lg text-center font-medium">
    //           Sign Up
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   )}

    // </SafeAreaView>

    <>
      <StatusBar translucent backgroundColor="transparent" />

      <Swiper
        loop={true}
        autoplay={true}
        autoplayTimeout={7}
        activeDotColor={'white'}
       
      >
        <ImageBackground
          source={require('../../assets/images/slide--1.jpeg')}
          resizeMode="cover"
          style={{ flex: 1 }}
          
        >
         
        

          <ImageViewer navigation={navigation} />
        </ImageBackground>
        <ImageBackground
          source={require('../../assets/images/slide--2.jpeg')}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          
          

          <ImageViewer navigation={navigation} />
        </ImageBackground>
        <ImageBackground
          source={require('../../assets/images/slide--3.jpeg')}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <ImageViewer navigation={navigation} />
        </ImageBackground>
        <ImageBackground
          source={require('../../assets/images/slide--4.jpeg')}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <ImageViewer navigation={navigation} />
        </ImageBackground>
        <ImageBackground
          source={require('../../assets/images/slide--5.jpeg')}
          resizeMode="cover"
          style={{ flex: 1 }}
        >
          <ImageViewer navigation={navigation} />
        </ImageBackground>
      </Swiper>
    </>
  )
}

const styles = {
  wrapper: {
    flex: 1,
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  fadeContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Adjust the background color for the fade effect
  },
}

export default DefaultGuestScreen
