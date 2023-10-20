import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const setHeight = (h: number )=> (height / 100) * h;
export const setWidth = (w: number )=> (width / 100) * w;
