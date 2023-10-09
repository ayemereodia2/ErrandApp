import React from 'react'
import { StyleSheet } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
// ]

interface DropDownProp {
  label: string
  value: string
}

interface Prop {
  value: string
  setValue: any
  data: DropDownProp[]
  placeHolder: string
}

const DropdownComponent = ({ placeHolder, data, value, setValue }: Prop) => {
  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeHolder ? placeHolder : 'Select'}
      value={value}
      onChange={(item) => {
        setValue(item.value)
      }}
    />
  )
}

export default DropdownComponent

const styles = StyleSheet.create({
  dropdown: {
    margin: 4,
    height: 45,
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 6,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 4,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
    fontSize: 16,
    paddingVertical: 0,
  },
})
