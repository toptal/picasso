import React, { ReactNode } from 'react'
import { Typography } from '@toptal/picasso'

export interface Props {
  children: ReactNode
}

const Title = ({ children }: Props) => (
  <Typography variant='heading' size='xlarge'>
    {children}
  </Typography>
)

Title.displayName = 'Title'

export default Title
