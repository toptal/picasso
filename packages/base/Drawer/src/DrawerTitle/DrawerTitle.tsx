import type { ReactNode } from 'react'
import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'

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
    <div className='flex items-center border-gray-100 border-0 border-solid border-b py-4 pr-[4rem] pl-6'>
      <Typography variant='heading' size='medium' className='grow'>
        {title}
      </Typography>
    </div>
  )
}

DrawerTitle.displayName = 'DrawerTitle'

export default DrawerTitle
