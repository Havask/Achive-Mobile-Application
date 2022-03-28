"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.styles = exports.Header = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _Header(props) {
  const {
    user
  } = props;
  const {
    top
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.container, {
      paddingTop: top
    }]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: user.avatar,
    style: styles.avatar
  }), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.username
  }, user.username));
}

const styles = _reactNative.StyleSheet.create({
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

exports.styles = styles;

const Header = /*#__PURE__*/_react.default.memo(_Header);

exports.Header = Header;
//# sourceMappingURL=Header.js.map