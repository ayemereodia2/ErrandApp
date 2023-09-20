import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo, Feather, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
// import { ScrollView } from 'react-native-gesture-handler'
import { TextInput, ScrollView  } from 'react-native'
import { Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import UpdateProfile from '../../components/ProfileUpdate/UpdateProfile'



const EditProfileTitle = ({navigation, route}:any) => {

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const {data} = route.params

  return (
    <SafeAreaView>
        {/* Header */}

       <View className='flex-row justify-between ml-[58px] mt-10 mr-[50px] pb-2'>

      <TouchableOpacity className='items-center justify-center flex-row' onPress={()=> navigation.goBack()}>
    <Text className='mr-2'><AntDesign name="close" size={16} color="black" /></Text>
    <Text>Close</Text>
    </TouchableOpacity>

    <Text>Edit Profile</Text>

    </View>

    {/* End Of Header */}

    <ScrollView>
       {/* Top Profile */}

 
    <View className='mt-8 mx-auto relative bg-gray-300 rounded-full'>
      { image ?  <Image source={{ uri: image }} style={{ width: 150, height: 150 }} className='rounded-full' /> : 
      
      <Image 
      // source={require('../../assets/images/profile.png')}
      source={{uri: data?.data.profile_picture}}
      className='b rounded-full w-[150px] h-[150px]'
      />
     }
      <TouchableOpacity onPress={pickImage} className='absolute left-12 top-14 mx-auto w-[60px] h-[50px] b rounded-md'>
      <Image source={require('../../assets/images/camera.jpg')} />
      </TouchableOpacity>
    </View>

    <View>
      {/* Name Area */}

      <View className='flex-row justify-center items-center mt-5'>
      <Text className='text-[18px] font-bold leading-6'>{data?.data.first_name}  {data?.data.last_name}  </Text> 
      <Text><MaterialIcons name="verified" size={20} color="green" /></Text>
      </View>

      {/*Occupation */}

      <Text className='text-center mt-3 text-base font-medium'>{data?.data.occupation ? data.occupation : 'Swave User'}</Text>
      </View>

      <UpdateProfile image={image} data={data}/>


    </ScrollView>

    </SafeAreaView>
  )
}

export default EditProfileTitle