import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

interface SuccessProps {
  message?: string
  bidSuccessImg?: boolean
  toggleSuccessDialogue: (open: boolean) => void
   toggleNegotiateModal: (open: boolean) => void
}

export const SuccessDialogue = ({ message, bidSuccessImg, toggleSuccessDialogue, toggleNegotiateModal }: SuccessProps) => {
  return (
    <View>
      <View>
        {/* <Image
          style={{
            width: 80,
            height: 80,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/successBid.gif')}
        /> */}

        {/* <FastImage
          style={{ width: 200, height: 200 }}
          source={{
            uri: '../../assets/images/successBid.gif',
            headers: { Authorization: 'someAuthToken' },
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.contain}
        /> */}
      </View>
      <Text>Successful</Text>

      <View className="flex-row justify-center items-center px-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            toggleSuccessDialogue(false)
            toggleNegotiateModal(false)
          }}
        >
          <Text className="text-white text-base">
            Close
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
