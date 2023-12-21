import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import moment from "moment";
import validator from 'validator';
import banks from "../assets/bank.json";
import { navigateToScreen } from "../navigation/StackNavigation";
import { currentUserDetails } from "../services/auth/currentUserInfo";
import { userDetails } from "../services/auth/userInfo";
import { MarketData, PaymentChannels } from "../types";

export const formatDate = (dateString: string) => {
  const date = moment(dateString);
  return date.format('MMM DD, YYYY, h:mm:ss A');
}

export function getTimeOfDay() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour >= 6 && currentHour < 12) {
    return "Morning";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Afternoon";
  } else {
    return "Evening";
  }
}

export const getAppVersion = async () => {
  const versionCode = '1.0.5'
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/mobileversion`)
      .then((rs) => rs.json())
      .then((rs) => {
          if (versionCode !== rs.Android) {
            navigateToScreen('UpdateApp')
          }
      })
  }

// export function formatDesc(html: string) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, 'text/html');
//     const desc = doc.body.textContent || ""

//     if (desc.length >= 50) {
//         let concatenatedString = desc.substring(0, 50).concat()
//         return concatenatedString + '...'
//     }

//     return desc
// }

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

 export function getCardTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMilliseconds = now.getTime() - date.getTime();

  // Calculate the time difference in minutes
   const diffMinutes = Math.floor(diffMilliseconds / (1000 * 60));
   
  //  console.log(">>>>>>diffMinutes", diffMinutes);
   

  if (diffMinutes < 1) {
    return "now";
  } else if (diffMinutes < 60) {
    return diffMinutes + "m ";
  } else if (diffMinutes < 1440) {
    const diffHours = Math.floor(diffMinutes / 60);
    return diffHours + "h ";
  } else if (diffMinutes < 10080) {
    const diffDays = Math.floor(diffMinutes / 1440);
    return diffDays + "d ";
  } else if (diffMinutes < 40320) {
    const diffWeeks = Math.floor(diffMinutes / 10080);
    return diffWeeks + "w ";
  } else {
    const diffMonths = Math.floor(diffMinutes / 40320);
    return diffMonths + "mo ";
  }
 }

interface getUserIdProps {
  setFirstName?: any
  setLastName?: any
  setProfilePic?:any
  dispatch?: any
  setUserId?: any
  setTheme?: any
  setToken?: any
 }

 export const getUserId = async ({setFirstName, setLastName, setProfilePic, setUserId, setTheme, dispatch, setToken}: getUserIdProps) => {
    const userId = (await AsyncStorage.getItem('user_id')) || ''
    const first_name = (await AsyncStorage.getItem('first_name')) || ''
    const last_name = (await AsyncStorage.getItem('last_name')) || ''
   const profile_pic = (await AsyncStorage.getItem('profile_pic')) || ''
   const token = (await AsyncStorage.getItem('accessToken')) || ''
   
   const theme = await AsyncStorage.getItem('theme') || ''
    if (setFirstName || setLastName || setProfilePic || setUserId || token) {
      setFirstName(first_name)
      setLastName(last_name)
      setProfilePic(profile_pic)
      setUserId(userId)
      setTheme(theme)
      setToken(token)
   }
   
   dispatch(userDetails({ user_id: userId }))
   dispatch(currentUserDetails({user_id: userId}))
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
      icon: 'car-repair',
      name: 'Repairers (Mechanic, Plumber, Carpenter)',
      identifier: 'Repairers (Mechanic, Plumber, Carpenter)',
      type: "task",
      iconType: 'MaterialIcons'
    },
    {
      id: '64ac11f23534efb7dcd9d51e',
      icon: 'users',
      name: 'Professional Services',
      identifier: 'Professional Services',
      type: "task",
      iconType: "FontAwesome"
    },
    {
      id: '64ac12313534efb7dcd9d51f',
      icon: 'construct',
      name: 'Builder / Construction Worker',
      identifier: 'Builder / Construction Worker',
      type: "service",
      iconType: "Ionicons"
    },
    {
      id: '64ac12453534efb7dcd9d520',
      icon: 'bus',
      name: 'Travel Agency ',
      identifier: 'Travel Agency ',
      type: "service",
      iconType: "FontAwesome"
    },
    {
      id: '64ac125f3534efb7dcd9d521',
      icon: 'event-available',
      name: 'Event / Surprise Planner',
      identifier: 'Event / Surprise Planner',
      type: "service",
      iconType: "MaterialIcons"
    },
    {
      id: '64ac12803534efb7dcd9d522',
      icon: 'car-side',
      name: 'Car Ride / Car Hire',
      identifier: 'Car Ride & Car Hire',
            type: "service",
      iconType: "FontAwesome5"
    },
    {
      id: '64ac12b03534efb7dcd9d523',
      icon: 'baby-carriage',
      name: 'Baby Sitting / House Nannies',
      identifier: 'Baby Sitting / House Nannies',
            type: "service",
       iconType: "FontAwesome5"
    },
    {
      id: '64ac14733534efb7dcd9d525',
      icon: 'laptop-house',
      name: ' House Mover / Removalist',
      identifier: ' House Mover / Removalist',
      type: "task",
      iconType: "FontAwesome5"
    },
    {
      id: '64ac14a43534efb7dcd9d526',
      icon: 'birthday-cake',
      name: 'Catering / Chef Service',
      identifier: 'Catering / Chef Service',
      type: "task",
      iconType: "FontAwesome"
      
    },
    {
      id: '64ac14d53534efb7dcd9d527',
      icon: 'bar-chart',
      name: 'Sales Persons',
      identifier: 'Sales Persons',
      type: "task",
      iconType: "FontAwesome"
    },
    {
      id: '64ac15323534efb7dcd9d528',
      icon: 'hair-dryer',
      name: 'Barber / Hair Stylist',
      identifier: 'Barber / Hair Stylist',
      type: "task",
      iconType: "MaterialCommunityIcons"
    },
    {
      id: '64ac15603534efb7dcd9d529',
      icon: 'slideshare',
      name: 'Fashion Designer ',
      identifier: 'Fashion Designer ',
      type: "task",
      iconType: "Entypo",
    },
    {
      id: '64ac15ab3534efb7dcd9d52a',
      icon: 'web-check',
      name: 'Web / Graphic Designer',
      identifier: 'Web / Graphic Designer',
      type: "task",
      iconType: "MaterialCommunityIcons",
    },
    {
      id: '64ac187b3534efb7dcd9d534',
      icon: 'brush-variant',
      name: 'Hair dressing',
      identifier: 'Hair dressing',
      type: "task",
      iconType: "MaterialCommunityIcons",
    },
   ]

   export const newCategories = [
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
      icon: 'car-repair',
      name: 'Repairers (Mechanic, Plumber, Carpenter)',
      identifier: 'Repairers (Mechanic, Plumber, Carpenter)',
      type: "task",
      iconType: 'MaterialIcons'
    },
    {
      id: '64ac11f23534efb7dcd9d51e',
      icon: 'users',
      name: 'Professional Services',
      identifier: 'Professional Services',
      type: "task",
      iconType: "FontAwesome"
    },
    {
      id: '64ac12313534efb7dcd9d51f',
      icon: 'construct',
      name: 'Builder / Construction Worker',
      identifier: 'Builder / Construction Worker',
      type: "service",
      iconType: "Ionicons"
    },
    {
      id: '64ac12453534efb7dcd9d520',
      icon: 'bus',
      name: 'Travel Agency ',
      identifier: 'Travel Agency ',
      type: "service",
      iconType: "FontAwesome"
    },
    {
      id: '64ac125f3534efb7dcd9d521',
      icon: 'event-available',
      name: 'Event / Surprise Planner',
      identifier: 'Event / Surprise Planner',
      type: "service",
      iconType: "MaterialIcons"
    },
    {
      id: '64ac12803534efb7dcd9d522',
      icon: 'car-side',
      name: 'Car Ride / Car Hire',
      identifier: 'Car Ride & Car Hire',
            type: "service",
      iconType: "FontAwesome5"
    },
    {
      id: '64ac12b03534efb7dcd9d523',
      icon: 'baby-carriage',
      name: 'Baby Sitting / House Nannies',
      identifier: 'Baby Sitting / House Nannies',
            type: "service",
       iconType: "FontAwesome5"
    },
    {
      id: '64ac14733534efb7dcd9d525',
      icon: 'laptop-house',
      name: ' House Mover / Removalist',
      identifier: ' House Mover / Removalist',
      type: "task",
      iconType: "FontAwesome5"
    },
    {
      id: '64ac14a43534efb7dcd9d526',
      icon: 'birthday-cake',
      name: 'Catering / Chef Service',
      identifier: 'Catering / Chef Service',
      type: "task",
      iconType: "FontAwesome"
      
    },
    {
      id: '64ac14d53534efb7dcd9d527',
      icon: 'bar-chart',
      name: 'Sales Persons',
      identifier: 'Sales Persons',
      type: "task",
      iconType: "FontAwesome"
    },
    {
      id: '64ac15323534efb7dcd9d528',
      icon: 'hair-dryer',
      name: 'Barber / Hair Stylist',
      identifier: 'Barber / Hair Stylist',
      type: "task",
      iconType: "MaterialCommunityIcons"
    },
    {
      id: '64ac15603534efb7dcd9d529',
      icon: 'slideshare',
      name: 'Fashion Designer ',
      identifier: 'Fashion Designer ',
      type: "task",
      iconType: "Entypo",
    },
    {
      id: '64ac15ab3534efb7dcd9d52a',
      icon: 'web-check',
      name: 'Web / Graphic Designer',
      identifier: 'Web / Graphic Designer',
      type: "task",
      iconType: "MaterialCommunityIcons",
    },
    {
      id: '64ac187b3534efb7dcd9d534',
      icon: 'brush-variant',
      name: 'Hair dressing',
      identifier: 'Hair dressing',
      type: "task",
      iconType: "MaterialCommunityIcons",
    },
   ]
  


const { isDecimal, isFloat, isInt, toFloat, toInt } = validator;

type AmountValue = string | number;

function isNumber(value: any): boolean {
  return typeof value === 'number';
}

function isString(value: any): boolean {
  return typeof value === 'string';
}

export function isValidStringAmount(stringAmount: string): boolean {
  if (isString(stringAmount) && stringAmount?.endsWith('.')) {
    return false;
  }

  return isDecimal(stringAmount);
}

export function isValidDecimalMonetaryValue(amountValue: AmountValue | any): boolean {
  if (!isNumber(amountValue) && !isString(amountValue)) {
    return false;
  }

  return isNumber(amountValue) || isValidStringAmount(amountValue);
}

export function isNegative(amountValue: AmountValue): boolean {
  if (typeof amountValue === 'string') {
    return amountValue.startsWith('-');
  }
  return amountValue < 0;
}

export function toNumber(string: string): number {
  if (isFloat(string)) {
    return toFloat(string);
  }

  if (isInt(string)) {
    return toInt(string);
  }
  return +string;
}

export function toString(amountValue: AmountValue) {
  return isNumber(amountValue) ? amountValue.toString() : amountValue;
}

export function toAmountInKobo(amountValue: AmountValue) {
  if (typeof amountValue === 'string') {
    return toNumber(amountValue) * 100;
  }
  return amountValue * 100;
}

export const getAmountValueInKobo = (amount: AmountValue): number => {
  if (isValidDecimalMonetaryValue(amount)) {
    return toAmountInKobo(amount);
  }
  return 0;
};

export const getChannels = (channelsArrary: PaymentChannels[]) => {
  if (channelsArrary?.length > 0) {
    const channelsString = JSON.stringify(channelsArrary);
    return `channels: ${channelsString},`;
  }
  return '';
};

export const navigationHook = () => {
  const navigation = useNavigation()
  return navigation.navigate('Tabs')
}
