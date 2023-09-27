import { View, Text, ScrollView, SafeAreaView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Switch } from 'react-native-gesture-handler'

const SettingsTest = () => {
  const [newErrands, setNewErrands] = useState(false)
  const [errandsInArea, setErrandsInArea] = useState(false)
  const [bidsOnErrand, setBidsOnErrand] = useState(false)
  const [errandStatus, setErrandStatus] = useState(false)
  const [accountUpdate, setAccountUpdate] = useState(false)
  const [newsletter, setNewsletter] = useState(false)
  const [promotions, setPromotions] = useState(false)
  const [adverts, setAdverts] = useState(false)

  const handleNewErrands = () => {
    setNewErrands(!newErrands)
  }

  const handleErrandsInArea = () => {
    setErrandsInArea(!errandsInArea)
  }

  const handleBidsOnErrand = () => {
    setBidsOnErrand(!bidsOnErrand)
  }

  const handleErrandStatus = () => {
    setErrandStatus(!errandStatus)
  }

  const handleAccountUpdate = () => {
    setAccountUpdate(!accountUpdate)
  }

  const handleNewsLetter = () => {
    setNewsletter(!newsletter)
  }
  const handleAdverts = () => {
    setAdverts(!adverts)
  }

  const handlePromotion = () => {
    setPromotions(!promotions)
  }

  return (
    <ScrollView>
      <View className="mt-6 ml-4 ">
        <Text className=" text-base font-bold leading-6">
          GENERAL NOTIFICATIONS
        </Text>
        <Text className="text-[14px] font-md">
          Notifications on all general activities on Swave
        </Text>
      </View>

      <View className=" bg-[#ECF0F8] mt-5 rounded-lg pb-4">
        <View className=" h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-base">
              Account Update Notification
            </Text>
            <TouchableWithoutFeedback onPress={handleAccountUpdate}>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                value={accountUpdate}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-sm font-light">
            You will be notified when an update is available
          </Text>
        </View>

        <View className=" h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-base">
              Newsletters and offers
            </Text>
            <TouchableWithoutFeedback onPress={handleNewsLetter}>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                value={newsletter}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-sm font-light">
            Be in the know when we publish any information
          </Text>
        </View>

        <View className=" h-[63px] ml-4 mt-5  border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-base ">
              Promotions and adverts
            </Text>
            <TouchableWithoutFeedback onPress={handlePromotion}>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor="grey"
                // onValueChange={toggleSwitch}
                value={promotions}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>

        {/* <View className=" w-[360px] h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <TouchableWithoutFeedback onPress={handleAdverts}>
              <Text className="font-medium text-[18px]">
                Promotions and adverts
              </Text>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor="green"
                // onValueChange={toggleSwitch}
                value={adverts}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-[14px]">
            Stay informed about our amazing offers
          </Text>
        </View> */}
      </View>

      <View className="mt-8 ml-4">
        <Text className="pb-2 text-base font-bold leading-6">
          ERRAND NOTIFICATIONS
        </Text>
        <Text className="text-[14px]">
          Errands and bids specific notifications
        </Text>
      </View>

      <View className=" bg-[#ECF0F8] mt-5 rounded-md pb-4">
        <View className=" h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-base">
              New errands in your category interest
            </Text>
            <TouchableWithoutFeedback onPress={handleNewErrands}>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor={!newErrands ? 'green' : 'grey'}
                // onValueChange={toggleSwitch}
                value={newErrands}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-sm font-light">
            You will be notified when an update is available
          </Text>
        </View>

        <View className="h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-base">
              Errands within your area
            </Text>
            <TouchableWithoutFeedback onPress={handleErrandsInArea}>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor={!errandsInArea ? 'green' : 'grey'}
                // onValueChange={toggleSwitch}
                value={errandsInArea}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-sm font-light">
            Be in the know when we publish any information
          </Text>
        </View>

        <View className="  h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text className="font-medium text-base">
              Bids on your errands
            </Text>
            <TouchableWithoutFeedback onPress={handleBidsOnErrand}>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor={!bidsOnErrand ? 'green' : 'grey'}
                // onValueChange={toggleSwitch}
                value={bidsOnErrand}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>



        <View className='h-[63px] ml-4 mt-5 border-b-[#AAAAAA]'>
            <View className='flex-row items-center justify-between'>
                <Text className='font-medium text-base'>Errand status updates</Text>
                <TouchableOpacity onPress={handleErrandStatus}>
                <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                // thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                // ios_backgroundColor={!errandStatus ? 'grey' : 'green'}
                value={errandStatus}
                // onValueChange={toggleSwitch}
                // value={isEnabled}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
              </TouchableOpacity>
        
            </View>
            <Text className='text-sm font-light'>Stay informed about our amazing offers</Text>     
        </View>
      </View>
    </ScrollView>
  )
}

export default SettingsTest
