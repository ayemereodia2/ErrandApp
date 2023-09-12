import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { AntDesign, Entypo } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import TimelineTexts from '../../components/TimelineTexts/TimelineTexts';

const ErrandTimeline = ({navigation}:any) => {

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Errands',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3">
          <TouchableOpacity
            onPress={() => navigation.navigate('MyErrandsTest')}
            className="flex-row items-center"
          >
            {/* <ProfileInitials firstName="Azubike" lastName="Orji" /> */}
           <Text><AntDesign name="arrowleft" size={24} color="black" /></Text>
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
    <SafeAreaView>
      <View className='w-[390px] h-[56px] bg-[#FEE1CD] mx-4 items-center justify-center border border-[#FEE1CD]'>
        <Text className='font-medium text-sm px-4'>This Errand is expected to be Completed on 17th August 2023</Text>
      </View>

      <TimelineTexts />

    </SafeAreaView>
  )
}

export default ErrandTimeline