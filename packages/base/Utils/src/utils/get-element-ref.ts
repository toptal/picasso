import type { ForwardedRef, ReactElement } from 'react'
import React from 'react'

type ElementWithRef<T> = ReactElement & { ref?: ForwardedRef<T> }
type PropsWithRef<T> = { ref?: ForwardedRef<T> }

// React 19 moved element refs into props — `element.ref` is deprecated there
// and slated for removal — while earlier majors keep the ref on the element
// and their dev builds warn when `props.ref` is touched instead. Each major
// warns on the other's location, so the read must be version-aware rather
// than a fallback chain.
const isReact19OrNewer = Number.parseInt(React.version, 10) >= 19

/**
 * Reads the ref attached to a React element from the location the running
 * React major stores it in.
 */
const getElementRef = <T>(element: ReactElement): ForwardedRef<T> => {
  const ref = isReact19OrNewer
    ? (element.props as PropsWithRef<T>).ref
    : (element as ElementWithRef<T>).ref

  return ref ?? null
}

export default getElementRef
