import type { ReactNode } from 'react'
import { Children, Fragment, isValidElement } from 'react'

/**
 * The children, with each fragment replaced by the children inside it, for
 * code that reads elements by type. `Children.map` flattens the arrays this
 * returns and keys each child by the fragment it came from, so the keys stay
 * unique
 */
const flattenFragments = (children: ReactNode): ReactNode[] =>
  Children.map(children, child =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
      ? flattenFragments(child.props.children)
      : child
  ) ?? []

export default flattenFragments
