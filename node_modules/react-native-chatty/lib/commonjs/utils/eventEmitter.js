"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChatEmitter = exports.ChatBubbleEmitter = void 0;

var _eventemitter = require("eventemitter3");

const ChatEmitter = new _eventemitter.EventEmitter();
exports.ChatEmitter = ChatEmitter;
const ChatBubbleEmitter = new _eventemitter.EventEmitter();
exports.ChatBubbleEmitter = ChatBubbleEmitter;
//# sourceMappingURL=eventEmitter.js.map