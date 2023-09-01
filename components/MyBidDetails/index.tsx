import { Entypo } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import React, { useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import ActionButton from '../ActionButtons'

interface BidsProps {
  openBidModal: any
  navigation: any
}

const Bids = ({ navigation, openBidModal }: BidsProps) => {
  // Handles show reply

  const bottomSheetRef = useRef<BottomSheetModal>(null)

  const [isHidden, setIsHidden] = useState(true)

  const handleReplies = () => {
    setIsHidden(!isHidden)
  }

  const [isBlue, setIsBlue] = useState(true)

  const [inputValue, setInputValue] = useState('')

  const toggleColor = () => {
    setIsBlue((prevIsBlue) => !prevIsBlue)
  }

  const handleBidNavigation = () => {
    navigation.navigate('Bids')
  }

  const handleErrandDetailsNavigation = () => {
    navigation.navigate('ErrandsAndBids')
  }

  const handleBoth1 = () => {
    handleErrandDetailsNavigation()
  }

  const handleBoth2 = () => {
    handleBidNavigation()
  }

  const bottomSheetModalref = useRef(null)
  const bottomSheetModalref1 = useRef(null)
  const bottomSheetModalref2 = useRef(null)

  const snapPoints = ['90%']

  const snapPoints1 = ['35%']

  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false)

  const handleKeyboardWillShow = () => {
    setIsKeyboardVisible(true)
  }

  const handleKeyboardWillHide = () => {
    setIsKeyboardVisible(false)
  }

  // useEffect(() => {
  //   const keyboardWillShowListener = Keyboard.addListener(
  //     Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
  //     handleKeyboardWillShow,
  //   )
  //   const keyboardWillHideListener = Keyboard.addListener(
  //     Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
  //     handleKeyboardWillHide,
  //   )

  //   return () => {
  //     keyboardWillShowListener.remove()
  //     keyboardWillHideListener.remove()
  //   }
  // }, [])

  const handlePresentModal = () => {
    bottomSheetModalref.current?.present()
  }

  const closeBottomSheet = () => {
    // Logic to close the bottom sheet modal
    bottomSheetModalref.current?.close()
  }

  const handlePresentModal1 = () => {
    bottomSheetModalref1.current?.present()
  }

  const closeBottomSheet1 = () => {
    // Logic to close the bottom sheet modal
    closeBottomSheet()
    bottomSheetModalref1.current?.close()
  }

  const handleNegotiateBid = () => {
    bottomSheetModalref2.current?.present()
  }

  const handleSubmitBid = () => {
    // Logic to close the bottom sheet modal
    bottomSheetModalref2.current?.close()
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={{ flex: 1 }} className="">
        <ScrollView scrollEventThrottle={16}>
          <View className="">
            <View>
              <View className="">
                <Text className="text-[16px] font-bold">Existing Bids</Text>
              </View>

              <View className="mt-[28px]">
                <View className=" flex-row items-start ">
                  <View className="flex-row items-start justify-between gap-3">
                    <Image
                      source={require('../../assets/images/stanton.jpg')}
                      style={{ width: 40, height: 40, borderRadius: 50 }}
                    />
                    <View className="flex-row justify-between items-center">
                      <View className="w-60">
                        <Text className="text-[#011E3E] text-sm">
                          Kaiya Stanton
                        </Text>
                        <Text className="text-sm">
                          4.5
                          <Text className="text-[12px] text-[#6D6D6D]">
                            {' '}
                            <Entypo name="star" size={12} color="gold" /> (134
                            Errands Completed)
                          </Text>
                        </Text>
                      </View>
                      <View>
                        <View className="w-14 py-[2px] rounded-lg bg-[#115A38] justify-center mr-1">
                          <Text className="text-center text-white font-bold text-sm">
                            N50k
                          </Text>
                        </View>
                        <Text className="text-[#6c6a6a] text-xs pt-1">
                          {' '}
                          2 hrs ago
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className=" w-[380px]">
                  <Text className="leading-[24px] text-[14px] pt-2 text-[#444444]">
                    Lorem ipsum dolor sit amet consectetur. At convallis cu
                    sodales lorem et. Consectetur est posuere ferme egess congue
                    lectus purus. Mattis libero ultrices at massa he purus.
                  </Text>
                </View>
              </View>

              <View className="flex-row ml-1 mt-6 items-center">
                <View className="flex-row gap-2 flex-1 w-3/5">
                  <ActionButton
                    onPress={handlePresentModal}
                    name="checkmark"
                    iconColor="#33A532"
                    className="w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#33A532]"
                  />

                  <ActionButton
                    name="x"
                    iconColor="#FF0000"
                    className="w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#FF0000]"
                  />

                  <ActionButton
                    onPress={handleNegotiateBid}
                    name="comment"
                    iconColor="#317ACF"
                    className="w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#317ACF]"
                  />
                </View>

                <TouchableOpacity onPress={openBidModal} className="w-3/5">
                  <View className="">
                    <Text className="text-xs text-center text-[#243763]">
                      View Replies
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Replies to be viewed */}
              <View
                className="mt-[32px] space-y-4"
                style={{ display: isHidden ? 'none' : 'flex' }}
              >
                <View className="flex-row ">
                  <Image
                    source={require('../../assets/images/george.jpg')}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                  <View className="w-[340px] h-[230px] ml-2 bg-[#DAE1F1] b rounded-xl px-3">
                    <View className="flex-row items-center justify-between mt-4 ">
                      <Text className="leading-6 w-4/6 font-semibold text-sm">
                        Enoobong George
                      </Text>
                      <Text className="leading-6 font-semibold text-sm w-2/4">
                        2 hours ago
                      </Text>
                    </View>

                    <View className="mt-3 w-[300px]">
                      <Text className="leading-[24px] text-base font-normal">
                        Lorem ipsum dolor sit amet consectetur. At convallis cu
                        sodales lorem et. Consectetur est posuere ferme egess
                        congue lectus purus. Mattis libero ultrices at massa he
                        purus.
                      </Text>
                    </View>

                    <View className="w-[76px] h-[32px] ml-[16px] bg-[#115A38] justify-center mr-1 mt-3 mb-4 b rounded">
                      <Text className="text-center text-white font-normal text-base">
                        N50,000
                      </Text>
                    </View>
                  </View>
                </View>

                <View className="flex-row ">
                  <Image
                    source={require('../../assets/images/george.jpg')}
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                  />
                  <View className="w-[340px] h-[230px] ml-2 bg-[#DAE1F1] b rounded-xl px-3">
                    <View className="flex-row items-center justify-between mt-4 ">
                      <Text className="leading-6 w-4/6 font-semibold text-sm">
                        Enoobong George
                      </Text>
                      <Text className="leading-6 font-semibold text-sm w-2/4">
                        2 hours ago
                      </Text>
                    </View>

                    <View className="mt-3 w-[300px]">
                      <Text className="leading-[24px] text-base font-normal">
                        Lorem ipsum dolor sit amet consectetur. At convallis cu
                        sodales lorem et. Consectetur est posuere ferme egess
                        congue lectus purus. Mattis libero ultrices at massa he
                        purus.
                      </Text>
                    </View>

                    <View className="w-[76px] h-[32px] ml-[16px] bg-[#115A38] justify-center mr-1 mt-3 mb-4 b rounded">
                      <Text className="text-center text-white font-normal text-base">
                        N50,000
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* End of Replies */}

              {/* <BottomSheetModal
              ref={bottomSheetModalref}
              index={0}
              snapPoints={snapPoints}
            >
              <View>
                <Text className="text-[20px] text-center leading-[22px] font-semibold">
                  Accept Bid
                </Text>
              </View>

              <View className="w-[296px] h-[44px] mx-auto mt-6">
                <Text className="text-center">
                  Are you sure you want to Accept Enoobong George's bid on your
                  errand?
                </Text>
              </View>

              <TouchableOpacity onPress={handlePresentModal1}>
                <View className="w-[380px] h-[48px] bg-[#243763] mx-auto items-center justify-center mt-[45px]">
                  <Text className="text-white text-center leading-[24px] font-semibold text-[16px]">
                    Accept Bid
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={closeBottomSheet}>
                <View className="w-[380px] h-[48px] border-red-600 border-solid border bg-[#fff] mx-auto items-center justify-center mt-[16px]">
                  <Text className="text-[#C82332] text-center leading-[24px] font-semibold text-[16px]">
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </BottomSheetModal> */}

              {/* <BottomSheetModal
              ref={bottomSheetModalref1}
              index={0}
              snapPoints={snapPoints1}
            >
              <View>
                <Text className="text-[20px] text-center leading-[22px] font-semibold">
                  Bid Accepted
                </Text>
              </View>

              <View className="w-[80px] h-[80px] mx-auto mt-6">
                <Image source={require('../../assets/images/stamp.jpg')} />
              </View>

              <TouchableOpacity onPress={closeBottomSheet1}>
                <View className="w-[380px] h-[48px]  bg-[#243763] mx-auto items-center justify-center mt-[48px]">
                  <Text className="text-[#fff] text-center leading-[24px] font-semibold text-[16px]">
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </BottomSheetModal> */}

              {/* <BottomSheetModal
              ref={bottomSheetModalref2}
              index={0}
              snapPoints={[isKeyboardVisible ? '90%' : '51%']}
            >
              <View>
                <Text className="text-[20px] text-center leading-[22px] font-semibold">
                  Negotiate Bid
                </Text>
              </View>

              <TouchableOpacity onPress={closeBottomSheet}>
                <View className="w-[399px] h-[48px] border-red-600 border-solid border bg-[#fff] mx-auto items-center justify-center mt-[16px]">
                  <Text className="text-[#C82332] text-center leading-[24px] font-semibold text-[16px]">
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </BottomSheetModal> */}

              {/* <BottomSheetModal
              ref={bottomSheetModalref1}
              index={0}
              snapPoints={snapPoints1}
            >
              <View>
                <Text className="text-[20px] text-center leading-[22px] font-semibold">
                  Bid Accepted
                </Text>
              </View>

              <View className="w-[80px] h-[80px] mx-auto mt-6">
                <Image source={require('../../assets/images/stamp.jpg')} />
              </View>

              <TouchableOpacity onPress={closeBottomSheet1}>
                <View className="w-[399px] h-[48px]  bg-[#243763] mx-auto items-center justify-center mt-[48px]">
                  <Text className="text-[#fff] text-center leading-[24px] font-semibold text-[16px]">
                    Close
                  </Text>
                </View>
              </TouchableOpacity>
            </BottomSheetModal> */}

              {/* <BottomSheetModal
              ref={bottomSheetModalref2}
              index={0}
              snapPoints={[isKeyboardVisible ? '90%' : '51%']}
            >
              <View>
                <Text className="text-[20px] text-center leading-[22px] font-semibold">
                  Negotiate Bid
                </Text>
              </View>

              <View>
                <Text className="pt-[15px] pl-[16px]">Amount</Text>
                <TextInput
                  keyboardType="numeric"
                  value={inputValue}
                  placeholder="Enter an Amount"
                  placeholderTextColor={'#A5B6DE'}
                  className="w-[380px] h-[48px] bg-[#DAE1F1] mx-auto mt-6 pl-4 items-center rounded"
                ></TextInput>
              </View>

              <View>
                <Text className="pt-[20px] pl-[16px]">Comments</Text>

                <TextInput
                  placeholder="Enter an Amount"
                  placeholderTextColor={'#A5B6DE'}
                  className="w-[380px] h-[80px] bg-[#DAE1F1] mx-auto mt-6 pl-4 items-center rounded"
                ></TextInput>
              </View>

              <TouchableOpacity onPress={handleSubmitBid}>
                <View className="w-[380px] h-[48px] bg-[#243763] mx-auto items-center justify-center mt-[32px]">
                  <Text className="text-[#fff] text-center leading-[24px] font-semibold text-[16px]">
                    Cancel
                  </Text>
                </View>
              </TouchableOpacity>
            </BottomSheetModal> */}
            </View>
          </View>

         
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
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
  },
})
export default Bids
