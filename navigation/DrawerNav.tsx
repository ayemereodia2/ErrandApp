import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Button, View } from 'react-native'
import { RootNavigator } from '.'
import ContactUs from '../screens/Contact/ContactUs'
import NotificationScreen from '../screens/Notification/NotficationScreen'
import SettingScreen from '../screens/Setting/SettingScreen'
import MyErrandsTest from '../screens/MyErrandsTest/MyErrandsTest'

// function NotificationsScreen({ navigation }: any) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Button onPress={() => navigation.goBack()} title="Go back" />
//     </View>
//   )
// }

const Drawer = createDrawerNavigator()

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        headerTransparent: true,
      }}
      initialRouteName="Feeds"
    >
      {/* <Drawer.Screen name="Welcome" component={RootNavigator} /> */}
      <Drawer.Screen name="Notifications" component={NotificationScreen} />
      {/* <Drawer.Screen name="Contact Us" component={ContactUs} /> */}
      {/* <Drawer.Screen name="Settings" component={SettingScreen} /> */}
      <Drawer.Screen name="MyErrandsTest" component={MyErrandsTest} />
    </Drawer.Navigator>
  )
}
