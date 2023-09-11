import {
  AntDesign,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const PostErrand1 = ({ navigation }: any) => {
  return (
    <>
      {/* Header */}
      <View className="w-[430px] h-[120px] bg-[#243763] items-center justify-center">
        <Text className="text-center text-white mt-6 font-semibold text-xl">
          Create Errand
        </Text>
      </View>

      <ScrollView>
        <View className="flex-row mt-[38px] mx-auto items-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#6604C8] b rounded-full justify-center items-center">
            <Text className="text-white mx-auto">1</Text>
          </View>
          <Text className="font-semibold text-[#243763] text-base">
            Select Category
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text className="text-[#777777] text-center">
            In this section, you can select the category which your errand falls
            under here.{' '}
          </Text>
        </View>

        {/* Tasks ScrollView */}
        <Text className="text-[16px] font-medium mt-14 ml-4">Tasks</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View className="w-[150px] h-[151px] bg-[#CBD5EC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/bicycle.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Pickups
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/truck.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Deliveries
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/cart.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Shopping
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Text className="mx-auto mt-[18px]">
                <MaterialIcons name="groups" size={72} color="black" />
              </Text>
              <Text className="mt-[35px] mx-auto font-semibold text-smk">
                Cleaning/home service
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Text className="mx-auto mt-[18px]">
                <FontAwesome5 name="salesforce" size={75} color="black" />
              </Text>
              <Text className="mt-[28px] mx-auto font-semibold text-smk">
                Sales Persons
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Services ScrollView */}

        <Text className="text-[16px] font-medium mt-14 ml-4">Services</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/garden.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Gardening
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/baby.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Baby Sitting
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Image
                source={require('../../assets/images/laundry.jpg')}
                className="mx-auto mt-[18px]"
              />
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Laundry
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Text className="mx-auto mt-[18px]">
                <MaterialCommunityIcons name="hanger" size={75} color="black" />
              </Text>
              <Text className="mt-[28px] mx-auto font-semibold text-sm">
                Cleaning/home service
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View className="w-[150px] h-[151px] bg-[#DCDCDC] ml-4 mt-4 b rounded-md">
              <Text className="mx-auto mt-[18px]">
                <MaterialCommunityIcons
                  name="hair-dryer"
                  size={75}
                  color="black"
                />
              </Text>
              <Text className="mt-[28px] mx-auto font-semibold text-smk">
                Hair dressing
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        {/* Proceed Button */}

        <TouchableOpacity onPress={() => navigation.navigate('CreateErrand')}>
          <View className="w-[300px] h-[50px] bg-[#243763] mt-[118px] mb-[90px] mx-auto items-center justify-center">
            <Text className="text-white text-center items-center">
              Proceed to Errand Details{' '}
              <AntDesign name="arrowright" size={18} color="white" />
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

export default PostErrand1
