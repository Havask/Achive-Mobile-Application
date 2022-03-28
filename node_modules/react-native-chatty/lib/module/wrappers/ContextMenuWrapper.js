import React, { useContext } from 'react';
import { useCallback } from 'react';
import { ActionSheetIOS, Platform, TouchableOpacity } from 'react-native';
import { PropsContext } from '../Chatty';
import { contextMenuView } from '../utils/contextMenu';
import { ChatEmitter } from '../utils/eventEmitter';

function ContextMenuWrapper(props) {
  var _propsContext$bubbleP10, _propsContext$bubbleP11, _propsContext$bubbleP12, _propsContext$bubbleP13, _propsContext$bubbleP14, _propsContext$bubbleP17, _propsContext$bubbleP18;

  const propsContext = useContext(PropsContext);
  const onPress = useCallback(index => {
    ChatEmitter.emit('actionPressed', index, props.message);
  }, [props.message]);
  const onLongPress = useCallback(() => {
    if (Platform.OS === 'ios') {
      var _propsContext$bubbleP, _propsContext$bubbleP2, _propsContext$bubbleP3, _propsContext$bubbleP4, _propsContext$bubbleP5, _propsContext$bubbleP6, _propsContext$bubbleP7, _propsContext$bubbleP8, _propsContext$bubbleP9;

      ActionSheetIOS.showActionSheetWithOptions({
        options: [...((_propsContext$bubbleP = propsContext.bubbleProps) === null || _propsContext$bubbleP === void 0 ? void 0 : (_propsContext$bubbleP2 = _propsContext$bubbleP.actions) === null || _propsContext$bubbleP2 === void 0 ? void 0 : _propsContext$bubbleP2.options.map(_ => _.title)), (_propsContext$bubbleP3 = (_propsContext$bubbleP4 = propsContext.bubbleProps) === null || _propsContext$bubbleP4 === void 0 ? void 0 : (_propsContext$bubbleP5 = _propsContext$bubbleP4.actions) === null || _propsContext$bubbleP5 === void 0 ? void 0 : _propsContext$bubbleP5.cancelButtonLabel) !== null && _propsContext$bubbleP3 !== void 0 ? _propsContext$bubbleP3 : 'Close'],
        cancelButtonIndex: (_propsContext$bubbleP6 = propsContext.bubbleProps) === null || _propsContext$bubbleP6 === void 0 ? void 0 : (_propsContext$bubbleP7 = _propsContext$bubbleP6.actions) === null || _propsContext$bubbleP7 === void 0 ? void 0 : _propsContext$bubbleP7.options.length,
        destructiveButtonIndex: ((_propsContext$bubbleP8 = propsContext.bubbleProps) === null || _propsContext$bubbleP8 === void 0 ? void 0 : (_propsContext$bubbleP9 = _propsContext$bubbleP8.actions) === null || _propsContext$bubbleP9 === void 0 ? void 0 : _propsContext$bubbleP9.options.findIndex(_ => _.destructive)) || -1
      }, onPress);
    }
  }, [onPress, (_propsContext$bubbleP10 = propsContext.bubbleProps) === null || _propsContext$bubbleP10 === void 0 ? void 0 : (_propsContext$bubbleP11 = _propsContext$bubbleP10.actions) === null || _propsContext$bubbleP11 === void 0 ? void 0 : _propsContext$bubbleP11.cancelButtonLabel, (_propsContext$bubbleP12 = propsContext.bubbleProps) === null || _propsContext$bubbleP12 === void 0 ? void 0 : (_propsContext$bubbleP13 = _propsContext$bubbleP12.actions) === null || _propsContext$bubbleP13 === void 0 ? void 0 : _propsContext$bubbleP13.options]); // If actions are not defined, just return the children

  if (!((_propsContext$bubbleP14 = propsContext.bubbleProps) !== null && _propsContext$bubbleP14 !== void 0 && _propsContext$bubbleP14.actions)) return props.children; // If actions are defined, but ios version is not supported, return the actionsheet

  if (!contextMenuView) {
    return /*#__PURE__*/React.createElement(TouchableOpacity, {
      onLongPress: onLongPress
    }, props.children);
  }

  if (Platform.OS === 'ios' && Platform.Version >= 13) {
    var _propsContext$bubbleP15, _propsContext$bubbleP16;

    return /*#__PURE__*/React.createElement(contextMenuView.default, {
      actions: (_propsContext$bubbleP15 = propsContext.bubbleProps) === null || _propsContext$bubbleP15 === void 0 ? void 0 : (_propsContext$bubbleP16 = _propsContext$bubbleP15.actions) === null || _propsContext$bubbleP16 === void 0 ? void 0 : _propsContext$bubbleP16.options,
      onPress: e => onPress(e.nativeEvent.index)
    }, props.children);
  }

  return /*#__PURE__*/React.createElement(contextMenuView.default, {
    actions: (_propsContext$bubbleP17 = propsContext.bubbleProps) === null || _propsContext$bubbleP17 === void 0 ? void 0 : (_propsContext$bubbleP18 = _propsContext$bubbleP17.actions) === null || _propsContext$bubbleP18 === void 0 ? void 0 : _propsContext$bubbleP18.options,
    onPress: e => onPress(e.nativeEvent.index)
  }, props.children);
}

export { ContextMenuWrapper };
//# sourceMappingURL=ContextMenuWrapper.js.map