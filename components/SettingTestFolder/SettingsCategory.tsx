import { EvilIcons } from '@expo/vector-icons'
import AntDesign from '@expo/vector-icons/AntDesign'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { getCategoryIntersts } from '../../services/settings/getCategoryInterests'
import { RootState, useAppDispatch } from '../../services/store'

const SettingsCategory = ({ navigation, interests }: any) => {
  const [loading, setLoading] = useState(false)
  // const [interests, setInterests] = useState([])
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  const dispatch = useAppDispatch()

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const deleteCategoryInterest = async (category_interest: string[]) => {
    const _rs = await _fetch({
      method: 'PATCH',
      _url: `/user/update/category-interest`,
      body: { category_interest },
    })

    const rs = await _rs.json()

    console.log('>>>>', rs)

    if (rs.success === true) {
      dispatch(getCategoryIntersts())
      Toast.show({
        type: 'success',
        text1: 'Category has been deleted successfully',
      })
    }
  }

  if (loading) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CategoryInterest')}
        className=""
      >
        <View
          style={{ backgroundColor: theme ? '#152955' : 'white' }}
          className="py-3 px-4 w-[149px] rounded-full border border-[#3F60AC] mt-4 items-center flex-row space-x-4"
        >
          <Text
            style={{ color: textTheme }}
            className="text-black items-center justify-center"
          >
            Laundry Services
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  // const [selected, setSelected] = useState([])

  return (
    <View>
      <View className="mt-8 ml-4">
        <Text
          style={{ color: textTheme }}
          className="pb-2 text-base font-bold leading-6"
        >
          CATEGORY INTERESTS
        </Text>
        <Text style={{ color: textTheme }} className="text-[14px]">
          Notifications on all general activities on Swave
        </Text>
      </View>

      <View style={styles.container} className="">
        {!interests ? (
          <Text>No Category Interest Added</Text>
        ) : (
          interests
            // .splice(0, 6)
            // .filter((item) => typeof item === 'string')
            .map((categoryName: string, index: number) => (
              <View className="flex-row mt-3" key={index}>
                <TouchableOpacity
                  className="border-[#aaa] border px-4 py-1 rounded-xl bg-white relative"
                  style={{
                    backgroundColor: theme ? '#1E3A79' : 'white',
                  }}
                  key={index}
                >
                  <Text className="text-base" style={{ color: textTheme }}>
                    {categoryName}
                  </Text>
                </TouchableOpacity>
                <EvilIcons
                  className="absolute -left-40 "
                  name="trash"
                  color="red"
                  size={20}
                  onPress={() => {
                    const newInterests = interests.filter(
                      (interest: string) => interest !== categoryName,
                    )
                    // console.log('>>>>>newInterests', newInterests)
                    deleteCategoryInterest(newInterests)
                  }}
                />
              </View>
            ))
        )}

        <TouchableOpacity
          onPress={() => navigation.navigate('CategoryInterest')}
          className=""
        >
          <View
            style={{ backgroundColor: theme ? '#152955' : 'white' }}
            className="py-3 px-4 w-[149px] rounded-full bg-[#3F60AC] mt-4 items-center flex-row space-x-4"
          >
            <Text
              className="text-white items-center justify-center"
              style={{ color: textTheme }}
            >
              Add Category
            </Text>
            <AntDesign name="pluscircle" size={16} color={textTheme} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#3F60AC',
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
})

export default SettingsCategory
