"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HASHTAG_PATTERN_SHAPE = exports.ALL_PATERNS_SHAPES = void 0;
exports.LoadAllPaternShapes = LoadAllPaternShapes;
exports.URL_PATTERN_SHAPE = exports.MENTION_PATTERN_SHAPE = void 0;
exports.loadParsedText = loadParsedText;

function loadParsedText() {
  try {
    const ReactNativeParsedText = require('react-native-parsed-text').default;

    return ReactNativeParsedText;
  } catch (err) {
    console.warn("Couldn't load react-native-parsed-text, please install it if you want to use the pattern feature");
  }
}

const HASHTAG_PATTERN_SHAPE = {
  pattern: /#(\w+)/,
  style: {
    color: 'cyan'
  }
};
exports.HASHTAG_PATTERN_SHAPE = HASHTAG_PATTERN_SHAPE;
const MENTION_PATTERN_SHAPE = {
  pattern: /\B@\w+/g,
  style: {
    color: 'orange'
  }
};
exports.MENTION_PATTERN_SHAPE = MENTION_PATTERN_SHAPE;
const URL_PATTERN_SHAPE = {
  type: 'url',
  style: {
    color: 'blue'
  }
};
exports.URL_PATTERN_SHAPE = URL_PATTERN_SHAPE;
const ALL_PATERNS_SHAPES = [HASHTAG_PATTERN_SHAPE, MENTION_PATTERN_SHAPE, URL_PATTERN_SHAPE];
/**
 * Load all the patterns and set the onPress function
 * @param onPress - (pattern: string, index: number) => void
 */

exports.ALL_PATERNS_SHAPES = ALL_PATERNS_SHAPES;

function LoadAllPaternShapes(onPress) {
  ALL_PATERNS_SHAPES.map(pattern => {
    if (pattern !== null && pattern !== void 0 && pattern.onPress) return;
    pattern.onPress = onPress;
    Object.freeze(pattern);
  });
}
//# sourceMappingURL=patterns.js.map