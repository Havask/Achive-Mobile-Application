"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContextMenuWrapper = ContextMenuWrapper;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _Chatty = require("../Chatty");

var _contextMenu = require("../utils/contextMenu");

var _eventEmitter = require("../utils/eventEmitter");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ContextMenuWrapper(props) {
  var _propsContext$bubbleP10, _propsContext$bubbleP11, _propsContext$bubbleP12, _propsContext$bubbleP13, _propsContext$bubbleP14, _propsContext$bubbleP17, _propsContext$bubbleP18;

  const propsContext = (0, _react.useContext)(_Chatty.PropsContext);
  const onPress = (0, _react.useCallback)(index => {
    _eventEmitter.ChatEmitter.emit('actionPressed', index, props.message);
  }, [props.message]);
  const onLongPress = (0, _react.useCallback)(() => {
    if (_reactNative.Platform.OS === 'ios') {
      var _propsContext$bubbleP, _propsContext$bubbleP2, _propsContext$bubbleP3, _propsContext$bubbleP4, _propsContext$bubbleP5, _propsContext$bubbleP6, _propsContext$bubbleP7, _propsContext$bubbleP8, _propsContext$bubbleP9;

      _reactNative.ActionSheetIOS.showActionSheetWithOptions({
        options: [...((_propsContext$bubbleP = propsContext.bubbleProps) === null || _propsContext$bubbleP === void 0 ? void 0 : (_propsContext$bubbleP2 = _propsContext$bubbleP.actions) === null || _propsContext$bubbleP2 === void 0 ? void 0 : _propsContext$bubbleP2.options.map(_ => _.title)), (_propsContext$bubbleP3 = (_propsContext$bubbleP4 = propsContext.bubbleProps) === null || _propsContext$bubbleP4 === void 0 ? void 0 : (_propsContext$bubbleP5 = _propsContext$bubbleP4.actions) === null || _propsContext$bubbleP5 === void 0 ? void 0 : _propsContext$bubbleP5.cancelButtonLabel) !== null && _propsContext$bubbleP3 !== void 0 ? _propsContext$bubbleP3 : 'Close'],
        cancelButtonIndex: (_propsContext$bubbleP6 = propsContext.bubbleProps) === null || _propsContext$bubbleP6 === void 0 ? void 0 : (_propsContext$bubbleP7 = _propsContext$bubbleP6.actions) === null || _propsContext$bubbleP7 === void 0 ? void 0 : _propsContext$bubbleP7.options.length,
        destructiveButtonIndex: ((_propsContext$bubbleP8 = propsContext.bubbleProps) === null || _propsContext$bubbleP8 === void 0 ? void 0 : (_propsContext$bubbleP9 = _propsContext$bubbleP8.actions) === null || _propsContext$bubbleP9 === void 0 ? void 0 : _propsContext$bubbleP9.options.findIndex(_ => _.destructive)) || -1
      }, onPress);
    }
  }, [onPress, (_propsContext$bubbleP10 = propsContext.bubbleProps) === null || _propsContext$bubbleP10 === void 0 ? void 0 : (_propsContext$bubbleP11 = _propsContext$bubbleP10.actions) === null || _propsContext$bubbleP11 === void 0 ? void 0 : _propsContext$bubbleP11.cancelButtonLabel, (_propsContext$bubbleP12 = propsContext.bubbleProps) === null || _propsContext$bubbleP12 === void 0 ? void 0 : (_propsContext$bubbleP13 = _propsContext$bubbleP12.actions) === null || _propsContext$bubbleP13 === void 0 ? void 0 : _propsContext$bubbleP13.options]); // If actions are not defined, just return the children

  if (!((_propsContext$bubbleP14 = propsContext.bubbleProps) !== null && _propsContext$bubbleP14 !== void 0 && _propsContext$bubbleP14.actions)) return props.children; // If actions are defined, but ios version is not supported, return the actionsheet

  if (!_contextMenu.contextMenuView) {
    return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
      onLongPress: onLongPress
    }, props.children);
  }

  if (_reactNative.Platform.OS === 'ios' && _reactNative.Platform.Version >= 13) {
    var _propsContext$bubbleP15, _propsContext$bubbleP16;

    return /*#__PURE__*/_react.default.createElement(_contextMenu.contextMenuView.default, {
      actions: (_propsContext$bubbleP15 = propsContext.bubbleProps) === null || _propsContext$bubbleP15 === void 0 ? void 0 : (_propsContext$bubbleP16 = _propsContext$bubbleP15.actions) === null || _propsContext$bubbleP16 === void 0 ? void 0 : _propsContext$bubbleP16.options,
      onPress: e => onPress(e.nativeEvent.index)
    }, props.children);
  }

  return /*#__PURE__*/_react.default.createElement(_contextMenu.contextMenuView.default, {
    actions: (_propsContext$bubbleP17 = propsContext.bubbleProps) === null || _propsContext$bubbleP17 === void 0 ? void 0 : (_propsContext$bubbleP18 = _propsContext$bubbleP17.actions) === null || _propsContext$bubbleP18 === void 0 ? void 0 : _propsContext$bubbleP18.options,
    onPress: e => onPress(e.nativeEvent.index)
  }, props.children);
}
//# sourceMappingURL=ContextMenuWrapper.js.map