import React, { ReactNode, forwardRef, HTMLAttributes } from 'react'
import { BaseProps, CompoundedComponentWithRef } from '@toptal/picasso-shared'

import Notification from '../Notification'
import NotificationActions from '../NotificationActions'

export interface Props extends BaseProps, HTMLAttributes<HTMLDivElement> {
  /** Children components */
  children: ReactNode
}

export interface StaticProps {
  Actions: typeof NotificationActions
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
}) as CompoundedComponentWithRef<Props, HTMLElement, StaticProps>

PageBanner.defaultProps = {}

PageBanner.displayName = 'PageBanner'

PageBanner.Actions = NotificationActions

export default PageBanner
