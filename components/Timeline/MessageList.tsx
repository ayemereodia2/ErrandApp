import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MapView, { Marker } from 'react-native-maps'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { ChatInputProp } from './ChatInput'

const MessagesList = ({
  timeline,
  scrollViewRef,
  scrollToBottom,
}: ChatInputProp) => {
  const { data: currentUser } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const { data: runner } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )
  const { data: sender } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  return (
    <ScrollView
      ref={scrollViewRef}
      className="px-2 pb-16"
      style={{ backgroundColor: '#F8F9FC', height: '78%' }}
      onContentSizeChange={scrollToBottom}
    >
      <KeyboardAwareScrollView>
        {timeline?.updates.map((update, index) => {
          const checkMessageType = () => {
            switch (update.content_type) {
              case 'text':
                return <Text>{update.message}</Text>
              case 'image':
                // return (
                //   <img
                //     src={update.message}
                //     alt={update.message}
                //     className="w-[240px] h-[300px] object-cover"
                //   />
                // )
              case 'audio':
                return (
                  <figure>
                    <audio
                      src={update.message}
                      controls
                      controlsList="play timeline"
                    ></audio>
                  </figure>
                )
              case 'location':
                // const { isLoaded } = useLoadScript({
                //   googleMapsApiKey: process.env
                //     .NEXT_PUBLIC_GOOGLE_KEYS as string,
                //   libraries: ['places', 'drawing'],
                //   region: 'NG',
                // })
                const userLocation = JSON.parse(update.message)
                return (
                  // <Map
                  //   width={250}
                  //   height={250}
                  //   pickupLocation={null}
                  //   deliveryLocation={userLocation}
                  //   scriptLoaded={isLoaded}
                  // />

                  <MapView
                    style={{
                      height: 200,
                      width: 230
                    }}
                    showsUserLocation={true}
                    followsUserLocation={true}
                    initialRegion={{
                      latitude: !!userLocation
                        ? userLocation.coords.latitude
                        : 24.8607,
                      longitude: !!userLocation
                        ? userLocation.coords.longitude
                        : 67.0011,
                      latitudeDelta: 0.0922,
                      longitudeDelta: 0.0421,
                    }}
                  >
                    {userLocation && (
                      <Marker
                        coordinate={!!userLocation ? userLocation?.coords : {}}
                      />
                    )}
                  </MapView>
                )
              // case 'renegotiation-proposal':
              //   const confirmModal = useDisclosure()
              //   return (
              //     <div>
              //       <p>{update.message} </p>
              //       {update.status === UpdateStatus.Negotiated ? (
              //         <p className={'text-xs text-blue-300'}>
              //           this proposal was negotiated
              //         </p>
              //       ) : null}
              //       {update.status === UpdateStatus.Rejected ? (
              //         <p className={'text-xs text-red-300'}>
              //           this proposal was rejected
              //         </p>
              //       ) : null}
              //       {update.status === UpdateStatus.Pending &&
              //       update.user_id !== currentUser.id ? (
              //         <div className={'flex justify-between'}>
              //           <button
              //             onClick={confirmModal.onOpen}
              //             className={'text-green-500'}
              //           >
              //             accept
              //           </button>
              //           <button
              //             onClick={() => respondToProposal('reject')}
              //             className={'text-red-400'}
              //           >
              //             reject
              //           </button>
              //         </div>
              //       ) : null}

              //       {/* <Modal
              //         size={'sm'}
              //         isCentered
              //         isOpen={confirmModal.isOpen}
              //         onClose={confirmModal.onClose}
              //       >
              //         <ModalContent>
              //           <ModalBody>
              //             <div
              //               className={'grid place-content-center px-5 py-3'}
              //             >
              //               <p className={'mb-2 font-Neue_Montreal'}>
              //                 Are you sure you want to update Errand Cost?
              //               </p>
              //             </div>
              //           </ModalBody>
              //           <ModalFooter>
              //             <button
              //               className="text-sm text-[#C82332] border-2 border-[#C82332] rounded-3xl flex justify-center font-NeueMontreal items-center p-1 px-4 bg-white"
              //               onClick={confirmModal.onClose}
              //             >
              //               Cancel
              //             </button>
              //             <button
              //               className="text-sm text-[#21B06E] border-2 border-[#21B06E] ml-2 rounded-3xl flex justify-center font-NeueMontreal items-center p-1 px-4 bg-white"
              //               onClick={() => respondToProposal('accept')}
              //             >
              //               Post update
              //             </button>
              //           </ModalFooter>
              //         </ModalContent>
              //       </Modal> */}
              //     </div>
              //   )
              default:
                return <Text>{update.message}</Text>
            }
          }

          const getChatBubblePosition = () => {
            if (!update.user_id) return 'justify-center'

            return update.user_id === currentUser.id
              ? 'justify-end'
              : 'justify-start'
          }

          const checkUser = () => {
            return update.user_id === currentUser.id
          }

          const getUser = () => {
            if (update.source === 'sender') {
              return sender
            }

            return runner
          }

          const getFormattedDate = (input: string) => {
            const d = new Date(input)

            return d.toDateString()
          }

          const getFormattedTime = (input: string) => {
            const d = new Date(input)

            return d.toLocaleTimeString('en-NG', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })
          }

          return (
            <View
              key={update.id}
              className={`py-4  px-4 flex-row ${getChatBubblePosition()}`}
            >
              <View
                className={`rounded-lg ${
                  checkUser() ? 'ml-auto max-w-[80%]' : 'mr-auto max-w-[80%]'
                }`}
              >
                <View>
                  <View className="flex-row text-xs items-center justify-start gap-4 pb-1">
                    {getUser().profile_picture !== undefined ? (
                      <Image
                        source={{ uri: getUser().profile_picture }}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <View className="bg-[#616161] rounded-full w-10 h-10 flex-row justify-center items-center">
                        <Text className="text-white">
                          {getUser().first_name.charAt(0).toUpperCase()}
                          {getUser().last_name.charAt(0).toUpperCase()}
                        </Text>
                      </View>
                    )}

                    <View>
                      <Text className="text-black capitalize">
                        {getUser().first_name}
                      </Text>
                      <Text className="text-[#969494]">
                        {getFormattedDate(update.created_at)}
                      </Text>
                    </View>
                  </View>
                  <View
                    className={
                      checkUser()
                        ? 'text-black max-w-[312px] bg-[#DAE1F1] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm'
                        : 'text-black max-w-[312px] bg-[#E6E6E6] p-4 rounded-[10px] rounded-tl-none w-full text-xs xl:text-sm'
                    }
                  >
                    {checkMessageType()}
                  </View>
                  <Text className="text-[#4D4D4D] pt-2 text-xs">
                    {getFormattedTime(update.created_at)}
                  </Text>
                </View>
              </View>
            </View>
          )
        })}
      </KeyboardAwareScrollView>
    </ScrollView>
  )
}

export default MessagesList
