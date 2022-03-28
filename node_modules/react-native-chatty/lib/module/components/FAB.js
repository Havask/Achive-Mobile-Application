import React, { useImperativeHandle, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

function _FAB(_, ref) {
  var _$containerStyle, _$content;

  const [isVisible, setIsVisible] = useState(false);
  useImperativeHandle(ref, () => ({
    show: () => setIsVisible(true),
    hide: () => setIsVisible(false)
  }), []);
  if (!isVisible) return null;
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    style: (_$containerStyle = _.containerStyle) !== null && _$containerStyle !== void 0 ? _$containerStyle : styles.button,
    onPress: _.onPress
  }, (_$content = _.content) !== null && _$content !== void 0 ? _$content : /*#__PURE__*/React.createElement(Text, {
    style: styles.label
  }, "DOWN"));
}

const styles = StyleSheet.create({
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
export const FAB = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(_FAB));
//# sourceMappingURL=FAB.js.map