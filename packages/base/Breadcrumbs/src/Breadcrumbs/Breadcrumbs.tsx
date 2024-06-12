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
    const { children } = props

    const allItems = React.Children.toArray(children).map((child, index) => (
      // here is fine to use index as key (https://github.com/jsx-eslint/eslint-plugin-react/issues/1123)
      // eslint-disable-next-line react/no-array-index-key
      <li className='p-0 m-0' key={`child-${index}`}>
        {child}
      </li>
    ))

    return (
      <Typography
        as='nav'
        ref={ref}
        className='text-md text-black text-opacity-[54]'
      >
        <ol className='flex flex-wrap items-center p-0 m-0 list-none'>
          {insertSeparator(allItems)}
        </ol>
      </Typography>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
