// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isForwardRef = (Component: any) =>
  typeof Component === 'object' &&
  Component !== null &&
  Component.$$typeof === Symbol.for('react.forward_ref')

export default isForwardRef
