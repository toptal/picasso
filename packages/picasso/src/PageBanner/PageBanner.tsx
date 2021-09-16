import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { BaseProps } from '@toptal/picasso-shared'

import Notification from '../Notification'
import NotificationActions from '../NotificationActions'

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
  Actions: NotificationActions
})
