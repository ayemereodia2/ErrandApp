import { MaterialIcons } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import * as ImagePicker from 'expo-image-picker'
import React, { useRef, useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import UpdateProfile from '../../components/ProfileUpdate/UpdateProfile'
import ScreenHeader from '../../components/ScreenHeader'
import { RootState } from '../../services/store'

const EditProfileTitle = ({ navigation, route }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  const bottomSheetRef4 = useRef<BottomSheetModal>(null)

  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode)

  const theme = currentUser?.preferred_theme === 'light' ? true : false
  const [image, setImage] = useState(null)

  function openSettingsModal() {
    bottomSheetRef4.current?.present()
  }

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
      <ScreenHeader
        navigation={navigation}
        textTheme={textTheme}
        screen={'Edit Profile'}
        openSettingsModal={openSettingsModal}
      />

      <SafeAreaView>
        <BottomSheetModalProvider>
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
        </BottomSheetModalProvider>
      </SafeAreaView>
    </>
  )
}

export default EditProfileTitle
