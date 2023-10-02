import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import GuestDetails from '../screens/Guest/GuestDetails'
import GuestScreen from '../screens/Guest/GuestScreen'
import OnboardingUi from '../screens/Onboarding/OnboardingUi'
// Import other guest-related screens as needed

const Stack = createNativeStackNavigator()

export function GuestNavigator() {

  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingUi}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="GuestScreen"
          component={GuestScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GuestDetails"
          component={GuestDetails}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  )
}
