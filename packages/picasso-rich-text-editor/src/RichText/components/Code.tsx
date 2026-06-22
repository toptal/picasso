import type { ReactNode } from 'react'
import React from 'react'

import { codeStyles } from './styles'

type Props = {
  children?: ReactNode
}

const CodeComponent = ({ children }: Props) => {
  return <code className={codeStyles}>{children}</code>
}

export default CodeComponent
