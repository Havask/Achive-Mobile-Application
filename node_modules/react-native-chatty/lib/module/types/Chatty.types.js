export let HapticType;

(function (HapticType) {
  HapticType["Light"] = "light";
  HapticType["Medium"] = "medium";
  HapticType["Heavy"] = "heavy";
})(HapticType || (HapticType = {}));

export const LayoutType = {
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
export let MessageStatus;

(function (MessageStatus) {
  MessageStatus["Sending"] = "sending";
  MessageStatus["Sent"] = "sent";
  MessageStatus["Delivered"] = "delivered";
  MessageStatus["Read"] = "readed";
})(MessageStatus || (MessageStatus = {}));

export let MediaType;

(function (MediaType) {
  MediaType[MediaType["Image"] = 0] = "Image";
  MediaType[MediaType["Video"] = 1] = "Video";
  MediaType[MediaType["Audio"] = 2] = "Audio";
})(MediaType || (MediaType = {}));
//# sourceMappingURL=Chatty.types.js.map