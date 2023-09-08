import { View, Text, Platform, TouchableOpacity, SafeAreaView, Pressable } from 'react-native'
import React, {useState} from 'react'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { boolean } from 'yup';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import DateTimePicker from "@react-native-community/datetimepicker"



const UpdateProfile = () => {
    const navigation = useNavigation()
    const [about, setAbout] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState('')


   const toggleDatepicker = () => {
    setShowPicker(!showPicker)

   };

   const onChange = ({ type }:any, selectedDate:any) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleDatepicker();
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleDatepicker();
    }

   };

   const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString());
    toggleDatepicker();
   }
    
   

      const updateUserProfile = async (userData:any) => {
        try {
          const response = await axios.put(`https://blue-star-4866.fly.dev/v1/user/profile`, userData);
          return response.data; // Assuming the server returns the updated user data
        } catch (error) {
          throw new Error('Error updating user profile');
        }
      };

      const { mutate, isLoading, isError } = useMutation(updateUserProfile);

      const handleUpdateProfile = () => {
        try{
          const updatedData = {
            // Includes the fields user would want to update in the user's profile
            name: name,
            email: email,
            about: about,
            number: number,
            dateOfBirth: dateOfBirth
            // ...
          };
          mutate(updatedData);
          navigation.navigate('Account')

        }
       catch(error){
        console.log(error)
        'error updating profile'
       }

       
      };
    


  return (
    <SafeAreaView>
    <ScrollView>
    <View className='mt-10'>
      <View>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>About</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm'
            placeholder='Enter your Message Here'
            value={about}
            onChangeText={(text) => setAbout(text)}
            placeholderTextColor={'#000'}>

         </TextInput>
      </View>

      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Full Name</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm'
            placeholder='Enter your First Name'
            value={name}
            onChangeText={(text) => setName(text)}
            placeholderTextColor={'#000'}/>
      </View>

      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Email Address</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm'
            placeholder='Enter your Email Address'
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={'#000'}/>
      </View>


      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Phone Number</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm'
            placeholder='Enter your Phone nuber'
            value={number}
            onChangeText={(text) => setNumber(text)}
            placeholderTextColor={'#000'}>

         </TextInput>
      </View>


      
      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Date of Birth</Text>

        {showPicker && (

            <DateTimePicker 
            mode='date'
            display='spinner'
            value={date}
            onChange={onChange}
            className='h-[120px] mt-[-10px] text-black'
            style={{ backgroundColor: 'black'}}
           

            />
        )}

          {showPicker && Platform.OS === "ios" && (

            <View className='flex-row justify-around mt-2'>
              <TouchableOpacity onPress={toggleDatepicker}>
                <Text>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmIOSDate}>
                <Text>Confirm</Text>
              </TouchableOpacity>

            </View>
          )}
        

          {!showPicker  && (
            <Pressable>
            <TextInput 
             className='w-[380px] mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm text-black'
             placeholder='Sat Aug 21 2004'
             value={dateOfBirth}
             onChangeText={setDateOfBirth}
             editable={false}
             onPressIn={toggleDatepicker}
             placeholderTextColor='black'
            
            />
  
  
          </Pressable>


          )}
       
       
      </View>


      
      

    <View className='mb-8 mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Referral information</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm'
            placeholder='Enter your Message Here'
            value={about}
            onChangeText={(text) => setAbout(text)}
            placeholderTextColor={'#000'}>

         </TextInput>
      </View>

      <TouchableOpacity className=' mt-[52px] mb-[180px]' onPress={handleUpdateProfile}>
            <View className='w-[300px] h-[50px] bg-[#243763]  mx-auto items-center justify-center'>
            <Text className='text-white text-center items-center'>Save</Text>
            </View>
         </TouchableOpacity>


    </View>
    </ScrollView>
    </SafeAreaView>
   
  )
}

const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: 'black',
      padding: 10,
    },
  });
    
  
  
  
  

export default UpdateProfile