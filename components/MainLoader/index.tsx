import React from 'react'
import { Image, SafeAreaView, StyleSheet } from 'react-native'

const MainLoader = () => {
  const loaderGif = '../../assets/images/loading-SWAVE.gif'

  return (
    <SafeAreaView
      style={styles.container}
      // className="pt-20 bg-gray-200 w-screen h-[100vh] mt-5"
    >
      <Image
        style={styles.image}
        className="mx-auto"
        source={require(loaderGif)}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#0c1730',
  },
  image: {
    width: 150,
    height: 150,
  },
})

export default MainLoader
