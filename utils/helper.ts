import moment from "moment";

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