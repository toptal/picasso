import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'

import Typography from '../Typography'
import Container from '../Container'

export interface Props extends BaseProps {
  title?: ReactNode
}

export const DrawerTitle = ({ title }: Props) => {
  if (!title) {
    return null
  }

  if (React.isValidElement(title)) {
    return title
  }

  return (
    <Container
      flex
      alignItems='center'
      className='border-gray-100 border-solid border py-4 pr-16 pl-6'
    >
      <Typography variant='heading' size='medium' className='flex-grow'>
        {title}
      </Typography>
    </Container>
  )
}

DrawerTitle.displayName = 'DrawerTitle'

export default DrawerTitle
