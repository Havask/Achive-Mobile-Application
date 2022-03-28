import React, { useCallback } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export const UrlPreviewBubble = props => {
  const {
    url,
    title,
    description,
    image
  } = props;
  const onPressLink = useCallback(async () => {
    const canOpen = await Linking.canOpenURL(url);

    if (canOpen) {
      Linking.openURL(url);
    }
  }, [url]);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPressLink
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(Image, {
    source: {
      uri: image
    },
    style: styles.previewImage
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.subContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.title
  }, title), /*#__PURE__*/React.createElement(Text, {
    style: styles.description
  }, description.slice(0, 50), "..."), /*#__PURE__*/React.createElement(Text, {
    style: styles.url
  }, url))));
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    maxHeight: 100,
    overflow: 'hidden'
  },
  subContainer: {
    marginLeft: 10
  },
  previewImage: {
    width: 30,
    height: 30,
    borderRadius: 10
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 12,
    color: '#888'
  },
  url: {
    marginTop: 40,
    color: '#3C91E6'
  }
});
//# sourceMappingURL=UrlPreviewBubble.js.map