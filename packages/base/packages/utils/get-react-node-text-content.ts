/* eslint-disable import/no-extraneous-dependencies */
import type { ReactNode } from 'react'

/**
 * Extracts only the text contents of a ReactNode *recursively*.
 *
 * Be aware that depending on the size of the node element tree this function
 * can ve very slow and actually throw a StackOverflow error. Shouldn't be a
 * problem for elements that you expect a shallow or raw text input.
 *
 * @example
 * // Results on `Foo Bar`
 * getReactNodeTextContent(<div>Foo <span>Bar</span></div>)
 *
 * @see {@link https://stackoverflow.com/a/60564620/4595583} for the inspiration
 */
export const getReactNodeTextContent = (node: ReactNode): string => {
  switch (typeof node) {
    case 'number':
    case 'string':
      return String(node).trim()

    case 'object':
      if (Array.isArray(node)) {
        return node.map(getReactNodeTextContent).filter(Boolean).join(' ')
      }

      if (node != null && 'props' in node) {
        return getReactNodeTextContent(node.props.children)
      }

    // All other cases are ignored (booleans, null, undefined and non-elements)
    // Fall through
    default:
      return ''
  }
}
