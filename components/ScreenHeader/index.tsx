import { FontAwesome, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Image, Platform, StatusBar, Text, TouchableOpacity, View } from 'react-native'

type HeaderProp = {
  navigation: any
  textTheme: string
  screen: string
  openSettingsModal: () => void
}

const ScreenHeader = ({
  navigation,
  textTheme,
  screen,
  openSettingsModal,
}: HeaderProp) => {
  const logo = '../../assets/images/logo-check.png'
  return (
    <View>
       <StatusBar barStyle="light-content" backgroundColor="#09497D" />
      {screen === 'logo' ? (
        <View className="bg-purple-200 h-[135px] w-screen shadow-md rounded-bl-[80px] rounded-br-[80px]">
          <View className="bg-[#09497D] h-[130px] pt-[20px] px-6 pb-3 rounded-bl-[80px] rounded-br-[80px]">
            <View
              className={
                Platform.OS === 'android'
                  ? 'flex-row items-center justify-between mt-6'
                  : 'flex-row items-center justify-between'
              }
            >
              <View className="flex-row items-center mt-2">
                <Image source={require(logo)} />
              </View>

              <View className="items-center flex-row pt-2 space-x-4">
                <TouchableOpacity onPress={() => openSettingsModal()}>
                  <Text style={{ color: textTheme }}>
                    <Ionicons
                      name="settings-outline"
                      size={22}
                      color={'white'}
                      style={{ marginLeft: 7 }}
                    />
                  </Text>
                </TouchableOpacity>

                <Text style={{ color: textTheme }} className="mr-4">
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
      ) : (
        <View className="bg-purple-200 h-[135px] w-screen shadow-md rounded-bl-[80px] rounded-br-[80px]">
          <View className="bg-[#09497D] h-[130px] pt-[20px] px-6 pb-3 rounded-bl-[80px] rounded-br-[80px]">
            <View
              className={
                Platform.OS === 'android'
                  ? 'flex-row items-center justify-between mt-6'
                  : 'flex-row items-center justify-between'
              }
            >
              <View className="flex-row items-center mt-2">
                <TouchableOpacity
                  className=" items-center justify-between mr-8 py-3 "
                  onPress={() => navigation.navigate('LandingPage')}
                >
                  <Ionicons
                    name="chevron-back-outline"
                    size={26}
                    color="white"
                  />
                </TouchableOpacity>

                <Text
                  className="text-white text-xl font-medium"
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  {screen}
                </Text>
              </View>

              <View className="items-center flex-row pt-2 space-x-4">
                  <TouchableOpacity onPress={() => openSettingsModal()}>
                  <Text style={{ color: textTheme }}>
                    <Ionicons
                      name="settings-outline"
                      size={22}
                      color={'white'}
                      style={{ marginLeft: 7 }}
                    />
                  </Text>
                </TouchableOpacity>

                <Text style={{ color: textTheme }} className="mr-4">
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
      )}
    </View>
  )
}

export default ScreenHeader
