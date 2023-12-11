import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { PostErrandData } from '../../types'
import { ImageViewer } from './Details'
import RecordedSound from '../../components/RecordedSound'
// import { selectRecordedAudioURI } from '../../services/audio/audio'
// import { Audio } from 'expo-av'
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'


const playSound = '../../assets/images/play-sound.gif'
const playingSound = '../../assets/images/playing.gif'
const stopSound = '../../assets/images/stop-sound.gif'

interface ReviewProp {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  postErrandData: PostErrandData
}
const ErrandReview = ({ setActiveStep, postErrandData }: ReviewProp) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  // const recordedAudioURI = useSelector(selectRecordedAudioURI);
  // const AudioPlayer = useRef(new Audio.Sound())
  // const [isPlaying, SetIsPlaying] = useState(false)

  // const PlayRecordedAudio = async () => {
  //   try {
  //     // Load the Recorded URI
  //     await AudioPlayer.current.loadAsync({ uri: recordedAudioURI }, {}, true)

  //     // Get Player Status
  //     const playerStatus = await AudioPlayer.current.getStatusAsync()

  //     // Play if song is loaded successfully
  //     if (playerStatus.isLoaded) {
  //       if (playerStatus.isPlaying === false) {
  //         AudioPlayer.current.playAsync()
  //         SetIsPlaying(true)
  //       }
  //     }
  //   } catch (error) {}
  // }

  // const StopPlaying = async () => {
  //   try {
  //     //Get Player Status
  //     const playerStatus = await AudioPlayer.current.getStatusAsync()

  //     // If song is playing then stop it
  //     if (playerStatus.isLoaded === true)
  //       await AudioPlayer.current.unloadAsync()

  //     SetIsPlaying(false)
  //   } catch (error) {}
  // }



  


  return (
    <>
      {/* Header */}

      <ScrollView className='px-2 mb-4'>
        <View className="flex-row mt-[38px] items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">5</Text>
          </View>
          <Text
            className="font-semibold text-[#243763] text-base"
            style={{ color: textTheme }}
          >
            Errand Review
          </Text>
        </View>

        <View className="mx-auto items-center justify-center w-[309px] h-[48px] mt-5">
          <Text
            style={{ color: textTheme }}
            className="text-[#777777] text-center "
          >
            In this section, you can set the location that you want the errand
            to take place in.
          </Text>
        </View>

        <View className="border-b-[1px] px-4 pb-2 mt-10 border-[#EEEEEE]">
          <Text
            style={{ color: textTheme }}
            className="text-[#243763] font-semibold text-base"
          >
            Errand Category
          </Text>
        </View>

        <View className="mx-4 mt-2 flex-row items-center space-x-10">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-28"
          >
            Category Type
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-base text-[#333333] text-left w-[300px]"
          >
            {postErrandData.type}
          </Text>
        </View>

        <View className="mx-4 mt-4 flex-row items-center space-x-10">
          <Text style={{ color: textTheme }} className="font-md text-base w-28">
            Activity
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333] w-[300px]"
          >
            {postErrandData.categoryName}
          </Text>
        </View>

        <View className="border-b-[1px] px-4 pb-2 mt-8 border-[#EEEEEE]">
          <Text
            style={{ color: textTheme }}
            className="text-[#243763] font-semibold text-sm"
          >
            Errand Details
          </Text>
        </View>

        <View className="mx-4 mt-2 flex-row space-x-10 ">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-28"
          >
            Description
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333] w-[200px]"
          >
            {postErrandData.description}
          </Text>
        </View>

        <View className='flex-row space-x-10 pt-4'>
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] pl-4 w-28"
          >
            Images
          </Text>
          <View className="pl-4 flex-row space-x-3 ">
            {postErrandData?.images.length === 0 ? (
              <Text className='font-light' style={{ color: textTheme }}>No Images</Text>
            ) : (
              <>
                {postErrandData?.images.map((img, index) => {
                  return (
                    <ImageViewer
                      selectedImage={img}
                      removeImage={''}
                      index={index}
                    />
                  )
                })}
              </>
            )}
          </View>
        </View>

        {/* {recordedAudioURI ? (
            <View className="w-full rounded-lg h-[150px] bg-[#FCFCFC] mx-auto mt-4 border-[0.5px] border-[#E6E6E6] py-6 flex-row items-center justify-center">
              {isPlaying ? (
                <TouchableOpacity
                  onPress={StopPlaying}
                  className="flex-row justify-center items-center mt-4"
                >
                  <Image
                    source={require(stopSound)}
                    className=" w-14 h-14 rounded-full"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={PlayRecordedAudio}
                  className="flex-row justify-center items-center"
                >
                  <Image
                    source={require(playSound)}
                    className="w-28 h-28 rounded-full"
                  />
                  <Text className="text-base">Play sound</Text>
                </TouchableOpacity>
              )
             }

              {isPlaying && (
                <Image
                  source={require(playingSound)}
                  className=" w-18 h-14 mt-8 rounded-full"
                />
              )}
            </View>
          ) : <Text style={{color: textTheme}} className='ml-4 mt-3'>No recorded audio</Text> } */}

        <View className="mx-4 mt-6 flex-row space-x-10  ">
          <Text style={{ color: textTheme }} className="font-md text-[14px] w-28">
            Budget
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-light text-[#333333]"
          >
            &#x20A6; {postErrandData.budget}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-10">
          <Text style={{ color: textTheme }} className="font-md text-[14px] w-28">
            Location
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333] w-[200px]"
          >
            {postErrandData.currentLocation}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-10">
          <Text style={{ color: textTheme }} className="font-md text-[14px] w-28">
            Insurance
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {!postErrandData.insurance ? 'No' : postErrandData.insurance}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-10">
          <Text
            style={{ color: textTheme }}
            className="font-md w-28 text-[14px]"
          >
            Insurance Amount
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {postErrandData.ins_amount.toLocaleString()}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-10 ">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-28"
          >
            Restrict Errand by Qualification
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {postErrandData.res_by_qualification}
          </Text>
        </View>

        <View className="mx-4 mt-6 flex-row space-x-10">
          <Text
            style={{ color: textTheme }}
            className="font-md text-[14px] w-28"
          >
            Restrict Errand by Verification
          </Text>
          <Text
            style={{ color: textTheme }}
            className="font-light text-sm text-[#333333]"
          >
            {postErrandData.res_by_verification}
          </Text>
        </View>
      </ScrollView>
    </>
  )
}

export default ErrandReview
