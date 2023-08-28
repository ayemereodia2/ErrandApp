import { View, Text, TouchableOpacity, Image, TouchableWithoutFeedback, TextInputComponent,  Keyboard, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo, Feather, FontAwesome, Ionicons } from '@expo/vector-icons'
import {BottomSheetModal, BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import BottomSheet from './BottomSheet'


const Bids = ({navigation}:any) => {

  // Handles show reply

  const [isHidden, setIsHidden] = useState(true)

  const handleReplies = () => {
    setIsHidden(!isHidden);

  }

    const [isBlue, setIsBlue] = useState(true)

    const [inputValue, setInputValue] = useState('')

    const toggleColor = () => {
        setIsBlue(prevIsBlue => !prevIsBlue)
    }

    const handleBidNavigation = () => {
        navigation.navigate('Bids')
      }

      const handleErrandDetailsNavigation = () => {
        navigation.navigate('ErrandsAndBids')
      }

      const handleBoth1 = () => {
        handleErrandDetailsNavigation();
      }

      const handleBoth2 = () => {
        
        handleBidNavigation();
      }

      const bottomSheetModalref = useRef(null);
      const bottomSheetModalref1 = useRef(null);
      const bottomSheetModalref2 = useRef(null);


      const snapPoints = ["42%"]

      const snapPoints1 = ["35%"]

      const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

      const handleKeyboardWillShow = () => {
        setIsKeyboardVisible(true);
      };
    
      const handleKeyboardWillHide = () => {
        setIsKeyboardVisible(false);
      };
    
      useEffect(() => {
        const keyboardWillShowListener = Keyboard.addListener(
          Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
          handleKeyboardWillShow
        );
        const keyboardWillHideListener = Keyboard.addListener(
          Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
          handleKeyboardWillHide
        );
    
        return () => {
          keyboardWillShowListener.remove();
          keyboardWillHideListener.remove();
        };
      }, []);

    




      const handlePresentModal = () =>{
        bottomSheetModalref.current?.present();

      }

      const closeBottomSheet = () => {
        // Logic to close the bottom sheet modal
        bottomSheetModalref.current?.close();

      };

      const handlePresentModal1 = () =>{
         
       
        bottomSheetModalref1.current?.present();

       

      }

      const closeBottomSheet1 = () => {
        // Logic to close the bottom sheet modal
        closeBottomSheet();
        bottomSheetModalref1.current?.close();

      };

     

      const handleNegotiateBid = () =>{
        bottomSheetModalref2.current?.present();

      }

      const handleSubmitBid = () => {
        // Logic to close the bottom sheet modal
        bottomSheetModalref2.current?.close();

      };

     

      

     



  return (
    <BottomSheetModalProvider>
    <ScrollView>
        <SafeAreaView>
        <View className='flex-row  ml-[16px] '>
        <TouchableOpacity  onPress={handleBoth1}>
        <View className='w-[199px] h-[52px] bg-white  items-center justify-center '>
          <Text className='text-center text-[#243763]' >Errand Details</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleBoth2}>
        <View className='w-[193px] h-[52px] bg-[#243763] items-center justify-center '>
          <Text className='text-center text-white' >Bids</Text>
          </View>
        </TouchableOpacity>
          
      </View>

      <View className='mt-6 ml-4'>
        <Text className='text-[16px] font-bold'>Existing Bids</Text>
      </View>

  
              <View className='w-[398px] h-[66px] mt-[28px]  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/stanton.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50}}
               /> 
               <View className='flex-1'><Text className='text-[#011E3E] text-base'>Kaiya Stanton</Text></View>

             <View className='w-[38px] h-[17px] ml-[16px] bg-[#115A38] justify-center mr-1'>
             <Text className='text-center text-white font-bold text-sm'>N50k</Text>
             </View>
              
                </View>
                
             
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-20px] mb-4 '>
                <Text>4.5<Text className='text-[12px] text-[#6D6D6D]'> <Entypo name="star" size={12} color="gold" /> (134 Errands Completed)</Text></Text>
                <View className=' mr-2'>
                  <Text >2 hours ago</Text>
                  </View>
                
              </View>
              </View>
              

              <View className='ml-4'>
                <Text className='leading-[24px] text-[16px] text-[#444444]'>Lorem ipsum dolor sit amet consectetur. At convallis cu sodales lorem et. Consectetur est posuere ferme egess congue lectus purus. Mattis libero  ultrices at massa he purus.</Text>
              </View>

              <View className='flex-row ml-4 mt-6 items-center'>
               
                <View className='flex-row gap-2 flex-1'>
                <TouchableOpacity onPress={handlePresentModal}>
                  <View className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#33A532]'>
                    <Text className='text-[#33A532]  text-center'> <Ionicons name="checkmark" size={24} color="#33A532" /></Text>
                  </View>
                  </TouchableOpacity>

                  
                  <TouchableOpacity>
                  <View  className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#FF0000]'>
                 
                    <Text className='text-[#FF0000] text-center'> <Feather name="x" size={24} color="#FF0000" /></Text>
                  </View>
                  </TouchableOpacity>
                  
                  
                  <TouchableOpacity onPress={handleNegotiateBid}>
                  <View  className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#317ACF]'>
                    <Text className='text-[#317ACF] text-center'> <FontAwesome name="commenting" size={24} color="#317ACF" /></Text>
                  </View>
                  </TouchableOpacity>


                </View>

                <TouchableOpacity onPress={handleReplies}>
                <View className='mr-4  w-[90px] mt-3 -[#317ACF]'>
                  <Text className='text-xs text-center text-[#243763]'>View Replies</Text>
                </View>
                </TouchableOpacity>
              </View>

              {/* Replies to be viewed */}
              <View className='mt-[32px] ml-3' style={{ display: isHidden ? 'none' : 'flex' }}>
                <View className='flex-row '>
                  <Image source={require('../../assets/images/george.jpg')} style={{width: 50, height: 50, borderRadius: 50}}/>
                  <View className='w-[340px] h-[230px] ml-2 bg-[#DAE1F1] b rounded-xl' >
                    <View className='flex-row items-center justify-between mt-4'>
                      <Text className='pl-3 leading-6 font-semibold text-base'>Enoobong George</Text>
                      <Text className='pr-3 leading-6 font-semibold text-sm'>2 hours ago</Text>
                    </View>

                    <View className='mt-[16px] pl-4 pr-5 w-[304px] h-[120px]'>
                      <Text className='leading-[24px] text-base font-normal'>Lorem ipsum dolor sit amet consectetur. At convallis cu sodales lorem et. Consectetur est posuere ferme egess congue lectus purus. Mattis libero  ultrices at massa he purus.</Text>
                    </View>

              <View className='w-[76px] h-[32px] ml-[16px] bg-[#115A38] justify-center mr-1 mt-3 mb-4 b rounded'>
             <Text className='text-center text-white font-normal text-base'>N50,000</Text>
             </View>

                  </View>

                </View>
                
              </View>

                    {/* Reply Two*/}
              <View className='mt-[32px] ml-3' style={{ display: isHidden ? 'none' : 'flex' }}>
                <View className='flex-row '>
                  <Image source={require('../../assets/images/pawpaw.jpg')} style={{width: 50, height: 50, borderRadius: 50}}/>
                  <View className='w-[340px] h-[158px] ml-2 bg-[#DAE1F1] b rounded-xl' >
                    <View className='flex-row items-center justify-between mt-4'>
                      <Text className='pl-3 leading-6 font-semibold text-base'>Anthony Elanga Olusegun</Text>
                      <Text className='pr-3 leading-6 font-semibold text-sm'>4 hours ago</Text>
                    </View>

                    <View className='mt-[16px] pl-4 pr-5 w-[304px] h-[48px]'>
                      <Text className='leading-[24px] text-base font-normal'>Lorem ipsum dolor sit amet consectetur. At convallis cu sodales lorem etjdjdladjald</Text>
                    </View>

              <View className='w-[76px] h-[32px] ml-[16px] bg-[#115A38] justify-center mr-1 mb-4 mt-3 b rounded'>
             <Text className='text-center text-white font-normal text-base'>N30,000</Text>
             </View>

                  </View>

                </View>
                
              </View>
              {/* End of Replies */}


              <View className='w-[398px] h-[66px] mt-[28px]  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/stanton.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50}}
               /> 
               <View className='flex-1'><Text className='text-[#011E3E] text-base'>Kaiya Stanton</Text></View>

             <View className='w-[38px] h-[17px] ml-[16px] bg-[#115A38] justify-center mr-1'>
                <Text className='text-center text-white font-bold text-sm'>N50k</Text>
             </View>
              
                </View>
                
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-20px] mb-4 '>
                <Text>4.5<Text className='text-[12px] text-[#6D6D6D]'> <Entypo name="star" size={12} color="gold" /> (134 Errands Completed)</Text></Text>
                <View className=' mr-2'>
                  <Text >2 hours ago</Text>
                  </View>
                
              </View>
              </View>
              

              <View className='ml-4'>
                <Text className='leading-[24px] text-[16px] text-[#444444]'>Lorem ipsum dolor sit amet consectetur. At convallis cu sodales lorem et. Consectetur est posuere ferme egess congue lectus purus. Mattis libero  ultrices at massa he purus.</Text>
              </View>

              <View className='flex-row ml-4 mt-6 items-center'>
               
                <View className='flex-row gap-2 flex-1'>
                <TouchableOpacity>
                  <View className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#33A532]'>
                    <Text className='text-[#33A532] text-center'> <Ionicons name="checkmark" size={24} color="#33A532" /></Text>
                  </View>
                  </TouchableOpacity>

                  
                  <TouchableOpacity>
                  <View  className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#FF0000]'>
                 
                    <Text className='text-[#FF0000] text-center'> <Feather name="x" size={24} color="#FF0000" /></Text>
                  </View>
                  </TouchableOpacity>
                  
                  
                  <TouchableOpacity>
                  <View  className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#317ACF]'>
                    <Text className='text-[#317ACF] text-center'> <FontAwesome name="commenting" size={24} color="#317ACF" /></Text>
                  </View>
                  </TouchableOpacity>


                </View>

                <TouchableOpacity>
                <View className='mr-4  w-[90px] mt-3 -[#317ACF]'>
                  <Text className='text-xs text-center text-[#243763]'>View Replies</Text>
                </View>
                </TouchableOpacity>
              </View>



              <View className='w-[398px] h-[66px] mt-[28px]  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/stanton.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50}}
               /> 
               <View className='flex-1'><Text className='text-[#011E3E] text-base'>Kaiya Stanton</Text></View>

             <View className='w-[38px] h-[17px] ml-[16px] bg-[#115A38] justify-center mr-1'>
             <Text className='text-center text-white font-bold text-sm'>N50k</Text>
             </View>
              
                </View>
                
             
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-20px] mb-4 '>
                <Text>4.5<Text className='text-[12px] text-[#6D6D6D]'> <Entypo name="star" size={12} color="gold" /> (134 Errands Completed)</Text></Text>
                <View className=' mr-2'>
                  <Text >2 hours ago</Text>
                  </View>
                
              </View>
              </View>
              

              <View className='ml-4'>
                <Text className='leading-[24px] text-[16px] text-[#444444]'>Lorem ipsum dolor sit amet consectetur. At convallis cu sodales lorem et. Consectetur est posuere ferme egess congue lectus purus. Mattis libero  ultrices at massa he purus.</Text>
              </View>

              <View className='flex-row ml-4 mt-6 items-center'>
               
                <View className='flex-row gap-2 flex-1'>
                <TouchableOpacity>
                  <View className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#33A532]'>
                    <Text className='text-[#33A532] text-center'> <Ionicons name="checkmark" size={24} color="#33A532" /> </Text>
                  </View>
                  </TouchableOpacity>

                  
                  <TouchableOpacity>
                  <View  className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#FF0000]'>
                 
                    <Text className='text-[#FF0000] text-center'> <Feather name="x" size={24} color="#FF0000" /></Text>
                  </View>
                  </TouchableOpacity>
                  
                  
                  <TouchableOpacity>
                  <View  className='w-[40px] h-[40px] border-solid rounded-full border items-center justify-center border-[#317ACF]'>
                    <Text className='text-[#317ACF] text-center'> <FontAwesome name="commenting" size={24} color="#317ACF" /></Text>
                  </View>
                  </TouchableOpacity>


                </View>

                <TouchableOpacity>
                <View className='mr-4  w-[90px] mt-3 -[#317ACF]'>
                  <Text className='text-xs text-center text-[#243763]'>View Replies</Text>
                </View>
                </TouchableOpacity>
              </View>

              <BottomSheetModal
                ref={bottomSheetModalref}
                index={0}
                snapPoints={snapPoints}
    
               >
                <View>
                  <Text className='text-[20px] text-center leading-[22px] font-semibold'>Accept Bid</Text>
               </View>

               <View className='w-[296px] h-[44px] mx-auto mt-6'>
                <Text className='text-center'>Are you sure you want to Accept Enoobong George's bid on your errand?</Text>
               </View>

              <TouchableOpacity onPress={handlePresentModal1}>
               <View className='w-[399px] h-[48px] bg-[#243763] mx-auto items-center justify-center mt-[45px]'>
                <Text className='text-white text-center leading-[24px] font-semibold text-[16px]'>Accept Bid</Text>
                 </View>
               </TouchableOpacity>

               <TouchableOpacity onPress={closeBottomSheet}>
               <View className='w-[399px] h-[48px] border-red-600 border-solid border bg-[#fff] mx-auto items-center justify-center mt-[16px]'>
                <Text className='text-[#C82332] text-center leading-[24px] font-semibold text-[16px]'>Cancel</Text>
                 </View>
               </TouchableOpacity>
                </BottomSheetModal>

                <BottomSheetModal
                ref={bottomSheetModalref1}
                index={0}
                snapPoints={snapPoints1}
    
               >
                <View>
                  <Text className='text-[20px] text-center leading-[22px] font-semibold'>Bid Accepted</Text>
               </View>

               <View className='w-[80px] h-[80px] mx-auto mt-6'>
                <Image 
                source={require('../../assets/images/stamp.jpg')}
                
                />
               </View>


               <TouchableOpacity onPress={closeBottomSheet1}>
               <View className='w-[399px] h-[48px]  bg-[#243763] mx-auto items-center justify-center mt-[48px]'>
                <Text className='text-[#fff] text-center leading-[24px] font-semibold text-[16px]'>Close</Text>
                 </View>
               </TouchableOpacity>
                </BottomSheetModal>

               
                
                <BottomSheetModal
                ref={bottomSheetModalref2}
                index={0}
                snapPoints={[isKeyboardVisible ? '90%' : '51%']}>


            

                <View>
                  <Text className='text-[20px] text-center leading-[22px] font-semibold'>Negotiate Bid</Text>
               </View>

                
               <View >
               <Text className='pt-[15px] pl-[16px]'>Amount</Text>
                <TextInput 
                keyboardType='numeric'
                value={inputValue}
                placeholder='Enter an Amount'
                placeholderTextColor={'#A5B6DE'}
                className='w-[399px] h-[48px] bg-[#DAE1F1] mx-auto mt-6 pl-4 items-center rounded'>

                </TextInput>
               </View>

              
               <View>
               <Text className='pt-[20px] pl-[16px]'>Comments</Text>

               <TextInput 
                placeholder='Enter an Amount'
                placeholderTextColor={'#A5B6DE'}
                className='w-[399px] h-[80px] bg-[#DAE1F1] mx-auto mt-6 pl-4 items-center rounded'>

                </TextInput>
                 </View>
              

               <TouchableOpacity onPress={handleSubmitBid}>
               <View className='w-[399px] h-[48px] bg-[#243763] mx-auto items-center justify-center mt-[32px]'>
                <Text className='text-[#fff] text-center leading-[24px] font-semibold text-[16px]'>Cancel</Text>
                 </View>
               </TouchableOpacity>
               
               
               
                </BottomSheetModal>
                
                
                


        </SafeAreaView>
    </ScrollView>
    </BottomSheetModalProvider>
    
  )
}

export default Bids