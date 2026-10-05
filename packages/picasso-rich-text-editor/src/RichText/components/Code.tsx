import type { ReactNode } from 'react'
import React from 'react'

import { codeStyles } from './styles'

type Props = {
  children?: ReactNode
}

const CodeComponent = ({ children }: Props): React.ReactElement => {
  return <code className={codeStyles}>{children}</code>
}

export default CodeComponent
