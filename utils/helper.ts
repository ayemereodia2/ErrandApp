import moment from "moment";
import { MarketData } from "../types";

export const formatDate = (dateString: string) => {
  const date = moment(dateString);
  return date.format('MMM DD, YYYY, h:mm:ss A');
}

export function formatMoney(value: string|number) {
    const naira = new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    })
    const nValue = Number(value) / 100
    
    return naira.format(nValue)
}

interface AddressProps {
  errand: MarketData
  setAddress: any
}

 export  const getAddress = async ({errand, setAddress}: AddressProps) => {
    let address = errand.pickup_address

    if (address === null) {
      address = errand.dropoff_address
    }

    if (address === null) {
      address = {
        address_text: "",
        type: 'Point',
        coordinates: [9.0820, 8.6753],
      }
    }

    const pickupLng = address.coordinates[0]
    const pickupLat = address.coordinates[1]

    // const pickupLng =
    //   errand.pickup_address === null
    //     ? errand.dropoff_address?.coordinates[0]
    //     : errand.pickup_address?.coordinates[0]
    // const pickupLat =
    //   errand.pickup_address === null
    //     ? errand.dropoff_address?.coordinates[1]
    //     : errand.pickup_address?.coordinates[1]

    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${pickupLat},${pickupLng}&key=${process.env.NEXT_PUBLIC_GOOGLE_KEYS}`,
      )
      const resJson = await res.json()

      setAddress(resJson.results[1].formatted_address)
    } catch (err) {
    }
 }

 export const currencyMask = (e: any) => {
  let value = e
   value = value.replace(/\D/g, "");
  value = value.replace(/(\d)(?=(\d{3})+$)/g, "$1,");
  e = value;
  return e;
 }

 export const parseAmount = (numberString: string) => {
  return parseInt(parseFloat(numberString.replace(/,/gi, '')).toFixed(0));
}

