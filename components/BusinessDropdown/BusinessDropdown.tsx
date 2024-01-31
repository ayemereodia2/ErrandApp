import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SelectList } from 'react-native-dropdown-select-list'


const BusinessDropdown = ({data}) => {
    const [selected, setSelected] = useState("");
  return (
    <View className='mt-3'>
      <SelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
    />
    </View>
  )
}

export default BusinessDropdown