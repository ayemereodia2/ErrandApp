import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons'
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import ScreenHeader from '../../components/ScreenHeader'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import Content from '../../components/AboutContent/Content'

const ContactUs = ({ navigation }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [messageError, setMessageError] = useState('')

  const [error, setError] = useState('')

  const twitterUrl = 'https://twitter.com/swavework'
  const instagramUrl = 'https://www.instagram.com/swavework/?hl=en'
  const facebookUrl = 'https://www.facebook.com/swavework/'
  const linkedInUrl = 'https://linkedin.com/showcase/swavework'

  const handleTwitter = () => {
    Linking.openURL(twitterUrl)
  }

  const handleInstagram = () => {
    Linking.openURL(instagramUrl)
  }

  const handleFaceBook = () => {
    Linking.openURL(facebookUrl)
  }

  const handleLinkedIn = () => {
    Linking.openURL(linkedInUrl)
  }
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['60%'], [])

    

  function openSettingsModal() {
    bottomSheetRef.current?.present()
  }

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: 'Contact Us',
  //     headerStyle: { backgroundColor: backgroundTheme },
  //     headerTitleStyle: { color: textTheme },
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         className="flex-row items-center justify-between mx-0 px-3 py-3"
  //         onPress={() => navigation.goBack()}
  //       >
  //         <AntDesign name="arrowleft" size={24} color={textTheme} />
  //       </TouchableOpacity>
  //     ),
  //   })
  // }, [])

  const ContactUs = async (userData: any) => {

    
    setLoading(true)
    setError('')

    try {
      const _rs = await _fetch({
        method: 'POST',
        _url: `/user/send-enquiry`,
        body: userData,
      })

      setLoading(false)
      const responseData = await _rs.json()

      return responseData
    } catch (error) {
      throw error
    }
  }

  const handleSubmit = async () => {
    setNameError('')
    setEmailError('')
    setPhoneError('')
    setMessageError('')

    const userMessage = {
      name: name,
      email: email,
      message: message,
      phone: '+234' + phone,
      subject: 'General Complaints',
    }

    if (!name || !email || !message || !phone) {
      setError('Please, make sure you fill in the required fields')
      setTimeout(() => {
        setError(' ')
      }, 3000);
    }
    
   

    // Validation rules
    if (userMessage.name.trim() === '') {
      setNameError('Name is required')
      return
    }
    if (userMessage.email.trim() === '') {
      setEmailError('Email is required')
      return
    }
    if (userMessage.phone.trim() === '') {
      setEmailError('Phone is required')
      return
    }
    if (userMessage.message.trim() === '') {
      setEmailError('Message is required')
      return
    }

    try {
      const responseData = await ContactUs(userMessage)
      if (responseData.success) {
        Toast.show({
          type: 'success',
          text1: 'Your message was sent!',
        })

        // Navigate back to the Account screen
        navigation.goBack()

      } else {
        // Handle the case where the server responded with an error message

        Toast.show({
          type: 'error',
          text1: 'Please fill all the required fields',
        })
      }
    } catch (error) {
      // Handle errors here, such as network errors or server-side errors
      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }

  return (
    <>
     
<BottomSheetModalProvider> 

<ScreenHeader

navigation={navigation}
screen="Help and Support"
openSettingsModal={openSettingsModal}
textTheme={textTheme}
/>
    <SafeAreaView>
      {/* Header */}

      {/* End Of Header */}
      <ScrollView
        className="h-full mx-2"
        style={{ backgroundColor: backgroundTheme }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1, marginTop: 52 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          {error && (
            <Text className="pt-2 text-center" style={{ color: 'red' }}>
              {error}
            </Text>
          )}

          <View className='mx-4 mb-5'>
            <Text className='text-sm' style={{fontFamily: 'Axiforma'}}>If you have any inquiries, get in touch with us. We’ll be happy to help you.</Text>
          </View>

          <View className="px-4">
           
            <View className="">
              <Text style={{ color: textTheme }}>Full Name</Text>
            </View>
            <TextInput
              className="w-full mt-2 b rounded-md h-[50px] px-3 items-center mx-auto border border-[#96A0A5] text-sm"
              style={{  }}
              placeholder="Enter your Full Name"
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={'#000'}
            />
            {nameError && (
              <Text className="ml-4" style={{ color: 'red' }}>
                {nameError}
              </Text>
            )}

            <View className="mt-[40px] ">
              <Text style={{ color: textTheme }}>Email Address</Text>
            </View>
            <TextInput
              className="w-full mt-2 b rounded-md h-[50px] px-3 items-center mx-auto border border-[#96A0A5] text-sm"
              style={{ }}
              placeholder="Enter your Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'#000'}
            />

            {emailError && (
              <Text className="ml-4" style={{ color: 'red' }}>
                {emailError}
              </Text>
            )}

            <View className="mt-[40px] font-medium text-sm">
              <Text style={{ color: textTheme, fontFamily: 'Axiforma' }}>Phone Number </Text>
            </View>
            <TextInput
              className="w-full mt-2 b rounded-md h-[50px] px-3  mx-auto bg-[#E6E6E6] text-sm"
              style={{ backgroundColor: theme ? '#bbb' : '#E6E6E6' }}
              placeholder="Enter your Phone Number"
              keyboardType="numeric"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={'#000'}
            />

            {phoneError && (
              <Text className="ml-4" style={{ color: 'red' }}>
                {phoneError}
              </Text>
            )}

            <View className="mt-[30px] font-medium text-sm">
              <Text style={{ color: textTheme, fontFamily: 'Axiforma' }}>Your message</Text>
            </View>
            <TextInput
              className="w-full mt-2 b rounded-md h-[120px] px-3 pb-[70px] border border-[#96A0A5] mx-auto text-sm"
              style={{ }}
              placeholder="Enter your Message Here"
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholderTextColor={'#000'}
            ></TextInput>
          </View>

          {messageError && (
            <Text className="ml-4" style={{ color: 'red' }}>
              {messageError}
            </Text>
          )}

          <TouchableOpacity
            className=" mt-6 mb-10 mx-4 rounded-lg"
            onPress={handleSubmit}
          >
            <View className="w-full h-[50px] bg-[#243763] items-center justify-center">
              <Text className="text-white text-center items-center">
                {loading ? <ActivityIndicator /> : 'Send '}
              </Text>
            </View>
          </TouchableOpacity>

          {/* <View
            className="w-[95%] h-[350px]  mx-auto b rounded-md"
            style={{ backgroundColor: backgroundTheme }}
          >
            <Text
              className="ml-5 mt-5 leading-6 text-lg font-semibold"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              We're always Connected
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-normal"
              style={{ color: theme ? 'white' : '#011E3E' }}
            >
              Looking to partner with us or explore business opportunities? Our
              amazing team would love to hear from you.
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-bold text-[#317ACF]"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              <Feather name="mail" size={16} color="#317ACF" /> Send us a mail -
              Swave Client Support
            </Text>

            <Text
              className="ml-11 text-base font-normal text-[#3A3A3A]"
              style={{ color: theme ? 'white' : '#011E3E' }}
            >
              support@swaveafrica.com
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-bold text-[#317ACF]"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              <Entypo name="phone" size={16} color="#317ACF" /> Give us a phone
              call anytime
            </Text>
            <Text
              className="ml-11 text-sm font-normal text-[]"
              style={{ color: theme ? 'white' : '#3A3A3A' }}
            >
              +234 704 402 6192    +234 704 402 6328 
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-bold text-[#317ACF]"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              <FontAwesome5 name="whatsapp" size={16} color="#317ACF" /> We’re
              on Whatsapp too!
            </Text>
            <Text
              className="ml-11 text-sm font-normal text-[#3A3A3A]"
              style={{ color: theme ? 'white' : '#3A3A3A' }}
            >
              +234 704 402 6745     +234 704 402 6987
            </Text>
          </View>


          <View className=" items-center mt-5 mb-[200px]">
            <Text
              style={{ color: textTheme }}
              className="text-base font-medium"
            >
              Catch and Chat Us on Social Media
            </Text>
            <View className="flex-row space-x-2.5 mt-2">
              <TouchableOpacity onPress={handleFaceBook}>
                <Text className="text-white">
                  <AntDesign name="facebook-square" size={28} color="blue" />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleTwitter}>
                <Text>
                  <Entypo name="twitter" size={28} color="lightblue" />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleInstagram}>
                <Text>
                  <Entypo name="instagram" size={28} color="red" />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLinkedIn}>
                <Text className="text-white">
                  <AntDesign name="linkedin-square" size={28} color="blue" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>*/}

          <View className='mx-4'>
            <Text className='text-[20px] font-medium' style={{fontFamily: 'Chillax'}}>Social Media</Text>
          </View>


          <View className='flex-row items-center mt-6 mx-4' style={{gap: 12}}>

            <View className=''>

              <Text> <Feather name="mail" size={26} color="#317ACF" /> </Text>
            </View>

            <View>
              <Text className='text-base' style={{fontFamily: 'Axiforma'}}>Send us a mail -
              Swave Client Support</Text>
              
              <Text className='text-sm' style={{fontFamily: 'Axiforma'}}>support@swaveafrica.com</Text>
            </View>
           </View>


           <View className='flex-row items-center mt-6 mx-4' style={{gap: 12}}>

          <View className=''>

            <Text> <Entypo name="phone" size={26} color="#317ACF" />  </Text>
          </View>

          <View>
            <Text className='text-base' style={{fontFamily: 'Axiforma'}}> Give us a phone call anytime </Text>
            
            <Text className='text-sm' style={{fontFamily: 'Axiforma'}}>+234 704 402 6328 </Text>
            <Text className='text-sm' style={{fontFamily: 'Axiforma'}}>+234 704 402 6328 </Text>
          </View>
          </View>



          <View className='mx-4 mt-4 mb-40 px-5 border border-[#CCCCCC] py-8 bg-[#E6E6E666]'>

            <TouchableOpacity onPress={handleFaceBook} className='flex-row items-center' style={{gap: 12}}>

              <View className=''>
             
                <Image source={require('../../assets/images/facebook.png')} />
              </View>

              <View>
                <Text className='text-base' style={{fontFamily: 'Axiforma'}}>Facebook</Text>
                <Text className='text-xs' style={{fontFamily: 'Axiforma'}}>Drop us a message anytime.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLinkedIn} className='flex-row items-center mt-6 ' style={{gap: 12}}>

              <View className=''>
             
                <Image source={require('../../assets/images/Linkedin.png')} />
              </View>

              <View>
                <Text className='text-base' style={{fontFamily: 'Axiforma'}}>Linkedin</Text>
                <Text className='text-xs' style={{fontFamily: 'Axiforma'}}>Drop us a message anytime.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleInstagram} className='flex-row items-center mt-6' style={{gap: 12}}>

              <View className=''>
             
                <Image source={require('../../assets/images/Instagram.png')} />
              </View>

              <View>
                <Text className='text-base' style={{fontFamily: 'Axiforma'}}>Instagram</Text>
                <Text className='text-xs' style={{fontFamily: 'Axiforma'}}>Drop us a message anytime.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleTwitter} className='flex-row items-center mt-6' style={{gap: 12}}>

              <View className=''>
             
                <Image source={require('../../assets/images/Twitter.png')} />
              </View>

              <View>
                <Text className='text-base' style={{fontFamily: 'Axiforma'}}>X</Text>
                <Text className='text-xs' style={{fontFamily: 'Axiforma'}}>Drop us a message anytime.</Text>
              </View>
            </TouchableOpacity>

            <View className='flex-row items-center mt-6' style={{gap: 12}}>

            <View className=''>

              <Text><FontAwesome5 name="whatsapp" size={44} color="#317ACF" /></Text>
            </View>

            <View>
              <Text className='text-base' style={{fontFamily: 'Axiforma'}}>Whatsapp</Text>
              <Text className='text-xs' style={{fontFamily: 'Axiforma'}}>+234 704 402 6987</Text>
              <Text className='text-xs' style={{fontFamily: 'Axiforma'}}>+234 704 402 6987</Text>
            </View>
           </View>

            


          </View>

        </KeyboardAwareScrollView> 
      </ScrollView>
    </SafeAreaView>

    <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={['55%']}
        containerStyle={{
          marginHorizontal: 10,
        }}
        backdropComponent={renderBackdrop}
      >
        <Content navigation={navigation} />
      </BottomSheetModal>
    </BottomSheetModalProvider>
    </>
  )
}

export default ContactUs
