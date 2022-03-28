import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import dayjs from 'dayjs';

function _RenderDate(props) {
  const {
    date,
    containerStyle,
    labelStyle
  } = props;
  return /*#__PURE__*/React.createElement(View, {
    style: containerStyle !== null && containerStyle !== void 0 ? containerStyle : styles.container
  }, /*#__PURE__*/React.createElement(Text, {
    style: labelStyle !== null && labelStyle !== void 0 ? labelStyle : styles.label
  }, dayjs(date).format('dddd D MMM')));
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    borderRadius: 5
  },
  label: {
    color: '#fff'
  }
});
export const RenderDate = /*#__PURE__*/React.memo(_RenderDate);
//# sourceMappingURL=RenderDate.js.map