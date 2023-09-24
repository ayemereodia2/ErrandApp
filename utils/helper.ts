import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import { userDetails } from "../services/auth/userInfo";
import { MarketData } from "../types";
import banks from "../assets/bank.json"

export const formatDate = (dateString: string) => {
  const date = moment(dateString);
  return date.format('MMM DD, YYYY, h:mm:ss A');
}

export function transformDateTime(TzDate: Date) {
    const year = TzDate.getFullYear();
    const month = String(TzDate.getMonth() + 1).padStart(2, '0');
    const day = String(TzDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export function getBankName(code: string): string {
    for(let bank of banks) {
        if (bank.code == code) {
            return bank.name
        }
    }
    return ""
}

export function getBankIcon(code: string): string {
    for(let bank of banks) {
        if (bank.code == code) {
            return bank.logo
        }
    }
    return ""
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

 export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMilliseconds = now.getTime() - date.getTime();

  // Calculate the time difference in minutes
  const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));

  if (diffMinutes < 1) {
    return "just now";
  } else if (diffMinutes < 60) {
    return diffMinutes + " mins ago";
  } else if (diffMinutes < 1440) {
    const diffHours = Math.floor(diffMinutes / 60);
    return diffHours + " hours ago";
  } else {
    const diffDays = Math.floor(diffMinutes / 1440);
    return diffDays + " days ago";
  }
 }

interface getUserIdProps {
  setFirstName: React.Dispatch<React.SetStateAction<string>>
  setLastName: React.Dispatch<React.SetStateAction<string>>
  setProfilePic: React.Dispatch<React.SetStateAction<string>>
  dispatch: any
  setUserId: React.Dispatch<React.SetStateAction<string>>
 }

 export const getUserId = async ({setFirstName, setLastName, setProfilePic, setUserId, dispatch}: getUserIdProps) => {
    const userId = (await AsyncStorage.getItem('user_id')) || ''
    const first_name = (await AsyncStorage.getItem('first_name')) || ''
    const last_name = (await AsyncStorage.getItem('last_name')) || ''
    const profile_pic = (await AsyncStorage.getItem('profile_pic')) || ''
    setFirstName(first_name)
    setLastName(last_name)
    setProfilePic(profile_pic)
    setUserId(userId)
    dispatch(userDetails({ user_id: userId }))
 }
  
   export const categoryLists = [
    {
      id: '64ac0a0a3534efb7dcd9d506',
      icon: "shopping-bag",
      name: 'Market / Groceries Shopping',
      identifier: 'Market / Groceries Shopping',
      type: "service",
      iconType: "FontAwesome"
    },
    {
      id: '64ac0b3e3534efb7dcd9d50b',
      icon: 'local-laundry-service',
      name: 'Laundry service',
      identifier: 'Laundry service',
      type: "service",
      iconType: 'MaterialIcons'
    },
    {
      id: '64ac0bb33534efb7dcd9d50f',
      icon: 'truck-delivery',
      name: 'Delivery',
      identifier: 'Delivery',
      type: "service",
      iconType: 'MaterialCommunityIcons'
    },
    {
      id: '64ac10203534efb7dcd9d517',
      icon: 'clean-hands',
      name: 'Cleaning/home service',
      identifier: 'Cleaning/home service',
      type: "service",
      iconType: 'MaterialIcons'

    },
    {
      id: '64ac10323534efb7dcd9d518',
      icon: 'run-fast',
      name: 'Any Errand',
      identifier: 'Any Errand',
      type: "service",
      iconType: 'MaterialCommunityIcons'

    },
    {
      id: '64ac10953534efb7dcd9d519',
      icon: 'work',
      name: 'General Labour',
      identifier: 'General Labour',
      type: "task",
      iconType: 'MaterialIcons'
      
    },
    {
      id: '64ac10f43534efb7dcd9d51b',
      icon: 'chalkboard-teacher',
      name: 'Home Teacher',
      identifier: 'Home Teacher',
      type: "task",
      iconType:'FontAwesome5'
    },
    {
      id: '64ac115f3534efb7dcd9d51c',
      icon: 'video-camera',
      name: 'Photo / Video Production ',
      identifier: 'Photo / Video Production ',
      type: "task",
      iconType: "FontAwesome"
      
    },
    {
      id: '64ac11ef3534efb7dcd9d51d',
      icon: 'mdi:mechanic',
      name: 'Repairers (Mechanic, Plumber, Carpenter)',
      identifier: 'Repairers (Mechanic, Plumber, Carpenter)',
      type:"task",
    },
    {
      id: '64ac11f23534efb7dcd9d51e',
      icon: 'medical-icon:social-services',
      name: 'Professional Services',
      identifier: 'Professional Services',
      type:"task",
    },
    {
      id: '64ac12313534efb7dcd9d51f',
      icon: 'mdi:construction-outline',
      name: 'Builder / Construction Worker',
      identifier: 'Builder / Construction Worker',
      type: "service"
    },
    {
      id: '64ac12453534efb7dcd9d520',
      icon: 'material-symbols:travel',
      name: 'Travel Agency ',
      identifier: 'Travel Agency ',
      type: "service"
    },
    {
      id: '64ac125f3534efb7dcd9d521',
      icon: 'mdi:event',
      name: 'Event / Surprise Planner',
      identifier: 'Event / Surprise Planner',
      type: "service"
    },
    {
      id: '64ac12803534efb7dcd9d522',
      icon: 'tabler:car',
      name: 'Car Ride & Car Hire',
      identifier: 'Car Ride & Car Hire',
      type: "service"
    },
    {
      id: '64ac12b03534efb7dcd9d523',
      icon: 'fa-solid:baby',
      name: 'Baby Sitting / House Nannies',
      identifier: 'Baby Sitting / House Nannies',
      type:"task",
    },
    {
      id: '64ac14733534efb7dcd9d525',
      icon: 'clarity:house-solid',
      name: ' House Mover / Removalist',
      identifier: ' House Mover / Removalist',
      type:"task",
    },
    {
      id: '64ac14a43534efb7dcd9d526',
      icon: 'mingcute:cake-line',
      name: 'Catering / Chef Service',
      identifier: 'Catering / Chef Service',
      type:"task",
    },
    {
      id: '64ac14d53534efb7dcd9d527',
      icon: 'la:salesforce',
      name: 'Sales Persons',
      identifier: 'Sales Persons',
      type:"task",
    },
    {
      id: '64ac15323534efb7dcd9d528',
      icon: 'icon-park-outline:barber-clippers',
      name: 'Barber / Hair Stylist',
      identifier: 'Barber / Hair Stylist',
      type:"task",
    },
    {
      id: '64ac15603534efb7dcd9d529',
      icon: 'fluent:design-ideas-24-filled',
      name: 'Fashion Designer ',
      identifier: 'Fashion Designer ',
      type:"task",
    },
    {
      id: '64ac15ab3534efb7dcd9d52a',
      icon: 'icon-park-solid:graphic-design',
      name: 'Web / Graphic Designer',
      identifier: 'Web / Graphic Designer',
      type:"task",
    },
    {
      id: '64ac187b3534efb7dcd9d534',
      icon: 'icon-park-solid:hair-dryer',
      name: 'Hair dressing',
      identifier: 'Hair dressing',
      type:"task",
    },
  ]

 
  

