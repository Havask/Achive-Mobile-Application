import React, { useContext, useImperativeHandle, useState } from 'react';
import { Text } from 'react-native';
import { ChatBubble } from '../ChatBubble';
import { PropsContext } from '../Chatty';
import { loadLottie } from '../utils/lottie';

function _TypingStatus(_, ref) {
  const [isTyping, setIsTyping] = useState(false);
  const propsContext = useContext(PropsContext);
  const LottieView = loadLottie();
  useImperativeHandle(ref, () => ({
    setIsTyping: _isTyping => {
      setIsTyping(_isTyping);
    }
  }), []);
  if (!isTyping) return null;

  if (LottieView) {
    if (propsContext !== null && propsContext !== void 0 && propsContext.renderTypingBubble) {
      return propsContext.renderTypingBubble({
        typingAnimation: /*#__PURE__*/React.createElement(LottieView, {
          source: require('../assets/lottie/typing.json'),
          autoPlay: true,
          style: {
            width: 30
          }
        })
      });
    }

    return /*#__PURE__*/React.createElement(ChatBubble, null, /*#__PURE__*/React.createElement(LottieView, {
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

    return /*#__PURE__*/React.createElement(Text, null, "Typing...");
  }
}

export const TypingStatus = /*#__PURE__*/React.memo( /*#__PURE__*/React.forwardRef(_TypingStatus));
//# sourceMappingURL=TypingStatus.js.map