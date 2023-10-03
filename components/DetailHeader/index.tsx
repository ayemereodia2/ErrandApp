import { MarketData, SingleSubErrand } from '../../types'

interface infoProp {
  errand: MarketData
  user_id: string
  manageErrandClicked: boolean
  singleSubErrand: SingleSubErrand
}

export const DetailHeader = ({
  errand,
  user_id,
  manageErrandClicked,
  singleSubErrand,
}: infoProp) => {
  if (
    // for the sender
    (user_id === errand?.user_id && errand?.status === 'open') ||
    (user_id === errand?.user_id && errand?.status === 'pending')
  ) {
    return manageErrandClicked ?  'Errands TimeLine' : 'Bids on your Errand'
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
  if (errand?.status === 'completed') {
    return 'Errand TimeLine'
  }
}
