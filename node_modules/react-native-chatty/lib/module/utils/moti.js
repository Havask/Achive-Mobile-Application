function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useContext } from 'react';
import { Appearance, View } from 'react-native';
import { PropsContext } from '../Chatty';
let isLoaded = false;

try {
  require('moti');

  require('expo-linear-gradient');

  isLoaded = true;
} catch {
  console.warn('Moti and expo-linear-gradient is not installed. Skeleton loader will not work.');
}
/**
 * If the skeleton loader is enabled, then render the skeleton loader. Otherwise, render the children
 * @param {any} props - any
 * @returns A skeleton component / Native view object
 */


export function Skeleton(props) {
  const propsContext = useContext(PropsContext);

  if (propsContext !== null && propsContext !== void 0 && propsContext.enableSkeletonLoader && isLoaded) {
    try {
      const SS = require('moti/skeleton').Skeleton;

      return /*#__PURE__*/React.createElement(SS, _extends({
        colorMode: Appearance.getColorScheme()
      }, props), props.children);
    } catch {
      console.warn('Moti and expo-linear-gradient is not installed. Skeleton loader will not work.');
    }
  }

  return /*#__PURE__*/React.createElement(View, null, props.children);
}
//# sourceMappingURL=moti.js.map