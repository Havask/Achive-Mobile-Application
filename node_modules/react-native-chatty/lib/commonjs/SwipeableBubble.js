"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SwipeableBubble = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeGestureHandler = require("react-native-gesture-handler");

var _ChatBubble = require("./ChatBubble");

var _Chatty = require("./Chatty");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _SwipeableBubble(props) {
  var _propsContext$bubbleP3;

  const {
    onReply,
    message,
    children
  } = props;
  const propsContext = (0, _react.useContext)(_Chatty.PropsContext);
  const swipeableRef = (0, _react.useRef)(null);

  const _onReply = (0, _react.useCallback)(() => {
    var _swipeableRef$current;

    if (!message) return;
    onReply(message); //@ts-ignore

    (_swipeableRef$current = swipeableRef.current) === null || _swipeableRef$current === void 0 ? void 0 : _swipeableRef$current.close();
  }, [message, onReply, swipeableRef]);

  const renderLeftActions = (0, _react.useCallback)(() => {
    var _propsContext$bubbleP, _propsContext$bubbleP2;

    return (_propsContext$bubbleP = (_propsContext$bubbleP2 = propsContext.bubbleProps) === null || _propsContext$bubbleP2 === void 0 ? void 0 : _propsContext$bubbleP2.replyDragElement) !== null && _propsContext$bubbleP !== void 0 ? _propsContext$bubbleP : /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, " ");
  }, [(_propsContext$bubbleP3 = propsContext.bubbleProps) === null || _propsContext$bubbleP3 === void 0 ? void 0 : _propsContext$bubbleP3.replyDragElement]);
  if (!onReply) return children !== null && children !== void 0 ? children : /*#__PURE__*/_react.default.createElement(_ChatBubble.ChatBubble, props);
  return /*#__PURE__*/_react.default.createElement(_reactNativeGestureHandler.Swipeable, {
    renderLeftActions: renderLeftActions,
    friction: 2,
    overshootFriction: 2,
    onEnded: () => _onReply(),
    enableTrackpadTwoFingerGesture: true,
    ref: swipeableRef
  }, children !== null && children !== void 0 ? children : /*#__PURE__*/_react.default.createElement(_ChatBubble.ChatBubble, props));
}

const SwipeableBubble = /*#__PURE__*/_react.default.memo(_SwipeableBubble);

exports.SwipeableBubble = SwipeableBubble;
//# sourceMappingURL=SwipeableBubble.js.map