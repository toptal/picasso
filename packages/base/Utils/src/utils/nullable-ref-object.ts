/**
 * The ref object `useRef<T>(null)` and `createRef<T>()` return on every
 * `@types/react` major: `RefObject<T>` on 17, `RefObject<T | null>` on 19.
 *
 * Declare a ref with it when the ref is both read and passed to a JSX `ref`
 * prop. `RefObject<T | null>` is the type for read-only receivers, but
 * `@types/react` 17 rejects it as a JSX `ref`; `RefObject<T>` is accepted
 * there, but on 19 it claims a non-null `current`.
 */
export interface NullableRefObject<T> {
  readonly current: T | null
}
