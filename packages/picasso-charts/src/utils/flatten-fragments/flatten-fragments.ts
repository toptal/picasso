import type { ReactNode } from 'react'
import { Children, cloneElement, Fragment, isValidElement } from 'react'

/**
 * The children, with each fragment replaced by the elements inside it, keyed
 * by the fragment they came from. recharts looks for its chart parts among a
 * chart's children and unwraps fragments with the `react-is` 18 it ships,
 * which does not recognize a React 19 fragment, so on React 19 it dropped the
 * parts inside one
 */
const flattenFragments = (children: ReactNode, keyPrefix = ''): ReactNode[] =>
  Children.toArray(children).flatMap(child => {
    if (!isValidElement<{ children?: ReactNode }>(child)) {
      return [child]
    }

    if (child.type === Fragment) {
      return flattenFragments(child.props.children, `${keyPrefix}${child.key}`)
    }

    return keyPrefix
      ? [cloneElement(child, { key: `${keyPrefix}${child.key}` })]
      : [child]
  })

export default flattenFragments
