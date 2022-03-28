"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoadEarlier = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _LoadEarlier(props) {
  const {
    onLoadEarlier
  } = props;
  const [fetchingEarlier, setFetchingEarlier] = (0, _react.useState)(false);
  const onPress = (0, _react.useCallback)(() => {
    setFetchingEarlier(true);
    onLoadEarlier().finally(() => setFetchingEarlier(false));
  }, [onLoadEarlier]);
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    onPress: onPress,
    style: props !== null && props !== void 0 && props.buttonContainerStyle ? props.buttonContainerStyle : {
      padding: 10,
      backgroundColor: !fetchingEarlier ? '#eb8334' : undefined,
      maxWidth: 100,
      margin: 10,
      borderRadius: 10,
      alignSelf: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: props !== null && props !== void 0 && props.labelStyle ? props.labelStyle : {
      color: '#fff'
    }
  }, fetchingEarlier ? /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null) : 'Load Earlier'));
}

const LoadEarlier = /*#__PURE__*/_react.default.memo(_LoadEarlier);

exports.LoadEarlier = LoadEarlier;
//# sourceMappingURL=LoadEarlier.js.map