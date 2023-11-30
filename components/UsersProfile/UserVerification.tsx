import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo, useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const UserVerification = ({
  data,
  openPersonalId,
  openGuarantorModal,
  openOfficeModal,
  openEmailModal,
}: any) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const bottomSheetRef2 = useRef<BottomSheetModal>(null)
  const bottomSheetRef3 = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['76%'], [])
  const snapPoints1 = useMemo(() => ['88%'], [])
  const snapPoints2 = useMemo(() => ['90%'], [])
  const snapPoints3 = useMemo(() => ['77%'], [])

  function closeEmailModal() {
    bottomSheetRef.current?.dismiss()
  }

  // function openPersonalId() {
  //   bottomSheetRef1.current?.present()
  // }

  function closePersonalId() {
    bottomSheetRef1.current?.dismiss()
  }

  function openOFficeModal() {
    bottomSheetRef2.current?.present()
  }

  function closeOfficeModal() {
    bottomSheetRef2.current?.dismiss()
  }

  function closeGuarantorModal() {
    bottomSheetRef3.current?.dismiss()
  }

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}

        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  // console.log('........data.has_verified_location', data.has_verified_location)

  return (
    <SafeAreaView className="mt-6 h-screen">
      <ScrollView>
        <View className="flex-row justify-between items-center mx-4">
          <View className="w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md">
            <Text>
              <MaterialIcons name="person-add-alt" size={24} color="#3F60AC" />
            </Text>
          </View>
          <Text style={{ color: textTheme }} className="font-light leading-8 ">
            Basic Verification
          </Text>
          <View className="w-[100px] h-[34px] bg-[#D8F8E9] justify-center items-center rounded-[20px] ">
            <Text className="text-[#115A38] font-md text-sm">Completed</Text>
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
          <Text style={{ color: textTheme }} className="font-light leading-8">
            Personal Identification
          </Text>
          <View
            className="w-[100px] h-[34px] justify-center items-center rounded-[20px]"
            style={{
              backgroundColor:
                data.has_verified_personal_id === 0 ||
                data.has_verified_personal_id === 1 ||
                data.has_verified_personal_id === 2
                  ? '#FEE1CD'
                  : '#D8F8E9',
            }}
          >
            {data.has_verified_personal_id === 0 ? (
              <Text className="text-[#642B02] font-md text-sm">Incomplete</Text>
            ) : data.has_verified_personal_id === 1 ? (
              <Text className="text-[#642B02] font-md text-sm">Pending</Text>
            ) : data.has_verified_personal_id === 2 ? (
              <Text className="text-[#642B02] font-md text-sm">Rejected</Text>
            ) : data.has_verified_personal_id === 3 ? (
              <Text className="text-[#115A38] font-md text-sm">Completed</Text>
            ) : null}
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row justify-between items-center mx-4 mt-6"
          onPress={() => openOfficeModal()}
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
          <Text style={{ color: textTheme }} className="font-light leading-8">
            Personal ID confirmation
          </Text>
          <View
            className={
              'w-[100px] h-[34px] justify-center items-center rounded-[20px]'
            }
            style={{
              backgroundColor:
                data.has_verified_location === 0 ||
                data.has_verified_location === 1 ||
                data.has_verified_location === 2
                  ? '#FEE1CD'
                  : '#D8F8E9',
            }}
          >
            {data.has_verified_location === 0 ? (
              <Text className="text-[#642B02] font-md text-sm">Incomplete</Text>
            ) : data.has_verified_location === 1 ? (
              <Text className="text-[#642B02] font-md text-sm">Pending</Text>
            ) : data.has_verified_location === 2 ? (
              <Text className="text-[#642B02] font-md text-sm">Rejected</Text>
            ) : data.has_verified_location === 3 ? (
              <Text className="text-[#115A38] font-md text-sm">Completed</Text>
            ) : (
              ''
            )}
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
          <Text style={{ color: textTheme }} className="font-light leading-8">
            Email Verification
          </Text>
          <View
            className="w-[100px] h-[34px] justify-center items-center rounded-[20px] "
            style={{
              backgroundColor: data.has_verified_email ? '#D8F8E9' : '#FEE1CD',
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

        {/* <TouchableOpacity
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
          </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserVerification
