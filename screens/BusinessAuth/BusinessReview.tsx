import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const BusinessReview = () => {

  const navigation = useNavigation()
  return (
   <SafeAreaView>
    <ScrollView className='mx-5 mt-7' showsVerticalScrollIndicator={false}>

    <View className='mt-3 mb-7'>
        <TouchableOpacity className='' onPress={() => navigation.goBack()}>
              <Text> <AntDesign name="arrowleft" size={24} color="#888" /> </Text>
            </TouchableOpacity>
        </View>

      <View>
      <Text className='text-[24px] text-[#393F42] font-bold' style={{}}> Business Profile</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>What is your business name?</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>Exemplar’ Group</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>Select Business Category</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>Tutorial</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>Keywords for your business</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>UI Designer, UX Designer, Job</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>Advertise your  message to customers (This message will be shown to your customers)</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>Lorem ipsum dolor sit amet consectetur. Scelerisque viverra morbi vivamus nam id bibendum leo. Venenatis diam eu amet bibendum aliquet leo.</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>Upload the pictures you want your customers to see on the market</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>No Images Selected</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>Describe what you do in detail</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>Lorem ipsum dolor sit amet consectetur. Scelerisque viverra morbi vivamus nam id bibendum leo. Venenatis diam eu amet bibendum aliquet leo.</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>What is your business address?</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}> <Text></Text> 1, London street, Lekki, Lagos</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>What is your email address?</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>joedoe@exemplar.com</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>What is your phone number?</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>+2348023456789</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>What is the best way to contact your business?</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>Email address</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>When can your customers reach you?</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>24/7</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>What is your lowest price?</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>₦ 150,000</Text>
      </View>

      <View>
        <Text className='text-[#393F42] mt-7 text-base' style={{fontFamily: 'Axiforma'}}>Upload the pictures you want your customers to see on the market</Text>
        <Text className='text-[#09497D] mt-3 text-base' style={{fontFamily: 'Axiforma'}}>No Images Selected</Text>
      </View>

      <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Link your social media accounts</Text>

           <View className='flex-row items-center mt-3' style={{gap: 12}}>
           <View>
           <Text> <AntDesign name="instagram" size={24} color="#09497D" /> </Text>
            </View>

           <View>
             <Text> <Feather name="facebook" size={24} color="#09497D" /> </Text>
             </View>

           <View> 
             <Text> <FontAwesome6 name="x-twitter" size={24} color="#09497D" /> </Text>
             </View>
           </View>
        </View>

        <View>
            <TouchableOpacity className='h-14 bg-[#09497D] py-5 mt-8 mb-5 rounded-lg items-center' >
                <Text className='text-center items-center text-[#EEF2F3]' style={{fontFamily: 'Axiforma'}}>Submit</Text>
            </TouchableOpacity>
        </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default BusinessReview