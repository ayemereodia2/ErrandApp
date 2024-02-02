import { EvilIcons, Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { postFiles } from '../../services/errands/postFiles'
import { RootState, useAppDispatch } from '../../services/store'
import { RadioButton } from 'react-native-paper'

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

const PersonalId = ({ closePersonalId }: any) => {
  const dispatch = useAppDispatch()

  const [loading, setLoading] = useState(false)

  const [selectedImage, setSelectedImage] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])

  const { loading: uploadingImages } = useSelector(
    (state: RootState) => state.postFilesReducer,
  )

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

  const updatePersonalId = async (PersonalData: any) => {
    setLoading(true)
    try {
      const _rs = await _fetch({
        method: 'PUT',
        _url: `/user/profile`,
        body: PersonalData,
      })

      // Check if the response status code indicates an error
      if (!_rs.ok) {
        const errorResponse = await _rs.json()
        throw new Error(`Server error: ${errorResponse.message}`)
      }

      setLoading(false)

      const responseData = await _rs.json()

      return responseData
    } catch (error) {
      throw error
    }
  }

  const handleUpdateProfile = async () => {
    const updatedData = {
      personal_id_document:  uploadedFiles,
    }

    try {
      const responseData = await updatePersonalId(updatedData)

      // Checking if the response indicates success
      if (responseData.success) {
        // Handling a successful response from the server here

        // Show a success message to the user.
        Toast.show({
          type: 'success',
          text1:
            'Your file has been submitted successfully, you will be notified once your verification has been processed.',
        })

        closePersonalId()
      } else {
        // Handle the case where the server responded with an error message
        console.error('file update failed:', responseData.message)

        Toast.show({
          type: 'error',
          text1: 'file update failed:' + responseData.message,
        })
      }
    } catch (error) {
      // Handle errors here, such as network errors or server-side errors

      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }

  return (
    <SafeAreaView className='mx-3 mb-48'>
      <ScrollView  showsHorizontalScrollIndicator={false}>
        <Text className="text-base ml-3 mt-3 font-semibold" style={{fontFamily: 'Axiforma'}}>
          Kindly upload your personal ID for verification
        </Text>

        {/* <View className="px-4 mt-6">
          <Text className="text-sm text-[#243763] font-semibold">
            In other to validate your personal information, Please upload the
            relevant documents. Valid documents include International passport,
            National ID or Voters card. Images must be either PNG, JPG or JPEG
            format
          </Text>
        </View> */}

        <View className='mx-3 mt-4 mb-4'>
          <TouchableOpacity className='flex-row mt-4 mb-4 items-center justify-between px-3 py-4 rounded-[10px] bg-white border-0.5 border-[#666]'>
              <Text className='text-[#040708] text-sm' style={{fontFamily: 'Axiforma'}}>National Identification Number (NIN)</Text>
              <Text>
                <RadioButton value='National Identification Number' />
              </Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between mt-3 mb-4 px-3 py-4 rounded-[10px] bg-white border-0.5 border-[#666]'>
              <Text className='text-[#040708] text-sm' style={{fontFamily: 'Axiforma'}}>Driver’s License</Text>
              <Text>
                <RadioButton value='National Identification Number' />
              </Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between px-3 mt-3 mb-4 py-4 rounded-[10px] bg-white border-0.5 border-[#666]'>
              <Text className='text-[#040708] text-sm' style={{fontFamily: 'Axiforma'}}>International Passport</Text>
              <Text>
                <RadioButton value='National Identification Number' />
              </Text>
          </TouchableOpacity>

          <TouchableOpacity className='flex-row items-center justify-between px-3 mt-3 mb-4 py-4 rounded-[10px] bg-white border-0.5 border-[#666]'>
              <Text className='text-[#040708] text-sm' style={{fontFamily: 'Axiforma'}}>Permanent Voter’s card (PVC)</Text>
              <Text>
                <RadioButton value='National Identification Number' />
              </Text>
          </TouchableOpacity>
        </View>

        {/* <View className="w-[398px] h-[38px] mx-auto mt-10 ml-4"></View> */}
        <ScrollView className='px-4' >
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
                  
                  <Feather name="upload" size={40} color="#3F60AC" />
                </Text>
                <Text className="mx-auto mt-3 text-[#6D6D6D] text-base" style={{fontFamily: 'Axiforma'}}>
                 Upload your file here
                </Text>
                {/* <Text className="mx-auto text-[#808080]">3 images maximum</Text> */}
              </TouchableOpacity>
            )}
          </View>

          <View className="mt-4">
            <Text className="text-[#3F60AC]">
              {uploadedFiles.length === 0 ? 0 : uploadedFiles.length} images
              selected
            </Text>
          </View>
        </ScrollView>
        <ScrollView horizontal className="ml-4 mt-4">
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

        <View className="flex-row justify-around items-center mt-4">
          <TouchableOpacity
            className="bg-white h-12 w-[40%] mt-6 flex-row justify-center items-center rounded-lg border border-red-600"
            onPress={closePersonalId}
          >
            <Text className="text-red-600">Close</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-[#1E3A79] h-12 w-[40%] mt-6 flex-row justify-center items-center rounded-lg"
            onPress={() => handleUpdateProfile()}
          >
            <Text className="text-white text-base">
              {loading ? (
                <ActivityIndicator size="small" color="#000000" />
              ) : (
                'Submit'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'white',
  },
})

export default PersonalId
