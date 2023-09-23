import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { setNegotiationLoaderToFalse } from '../../../services/bids/bidsAction'
import { useAppDispatch } from '../../../services/store'

interface SuccessProps {
  message?: string
  bidSuccessImg?: boolean
  toggleSuccessDialogue: (open: boolean) => void
  toggleNegotiateModal: (open: boolean) => void
}

export const SuccessDialogue = ({
  message,
  bidSuccessImg,
  toggleSuccessDialogue,
  toggleNegotiateModal,
}: SuccessProps) => {
  const dispatch = useAppDispatch()
  const ggif = '../../../assets/images/successBid.gif'
  return (
    <View>
      <View className='flex justify-center items-center'>
        <Image
          style={{
            width: 100,
            height: 100,
          }}
          source={require(ggif)}
        />
      </View>

      <View className="flex-row justify-center items-center px-4">
        <TouchableOpacity
          className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            toggleSuccessDialogue(false)
            toggleNegotiateModal(false)
            dispatch(setNegotiationLoaderToFalse(false))
          }}
        >
          <Text className="text-white text-base">Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
