"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.PropsContext = exports.Chatty = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _Footer = require("./Footer");

var _Header = require("./Header");

var _List = require("./List");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const PropsContext = /*#__PURE__*/_react.default.createContext({});

exports.PropsContext = PropsContext;

const Chatty = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const listRef = (0, _react.useRef)();
  const {
    messages
  } = props;
  /* This is a way to scroll to the end of the list when the keyboard is shown. */

  (0, _react.useEffect)(() => {
    const listener = _reactNative.Keyboard.addListener('keyboardDidShow', () => {
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
  (0, _react.useEffect)(() => {
    if (props !== null && props !== void 0 && props.setDateLocale) {
      _dayjs.default.locale(props.setDateLocale);
    }
  }, [props.setDateLocale]);
  const renderLoading = (0, _react.useCallback)(() => {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: [styles.loadingContainer]
    }, /*#__PURE__*/_react.default.createElement(_reactNative.ActivityIndicator, null));
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNativeSafeAreaContext.SafeAreaView, null, /*#__PURE__*/_react.default.createElement(PropsContext.Provider, {
    value: props
  }, props !== null && props !== void 0 && props.renderHeader ? props.renderHeader(props.headerProps) : /*#__PURE__*/_react.default.createElement(_Header.Header, props.headerProps), /*#__PURE__*/_react.default.createElement(_reactNative.KeyboardAvoidingView, {
    behavior: _reactNative.Platform.select({
      android: 'position',
      ios: 'position'
    }),
    keyboardVerticalOffset: _reactNative.Platform.select({
      android: 20
    })
  }, props.messages.length < 1 ? renderLoading() : /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_List.List, _extends({
    data: messages //@ts-ignore
    ,
    ref: ref !== null && ref !== void 0 ? ref : listRef,
    rowRenderer: props !== null && props !== void 0 && props.renderBubble ? props.renderBubble : undefined
  }, props.listProps)), props !== null && props !== void 0 && props.renderFooter ? props.renderFooter(props.footerProps) : /*#__PURE__*/_react.default.createElement(_Footer.Footer, _extends({}, props.footerProps, {
    replyingTo: props.replyingTo
  }))))));
});

exports.Chatty = Chatty;

const styles = _reactNative.StyleSheet.create({
  loadingContainer: {
    height: '90%',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  }
});

exports.styles = styles;
//# sourceMappingURL=Chatty.js.map