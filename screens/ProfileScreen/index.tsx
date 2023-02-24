import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'

export default function ProfileScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView>
    
    </SafeAreaView>
  )
}
