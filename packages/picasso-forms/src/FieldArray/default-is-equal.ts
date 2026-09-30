// react-final-form-arrays' default, which it does not export: the same items
// in the same order
export const defaultIsEqual = (left: unknown, right: unknown) =>
  left === right ||
  (Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((item, index) => item === right[index]))
