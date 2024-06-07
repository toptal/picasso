import type { ReactNode, HTMLAttributes } from 'react'
import React from 'react'
import type { StandardProps } from '@toptal/picasso-shared'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const AccordionDetails = (props: Props) => {
  const {
    children,
    // Avoid passing external classes inside the rest props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    classes: externalClasses,
    ...rest
  } = props

  return (
    <div {...rest} className='flex p-0'>
      {children}
    </div>
  )
}

export default AccordionDetails
