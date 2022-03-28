"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TypingStatus = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _ChatBubble = require("../ChatBubble");

var _Chatty = require("../Chatty");

var _lottie = require("../utils/lottie");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _TypingStatus(_, ref) {
  const [isTyping, setIsTyping] = (0, _react.useState)(false);
  const propsContext = (0, _react.useContext)(_Chatty.PropsContext);
  const LottieView = (0, _lottie.loadLottie)();
  (0, _react.useImperativeHandle)(ref, () => ({
    setIsTyping: _isTyping => {
      setIsTyping(_isTyping);
    }
  }), []);
  if (!isTyping) return null;

  if (LottieView) {
    if (propsContext !== null && propsContext !== void 0 && propsContext.renderTypingBubble) {
      return propsContext.renderTypingBubble({
        typingAnimation: /*#__PURE__*/_react.default.createElement(LottieView, {
          source: require('../assets/lottie/typing.json'),
          autoPlay: true,
          style: {
            width: 30
          }
        })
      });
    }

    return /*#__PURE__*/_react.default.createElement(_ChatBubble.ChatBubble, null, /*#__PURE__*/_react.default.createElement(LottieView, {
      source: require('../assets/lottie/typing.json'),
      autoPlay: true,
      style: {
        width: 30
      }
    }));
  } else {
    if (propsContext !== null && propsContext !== void 0 && propsContext.renderTypingBubble) {
      return propsContext.renderTypingBubble();
    }

    return /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "Typing...");
  }
}

const TypingStatus = /*#__PURE__*/_react.default.memo( /*#__PURE__*/_react.default.forwardRef(_TypingStatus));

exports.TypingStatus = TypingStatus;
//# sourceMappingURL=TypingStatus.js.map