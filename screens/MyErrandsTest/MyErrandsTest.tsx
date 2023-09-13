import { AntDesign, Entypo, EvilIcons } from '@expo/vector-icons'
import React, { useLayoutEffect } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
// import ErrandTexts from '../../components/ErrandTexts/ErrandTexts'

const MyErrandsTest = ({navigation}:any) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Errands',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="flex-row items-center"
          >
            {/* <ProfileInitials firstName="Azubike" lastName="Orji" /> */}
            <Entypo name="menu" size={24} />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 mr-2">
          <TouchableWithoutFeedback>
            <Text><Entypo name="dots-three-vertical" size={21} color="black" /></Text>
          </TouchableWithoutFeedback>
        </View>
      ),
    });
  }, []);
  


  return (
    <SafeAreaView className="bg-[#F8F9FC]">
      <View className="bg-[#F8F9FC] ">
        <View className="mx-4 mt-7">
          <View className="mt-6 border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
            <EvilIcons name="search" size={22} className="w-1/12" />
            <TextInput
              className=" w-9/12"
              placeholder="Search for Errands or Bids"
              placeholderTextColor="#808080"
            />

            <Image
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/filter.png')}
            />
          </View>
        </View>
      </View>

      {/* Main Body */}

      {/* <ScrollView>
        <View className="mt-4 mx-4 flex-row">
          <View className="w-[176px] h-[40px] px-6 bg-[#E6E6E6] justify-center mr-7">
            <View className="flex-row items-center justify-around">
              <Text className="text-center text-base font-medium">My Bids</Text>
              <Text>
                {' '}
                <AntDesign name="down" size={16} color="black" />{' '}
              </Text>
            </View>
          </View>

                <ErrandTexts navigation={navigation}/>
                
            </ScrollView>

        <ErrandTexts />
      </ScrollView> */}
    </SafeAreaView>
  )
}

export default MyErrandsTest
