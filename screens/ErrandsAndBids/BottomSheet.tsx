import { View, Text } from 'react-native'
import React, { useRef } from 'react'
import {BottomSheetModal} from "@gorhom/bottom-sheet"

const BottomSheet = ({bottomSheetModalRef, snapPoint}:any) => {
    
    const bottomSheetModalref = useRef(null);

    const snapPoints = ["48%"]


  return (

    <BottomSheetModal
    ref={bottomSheetModalref}
    index={0}
    snapPoints={snapPoints}
    
    >
    <View>
      <Text>BottomSheetModal</Text>
    </View>
    </BottomSheetModal>
  )
}

export default BottomSheet