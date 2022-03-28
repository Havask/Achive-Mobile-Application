"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contextMenuView = void 0;

var _reactNative = require("react-native");

let contextMenuView;
exports.contextMenuView = contextMenuView;

try {
  if (_reactNative.Platform.OS === 'ios' && _reactNative.Platform.Version >= 13) {
    exports.contextMenuView = contextMenuView = require('react-native-context-menu-view');
  } else if (_reactNative.Platform.OS === 'android') {
    exports.contextMenuView = contextMenuView = require('react-native-context-menu-view');
  } else {
    throw new Error();
  }
} catch {
  console.warn("react-native-context-menu-view not found. Actions won't work");
}
//# sourceMappingURL=contextMenu.js.map