import { Entypo, Ionicons } from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
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
    errandType: 'single',
    description: '',
    categoryId: '',
    categoryName: '',
    deliveryAddress: '',
    currentLocation: '',
    type: '',
    budget: 0,
    audio: '',
    images: [],
    dur_value: '',
    dur_period: 1,
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

    const data: CreateErrandRequest = {
      errand_type: errandType,
      description,
      duration: { period: dur_value, value: Number(dur_period) },
      images: images,
      restriction: res_by_qualification ? 'qualification' : 'verification',
      // pickup_location: { lat: pickup?.lat, lng: pickup?.lng },
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

  useEffect(() => {
    navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false })
    return () =>
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined })
  }, [navigation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Errand',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('MarketTab')}
          className="pr-3"
        >
          <Ionicons name="close" size={24} />
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
          audios={audio}
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
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginBottom: 20,
          height: '80%',
        }}
        className="bg-white"
      >
        {showComponent()}
      </ScrollView>

      <View
        style={{ backgroundColor: '#1E3A79', height: 80 }}
        className="flex-row"
      >
        {activeStep > 1 && (
          <TouchableOpacity
            onPress={() => setActiveStep(activeStep - 1)}
            className="bg-[#2856c1] px-6 flex justify-center items-center py-2 "
          >
            <Entypo name="arrow-with-circle-left" color={'white'} size={30} />
          </TouchableOpacity>
        )}
        <View
          className={
            activeStep > 1
              ? 'pl-10 flex-row justify-center  items-center pt-5 pb-6'
              : 'flex-row justify-center w-full items-center pt-5 pb-6'
          }
        >
          {creatingErrand ? (
            <ActivityIndicator size="large" color="blue" />
          ) : (
            <TouchableOpacity
              onPress={() => {
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
              style={{ backgroundColor: '#1E3A79' }}
              className="flex-row justify-end"
            >
              <Text
                className="text-white  rounded-lg text-lg"
                onPress={() => {
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
              >
                {activeStep >= 5
                  ? 'Submit'
                  : ` Proceed to Errand ${steps[activeStep]}`}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* <BottomSheetModal ref={fundWalletRef} index={0} snapPoints={['50%']}>
          <FundWalletModal toggleFundWalletModal={toggleFundWalletModal} />
        </BottomSheetModal> */}
    </View>
  )
}

export default PostErrand
