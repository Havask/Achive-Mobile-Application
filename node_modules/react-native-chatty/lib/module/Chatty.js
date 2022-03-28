function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import dayjs from 'dayjs';
import React, { useCallback, useEffect, useRef } from 'react';
import { ActivityIndicator, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from './Footer';
import { Header } from './Header';
import { List } from './List';
export const PropsContext = /*#__PURE__*/React.createContext({});
export const Chatty = /*#__PURE__*/React.forwardRef((props, ref) => {
  const listRef = useRef();
  const {
    messages
  } = props;
  /* This is a way to scroll to the end of the list when the keyboard is shown. */

  useEffect(() => {
    const listener = Keyboard.addListener('keyboardDidShow', () => {
      if (listRef.current) {
        var _listRef$current;

        (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.scrollToEnd(true);
      } else if (ref) {
        var _ref$current;

        //@ts-ignore
        (_ref$current = ref.current) === null || _ref$current === void 0 ? void 0 : _ref$current.scrollToEnd(true);
      } else {
        console.warn('No ref found');
      }
    });
    return () => {
      listener.remove();
    };
  }, [ref]);
  useEffect(() => {
    if (props !== null && props !== void 0 && props.setDateLocale) {
      dayjs.locale(props.setDateLocale);
    }
  }, [props.setDateLocale]);
  const renderLoading = useCallback(() => {
    return /*#__PURE__*/React.createElement(View, {
      style: [styles.loadingContainer]
    }, /*#__PURE__*/React.createElement(ActivityIndicator, null));
  }, []);
  return /*#__PURE__*/React.createElement(SafeAreaView, null, /*#__PURE__*/React.createElement(PropsContext.Provider, {
    value: props
  }, props !== null && props !== void 0 && props.renderHeader ? props.renderHeader(props.headerProps) : /*#__PURE__*/React.createElement(Header, props.headerProps), /*#__PURE__*/React.createElement(KeyboardAvoidingView, {
    behavior: Platform.select({
      android: 'position',
      ios: 'position'
    }),
    keyboardVerticalOffset: Platform.select({
      android: 20
    })
  }, props.messages.length < 1 ? renderLoading() : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(List, _extends({
    data: messages //@ts-ignore
    ,
    ref: ref !== null && ref !== void 0 ? ref : listRef,
    rowRenderer: props !== null && props !== void 0 && props.renderBubble ? props.renderBubble : undefined
  }, props.listProps)), props !== null && props !== void 0 && props.renderFooter ? props.renderFooter(props.footerProps) : /*#__PURE__*/React.createElement(Footer, _extends({}, props.footerProps, {
    replyingTo: props.replyingTo
  }))))));
});
export const styles = StyleSheet.create({
  loadingContainer: {
    height: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});
//# sourceMappingURL=Chatty.js.map