import { Audio } from 'expo-av'
import React, { useRef, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { selectRecordedAudioURI } from '../../services/audio/audio'
import { RootState } from '../../services/store'
import { PostErrandData } from '../../types'
import { ImageViewer } from './Details'

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

  const recordedAudioURI = useSelector(selectRecordedAudioURI)
  const AudioPlayer = useRef(new Audio.Sound())
  const [isPlaying, SetIsPlaying] = useState(false)

  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: recordedAudioURI }, {}, true)

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync()

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync()
          SetIsPlaying(true)
        }
      }
    } catch (error) {}
  }

  const StopPlaying = async () => {
    try {
      //Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync()

      // If song is playing then stop it
      if (playerStatus.isLoaded === true)
        await AudioPlayer.current.unloadAsync()

      SetIsPlaying(false)
    } catch (error) {}
  }

  return (
    <>
      {/* Header */}

      <ScrollView className="px-2 mb-4">
        <View className="flex-row mt-[20px] items-center justify-center">
          {/* <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">5</Text>
          </View>
          <Text
            className="font-semibold text-[#243763] text-base"
            style={{ color: textTheme }}
          >
            Errand Review
          </Text> */}
        </View>

        {/* <View className='flex-row items-center w-[280px] h-[41px] mx-5 '>
          <TouchableOpacity className='w-10 bg-[#09497D] h-[39px] rounded-full'>
            <Text className='text-center text-white mt-3'>1</Text>
          </TouchableOpacity>
          <View className='w-10 h-[1px] bg-[#09497D]'></View>
          <TouchableOpacity className='w-10 bg-[#09497D] h-[39px] rounded-full'>
            <Text className='text-center text-white mt-3'>2</Text>
          </TouchableOpacity>
          <View className='w-10 h-[1px] bg-[#09497D]'></View>
          <TouchableOpacity className='w-10 h-[39px] rounded-full bg-[#09497D]'>
            <Text className='text-center text-white mt-3'>3</Text>
          </TouchableOpacity>
          <View className='w-10 h-[1px] bg-[#09497D]'></View>
          <TouchableOpacity className='w-10 bg-[#09497D] h-[39px] rounded-full'>
            <Text className='text-center text-white mt-3'>4</Text>
          </TouchableOpacity>
          <View className='w-10 h-[1px] bg-[#09497D]'></View>
          <TouchableOpacity className='w-10 bg-[#09497D] h-[39px] rounded-full' disabled>
            <Text className='text-center text-white mt-3'>5</Text>
          </TouchableOpacity>
        </View> */}

        <View className="flex-row mt-6 items-center justify-center">
          <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text
              style={{ fontFamily: 'Chillax-Medium' }}
              className="text-black mx-auto"
            >
              5
            </Text>
          </View>
          <Text
            style={{ fontFamily: 'Chillax-Medium' }}
            className="font-semibold text-[#243763] text-base"
          >
            Errand Review
          </Text>
        </View>

        <View className="border py-4 rounded-[10px] border-[#E6E6E6] bg-white mt-6">
          <View className="mx-4 mt-4 flex-row items-center space-x-10">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Category Type:
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              {postErrandData.type}
            </Text>
          </View>

          <View className="mx-4 mt-4 flex-row items-center space-x-10">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Activity:
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              {postErrandData.categoryName}
            </Text>
          </View>
        </View>

        <View className="px-4 pb-2 mt-8 border-[#EEEEEE]">
          <Text
            style={{ color: textTheme, fontFamily: 'Axiforma' }}
            className="text-[#393F42] font-semibold text-base"
          >
            Errand Details
          </Text>
        </View>

        <View className="border py-5 mb-3 border-[#E6E6E6] rounded-[10px] bg-white">
          <View className="mx-4 mt-4 flex-row items-center space-x-10">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Description
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              {postErrandData.description}
            </Text>
          </View>

          <View className="flex-row space-x-10 pt-4">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[16px] pl-4 w-28"
            >
              Images
            </Text>
            <ScrollView horizontal className="pl-4 flex-row space-x-3 ">
              {postErrandData?.images.length === 0 ? (
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className=" text-[14px] text-[#393F42] w-[200px]"
                >
                  No Images
                </Text>
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
            </ScrollView>
          </View>

          {recordedAudioURI ? (
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
              )}

              {isPlaying && (
                <Image
                  source={require(playingSound)}
                  className=" w-18 h-14 mt-8 rounded-full"
                />
              )}
            </View>
          ) : (
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="ml-4 mt-3"
            >
              No recorded audio
            </Text>
          )}

          <View className="mx-4 mt-4 flex-row items-center space-x-10">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Budget
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              &#x20A6; {postErrandData.budget}
            </Text>
          </View>

          {postErrandData.currentLocation === 'remote' ? (
            <View className="mx-4 mt-4 flex-row items-center space-x-10">
              <Text
                style={{ color: textTheme, fontFamily: 'Axiforma' }}
                className="text-[#393F42] text-[14px] w-28"
              >
                Location
              </Text>
              <Text
                style={{ color: textTheme, fontFamily: 'Axiforma' }}
                className=" text-[14px] text-[#393F42] w-[200px]"
              >
                {postErrandData.currentLocation
                  ? postErrandData.currentLocation
                  : 'No Location Selected'}
              </Text>
            </View>
          ) : (
            <>
              <View className="mx-4 mt-4 flex-row items-center space-x-10">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-[#393F42] text-[14px] w-28"
                >
                  Pickup Address
                </Text>
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className=" text-[14px] text-[#393F42] w-[200px]"
                >
                  {postErrandData.currentLocation
                    ? postErrandData.currentLocation
                    : 'No Location Selected'}
                </Text>
              </View>

              <View className="mx-4 mt-4 flex-row items-center space-x-10">
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className="text-[#393F42] text-[14px] w-28"
                >
                  Delivery Address
                </Text>
                <Text
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                  className=" text-[14px] text-[#393F42] w-[200px]"
                >
                  {postErrandData.deliveryAddress
                    ? postErrandData.deliveryAddress
                    : 'No Location Selected'}
                </Text>
              </View>
            </>
          )}

          <View className="mx-4 mt-4 flex-row items-center space-x-10">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Insurance
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              {!postErrandData.insurance ? 'No' : postErrandData.insurance}
            </Text>
          </View>

          <View className="mx-4 mt-6 flex-row space-x-10">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Insurance Amount
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              {postErrandData.ins_amount.toLocaleString()}
            </Text>
          </View>

          <View className="mx-4 mt-6 flex-row space-x-10 ">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Restrict Errand by Qualification
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              {postErrandData.res_by_qualification}
            </Text>
          </View>

          <View className="mx-4 mt-6 flex-row space-x-10">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className="text-[#393F42] text-[14px] w-28"
            >
              Restrict Errand by Verification
            </Text>
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
              className=" text-[14px] text-[#393F42] w-[200px]"
            >
              {postErrandData.res_by_verification}
            </Text>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

export default ErrandReview
