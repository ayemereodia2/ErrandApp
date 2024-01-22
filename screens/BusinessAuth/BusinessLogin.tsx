import { View, Text, TextInput, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import InputField from '../../components/InputField'
import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox'
import { useNavigation } from '@react-navigation/native'
import BusinessDropdown from '../../components/BusinessDropdown/BusinessDropdown'
import SelectDropdown from 'react-native-select-dropdown'


const BusinessLogin = () => {

    const [countryCode, setCountryCode] = useState("NG")
    const [callingCode, setCallingCode] = useState("234")
    const [checked, setChecked] = useState(false)
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]


    const handleChecked = () => {
        setChecked(!checked)
    }

    const data = [
        {key:'1', value:'Tutoring'},
        {key:'2', value:'Appliances'},
        {key:'3', value:'Cameras'},
        {key:'4', value:'Computers', disabled:true},
        {key:'5', value:'Vegetables'},
        {key:'6', value:'Diary Products'},
        {key:'7', value:'Drinks'},
    ]

    const businessContact = [
        {key:'1', value:'Email address'},
        {key:'2', value:'Phone number'},
       
    ] 

    const businessHours = [
        {key:'1', value:'24/7'},
        {key:'2', value:'Daily'},
        {key:'3', value:'Weekly'}
    ] 
    const navigation = useNavigation()

  return (
    <SafeAreaView className='mb-10 bg-[#FEFEFE]'>
        <ScrollView showsVerticalScrollIndicator={false} className='mx-4'>

        <View className='mt-7'>
        <TouchableOpacity className='' onPress={() => navigation.goBack()}>
              <Text> <AntDesign name="arrowleft" size={24} color="#888" /> </Text>
            </TouchableOpacity>
        </View>
        <View className='mt-[23px]'>
            <Text className='text-[24px] text-[#393F42] font-bold' style={{}}> Business Profile</Text>
        </View>
        <View className=''>
            <Text className='text-[#717E83] text-sm mt-3' style={{fontFamily: 'Axiforma'}}>Create your account profile by filling your details
             below.</Text>
        </View>
        <View className='mt-14'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>What is your business name?</Text>
            <TextInput 
            className='border border-[#96A0A5] p-4 mt-3 rounded-[8px]'
            />
        </View>
        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Select Business Category</Text>
            {/* <TextInput 
            className='border border-[#96A0A5] p-4 mt-3 rounded-[8px]'
            /> */}
            <BusinessDropdown data={data} />
            
        </View>
        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Keywords for your business</Text>

           <View className='flex-row items-center mt-3 flex-wrap p-3 border border-[#96A0A5] rounded-lg'>
            <TouchableOpacity className='bg-[#09497D] px-3 py-1 mr-3 rounded-[50px]'>
                <Text className='text-sm text-white' style={{fontFamily: 'Axiforma'}}>UI Designer  <Text> x </Text> </Text>
            </TouchableOpacity>

            <TouchableOpacity className='bg-[#09497D] px-3 py-1 mr-3 rounded-[50px]'>
                <Text className='text-sm text-white' style={{fontFamily: 'Axiforma'}}>UX Designer  <Text> x </Text> </Text>
            </TouchableOpacity>

            <TouchableOpacity className='bg-[#09497D] px-3 py-1 rounded-[50px]'>
                <Text className='text-sm text-white' style={{fontFamily: 'Axiforma'}}>Job  <Text> x </Text> </Text>
            </TouchableOpacity>

            <TouchableOpacity className='bg-[#09497D] px-3 py-1 mt-4 mr-3 rounded-[50px]'>
                <Text className='text-sm text-white' style={{fontFamily: 'Axiforma'}}>UX Designer  <Text> x </Text> </Text>
            </TouchableOpacity>

            <TouchableOpacity className='bg-white px-3 py-1 mt-4 rounded-[50px] border border-[#09497D]'>
                <Text className='text-sm text-[#09497D]' style={{fontFamily: 'Axiforma'}}> <Text> + </Text>  Add Keyword </Text>
            </TouchableOpacity>



           </View>
        </View>
        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Advertise your  message to customers (This message will be shown to your customers)</Text>
            <TextInput 
            className='border border-[#96A0A5] px-4 h-[149px] mt-3 rounded-[8px]'
            />
             <Text className='text-[#393F42] ml-56 mt-1' style={{fontFamily: 'Axiforma'}}>
                (Up to 150 characters)</Text>
        </View>

        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Upload the pictures you want your customers to see on the market</Text>
           <View className='border border-[#96A0A5] bg-[#F3F6F9] rounded-lg h-[114px] py-5 mt-5'>
            <Image  
            className='mx-auto mb-3'
            source={require('../../assets/images/Upload.jpg')}/>
            <Text className='text-center text-[#6D6D6D]' style={{fontFamily: 'Axiforma'}}>Upload pictures here</Text>
           </View>
        </View>

        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Describe what you do in detail</Text>
            <TextInput 
            className='border border-[#96A0A5] px-4 h-[149px] mt-3 rounded-[8px]'
            />
        </View>

        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>What is your business address?</Text>
            <TextInput 
            className='border border-[#96A0A5] p-4 mt-3 rounded-[8px]'
            />
        </View>

        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>What is your email address?</Text>
            <TextInput 
            className='border border-[#96A0A5] p-4 mt-3 rounded-[8px]'
            />
        </View>

        
            <View className='mt-8'>
              <Text className='text-[#5E6366]' style={{fontFamily: 'Axiforma'}}>Phone Number</Text>

                <View className='flex-row items-center w-full'>


                  <View className=' flex-row items-center mr-3 mt-1 px-[22px] py-[7px] w-[81px] border rounded-lg border-[#96A0A5]'>

                  <CountryPicker
                  withFilter
                  countryCode={countryCode}
                  withFlag
                  withAlphaFilter={false}
                  withCurrencyButton={false}
                  withCallingCode
                  onSelect={country => {
                    console.log('country', country);
                    const {cca2, callingCode} = country;
                    setCountryCode(cca2)
                    setCallingCode(callingCode[0]);
                  }}
                  containerButtonStyle={{
                    alignItems: 'center',
                    
                    marginRight: 15
                  }}
                  />

                  <Text className='mt-1'><AntDesign name="down" size={16} color="#130F26" /></Text>
            </View>
                
                  <View className='w-[67vw]'>
               
                 <TextInput 
                className='border border-[#96A0A5] p-4 mt-[5px] rounded-[8px] h-14'
                />

                </View>
              </View>
              </View>

              <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>What is the best way to contact your business?</Text>
            <BusinessDropdown data={businessContact} />
        </View>

        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>When can your customers reach you?</Text>
            <BusinessDropdown data={businessHours} />
        </View>

        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>What is your lowest price?</Text>
            <TextInput 
            className='border border-[#96A0A5] p-4 mt-3 rounded-[8px]'
            />
        </View>

        <View className='mt-8'>
            <Text className='text-[#393F42]' style={{fontFamily: 'Axiforma'}}>Link your social media accounts</Text>
           <View className='flex-row items-center mt-3'>
            <Text> <AntDesign name="instagram" size={24} color="black" /> </Text>
            <Text> <Feather name="facebook" size={24} color="black" /> </Text>
            <Text> <FontAwesome6 name="x-twitter" size={24} color="black" /> </Text>
           </View>
        </View>

        <View className='flex-row items-center mt-8'>
            <Checkbox
            value={checked}
            onValueChange={handleChecked}
             />
            <View className='ml-3'>
                <Text className='text-xs text-[#5A6063]' style={{fontFamily: 'Axiforma'}}>I Accept Privacy Policies, <Text className='text-[#09497D] text-xs'> Terms & Conditions</Text></Text>
            </View>
        </View>

        <View>
            <TouchableOpacity className='h-14 bg-[#09497D] py-5 mt-8 rounded-lg items-center' disabled={checked ? false : true}>
                <Text className='text-center items-center text-[#EEF2F3]' style={{fontFamily: 'Axiforma'}}>Review</Text>
            </TouchableOpacity>
        </View>

        </ScrollView>
    </SafeAreaView>
  )
}

export default BusinessLogin