import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Button from '../../components/Button'
import ProgressBar from '../../components/ProgressBar'
import Category from './Category'
import Finance from './Finance'
import LocationScreen from './Location'
import PostErrandDetails from './PostErrandDetails'
import Review from './Review'

const PostErrand = () => {
  const [selectedStep, setselectedStep] = useState(1)

  console.log('>>>>>>selected', selectedStep)

  const showComponent = () => {
    if (selectedStep === 1) {
      return <Category />
    }
    if (selectedStep === 2) {
      return <PostErrandDetails />
    }
    if (selectedStep === 3) {
      return <LocationScreen />
    }
    if (selectedStep === 4) {
      return <Finance />
    } else {
      return <Review/>
    }
  }

  return (
    <ScrollView className="bg-white">
      <View className="bg-white shadow-lg shadow-[#ccc] h-[106px]">
        <View className="flex-row items-center mx-0 px-2 pt-5">
          <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
          <View className="flex-row items-center">
            <View className="flex-row items-center justify-center">
              <Text
                // style={{ fontFamily: 'AbrilFatface_400Regular' }}
                className=" text-[#243763] text-xl pl-24 pb-2 pt-2"
              >
                Post Errand
              </Text>
            </View>
          </View>
          {/* <EvilIcons name="search" size={30} color="#243763" /> */}
        </View>
        <View className="">
          <ProgressBar selectedStep={selectedStep} />
        </View>
      </View>
      {showComponent()}

      <View className="flex-row justify-between mt-10 px-6 pb-6">
        {selectedStep > 1 && (
          <Button
            child="Previous"
            className="bg-[#243763] w-20 flex justify-center items-center py-2 rounded-lg "
            onPress={() => setselectedStep(selectedStep - 1)}
          />
        )}
        <Button
          child={selectedStep > 4 ? "Submit" : "Next"}
          className="bg-[#243763] w-20 flex justify-center items-center py-2 rounded-lg "
          onPress={() => {selectedStep < 5 ? setselectedStep(selectedStep + 1) : null}}
        />
      </View>
    </ScrollView>
  )
}

export default PostErrand
