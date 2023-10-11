import React, { ReactElement } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

interface ContainerProp {
  children: ReactElement
}

const Container = ({ children }: ContainerProp) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  return (
    <SafeAreaView style={{ backgroundColor: backgroundTheme, flex: 1 }}>
      <View
        style={{
          flexDirection: 'column-reverse',
          marginBottom: Platform.OS === 'android' ? 70 : 35,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  )
}

export default Container
