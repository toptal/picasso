import React from 'react'
import { TypographyOverflow } from '@toptal/picasso-typography-overflow'

interface Props {
  children: string
  disabled?: boolean
}

const TabDescription = ({ children, disabled }: Props) => {
  const color = disabled ? 'inherit' : undefined

  return (
    <TypographyOverflow
      className='mt-[2px]'
      size='xxsmall'
      inline
      color={color}
    >
      {children}
    </TypographyOverflow>
  )
}

export default TabDescription
