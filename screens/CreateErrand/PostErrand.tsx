import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import Button from '../../components/Button'
import { createErrand } from '../../services/errands/createErrand'
import { getDraftErrand } from '../../services/errands/getDraftErrand'
import { RootState, useAppDispatch } from '../../services/store'
import {
  CreateErrandRequest,
  Location as LocationType,
  PostErrandData,
} from '../../types'
import { parseAmount } from '../../utils/helper'
import CreateErrandFinance from './CreateFinance'
import CreateErrandDetails from './CreateTasks'
import CreateErrandLocation from './ErrandLocation'
import ErrandReview from './ErrandReview'
import Categories from './PostErrand1'

const PostErrand = ({ navigation }: any) => {
  const [activeStep, setActiveStep] = useState(1)
  const [selectedItem, setSelectedItem] = useState('')
  const [categoryType, setCategoryType] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [detailError, setDetailError] = useState({
    desc: '',
    value: '',
  })
  const dispatch = useAppDispatch()
  const [_errandId, setErrandId] = useState('')
  const [location, setLocation] = useState<null | LocationType>(null)
  const [pickup, setPickup] = useState<null | LocationType>(null)
  const [delivery, setDelivery] = useState<null | LocationType>(null)
  const [pickupStr, setPickupStr] = useState('')
  const [delAddStr, setDelAddStr] = useState('')
  const [pickupText, setPickupText] = useState('')
  const [dropoffText, setDropoffText] = useState('')

  const [curLocationStr, setCurLocationStr] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [audio, setAudio] = useState('')
  const [files, setFiles] = useState<any>()

  const [financeError, setFinanceError] = useState('')

  const { loading: creatingErrand } = useSelector(
    (state: RootState) => state.createErrandReducer,
  )

  const [postErrandData, setPostErrandData] = useState<PostErrandData>({
    errandType: 'single',
    description: '',
    categoryId: '',
    categoryName: '',
    type: '',
    del_add_str: '',
    cur_add_str: '',
    pickup_add_str: '',
    pickup_lat: '',
    pickup_lng: '',
    dropoff_lat: '',
    dropoff_lng: '',
    budget: 0,
    audio: '',
    images: [],
    dur_value: 'days',
    dur_period: 1,
    res_by_qualification: 'No',
    res_by_verification: 'No',
    cur_loc: '',
    del_add: '',
    google_add: '',
    ins_amount: 0.0,
    insurance: '',
    pickup_add: '',
    pickup_text: '',
    dropoff_text: '',
  })

  const handleInputChange = (text: any, input: any) => {
    console.log('>>>input', text)

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
      // images: uploadedFiles,
    })

    setActiveStep(activeStep + 1)
  }

  const locationHandler = () => {
    // setPostErrandData({
    //   ...postErrandData,
    //   pickup_lat: pickup?.lat,
    //   pickup_lng: pickup?.lat,
    //   dropoff_lat: delivery?.lat,
    //   dropoff_lng: delivery?.lng,
    //   cur_add_str: curLocationStr,
    //   pickup_add_str: pickupStr,
    //   pickup_text: pickupText,
    //   dropoff_text: dropoffText,
    //   del_add_str: delAddStr || '',
    // })
    console.log('>>>>>>postErrandData', postErrandData)

    setActiveStep(activeStep + 1)
  }

  const financeHandler = () => {
    // if (!postErrandData.budget) {
    //   setFinanceError('Budget is required')
    //   return
    // }
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
      cur_loc,
      del_add,
    } = postErrandData

    const data: CreateErrandRequest = {
      errand_type: errandType,
      description,
      duration: { period: dur_value, value: Number(dur_period) },
      images: [],
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
      pickup_text: cur_loc,
      dropoff_text: del_add,
      dispatch,
    }

    dispatch(createErrand({ ...data }))
  }

  const getErrandId = async () => {
    const errandId = await AsyncStorage.getItem('errandId') || ''
    setErrandId(errandId)
  }

  useEffect(() => {
    dispatch(getDraftErrand())

  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Errand',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Errands')}
          className="pl-3"
        >
          <AntDesign name="arrowleft" size={24} color="#243763" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-3 "></View>
      ),
    })
  }, [])

  const showComponent = () => {
    if (activeStep === 1) {
      return (
        <Categories
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          setCategoryType={setCategoryType}
          setCategoryName={setCategoryName}
        />
      )
    }
    if (activeStep === 2) {
      return (
        <CreateErrandDetails
          postErrandData={postErrandData}
          handleInputChange={handleInputChange}
          setActiveStep={setActiveStep}
        />
      )
    }
    if (activeStep === 3) {
      return (
        <CreateErrandLocation
          postErrandData={postErrandData}
          handleInputChange={handleInputChange}
          setActiveStep={setActiveStep}
        />
      )
    }
    if (activeStep === 4) {
      return (
        <CreateErrandFinance
          postErrandData={postErrandData}
          handleInputChange={handleInputChange}
          setActiveStep={setActiveStep}
        />
      )
    } else {
      return (
        <ErrandReview
          postErrandData={postErrandData}
          setActiveStep={setActiveStep}
        />
      )
    }
  }

  return (
    <ScrollView className="bg-white">
      {showComponent()}

      <View className="flex-row justify-center items-center mt-10 px-6 pb-6">
        {/* {activeStep > 1 && (
          <Button
            child="Previous Page"
            className="bg-[#243763] w-20 flex justify-center items-center py-2 rounded-lg "
            onPress={() => setActiveStep(activeStep - 1)}
          />
        )} */}
        {creatingErrand ? (
          <ActivityIndicator size="large" color="blue" />
        ) : (
          <Button
            child={
              activeStep >= 5
                ? 'Submit'
                : ` Proceed to Errand ${steps[activeStep]}`
            }
            className="bg-[#243763] flex justify-center items-center rounded-lg p-3 "
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
          />
        )}
      </View>
    </ScrollView>
  )
}

export default PostErrand
