import type { SyntheticEvent } from 'react'

import type { ValueType } from '../../types'

type SelectEventTarget = { value: ValueType | ValueType[]; name?: string }

/**
 * Synthesizes a change-shaped event whose target carries the resolved
 * value/name pair for downstream form bindings.
 *
 * Note: the consumer's `onChange` is typed with `any` because callers
 * parameterize it over a conditional value type (e.g. `M extends true ? T[] : T`).
 * React's `ChangeEvent` is contravariant in its target shape, which makes any
 * concrete declaration here incompatible with the narrower consumer signature.
 * The runtime contract is documented by the `SelectEventTarget` shape below.
 */
const fireOnChangeEvent = ({
  event,
  value: eventValue,
  name,
  onChange,
}: {
  event: SyntheticEvent
  value: ValueType | ValueType[]
  name?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (event: any) => void
}) => {
  event.persist()
  ;(event as unknown as { target: SelectEventTarget }).target = {
    value: eventValue,
    name,
  }
  onChange?.(event)
}

export default fireOnChangeEvent
