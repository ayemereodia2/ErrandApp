import React from 'react';
import {View} from 'react-native';

interface Prop {
  height?: number
  width?: number
  extraProps?: any
}

const Separator = ({height, width, ...extraProps}: Prop) => (
  <View style={{height, width, ...extraProps}} />
);

Separator.defaultProps = {
  height: 0,
  width: 0,
};

export default Separator;