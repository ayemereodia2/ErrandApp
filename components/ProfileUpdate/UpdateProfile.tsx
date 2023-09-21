import { View, Text, Platform, TouchableOpacity, SafeAreaView, Pressable, ScrollView, TextInput } from 'react-native'
import React, {useState} from 'react'
// import { ScrollView, TextInput } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import { boolean } from 'yup';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import DateTimePicker from "@react-native-community/datetimepicker"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _fetch } from '../../services/axios/http';
import Toast from 'react-native-toast-message';



const UpdateProfile = ({image, data}:any) => {

const navigation = useNavigation()

    const [about, setAbout] = useState(data?.data.bio);
    const [lastName, setLastName] = useState(data?.data.last_name);
    const [firstName, setFirstName] = useState(data?.data.first_name);
    const [email, setEmail] = useState(data?.data.email);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [dateOfBirth, setDateOfBirth] = useState(data?.data.dob)


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
    
   
 
      
   const updateUserProfile = async (userData: any) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const _rs = await _fetch({
        method: "PUT",
        _url: `/user/profile`,
        body: (userData)
      
      });
  
      // Check if the response status code indicates an error
      if (!_rs.ok) {
        const errorResponse = await _rs.json();
        throw new Error(`Server error: ${errorResponse.message}`);
      }
  
      const responseData = await _rs.json();
      return responseData;
    } catch (error) {
      throw error;
    }
  };
  
      
      const handleUpdateProfile = async () => {

        const updatedData = {
          first_name: firstName,
          last_name: lastName,
          bio: about,
          email: email,
          dob: dateOfBirth,
          profile_picture: image
         
        };
    
        try {
          const responseData = await updateUserProfile(updatedData);
      
          // Checking if the response indicates success
          if (responseData.success) {
            // Handling a successful response from the server here
            console.log('Profile updated successfully:', responseData);
      
            // Show a success message to the user.
            Toast.show({
              type: 'success',
              text1: 'Profile update is successful',
            });
      
            // Navigate back to the Account screen
            navigation.navigate('Account');
            
            console.log(updatedData);
          } else {
            // Handle the case where the server responded with an error message
            console.error('Profile update failed:', responseData.message);
      
            Toast.show({
              type: 'error',
              text1: 'Profile update failed:' + responseData.message,
            });
          }
        } catch (error) {
          // Handle errors here, such as network errors or server-side errors
          console.error('Error updating profile:', error);
      
          Toast.show({
            type: 'error',
            text1: 'Sorry, something went wrong',
          });
        }
      };
       
    
    
      


  return (
    <SafeAreaView>
    <ScrollView>
    <View className='mt-10'>
      <View>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Bio</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm'
            placeholder={data?.data.bio ? data.data.bio : 'Enter a message'}
            value={about} 
            onChangeText={(text) => setAbout(text)}
            placeholderTextColor={'#B3B3B3'}>

         </TextInput>
      </View>

      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>First Name</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm'
            placeholder={ 'Enter your First Name'}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
            placeholderTextColor={'#B3B3B3'}/>
      </View>


      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Last Name</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm'
            placeholder={' Enter your last name'}
            value={lastName}
            onChangeText={(text) => setLastName(text)}
            placeholderTextColor={'#B3B3B3'}/>
      </View>

      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Email Address</Text>
        <TextInput className='w-[380px] mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm'
            placeholder={'Enter your email Address'}
            value={email}
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor={'#B3B3B3'}/>
      </View>


      
      <View className='mt-8'>
        <Text className='ml-4 font-medium text-lg text-[#1E3A79]'>Date of Birth</Text>

        {showPicker && (
            <View className='text-black'>
            <DateTimePicker 
            mode='date'
            display='spinner'
            value={date}
            onChange={onChange}
            className='h-[120px] mt-[-10px] text-black'
            textColor='black'
            
           
           

            />
            </View>
        )}

          {showPicker && Platform.OS === "ios" && (

            <View className='flex-row justify-around mt-2'>
              <TouchableOpacity onPress={toggleDatepicker}>
                <Text className='text-base font-medium'>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmIOSDate}>
                <Text className='text-base font-medium'>Confirm</Text>
              </TouchableOpacity>

            </View>
          )}
        

          {!showPicker  && (
            <Pressable>
            <TextInput 
             className='w-[380px] mt-2 b rounded-md h-[60px] pl-3  pb-[42x] mx-auto bg-[#E6E6E6] text-sm text-black'
             placeholder={'23 Aug 2003'}
             value={dateOfBirth}
             onChangeText={setDateOfBirth}
             editable={false}
             onPressIn={toggleDatepicker}
             placeholderTextColor='#B3B3B3'
            
            />
  
  
          </Pressable>


          )}
       
       
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