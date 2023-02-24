import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { Button, View } from 'react-native'
import { RootNavigator } from '.'

function NotificationsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back" />
    </View>
  )
}

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
      <Drawer.Screen name="Welcome" component={RootNavigator} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
    </Drawer.Navigator>
  )
}
