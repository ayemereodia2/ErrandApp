import { Image, Text, TouchableOpacity, View } from 'react-native'

type categoryProps = {
  icon: string
  name: string
  onPress: any
  id: string
  selectedItem: string
  identifier: string
  setOpenLists: any
}

export default function CategoryBox({
  icon,
  name,
  selectedItem,
  id,
  onPress,
  identifier,
  setOpenLists,
}: categoryProps) {
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(), identifier === 'view-list' && setOpenLists(true)
      }}
      className={`border-[1px] rounded-lg mx-2  ${
        selectedItem === id && `bg-[#CBD5EC]`
      }`}
    >
      <View className="cursor-pointer mx-auto">
        {identifier === 'view-list' ? (
          <img src={icon} alt="" width="50px" height="50px" />
        ) : (
          <View className="mx-4">
            {/* <embed
                src={icon}
                className="mx-auto"
              width="50px"
              height="50px"
              style={{
                color: 'red',
              }}
            /> */}
            {/* <Iconify icon={icon} width={50} height={50} className="mx-auto" /> */}
            <Image
              source={require('../../assets/images/bicycle.jpg')}
                className="mx-auto mt-[18px]"
                width={15} height={15}
            />
          </View>
        )}

        {/* <img
          src={icon}
          className="w-12 h-12 lg:w-16 lg:h-10 my-0 mx-auto"
          alt=""
        /> */}
        {/* <Image src={icon} width={12} height={12} alt="okay"/> */}
        <Text className="pt-3 lg:pt-4 text-xs md:text-sm text-center">
          {name}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
