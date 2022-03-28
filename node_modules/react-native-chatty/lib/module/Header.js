import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function _Header(props) {
  const {
    user
  } = props;
  const {
    top
  } = useSafeAreaInsets();
  return /*#__PURE__*/React.createElement(View, {
    style: [styles.container, {
      paddingTop: top
    }]
  }, /*#__PURE__*/React.createElement(Image, {
    source: user.avatar,
    style: styles.avatar
  }), /*#__PURE__*/React.createElement(Text, {
    style: styles.username
  }, user.username));
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
    zIndex: 1
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 40
  },
  username: {
    marginLeft: 10,
    textAlign: 'justify'
  }
});
export const Header = /*#__PURE__*/React.memo(_Header);
//# sourceMappingURL=Header.js.map