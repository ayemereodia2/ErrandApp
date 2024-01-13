import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

// import AppLoading from 'expo-app-loading';
import {
  AntDesign,
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import PlaceBidModal from '../../components/Modals/Errands/PlaceBidModal'
import { ProfileInitials } from '../../components/ProfileInitials'
import { userDetails } from '../../services/auth/userInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { formatDate, getAddress, getCardTimeAgo } from '../../utils/helper'
import Checkbox from 'expo-checkbox'
import { Platform } from 'react-native'

export default function ErrandDetails({ route, navigation }: any) {
  const dispatch = useAppDispatch()
  const [showBid, setShowBid] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['74%'], [])
  const [userId, setUserId] = useState('')
  const [showBidBtn, setShowBidBtn] = useState(true)
  const [address, setAddress] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [checked, setChecked] = useState(false)

  // const { snapToIndex, close } = useBottomSheet();

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const regex = /(<([^>]+)>)/gi

  function openPlaceBid() {
    bottomSheetRef.current?.present()
  }

  function closePlaceBid() {
    bottomSheetRef.current?.dismiss()
  }

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => closePlaceBid()}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const handleChecked = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  const { errand_id, user_id } = route.params

 

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  const { data: user } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )

  const { data: owner } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const { data: errand, loading } = useSelector(
    (state: RootState) => state.errandDetailsReducer,
  )

  const budgetInNaira = Number(errand?.budget / Number(100))

  const toggleShowBid = () => {
    setShowBid(!showBid)
  }

  // const reachedScreen = async () => {
  //   await AsyncStorage.setItem("errandDetail")
  // }

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,

  //     headerTitleStyle: { color: textTheme },
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         className="flex-row items-center justify-between mx-0 py-3 mr-6"
  //         onPress={() => navigation.goBack()}
  //       >
  //         <AntDesign name="arrowleft" size={24} color={textTheme} />
  //       </TouchableOpacity>
  //     ),
  //     headerStyle: { backgroundColor: backgroundTheme, color: textTheme },
  //     title: 'Errand Details',
  //   })
  // }, [navigation])

  // useEffect(() => {
  //   navigation
  //     .getParent()
  //     ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false })
  //   return () =>
  //     navigation
  //       .getParent()
  //       ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined })
  // }, [navigation])

  const getUserId = async () => {
    const userId = (await AsyncStorage.getItem('user_id')) || ''
    setUserId(userId)
  }

  useEffect(() => {
    getUserId()
    // dispatch(errandDetails({ errandId: errand_id }))
    // dispatch(userDetails({ user_id }))
  }, [])

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
      >
        {/* <Image
          style={styles.image}
          className="mx-auto"
          source={require(loaderGif)}
        /> */}
        <ActivityIndicator color={theme ? 'white' : 'blue'} size="large" />
      </SafeAreaView>
    )
  }

   console.log(errand)

  return (
    <BottomSheetModalProvider>

<View>
<View className='bg-purple-200 h-[150px] w-screen shadow-md' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
  <View className='bg-[#09497D] h-[145px] pt-[70px] px-6 pb-3 pl-[27px]' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
              <View
                className={
                  Platform.OS === 'android'
                    ? 'flex-row items-center justify-between mt-6'
                    : 'flex-row items-center justify-between'
                }
              >
          <View className='flex-row items-center mt-2'> 
      <TouchableOpacity
          className=" items-center justify-between mr-8 py-3 "
          onPress={() => navigation.goBack()}
        >
      <Ionicons name="chevron-back-outline" size={24} color="white" />
         </TouchableOpacity>

       
               
         </View>
         

                <View className="items-center flex-row gap-3">
                 
                  <TouchableOpacity
                    // onPress={
                    //   // navigation.navigate('Contact')
                    //   openMoreModal
                    // }
                  >
                    <Text style={{ color: textTheme }}>
                     
                    <Ionicons
                    name="settings-outline"
                    size={22}
                    color={'white'}
                    style={{ marginLeft: 7 }}
                  />
                    </Text>
                  </TouchableOpacity>

                  <Text style={{ color: textTheme }} className='mr-4'>
                    <FontAwesome
                      name="bell-o"
                      size={22}
                      color={'white'}
                      onPress={() => {
                        navigation.navigate('Notification')
                      }}
                    />
                  </Text>
                </View>
              </View>

             
             

                </View>

                </View>
             </View>

      <SafeAreaView
        style={{ flex: 1, backgroundColor: backgroundTheme }}
        className="bg-[#F8F9FC]"
      >

        <View
          style={{
            flexDirection: 'column-reverse',
            marginBottom: 60,
          }}
        >
          <ScrollView
            scrollEventThrottle={16}
            className={!showBidBtn ? 'mb-4' : ''}
          >


            <TouchableNativeFeedback
              onPress={() => {
                setShowBidBtn(true)
                // closePlaceBid()
              }}
            >
              <View>
                {loading ? (
                  <View>
                    <ActivityIndicator size={'large'} />
                  </View>
                ) : (

                  <View className="p-4 px-6">
                    
                    <View className="p-4 px-6 mt-2">
                      <View className="">
                        <View className="items-center justify-center">
                          <ProfileInitials
                            textClass="text-white text-2xl"
                            firstName={user.first_name}
                            lastName={user.last_name}
                            profile_pic={user.profile_picture}
                            className="w-20 h-20 bg-[#616161] rounded-full text-2xl"
                          />
                          <View className="pt-2">
                            <View className="flex-row text-[18px] space-x-2 items-center justify-center">
                              <Text
                                style={{ color: '#09497D' }}
                                className="text-center text-base font-semibold"
                              >
                                {user?.first_name} {user?.last_name}
                              </Text>
                              {user?.verification === 100 ? (
                                <Text>
                                  <MaterialIcons
                                    name="verified"
                                    color="green"
                                    size={20}
                                  />
                                </Text>
                              ) : null}
                            </View>
                            {/* <Text
                              style={{ color: textTheme }}
                              className="text-center text-base font-semibold"
                            >
                              {user?.first_name} {user?.last_name}
                            </Text> */}
                            {/* <MaterialIcons
                              name="verified"
                              color="green"
                              size={20}
                            /> */}
                          </View>
                          <Text
                            style={{ color: textTheme }}
                            className="text-[#555555] text-center py-2 text-base font-semibold"
                          >
                            {user.occupation ? user.occupation : 'Swave User'}
                          </Text>
                          <View className="flex-row items-center">
                            {/* {showStars(data.rating)} */}
                            <Text style={{ color: textTheme }}>
                             
                              <Entypo name="star" size={16} color="#FBB955" />

                              {user?.rating}  | <Text> {getCardTimeAgo(user?.updated_at)} </Text>
                            </Text>
                            {/* <Text
                              style={{ color: textTheme }}
                              className="text-[#6D6D6D] text-sm"
                            >
                              ( {user?.errands_completed}
                              {user.errands_completed > 1
                                ? 'errands'
                                : 'errand'}
                              Completed)
                            </Text> */}
                          </View>
                        </View>
                      </View>
                    </View>

                    

                    <View className="mt-2 ">
                      {/* <Text
                        style={{ color: textTheme }}
                        className=" font-bold text-base text-[#555555]"
                      >
                        Description
                      </Text> */}
                      <Text
                        style={{ color: textTheme, fontFamily: 'Axiforma' }}
                        className="text-base text-center text-[#717171] font-normal"
                      >
                        {errand.description.replace(regex, '')}
                      </Text>
                    </View>

                    <View className="pt-6 mx-1">
                          <Text className="text-[#0C426E] text-[24px] font-bold leading-6" style={{fontFamily: 'Axiforma'}}>
                            &#x20A6; {budgetInNaira.toLocaleString()}
                          </Text>
                    </View>
                    

                    {/* <View className="pt-6 ">
                      <Text
                        style={{ color: textTheme }}
                        className=" font-bold text-base text-[#555555]"
                      >
                        This errand pays
                      </Text>

                      <View className="flex-row items-center">
                        <View className="bg-[#FEE1CD] rounded-2xl py-2 px-3 mt-2 ">
                          <Text className="text-[#642B02] text-base font-bold">
                            &#x20A6; {budgetInNaira.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    </View> */}

                    <View className='w-[95%] h-[241px] px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg'> 

                      <View className='mb-5 border-b border-[#DBD6D6]'> 
                        <Text className='mb-2 text-[20px] text-[#09497D] font-medium' style={{fontFamily: 'Chillax'}}>Details</Text>
                      </View>

                      <View className='flex-row justify-between items-center mb-5'>
                        <Text className='text-base text-[#888]' style={{fontFamily: 'Axiforma'}}>Bid</Text>
                         <Text className='text-base text-[#09497D]' style={{fontFamily: 'Axiforma'}}> <AntDesign name="arrowup" size={18} color="#888888" />  {errand.total_bids} {errand.total_bids > 1 ? 'Bids' : 'Bid'}</Text>
                      </View>

                      <View className='flex-row justify-between items-center mb-5'>
                        <Text className='text-base text-[#888]' style={{fontFamily: 'Axiforma'}}>Status</Text>
                         <Text className='text-base text-[#09497D]' style={{fontFamily: 'Axiforma'}}><SimpleLineIcons name="share-alt" size={16} color="#888888" />  {errand?.status}</Text>
                      </View>

                       <View className='flex-row justify-between items-center mb-5'>
                        <Text className='text-base text-[#888]' style={{fontFamily: 'Axiforma'}}>Date</Text>
                         <Text className='text-base text-[#09497D]' style={{fontFamily: 'Axiforma'}}>
                          <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={'#888888'}
                          /> {' '}
                         {formatDate(errand.expiry_date)}</Text>
                      </View>
                    </View>


                    <View className='w-[350px] h-[120px] px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5 '> 

                      <View className='mb-5 border-b border-[#DBD6D6]'> 
                        <Text className='mb-2 text-[20px] text-[#09497D] font-medium' style={{fontFamily: 'Chillax'}}>Requirements</Text>
                      </View>


                    <View className='flex-row items-center mr-1 '>
                        <View className='flex-row items-center border-[0.5px]  border-[#888] bg-[#E2EAF0] rounded-lg mr-2 mb-5 pt-[6px] pb-[7px] pl-[10px] pr-[4px]'>
                          <Text className='text-xs text-[#09497D] mr-[6px]' style={{fontFamily: 'Axiforma'}}><AntDesign name="checkcircleo" size={12} /></Text>
                          <Text className='text-xs text-[#09497D]' style={{fontFamily: 'Axiforma'}}> Insurance </Text>
                        </View>

                        <View className='flex-row items-center border-[0.5px] border-[#888] bg-[#E2EAF0] rounded-lg mr-2 mb-5 pt-[6px] pb-[7px] pl-[6px] pr-[4px]'>
                          <Text className='text-xs text-[#09497D] mr-[6px]' style={{fontFamily: 'Axiforma'}}><AntDesign name="checkcircleo" size={12} /></Text>
                          <Text className='text-xs text-[#09497D]' style={{fontFamily: 'Axiforma'}}> Qualification</Text>
                        </View>

                        <View className='flex-row items-center border-[0.5px] border-[#888] bg-[#E2EAF0] rounded-lg mr-3 mb-5 pt-[6px] pb-[7px] pl-[6px] pr-[4px]'>
                          <Text className='text-xs text-[#09497D] mr-[6px]' style={{fontFamily: 'Axiforma'}}><AntDesign name="checkcircleo" size={12} /></Text>
                          <Text className='text-xs text-[#09497D]' style={{fontFamily: 'Axiforma'}}> Verification </Text>
                        </View>
                    </View>

                      
                    </View>

                    {/* <View className="space-y-3 mt-3">
                      <View className="space-x-2 flex-row mt-6">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] w-28 font-medium"
                        >
                          Status
                        </Text>

                        <Text
                          style={{ color: textTheme }}
                          className="capitalize font-semibold"
                        >
                          {errand?.status}
                        </Text>
                      </View>

                      <View className="space-x-2 flex-row mt-6">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] w-28 font-medium"
                        >
                          Duration
                        </Text>
                        <Text
                          style={{ color: textTheme }}
                          className=" text-sm text-[#000] w-60 font-semibold"
                        >
                          <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={textTheme}
                          />
                          {formatDate(errand.expiry_date)}
                        </Text>
                      </View>

                      <View className="space-x-2 flex-row mt-6">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] w-28 font-medium"
                        >
                          Location
                        </Text>
                        <Text
                          style={{ color: textTheme }}
                          className=" text-sm text-[#000] w-60 font-semibold"
                        >
                          {!address
                            ? errand?.pickup_address?.address_text
                            : address}
                        </Text>
                      </View>

                      <View className="space-x-6 mt-6 flex-row">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] font-medium pb-2 w-28"
                        >
                          Requirements
                        </Text>
                        <View className="flex-row space-x-3 w-60">
                          {errand?.has_insurance ? (
                            <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center  border-[#3F60AC] border rounded-2xl">
                              <Text className="text-center text-[#3F60AC] text-xs">
                                <FontAwesome
                                  name="check-circle"
                                  size={12}
                                  color={'#3F60AC'}
                                />
                                Insurance
                              </Text>
                            </View>
                          ) : (
                            <Text>No Insurance </Text>
                          )}
                          {errand?.restriction ? (
                            <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center  border-[#3F60AC] border rounded-2xl">
                              <Text className="text-center text-[#3F60AC] text-xs flex-row space-x-2">
                                <FontAwesome
                                  className="pr-2"
                                  name="check-circle"
                                  size={12}
                                  color={'#3F60AC'}
                                />
                                <Text> Qualification</Text>
                              </Text>
                            </View>
                          ) : (
                            <Text>No Qualification</Text>
                          )}
                        </View>
                      </View>
                    </View> */}

                  <View className='mt-10 flex-row items-center'> 

                  <Checkbox 
                  value={checked}
                  onValueChange={handleChecked}
                  />

                    <Text
                      style={{ fontFamily: 'Axiforma' }}
                      className="pr-6 ml-3 font-bold text-base text-[#0C426F]"
                    >
                      Other Resources
                    </Text>
                    </View>

                    <View className="flex-row space-x-4 mt-5 " style={{display: checked ? 'flex' : 'none'}}>
                      {errand?.images?.map((image, index) => (
                        <View className="rounded-2xl">
                          <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedImage(image)}
                          >
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                              }}
                              source={{ uri: image }}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>


                    {/* <View className="pt-6 ">
                          <Text className="text-[#0C426E] text-[24px] font-bold leading-6" style={{fontFamily: 'Axiforma'}}>
                            &#x20A6; {budgetInNaira.toLocaleString()}
                          </Text>
                    </View> */}
                    

                    {/* <View>
                      <Text
                        style={{ color: textTheme }}
                        className="pr-6 mt-8 font-bold text-base text-[#555555]"
                      >
                        Existing Bids
                      </Text>

                      {errand.bids.length === 0 && (
                        <Text
                          style={{ color: textTheme }}
                          className="pr-6 text-base text-[#555555]"
                        >
                          No existing bids yet
                        </Text>
                      )}

                      {errand.bids.map((bid) => {
                        return (
                          <View className=" mr-3 pb-3 mt-4 ">
                            <View className="flex-row space-x-4">
                              <ProfileInitials
                                textClass="text-white text-2xl"
                                firstName={bid?.runner?.first_name}
                                lastName={bid?.runner?.last_name}
                                className="w-14 h-14 bg-[#616161] rounded-full text-lg"
                              />
                              <View className="flex-row justify-between items-center">
                                <View className="">
                                  <Text
                                    style={{ color: textTheme }}
                                    className="text-[#000000] text-sm font-bold"
                                  >
                                    {bid?.runner.first_name}{' '}
                                    {bid?.runner.last_name}
                                  </Text>
                                  <Text
                                    style={{ color: textTheme }}
                                    className="text-sm font-semibold"
                                  >
                                    1.5
                                    <Text
                                      style={{ color: textTheme }}
                                      className="text-[14px] text-[#777777] font-medium"
                                    >
                                      {' '}
                                      <Entypo
                                        name="star"
                                        size={16}
                                        color="#FBB955"
                                      />{' '}
                                      ({sender.errands_completed}1
                                      Errands Completed)
                                    </Text>
                                  </Text>
                                </View>
                              </View>
                            </View>

                            <Text
                              style={{ color: textTheme }}
                              className="text-sm pt-1 text-[#444444] font-light"
                            >
                              {bid.description}
                            </Text>
                            <View className="flex-row items-center mt-2">
                              <View className="bg-[#FEE1CD] rounded-2xl py-2 px-3 mt-2 ">
                                <Text className="text-[#642B02] text-base font-bold">
                                  &#x20A6;{' '}
                                  {(
                                    bid?.haggles[0].amount / 100
                                  ).toLocaleString()}
                                </Text>
                              </View>
                            </View>
                          </View>
                        )
                      })}
                    </View> */}

                    <Modal visible={selectedImage !== ''} transparent={true}>
                      <View style={styles.modalContainer}>
                        <Image
                          source={{ uri: selectedImage }}
                          style={styles.modalImage}
                        />
                        <TouchableOpacity
                          onPress={() => setSelectedImage('')}
                          style={styles.closeButton}
                        >
                          {/* You can use a close icon or text */}
                          <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                      </View>
                    </Modal>
                  </View>
                )}
              </View>
            </TouchableNativeFeedback>

            <BottomSheetModal
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              containerStyle={{ marginHorizontal: 0 }}
              backdropComponent={renderBackdrop}
              keyboardBehavior="extend"
              enablePanDownToClose
              keyboardBlurBehavior="restore"
              // android_keyboardInputMode="adjustResize"
            >
              <PlaceBidModal
                owner={owner}
                errand={errand}
                navigation={navigation}
                onSubmit={closePlaceBid}
              />
            </BottomSheetModal>
          </ScrollView>
        </View>

        {errand.user_id !== userId && errand?.status !== 'completed' ? (
          <TouchableOpacity
            className="w-full h-[60px] absolute bottom-0 flex-row justify-center items-center bg-[#1E3A79]"
            onPress={() => {
              openPlaceBid()
              dispatch(userDetails({ user_id: userId }))
              setShowBidBtn(false)
            }}
          >
            <Text className="text-white text-lg font-medium">
              I can do this
            </Text>
          </TouchableOpacity>
        ) : errand.user_id !== userId && errand?.status === 'completed' ? (
          <TouchableOpacity
            className="w-full h-[70px] absolute bottom-0 flex-row justify-center items-center bg-[#d8f8e9]"
            disabled={true}
          >
            <Text className="text-black text-lg font-medium">
              This Errand has been completed
            </Text>
          </TouchableOpacity>
        ) : errand.user_id !== userId && errand?.status === 'cancelled' ? (
          <TouchableOpacity
            className="w-full h-[65px] absolute bottom-0 flex-row justify-center items-center bg-red-500"
            disabled={true}
          >
            <Text className="text-white text-lg font-medium">
              This Errand has been completed
            </Text>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    </BottomSheetModalProvider>
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



   _container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
    resizeMode: 'contain',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})
