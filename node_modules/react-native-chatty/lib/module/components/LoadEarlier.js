import React, { useState } from 'react';
import { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { Text, TouchableOpacity } from 'react-native';

function _LoadEarlier(props) {
  const {
    onLoadEarlier
  } = props;
  const [fetchingEarlier, setFetchingEarlier] = useState(false);
  const onPress = useCallback(() => {
    setFetchingEarlier(true);
    onLoadEarlier().finally(() => setFetchingEarlier(false));
  }, [onLoadEarlier]);
  return /*#__PURE__*/React.createElement(TouchableOpacity, {
    onPress: onPress,
    style: props !== null && props !== void 0 && props.buttonContainerStyle ? props.buttonContainerStyle : {
      padding: 10,
      backgroundColor: !fetchingEarlier ? '#eb8334' : undefined,
      maxWidth: 100,
      margin: 10,
      borderRadius: 10,
      alignSelf: 'center'
    }
  }, /*#__PURE__*/React.createElement(Text, {
    style: props !== null && props !== void 0 && props.labelStyle ? props.labelStyle : {
      color: '#fff'
    }
  }, fetchingEarlier ? /*#__PURE__*/React.createElement(ActivityIndicator, null) : 'Load Earlier'));
}

export const LoadEarlier = /*#__PURE__*/React.memo(_LoadEarlier);
//# sourceMappingURL=LoadEarlier.js.map