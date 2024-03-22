import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Title content */
  children: ReactNode
}

export const ModalTitle = forwardRef<HTMLDivElement, Props>(function ModalTitle(
  props,
  ref
) {
  const { children, className, style, ...rest } = props

  return (
    <div
      {...rest}
      ref={ref}
      className={cx('pr-6 mt-8 mx-8 mb-0', className)}
      style={style}
    >
      <Typography variant='heading' size='large'>
        {children}
      </Typography>
    </div>
  )
})

ModalTitle.displayName = 'ModalTitle'

export default ModalTitle
