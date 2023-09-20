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
  TouchableOpacity,
  useWindowDimensions,
  View,
  ScrollView 
} from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useSelector } from 'react-redux'
import BidWrapper from '../../components/BidWrapper'
import { DetailHeader } from '../../components/DetailHeader'
import NegotiateBid from '../../components/Modals/Bids/Negotiate'
import { SuccessDialogue } from '../../components/Modals/Success/SuccessDialogue'
import Timeline from '../../components/Timeline'
import { RootState } from '../../services/store'
import { SingleSubErrand } from '../../types'

const MyErrandInfo = ({ navigation }: any) => {
  const [userId, setUserId] = useState('')
  const negotiateRef = useRef<BottomSheetModal>(null)
  const successDialogueRef = useRef<BottomSheetModal>(null)
  const acceptBidRef = useRef<BottomSheetModal>(null)

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

  const { data: user, loading } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const { data: errand, loading: loadingErrand } = useSelector(
    (state: RootState) => state.errandDetailsReducer,
  )

  const snapPoints = ['55%']
  const successPoints = ['30%']
  const acceptPoints = ['40%']

  function toggleNegotiateModal(open: boolean) {
    open ? negotiateRef.current?.present() : negotiateRef.current?.dismiss()
  }

  function toggleSuccessDialogue(open: boolean) {
    open
      ? successDialogueRef.current?.present()
      : successDialogueRef.current?.dismiss()
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
        <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
          <AntDesign name="arrowleft" size={24} color="#243763" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="pr-3">
          <TouchableOpacity onPress={() => {}}>
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
                    onSelect={() => alert(`Save`)}
                    text="Completed Errand"
                    customStyles={{
                      optionWrapper: {
                        // borderBottomWidth: 0.2,
                        borderBottomColor: '#AAAAAA',
                      },
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                )}
                <MenuOption
                  onSelect={() => alert(`Save`)}
                  text="Details"
                  customStyles={{
                    optionWrapper: {
                      // borderBottomWidth: 0.2,
                      borderBottomColor: '#AAAAAA',
                    },
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />
                <MenuOption
                  onSelect={() => alert(`Save`)}
                  text="Refresh"
                  customStyles={{
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        </View>
      ),
    })
    getUserId()
  }, [user, errand])

  return (
    <>
      {errand?.status === 'active' || errand?.status === 'completed' ? (
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
          <Timeline
            errand={errand}
            user_id={userId}
            singleSubErrand={subErrand}
            loadingErrand={loadingErrand}
          />
        </KeyboardAvoidingView>
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
              />
              {/* )} */}
            </View>
            {/* Negotiate bid modal */}
            <BottomSheetModal
              ref={negotiateRef}
              index={0}
              snapPoints={snapPoints}
            >
              <NegotiateBid
                bid={errand.bids[0]}
                owner={user}
                errand={errand}
                navigation={navigation}
                user_id={userId}
                toggleNegotiateModal={toggleNegotiateModal}
                toggleSuccessDialogue={toggleSuccessDialogue}
              />
            </BottomSheetModal>

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
          </ScrollView>
        </BottomSheetModalProvider>
      )}
    </>
  )
}

export default MyErrandInfo
