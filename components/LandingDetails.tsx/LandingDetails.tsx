import { Entypo, EvilIcons, FontAwesome5 } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { externalUserDetails } from '../../services/auth/externalUserInfo'
import { _fetch } from '../../services/axios/http'
import { errandDetails } from '../../services/errands/errandDetails'
import { useAppDispatch } from '../../services/store'

const LandingDetails = ({ navigation, darkMode }: any) => {
  const dispatch = useAppDispatch()
  const getMarket = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/market?urgent=1`,
    })
    return await _rs.json()
  }

  const { isLoading, isSuccess, data, isError } = useQuery({
    queryKey: ['get-market'],
    queryFn: getMarket,
    refetchOnMount: 'always',
  })
  if (isSuccess) {
    console.log(data)
  }

  if (isLoading) {
    return (
      <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[100vh] mt-5">
        {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }

  return (
    <>
      {data
        ? data.data.map((errand: any) => (
            <SafeAreaView className="mb-10 mr-4" >
              <ScrollView horizontal>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('ErrandDetails', {
                      errand_id: errand?.id,
                      user_id: errand?.user_id,
                    })
                    dispatch(errandDetails({ errandId: errand?.id }))
                    dispatch(externalUserDetails({ user_id: errand?.user_id }))
                  }}
                  className="mt-4 pb-2 bg-[#fff] rounded-xl py-3 px-6 border"
                  style={{backgroundColor: darkMode ? '#1E3A79' : 'white', borderColor: darkMode ? '#e9ebbf2' : 'lightgrey'}}
                  
                  key={errand.errand_id}
                >
                  <View className=" flex-row items-start mt-4">
                    <View className="flex-row items-start justify-center gap-3">
                      <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
                        {errand?.user?.profile_picture ? (
                          <Image
                            style={{
                              width: 40,
                              height: 40,
                              resizeMode: 'contain',
                              borderRadius: 20,
                            }}
                            alt="okay"
                            source={{ uri: errand?.user?.profile_picture }}
                            // source={require(errand.user.profile_picture)}
                          />
                        ) : (
                          <Text className="uppercase text-lg items-center text-white">
                            {errand?.user?.first_name.charAt(0).toUpperCase()}
                            {errand?.user?.last_name.charAt(0).toUpperCase()}
                          </Text>
                        )}
                      </View>

                      <View>
                        <Text className="font-semibold text-[18px]" style={{color: darkMode ? 'white' : 'black'}}>
                          {errand?.user?.first_name} {errand?.user?.last_name}
                        </Text>

                        <View className="flex-row justify-between -mt-4">
                          <View className="w-60">
                            <Text className="text-[#000000] text-sm font-bold"></Text>
                            <View className="text-sm font-semibold flex-row items-center space-x-1">
                              <View>
                                <Text className="text-[14px] text-[#777777] font-medium">
                                  <Entypo
                                    name="star"
                                    size={16}
                                    color="#FBB955"
                                  />
                                  {errand?.user?.rating}
                                </Text>
                              </View>

                              <Text className="text-[#ccc] font-light text-2xl ">
                                |
                              </Text>
                              <View>
                                <Text className="text-[14px] text-[#777777] font-medium" style={{color: darkMode ? 'white' : 'black'}}>
                                  <FontAwesome5
                                    name="running"
                                    size={14}
                                    
                                  />{' '}
                                  {errand?.user?.errands_completed}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <Text className="text-[18px] font-medium py-4 pt-4" style={{color: darkMode ? 'white' : 'black'}}>
                    {errand?.description?.length >= 60
                      ? errand?.description?.substring(0, 50).concat('', '...')
                      : errand?.description}
                  </Text>

                  <Text className="text-sm font-light" style={{color: darkMode ? 'white' : '#666666'}}>
                    {' '}
                    <Text>
                      <EvilIcons name="location" size={14} color="green" />{' '}
                    </Text>
                    {errand.dropoff_address?.address_text ? (
                      errand.dropoff_address?.address_text
                    ) : (
                      <Text>No Location</Text>
                    )}
                  </Text>

                  <View className="flex-row items-center">
                    <View className=" rounded-3xl mt-2">
                      <Text className="font-medium text-sm inline-block"  style={{color: darkMode ? 'white' : 'black'}}>
                        {' '}
                        {errand?.category.name?.substring(0, 20)}
                      </Text>
                    </View>
                  </View>

                  <View className="h-[0.3px] bg-[#AAAAAA] mt-3 items-center"></View>

                  <View className="flex-row justify-between items-center mt-2">
                    <Text className="text-[20px] font-bold text-[#1E3A79]"  style={{color: darkMode ? 'white' : 'black'}}>
                      &#x20A6; {/* {budgetInNaira.toLocaleString()} */}{' '}
                      {(errand?.budget / 100).toLocaleString()}
                    </Text>
                    {/* <ProfileInitials firstName="Kzu" lastName="Soo" /> */}

                    <View className=" rounded-2xl py-2 px-2  items-center mt-2">
                      <Text className="text-orange-500 text-center text-[17px] mb-1 font-semibold"  style={{color: darkMode ? 'white' : 'black'}}>
                        {' '}
                        {errand?.total_bids === 0
                          ? ''
                          : errand?.total_bids}{' '}
                        {errand?.total_bids === 0
                          ? ''
                          : errand?.total_bids <= 1
                          ? 'Bid'
                          : 'Bids'}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </ScrollView>
            </SafeAreaView>
          ))
        : null}
    </>
  )
}

export default LandingDetails
