import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import cx from 'classnames'
import type { BaseProps } from '@toptal/picasso-shared'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Action content (e.g. Buttons) */
  children: ReactNode
}

export const ModalActions = forwardRef<HTMLDivElement, Props>(
  function ModalActions(props, ref) {
    const { children, className, style, ...rest } = props

    return (
      <div
        {...rest}
        ref={ref}
        className={cx('mt-0 mx-8 mb-8 text-right', className)}
        style={style}
      >
        {children}
      </div>
    )
  }
)

ModalActions.displayName = 'ModalActions'

export default ModalActions
