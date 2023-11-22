import {
    Entypo,
    FontAwesome,
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
    MaterialIcons,
  } from '@expo/vector-icons'
  import { Text, TouchableOpacity, View } from 'react-native'
  import { useSelector } from 'react-redux'
  import { RootState } from '../../services/store'
  // import { categ\\\ } from '../../utils/categories'
  
  type categoryProps = {
    icon: any
    name?: string
    onPress: any
    id: string
    selectedItem: string
    identifier: string
    setOpenLists: any
    index: number
    iconType?: string
  }
  
  export default function HomeCategory({
    icon,
    name,
    selectedItem,
    id,
    onPress,
    identifier,
    setOpenLists,
    index,  
    iconType,
  }: categoryProps) {
    const {
      data: currentUser,
      backgroundTheme,
      textTheme,
      landingPageTheme,
    } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  
    const theme = currentUser?.preferred_theme === 'light' ? true : false
  
    return (
      <TouchableOpacity
        onPress={() => {
          onPress(), identifier === 'view-list' && setOpenLists(true)
        }}
        style={{ borderColor: textTheme }}
        className={`border-[0.2px] h-28 rounded-lg mx-2 p-2  ${
          selectedItem === id && `bg-[#CBD5EC]`
        }`}
      >
        <View className="cursor-pointer mx-auto">
          {identifier === 'view-list' ? (
            <img src={icon} alt="" width="50px" height="50px" />
          ) : (
            <View className="mx-auto pt-2">
              {iconType === 'FontAwesome' ? (
                <FontAwesome name={icon} size={30} color={textTheme} />
              ) : iconType === 'MaterialIcons' ? (
                <MaterialIcons name={icon} size={40} color={textTheme} />
              ) : iconType === 'MaterialCommunityIcons' ? (
                <MaterialCommunityIcons name={icon} size={40} color={textTheme} />
              ) : iconType === 'FontAwesome5' ? (
                <FontAwesome5 name={icon} size={40} color={textTheme} />
              ) : iconType === 'Entypo' ? (
                <Entypo name={icon} size={40} color={textTheme} />
              ) : iconType === 'Ionicons' ? (
                <Ionicons name={icon} size={40} color={textTheme} />
              ) : (
                ''
              )}
            </View>
          )}
  
          {/* <img
            src={icon}
            className="w-12 h-12 lg:w-16 lg:h-10 my-0 mx-auto"
            alt=""
          /> */}
          {/* <Image src={icon} width={12} height={12} alt="okay"/> */}
          <Text
            style={{ color: textTheme }}
            className="pt-3 lg:pt-4 text-xs md:text-sm text-center"
          >
            {name}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
  