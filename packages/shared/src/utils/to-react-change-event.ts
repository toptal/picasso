import type React from 'react'

import toReactEvent from './to-react-event'

type FormInputElement =
  | HTMLInputElement
  | HTMLTextAreaElement
  | HTMLSelectElement

/**
 * Boundary cast for form-component `onChange` adapters. Specialization of
 * `toReactEvent` with a tighter generic constraint (form-input elements only)
 * and a dev-only sanity check on the event target.
 *
 * Use in `onCheckedChange` / `onValueChange` adapters when bridging
 * `@base-ui/react`'s native DOM `Event` to Picasso's `React.ChangeEvent<T>`
 * public type.
 *
 * @example
 *   onCheckedChange={(checked, { event }) =>
 *     onChange?.(toReactChangeEvent<HTMLInputElement>(event), checked)
 *   }
 */
const toReactChangeEvent = <T extends FormInputElement = HTMLInputElement>(
  event: Event
): React.ChangeEvent<T> => {
  if (process.env.NODE_ENV !== 'production') {
    const target = event.target as Element | null

    if (target === null || !('tagName' in target)) {
      // eslint-disable-next-line no-console
      console.warn(
        '[picasso] toReactChangeEvent: event.target is not a DOM element. ' +
          'Consumer onChange may receive an unexpected event shape.'
      )
    }
  }

  return toReactEvent<React.ChangeEvent<T>>(event)
}

export default toReactChangeEvent
