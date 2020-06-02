import { ReactNode } from 'react'
import { titleCase } from 'title-case'

import isString from '../is-string'

const transformToTitleCase = (node: ReactNode) => {
  if (!node || !isString(node)) {
    return node
  }

  return titleCase(node as string)
}

export default transformToTitleCase
