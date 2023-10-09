import React, { ReactElement } from 'react'
import { Platform, SafeAreaView, View } from 'react-native'

interface ContainerProp {
  children: ReactElement
}

const Container = ({ children }: ContainerProp) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#F8F9FC', flex: 1 }}>
      <View
        style={{
          flexDirection: 'column-reverse',
          marginBottom: Platform.OS === 'android' ? 70 : 40,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  )
}

export default Container
