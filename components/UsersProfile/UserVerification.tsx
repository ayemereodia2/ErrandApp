import { EvilIcons, Feather, FontAwesome5 } from '@expo/vector-icons'
import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useMemo, useRef } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
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
    <View className="space-y-6 my-10">
      <TouchableOpacity
        className="flex-row justify-between items-center border py-4 px-3 border-[#E3E9EC] rounded-[8px] bg-[#FEFEFE] mx-4"
        onPress={() => openEmailModal()}
      >
        <Text
          style={{ color: '#393F42', fontFamily: 'Axiforma' }}
          className="text-sm "
        >
          Email Verification
        </Text>

        <View>
          {data.has_verified_email ? (
            <View className="flex-row items-center" style={{ gap: 4 }}>
              <Text className="text-[#05AE2F]">
                <Feather name="check" size={20} />
              </Text>
              <Text
                className="text-[#05AE2F] text-sm"
                style={{ fontFamily: 'Axiforma' }}
              >
                Completed
              </Text>
            </View>
          ) : (
            <View className="flex-row items-center" style={{ gap: 4 }}>
              <Text className="text-[#E71B1B]">
                <FontAwesome5 name="exclamation-triangle" size={20} />
              </Text>

              <Text
                className="text-sm text-[#E71B1B] mt-1"
                style={{ fontFamily: 'Axiforma' }}
              >
                Action Required
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* <View className="flex-row justify-between items-center mx-4">
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
        </View> */}

      <TouchableOpacity className="flex-row justify-between items-center border py-4 px-3 border-[#E3E9EC] rounded-[8px] bg-[#FEFEFE] mx-4 ">
        <Text
          style={{ color: '#393F42', fontFamily: 'Axiforma' }}
          className="text-sm "
        >
          Basic Verification
        </Text>

        {data.has_verified_personal_id === 0 ? (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text className="text-[#05AE2F]">
              <Feather name="check" size={20} />
            </Text>
            <Text
              className="text-[#05AE2F] text-sm"
              style={{ fontFamily: 'Axiforma' }}
            >
              Completed
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row justify-between items-center border py-4 px-3 border-[#E3E9EC] rounded-[8px] bg-[#FEFEFE] mx-4 "
        onPress={() => openPersonalId()}
      >
        <Text
          style={{ color: '#393F42', fontFamily: 'Axiforma' }}
          className="text-sm "
        >
          Personal Identification
        </Text>

        {data.has_verified_personal_id === 0 ? (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text className="text-[#E71B1B]">
              <FontAwesome5 name="exclamation-triangle" size={20} />
            </Text>

            <Text
              className="text-sm text-[#E71B1B] mt-1"
              style={{ fontFamily: 'Axiforma' }}
            >
              Action Required
            </Text>
          </View>
        ) : data.has_verified_personal_id === 1 ? (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text className="text-[#EF9105]">
              <EvilIcons name="clock" size={20} />
            </Text>
            <Text
              className="text-[#EF9105] text-sm"
              style={{ fontFamily: 'Axiforma' }}
            >
              Pending
            </Text>
          </View>
        ) : data.has_verified_personal_id === 2 ? (
          <Text className="text-[#642B02] font-md text-sm">Rejected</Text>
        ) : data.has_verified_personal_id === 3 ? (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text className="text-[#05AE2F]">
              <Feather name="check" size={20} />
            </Text>
            <Text
              className="text-[#05AE2F] text-sm"
              style={{ fontFamily: 'Axiforma' }}
            >
              Completed
            </Text>
          </View>
        ) : null}
      </TouchableOpacity>

      <TouchableOpacity
        className="flex-row justify-between items-center border py-4 px-3 border-[#E3E9EC] rounded-[8px] bg-[#FEFEFE] mx-4"
        onPress={() => openOfficeModal()}
      >
        <Text
          style={{ color: '#393F42', fontFamily: 'Axiforma' }}
          className="text-sm "
        >
          Personal ID confirmation
        </Text>

        {data.has_verified_location === 0 ? (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text className="text-[#E71B1B]">
              <FontAwesome5 name="exclamation-triangle" size={20} />
            </Text>

            <Text
              className="text-sm text-[#E71B1B] mt-1"
              style={{ fontFamily: 'Axiforma' }}
            >
              {' '}
              Action Required
            </Text>
          </View>
        ) : data.has_verified_location === 1 ? (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text className="text-[#EF9105]">
              <EvilIcons name="clock" size={20} />
            </Text>
            <Text
              className="text-[#EF9105] text-sm"
              style={{ fontFamily: 'Axiforma' }}
            >
              {' '}
              Pending{' '}
            </Text>
          </View>
        ) : data.has_verified_location === 2 ? (
          <Text className="text-[#642B02] font-md text-sm">Rejected</Text>
        ) : data.has_verified_location === 3 ? (
          <View className="flex-row items-center" style={{ gap: 4 }}>
            <Text className="text-[#05AE2F]">
              <Feather name="check" size={20} />
            </Text>
            <Text
              className="text-[#05AE2F] text-sm"
              style={{ fontFamily: 'Axiforma' }}
            >
              {' '}
              Completed{' '}
            </Text>
          </View>
        ) : (
          ''
        )}
      </TouchableOpacity>
    </View>
  )
}

export default UserVerification
