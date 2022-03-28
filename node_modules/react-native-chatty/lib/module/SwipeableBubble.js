import React, { useCallback, useContext, useRef } from 'react';
import { Text } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { ChatBubble } from './ChatBubble';
import { PropsContext } from './Chatty';

function _SwipeableBubble(props) {
  var _propsContext$bubbleP3;

  const {
    onReply,
    message,
    children
  } = props;
  const propsContext = useContext(PropsContext);
  const swipeableRef = useRef(null);

  const _onReply = useCallback(() => {
    var _swipeableRef$current;

    if (!message) return;
    onReply(message); //@ts-ignore

    (_swipeableRef$current = swipeableRef.current) === null || _swipeableRef$current === void 0 ? void 0 : _swipeableRef$current.close();
  }, [message, onReply, swipeableRef]);

  const renderLeftActions = useCallback(() => {
    var _propsContext$bubbleP, _propsContext$bubbleP2;

    return (_propsContext$bubbleP = (_propsContext$bubbleP2 = propsContext.bubbleProps) === null || _propsContext$bubbleP2 === void 0 ? void 0 : _propsContext$bubbleP2.replyDragElement) !== null && _propsContext$bubbleP !== void 0 ? _propsContext$bubbleP : /*#__PURE__*/React.createElement(Text, null, " ");
  }, [(_propsContext$bubbleP3 = propsContext.bubbleProps) === null || _propsContext$bubbleP3 === void 0 ? void 0 : _propsContext$bubbleP3.replyDragElement]);
  if (!onReply) return children !== null && children !== void 0 ? children : /*#__PURE__*/React.createElement(ChatBubble, props);
  return /*#__PURE__*/React.createElement(Swipeable, {
    renderLeftActions: renderLeftActions,
    friction: 2,
    overshootFriction: 2,
    onEnded: () => _onReply(),
    enableTrackpadTwoFingerGesture: true,
    ref: swipeableRef
  }, children !== null && children !== void 0 ? children : /*#__PURE__*/React.createElement(ChatBubble, props));
}

export const SwipeableBubble = /*#__PURE__*/React.memo(_SwipeableBubble);
//# sourceMappingURL=SwipeableBubble.js.map