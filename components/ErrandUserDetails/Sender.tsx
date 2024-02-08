import { AntDesign, Entypo, FontAwesome, Ionicons } from '@expo/vector-icons'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useAppDispatch } from '../../services/store'
import { Bids, MarketData, SingleSubErrand } from '../../types'
import { formatDate, getAddress } from '../../utils/helper'
import { ProfileInitials } from '../ProfileInitials'

interface SenderProp {
  errand: MarketData
  userId: string
  singleSubErrand: SingleSubErrand
  manageErrandClicked: boolean
  bids: Bids
}

export const SenderDetails = ({
  errand,
  userId,
  singleSubErrand,
  manageErrandClicked,
}: SenderProp) => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const budgetInNaira = Number(errand?.budget / Number(100))
  const [address, setAddress] = useState('')
  const [selectedImage, setSelectedImage] = useState('')

  const regex = /(<([^>]+)>)/gi

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])
  return (
    <ScrollView className="mt-10 px-6">
      <View className="">
        <View className="items-center justify-between">
          <View className="flex-row items-center justify-between my-3">
            <ProfileInitials
              textClass="text-white text-2xl"
              firstName={errand?.user.first_name}
              lastName={errand?.user.last_name}
              profile_pic={errand?.user.profile_picture}
              width={80}
              height={80}
              className=" bg-[#616161] rounded-full text-2xl w-20 h-20"
            />
          </View>

          <View className="pt-2">
            <View className="flex-row space-x-2 items-center justify-center">
              <Text className="text-center text-base font-semibold">
                {errand?.user?.first_name} {errand?.user?.last_name}
              </Text>
              {/* <MaterialIcons name="verified" color="green" size={20} /> */}
            </View>
            <Text className="text-[#555555] text-center py-2 text-base font-semibold">
              Swave User
            </Text>
            <View className="flex-row items-center">
              {/* {showStars(data.rating)} */}
              <Text>
                {errand?.user?.rating}{' '}
                <Entypo name="star" size={16} color="#FBB955" />{' '}
              </Text>
              <Text className="text-[#6D6D6D] text-sm">
                ( {errand?.user?.errands_completed}{' '}
                {errand?.user.errands_completed > 1 ? 'errands' : 'errand'}{' '}
                Completed)
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View className="pt-6 ">
        <Text className=" font-bold text-base text-[#555555]">Description</Text>
        <Text className="text-sm pt-1 text-[#383737] font-md">
          {errand.description.replace(regex, '')}
        </Text>
      </View>
      <View className="pt-6 ">
        <Text className=" font-bold text-base text-[#555555]">Budget</Text>

        <View className="flex-row items-center">
          <View className="bg-[#FEE1CD] rounded-2xl py-2 px-3 mt-2 ">
            <Text className="text-[#642B02] text-base font-bold">
              &#x20A6; {budgetInNaira.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>
      <View className="space-y-3 mt-3">
        <View className="space-x-2 flex-row mt-6">
          <Text className=" text-[14px] text-[#999999] w-28 font-medium">
            Status
          </Text>

          <Text className="capitalize font-semibold">{errand?.status}</Text>
        </View>

        <View className="space-x-2 flex-row mt-6">
          <Text className=" text-[14px] text-[#999999] w-28 font-medium">
            Duration
          </Text>
          <Text className=" text-sm text-[#000] w-60 font-semibold">
            <Ionicons name="calendar-outline" size={18} color="black" />{' '}
            {formatDate(errand.expiry_date)}
          </Text>
        </View>

        <View className="space-x-2 flex-row mt-6">
          <Text className=" text-[14px] text-[#999999] w-28 font-medium">
            Deadline
          </Text>
          <Text className=" text-sm text-[#000] w-60 font-semibold">
            <Ionicons name="calendar-outline" size={18} />
            {formatDate(errand.expiry_date)}
          </Text>
        </View>

        <View className="space-x-2 flex-row mt-6">
          <Text className=" text-[14px] text-[#999999] w-28 font-medium">
            Location
          </Text>
          <Text className=" text-sm text-[#000] w-60 font-semibold">
            {!address ? errand?.pickup_address?.address_text : address}
          </Text>
        </View>

        {errand?.has_insurance && (
          <View className="space-x-6 mt-6 flex-row">
            <Text className=" text-[14px] text-[#999999] font-medium pb-2">
              Requirements
            </Text>
            <View className="flex-row space-x-3 w-60">
              <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center  border-[#3F60AC] border rounded-2xl">
                <Text className="text-center text-[#3F60AC] text-xs">
                  <FontAwesome
                    name="check-circle"
                    size={12}
                    color={'#3F60AC'}
                  />{' '}
                  Insurance
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <Text className="pr-6 mt-8 font-bold text-base text-[#555555]">
        Other Resources
      </Text>

      <View className="flex-row space-x-4 my-4">
        {errand?.images?.map((image, index) => (
          <View className="">
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedImage(image)}
            >
              <Image
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 10,
                }}
                source={{ uri: image }}
              />
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {errand.user_id === userId && errand.status === 'active' && (
        <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mt-6 mb-8">
          <Text className="text-center">
            When the errand has been completed successfully by the runner, click
            this button.
          </Text>

          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CompleteErrandModal', {
                  errand,
                  userId,
                  singleSubErrand,
                })
              }}
              className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
            >
              <Text className="text-center text-white">Completed</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {errand.user_id === userId &&
        singleSubErrand?.status === 'active' &&
        manageErrandClicked && (
          <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mt-6">
            <Text className="text-center">
              When the errand has been completed successfully by the runner,
              click this button.
            </Text>

            <View className="items-center">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CompleteErrandModal', {
                    errand,
                    userId,
                    singleSubErrand,
                  })
                }}
                className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
              >
                <Text className="text-center text-white">Completed</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      {errand?.user_id === userId && errand?.status === 'active' && (
        <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mb-8">
          <Text className="text-center">
            If you wish to cancel this errand, click this button. Please note
            that if this errand has begun you will be fined for this action
          </Text>

          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                // dispatch(
                //   errandAction({
                //     sub_errand_id: singleSubErrand?.id,
                //     type: 'complete',
                //     method: 'PATCH',
                //     source: userId === errand.user_id ? 'sender' : 'runner',
                //     errandId: errand.id,
                //     dispatch,
                //     navigation,
                //   }),
                // )

                navigation.navigate('CancelErrandModal', {
                  errand,
                  userId,
                  singleSubErrand,
                })
              }}
              className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
            >
              <Text className="text-center text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {errand?.user_id === userId && errand?.status === 'open' && (
        <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mb-8">
          <Text className="text-center">
            If you wish to cancel this errand, click this button. Please note
            that if this errand has begun you will be fined for this action
          </Text>

          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                // dispatch(
                //   errandAction({
                //     sub_errand_id: singleSubErrand?.id,
                //     type: 'complete',
                //     method: 'PATCH',
                //     source: userId === errand.user_id ? 'sender' : 'runner',
                //     errandId: errand.id,
                //     dispatch,
                //     navigation,
                //   }),
                // )

                navigation.navigate('CancelErrandModal', {
                  errand,
                  userId,
                  singleSubErrand,
                })
              }}
              className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
            >
              <Text className="text-center text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {errand?.user_id === userId && errand?.status === 'pending' && (
        <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mb-8">
          <Text className="text-center">
            If you wish to cancel this errand, click this button. Please note
            that if this errand has begun you will be fined for this action
          </Text>

          <View className="items-center">
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('CancelErrandModal', {
                  errand,
                  userId,
                  singleSubErrand,
                })
              }}
              className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
            >
              <Text className="text-center text-white">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {errand.user_id === userId &&
        singleSubErrand?.status === 'active' &&
        manageErrandClicked && (
          <View className="border-[#C85604] border-[1px] rounded-lg bg-[#FEF0E6] p-4 mt-2 mb-14">
            <Text className="text-center">
              If you wish to cancel this errand, click this button. Please note
              that if this errand has begun you will be fined for this action
            </Text>

            <View className="items-center">
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('CancelErrandModal', {
                    errand,
                    userId,
                    singleSubErrand,
                  })
                }}
                className="bg-[#FA6B05] w-40 py-3  mt-8 rounded-lg shadow-lg "
              >
                <Text className="text-center text-white">Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

      <Modal visible={selectedImage !== ''} transparent={true} animated>
        <View className="flex-row justify-end pr-6">
          <AntDesign
            onPress={() => setSelectedImage('')}
            name="closecircle"
            color="#999"
            size={40}
            className=""
          />
        </View>

        <ReactNativeZoomableView
          maxZoom={30}
          contentWidth={300}
          contentHeight={150}
        >
          <Image source={{ uri: selectedImage }} style={[styles.modalImage]} />
        </ReactNativeZoomableView>

        {/* <TouchableOpacity
          onPress={() => setSelectedImage('')}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity> */}
        {/* </View> */}
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#0c1730',
  },
  image: {
    width: 200,
    height: 200,
  },

  _container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})
