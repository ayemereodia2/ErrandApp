import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useLayoutEffect, useState } from 'react'
import {
  Image,
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Edit Profile',
      headerStyle: { backgroundColor: backgroundTheme },
      headerTitleStyle: { color: textTheme },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={textTheme} size={20} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: {
                  // borderBottomWidth: 0.2,
                  borderBottomColor: '#AAAAAA',
                },
                optionText: { textAlign: 'center', fontWeight: '600' },
              }}
            >
              <MenuOption
                // onSelect={}
                text="Refresh"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
              <MenuOption
                onSelect={() => alert(`Save`)}
                text="Profile"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
              <MenuOption
                onSelect={() => alert(`Save`)}
                text="Contact Us"
                customStyles={{
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      ),
    })
  }, [])

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
    <SafeAreaView style={{ backgroundColor: backgroundTheme }}>
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
              className="text-[18px] font-bold leading-6"
              style={{ color: textTheme }}
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
            className="text-center mt-3 text-base font-bold"
            style={{ color: textTheme }}
          >
            {data?.occupation ? data.occupation : 'Swave User'}
          </Text>
        </View>

        <UpdateProfile image={image} data={data} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default EditProfileTitle
