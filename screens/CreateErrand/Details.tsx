import { EvilIcons, Feather, FontAwesome } from '@expo/vector-icons'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import SelectDropdown from 'react-native-select-dropdown'
import { useSelector } from 'react-redux'
import { postAudioFiles } from '../../services/errands/postAudioFIle'
import { postFiles } from '../../services/errands/postFiles'
import { RootState, useAppDispatch } from '../../services/store'
import { PostErrandData } from '../../types'
const recordingGif = '../../assets/images/recoording.gif'
const playSound = '../../assets/images/play-sound.gif'
const playingSound = '../../assets/images/playing.gif'
const stopSound = '../../assets/images/stop-sound.gif'

interface DetailsProp {
  handleInputChange: any
  audio: any
  setAudio: any
  // files: any
  // setFiles: any
  postErrandData: PostErrandData
  // detailError: any
  uploadedFiles: any[]
  setUploadedFiles: any
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
}

interface ImageViewerProp {
  placeholderImageSource: any
  selectedImage: string
  index: number
  removeImage: any
}

export function ImageViewer({
  selectedImage,
  index,
  removeImage,
}: ImageViewerProp) {
  return (
    <View>
      <EvilIcons name="close-o" size={26} onPress={() => removeImage(index)} />
      <Image
        source={{ uri: selectedImage }}
        className="w-[100px] h-[100px] mr-4 rounded-xl"
      />
    </View>
  )
}

