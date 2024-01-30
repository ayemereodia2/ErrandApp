import { AntDesign, Entypo, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useLayoutEffect, useState } from 'react'
import {
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useSelector } from 'react-redux'
import UpdateProfile from '../../components/ProfileUpdate/UpdateProfile'
import { RootState } from '../../services/store'

const EditProfileTitle = ({ navigation, route }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode)

  const theme = currentUser?.preferred_theme === 'light' ? true : false
  const [image, setImage] = useState(null)

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: 'Edit Profile',
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
  //     headerRight: () => (
  //       <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
  //         <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
  //           <MenuTrigger>
  //             <Entypo name="dots-three-vertical" color={textTheme} size={20} />
  //           </MenuTrigger>
  //           <MenuOptions
  //             customStyles={{
  //               optionWrapper: {
  //                 // borderBottomWidth: 0.2,
  //                 borderBottomColor: '#AAAAAA',
  //               },
  //               optionText: { textAlign: 'center', fontWeight: '600' },
  //             }}
  //           >
  //             <MenuOption
  //               // onSelect={}
  //               text="Refresh"
  //               customStyles={{
  //                 optionWrapper: {
  //                   borderBottomWidth: 1,
  //                   borderBottomColor: '#AAAAAA',
  //                 },
  //                 optionText: { textAlign: 'center', fontWeight: '600' },
  //               }}
  //             />
  //             <MenuOption
  //               onSelect={() => alert(`Save`)}
  //               text="Profile"
  //               customStyles={{
  //                 optionWrapper: {
  //                   borderBottomWidth: 1,
  //                   borderBottomColor: '#AAAAAA',
  //                 },
  //                 optionText: { textAlign: 'center', fontWeight: '600' },
  //               }}
  //             />
  //             <MenuOption
  //               onSelect={() => alert(`Save`)}
  //               text="Contact Us"
  //               customStyles={{
  //                 optionText: { textAlign: 'center', fontWeight: '600' },
  //               }}
  //             />
  //           </MenuOptions>
  //         </Menu>
  //       </View>
  //     ),
  //   })
  // }, [])

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const { data } = route.params

  return (
    <>
  <View className='bg-[#F3F3F3]'>
    <View className='bg-purple-200 h-[160px] w-screen shadow-md' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
   <View className='bg-[#09497D] h-[150px] pt-[70px] px-6 pb-3 pl-[27px]' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
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

         <Text className='text-white text-xl font-medium' style={{fontFamily: 'Chillax'}}>Profile</Text>
               
         </View>
         
            {/* <Text
                  className="font-bold text-[20px] leading-7"
                  style={{ color: textTheme }}
                >
                  Welcome, {currentUser?.first_name}
                </Text> */}

                <View className="items-center flex-row gap-2">
                 
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

    <SafeAreaView style={{ backgroundColor: '#FEFEFE' }}>
      <ScrollView>
        {/* Top Profile */}

        <View className="mt-8 mx-auto relative bg-gray-300 rounded-full">
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 150, height: 150 }}
              className="rounded-full"
            />
          ) : (
            <Image
              // source={require('../../assets/images/profile.png')}
              source={{ uri: data?.profile_picture }}
              className="b rounded-full w-[150px] h-[150px]"
            />
          )}
          <TouchableOpacity
            onPress={pickImage}
            className="absolute left-12 top-14 mx-auto w-[60px] h-[50px] b rounded-md"
          >
            <Image source={require('../../assets/images/camera.jpg')} />
          </TouchableOpacity>
        </View>

        <View>
          {/* Name Area */}

          <View className="flex-row justify-center items-center mt-5">
            <Text
              className="text-[20px] font-bold leading-6"
              style={{ color: '#09497D', fontFamily: 'Chillax' }}
            >
              {data?.first_name} {data?.last_name}{' '}
            </Text>

            {data?.verification === 100 ? (
              <Text>
                <MaterialIcons name="verified" size={20} color="green" />
              </Text>
            ) : null}
          </View>

          {/*Occupation */}

          <Text
            className="text-center mt-2 text-base font-bold"
            style={{ color: '#6D6D6D', fontFamily: 'Axiforma' }}
          >
            {data?.occupation ? data.occupation : 'Swave User'}
          </Text>

          <Text
            className="text-center mt-2 text-base font-bold"
            style={{ color: '#6D6D6D', fontFamily: 'Axiforma' }}
          >
            {data?.phone_number ? data.phone_number : 'Swave User'}
          </Text>
        </View>

        <UpdateProfile image={image} data={data} />
      </ScrollView>
    </SafeAreaView>
    </>
  )
}

export default EditProfileTitle
