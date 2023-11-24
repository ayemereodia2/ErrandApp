import { View, Text, Image } from 'react-native'
import React, { useRef, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { Audio } from 'expo-av'
const recordingGif = '../assets/images/recoording.gif'

const playSound = '../assets/images/play-sound.gif'
const playingSound = '../assets/images/playing.gif'
const stopSound = '../assets/images/stop-sound.gif'

const RecordedSound = ({recordedAudio, stop, play, recorded}: any) => {

    const AudioPlayer = useRef(new Audio.Sound())
    // const [recorded, setRecorded] = useState(false)
    const [isPlaying, SetIsPlaying] = useState(false)

    // const PlayRecordedAudio = async () => {
    //     try {
    //       // Load the Recorded URI
    //       await AudioPlayer.current.loadAsync({ uri: recordedAudio }, {}, true)
    
    //       // Get Player Status
    //       const playerStatus = await AudioPlayer.current.getStatusAsync()
    
    //       // Play if song is loaded successfully
    //       if (playerStatus.isLoaded) {
    //         if (playerStatus.isPlaying === false) {
    //           AudioPlayer.current.playAsync()
    //           SetIsPlaying(true)
    //         }
    //       }
    //     } catch (error) {}
    //   }
    
    //   const StopPlaying = async () => {
    //     try {
    //       //Get Player Status
    //       const playerStatus = await AudioPlayer.current.getStatusAsync()
    
    //       // If song is playing then stop it
    //       if (playerStatus.isLoaded === true)
    //         await AudioPlayer.current.unloadAsync()
    
    //       SetIsPlaying(false)
    //     } catch (error) {}
    //   }

      
  

  return (
    <View>
      <Text>RecordedSound</Text>

      {recorded && (
            <View className="w-full rounded-lg h-[150px] bg-[#FCFCFC] mx-auto mt-4 border-[0.5px] border-[#E6E6E6] py-6 flex-row items-center justify-center">
              {isPlaying ? (
                <TouchableOpacity
                  onPress={()=> stop()}
                  className="flex-row justify-center items-center mt-4"
                >
                  <Image
                    source={require(stopSound)}
                    className=" w-14 h-14 rounded-full"
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={()=> play()}
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
          )}

    </View>
  )
}

export default RecordedSound