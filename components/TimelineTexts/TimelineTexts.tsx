import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import { MarketData, SingleSubErrand } from '../../types'
import { formatDate, getUserId } from '../../utils/helper'

interface Props {
  errand: MarketData
  user_id: string
  loadingErrand?: boolean
  setOpenPostRequestModal?: any
  setOpenUpdateBidModal?: any
  setOpenRequestUpdateModal?: any
  singleSubErrand: SingleSubErrand | null
  manageErrandClicked?: boolean
  setManageErrandClicked?: any
}

const TimelineInfo = ({
  user_id,
  errand,
  loadingErrand,
  singleSubErrand,
  manageErrandClicked,
  setManageErrandClicked,
}: Props) => {
  const [firstName, setFirstName] = useState('')

  // console.log(">>>>>.manageErrandClicked", manageErrandClicked, singleSubErrand?.status, errand?.status);
  

  useEffect(() => {
    // setUser(localStorage.getItem('first_name') || '')
    getUserId({ setFirstName })
  }, [])

  const user = firstName

  return (
    <>
      {loadingErrand ? (
        <ActivityIndicator />
      ) : (
        <View className="w-full rounded-10 bg-[#FEE1CD] border-1 border-[#C85604] text-sm flex-row justify-center items-center p-4 mb-2">
          <>
            {manageErrandClicked && (
              <TouchableOpacity
                onPress={() => setManageErrandClicked(false)}
                className="cursor-pointer pr-3"
              >
                <AntDesign name="arrowleft" size={24} color="black"  />
              </TouchableOpacity>
            )}
            <View
              className={`flex-row space-x-2 w-3/3 ${
                errand.status === 'completed' &&
                'items-center px-2 w-full rounded-lg'
              }`}
            >
              {errand.status === 'completed' ? (
                <Ionicons name="checkmark-circle" color="green" size={20} className="text-green-600" />
              ) : null}
              <Text className="text-xs font-medium capitalize">
                {
                  // for the sender
                  !manageErrandClicked &&
                    user_id === errand.user_id &&
                    errand.status === 'open' &&
                    `Hey ${user}, Here are the bids on your errand, go through them and decide`
                }
                {
                  // for the sender
                  user_id === errand.user_id &&
                    errand.status === 'pending' &&
                    `Hey ${user}, Here are the bids on your errand, go through them and decide`
                }

                {
                  // runner
                  user_id !== errand.user_id &&
                    errand.status === 'open' &&
                    singleSubErrand?.status !== 'active' &&
                    singleSubErrand?.status !== 'completed' &&
                    singleSubErrand?.status !== 'cancelled' &&
                    `Hey ${user}, Here is your bid history with the sender of this errand`
                }
                {
                  // runner
                  (user_id !== errand.user_id &&
                    errand.status === 'cancelled') ||
                    (user_id !== errand.user_id &&
                      singleSubErrand?.status === 'cancelled' &&
                      `Hey ${user}, this errand was cancelled by the sender`)
                }
                {
                  // sender
                  user_id === errand.user_id &&
                    errand.status === 'cancelled' &&
                    `Hey ${user}, you cancelled this errand`
                }
                {
                  // runner
                  user_id !== errand.user_id &&
                    errand.status === 'pending' &&
                    `Hey ${user}, Here is your bid history with the sender of this errand`
                }

                {
                  // runner
                  user_id !== errand.user_id &&
                    errand.status === 'abandoned' &&
                    `Hey ${user}, you abandoned this errand`
                }

                {
                  // sender
                  (user_id === errand.user_id &&
                    errand.status === 'abandoned') ||
                    (user_id === errand.user_id &&
                      singleSubErrand?.status === 'abandoned' &&
                      `Hey ${user}, this errand was abandoned by the runner`)
                }

                {
                  // sender
                  user_id === errand.user_id &&
                    errand.status === 'abandoned' &&
                    `Hey ${user}, this errand was abandoned by the runner`
                }

                {errand.status === 'active'  &&
                  `Hey ${user}, This errand is active, you can follow the execution of this errand here`}

                {user_id !== errand.user_id &&
                  singleSubErrand?.status === 'active' &&
                  `Hey ${user}, This errand is active, you can follow the execution of this errand here`}

                {manageErrandClicked &&
                  singleSubErrand?.status !== 'completed' &&
                  singleSubErrand?.status !== 'cancelled' &&
                  `Go back to bids`}

                {manageErrandClicked &&
                  singleSubErrand?.status === 'completed' && (
                    <Text className=" px-2 py-1">{`This errand was completed on ${formatDate(
                      errand.updated_at,
                    )}`}</Text>
                  )}

                {manageErrandClicked &&
                  singleSubErrand?.status === 'cancelled' &&
                  `Hey ${user}, you cancelled this errand`}

                {errand.status === 'completed' && (
                  <Text className="px-2 py-1">{`This errand was completed on ${formatDate(
                    errand.updated_at,
                  )}`}</Text>
                )}
                {user_id !== errand.user_id &&
                  singleSubErrand?.status === 'completed' && (
                    <Text className="px-2 py-1">{`This errand was completed on ${formatDate(
                      errand.updated_at,
                    )}`}</Text>
                  )}
              </Text>
            </View>
          </>
        </View>
      )}
    </>
  )
}

export default TimelineInfo
