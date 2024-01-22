import { FontAwesome, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { ImageBackground, Platform, Pressable, Text, TouchableOpacity, View } from 'react-native'
// import DatePicker from 'react-native-community/datetimepicker';
import DateTimePicker from '@react-native-community/datetimepicker'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { ActivityIndicator } from 'react-native-paper'
import { _fetch } from '../../services/axios/http'
import { Transaction } from '../../types'
import { transformDateTime } from '../../utils/helper'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
const balanceLayer = '../../assets/images/balance-bg.png'


const AccountStatement = () => {

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false


  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [startDate, setStartDate] = useState(new Date('2023-04-1'))
  const [endDate, setEndDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [pdfUri, setPdfUri] = useState('')
  const [currentWalletAmount, setCurrentWalletAmount] = useState(0)
  const [showBalance, setShowBalance] = useState(true)




  const { data, loading: detailsLoading } = useSelector(
    (state: RootState) => state.walletActionReducer,
  )

  const navigation = useNavigation()

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status === 'granted') {
      // Permission granted, proceed with creating the asset
      return true
    } else {
      // Handle permission denial
      return false
    }
  }

  const generatePDF = async (transactions: Transaction[]) => {
    const tableContent = `
      <table border="1" style="width: 100%">
        <tr>
          <th>TYPE</th>
          <th>DESCRIPTION</th>
          <th>AMOUNT</th>
          <th>DATE CREATED</th>
        </tr>
        ${transactions
          .map(
            (item) =>
              `<tr><td>${item.transaction_type}</td><td>${item.description}</td><td>${item.amount}</td><td>${item.created_at}</td></tr>`,
          )
          .join('')}
      </table>
    `

    try {
      const { uri } = await Print.printToFileAsync({ html: tableContent })

      if (Platform.OS === 'ios') {
        await Sharing.shareAsync(uri)
      } else {
        const permission = await MediaLibrary.requestPermissionsAsync()
        if (permission.granted) {
          await MediaLibrary.createAssetAsync(uri)
        }
      }
    } catch (error) {
    }
  }

  const downloadPDF = () => {
    // if (pdfUri) {
    //   // Use Linking to open a download prompt for the PDF
    //   Linking.openURL(pdfUri)
    // }

    FileSystem.downloadAsync(
      pdfUri,
      FileSystem.documentDirectory + 'sample.pdf',
    )
      .then(({ uri }) => {
        // this.share(uri)
      })
      .catch((error) => {
      })
  }

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate
    setShowStartDatePicker(false)
    setStartDate(currentDate)
  }

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate
    setShowEndDatePicker(false)
    setEndDate(currentDate)
  }

  const getTransactions = async () => {
    setLoading(true)

    try {
      let url = '/user/transactions'
      if (startDate !== null && endDate !== null) {
        url += `?start_date=${transformDateTime(
          startDate,
        )}&end_date=${transformDateTime(endDate)}`
      }
      const rs = await _fetch({
        method: 'GET',
        _url: url,
      })

      const res = await rs.json()
      setTransactions(res.data)
      // generatePDF(res.data)
      setLoading(false)
    } catch (err) {
      if (err instanceof Error) {
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getTransactions()
  }, [startDate, endDate])

  return (
    // <View style={{backgroundColor: backgroundTheme}} className='h-screen'>
    //   <Text className="text-base font-md text-center mt-2" style={{color: textTheme}}>
    //     Generate Account Statement
    //   </Text>
    //   <>
    //     <View className="bg-[#fff] mt-6 rounded-md flex-row justify-center items-center space-x-4" style={{backgroundColor: backgroundTheme}}>
    //       <View className="h-20">
    //         <Pressable
    //           onPress={() => setShowStartDatePicker(true)}
    //           className="text-center flex-row items-center space-x-1 "
    //         >
    //           <FontAwesome
    //             className="mr-2"
    //             name="calendar"
    //             size={20}
    //             color={textTheme}
    //           />
    //           <Text className="" style={{color: textTheme}}>Choose Start Date</Text>
    //         </Pressable>
    //         <View className="pt-2">
    //           <Text style={{color: textTheme}}> {startDate.toDateString()}</Text>
    //           {showStartDatePicker && (
    //             <DateTimePicker
    //               value={startDate}
    //               mode="date"
    //               display="default"
    //               onChange={onStartDateChange}
    //             />
    //           )}
    //         </View>
    //       </View>
    //       <Text style={{color: textTheme}}>--</Text>
    //       <View className="h-20">
    //         <Pressable
    //           onPress={() => setShowEndDatePicker(true)}
    //           className="text-center flex-row items-center space-x-1 "
    //         >
    //           <FontAwesome name="calendar" size={20} color="black" />
    //           <Text style={{color: textTheme}}>Choose End Date</Text>
    //         </Pressable>
    //         <View className="pt-2">
    //           <Text style={{color: textTheme}}>{endDate.toDateString()}</Text>
    //           {showEndDatePicker && (
    //             <DateTimePicker
    //               value={endDate}
    //               mode="date"
    //               display="default"
    //               onChange={onEndDateChange}
    //             />
    //           )}
    //         </View>
    //       </View>
    //     </View>

    //     <TouchableOpacity
    //       className="bg-[#1E3A79] w-[210px] h-10 items-center justify-center rounded-md mx-auto mt-4"
    //       onPress={() => generatePDF(transactions)}
    //     >
    //       <Text className="text-white text-center font-medium">
    //         {loading ? (
    //           <>
    //             <ActivityIndicator size="small" color="white" />
    //           </>
    //         ) : (
    //           'Download Statement'
    //         )}
    //       </Text>
    //     </TouchableOpacity>
    //   </>
    // </View>
    <>
          <View className='relatvie mb-48'>

      <View className='w-screen h-[196px] bg-[#09497D] px-4' style={{borderBottomRightRadius: 20, borderBottomLeftRadius: 20}}>

        <View className='flex-row items-center justify-between ml-1 mt-[60px] mb-5'>
          <View className='flex-row items-center'>
          <TouchableOpacity
          className=" items-center justify-between mr-3 py-3 "
          onPress={() => navigation.goBack()}
        >
      <Ionicons name="chevron-back-outline" size={24} color="white" />
         </TouchableOpacity>
          <Text className='text-white text-[20px]' style={{fontFamily: 'Chillax'}}>Create Account Statement</Text>

          </View>

          <View className='flex-row items-center'>
          <TouchableOpacity
            // onPress={
            //   // navigation.navigate('Contact')
            //   // openMoreModal
            // }
          >
            <Text className='mr-2' style={{ color: textTheme }}>
            
            <Ionicons
            name="settings-outline"
            size={26}
            color={'white'}
            style={{ marginRight: 7 }}
          />
            </Text>
            </TouchableOpacity>

            <Text style={{ color: textTheme }} className='mr-1'>
            <FontAwesome
              name="bell-o"
              size={24}
              color={'white'}
              onPress={() => {
                navigation.navigate('Notification')
              }}
            />
          </Text>

          </View>
        </View>

      </View>

      <View className="pt-4 absolute w-screen top-[98px]">
      <View className="px-4">
        <ImageBackground
          source={{ uri: balanceLayer }}
          resizeMode="cover"
          style={{ flex: 1, justifyContent: 'center' }}
        >
          <View
            className="w-full  border mt-3 border-[#DAE1F1] rounded-xl mx-auto z-1 "
            style={{
              backgroundColor: theme ? backgroundTheme : 'white',
            }}
          >
            <ImageBackground source={require('../../assets/images/wallet3.png')}
        className=' bg-[#FFF] p-6 rounded-xl'
        resizeMode='repeat'>

            <View className="bg-[#FEE1CD] rounded-full h-[48px] w-[48px] justify-center items-center">
              <Text>
                <FontAwesome name="bank" size={24} color="#C85604" />
              </Text>
            </View>

            <Text
              className="mt-6 text-[#888] text-base font-medium leading-[24px]"
              style={{ color: 'black' }}
            >
              Account Balance
            </Text>

            <View className='flex-row items-center justify-between'>
            {showBalance ?
            <Text
            className="font-bold text-[32px] mt-2"
            style={{ color: theme ? 'black' : 'black' }}
          >
            {' '}
            ₦
            {Number(data?.balance) === 0
              ? '0.00'
              : (Number(data?.balance) / 100).toLocaleString()}
          </Text>
          :
          <Text className="font-bold text-[32px] mt-2">*********</Text>
        }
        

            <TouchableOpacity
                  onPress={() => setShowBalance(!showBalance)}
                  className=""
                >
                  <Icon
                    name={showBalance ? 'eye-slash' : 'eye'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                setCurrentWalletAmount(Number(data?.balance) / 100)
                navigation.navigate('FundWalletModal', {
                  currentWalletAmount
                })
              }}
              className="w-[200px] h-[44px] mt-5 items-center justify-center border border-[#314B87] rounded-lg"
            >
              <Text
                className="text-center text-base"
                style={{ color: 'black' }}
              >
                {' '}
                + <Text>Fund Wallet</Text>
              </Text>
            </TouchableOpacity>
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
      </View>

      </View>
      

      <View className='mx-4 mt-5'>
        <View>
        <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Input your preferred start date</Text>
        </View>

        <TouchableOpacity className='flex-row justify-between border border-[#96A0A5] rounded-lg p-4 items-center mt-2' onPress={() => setShowStartDatePicker(true)}>
        <Text style={{color: textTheme}}> { startDate ? startDate.toDateString() : 'Start Date'}</Text>
               {showStartDatePicker && (
                 <DateTimePicker
                   value={startDate}
                   mode="date"
                   display="default"
                   onChange={onStartDateChange}
                 />
               )}
        <Text
              
             
            >
              <FontAwesome
                 className="mr-1"
                name="calendar"
                size={20}
                color={textTheme}
              />
              
           </Text>
        </TouchableOpacity>

        <View>
        <Text className='text-[#393F42] mt-7' style={{fontFamily: 'Axiforma'}}>Input your preferred end date</Text>
        </View>

        <TouchableOpacity className='flex-row justify-between border border-[#96A0A5] rounded-lg p-4 items-center mt-2' onPress={() => setShowEndDatePicker(true)}>
        <Text style={{color: textTheme}}> { endDate ? endDate.toDateString() : 'End Date'}</Text>
               {showEndDatePicker && (
                 <DateTimePicker
                   value={endDate}
                   mode="date"
                   display="default"
                   onChange={onEndDateChange}
                 />
               )}
        <Text
              
             
            >
              <FontAwesome
                 className="mr-1"
                name="calendar"
                size={20}
                color={textTheme}
              />
              
           </Text>
        </TouchableOpacity>


        <TouchableOpacity
           className="bg-[#1E3A79] w-[300px] py-5 px-5 items-center justify-center rounded-md mx-auto mt-16"
           onPress={() => generatePDF(transactions)}
         >
           <Text className="text-white text-center font-medium">
             {loading ? (
               <>
                 <ActivityIndicator size="small" color="white" />
               </>
             ) : (
               'Generate Statement'
             )}
           </Text>
         </TouchableOpacity>
      
        
      </View>
    </>
  )
}

export default AccountStatement