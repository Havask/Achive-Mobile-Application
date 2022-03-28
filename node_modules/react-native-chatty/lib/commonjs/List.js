"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.List = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactNativeReanimated = _interopRequireWildcard(require("react-native-reanimated"));

var _reactNativeSafeAreaContext = require("react-native-safe-area-context");

var _recyclerlistview = require("recyclerlistview");

var _ChatBubble = require("./ChatBubble");

var _Chatty = require("./Chatty");

var _FAB = require("./components/FAB");

var _LoadEarlier = require("./components/LoadEarlier");

var _RenderDate = require("./components/RenderDate");

var _TypingStatus = require("./components/TypingStatus");

var _useHaptic = require("./hooks/useHaptic");

var _usePrevious = require("./hooks/usePrevious");

var _SwipeableBubble = require("./SwipeableBubble");

var _Chatty2 = require("./types/Chatty.types");

var _eventEmitter = require("./utils/eventEmitter");

var _hapticEngine = require("./utils/hapticEngine");

var _helpers = require("./utils/helpers");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ScrollViewWithHeader = /*#__PURE__*/_react.default.forwardRef((_ref, ref) => {
  let {
    children,
    ...props
  } = _ref;
  const propsContext = (0, _react.useContext)(_Chatty.PropsContext);
  return /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, _extends({
    ref: ref
  }, props), (propsContext === null || propsContext === void 0 ? void 0 : propsContext.loadEarlierProps) && propsContext.loadEarlierProps.show && /*#__PURE__*/_react.default.createElement(_LoadEarlier.LoadEarlier, propsContext.loadEarlierProps), children);
});

