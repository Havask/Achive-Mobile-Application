"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageStatus = exports.MediaType = exports.LayoutType = exports.HapticType = void 0;
let HapticType;
exports.HapticType = HapticType;

(function (HapticType) {
  HapticType["Light"] = "light";
  HapticType["Medium"] = "medium";
  HapticType["Heavy"] = "heavy";
})(HapticType || (exports.HapticType = HapticType = {}));

const LayoutType = {
  Normal: 0,
  Replied: 1,
  Dated: 2,
  Long: 3,
  Long2x: 4,
  Long3x: 5,
  ExtremeLong: 6,
  Media: 7,
  Media2x: 8
};
exports.LayoutType = LayoutType;
let MessageStatus;
exports.MessageStatus = MessageStatus;

(function (MessageStatus) {
  MessageStatus["Sending"] = "sending";
  MessageStatus["Sent"] = "sent";
  MessageStatus["Delivered"] = "delivered";
  MessageStatus["Read"] = "readed";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));

let MediaType;
exports.MediaType = MediaType;

(function (MediaType) {
  MediaType[MediaType["Image"] = 0] = "Image";
  MediaType[MediaType["Video"] = 1] = "Video";
  MediaType[MediaType["Audio"] = 2] = "Audio";
})(MediaType || (exports.MediaType = MediaType = {}));
//# sourceMappingURL=Chatty.types.js.map