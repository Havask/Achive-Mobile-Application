"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrevious = usePrevious;

var _react = require("react");

/**
 * UsePrevious returns the previous value of a given value.
 * @param {any} value - any
 * @returns The previous value of the input value.
 */
function usePrevious(value) {
  const ref = (0, _react.useRef)();
  (0, _react.useEffect)(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
//# sourceMappingURL=usePrevious.js.map