const CreateErrandDetails = ({
  setActiveStep,
  handleInputChange,
  postErrandData,
  uploadedFiles,
  setUploadedFiles,
  setAudio,
  audio,
}: DetailsProp) => {
  const dispatch = useAppDispatch()
  const durationTypes = ['hours', 'days', 'weeks']

  const { loading: uploadingImages } = useSelector(
    (state: RootState) => state.postFilesReducer,
  )

  const [selectedDurationType, setSelectedDurationType] = useState(null)
  const [selectedImage, setSelectedImage] = useState([])
  const [recording, setRecording] = React.useState()
  const AudioRecorder = useRef(new Audio.Recording())
  const AudioPlayer = useRef(new Audio.Sound())
  const [AudioPermission, SetAudioPermission] = useState<boolean>(false)
  const [IsRecording, SetIsRecording] = useState<boolean>(false)
  const [IsPLaying, SetIsPLaying] = useState<boolean>(false)
  const [RecordedURI, SetRecordedURI] = useState<string>('')
  const [recorded, setRecorded] = useState(false)

  const removeImage = (index: number) => {
    const allFiles = [...uploadedFiles]
    allFiles.splice(index, 1)
    setUploadedFiles(allFiles)
  }

  const pickImageAsync = async () => {
    let results = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsMultipleSelection: true,
    })

    if (!results.canceled) {
      console.log(results)
      setSelectedImage(results.assets)

      const formData = new FormData()

      for (let i = 0; i < results.assets.length; i++) {
        let localUri = results.assets[i].uri
        let filename = localUri.split('/').pop() || ''

        let match = /\.(\w+)$/.exec(filename)
        let type = match ? `image/${match[1]}` : `image`

        const fileObj = { uri: localUri, name: filename, type }

        formData.append('files', fileObj)
      }
      formData.append('type', 'errand')

      dispatch(postFiles({ formData, setUploadedFiles, uploadedFiles }))
    } else {
      alert('You did not select any image.')
    }
  }

  const StartRecording = async () => {
    try {
      setRecorded(false)
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      // Check if user has given the permission to record
      if (AudioPermission === true) {
        try {
          // Prepare the Audio Recorder
          await AudioRecorder.current.prepareToRecordAsync(
            Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
          )
          // Start recording
          await AudioRecorder.current.startAsync()
          SetIsRecording(true)
        } catch (error) {
          console.log(error)
        }
      } else {
        // If user has not given the permission to record, then ask for permission
        GetPermission()
      }
    } catch (error) {}
  }

  const StopRecording = async () => {
    try {
      // Stop recording
      await AudioRecorder.current.stopAndUnloadAsync()

      // Get the recorded URI here
      const result = AudioRecorder.current.getURI() || ''

      const filename = result.split('/').pop() || ''

      const formData = new FormData()

      let match = /\.(\w+)$/.exec(filename)
      let type = match ? `audio/${match[1]}` : `audio`

      const file = {
        uri: result,
        type,
        name: filename,
      }

      formData.append('files', file)
      formData.append('type', 'errand')

      dispatch(postAudioFiles({ formData, setAudio, audios: audio }))

      if (result) SetRecordedURI(result)
      // console.log('>>>>>>record result', result)

      // Reset the Audio Recorder
      AudioRecorder.current = new Audio.Recording()
      SetIsRecording(false)
      setRecorded(true)
    } catch (error) {
      console.log('>>>>>e', error)
    }
  }

  const PlayRecordedAudio = async () => {
    try {
      // Load the Recorded URI
      await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true)

      // Get Player Status
      const playerStatus = await AudioPlayer.current.getStatusAsync()

      // Play if song is loaded successfully
      if (playerStatus.isLoaded) {
        if (playerStatus.isPlaying === false) {
          AudioPlayer.current.playAsync()
          SetIsPLaying(true)
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

      SetIsPLaying(false)
    } catch (error) {}
  }

  const GetPermission = async () => {
    const getAudioPerm = await Audio.requestPermissionsAsync()
    SetAudioPermission(getAudioPerm.granted)
  }

  useEffect(() => {
    GetPermission()
  }, [])

  return (
    <>
      <ScrollView className="">
        <View className="flex-row mt-[38px] justify-center items-center">
          {/* <View className="mr-[92px] ml-4 bg-[#8098D1] b rounded-full">
            <TouchableOpacity onPress={() => setActiveStep(1)}>
              <Text className="">
                <AntDesign name="arrowleft" size={28} color="white" />
              </Text>
            </TouchableOpacity>
          </View> */}

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
            onChangeText={(text) => handleInputChange(text, 'description')}
            defaultValue={postErrandData.description}
            style={{ height: 100, textAlignVertical: 'top' }}
          />

          <View className="flex-row space-x-6">
            <View className="w-[160px]">
              <View className="mt-[40px]">
                <Text>Duration</Text>
              </View>
              <TextInput
                onChangeText={(text) => handleInputChange(text, 'dur_period')}
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
              <SelectDropdown
                defaultButtonText="-Select-"
                defaultValue={postErrandData.dur_value}
                buttonStyle={style.dropdownInput}
                data={durationTypes}
                onSelect={(selectedItem, index) => {
                  handleInputChange(selectedItem, 'dur_value')
                }}
              />
            </View>
          </View>

          <View className="flex-row space-x-6">
            <View className="">
              <View className="mt-[40px]">
                <Text>Number of Errand Runners</Text>
              </View>
              <SelectDropdown
                defaultValue={postErrandData.errandType}
                data={['multi', 'single']}
                buttonStyle={style.dropdownInput}
                onSelect={(selectedItem, index) => {
                  handleInputChange(selectedItem, 'errandType')
                }}
              />
            </View>
          </View>

          {/* <View className="w-[398px] h-[38px] mx-auto mt-10 ml-4"></View> */}
          <View className="w-full rounded-lg h-[150px] bg-[#FCFCFC] mx-auto mt-4 border-[0.5px] border-[#E6E6E6]">
            {uploadingImages ? (
              <View className="flex-row justify-center items-center mt-16 space-x-2">
                <ActivityIndicator color="blue" size="small" />
                <Text>Uploading Images..</Text>
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  pickImageAsync()
                }}
                className=""
              >
                <Text className="mx-auto mt-8">
                  <Feather name="image" size={40} color="#3F60AC" />
                </Text>
                <Text className="mx-auto text-[#808080]">
                  Select images or{' '}
                  <Text className="text-[#3F60AC] font-semibold">Browse</Text>
                </Text>
                <Text className="mx-auto text-[#808080]">3 images maximum</Text>
              </TouchableOpacity>
            )}
          </View>

          <View className="mt-4">
            <Text className="text-[#3F60AC]">
              {uploadedFiles.length === 0 ? 0 : uploadedFiles.length} images
              selected
            </Text>
          </View>
          <ScrollView horizontal className="ml mt-4">
            {uploadedFiles.map((img, index) => {
              // console.log('>>>>>>img=----', img)
              return (
                <ImageViewer
                  placeholderImageSource={''}
                  selectedImage={img}
                  index={index}
                  removeImage={removeImage}
                />
              )
            })}
          </ScrollView>

          <View className="mt-10">
            <Text className="text-[#243763]">
              <Text className="font-semibold text-sm">Supporting Audio </Text>
              (Upload a voice note to further describe your request)
            </Text>
          </View>
          <TouchableOpacity
            onPress={IsRecording ? StopRecording : StartRecording}
            className="w-full rounded-lg h-[150px] bg-[#FCFCFC] mx-auto mt-4 border-[0.5px] border-[#E6E6E6]"
          >
            {IsRecording ? (
              <View className="flex-row justify-center items-center">
                <Image
                  source={require(recordingGif)}
                  className=" w-28 h-28 rounded-full"
                />
              </View>
            ) : (
              <View className="flex-row justify-center items-center pt-8">
                <FontAwesome
                  name="microphone"
                  size={40}
                  color="#3F60AC"
                  className="mx-auto"
                />
              </View>
            )}

            <Text className="mx-auto text-[#808080] text-center pt-2">
              {IsRecording
                ? 'Click to stop recording'
                : 'Click on the Mic icon above to record your voice message'}
            </Text>
          </TouchableOpacity>

          {recorded && (
            <View className="w-full rounded-lg h-[150px] bg-[#FCFCFC] mx-auto mt-4 border-[0.5px] border-[#E6E6E6] py-6 flex-row items-center justify-center">
              {IsPLaying ? (
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

              {IsPLaying && (
                <Image
                  source={require(playingSound)}
                  className=" w-18 h-14 mt-8 rounded-full"
                />
              )}
            </View>
          )}

          <View className="space-x-6">
            <View className="mt-[40px]">
              <Text>Restrict Errand by Qualification</Text>
            </View>
            <SelectDropdown
              defaultValue={postErrandData.res_by_qualification}
              data={['Yes', 'No']}
              buttonStyle={style.restrictInput}
              onSelect={(selectedItem, index) => {
                handleInputChange(selectedItem, 'res_by_qualification')
              }}
            />
          </View>
          <View className="space-x-6">
            <View className="mt-[40px]">
              <Text>Restrict Errand by Verification</Text>
            </View>
            <SelectDropdown
              defaultValue={postErrandData.res_by_verification}
              data={['Yes', 'No']}
              buttonStyle={style.restrictInput}
              onSelect={(selectedItem, index) => {
                handleInputChange(selectedItem, 'res_by_verification')
              }}
            />
          </View>

          {/* <View className="mt-[41px] ml-[16px]">
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

const style = StyleSheet.create({
  dropdownInput: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    width: 170,
    borderColor: '#E6E6E6',
    borderWidth: 1,
  },
  restrictInput: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
    width: 'auto',
    backgroundColor: '#F5F5F5',
    borderColor: '#E6E6E6',
    borderWidth: 1,
  },
})

export default CreateErrandDetails