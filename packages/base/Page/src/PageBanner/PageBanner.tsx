import type { ReactNode, HTMLAttributes } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Notification , NotificationActions } from '@toptal/picasso-notification'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Children components */
  children: ReactNode
}

export const PageBanner = forwardRef<HTMLDivElement, Props>(function PageBanner(
  props,
  ref
) {
  const { children, className, ...rest } = props

  return (
    <Notification {...rest} ref={ref} className={className}>
      {children}
    </Notification>
  )
})

PageBanner.displayName = 'PageBanner'

export default Object.assign(PageBanner, {
  Actions: NotificationActions,
})
