import React, { ReactNode } from 'react'
import { Typography } from '@toptal/picasso'

export interface Props {
  children: ReactNode
}

const Paragraph = ({ children }: Props) => <Typography>{children}</Typography>

Paragraph.displayName = 'Paragraph'

export default Paragraph
