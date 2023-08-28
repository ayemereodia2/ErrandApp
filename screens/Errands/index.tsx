// import { MaterialIcons } from '@expo/vector-icons'
// import React from 'react'
// import { Text, useWindowDimensions, View } from 'react-native'
// // import { SceneMap, TabBar, TabView } from 'react-native-tab-view'
// // // import OngoingErrands from '../../components/Ongoing'

// /* const FirstRoute = () => (
//   <View>
//     <OngoingErrands />
//     <OngoingErrands />
//   </View>
// )

// const SecondRoute = () => (
//   <View>
//     <OngoingErrands />
//     <OngoingErrands />
//   </View>
// )

// const ThirdRoute = () => (
//   <View>
//     <OngoingErrands />
//     <OngoingErrands />
//   </View>
// )

// const renderScene = SceneMap({
//   first: FirstRoute,
//   second: SecondRoute,
//   third: ThirdRoute,
// }) 

// const ErrandScreen = () => {
//   const layout = useWindowDimensions()
//   const [index, setIndex] = React.useState(0)
//   const [routes] = React.useState([
//     { key: 'first', title: 'ongoing' },
//     { key: 'second', title: 'Bids' },
//     { key: 'third', title: 'Completed' },
//   ]) 

//   const renderTabBar = (props: any) => (
//     <TabBar
//       {...props}
//       // indicatorStyle={{ backgroundColor: 'white' }}
//       style={{ backgroundColor: 'white' }}
//       labelStyle={{ color: 'black', fontSize: 10, textTransform: 'capitalize' }}
//       // indicatorContainerStyle={{ backgroundColor: 'red' }}
//       // renderIndicator={{}}
//       indicatorStyle={{ backgroundColor: '#243763' }}
//     />
//   )  

//   return (
//     <>
//       <View className="flex-row items-center mx-0 mt-4 px-2 pt-5 shadow-lg bg-white">
//         <MaterialIcons name="keyboard-arrow-left" size={30} color="black" />
//         <View className="flex-row items-center">
//           <View className="flex-row items-center justify-center">
//             <Text
//               // style={{ fontFamily: 'AbrilFatface_400Regular' }}
//               className=" text-[#243763] text-xl pl-24 pb-0 pt-2"
//             >
//               My Errands
//             </Text>
//           </View>
//         </View>
//         {/* <EvilIcons name="search" size={30} color="#243763" /> } */
//      /* </View>
//       <TabView
//         style={{ backgroundColor: 'white' }}
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         initialLayout={{ width: layout.width }}
//         renderTabBar={renderTabBar}
//       />
//     </>

//     // </View>
//   )
// } */



// // export default ErrandScreen


