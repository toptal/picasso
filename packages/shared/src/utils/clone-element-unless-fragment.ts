import type { Attributes, ReactElement } from 'react'
import { cloneElement, Fragment } from 'react'

/**
 * `cloneElement`, except that a Fragment keeps only its `key`. A Fragment takes
 * no other props: React 18 drops them silently and React 19 logs an error for
 * each, so leaving them out renders the same on both
 */
const cloneElementUnlessFragment = <P>(
  element: ReactElement<P>,
  props: Partial<P> & Attributes
): ReactElement<P> => {
  if (element.type !== Fragment) {
    return cloneElement(element, props)
  }

  return props.key === undefined
    ? element
    : cloneElement(element, { key: props.key } as Partial<P> & Attributes)
}

export default cloneElementUnlessFragment
