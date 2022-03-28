"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderDate = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _dayjs = _interopRequireDefault(require("dayjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _RenderDate(props) {
  const {
    date,
    containerStyle,
    labelStyle
  } = props;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: containerStyle !== null && containerStyle !== void 0 ? containerStyle : styles.container
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: labelStyle !== null && labelStyle !== void 0 ? labelStyle : styles.label
  }, (0, _dayjs.default)(date).format('dddd D MMM')));
}

const styles = _reactNative.StyleSheet.create({
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

const RenderDate = /*#__PURE__*/_react.default.memo(_RenderDate);

exports.RenderDate = RenderDate;
//# sourceMappingURL=RenderDate.js.map