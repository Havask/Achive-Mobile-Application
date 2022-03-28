"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FAB = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _FAB(_, ref) {
  var _$containerStyle, _$content;

  const [isVisible, setIsVisible] = (0, _react.useState)(false);
  (0, _react.useImperativeHandle)(ref, () => ({
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false)
  }), []);
  if (!isVisible) return null;
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: (_$containerStyle = _.containerStyle) !== null && _$containerStyle !== void 0 ? _$containerStyle : styles.button,
    onPress: _.onPress
  }, (_$content = _.content) !== null && _$content !== void 0 ? _$content : /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.label
  }, "DOWN"));
}

const styles = _reactNative.StyleSheet.create({
  button: {
    width: 50,
    zIndex: 1,
    height: 50,
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 50,
    position: 'absolute',
    bottom: 50,
    right: 20
  },
  label: {
    textAlign: 'center',
    fontSize: 10
  }
});

const FAB = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(_FAB));

exports.FAB = FAB;
//# sourceMappingURL=FAB.js.map