import type { ReactNode } from 'react'
import { apStyleTitleCase as titleCase } from 'ap-style-title-case'

import isString from './is-string'

const toTitleCase = (node: ReactNode) => {
  if (!node || !isString(node)) {
    return node
  }

  return titleCase(node as string)
}

export default toTitleCase
