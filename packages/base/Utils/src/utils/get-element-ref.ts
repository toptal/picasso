import type { ForwardedRef, ReactElement } from 'react'

type ElementWithRef<T> = ReactElement & { ref?: ForwardedRef<T> }

/**
 * Reads the ref attached to a React element.
 *
 * `ReactElement` has no public `ref` field, so the cast keeps the lookup in
 * one place. React 19 moves the ref into props instead; reading it from
 * there has to wait until the `react` peer range allows v19, because on
 * v18 `props.ref` is a getter that warns when accessed.
 */
const getElementRef = <T>(element: ReactElement): ForwardedRef<T> => {
  const { ref } = element as ElementWithRef<T>

  return ref ?? null
}

export default getElementRef
