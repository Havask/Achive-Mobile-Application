"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadLottie = void 0;

const loadLottie = () => {
  try {
    const LottieView = require('lottie-react-native');

    return LottieView;
  } catch (error) {
    console.warn('Lottie is not installed, falling back to text-based typing effect.');
  }
};

exports.loadLottie = loadLottie;
//# sourceMappingURL=lottie.js.map