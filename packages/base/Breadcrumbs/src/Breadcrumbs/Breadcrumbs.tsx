import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { Typography } from '@toptal/picasso-typography'

import insertSeparator from './utils/insertSeparator'

export interface Props extends BaseProps {
  /** Content of Breadcrumbs */
  children: ReactNode
}

export const Breadcrumbs = forwardRef<HTMLDivElement, Props>(
  function Breadcrumbs(props, ref) {
    const { children, 'data-testid': dataTestId } = props

    const allItems = React.Children.map(children, child => (
      <li className='p-0 m-0'>{child}</li>
    ))

    return (
      <Typography
        as='nav'
        ref={ref}
        className='text-md text-black/[.54]'
        data-testid={dataTestId}
      >
        <ol className='flex flex-wrap items-center p-0 m-0 list-none'>
          {allItems && insertSeparator(allItems)}
        </ol>
      </Typography>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
