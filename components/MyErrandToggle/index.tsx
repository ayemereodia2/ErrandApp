import React, { useState } from 'react'
import { View } from 'react-native'
import DropdownComponent from '../Picker/DropdownComponent'

interface ToggleProp {
  filterErrandByStatus: (status: string) => void
  filterBidByStatus: (status: string) => void
}

const MyErrandToggle = ({
  filterBidByStatus,
  filterErrandByStatus,
}: ToggleProp) => {
  const [value, setValue] = useState('')
  const [bidValue, setBidValue] = useState('')

  const BidsToggleData = [
    { label: 'All Bids', value: 'all' },
    { label: 'Pending Bids', value: 'pending' },
    { label: 'Active Bids', value: 'active' },
    { label: 'Cancelled Bids', value: 'cancelled' },
  ]

  const ErrandToggleData = [
    { label: 'All Errands', value: 'all' },
    { label: 'Pending Errands', value: 'pending' },
    { label: 'Active Errands', value: 'active' },
    { label: 'Cancelled Errands', value: 'cancelled' },
  ]

  return (
    <View className="mt-4 mx-4 flex-row">
      <View className="w-[180px]">
        <DropdownComponent
          placeHolder="My Bids"
          data={BidsToggleData}
          value={bidValue}
          setValue={filterBidByStatus}
        />
      </View>
      <View className="w-[180px]">
        <DropdownComponent
          placeHolder="My Errands"
          data={ErrandToggleData}
          value={value}
          setValue={filterErrandByStatus}
        />
      </View>
    </View>
  )
}

export default MyErrandToggle
