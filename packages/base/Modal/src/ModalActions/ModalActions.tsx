import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { twMerge } from '@toptal/picasso-tailwind-merge'

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
        className={twMerge('mt-0 mx-8 mb-8 text-right', className)}
        style={style}
      >
        {children}
      </div>
    )
  }
)

ModalActions.displayName = 'ModalActions'

export default ModalActions
