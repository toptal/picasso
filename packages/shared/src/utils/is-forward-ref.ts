const isForwardRef = (Component: unknown): boolean =>
  typeof Component === 'object' &&
  Component !== null &&
  (Component as { $$typeof?: symbol }).$$typeof ===
    Symbol.for('react.forward_ref')

export default isForwardRef
