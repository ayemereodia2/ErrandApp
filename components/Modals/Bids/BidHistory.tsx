import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { RootState } from '../../../services/store'
import { Bids, Haggles, MarketData, UserDetail } from '../../../types'
import { getTimeAgo } from '../../../utils/helper'

export interface BidsProps {
  errand: MarketData
  bid: Bids
  user_id: string
  haggle: Haggles
  otherHaggles?: Haggles[]
  lastHaggle?: Haggles
}

interface MessageProp {
  name: string
  amount: string
  message: string
  date: string
  errand: MarketData
  haggle: Haggles
  sender: UserDetail
  bid: Bids
}

const MessageBox = ({
  name,
  amount,
  date,
  message,
  errand,
  haggle,
  sender,
  bid,
}: MessageProp) => {
  const getChatBubblePosition = () => {
    return haggle.source === 'runner' ? 'justify-end' : 'justify-start'
  }
  const getUser = () => {
    if (haggle.source === 'runner') {
      return bid.runner
    }
    return sender
  }

  const getFormattedTime = (input: string) => {
    const d = new Date(input)

    return d.toLocaleTimeString('en-NG', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  console.log(">>>>bud runnwe", getUser().profile_picture);
  

  return (
    <View className={`py-4  px-4 flex-row ${getChatBubblePosition()}`}>
      <View
        className={`rounded-lg ${
          haggle.source === 'runner'
            ? 'ml-auto max-w-[80%]'
            : 'mr-auto max-w-[80%]'
        }`}
      >
        <View>
          <View className="flex-row text-xs items-center justify-start gap-4 pb-1">
            {getUser().profile_picture !== '' ? (
              <Image
                source={{
                  uri: getUser().profile_picture || '',
                }}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <View className="w-10 h-10 bg-[#616161] rounded-full flex-row justify-center items-center">
                <Text
                  // style={{ color: textTheme }}
                  className="uppercase text-lg items-center text-white"
                >
                  {haggle.source === 'sender'
                    ? sender.first_name.charAt(0).toUpperCase()
                    : bid?.runner?.first_name.charAt(0).toUpperCase()}
                  {haggle.source === 'sender'
                    ? sender.last_name.charAt(0).toUpperCase()
                    : bid?.runner?.last_name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <Text
              // style={{ color: textTheme }}
              className="text-base font-medium"
            >
              {haggle.source === 'sender'
                ? sender.first_name
                : bid?.runner.first_name}{' '}
            </Text>
          </View>

          <Text className="text-[#808080] flex items-center text-sm">
            <Text className="text-base">
              {getTimeAgo(haggle?.created_at)}
            </Text>
          </Text>

          <View
            className={
              haggle.source === 'runner'
                ? 'text-black max-w-[312px] bg-[#DAE1F1] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm mt-2'
                : 'text-black max-w-[312px] bg-[#E6E6E6] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm mt-2'
            }
          >
            <Text>{haggle?.description}</Text>
          </View>
          <Text className="text-[#4D4D4D] pt-2 text-xs">
            {getFormattedTime(haggle.created_at)}
          </Text>
        </View>
        <View className="bg-[#FEE1CD] rounded-2xl py-1 px-3 text-center mt-2 ">
          <Text className="text-[#642B02] text-base font-bold inline-block">
            &#x20A6;{(haggle?.amount / 100).toLocaleString()}
          </Text>
        </View>
      </View>
    </View>
    // <View className="">
    //   <View className="w-full mt-3 p-3 border-b border-[#E6E6E6] px-6">
    //     <View className="">
    //       <View className="name-time flex-row w-full justify-between items-center">
    //         <Text className="text-base font-semibold">
    //           {haggle.source === 'sender'
    //             ? sender.first_name
    //             : bid?.runner?.first_name}{' '}
    //           {haggle.source === 'sender'
    //             ? sender.last_name
    //             : bid?.runner?.last_name}
    //         </Text>
    //         <Text className="text-[#808080] flex items-center text-sm">
    //           <Text className="text-base">
    //             {getTimeAgo(haggle?.created_at)}{' '}
    //           </Text>
    //         </Text>
    //       </View>

    //       <Text className="text-xs pt-2 pb-6 w-8/12">
    //         {' '}
    //         {haggle?.description}
    //       </Text>

    //       <View className="text-xs flex-row justify-between items-center space-x-4">
    //         <Text
    //           className={`rounded-xl p-1 px-4 capitalize ${
    //             errand.status == 'open'
    //               ? 'bg-[#FEE1CD] text-[#642B02]'
    //               : errand.status === 'active'
    //               ? 'bg-[#ADF0D1] text-[#115A38]'
    //               : errand.status === 'cancelled' ||
    //                 errand.status === 'rejected'
    //               ? 'bg-[#F4C2C7] text-[#71141D]'
    //               : 'bg-[#DAE1F1] text-[#3F60AC]'
    //           } `}
    //         >
    //           {errand.status}
    //         </Text>
    //         <Text className="font-semibold px-4 p-1 rounded-xl bg-[#FEE1CD] text-[#642B02]">
    //           &#x20A6;{amount}
    //         </Text>
    //       </View>
    //     </View>
    //   </View>
    // </View>
  )
}

const BidHistory = ({ errand, bid, haggle, otherHaggles }: BidsProps) => {
  const { data: sender } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )

  let someOtherHaggle: Haggles[]
  someOtherHaggle = [...bid.haggles]
  try {
    otherHaggles = bid.haggles
    if (someOtherHaggle.length > 0) {
      someOtherHaggle.reverse()
    }
  } catch (e) {
    console.log(e)
  }

  return (
    <View style={styles.container} className="py-4 pb-10">
      <Text className="text-xl text-center font-semibold">Bid History</Text>
      <Text className="text-center pt-2 text-base">
        Your negotiation history with this runner
      </Text>

      <ScrollView>
        {someOtherHaggle.map((haggle) => {
          const firstName =
            haggle.source === 'runner'
              ? bid?.runner?.first_name
              : sender.first_name

          const lastName =
            haggle.source === 'runner'
              ? bid?.runner?.last_name
              : sender.last_name

          return (
            <View>
              <MessageBox
                name={`${firstName} ${lastName}`}
                amount={(haggle?.amount / 100).toLocaleString()}
                message={haggle.description}
                date={getTimeAgo(haggle.created_at)}
                errand={errand}
                haggle={haggle}
                sender={sender}
                bid={bid}
              />
            </View>
          )
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: 'grey',
  },
  textInput: {
    alignSelf: 'stretch',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'grey',
    color: 'white',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    zIndex: 100,
    backgroundColor: 'white',
  },
})

export default BidHistory
