"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectImage = selectImage;
let imagePicker;

try {
  imagePicker = require('expo-image-picker');
} catch {
  try {
    imagePicker = require('react-native-image-picker');
  } catch {
    console.warn('expo-image-picker or react-native-image-picker not found. Please install it to use this feature.');
  }
}
/**
 * It launches the native image picker
 * @returns The image data is being returned as a base64 string.
 */


async function selectImage() {
  var _imagePicker;

  if ((_imagePicker = imagePicker) !== null && _imagePicker !== void 0 && _imagePicker.launchImageLibraryAsync) {
    return await imagePicker.launchImageLibraryAsync({
      base64: true
    });
  }

  return await imagePicker.launchImageLibrary({
    includeBase64: true
  });
}
//# sourceMappingURL=imagePicker.js.map