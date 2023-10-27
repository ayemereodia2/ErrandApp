import { Entypo, Ionicons } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import PinModal from '../../components/VerificationModals/PinModal'
import { createErrand } from '../../services/errands/createErrand'
import { getDraftErrand } from '../../services/errands/getDraftErrand'
import { RootState, useAppDispatch } from '../../services/store'
import { CreateErrandRequest, PostErrandData } from '../../types'
import { parseAmount } from '../../utils/helper'
import Category from './Category'
import Details from './Details'
import Finance from './Finance'
import Location from './Location'
import Review from './Review'

const PostErrand = ({ navigation }: any) => {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedItem, setSelectedItem] = useState('')
  const [categoryType, setCategoryType] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [detailError, setDetailError] = useState({
    desc: '',
    value: '',
  })
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['40%'], [])

  function openPinModal() {
    bottomSheetRef.current?.present()
  }

  function closePinModal() {
    bottomSheetRef.current?.dismiss()
  }

  const renderBackdrop = useCallback(
    (props) => (
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

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const successDialogueRef = useRef<BottomSheetModal>(null)

  const fundWalletRef = useRef<BottomSheetModal>(null)
  function toggleFundWalletModal(open: boolean) {
    open ? fundWalletRef.current?.present() : fundWalletRef.current?.dismiss()
  }

  function toggleSuccessDialogue(open: boolean) {
    open
      ? successDialogueRef.current?.present()
      : successDialogueRef.current?.dismiss()
  }
  const dispatch = useAppDispatch()
  const [_errandId, setErrandId] = useState('')
  const [currentLocation, setCurrentLocation] = useState<string>('')
  const [deliveryAddress, setDeliveryAddress] = useState<string>('')

  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [audio, setAudio] = useState('')
  const [files, setFiles] = useState<any>()

  const [financeError, setFinanceError] = useState('')

  const { loading: creatingErrand } = useSelector(
    (state: RootState) => state.createErrandReducer,
  )

  const { data: images, loading: uploadingImages } = useSelector(
    (state: RootState) => state.postFilesReducer,
  )

  // console.log(">>>>>>images", images);

  const [postErrandData, setPostErrandData] = useState<PostErrandData>({
    errandType: 'One Person',
    description: '',
    categoryId: '',
    categoryName: '',
    deliveryAddress: '',
    currentLocation: '',
    type: '',
    budget: 0,
    audio: '',
    images: [],
    dur_value: '1',
    dur_period: 'Today',
    res_by_qualification: 'No',
    res_by_verification: 'No',
    ins_amount: 0.0,
    insurance: '',
  })

  const handleInputChange = (text: any, input: any) => {
    setPostErrandData((prevState) => ({ ...prevState, [input]: text }))
  }

  const steps: string[] = [
    'Category',
    'Details',
    'Location',
    'Finance',
    'Reviews',
  ]

  const categoryHandler = () => {
    console.log('>>>>>Ok')

    setPostErrandData({
      ...postErrandData,
      categoryId: selectedItem,
      categoryName,
      type: categoryType,
    })

    setActiveStep(activeStep + 1)
  }

  const detailHandler = () => {
    // if (!postErrandData?.description) {
    //   setDetailError({
    //     desc: 'description is required',
    //     value: detailError.value,
    //   })
    //   return
    // }
    // if (!postErrandData?.dur_period || !postErrandData?.dur_value) {
    //   return setDetailError({
    //     desc: '',
    //     value: 'duration value and period is required',
    //   })
    // }

    console.log('>>>>>>postErrandData', postErrandData)

    setPostErrandData({
      ...postErrandData,
      categoryName,
      type: categoryType,
      // audio,
      images: uploadedFiles,
    })

    setActiveStep(activeStep + 1)
  }

  const locationHandler = () => {
    setPostErrandData({
      ...postErrandData,
      currentLocation,
      deliveryAddress,
    })
    console.log('>>>>>>postErrandData', postErrandData)

    setActiveStep(activeStep + 1)
  }

  const financeHandler = () => {
    if (!postErrandData.budget) {
      setFinanceError('Budget is required')
      return
    }
    setPostErrandData({
      ...postErrandData,
    })
    console.log('>>>>>>postErrandData', postErrandData)
    setActiveStep(activeStep + 1)
  }

  const submitErrandhandler = () => {
    // const errandId = localStorage.getItem('errandId') || ''
    const {
      description,
      dur_period,
      dur_value,
      categoryId,
      audio,
      budget,
      type,
      ins_amount,
      insurance,
      res_by_qualification,
      res_by_verification,
      errandType,
      currentLocation,
      deliveryAddress,
    } = postErrandData

    const duration =
      dur_period === 'Today'
        ? 1
        : 'One to three days'
        ? 3
        : "It doesn't matter"
        ? 10
        : 'Specify'
        ? Number(dur_value)
        : 1

    const period =
      dur_period === 'specify'
        ? 'days'
        : dur_value === 'Day(s)'
        ? 'days'
        : 'Week(s)'
        ? 'weeks'
        : 'Hour(s)'
        ? 'hours'
        : 'days'

    const _errand = errandType === 'One Person' ? 'single' : 'multi'

    const data: CreateErrandRequest = {
      errand_type: _errand,
      description,
      duration: { period, value: Number(duration) },
      images: images,
      restriction: res_by_qualification ? 'qualification' : 'verification',
      // pickup_location: { lat: picpkup?.lat, lng: pickup?.lng },
      // dropoff_location: { lat: delivery?.lat, lng: delivery?.lng },
      pickup_location: { lat: 0, lng: 0 },
      dropoff_location: { lat: 0, lng: 0 },
      budget: parseAmount(budget.toString()) * 100,
      type,
      category: categoryId,
      audio: '',
      errandId: _errandId,
      navigation,
      Toast,
      has_insurance: insurance === 'Yes' ? true : false,
      insurance_amount: parseAmount(ins_amount.toString()) * 100,
      pickup_text: currentLocation,
      dropoff_text: deliveryAddress,
      dispatch,
    }

    console.log('>>>>>data errand', data)

    dispatch(createErrand({ ...data }))
  }

  const getErrandId = async () => {
    const errandId = (await AsyncStorage.getItem('errandId')) || ''
    setErrandId(errandId)
  }

  useEffect(() => {
    dispatch(getDraftErrand())
  }, [])

  // useEffect(() => {
  //   navigation
  //     .getParent()
  //     ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false })
  //   return () =>
  //     navigation
  //       .getParent()
  //       ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined })
  // }, [navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Errand',
      headerTitleStyle: { color: textTheme },
      headerStyle: { backgroundColor: backgroundTheme },
      headerLeft: () => <></>,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('MarketTab')}
          className="pr-3"
        >
          <Ionicons color={textTheme} name="close" size={24} />
        </TouchableOpacity>
      ),
    })
  }, [])

  const showComponent = () => {
    if (activeStep === 1) {
      return (
        <Category
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setCategoryType={setCategoryType}
          setCategoryName={setCategoryName}
        />
      )
    }
    if (activeStep === 2) {
      return (
        <Details
          postErrandData={postErrandData}
          handleInputChange={handleInputChange}
          setActiveStep={setActiveStep}
          uploadedFiles={uploadedFiles}
          setUploadedFiles={setUploadedFiles}
          audio={audio}
          setAudio={setAudio}
        />
      )
    }
    if (activeStep === 3) {
      return (
        <Location
          postErrandData={postErrandData}
          handleInputChange={handleInputChange}
          setActiveStep={setActiveStep}
          setDeliveryAddress={setDeliveryAddress}
          setCurrentLocation={setCurrentLocation}
        />
      )
    }
    if (activeStep === 4) {
      return (
        <Finance
          postErrandData={postErrandData}
          handleInputChange={handleInputChange}
          setActiveStep={setActiveStep}
          toggleFundWalletModal={toggleFundWalletModal}
          navigation={navigation}
        />
      )
    } else {
      return (
        <Review postErrandData={postErrandData} setActiveStep={setActiveStep} />
      )
    }
  }

  return (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          contentContainerStyle={{
            flexGrow: 1,
            marginBottom: 5,
            height: '80%',
          }}
          style={{
            backgroundColor: theme ? '#152955' : 'white',
          }}
          className="bg-white"
        >
          {showComponent()}
        </ScrollView>

        <View className="flex-row">
          <View style={{ height: 60, backgroundColor:'#2856c1' }}>
            {activeStep > 1 && (
              <TouchableOpacity
                onPress={() => setActiveStep(activeStep - 1)}
                className=" px-6 flex justify-center items-center py-2 mt-2"
              >
                <Entypo name="arrow-with-circle-left" color="white" size={30} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log('man')
              activeStep <= 1
                ? categoryHandler()
                : activeStep <= 2
                ? detailHandler()
                : activeStep <= 3
                ? locationHandler()
                : activeStep <= 4
                ? financeHandler()
                : submitErrandhandler()
            }}
            style={{ backgroundColor: '#1E3A79', height: 60 }}
            className={activeStep <= 1 ? "flex-row items-center justify-center  w-full" :'flex-row items-center justify-center  w-[80%]'}
          >
            {creatingErrand ? (
              <ActivityIndicator size="large" color="blue" />
            ) : (
              <Text
                className="text-white text-center  rounded-lg text-lg"
                onPress={() => {
                  console.log('man')

                  activeStep <= 1
                    ? categoryHandler()
                    : activeStep <= 2
                    ? detailHandler()
                    : activeStep <= 3
                    ? locationHandler()
                    : activeStep <= 4
                    ? financeHandler()
                    : openPinModal()
                }}
              >
                {activeStep >= 5
                  ? 'Create Your Errand'
                  : ` Proceed to Errand ${steps[activeStep]}`}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        containerStyle={{
          marginHorizontal: 10,
        }}
        backdropComponent={renderBackdrop}
      >
        <PinModal
          createErrand={true}
          submitErrandhandler={submitErrandhandler}
          closePinModal={closePinModal}
          verifyPin={true}
          makeWithdrawalHandler={() => {}}
        />
      </BottomSheetModal>
    </BottomSheetModalProvider>
  )
}

export default PostErrand
