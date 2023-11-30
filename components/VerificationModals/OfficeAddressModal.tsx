import { EvilIcons, Feather } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Image,
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

const OfficeAddressModal = ({ closeOfficeModal }: any) => {
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

  const updateLocation = async (LocationData: any) => {
    setLoading(true)
    try {
      const _rs = await _fetch({
        method: 'PUT',
        _url: `/user/profile`,
        body: LocationData,
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

  const handleLocation = async () => {
    const updatedData = {
      address_document: uploadedFiles,
    }

    try {
      const responseData = await updateLocation(updatedData)

      // Checking if the response indicates success
      if (responseData.success) {
        // Handling a successful response from the server here

        // Show a success message to the user.
        Toast.show({
          type: 'success',
          text1:
            'Your file has been submitted successfully, you will be notified once your verification has been processed.',
        })

        closeOfficeModal()
      } else {
        // Handle the case where the server responded with an error message

        Toast.show({
          type: 'error',
          text1: 'Profile update failed:' + responseData.message,
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
    <View className="py-4 pb-10">
      <Text className="text-lg text-center font-semibold">
        Confirm your personal ID
      </Text>

      <View className="px-4 mt-6">
        <Text className="text-sm text-[#243763] font-semibold">
         Please upload a picture of yourself holding the personal Identification document you have submitted to SWAVE
        </Text>
      </View>

      {/* <View className="w-[398px] h-[38px] mx-auto mt-10 ml-4"></View> */}
      <ScrollView className='px-4'>
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
              {/* <Text className="mx-auto text-[#808080]">3 images maximum</Text> */}
            </TouchableOpacity>
          )}
        </View>

        <View className="mt-4">
          <Text className="text-[#3F60AC]">
            {uploadedFiles.length === 0 ? 0 : uploadedFiles.length} images
            selected (files must be in "png", "jpg", or "jpeg" format)
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
          onPress={closeOfficeModal}
        >
          <Text className="text-red-600">Close</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-[40%] mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => handleLocation()}
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
    </View>
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

export default OfficeAddressModal
