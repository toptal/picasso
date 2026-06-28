import type React from 'react'

const noop = (): void => {}

/**
 * Boundary cast at the `@base-ui/react` ↔ Picasso form-component interface.
 *
 * `@base-ui/react` v1 callbacks surface the native DOM `Event` via
 * `eventDetails.event`. Picasso's public `onChange` / `onClick` / etc. types
 * pre-date the migration and expect React-flavored `React.SyntheticEvent`
 * variants (`React.ChangeEvent<T>`, `React.MouseEvent<T>`, …).
 *
 * React doesn't expose a public API to construct a real SyntheticEvent. This
 * helper bridges the type boundary by returning a Proxy that:
 *   - Forwards all native-event property access unchanged (identity preserved
 *     for `target`, `currentTarget`, `bubbles`, `cancelable`, `defaultPrevented`,
 *     `type`, `timeStamp`, `isTrusted`, `preventDefault`, `stopPropagation`, etc.).
 *   - Synthesizes the four React-SyntheticEvent shim methods that don't exist
 *     on native events: `nativeEvent`, `persist`, `isDefaultPrevented`,
 *     `isPropagationStopped`.
 *   - Does NOT mutate the underlying native event (Proxy wraps; doesn't touch
 *     the original).
 *
 * Runtime: O(1) Proxy allocation + per-access dispatch. No copying.
 *
 * Use the specialized `toReactChangeEvent<T>` helper for form-input `onChange`
 * adapters (tighter generic constraint catches misuse). Use this primitive for
 * non-change-event cases (Slider value events, MouseEvent adapters, etc.).
 *
 * @example
 *   const reactEvent = toReactEvent<React.MouseEvent<HTMLButtonElement>>(nativeEvent)
 *   onClick?.(reactEvent)
 */
const toReactEvent = <R extends React.SyntheticEvent>(event: Event): R =>
  new Proxy(event, {
    get(target, key) {
      switch (key) {
        case 'nativeEvent':
          return target
        case 'persist':
          // React 17+ removed event pooling; persist is a no-op in modern React.
          return noop
        case 'isDefaultPrevented':
          return () => target.defaultPrevented
        case 'isPropagationStopped':
          // Native events don't track propagation-stop state after dispatch;
          // returning false is safe for consumers checking "did I already stop?".
          return () => false
        default: {
          const value = Reflect.get(target, key, target)

          // Native event methods (preventDefault, stopPropagation, …) must keep
          // the native event as `this`; invoked through the Proxy they'd receive
          // the Proxy as `this` and throw "Illegal invocation" in real browsers.
          return typeof value === 'function' ? value.bind(target) : value
        }
      }
    },
  }) as unknown as R

export default toReactEvent
