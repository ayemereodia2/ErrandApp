// ExpiredTokenModal.tsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Modal, View, Text, Button } from 'react-native';


const ExpiredTokenModal = ({ navigation }) => {

  const clearStorage = async () => {
    await AsyncStorage.multiRemove([
      'accessToken',
      'refreshToken',
      'user_id',
      'last_name',
      'first_name',
      'profile_pic',
    ])
  }

const handleDefault = () => {
  navigation.navigate('Default')
  clearStorage()
}

  
const {fetch: originalFetch} = window;
  const [visible, setVisible] = useState(true)

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: 'black', padding: 60, borderRadius: 10 }}>
          <Text className='text-white'>Your session has expired. Please log in again.</Text>
          <View className='border border-white mt-3 w-[100px] mx-auto rounded-lg'>
          <Button title="Close" onPress={handleDefault } />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ExpiredTokenModal;
