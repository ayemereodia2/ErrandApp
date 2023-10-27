import { AntDesign, Entypo } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity, useWindowDimensions, View } from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { TabBar, TabView } from 'react-native-tab-view'
import { RunnerDetails } from '../../components/ErrandUserDetails/Runner'
import { SenderDetails } from '../../components/ErrandUserDetails/Sender'

const renderScene = ({ route }: any) => {
  switch (route.key) {
    case 'first':
      return (
        <SenderDetails
          errand={route?.errand}
          userId={route?.userId}
          singleSubErrand={route?.singleSubErrand}
          manageErrandClicked={route?.manageErrandClicked}
          bids={route?.bids}
        />
      )
    case 'second':
      return (
        <RunnerDetails
          errand={route?.errand}
          userId={route?.userId}
          singleSubErrand={route?.singleSubErrand}
          manageErrandClicked={route?.manageErrandClicked}
          bids={route?.bids}
        />
      )
    default:
      return null
  }
}

const ErrandUserDetails = ({ navigation, route }: any) => {
  // const navigation = useNavigation()

  const {
    errand,
    userId,
    singleSubErrand,
    manageErrandClicked,
    bids,
  } = route.params

  // console.log(">>>>>errand.user", errand.bids[0].runner);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: '#F8F9FC' },
      title: 'Errand Details',
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 py-3 pr-8"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),

      headerRight: () => (
        <View className="pr-2">
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            {errand.status === 'open' ? (
              ''
            ) : (
              <MenuTrigger>
                <Entypo name="dots-three-vertical" color={'black'} size={16} />
              </MenuTrigger>
            )}
            <MenuOptions
              customStyles={{
                optionsContainer: {
                  padding: 4,
                  width: 150,
                  marginTop: 20,
                },
              }}
            >
              {errand.user_id === userId && errand?.status === 'active' && (
                <MenuOption
                  onSelect={() => {
                    // console.log(">>>>>>>errand", errand);
                    navigation.navigate('CompleteErrandModal', {
                      errand,
                      userId,
                      singleSubErrand,
                    })
                  }}
                  text="Completed Errand"
                  customStyles={{
                    optionWrapper: {
                      borderBottomWidth: 1,
                      borderBottomColor: '#AAAAAA',
                    },
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />
              )}

              {errand.user_id === userId &&
                singleSubErrand?.status === 'active' && (
                  <MenuOption
                    onSelect={() => {
                      // console.log(">>>>>>>errand", errand);
                      navigation.navigate('CompleteErrandModal', {
                        errand,
                        userId,
                        singleSubErrand,
                      })
                    }}
                    text="Completed Errand"
                    customStyles={{
                      optionWrapper: {
                        borderBottomWidth: 1,
                        borderBottomColor: '#AAAAAA',
                      },
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                )}

              {errand.user_id !== userId && errand?.status === 'active' && (
                <MenuOption
                  onSelect={() =>
                    navigation.navigate(
                      'AbandonErrandModal',
                      errand,
                      userId,
                      singleSubErrand,
                    )
                  }
                  text="Abandon Errand"
                  customStyles={{
                    optionWrapper: {
                      borderBottomWidth: 1,
                      borderBottomColor: '#AAAAAA',
                    },
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />
              )}
              {errand.user_id === userId && errand?.status === 'pending' && (
                <MenuOption
                  onSelect={() =>
                    navigation.navigate(
                      'CancelErrandModal',
                      errand,
                      userId,
                      singleSubErrand,
                    )
                  }
                  text="Cancel Errand"
                  customStyles={{
                    optionWrapper: {
                      borderBottomWidth: 1,
                      borderBottomColor: '#AAAAAA',
                    },
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />
              )}

              {errand.user_id === userId &&
                singleSubErrand?.status === 'active' && (
                  <MenuOption
                    onSelect={() =>
                      navigation.navigate(
                        'CancelErrandModal',
                        errand,
                        userId,
                        singleSubErrand,
                      )
                    }
                    text="Cancel Errand"
                    customStyles={{
                      optionWrapper: {
                        borderBottomWidth: 1,
                        borderBottomColor: '#AAAAAA',
                      },
                      optionText: { textAlign: 'center', fontWeight: '600' },
                    }}
                  />
                )}
            </MenuOptions>
          </Menu>
        </View>
      ),
    })
  }, [])

  const layout = useWindowDimensions()
  const [index, setIndex] = React.useState(0)

  const [routes] = useState([
    {
      key: 'first',
      title: 'Sender',
      errand,
      userId,
      singleSubErrand,
      manageErrandClicked,
      bids,
    },
    {
      key: 'second',
      title: 'Runner',
      errand,
      userId,
      singleSubErrand,
      manageErrandClicked,
      bids,
    },
  ])

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: '#3F60AC' }}
      style={{ backgroundColor: 'transparent', paddingHorizontal: 10 }}
      tabStyle={{ marginHorizontal: 10, border: 3 }}
      labelStyle={{
        color: '#000',
        fontWeight: '600',
        textTransform: 'capitalize',
      }}
    />
  )

  return (
    // <ScrollView>
    <TabView
      overScrollMode="auto"
      style={{ backgroundColor: '#F8F9FC' }}
      navigationState={{ index, routes }}
      renderTabBar={renderTabBar}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
    // </ScrollView>
  )
}

export default ErrandUserDetails
