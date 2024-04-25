import React from 'react'
import { Link16 } from '@toptal/picasso-icons'
import { Typography } from '@toptal/picasso-typography'

export type Props = {
  /**
   * renders number of connections
   */
  children: string
}

const TagConnection = ({ children }: Props) => {
  return (
    <Typography
      className='inline-flex items-center gap-[5px] text-gray-600 group-aria-disabled:text-gray-500'
      color='inherit'
      as='span'
      size='xsmall'
    >
      <Link16 />
      {children}
    </Typography>
  )
}

export default TagConnection
