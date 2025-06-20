import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the error */
  children: ReactNode
}

export const FormWarning = forwardRef<HTMLDivElement, Props>(
  function FormWarning(props, ref) {
    const { children, className, style, ...rest } = props

    return (
      <div
        {...rest}
        ref={ref}
        className={twMerge('mt-1', className)}
        style={style}
      >
        <Typography color='yellow' size='xxsmall' className='cursor-default'>
          {children}
        </Typography>
      </div>
    )
  }
)

FormWarning.displayName = 'FormWarning'

export default FormWarning
