"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerHaptic = exports.hapticEngine = void 0;

var _reactNative = require("react-native");

var _Chatty = require("../types/Chatty.types");

let hapticEngine;
/* This is a function that returns a promise. It is used to trigger haptic feedback. */

exports.hapticEngine = hapticEngine;
let triggerHaptic;
exports.triggerHaptic = triggerHaptic;

try {
  if (_reactNative.Platform.OS === 'web') {
    throw new Error('Haptics are not supported on web');
  }

  exports.hapticEngine = hapticEngine = require('expo-haptics'); // We're intitalizing the triggerHaptic function based on package they use.

  exports.triggerHaptic = triggerHaptic = async type => {
    switch (type) {
      case _Chatty.HapticType.Light:
        await hapticEngine.impactAsync(hapticEngine.ImpactFeedbackStyle.Light);
        break;

      case _Chatty.HapticType.Medium:
        await hapticEngine.impactAsync(hapticEngine.ImpactFeedbackStyle.Medium);
        break;

      case _Chatty.HapticType.Heavy:
        await hapticEngine.impactAsync(hapticEngine.ImpactFeedbackStyle.Heavy);
        break;

      default:
        break;
    }
  };
} catch {
  try {
    exports.hapticEngine = hapticEngine = require('react-native-haptic-feedback');

    exports.triggerHaptic = triggerHaptic = async type => {
      switch (type) {
        case _Chatty.HapticType.Light:
          hapticEngine.trigger('impactLight');
          break;

        case _Chatty.HapticType.Medium:
          hapticEngine.trigger('impactMedium');
          break;

        case _Chatty.HapticType.Heavy:
          hapticEngine.trigger('impactHeavy');
          break;

        default:
          break;
      }
    };
  } catch (error) {
    console.warn('Haptic engine not found');
  }

  console.warn('Haptic engine not found');
}
//# sourceMappingURL=hapticEngine.js.map