import { MaterialIcons, Ionicons, EvilIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
 import { Image, Text, TextInput, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'


const ErrandScreen = ({navigation}:any)  => {
 

  const layout = useWindowDimensions()

  const navigateToNewScreen = () => {
    navigation.navigate('ErrandsAndBids'); 
  };

 



  return (
    <ScrollView>
    <View>
    <View className="flex-row items-center mx-0 mt-0.4 px-2 pt-14 pb-10 shadow-lg bg-[#243763]">
            <View className="flex-row items-center">
            <MaterialIcons
                onPress={() => navigation.openDrawer()}
                name="menu"
                size={30}
                color="#fff"
               
              />
              <View className="flex-row items-center justify-center">
                 <Text
                  // style={{ fontFamily: 'AbrilFatface_400Regular' }}
                   className=" text-[#fff] text-[20px] px-0 pl-24 pb-0 pt-2"
                 >
                  My Errands
                </Text>
              </View>
            </View>
            </View>

            <View className='ml-[16px] flex-row justify-center items-center gap-2 mt-2 relative'>
            <TextInput  className='w-[342px] h-[42px] pl-[8px] text-center justify-center pr-[186px] pt-[8px] pb-[16px] bg-[#DAE1F1] mt-[16px] b rounded-[5px] items-center'
            placeholder='Find an Errand'

            />
            <View className='w-[40px] h-[40px] bg-[#243763] justify-center items-center b rounded-md'><Ionicons name="filter" size={24} color="white"/></View>
            <View  className='absolute top-3 left-5'><EvilIcons name="search" size={24} color="black" /></View>
            </View>

          <ScrollView>
          <TouchableWithoutFeedback className='b bottom-2 border-b border-gray-200 shadow-sm rounded-sm' onPress={navigateToNewScreen} >
              <View className='w-[398px] h-[66px] mt-[28px] mb-8  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/timothy.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
                <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              
                </View>
                
             
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4 '>
                  <Text className='text-white text-center'>2</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12 items-center mb-3'>
                <View className='bg-yellow-200 b rounded-full p-1'><Text>open</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableWithoutFeedback>

            <TouchableOpacity className='b bottom-2 border-b border-gray-200 shadow-sm'>
              <View className='w-[398px] h-[66px] mt-[28px] mb-8  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/giana.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
              
                </View>
                
              <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4 '>
                  <Text className='text-white text-center'>2</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12 items-center mb-3'>
                <View className='bg-yellow-200 b rounded-full p-1'><Text>open</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableOpacity>


              <TouchableOpacity className='b bottom-2 border-b border-gray-200 shadow-sm rounded-sm'>

              <View className='w-[398px] h-[66px] mt-[28px] mb-8  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/kaiya.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
              
                </View>
                
              <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4'>
                  <Text className='text-white text-center'>1</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12  items-center mb-3'>
                <View className='bg-green-200 b rounded-full p-1'><Text>active</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableOpacity>


              <TouchableOpacity className='b bottom-2 border-b border-gray-200 shadow-sm rounded-sm'>

              <View className='w-[398px] h-[66px] mt-[28px] mb-8  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/alena.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
              
                </View>
                
              <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4 '>
                  <Text className='text-white text-center'>2</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12 mb-3 items-center'>
                <View className='bg-green-200 b rounded-full p-1'><Text>active</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableOpacity>



              <TouchableOpacity className='b bottom-2 border-b border-gray-200 shadow-sm rounded-sm'>

              <View className='w-[398px] h-[66px] mt-[28px] mb-8  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/kaiya.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
              
                </View>
                
              <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4 mb-2'>
                  <Text className='text-white text-center'>2</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12 items-center mb-3'>
                <View className='bg-yellow-200 b rounded-full p-1'><Text>open</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableOpacity>


              <TouchableOpacity className='b bottom-2 border-b border-gray-200 shadow-sm rounded-sm'>

              <View className='w-[398px] h-[66px] mt-[28px] mb-8  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/madelyn.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
              
                </View>
                
              <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4 '>
                  <Text className='text-white text-center'>2</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12 mb-3 items-center'>
                <View className='bg-green-200 b rounded-full p-1'><Text>active</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableOpacity>


              <TouchableOpacity className='b bottom-2 border-b border-gray-200 shadow-sm rounded-sm'>

              <View className='w-[398px] h-[66px] mt-[28px] mb-8  ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/kaiya.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
              
                </View>
                
              <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4 '>
                  <Text className='text-white text-center'>2</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12 mb-3 items-center'>
                <View className='bg-yellow-200 b rounded-full p-1'><Text>open</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableOpacity>

              <TouchableOpacity className='b bottom-2 border-b border-gray-200 shadow-sm rounded-sm'>

              <View className='w-[398px] h-[66px] mt-[28px] mb-8 ml-[16px] mr-[16px]'>
              <View className=' flex-row items-start justify-between pr-2'>
                <View className='flex-row items-start gap-3'>
                <Image
                  source={require('../../assets/images/alena.jpg')}
                  style={{ width: 50, height: 50, borderRadius: 50 }}
               /> 
               <View><Text className='text-[#011E3E] text-base'>I need someone to help with laundry</Text></View>
              
                </View>
                
              <View >
              <Text className='pt-1.5 text-xs'>4 days ago</Text>
              </View>
              </View>

              <View className='flex-row  items-start justify-between ml-16 mt-[-18px] mb-4 '>
                <Text>my errand</Text>
                <View className='mr-6 b rounded-full bg-green-500 w-4 '>
                  <Text className='text-white text-center'>2</Text>
                  </View>
                
              </View>
              <View className='flex-row gap-4 ml-12 mb-3 items-center'>
                <View className='bg-green-200 b rounded-full p-1'><Text>active</Text></View>
                <Text>Delivery</Text>
              </View>
              </View>
              </TouchableOpacity>

              </ScrollView>
           
            </View>
            
            </ScrollView>
  )
}

export default ErrandScreen;