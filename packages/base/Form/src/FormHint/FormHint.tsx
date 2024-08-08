import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** The text of the hint */
  children: ReactNode
}

export const FormHint = forwardRef<HTMLDivElement, Props>(function FormHint(
  props,
  ref
) {
  const { children, className, style, ...rest } = props

  return (
    <div
      {...rest}
      ref={ref}
      className={twMerge('mt-1', className)}
      style={style}
    >
      <Typography size='xxsmall'>{children}</Typography>
    </div>
  )
})

FormHint.defaultProps = {}

FormHint.displayName = 'FormHint'

export default FormHint
