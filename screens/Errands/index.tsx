import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, useWindowDimensions, View } from 'react-native'
import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
import OngoingErrands from '../../components/Ongoing'

const FirstRoute = () => (
  <View>
    <OngoingErrands />
    <OngoingErrands />
  </View>
)

const SecondRoute = () => (
  <View>
    <OngoingErrands />
    <OngoingErrands />
  </View>
)

const ThirdRoute = () => (
  <View>
    <OngoingErrands />
    <OngoingErrands />
  </View>
)

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
})

const ErrandScreen = () => {
  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'ongoing' },
    { key: 'second', title: 'Bids' },
    { key: 'third', title: 'Completed' },
  ])

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      // indicatorStyle={{ backgroundColor: 'white' }}
      style={{ backgroundColor: 'white' }}
      labelStyle={{ color: 'black', fontSize: 10, textTransform: 'capitalize' }}
      // indicatorContainerStyle={{ backgroundColor: 'red' }}
      // renderIndicator={{}}
      indicatorStyle={{ backgroundColor: '#243763' }}
    />
  )

  return (
    <>
      {/* <View className="flex-row items-center mx-0 px-2 pt-5 shadow-lg bg-white">
        <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
        <View className="flex-row items-center">
          <View className="flex-row items-center justify-center">
            <Text
              // style={{ fontFamily: 'AbrilFatface_400Regular' }}
              className=" text-[#243763] text-xl pl-24 pb-0 pt-2"
            >
              My Errands
            </Text>
          </View>
        </View>
      </View> */}
      <TabView
        style={{ backgroundColor: 'white' }}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
      />
    </>

    // </View>
  )
}

export default ErrandScreen
