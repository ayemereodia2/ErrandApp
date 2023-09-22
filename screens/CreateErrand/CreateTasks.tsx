import { AntDesign, Feather, FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import DropdownComponent from '../../components/Picker/DropdownComponent'
import { PostErrandData } from '../../types'

interface DetailsProp {
  handleInputChange: any
  // audio: any
  // setAudio: any
  // files: any
  // setFiles: any
  postErrandData: PostErrandData
  // detailError: any
  // uploadedFiles: any[]
  // setUploadedFiles: any
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

const CreateErrandDetails = ({ setActiveStep, handleInputChange, postErrandData }: DetailsProp) => {
  const durationTypes = [ 'hours', 'days', 'weeks'
    // { name: 'hours', value: 'Hour(s)' },
    // { name: 'days', value: 'Day(s)' },
    // { name: 'week', value: 'Week(s)' },
  ]
  const [selectedDurationType, setSelectedDurationType] = useState(null)
  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland']

  return (
    <>
      <ScrollView className="">
        <View className="flex-row mt-[38px] items-center">
          <View className="mr-[92px] ml-4 bg-[#8098D1] b rounded-full">
            <TouchableOpacity onPress={() => setActiveStep(1)}>
              <Text className="">
                <AntDesign name="arrowleft" size={28} color="white" />
              </Text>
            </TouchableOpacity>
          </View>

          <View className="mr-2 w-[30px] h-[30px] bg-[#6604C8] b rounded-full justify-center items-center">
            <Text className="text-white mx-auto">2</Text>
          </View>
          <Text className="font-semibold text-[#243763] text-base">
            Errand Details
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text className="text-[#777777] text-center">
            In this section, you can supply additional information about the
            errand you wish to post.
          </Text>
        </View>

        <View className="px-4">
          <View className="mt-[56px]">
            <Text>Description</Text>
          </View>
          <TextInput
            className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3"
            placeholder="Describe the issue that you need help with"
            multiline={true}
            numberOfLines={10}
            onChangeText={text => handleInputChange(text, 'description')}
            defaultValue={postErrandData.description}
          />

          <View className="flex-row space-x-6">
            <View className="w-[160px]">
              <View className="mt-[40px]">
                <Text>Duration</Text>
              </View>
              <TextInput
                onChangeText={text => handleInputChange(text, 'dur_period')}
                className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3"
                keyboardType={'numeric'}
                placeholder="Enter a Number"
                placeholderTextColor={'#888888'}
                defaultValue={postErrandData.dur_period.toString()}
              ></TextInput>
            </View>
            <View className="w-[160px]">
              <View className="mt-[40px]">
                <Text>Duration Type</Text>
              </View>
              {/* <TextInput
                className="w-full border bg-[#F5F5F5] border-[#E6E6E6] text-sm py-3.5 mt-2 rounded-lg px-3"
                keyboardType={'numeric'}
                placeholder="Enter a Number"
                placeholderTextColor={'#888888'}
              ></TextInput> */}
              <SelectDropdown
                defaultValue={postErrandData.dur_value}
                buttonStyle={{ marginTop: 4 }}
                searchInputStyle={{ marginTop: 4 }}
                data={durationTypes}
                onSelect={(selectedItem, index) => {
                  handleInputChange(selectedItem, 'dur_value')
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                  return item
                }}
              />
            </View>
          </View>

          <View className="">
            <View className="mt-[40px]">
              <Text>Number of Errand Runners</Text>
            </View>
            <SelectDropdown
              defaultValue={postErrandData.errandType}
              data={['multi', 'single']}
              onSelect={(selectedItem, index) => {
                handleInputChange(selectedItem, 'errandType')
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                return item
              }}
            />
          </View>

          {/* <View className="w-[398px] h-[38px] mx-auto mt-10 ml-4"></View>
          <View className="w-[380px] h-[150px] bg-[#FCFCFC] mx-auto mt-4">
            <Text className="mx-auto mt-8">
              <Feather name="image" size={40} color="#3F60AC" />
            </Text>
            <Text className="mx-auto text-[#808080]">
              Drag and Drop an image or{' '}
              <Text className="text-[#3F60AC] font-semibold">Browse</Text>
            </Text>
            <Text className="mx-auto text-[#808080]">3 images maximum</Text>
          </View>

          <View className="mt-4 ml-4">
            <Text className="text-[#3F60AC]">3 images selected</Text>
          </View>
          <ScrollView horizontal className="ml-4 mt-4">
            <Image
              source={require('../../assets/images/pawpaw.jpg')}
              className="w-[100px] h-[100px] mr-4 rounded-xl"
            />
            <Image
              source={require('../../assets/images/pawpaw1.jpg')}
              className="w-[100px] h-[100px] mr-4 rounded-xl"
            />
            <Image
              source={require('../../assets/images/meme.jpg')}
              className="w-[100px] h-[100px] mr-4 rounded-xl"
            />
          </ScrollView>

          <View className="w-[398px] h-[38px] mx-auto mt-10 ml-4">
            <Text className="text-[#243763]">
              <Text className="font-semibold text-sm">Supporting Audio </Text>
              (Upload a voice note to further describe your request)
            </Text>
          </View>

          <View className="w-[380px] h-[150px] bg-[#FCFCFC] mx-auto mt-4">
            <Text className="mx-auto mt-8">
              <FontAwesome name="microphone" size={40} color="#3F60AC" />
            </Text>
            <Text className="mx-auto text-[#808080]">
              Click on the Mic icon above to record
            </Text>
            <Text className="mx-auto text-[#808080]">your voice message</Text>
          </View>

          <View className="ml-4 mt-4 flex-row items-center ">
            <View className="mr-10">
              <Text>
                <FontAwesome name="stop-circle-o" size={48} color="#3F60AC" />
              </Text>
            </View>
            <View className="mr-10">
              <Image source={require('../../assets/images/audio.jpg')} />
            </View>
            <View>
              <Text className="text-black font-semibold text-lg">1:30</Text>
            </View>
          </View>

          <View className="mt-[41px] ml-[16px]">
            <Text>Restrict Errand by Insurance</Text>
          </View>
          <DropdownComponent />

          <View className="mt-[41px] ml-[16px]">
            <Text>Restrict Errand by Qualification</Text>
          </View>
          <DropdownComponent /> */}

          {/* <View className="mt-[41px] ml-[16px]">
            <Text>Restrict Errand by Verification</Text>
          </View>
          <DropdownComponent /> */}
        </View>
      </ScrollView>
    </>
  )
}

export default CreateErrandDetails
