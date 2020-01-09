import React from 'react'
import { BaseProps } from '@toptal/picasso-shared'

const ArrowUpIcon = ({ style, className }: BaseProps) => {
  return (
    <svg
      style={style}
      className={className}
      width='6'
      height='5'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M3 0l3 5H0z' fill='#455065' fillRule='evenodd' />
    </svg>
  )
}

export default ArrowUpIcon
