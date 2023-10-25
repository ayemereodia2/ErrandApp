import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  ActivityIndicator, ImageBackground, SafeAreaView,
  Text, TouchableOpacity, View
} from 'react-native'
import Swiper from 'react-native-swiper'
import { _fetch } from '../../services/axios/http'


const DefaultGuestScreen = ({ navigation }) => {
  const [adsImages, setAdsImages] = useState([])
  const [loading, setLoading] = useState(false)

  const getAdsImages = async () => {
    setLoading(true)
    const _rs = await _fetch({
      _url: '/advert-image',
      method: 'GET',
    })
    const rs = await _rs.json()
    const images = rs?.data.map((data) => data.url)

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

  // const ads = ["https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_1.png", "https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_2.png", "https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_3.png", "https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_5.png", "https://d2ti6ck6wvghce.cloudfront.net/swave-staging/advert/64add98dc88053e63511f154/advert_image_4.png"]

  const ads = ['../../assets/images/slide-1.png','../../assets/images/slide-2.png', '../../assets/images/slide-3.png', '../../assets/images/slide-4.png', '../../assets/images/slide-5.png' ]

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

   
    <Swiper autoplayTimeout={2000} loop={true} autoplay={true} activeDotColor={"white"}>
       <ImageBackground source={{uri: ads[0]}} resizeMode="cover" style={{flex:1}}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: "#000",
              opacity: 0.3,
            }}
          ></View>
         <View
        className=" h-[50px] absolute top-24 left-6 flex-row justify-between items-center bg-[#1E3A79] w-[48%] px-3 rounded-lg"
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


      </ImageBackground>


         <ImageBackground source={{uri: ads[2]}} resizeMode="cover" style={{flex:1}}>
          <View
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: "#000",
              opacity: 0.3,
            }}
          ></View>
        
         <View
        className=" h-[50px] absolute top-24 left-6 flex-row justify-between items-center bg-[#1E3A79] w-[48%] px-3 rounded-lg"
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
        </ImageBackground>
        
      </Swiper>
    
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
}

export default DefaultGuestScreen
