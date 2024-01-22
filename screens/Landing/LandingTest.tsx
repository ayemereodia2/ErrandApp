import {
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Swiper from 'react-native-deck-swiper';
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'

import NewNotifications from '../../components/NewNotifications/NewNotifications'
import PostErrandButton from '../../components/PostErrandBtn'
import PinModal from '../../components/VerificationModals/PinModal'
import { currentUserDetails } from '../../services/auth/currentUserInfo'
import { _fetch } from '../../services/axios/http'
import { getDraftErrand } from '../../services/errands/getDraftErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { categories } from '../../utils/categories'
import { useFonts } from 'expo-font'
import  test  from '../../data'
import UrgentErrandCard from '../../components/UrgentErrandCard'
import { StatusBar } from 'react-native'



const LandingTest = ({ navigation }: any) => {
  const loaderGif = '../../assets/images/loading-SWAVE.gif'
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['50%'], [])
  const snapPoints1 = useMemo(() => ['67%'], [])
  const [verifiedPin, setVerifiedPin] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const flatListRef = useRef<any>(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)
  const [index, setIndex] = React.useState(0)
  const [market, setMarket] = useState([])
  const [checked, setChecked] = useState(false)

  const handleChecked = () => {
    setChecked(true)
  }


  function openPinModal() {
    bottomSheetRef.current?.present()
  }

  function closePinModal() {
    bottomSheetRef.current?.dismiss()
  }

  function openMoreModal() {
    bottomSheetRef1.current?.present()
  }

  function closeMoreModal() {
    bottomSheetRef1.current?.dismiss()
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          bottomSheetRef.current?.dismiss()
          bottomSheetRef1.current?.dismiss()
        }}
      />
    ),
    [],
  )

  const [clicked, setClicked] = useState(false)
  const dispatch = useAppDispatch()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
    loading,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const getMarket = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/market`,
      // _url: `/errand/market`,
    })
    return await _rs.json()
  }

  // const getMarket = async () => {
    
  //     const _rs = await _fetch({
  //       method: 'GET',
  //       _url: `/errand/market?urgent=1`,
  //       // _url: `/errand/market`,
  //     });
  
      
  //       const marketData = await _rs.json();
  //      return setMarket(marketData)
  //      console.log(market)
    
    
  // };

  // const getMarket = async () => {
  //   try {
  //     const _rs = await _fetch({
  //       method: 'GET',
  //       _url: `/errand/market`,
  //     });
  
  //     if (_rs.ok) {
  //       const data = await _rs.json();
  //       setMarket(data); // Update the market state
  
  //       // State updates are asynchronous, so you won't see the updated state immediately after calling setMarket
  //       // Logging here might not reflect the updated state
  //       // Instead, you can access the updated state in other function calls or useEffect hooks
  
  //       return data; // Return the fetched data if needed for further processing
  //     } else {
  //       throw new Error('Failed to fetch data');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     return []; // Return an empty array in case of an error
  //   }
  // };
  
  // // Calling getMarket somewhere in your code:
  // getMarket()
  //   .then(data => {
  //     // You can perform any further operations with the fetched data here
  //     console.log(data); // Log the fetched data if needed for processing
  //   })
  //   .catch(error => {
  //     // Handle any errors that occurred during fetching
  //     console.error('Error:', error);
  //   });
  
  
 
  

  const {
    isLoading: loadingMarket,
    isSuccess: success,
    data: marketData,
  } = useQuery({
    queryKey: ['get-market'],
    queryFn: getMarket,
  })

  const getCategory = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/categories?limit=8`,
    })
    return await _rs.json()
  }

  const getNotifications = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/app-notification?count=5`,
    })
    return await _rs.json()
  }

  const {
    isLoading: loadingNotification,
    isSuccess,
    data: notifications,
  } = useQuery({
    queryKey: ['get-notification'],
    queryFn: getNotifications,
    refetchOnMount: 'always',
  })

  const { isLoading, data, isError } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    refetchOnMount: 'always',
  })

  // useEffect(() => {
  //   if (data?.data?.length > 0) {
  //     const scrollInterval = setInterval(() => {
  //       // Calculate the next index in a circular manner
  //       const nextIndex = (currentIndex + 1) % data?.data?.length

  //       // Scroll to the next item
  //       flatListRef.current?.scrollToIndex({
  //         index: nextIndex,
  //         animated: true,
  //       })

  //       // Update the currentIndex for the next iteration
  //       setCurrentIndex(nextIndex)
  //     }, 2000) // Change the interval time as needed (e.g., 5000 milliseconds for 5 seconds)

  //     return () => clearInterval(scrollInterval)
  //   }
  // }, [currentIndex, data])

  // const handleScroll = (event: any) => {
  //   const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
  //   const scrollFraction =
  //     contentOffset.x / (contentSize.width - layoutMeasurement.width)
  //   setScrollWidth(scrollFraction * Dimensions.get('window').width)
  // }

  if (data) {
  }

  if (market) {
    console.log(market)
  }

  const onRefresh = React.useCallback(() => {
    // dispatch(myErrandList({ setSearchedErrand }))
    getCategory()
    getMarket()
    getNotifications()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Increment index for auto-scrolling
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.length)
  //     // Use scrollToIndex to animate scrolling
  //     // flatListRef.current?.scrollToIndex({
  //     //   index: currentIndex,
  //     //   animated: true,
  //     // })
  //     if (flatListRef.current) {
  //       flatListRef.current.scrollToIndex({
  //         index: (currentIndex + 1) % data.data.length,
  //       })
  //     }
  //   }, 3000) // Change the interval time as needed

  //   return () => clearInterval(interval)
  // }, [currentIndex])

  const renderItem = ({ item }: any) => (
    // <TouchableOpacity
    //   // Your existing TouchableOpacity properties
    //   onPress={() => {
    //     dispatch(getDraftErrand())
    //     navigation.navigate('LandingForm', { category: item })
    //   }}
    // >
    <TouchableOpacity
      className="border-[#aaa] border h-[150px] w-[150px] justify-center  rounded-xl mr-2 bg-white"
      style={{
        backgroundColor: theme ? '#1E3A79' : 'white',
      }}
      onPress={() => {
        dispatch(getDraftErrand())
        navigation.navigate('LandingForm', { category: item })
      }}
      key={item.id}
    >
      {/* Your existing content inside TouchableOpacity */}
      {getCategoryIcon(item.name)}

      <Text
        className="text-sm font-semibold text-center mt-5"
        style={{ color: textTheme }}
      >{`${item.description}`}</Text>
    </TouchableOpacity>
  )

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Market / Groceries Shopping':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <FontAwesome name="shopping-bag" size={40} />
          </Text>
        )
      case 'Laundry service':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialIcons name="local-laundry-service" size={40} />
          </Text>
        )
      case 'Delivery':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialCommunityIcons name="truck-delivery" size={40} />
          </Text>
        )
      case 'Cleaning/home service':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialIcons name="clean-hands" size={40} />
          </Text>
        )
      case 'General Labour':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialIcons name="work" size={40} />
          </Text>
        )
      case 'Photo / Video Production ':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <FontAwesome name="video-camera" size={40} />
          </Text>
        )
      case 'Home Teacher':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <FontAwesome5 name="chalkboard-teacher" size={40} />
          </Text>
        )
      case 'Any Errand':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialCommunityIcons name="run-fast" size={40} />
          </Text>
        )
    }
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

  const checkPinIsVerified = async () => {
    const isPinVerified = await AsyncStorage.getItem('pin')
    const user_id = (await AsyncStorage.getItem('user_id')) || ''

    dispatch(currentUserDetails({ user_id }))
    if (isPinVerified === 'false') {
      openPinModal()
    }
  }

  const getStuff = async () => {
    try {
      const _rs = await _fetch({
        method: 'GET',
        _url: `/user/test/notification`,
      })

      console.log('>>>>>rs-----', _rs)

      const rs = await _rs.json()

      console.log('>>>>>rs', rs)
    } catch (e) {
      console.log('>>>>>e', e.response)
    }
  }

  useEffect(() => {
    checkPinIsVerified()

    // sendMessage('hello world--')
  }, [])

  const [loaded] = useFonts({
    Roboto: require('../../assets/fonts/Roboto-Regular.ttf'),
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    Axiforma: require('../../assets/fonts/Axiforma-Regular.ttf'),
    // Chillax: require('../../assets/fonts/Chillax-Regular.otf'),
    Chillax: require('../../assets/fonts/Chillax-Medium.ttf')

  });

  if (!loaded) {
    return null
  }

 
  

 

  const onSwiped = () => {
    setIndex(index + 1);
  }



  return (
    <>
      <StatusBar
         barStyle="light-content"
         backgroundColor="lightblue"
         />

<View className='bg-[#FEFEFE]'>
<View className='bg-purple-200 h-[230px] w-screen shadow-md' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
  <SafeAreaView className='bg-[#09497D] h-[222px] pt-[26px] pb-3 pl-[27px]' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
            
            <View className='flex-row items-center justify-between'>
              
            <Image 
              source={require('../../assets/images/swave-log-web.png')}
              
              alt={'logo'}
              />
                {/* <Text
                  className="font-bold text-[20px] leading-7"
                  style={{ color: textTheme }}
                >
                  Welcome, {currentUser?.first_name}
                </Text> */}

                <View className="items-center flex-row gap-4">
                 
                  <TouchableOpacity
                    onPress={
                      // navigation.navigate('Contact')
                      openMoreModal
                    }
                  >
                    <Text style={{ color: textTheme }}>
                     
                    <Ionicons
                    name="settings-outline"
                    size={26}
                    color={'white'}
                    style={{ marginLeft: 7 }}
                  />
                    </Text>
                  </TouchableOpacity>

                  <Text style={{ color: textTheme }} className='mr-4'>
                    <FontAwesome
                      name="bell-o"
                      size={24}
                      color={'white'}
                      onPress={() => {
                        navigation.navigate('Notification')
                      }}
                    />
                  </Text>
                </View>

            </View>
           
             

              <View>
                <View className='flex-row items-center mt-[43px] '>
                  {currentUser?.profile_picture ? 
                  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image 
                  source={{uri: currentUser?.profile_picture}}
                  
                  alt={'logo'}
                  />
                  </TouchableOpacity>
                  :
                  
                  <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                  <Image 
                  source={require('../../assets/images/profile.png')}
                  className='h-[60px] w-[60px] rounded-[60px]'
                  alt={'logo'}
                  />
                  </TouchableOpacity>

                  // <View className='bg-gray-200 rounded-full p-4'> 
                  //   <Text className=' text-[26px]'>{currentUser?.first_name.charAt(0).toUpperCase()}{currentUser?.last_name.charAt(0).toUpperCase()}</Text>
                  // </View>
                  }

                  <View className='ml-2'>
                  <Text style={{fontFamily: 'Chillax'}} className='text-white font-semibold text-[24px] leading-[38.4px]'>Welcome!</Text>

                  <Text
                  className="font-normal text-[16px]  leading-[25px] text-white"
                  // style={{ color: textTheme }} 
                  style={{fontFamily: 'Axiforma'}}
                >
                {currentUser?.first_name} {currentUser?.last_name} 👋
                </Text>

                  </View>
                
                </View>
             

                </View>

                </SafeAreaView>
             </View>
             </View>
             

      <View
        className="px-4 w-screen bg-[#FEFEFE] flex-1 h-[100%]"
        // style={{ backgroundColor: backgroundTheme, flex: 1 }}
      >
        <BottomSheetModalProvider>
          <View
            style={{
              flexDirection: 'column-reverse',
              marginBottom: Platform.OS === 'android' ? 75 : 35,
            }}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              

              <View className="flex-row items-center justify-center mt-7">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Market')}
                  className="bg-gray-200 pt-[6px] pl-[18px] md:pl-[24px] pb-[6px] pr-[20px] md:pr-[25px] rounded-[20px] border mr-3 md:mr-6 shadow-md border-[#09497D80]"
                  // style={{ backgroundColor: '#3F60AC' }}
                  style={{ backgroundColor: '#fff' }}
                >
                  <Text
                    className=" text-sm text-[#09497D] text-center items-center"
                    // style={{ color: theme ? 'white' : 'white' }}
                    style={{fontFamily: 'Axiforma'}}
                  >
                    Find errands   <Feather name="arrow-up-right" size={16} />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('MyErrands')}
                  className=" pt-[6px]  pl-[24px] pb-[6px] pr-[25px] rounded-[20px] border  shadow-md border-[#09497D80] "
                  style={{ backgroundColor: '#fff' }}
                >
                  <Text
                    className=" text-sm text-[#09497D]"
                    // style={{ color: theme ? 'white' : 'white' }}
                    style={{fontFamily: 'Axiforma'}}
                  >
                    Manage errands  <Feather name="arrow-up-right" size={16} />
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-10">
                {/* <Text
                  className=" text-[20px] font-medium text-[#061737] mb-5 leading-normal"
                  // style={{ color: textTheme, marginBottom: 20 }}
                  style={{fontFamily: 'Chillax'}}
                > */}
                <Text
                  className=" text-[20px] font-medium text-[#061737] mb-5 leading-normal"
                  // style={{ color: textTheme, marginBottom: 20 }}
                  
                >
                    Errand Categories
                </Text>

                {/* <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mt-2  w-[90vw]"
                >
                  {data
                    ? data?.data?.map((category: any) => (
                        <>
                          <View className="flex-row mt-3" key={category.id}>
                            <TouchableOpacity
                              className="border-[#aaa] border h-[220px] w-[250px] justify-center  rounded-xl mr-2 bg-white"
                              style={{
                                backgroundColor: theme ? '#1E3A79' : 'white',
                              }}
                              onPress={() => {
                                dispatch(getDraftErrand())
                                navigation.navigate('LandingForm', { category })
                              }}
                              key={category.id}
                            >
                              {category.name ===
                              'Market / Groceries Shopping' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <FontAwesome name="shopping-bag" size={40} />
                                </Text>
                              ) : category.name === 'Laundry service' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialIcons
                                    name="local-laundry-service"
                                    size={40}
                                  />
                                </Text>
                              ) : category.name === 'Delivery' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialCommunityIcons
                                    name="truck-delivery"
                                    size={40}
                                  />
                                </Text>
                              ) : category.name === 'Cleaning/home service' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialIcons name="clean-hands" size={40} />
                                </Text>
                              ) : category.name === 'General Labour' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialIcons name="work" size={40} />
                                </Text>
                              ) : category.name ===
                                'Photo / Video Production ' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <FontAwesome name="video-camera" size={40} />
                                </Text>
                              ) : category.name === 'Home Teacher' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <FontAwesome5
                                    name="chalkboard-teacher"
                                    size={40}
                                  />
                                </Text>
                              ) : category.name === 'Any Errand' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialCommunityIcons
                                    name="run-fast"
                                    size={40}
                                  />
                                </Text>
                              ) : null}

                              <Text
                                className="text-sm font-semibold text-center mt-5"
                                style={{ color: textTheme }}
                              >{`${category.description}`}</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      ))
                    : null}

                  <View className="flex-row mt-3 ">
                    <TouchableOpacity
                      className="border-[#aaa] border h-[150px] w-[150px] rounded-xl mr-2 bg-white"
                      style={{
                        backgroundColor: theme ? '#1E3A79' : 'white',
                      }}
                      onPress={() => {
                        navigation.navigate('CreateErrand')
                      }}
                    >
                      <Text
                        className="text-sm font-semibold text-center justify-center pt-[40%]"
                        style={{ color: textTheme }}
                      >
                        I need something else...
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView> */}


                {/* new design */}

                  <View className='flex-row items-center flex-wrap'>
                   {data ? data.data
                   .filter(category => category.name !== 'Any Errand')
                   .map((category: any) => (
                    <>
                    <View>

                      <View className='ml-2 mt-2 shadow-lg'>
                      <TouchableOpacity
                              className="border-[#aaa]  h-[77px]  w-[77px] justify-center rounded-[20px]  mr-2 bg-white"
                              style={{
                                // backgroundColor: theme ? '#1E3A79' : 'white',
                                // backgroundColor: category.name === 'Laundry service' ? '#09497D' : 'white'
                                backgroundColor:  'white'

                              }}
                              onPress={() => {
                                dispatch(getDraftErrand())
                                navigation.navigate('LandingForm', { category })
                              }}
                              key={category.id}
                            >
                              {category.name ===
                              'Market / Groceries Shopping' ? (
                                // <Text
                                //   className="text-center"
                                //   style={{ color: theme ? 'white' : '#3F60AC' }}
                                // >
                                //   <FontAwesome name="shopping-bag" size={35} />
                                // </Text>
                                <Image
                                source={require('../../assets/images/shopping2.png')}
                                alt='cart'
                                className='w-[43px] h-[43px] mx-auto'
                                
                                />
                              ) : category.name === 'Laundry service' ? (
                                // <Text
                                //   className="text-center"
                                //   style={{ color: theme ? 'white' : '#3F60AC' }}
                                // >
                                //   <MaterialIcons
                                //     name="local-laundry-service"
                                //     size={40}
                                //   />
                                // </Text>
                                <Image
                                source={require('../../assets/images/detergent.png')}
                                alt='cart'
                                className='w-[43px] h-[43px] mx-auto'
                                
                                />
                                
                              ) : category.name === 'Delivery' ? (
                                // <Text
                                //   className="text-center"
                                //   style={{ color: theme ? 'white' : '#3F60AC' }}
                                // >
                                //   <MaterialCommunityIcons
                                //     name="truck-delivery"
                                //     size={40}
                                //   />
                                // </Text>
                                <Image
                                source={require('../../assets/images/delivery2.png')}
                                alt='cart'
                                className='w-[43px] h-[43px] mx-auto'
                                
                                />
                                
                              ) : category.name === 'Cleaning/home service' ? (
                                // <Text
                                //   className="text-center"
                                //   style={{ color: theme ? 'white' : '#3F60AC' }}
                                // >
                                //   <MaterialIcons name="clean-hands" size={40} />
                                // </Text>
                                <Image
                                source={require('../../assets/images/cleaning2.png')}
                                alt='cart'
                                className='w-[43px] h-[43px] mx-auto'
                                
                                />
                              ) : category.name === 'General Labour' ? (
                                // <Text
                                //   className="text-center"
                                //   style={{ color: theme ? 'white' : '#3F60AC' }}
                                // >
                                //   <MaterialIcons name="work" size={40} />
                                // </Text>
                                <Image
                                source={require('../../assets/images/labour.jpg')}
                                alt='cart'
                                className='w-[43px] h-[43px] mx-auto ml-4'
                                
                                />
                              ) : category.name ===
                                'Photo / Video Production ' ? (
                                // <Text
                                //   className="text-center"
                                //   style={{ color: theme ? 'white' : '#3F60AC' }}
                                // >
                                //   <FontAwesome name="video-camera" size={40} />
                                // </Text>
                                <Image
                                source={require('../../assets/images/photo2.png')}
                                alt='cart'
                                className='w-[43px] h-[43px] mx-auto'
                                
                                />
                              ) : category.name === 'Home Teacher' ? (
                                // <Text
                                //   className="text-center"
                                //   style={{ color: theme ? 'white' : '#3F60AC' }}
                                // >
                                //   <FontAwesome5
                                //     name="chalkboard-teacher"
                                //     size={40}
                                //   />
                                // </Text>
                                <Image
                                source={require('../../assets/images/tutor2.png')}
                                alt='cart'
                                className='w-[43px] h-[43px] mx-auto'
                                
                                />
                              ) : category.name === 'Any Errand' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialCommunityIcons
                                    name="run-fast"
                                    size={40}
                                  />
                                </Text>
                              ) : null}
                            </TouchableOpacity>

                        {category.name ===
                              'Market / Groceries Shopping' ? (
                                <Text
                                  className="text-center mt-2 mb-2 font-medium text-sm"
                                  style={{ color: theme ? 'white' : '#061737', fontFamily: 'Axiforma' }}
                                >
                                  Shopping
                                </Text>
                              ) : category.name === 'Laundry service' ? (
                                <Text
                                  className="text-center mt-2 mb-2 font-medium text-sm"
                                  style={{ color: theme ? 'white' : '#061737', fontFamily: 'Axiforma' }}
                                >
                                  Laundry
                                </Text>
                              ) : category.name === 'Delivery' ? (
                                <Text
                                  className="text-center mt-2 mb-2 font-medium text-sm"
                                  style={{ color: theme ? 'white' : '#061737', fontFamily: 'Axiforma' }}
                                >
                                 Delivery
                                </Text>
                              ) : category.name === 'Cleaning/home service' ? (
                                <Text
                                  className="text-center mt-2 mb-2 font-medium text-sm"
                                  style={{ color: theme ? 'white' : '#061737', fontFamily: 'Axiforma' }}
                                >
                                 Cleaning
                                </Text>
                              ) : category.name === 'General Labour' ? (
                                <Text
                                  className="text-center mt-2 mb-2 font-medium text-sm"
                                  style={{ color: theme ? 'white' : '#061737' }}
                                >
                                  Manual Labour
                                </Text>
                              ) : category.name ===
                                'Photo / Video Production ' ? (
                                <Text
                                  className="text-center mt-2 mb-2 font-medium text-sm"
                                  style={{ color: theme ? 'white' : '#061737', fontFamily: 'Axiforma' }}
                                >
                                  Photo/ Video
                                </Text>
                              ) : category.name === 'Home Teacher' ? (
                                <Text
                                  className="text-center mt-2 mb-2 font-medium text-sm"
                                  style={{ color: theme ? 'white' : '#061737', fontFamily: 'Axiforma' }}
                                >
                                  Tutoring
                                </Text>
                             
                              ) : null}
                      </View>

                    

                    </View>
                    </>
                   ) )
                   : null}
                   
                   <View className='ml-2 mt-2 shadow-md'>
                   <TouchableOpacity
                      className="border-[#aaa] h-[77px] w-[77px] justify-center  rounded-xl mr-2 bg-white"
                      style={{
                        // backgroundColor: theme ? '#1E3A79' : 'white',
                      }}
                      onPress={() => {
                        navigation.navigate('CreateErrand')
                      }}
                    >
                      <Text
                        className="text-center"
                        style={{ color: '#3F60AC' }}>
                        <MaterialCommunityIcons name="dots-horizontal-circle" color={'#09497D'} size={35} />
                      </Text>
                    </TouchableOpacity>
                    <Text
                                  className="text-center mt-2 font-medium text-sm"
                                  style={{ color: '#061737', fontFamily: 'Axiforma' }}
                                >
                                  More
                                </Text>
                   </View>

                   </View>

           
 




                {/* <FlatList
                  ref={flatListRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginBottom: 10 }}
                  data={data?.data}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                  extraData={currentIndex}
                  onEndReached={() => {
                    // Handle the end of the list if needed
                  }}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  pagingEnabled
                  onScroll={handleScroll}
                />
                <View
                  style={{
                    marginTop: 10,
                    height: 2,
                    // width: '100%',
                    backgroundColor: 'blue', // Set the color of your scroll indicator
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: scrollWidth,
                  }}
                />
              </View> */}

              </View>

              <View className="mt-10 mb-14">
                {/* <Text
                  className=" text-[20px] font-medium text-[#061737] mb-5 leading-normal ml-4"
                  style={{ color: textTheme, fontFamily: 'Chillax' }}
                > */}
                 <Text
                  className=" text-[20px] font-medium text-[#061737] mb-5 leading-normal ml-4"
                  style={{ color: textTheme }}
                >
                  Urgent Errands
                </Text>

                {/* <TouchableOpacity onPress={() => getStuff()}>
                  <Text>Get Stuff</Text>
            </TouchableOpacity> */}
            <View className=' mb-28'> 
                <Swiper
                cards={marketData ? marketData?.data : []}
                cardIndex={index}
                renderCard={(card) =>
                <UrgentErrandCard card={card} 
                isLoading={loadingMarket}
                navigation={navigation} 
                
                /> }
                
               onSwiped={onSwiped}
               stackSize={2}
               stackScale={12}
               stackSeparation={10}
               cardHorizontalMargin={10}
               cardVerticalMargin={8}
               disableTopSwipe
               disableBottomSwipe
                
                infinite={true}
                backgroundColor="transparent"
                
               
                />  

               </View>
                  

                {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <LandingDetails
                    data={marketData}
                    isLoading={loadingMarket}
                    navigation={navigation}
                  />
                </ScrollView> */}
              </View>

              <View className="mt-48 mb-14">
                {/* <Text
                  className=" text-[20px] font-medium text-[#061737] mb-5 leading-normal"
                  style={{ color: textTheme, fontFamily: 'Chillax' }}
                > */}
                  <Text
                  className=" text-[20px] font-medium text-[#061737] mb-5 leading-normal"
                  style={{ color: textTheme }}
                >
                  You may have missed
                </Text>
              </View>

              
              <NewNotifications
                data={notifications}
                isLoading={loadingNotification}
              />
            </ScrollView>

            <BottomSheetModal
              // android_keyboardInputMode="adjustResize"
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              containerStyle={{
                marginHorizontal: 10,
              }}
              backdropComponent={renderBackdrop}
              // keyboardBehavior="extend"
              // enablePanDownToClose
              // keyboardBlurBehavior="restore"
            >
              <PinModal
                createErrand={false}
                submitErrandhandler={() => {}}
                closePinModal={closePinModal}
                makeWithdrawalHandler={() => {}}
              />
            </BottomSheetModal>

            <BottomSheetModal
              // android_keyboardInputMode="adjustResize"
              ref={bottomSheetRef1}
              index={0}
              snapPoints={snapPoints1}
              containerStyle={{
                marginHorizontal: 10,
              }}
              backdropComponent={renderBackdrop}
              // keyboardBehavior="extend"
              // enablePanDownToClose
              // keyboardBlurBehavior="restore"
            >
              <Content navigation={navigation} />
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </View>
      {!loading && <PostErrandButton className="bottom-20 right-3" />}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#0c1730',
  },
  image: {
    width: 200,
    height: 200,
  },
  carouselItem: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  carouselIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  carouselText: {
    fontSize: 12,
    textAlign: 'center',
  },
})

export default LandingTest
