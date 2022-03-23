import React, { ReactNode } from 'react'
import { Typography } from '@toptal/picasso'

export interface Props {
  children: ReactNode
}

const Subtitle = ({ children }: Props) => (
  <Typography variant='heading' size='large'>
    {children}
  </Typography>
)

Subtitle.displayName = 'Subtitle'

export default Subtitle
