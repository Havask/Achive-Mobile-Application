"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skeleton = Skeleton;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Chatty = require("../Chatty");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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


function Skeleton(props) {
  const propsContext = (0, _react.useContext)(_Chatty.PropsContext);

  if (propsContext !== null && propsContext !== void 0 && propsContext.enableSkeletonLoader && isLoaded) {
    try {
      const SS = require('moti/skeleton').Skeleton;

      return /*#__PURE__*/_react.default.createElement(SS, _extends({
        colorMode: _reactNative.Appearance.getColorScheme()
      }, props), props.children);
    } catch {
      console.warn('Moti and expo-linear-gradient is not installed. Skeleton loader will not work.');
    }
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, props.children);
}
//# sourceMappingURL=moti.js.map