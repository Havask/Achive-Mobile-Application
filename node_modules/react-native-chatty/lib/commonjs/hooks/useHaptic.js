"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHaptic = useHaptic;

var _react = require("react");

var _hapticEngine = require("../utils/hapticEngine");

/**
 * `useHaptic` returns a `trigger` function that triggers haptic feedback
 * @returns A function that triggers haptic feedback.
 */
function useHaptic() {
  const trigger = (0, _react.useCallback)(async type => {
    await (0, _hapticEngine.triggerHaptic)(type).catch(err => console.error('Error while triggering haptic', err));
  }, []);
  return {
    trigger
  };
}
//# sourceMappingURL=useHaptic.js.map