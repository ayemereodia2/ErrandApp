import React from 'react'
import { MarketData } from '../../types'
import Bids from '../MyBidDetails'

interface BidWrapperProp {
  userId: string
  errand: MarketData
  navigation: any
  openBidModal: any
}
const BidWrapper = ({
  userId,
  errand,
  openBidModal,
  navigation,
}: BidWrapperProp) => {
  return (
    <>
      {userId === errand.user_id && errand.status === 'open' && (
        <>
          {errand?.bids.map((bid) => {
            if (bid.state === 'rejected') {
              return null
            }
            let hags = bid.haggles
            let hag = {}
            hags.map((h) => {
              if (h.source === 'runner') {
                hag = h
              }
            })

            return <Bids navigation={navigation} openBidModal={openBidModal} />
          })}
        </>
      )}
    </>
  )
}

export default BidWrapper
