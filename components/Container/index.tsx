import React, { ReactElement } from 'react'
import { SafeAreaView, View } from 'react-native'

interface ContainerProp {
  children: ReactElement
}

const Container = ({ children }: ContainerProp) => {
  return (
    <SafeAreaView style={{ backgroundColor: '#F8F9FC', flex: 1 }}>
      <View
        style={{
          flexDirection: 'column-reverse',
          marginBottom: 80,
        }}
      >
        {children}
      </View>
    </SafeAreaView>
  )
}

export default Container