const List = /*#__PURE__*/_react.default.forwardRef((props, ref) => {
  const propsContext = (0, _react.useContext)(_Chatty.PropsContext);
  const recyclerlistviewRef = (0, _react.useRef)();
  const windowDimensions = (0, _reactNative.useWindowDimensions)();
  const safeArea = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const {
    trigger
  } = (0, _useHaptic.useHaptic)();
  const fabRef = (0, _react.useRef)(null);
  const typingStatusRef = (0, _react.useRef)(null);
  const listHeight = (0, _react.useMemo)(() => windowDimensions.height - 150 - safeArea.bottom - safeArea.top, [windowDimensions, safeArea]);
  const {
    rowRenderer: rowRendererProp,
    data
  } = props;
  const dataProvider = (0, _react.useMemo)(() => {
    return new _recyclerlistview.DataProvider((r1, r2) => {
      if (r1.id !== r2.id) {
        return true;
      }

      return false;
    });
  }, []);
  const [messages, setMessages] = (0, _react.useState)(dataProvider);
  const previousMessages = (0, _usePrevious.usePrevious)(messages);
  /* This is a React Hook that is used to update the messages list when new messages are added. */

  (0, _react.useEffect)(() => {
    setMessages(dataProvider.cloneWithRows(data));
  }, [data, dataProvider]);
  /* This code is listening to the event of a reply bubble being pressed. When it is pressed, it scrolls
  to the replied message. */

  (0, _react.useEffect)(() => {
    // When reply is pressed, scroll to replied message
    _eventEmitter.ChatBubbleEmitter.addListener('replyBubblePressed', messageId => {
      const index = messages.getAllData().findIndex(m => m.id === messageId);

      if (index !== -1) {
        var _recyclerlistviewRef$;

        (_recyclerlistviewRef$ = recyclerlistviewRef.current) === null || _recyclerlistviewRef$ === void 0 ? void 0 : _recyclerlistviewRef$.scrollToIndex(index, true);
      }
    });

    return () => {
      _eventEmitter.ChatBubbleEmitter.removeAllListeners();
    };
  }, [messages]);
  /* Using the useImperativeHandle hook to expose a function to the parent component that will allow
  it to manipulate the messages list. */

  (0, _react.useImperativeHandle)(ref, () => ({
    appendMessage: (message, firstIndex) => {
      if (firstIndex) {
        if (Array.isArray(message)) {
          setMessages(dataProvider.cloneWithRows([...message, ...messages.getAllData()]));
        } else {
          setMessages(dataProvider.cloneWithRows([message, ...messages.getAllData()]));
        }
      } else {
        if (Array.isArray(message)) {
          setMessages(dataProvider.cloneWithRows([...messages.getAllData(), ...message]));
        } else {
          setMessages(dataProvider.cloneWithRows([...messages.getAllData(), message]));
        }
      }

      if (!Array.isArray(message)) {
        if (!message.me && propsContext !== null && propsContext !== void 0 && propsContext.enableHapticFeedback) {
          if (_reactNative.Platform.OS !== 'web' && _hapticEngine.hapticEngine) trigger(_Chatty2.HapticType.Heavy);
        }
      }
    },

    /* This is a function that is used to scroll to the bottom of the list. */
    scrollToEnd: animated => {
      var _recyclerlistviewRef$2;

      (_recyclerlistviewRef$2 = recyclerlistviewRef.current) === null || _recyclerlistviewRef$2 === void 0 ? void 0 : _recyclerlistviewRef$2.scrollToEnd(animated);
    },

    /* Setting the typing status of the user. */
    setIsTyping: typing => {
      var _typingStatusRef$curr, _recyclerlistviewRef$3;

      (_typingStatusRef$curr = typingStatusRef.current) === null || _typingStatusRef$curr === void 0 ? void 0 : _typingStatusRef$curr.setIsTyping(typing !== null && typing !== void 0 ? typing : false);
      (_recyclerlistviewRef$3 = recyclerlistviewRef.current) === null || _recyclerlistviewRef$3 === void 0 ? void 0 : _recyclerlistviewRef$3.scrollToEnd(true);
    },

    /* Removing a message from the list of messages. */
    removeMessage: id => {
      setMessages(dataProvider.cloneWithRows(messages.getAllData().filter(message => message.id !== id)));
    }
  }), [dataProvider, messages, propsContext.enableHapticFeedback, trigger]);
  /* This code is checking if the first message in the previous messages is the same as the first message
  in the current messages. If it is, then it will not scroll to the bottom. */

  (0, _react.useEffect)(() => {
    var _, _2;

    if (previousMessages && ((_ = previousMessages.getAllData()[0]) === null || _ === void 0 ? void 0 : _.id) === ((_2 = messages.getAllData()[0]) === null || _2 === void 0 ? void 0 : _2.id)) {
      (0, _helpers.wait)(100).then(() => {
        var _recyclerlistviewRef$4;

        (_recyclerlistviewRef$4 = recyclerlistviewRef.current) === null || _recyclerlistviewRef$4 === void 0 ? void 0 : _recyclerlistviewRef$4.scrollToEnd(true);
      });
    }
  }, [ref, messages, previousMessages]);
  const layoutProvider = (0, _react.useCallback)(() => {
    return new _recyclerlistview.LayoutProvider(index => {
      const currentMessage = messages.getAllData()[index];
      const prevMessage = messages.getAllData()[index - 1];

      if (currentMessage.text.length >= 600) {
        return _Chatty2.LayoutType.ExtremeLong;
      }

      if (currentMessage.text.length >= 400) {
        return _Chatty2.LayoutType.Long3x;
      }

      if (currentMessage.text.length >= 200) {
        return _Chatty2.LayoutType.Long2x;
      }

      if (currentMessage.text.length >= 100) {
        return _Chatty2.LayoutType.Long;
      }

      if (currentMessage !== null && currentMessage !== void 0 && currentMessage.media) {
        if (currentMessage.media.length > 2) {
          return _Chatty2.LayoutType.Media2x;
        }

        return _Chatty2.LayoutType.Media;
      }

      if (currentMessage.repliedTo) {
        return _Chatty2.LayoutType.Replied;
      }

      const isFirstMessage = index === 0;

      if (!isFirstMessage && (0, _dayjs.default)(currentMessage.createdAt).date() !== (0, _dayjs.default)(prevMessage.createdAt).date() || isFirstMessage) {
        return _Chatty2.LayoutType.Dated;
      }

      return _Chatty2.LayoutType.Normal;
    }, (type, dim) => {
      dim.width = windowDimensions.width;

      switch (type) {
        case _Chatty2.LayoutType.Normal:
          dim.height = 85;
          break;

        case _Chatty2.LayoutType.Replied:
          dim.height = 190;
          break;

        case _Chatty2.LayoutType.Dated:
          dim.height = 110;
          break;

        case _Chatty2.LayoutType.Long:
          dim.height = 130;
          break;

        case _Chatty2.LayoutType.Long2x:
          dim.height = 170;
          break;

        case _Chatty2.LayoutType.Long3x:
          dim.height = 350;
          break;

        case _Chatty2.LayoutType.ExtremeLong:
          dim.height = 550;
          break;

        case _Chatty2.LayoutType.Media:
          dim.height = 180;
          break;

        case _Chatty2.LayoutType.Media2x:
          dim.height = 300;
          break;

        default:
          dim.height = 85;
          break;
      }
    });
  }, [messages, windowDimensions.width]);
  const renderBubble = (0, _react.useCallback)((data, withDate) => {
    if (rowRendererProp) {
      return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, withDate && /*#__PURE__*/_react.default.createElement(_RenderDate.RenderDate, _extends({
        date: data.createdAt
      }, propsContext.renderDateProps)), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
        entering: _reactNativeReanimated.FadeInDown,
        exiting: _reactNativeReanimated.FadeOutUp
      }, /*#__PURE__*/_react.default.createElement(_SwipeableBubble.SwipeableBubble, {
        message: data,
        onReply: propsContext.onReply
      }, rowRendererProp(data))));
    }

    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        width: '100%'
      }
    }, withDate && /*#__PURE__*/_react.default.createElement(_RenderDate.RenderDate, _extends({
      date: data.createdAt
    }, propsContext.renderDateProps)), /*#__PURE__*/_react.default.createElement(_reactNativeReanimated.default.View, {
      entering: _reactNativeReanimated.FadeInDown,
      exiting: _reactNativeReanimated.FadeOutUp
    }, propsContext.onReply ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_SwipeableBubble.SwipeableBubble, {
      message: data,
      onReply: propsContext.onReply
    })) : /*#__PURE__*/_react.default.createElement(_ChatBubble.ChatBubble, {
      message: data
    })));
  }, [propsContext.onReply, propsContext.renderDateProps, rowRendererProp]);
  const rowRenderer = (0, _react.useCallback)((type, data) => {
    if (type === _Chatty2.LayoutType.Dated) {
      return renderBubble(data, true);
    }

    return renderBubble(data);
  }, [renderBubble]);
  const onScroll = (0, _react.useCallback)((e, offsetX, offsetY) => {
    if (e.nativeEvent.contentOffset.y <= 0) {
      var _fabRef$current;

      (_fabRef$current = fabRef.current) === null || _fabRef$current === void 0 ? void 0 : _fabRef$current.show();
    } else {
      var _fabRef$current2;

      (_fabRef$current2 = fabRef.current) === null || _fabRef$current2 === void 0 ? void 0 : _fabRef$current2.hide();
    }

    if (props.onScroll) {
      props.onScroll(e, offsetX, offsetY);
    }
  }, [props]);
  const scrollToBottom = (0, _react.useCallback)(() => {
    var _recyclerlistviewRef$5;

    (_recyclerlistviewRef$5 = recyclerlistviewRef.current) === null || _recyclerlistviewRef$5 === void 0 ? void 0 : _recyclerlistviewRef$5.scrollToEnd(true);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      minWidth: 1,
      minHeight: 1,
      maxHeight: listHeight
    }
  }, propsContext.showScrollToBottomButton && /*#__PURE__*/_react.default.createElement(_FAB.FAB, _extends({
    ref: fabRef,
    onPress: scrollToBottom
  }, propsContext.scrollToBottomProps)), /*#__PURE__*/_react.default.createElement(_recyclerlistview.RecyclerListView, {
    layoutProvider: layoutProvider(),
    externalScrollView: ScrollViewWithHeader,
    dataProvider: messages,
    style: [{
      height: propsContext.replyingTo ? '90%' : '100%'
    }, props.containerStyle] // @ts-ignore
    ,
    ref: recyclerlistviewRef,
    scrollViewProps: {
      keyboardShouldPersistTaps: 'never'
    },
    onScroll: onScroll,
    optimizeForInsertDeleteAnimations: true,
    forceNonDeterministicRendering: true,
    canChangeSize: true,
    rowRenderer: rowRenderer,
    renderFooter: () => /*#__PURE__*/_react.default.createElement(_TypingStatus.TypingStatus, {
      ref: typingStatusRef
    }),
    onEndReached: props === null || props === void 0 ? void 0 : props.onEndReached,
    onEndReachedThreshold: props === null || props === void 0 ? void 0 : props.onEndReachedThreshold
  }));
});

exports.List = List;
//# sourceMappingURL=List.js.map