function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import dayjs from 'dayjs';
import React, { useCallback, useContext, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Platform, ScrollView, useWindowDimensions, View } from 'react-native';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';
import { ChatBubble } from './ChatBubble';
import { PropsContext } from './Chatty';
import { FAB } from './components/FAB';
import { LoadEarlier } from './components/LoadEarlier';
import { RenderDate } from './components/RenderDate';
import { TypingStatus } from './components/TypingStatus';
import { useHaptic } from './hooks/useHaptic';
import { usePrevious } from './hooks/usePrevious';
import { SwipeableBubble } from './SwipeableBubble';
import { HapticType, LayoutType } from './types/Chatty.types';
import { ChatBubbleEmitter } from './utils/eventEmitter';
import { hapticEngine } from './utils/hapticEngine';
import { wait } from './utils/helpers';
const ScrollViewWithHeader = /*#__PURE__*/React.forwardRef((_ref, ref) => {
  let {
    children,
    ...props
  } = _ref;
  const propsContext = useContext(PropsContext);
  return /*#__PURE__*/React.createElement(ScrollView, _extends({
    ref: ref
  }, props), (propsContext === null || propsContext === void 0 ? void 0 : propsContext.loadEarlierProps) && propsContext.loadEarlierProps.show && /*#__PURE__*/React.createElement(LoadEarlier, propsContext.loadEarlierProps), children);
});
export const List = /*#__PURE__*/React.forwardRef((props, ref) => {
  const propsContext = useContext(PropsContext);
  const recyclerlistviewRef = useRef();
  const windowDimensions = useWindowDimensions();
  const safeArea = useSafeAreaInsets();
  const {
    trigger
  } = useHaptic();
  const fabRef = useRef(null);
  const typingStatusRef = useRef(null);
  const listHeight = useMemo(() => windowDimensions.height - 150 - safeArea.bottom - safeArea.top, [windowDimensions, safeArea]);
  const {
    rowRenderer: rowRendererProp,
    data
  } = props;
  const dataProvider = useMemo(() => {
    return new DataProvider((r1, r2) => {
      if (r1.id !== r2.id) {
        return true;
      }

      return false;
    });
  }, []);
  const [messages, setMessages] = useState(dataProvider);
  const previousMessages = usePrevious(messages);
  /* This is a React Hook that is used to update the messages list when new messages are added. */

  useEffect(() => {
    setMessages(dataProvider.cloneWithRows(data));
  }, [data, dataProvider]);
  /* This code is listening to the event of a reply bubble being pressed. When it is pressed, it scrolls
  to the replied message. */

  useEffect(() => {
    // When reply is pressed, scroll to replied message
    ChatBubbleEmitter.addListener('replyBubblePressed', messageId => {
      const index = messages.getAllData().findIndex(m => m.id === messageId);

      if (index !== -1) {
        var _recyclerlistviewRef$;

        (_recyclerlistviewRef$ = recyclerlistviewRef.current) === null || _recyclerlistviewRef$ === void 0 ? void 0 : _recyclerlistviewRef$.scrollToIndex(index, true);
      }
    });
    return () => {
      ChatBubbleEmitter.removeAllListeners();
    };
  }, [messages]);
  /* Using the useImperativeHandle hook to expose a function to the parent component that will allow
  it to manipulate the messages list. */

  useImperativeHandle(ref, () => ({
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
          if (Platform.OS !== 'web' && hapticEngine) trigger(HapticType.Heavy);
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

  useEffect(() => {
    var _, _2;

    if (previousMessages && ((_ = previousMessages.getAllData()[0]) === null || _ === void 0 ? void 0 : _.id) === ((_2 = messages.getAllData()[0]) === null || _2 === void 0 ? void 0 : _2.id)) {
      wait(100).then(() => {
        var _recyclerlistviewRef$4;

        (_recyclerlistviewRef$4 = recyclerlistviewRef.current) === null || _recyclerlistviewRef$4 === void 0 ? void 0 : _recyclerlistviewRef$4.scrollToEnd(true);
      });
    }
  }, [ref, messages, previousMessages]);
  const layoutProvider = useCallback(() => {
    return new LayoutProvider(index => {
      const currentMessage = messages.getAllData()[index];
      const prevMessage = messages.getAllData()[index - 1];

      if (currentMessage.text.length >= 600) {
        return LayoutType.ExtremeLong;
      }

      if (currentMessage.text.length >= 400) {
        return LayoutType.Long3x;
      }

      if (currentMessage.text.length >= 200) {
        return LayoutType.Long2x;
      }

      if (currentMessage.text.length >= 100) {
        return LayoutType.Long;
      }

      if (currentMessage !== null && currentMessage !== void 0 && currentMessage.media) {
        if (currentMessage.media.length > 2) {
          return LayoutType.Media2x;
        }

        return LayoutType.Media;
      }

      if (currentMessage.repliedTo) {
        return LayoutType.Replied;
      }

      const isFirstMessage = index === 0;

      if (!isFirstMessage && dayjs(currentMessage.createdAt).date() !== dayjs(prevMessage.createdAt).date() || isFirstMessage) {
        return LayoutType.Dated;
      }

      return LayoutType.Normal;
    }, (type, dim) => {
      dim.width = windowDimensions.width;

      switch (type) {
        case LayoutType.Normal:
          dim.height = 85;
          break;

        case LayoutType.Replied:
          dim.height = 190;
          break;

        case LayoutType.Dated:
          dim.height = 110;
          break;

        case LayoutType.Long:
          dim.height = 130;
          break;

        case LayoutType.Long2x:
          dim.height = 170;
          break;

        case LayoutType.Long3x:
          dim.height = 350;
          break;

        case LayoutType.ExtremeLong:
          dim.height = 550;
          break;

        case LayoutType.Media:
          dim.height = 180;
          break;

        case LayoutType.Media2x:
          dim.height = 300;
          break;

        default:
          dim.height = 85;
          break;
      }
    });
  }, [messages, windowDimensions.width]);
  const renderBubble = useCallback((data, withDate) => {
    if (rowRendererProp) {
      return /*#__PURE__*/React.createElement(View, null, withDate && /*#__PURE__*/React.createElement(RenderDate, _extends({
        date: data.createdAt
      }, propsContext.renderDateProps)), /*#__PURE__*/React.createElement(Animated.View, {
        entering: FadeInDown,
        exiting: FadeOutUp
      }, /*#__PURE__*/React.createElement(SwipeableBubble, {
        message: data,
        onReply: propsContext.onReply
      }, rowRendererProp(data))));
    }

    return /*#__PURE__*/React.createElement(View, {
      style: {
        width: '100%'
      }
    }, withDate && /*#__PURE__*/React.createElement(RenderDate, _extends({
      date: data.createdAt
    }, propsContext.renderDateProps)), /*#__PURE__*/React.createElement(Animated.View, {
      entering: FadeInDown,
      exiting: FadeOutUp
    }, propsContext.onReply ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(SwipeableBubble, {
      message: data,
      onReply: propsContext.onReply
    })) : /*#__PURE__*/React.createElement(ChatBubble, {
      message: data
    })));
  }, [propsContext.onReply, propsContext.renderDateProps, rowRendererProp]);
  const rowRenderer = useCallback((type, data) => {
    if (type === LayoutType.Dated) {
      return renderBubble(data, true);
    }

    return renderBubble(data);
  }, [renderBubble]);
  const onScroll = useCallback((e, offsetX, offsetY) => {
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
  const scrollToBottom = useCallback(() => {
    var _recyclerlistviewRef$5;

    (_recyclerlistviewRef$5 = recyclerlistviewRef.current) === null || _recyclerlistviewRef$5 === void 0 ? void 0 : _recyclerlistviewRef$5.scrollToEnd(true);
  }, []);
  return /*#__PURE__*/React.createElement(View, {
    style: {
      minWidth: 1,
      minHeight: 1,
      maxHeight: listHeight
    }
  }, propsContext.showScrollToBottomButton && /*#__PURE__*/React.createElement(FAB, _extends({
    ref: fabRef,
    onPress: scrollToBottom
  }, propsContext.scrollToBottomProps)), /*#__PURE__*/React.createElement(RecyclerListView, {
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
    renderFooter: () => /*#__PURE__*/React.createElement(TypingStatus, {
      ref: typingStatusRef
    }),
    onEndReached: props === null || props === void 0 ? void 0 : props.onEndReached,
    onEndReachedThreshold: props === null || props === void 0 ? void 0 : props.onEndReachedThreshold
  }));
});
//# sourceMappingURL=List.js.map