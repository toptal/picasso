import type { ReactNode } from 'react'
import React from 'react'

import { codeBlockStyles } from './styles'

type Props = {
  children?: ReactNode
}

const CodeBlockComponent = ({ children }: Props): React.ReactElement => {
  return <pre className={codeBlockStyles}>{children}</pre>
}

export default CodeBlockComponent
