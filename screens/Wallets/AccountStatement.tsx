import { FontAwesome } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Platform, Pressable, Text, TouchableOpacity, View } from 'react-native'
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

const AccountStatement = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [startDate, setStartDate] = useState(new Date('2023-04-1'))
  const [endDate, setEndDate] = useState(new Date())
  const [loading, setLoading] = useState(true)
  const [pdfUri, setPdfUri] = useState('')

  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync()
    if (status === 'granted') {
      // Permission granted, proceed with creating the asset
      return true
    } else {
      // Handle permission denial
      console.error('Permission not granted')
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
      console.error(error)
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
        console.log('Finished downloading to ', uri)
        // this.share(uri)
      })
      .catch((error) => {
        console.error(error)
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
    <View>
      <Text className="text-base font-md text-center mt-2">
        Generate Account Statement
      </Text>
      <>
        <View className="bg-[#fff] mt-6 rounded-md flex-row justify-center items-center space-x-4">
          <View className="h-20">
            <Pressable
              onPress={() => setShowStartDatePicker(true)}
              className="text-center flex-row items-center space-x-1 "
            >
              <FontAwesome
                className="mr-2"
                name="calendar"
                size={20}
                color="black"
              />
              <Text className="">Choose Start Date</Text>
            </Pressable>
            <View className="pt-2">
              <Text> {startDate.toDateString()}</Text>
              {showStartDatePicker && (
                <DateTimePicker
                  value={startDate}
                  mode="date"
                  display="default"
                  onChange={onStartDateChange}
                />
              )}
            </View>
          </View>
          <Text>--</Text>
          <View className="h-20">
            <Pressable
              onPress={() => setShowEndDatePicker(true)}
              className="text-center flex-row items-center space-x-1 "
            >
              <FontAwesome name="calendar" size={20} color="black" />
              <Text>Choose End Date</Text>
            </Pressable>
            <View className="pt-2">
              <Text>{endDate.toDateString()}</Text>
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="default"
                  onChange={onEndDateChange}
                />
              )}
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#1E3A79] w-[210px] h-10 items-center justify-center rounded-md mx-auto mt-4"
          onPress={() => generatePDF(transactions)}
        >
          <Text className="text-white text-center font-medium">
            {loading ? (
              <>
                <ActivityIndicator size="small" color="white" />
              </>
            ) : (
              'Download Statement'
            )}
          </Text>
        </TouchableOpacity>
      </>
    </View>
  )
}

export default AccountStatement
