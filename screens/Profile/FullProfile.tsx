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
import UserProfile from '../../components/UsersProfile/UserProfile'

const FullProfile = ({ navigation, route }: any) => {
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



  const { data } = route.params

  return (
    <>
      <ScreenHeader
        navigation={navigation}
        textTheme={textTheme}
        screen={'Profile'}
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
             
            </View>

            <View>
              {/* Name Area */}

              <View className="flex-row justify-center items-center mt-5">
                <Text
                  className="text-[20px] font-bold leading-6"
                  style={{ color: '#09497D', fontFamily: 'Chillax-Medium' }}
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


                <UserProfile />
            
          </ScrollView>
        </BottomSheetModalProvider>
      </SafeAreaView>
    </>
  )
}

export default FullProfile
