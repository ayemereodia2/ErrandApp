// import { fetchMyErrands } from '@app/lib/errand/api'
import { Entypo, EvilIcons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect } from 'react'
import {
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useSelector } from 'react-redux'
import MyErrandCard from '../../components/MyErrandCard'
import { MyErrandEmptyState } from '../../components/MyErrandEmptyState'
import MyErrandToggle from '../../components/MyErrandToggle'
import { ProfileInitials } from '../../components/ProfileInitials'
import { myErrandList } from '../../services/errands/myErrands'
import { RootState, useAppDispatch } from '../../services/store'

const ErrandScreen = ({ navigation }: any) => {
  const navigate = useNavigation()

  const dispatch = useAppDispatch()
  const layout = useWindowDimensions()

  const { data: myErrands, loading } = useSelector(
    (state: RootState) => state.myErrandReducer,
  )

  const navigateToNewScreen = () => {
    navigation.navigate('MyErrandDetails')
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'My Errands',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 ">
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="flex-row items-center mb-2"
          >
            <ProfileInitials
              firstName="Azubike"
              lastName="Orji"
              textClass="text-white"
            />
            {/* <Entypo name="menu" size={24} /> */}
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-3 ">
          <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <MaterialIcons name="notifications" color={'black'} size={22} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
              <MenuTrigger>
                <Entypo name="dots-three-vertical" color={'black'} size={16} />
              </MenuTrigger>
              <MenuOptions
                customStyles={{
                  optionsContainer: {
                    padding: 4,
                    width: 100,
                    marginTop: 20,
                  },
                }}
              >
                <MenuOption
                  onSelect={() => alert(`Save`)}
                  text="Refresh"
                  customStyles={{
                    optionText: { textAlign: 'center', fontWeight: '600' },
                  }}
                />
              </MenuOptions>
            </Menu>
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    dispatch(myErrandList({}))
  }, [])

  return (
    <ScrollView>
      <View className="bg-[#F8F9FC]">
        {!myErrands ? (
          <MyErrandEmptyState />
        ) : (
          <>
            {loading ? (
              <ActivityIndicator color="blue" size="large" />
            ) : (
              <View>
                <View className="bg-[#F8F9FC] ">
                  <View className="mx-4 mt-4">
                    <View className="border-[0.3px] border-[#808080] h-12 rounded-lg flex-row items-center justify-between px-3">
                      <EvilIcons name="search" size={22} className="w-1/12" />
                      <TextInput
                        className=" w-9/12"
                        placeholder="Search for Errands or Bids"
                        placeholderTextColor="#808080"
                      />

                      <Image
                        style={{
                          width: 30,
                          height: 30,
                          resizeMode: 'contain',
                        }}
                        source={require('../../assets/images/filter.png')}
                      />
                    </View>
                  </View>
                </View>

                <MyErrandToggle />

                <ScrollView className="mt-6">
                  {myErrands?.map((errand, index) => {
                    return (
                      <View key={index}>
                        <MyErrandCard
                          index={index}
                          errand={errand}
                          navigation={navigation}
                        />
                      </View>
                    )
                  })}
                </ScrollView>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default ErrandScreen
