import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { StandardProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends StandardProps, HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
}

const AccordionDetails = forwardRef<HTMLDivElement, Props>(
  function AccordionDetails(props, ref) {
    const {
      children,
      // Avoid passing external classes inside the rest props
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      classes: externalClasses,
      className,
      ...rest
    } = props

    return (
      <div {...rest} className={twMerge('flex p-0', className)} ref={ref}>
        {children}
      </div>
    )
  }
)

export default AccordionDetails
