import { AntDesign, Entypo } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useSelector } from 'react-redux'
import BidWrapper from '../../components/BidWrapper'
import { DetailHeader } from '../../components/DetailHeader'
import { SuccessDialogue } from '../../components/Modals/Success/SuccessDialogue'
import Timeline from '../../components/Timeline'
import { currentUserDetails } from '../../services/auth/currentUserInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { SingleSubErrand } from '../../types'

const MyErrandInfo = ({ navigation, route }: any) => {
  const [userId, setUserId] = useState('')
  const negotiateRef = useRef<BottomSheetModal>(null)
  const successDialogueRef = useRef<BottomSheetModal>(null)
  const completeDialogueRef = useRef<BottomSheetModal>(null)
  const dispatch = useAppDispatch()

  const bids = route?.params?.bids

  const acceptBidRef = useRef<BottomSheetModal>(null)
  const [manageErrandClicked, setManageErrandClicked] = useState(false)

  const { data: singleSubErrand } = useSelector(
    (state: RootState) => state.subErrandReducer,
  )

  const [subErrand, setSubErrand] = useState<SingleSubErrand>({
    id: '',
    original_errand_id: '',
    sender_id: '',
    runner_id: '',
    amount: 0,
    timeline: {
      id: '',
      errand_id: '',
      updates: [],
      created_at: '',
      updated_at: '',
    },
    status: '',
    cancellation_reason: '',
    created_at: '',
    updated_at: '',
  })

  // const [selectedTab, setSelectedItem] = useState('details')
  const layout = useWindowDimensions()
  const [isModalVisible, setModalVisible] = useState(false)

  const { data: user, loading } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const { data: errand, loading: loadingErrand } = useSelector(
    (state: RootState) => state.errandDetailsReducer,
  )

  const snapPoints = ['55%']
  const successPoints = ['30%']

  function toggleNegotiateModal(open: boolean) {
    open ? negotiateRef.current?.present() : negotiateRef.current?.dismiss()
  }

  function toggleSuccessDialogue(open: boolean) {
    open
      ? successDialogueRef.current?.present()
      : successDialogueRef.current?.dismiss()
  }

  function toggleCompleteDialogue(open: boolean) {
    open
      ? completeDialogueRef.current?.present()
      : completeDialogueRef.current?.dismiss()
  }

  const getUserId = async () => {
    const userId = (await AsyncStorage.getItem('user_id')) || ''
    setUserId(userId)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: DetailHeader({
        errand,
        user_id: userId,
        singleSubErrand: subErrand,
        manageErrandClicked: false,
      }),
      headerLeft: () => (
        <TouchableOpacity className='pr-8' onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color="#243763" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="pr-3">
          <TouchableOpacity>
            <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" color={'black'} size={16} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    padding: 4,
                    width: 150,
                    marginTop: 20,
                  },
                }}
              >
                {errand.user_id === userId && errand?.status === 'active' && (
                  <MenuOption
                    onSelect={() => {
                      // console.log(">>>>>>>errand", errand);

                      navigation.navigate('CompleteErrandModal', {
                        errand,
                        userId,
                        singleSubErrand,
                        bids,
                      })
                    }}
                    text="Completed Errand"
                    customStyles={{
                      optionWrapper: {},
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                )}
                {errand.errand_type === 1 && manageErrandClicked && (
                  <MenuOption
                    onSelect={() =>
                      navigation.navigate('ErrandUserDetails', {
                        errand,
                        userId,
                        singleSubErrand,
                        manageErrandClicked,
                        bids,
                      })
                    }
                    text="Details"
                    customStyles={{
                      optionWrapper: {
                        borderBottomWidth: 1,
                        borderBottomColor: '#AAAAAA',
                      },
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                )}

                {errand.status === 'completed' && (
                  <MenuOption
                    onSelect={() =>
                      navigation.navigate('ErrandUserDetails', {
                        errand,
                        userId,
                        singleSubErrand,
                        manageErrandClicked,
                        bids,
                      })
                    }
                    text="Details"
                    customStyles={{
                      optionWrapper: {
                        paddingVertical: 2,
                      },
                      optionText: {
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: '300',
                      },
                    }}
                  />
                )}
                {errand.status === 'cancelled' && (
                  <MenuOption
                    onSelect={() =>
                      navigation.navigate('ErrandUserDetails', {
                        errand,
                        userId,
                        singleSubErrand,
                        manageErrandClicked,
                        bids,
                      })
                    }
                    text="Details"
                    customStyles={{
                      optionWrapper: {
                        paddingVertical: 2,
                      },
                      optionText: {
                        fontSize: 14,
                        textAlign: 'center',
                        fontWeight: '300',
                      },
                    }}
                  />
                )}
                {/* <MenuOption
                  onSelect={() => {}}
                  text="Refresh"
                  customStyles={{
                        optionWrapper: {
                          paddingVertical: 2,
                        },
                        optionText: {
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: '300',
                        },
                      }}
                /> */}
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        </View>
      ),
    })
    getUserId()
    dispatch(currentUserDetails({ user_id: userId }))
  }, [user, errand, manageErrandClicked, singleSubErrand])

  return (
    <>
      {errand?.status === 'active' ||
      errand?.status === 'completed' ||
      (errand?.user_id === userId &&
        singleSubErrand?.status === 'active' &&
        manageErrandClicked) ||
      (singleSubErrand?.status === 'completed' && manageErrandClicked) ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          {/* sender's timeline */}
          <Timeline
            errand={errand}
            user_id={userId}
            singleSubErrand={singleSubErrand}
            loadingErrand={loadingErrand}
            setManageErrandClicked={setManageErrandClicked}
            toggleCompleteDialogue={toggleCompleteDialogue}
            toggleSuccessDialogue={toggleSuccessDialogue}
          />
        </KeyboardAvoidingView>
      ) : (errand?.user_id !== userId &&
          singleSubErrand?.status === 'active') ||
        (errand?.user_id !== userId &&
          singleSubErrand?.status === 'completed') ? (
        // runner's timeline
        <Timeline
          errand={errand}
          user_id={userId}
          singleSubErrand={singleSubErrand}
          loadingErrand={loadingErrand}
          setManageErrandClicked={setManageErrandClicked}
        />
      ) : (
        <BottomSheetModalProvider>
          <ScrollView className="px-3">
            {/* // errand details and bid screen */}
            <View>
              <BidWrapper
                errand={errand}
                userId={userId}
                navigation={navigation}
                toggleNegotiateModal={toggleNegotiateModal}
                toggleSuccessDialogue={toggleSuccessDialogue}
                singleSubErrand={subErrand}
                setManageErrandClicked={setManageErrandClicked}
                setSubErrand={setSubErrand}
                loadingErrand={loadingErrand}
              />
              {/* )} */}
            </View>

            {/* success Dialogue */}
            <BottomSheetModal
              ref={successDialogueRef}
              index={0}
              snapPoints={successPoints}
            >
              <SuccessDialogue
                toggleSuccessDialogue={toggleSuccessDialogue}
                toggleNegotiateModal={toggleNegotiateModal}
              />
            </BottomSheetModal>

            {/* completed Errand */}
          </ScrollView>
        </BottomSheetModalProvider>
      )}
    </>
  )
}

export default MyErrandInfo
