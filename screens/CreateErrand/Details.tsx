import { EvilIcons, Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import React, { useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { useSelector } from 'react-redux'
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
  detailError: any
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
  detailError,
}: DetailsProp) => {
  const dispatch = useAppDispatch()
  const durationTypes = ['hours', 'days', 'weeks']

  const { loading: uploadingImages } = useSelector(
    (state: RootState) => state.postFilesReducer,
  )

  const navigation = useNavigation()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

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
  const [selectedTime, setSelectedTime] = useState('')
  const [durationNumber, setDurationNumber] = useState(1)

  console.log('>>>>>>>>durartion from dropdown', postErrandData)

  const adjustDuration = (dur: number, sign: string) => {
    if (sign === 'substract') {
      if (dur === 1) {
        return
      }
      dur--
      handleInputChange(dur, 'dur_value')
      return setDurationNumber(dur)
    } else dur++
    handleInputChange(dur, 'dur_value')
    return setDurationNumber(dur)
  }

  const data = [
    { label: 'Today', value: 'today' },
    { label: 'One to three days', value: 'One to three days' },
    { label: "It doesn't matter", value: "It doesn't matter" },
    { label: 'Specify', value: 'Specify' },
  ]

  const errandData = [
    { label: 'One Person', value: 'One Person' },
    { label: 'Multiple People', value: 'Multiple People' },
  ]

  const Periods = [
    { label: 'Day(s)', value: 'Day(s)' },
    { label: 'Week(s)', value: 'Week(s)' },
    { label: 'Month(s)', value: 'Month(s)' },
  ]

  const errandRestrictions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'Ni' },
  ]

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

  // const StartRecording = async () => {
  //   try {
  //     setRecorded(false)
  //     await Audio.requestPermissionsAsync()
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     })
  //     // Check if user has given the permission to record
  //     if (AudioPermission === true) {
  //       try {
  //         // Prepare the Audio Recorder
  //         await AudioRecorder.current.prepareToRecordAsync(
  //           Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY,
  //         )
  //         // Start recording
  //         await AudioRecorder.current.startAsync()
  //         SetIsRecording(true)
  //       } catch (error) {
  //       }
  //     } else {
  //       // If user has not given the permission to record, then ask for permission
  //       GetPermission()
  //     }
  //   } catch (error) {}
  // }

  // const StopRecording = async () => {
  //   try {
  //     // Stop recording
  //     await AudioRecorder.current.stopAndUnloadAsync()

  //     // Get the recorded URI here
  //     const result = AudioRecorder.current.getURI() || ''

  //     const filename = result.split('/').pop() || ''

  //     const formData = new FormData()

  //     let match = /\.(\w+)$/.exec(filename)
  //     let type = match ? `audio/${match[1]}` : `audio`

  //     const file = {
  //       uri: result,
  //       type,
  //       name: filename,
  //     }

  //     formData.append('files', file)
  //     formData.append('type', 'errand')

  //     dispatch(postAudioFiles({ formData, setAudio, audios: audio }))
  //     if (result) {
  //       dispatch(setRecordedAudioURI(result)); // Dispatch action to store the recorded audio URI
  //     }
  //     if (result) SetRecordedURI(result)
  //     // console.log('>>>>>>record result', result)

  //     // Reset the Audio Recorder
  //     AudioRecorder.current = new Audio.Recording()
  //     SetIsRecording(false)
  //     setRecorded(true)
  //   } catch (error) {
  //   }
  // }

  // const PlayRecordedAudio = async () => {
  //   try {
  //     // Load the Recorded URI
  //     await AudioPlayer.current.loadAsync({ uri: RecordedURI }, {}, true)

  //     // Get Player Status
  //     const playerStatus = await AudioPlayer.current.getStatusAsync()

  //     // Play if song is loaded successfully
  //     if (playerStatus.isLoaded) {
  //       if (playerStatus.isPlaying === false) {
  //         AudioPlayer.current.playAsync()
  //         SetIsPLaying(true)
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

  //     SetIsPLaying(false)
  //   } catch (error) {}
  // }

  // const GetPermission = async () => {
  //   const getAudioPerm = await Audio.requestPermissionsAsync()
  //   SetAudioPermission(getAudioPerm.granted)
  // }

  // useEffect(() => {
  //   GetPermission()
  // }, [])

  return (
    <>
      {/* <View>
<View className='bg-purple-200 h-[160px] w-screen shadow-md' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
  <View className='bg-[#09497D] h-[150px] pt-[70px] px-6 pb-3 pl-[27px]' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
              <View
                className={
                  Platform.OS === 'android'
                    ? 'flex-row items-center justify-between mt-6'
                    : 'flex-row items-center justify-between'
                }
              >
          <View className='flex-row items-center mt-2'> 
      <TouchableOpacity
          className=" items-center justify-between mr-8 py-3 "
          onPress={() => navigation.goBack()}
        >
      <Ionicons name="chevron-back-outline" size={24} color="white" />
         </TouchableOpacity>

         <Text className='text-white text-xl font-medium' style={{fontFamily: 'Chillax'}}>Create Errand</Text>
               
         </View>
         
          

                <View className="items-center flex-row gap-2">
                 
                  <TouchableOpacity
                    // onPress={
                    //   // navigation.navigate('Contact')
                    //   openMoreModal
                    // }
                  >
                    <Text style={{ color: textTheme }}>
                     
                    <Ionicons
                    name="settings-outline"
                    size={22}
                    color={'white'}
                    style={{ marginLeft: 7 }}
                  />
                    </Text>
                  </TouchableOpacity>

                  <Text style={{ color: textTheme }} className='mr-4'>
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
             </View> */}

      <ScrollView className="">
        <View className="flex-row mt-[20px] justify-center items-center">
          {/* <View className="mr-[92px] ml-4 bg-[#8098D1] b rounded-full">
            <TouchableOpacity onPress={() => setActiveStep(1)}>
              <Text className="">
                <AntDesign name="arrowleft" size={28} color="white" />
              </Text>
            </TouchableOpacity>
          </View> */}

          {/* <View className="mr-2 w-[30px] h-[30px] bg-[#FFB536] b rounded-full justify-center items-center">
            <Text className="text-black mx-auto">2</Text>
          </View> */}
          {/* <Text
            style={{ color: textTheme }}
            className="font-semibold text-[#243763] text-base"
          >
            Errand Details
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
          <TouchableOpacity className='w-10 bg-[#888] h-[39px] rounded-full' disabled>
            <Text className='text-center text-white mt-3'>3</Text>
          </TouchableOpacity>
          <View className='w-10 h-[1px] bg-[#09497D]'></View>
          <TouchableOpacity className='w-10 bg-[#888] h-[39px] rounded-full' disabled>
            <Text className='text-center text-white mt-3'>4</Text>
          </TouchableOpacity>
          <View className='w-10 h-[1px] bg-[#09497D]'></View>
          <TouchableOpacity className='w-10 bg-[#888] h-[39px] rounded-full' disabled>
            <Text className='text-center text-white mt-3'>5</Text>
          </TouchableOpacity>
        </View> */}

        <View className="px-4 mt-6">
          <Text
            style={{ color: '#6D6D6D', fontFamily: 'Axiforma' }}
            className="text-[#777777] text-base"
          >
            Kindly provide the information about the errand you wish to post
          </Text>
        </View>

        <View className="mt-5 px-4">
          <View className="">
            <Text
              style={{ color: '#393F42', fontFamily: 'Axiforma' }}
              className="text-base"
            >
              Explain exactly what you need
            </Text>
            <Text style={{ fontFamily: 'Axiforma' }} className="text-red-600 text-[12px]">
              *{detailError.desc}
            </Text>
          </View>
          <TextInput
            className="w-full border bg-[#FFF] border-[#96A0A5] text-sm py-3.5 mt-2 rounded-lg px-3"
            placeholder="Give full details of what you need help with"
            multiline={true}
            numberOfLines={10}
            onChangeText={(text) => handleInputChange(text, 'description')}
            defaultValue={postErrandData.description}
            style={{ height: 100, textAlignVertical: 'top' }}
          />

          <View className="flex-row space-x-6">
            {selectedTime === 'Specify' ? (
              ''
            ) : (
              <View className="w-full">
                <View className="mt-[40px]">
                  <Text
                    style={{ color: '#393F42', fontFamily: 'Axiforma' }}
                    className="text-base"
                  >
                    When do you need this done ?
                  </Text>
                </View>
                <Dropdown
                  style={style.dropdown}
                  placeholderStyle={style.placeholderStyle}
                  selectedTextStyle={style.selectedTextStyle}
                  inputSearchStyle={style.inputSearchStyle}
                  iconStyle={style.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={'Today'}
                  value={postErrandData.dur_period.toString()}
                  onChange={(item) => {
                    setSelectedTime(item.label)
                    handleInputChange(item.label, 'dur_period')
                  }}
                />
              </View>
            )}
          </View>

          {selectedTime === 'Specify' ? (
            <View className="flex-row space-x-6">
              <View>
                <Text style={{ color: textTheme }} className="pt-4">
                  Duration
                </Text>
                <View className="flex-row mt-4  space-x-3">
                  <TouchableOpacity
                    onPress={() => adjustDuration(durationNumber, 'substract')}
                    className="text-2xl px-2 border rounded-lg "
                  >
                    <Text className="text-black text-4xl">-</Text>
                  </TouchableOpacity>
                  <View className=" bg-white flex-row justify-center items-center rounded-lg">
                    <Text className="text-lg">{durationNumber}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => adjustDuration(durationNumber, 'add')}
                    className="text-white text-2xl border px-2 rounded-lg"
                  >
                    <Text className="text-black text-2xl">+</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row">
                <View className="w-[230px]">
                  <View className="pt-4 pb-2">
                    <Text style={{ color: textTheme }}>
                      Choose The Period of Time
                    </Text>
                  </View>

                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={Periods}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={'Day(s)'}
                    value={postErrandData.dur_period}
                    onChange={(item) => {
                      handleInputChange(item.label, 'dur_period')
                    }}
                  />
                </View>
              </View>
            </View>
          ) : (
            ''
          )}

          <View className="flex-row">
            <View className="w-full">
              <View className="pt-6 pb-2">
                <Text
                  style={{ color: '#393F42', fontFamily: 'Axiforma' }}
                  className="text-base"
                >
                  How many people do you need running this errand?
                </Text>
              </View>
              {/* <SelectDropdown
                defaultValue={postErrandData.errandType}
                data={['multi-user', 'single-user']}
                buttonStyle={style.dropdownInput}
                onSelect={(selectedItem, index) => {
                  handleInputChange(selectedItem, 'errandType')
                }}
              /> */}
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={errandData}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={'One Person'}
                value={postErrandData.errandType}
                onChange={(item) => {
                  handleInputChange(item.label, 'errandType')
                }}
              />
            </View>
          </View>

          {/* <View className="w-[398px] h-[38px] mx-auto mt-10 ml-4"></View> */}

          <View className="pt-6">
            <Text style={{ color: textTheme, fontFamily: 'Axiforma' }}>
              You can add up to three Image to this errand if you choose
            </Text>
          </View>
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
            <Text style={{ color: textTheme }} className="text-[#3F60AC]">
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

          {/* <View className="mt-4">
            <Text style={{ color: textTheme }} className="text-[#243763]">
              You can record a voice note to better describe this errand
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

            <Text
              style={{ color: textTheme }}
              className="mx-auto text-[#808080] text-center pt-2"
            >
              {IsRecording
                ? 'Click to stop recording'
                : 'Click on the Mic icon above to record your voice message'}
            </Text>
          </TouchableOpacity> */}

          {/* {recorded && (
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
          )} */}

          {/* <View>
            <View className="mt-[40px]">
              <Text style={{ color: textTheme }}>
                Restrict Errand by Qualification
              </Text>
            </View>
           
            <Dropdown
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              data={errandRestrictions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'No'}
              value={postErrandData.res_by_qualification}
              onChange={(item) => {
                handleInputChange(item.label, 'res_by_qualification')
              }}
            />
          </View> */}
          {/* <View>
            <View className="mt-[40px]">
              <Text style={{ color: textTheme }}>
                Restrict Errand by Verification
              </Text>
            </View>
          
            <Dropdown
              style={style.dropdown}
              placeholderStyle={style.placeholderStyle}
              selectedTextStyle={style.selectedTextStyle}
              inputSearchStyle={style.inputSearchStyle}
              iconStyle={style.iconStyle}
              data={errandRestrictions}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'No'}
              value={postErrandData.res_by_verification}
              onChange={(item) => {
                handleInputChange(item.label, 'res_by_verification')
              }}
            />
          </View> */}
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

  dropdown: {
    margin: 4,
    height: 45,
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 6,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 4,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
    fontSize: 16,
    paddingVertical: 0,
  },
})

export default CreateErrandDetails
