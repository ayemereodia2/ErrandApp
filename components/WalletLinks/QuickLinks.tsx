import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';

const QuickLinks = () => {
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <TouchableOpacity
            style={{ backgroundColor: '#3F60AC', width: 131, alignItems: 'center', padding: 10, borderRadius: 5 }}
          >
            <Text style={{ color: 'white' }}>Quick Links</Text>
          </TouchableOpacity>
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            onSelect={() => {
              // Add your Refresh logic here
              alert('Refresh clicked');
            }}
            text="Refresh"
          />
          <MenuOption
            onSelect={() => {
              // Add your Profile logic here
              alert('Profile clicked');
            }}
            text="Profile"
          />
          <MenuOption
            onSelect={() => {
              // Add your Contact Us logic here
              alert('Contact Us clicked');
            }}
            text="Contact Us"
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default QuickLinks;
