import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import React, { useMemo, useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import EmailModal from '../VerificationModals/EmailModal'
import GuarantorModal from '../VerificationModals/GuarantorModal'
import OfficeAddressModal from '../VerificationModals/OfficeAddressModal'
import PersonalId from '../VerificationModals/PersonalId'

const UserVerification = ({ data }: any) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const bottomSheetRef2 = useRef<BottomSheetModal>(null)
  const bottomSheetRef3 = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['60%'], [])
  const snapPoints1 = useMemo(() => ['80%'], [])
  const snapPoints2 = useMemo(() => ['77%'], [])
  const snapPoints3 = useMemo(() => ['77%'], [])

  function openEmailModal() {
    bottomSheetRef.current?.present()
  }

  function closeEmailModal() {
    bottomSheetRef.current?.dismiss()
  }

  function openPersonalId() {
    bottomSheetRef1.current?.present()
  }

  function closePersonalId() {
    bottomSheetRef1.current?.dismiss()
  }

  function openOFficeModal() {
    bottomSheetRef2.current?.present()
  }

  function closeOfficeModal() {
    bottomSheetRef2.current?.dismiss()
  }

  function openGuarantorModal() {
    bottomSheetRef3.current?.present()
  }

  function closeGuarantorModal() {
    bottomSheetRef3.current?.dismiss()
  } ''
  
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <BottomSheetModalProvider>
      <SafeAreaView className="mt-6">
        <ScrollView>
          <View className="flex-row justify-between items-center mx-4">
            <View className="w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md">
              <Text>
                <MaterialIcons
                  name="person-add-alt"
                  size={24}
                  color="#3F60AC"
                />
              </Text>
            </View>
            <Text  style={{ color: textTheme }} className="font-light leading-8 ">Basic Verification</Text>
            <View className="w-[100px] h-[34px] bg-[#D8F8E9] justify-center items-center rounded-[20px] ">
              <Text  className="text-[#115A38] font-md text-sm">Completed</Text>
            </View>
          </View>

          <TouchableOpacity
            className="flex-row justify-between items-center mx-4 mt-6"
            onPress={() => openPersonalId()}
          >
            <View className="w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md">
              <Text>
                <Ionicons name="md-swap-vertical" size={24} color="#3F60AC" />
              </Text>
            </View>
            <Text  style={{ color: textTheme }} className="font-light leading-8">
              Personal Identification
            </Text>
            <View
              className="w-[100px] h-[34px] justify-center items-center rounded-[20px]"
              style={{
                backgroundColor:
                  data.has_verified_personal_id === 0 || 1 || 2
                    ? '#FEE1CD'
                    : '#D8F8E9',
              }}
            >
              {data.has_verified_personal_id === 0 ? (
                <Text className="text-[#642B02] font-md text-sm">
                  Incomplete
                </Text>
              ) : data.has_verified_personal_id === 1 ? (
                <Text className="text-[#642B02] font-md text-sm">Pending</Text>
              ) : data.has_verified_personal_id === 2 ? (
                <Text className="text-[#642B02] font-md text-sm">Rejected</Text>
              ) : data.has_verified_personal_id === 3 ? (
                <Text className="text-[#115A38] font-md text-sm">
                  Completed
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center mx-4 mt-6"
            onPress={() => openEmailModal()}
          >
            <View className="w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md">
              <Text>
                <MaterialCommunityIcons
                  name="email-outline"
                  size={24}
                  color="#3F60AC"
                />
              </Text>
            </View>
            <Text  style={{ color: textTheme }} className="font-light leading-8">Email Verification</Text>
            <View
              className="w-[100px] h-[34px] justify-center items-center rounded-[20px] "
              style={{
                backgroundColor: data.has_verified_email
                  ? '#D8F8E9'
                  : '#FEE1CD',
              }}
            >
              <Text
                className="font-md text-sm"
                style={{
                  color: data.has_verified_email ? '#115A38' : '#642B02',
                }}
              >
                {data.has_verified_email ? 'Completed' : 'Incomplete'}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center mx-4 mt-6"
            onPress={() => openOFficeModal()}
          >
            <View className="w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md">
              <Text>
                <MaterialCommunityIcons
                  name="office-building-outline"
                  size={24}
                  color="#3F60AC"
                />
              </Text>
            </View>
            <Text  style={{ color: textTheme }} className="font-light leading-8">
              Office Address Verification
            </Text>
            <View
              className="w-[100px] h-[34px] justify-center items-center rounded-[20px]"
              style={{
                backgroundColor:
                  data.has_verified_location === 0 || 1 || 2
                    ? '#FEE1CD'
                    : '#D8F8E9',
              }}
            >
              {data.has_verified_location === 0 ? (
                <Text className="text-[#642B02] font-md text-sm">
                  Incomplete
                </Text>
              ) : data.has_verified_location === 1 ? (
                <Text className="text-[#642B02] font-md text-sm">Pending</Text>
              ) : data.has_verified_location === 2 ? (
                <Text className="text-[#642B02] font-md text-sm">Rejected</Text>
              ) : data.has_verified_loaction === 3 ? (
                <Text className="text-[#115A38] font-md text-sm">
                  Completed
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row justify-between items-center mx-4 mt-6 mb-40"
            onPress={() => openGuarantorModal()}
          >
            <View className="w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md">
              <Text  style={{ color: textTheme }}>
                <MaterialIcons
                  name="person-add-alt"
                  size={24}
                  color="#3F60AC"
                />
              </Text>
            </View>
            <Text  style={{ color: textTheme }} className="font-light leading-8">
              Swave Reference
            </Text>
            <View
              className="w-[100px] h-[34px] justify-center items-center rounded-[20px]"
              style={{
                backgroundColor:
                  data.has_verified_guarantor === 0 || 1 || 2
                    ? '#FEE1CD'
                    : '#D8F8E9',
              }}
            >
              {data.has_verified_guarantor === 0 ? (
                <Text className="text-[#642B02] font-md text-sm">
                  Incomplete
                </Text>
              ) : data.has_verified_guarantor === 1 ? (
                <Text className="text-[#642B02] font-md text-sm">Pending</Text>
              ) : data.has_verified_guarantor === 2 ? (
                <Text className="text-[#642B02] font-md text-sm">Rejected</Text>
              ) : data.has_verified_guarantor === 3 ? (
                <Text className="text-[#115A38] font-md text-sm">
                  Completed
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>

          <BottomSheetModal
            ref={bottomSheetRef}
            index={0}
            snapPoints={snapPoints}
            containerStyle={{ marginHorizontal: 10 }}
          >
            <EmailModal closeEmailModal={closeEmailModal} />
          </BottomSheetModal>

          <BottomSheetModal
            ref={bottomSheetRef1}
            index={0}
            snapPoints={snapPoints1}
            containerStyle={{ marginHorizontal: 10 }}
          >
            <PersonalId closePersonalId={closePersonalId} />
          </BottomSheetModal>

          <BottomSheetModal
            ref={bottomSheetRef2}
            index={0}
            snapPoints={snapPoints2}
            containerStyle={{ marginHorizontal: 10 }}
          >
            <OfficeAddressModal closeOfficeModal={closeOfficeModal} />
          </BottomSheetModal>

          <BottomSheetModal
            ref={bottomSheetRef3}
            index={0}
            snapPoints={snapPoints3}
            containerStyle={{ marginHorizontal: 10 }}
          >
            <GuarantorModal closeGuarantorModal={closeGuarantorModal} />
          </BottomSheetModal>
        </ScrollView>
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}

export default UserVerification
