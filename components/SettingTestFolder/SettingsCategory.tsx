import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';


    const data = [
      { label: 'Laundry', value: '1' },
      { label: 'Baby Sitting', value: '2' },
      { label: 'Chat', value: '3' },
      { label: 'Personal Errands', value: '4' },
      { label: 'Baking & Catering', value: '5' },
      { label: 'Shopping', value: '6' },
      { label: 'House Cleaning', value: '7' },
      
    ];

const SettingsCategory = () => {

  const [selected, setSelected] = useState([]);

  return (
    <View>

       <View className='mt-8 ml-4'>
      <Text className='pb-2 text-base font-bold leading-6'>CATEGORY INTERESTS</Text>
      <Text className='text-[14px]'>Notifications on all general activities on Swave</Text>
    </View>


    <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          search
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={selected}
          onChange={item => {
            setSelected(item);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="#3F60AC"
              name="Safety"
              size={20}
            />
          )}
          selectedStyle={styles.selectedStyle}
        />

        <TouchableOpacity className='ml-4'>
          <View className='py-4 px-4 w-[149px] rounded-full bg-[#3F60AC] mt-4 items-center'>
            <Text className='text-white items-center justify-center'>Add Category
             <Text className='text-white ml-2 mt-2 justify-center items-center mx-2'> 
             <AntDesign name="pluscircle" size={16} color="white" />
             </Text>
             </Text>
          </View>
        </TouchableOpacity>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    // borderBottomWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#3F60AC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center'
    
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
});

export default SettingsCategory

