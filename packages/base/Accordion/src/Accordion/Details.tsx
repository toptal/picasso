import type { ReactNode } from 'react'
import React from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'
import type { StandardProps } from '@toptal/picasso-shared'

import { detailsWrapperClasses } from './styles'

export interface DetailsProps extends Omit<StandardProps, 'classes'> {
  /** Content of the details */
  children: ReactNode
}

const Details = (props: DetailsProps) => {
  const { children, className, ...rest } = props

  return (
    <div {...rest} className={twMerge(cx(...detailsWrapperClasses), className)}>
      {children}
    </div>
  )
}

export default Details
