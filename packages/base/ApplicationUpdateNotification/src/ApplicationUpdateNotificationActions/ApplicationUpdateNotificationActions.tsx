import React from 'react'
import type { ReactNode } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Container } from '@toptal/picasso-container'
import type {
  AlignItemsType,
  JustifyContentType,
} from '@toptal/picasso-container'

export interface Props extends BaseProps {
  /** Defines the align-items style property */
  alignItems?: AlignItemsType
  /** Defines the justify-content style property */
  justifyContent?: JustifyContentType
  children: ReactNode
}

export const ApplicationUpdateNotificationActions = ({
  justifyContent = 'flex-start',
  alignItems = 'center',
  children,
}: Props) => {
  return (
    <Container
      flex
      direction='row'
      alignItems={alignItems}
      justifyContent={justifyContent}
      gap='xsmall'
    >
      {children}
    </Container>
  )
}

ApplicationUpdateNotificationActions.displayName =
  'ApplicationUpdateNotificationActions'

export default ApplicationUpdateNotificationActions
