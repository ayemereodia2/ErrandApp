import { ActivityIndicator } from 'react-native'
import { MarketData, SingleSubErrand } from '../../types'

interface infoProp {
  errand: MarketData
  user_id: string
  manageErrandClicked: boolean
  singleSubErrand: SingleSubErrand
  loader: boolean | undefined
}

export const DetailHeader = ({
  errand,
  user_id,
  manageErrandClicked,
  singleSubErrand,
  loader,
}: infoProp) => {
  // if (loader) {
  //   return <ActivityIndicator color="blue" size="small" />
  // }

  if (
    // for the sender
    (user_id === errand?.user_id && errand?.status === 'open') ||
    (user_id === errand?.user_id && errand?.status === 'pending') ||
    (user_id === errand?.user_id && errand?.status === 'cancelled')
  ) {
    return manageErrandClicked ? 'Errands TimeLine' : 'Bids on your Errand'
  }
  if (
    // for the runner
    (user_id !== errand?.user_id && errand?.status === 'open') ||
    (user_id !== errand?.user_id && errand?.status === 'pending')
  ) {
    return 'Your Bid on this Errand'
  }
  if (singleSubErrand?.status === 'active' && manageErrandClicked) {
    return 'Errands TimeLine'
  }

  if (errand?.status === 'active') {
    return 'Errand TimeLine'
  }
  if (errand?.status === 'abandoned') {
    return 'Errand TimeLine'
  }
  if (errand?.status === 'completed') {
    return 'Errand TimeLine'
  }
}
