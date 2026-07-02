import type { ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'

import { summaryWrapperClasses } from './styles'

export interface SummaryProps extends Omit<StandardProps, 'classes'> {
  /** Content of the summary */
  children: ReactNode
}

const Summary = (props: SummaryProps) => {
  const { children, className, ...rest } = props

  return (
    <div {...rest} className={twMerge(cx(...summaryWrapperClasses), className)}>
      {children}
    </div>
  )
}

export default Summary
