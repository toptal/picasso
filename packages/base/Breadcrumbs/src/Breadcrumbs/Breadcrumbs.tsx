// here is fine to use index as key (https://github.com/jsx-eslint/eslint-plugin-react/issues/1123)
/* eslint-disable react/no-array-index-key */
import type { ReactNode } from 'react'
import React, { forwardRef } from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import './styles'
import { Typography } from '@toptal/picasso-typography'
import { ChevronRight16 } from '@toptal/picasso-icons'

export interface Props extends BaseProps {
  /** Content of Breadcrumbs */
  children: ReactNode
}

const insertSeparator = (items: React.ReactElement[]): React.ReactElement[] => {
  return items.reduce<React.ReactElement[]>((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(
        current,
        <li
          aria-hidden
          key={`separator-${index}`}
          className='flex select-none ml-1 mr-1'
        >
          <ChevronRight16 />
        </li>
      )
    } else {
      acc.push(current)
    }

    return acc
  }, [])
}

export const Breadcrumbs = forwardRef<HTMLDivElement, Props>(
  function Breadcrumbs(props, ref) {
    const { children } = props

    const allItems = React.Children.toArray(children).map((child, index) => (
      <li key={`child-${index}`}>{child}</li>
    ))

    return (
      <Typography as='nav' ref={ref} className='text-md'>
        <ol className='flex flex-wrap items-center p-0 m-0 list-none'>
          {insertSeparator(allItems)}
        </ol>
      </Typography>
    )
  }
)

Breadcrumbs.displayName = 'Breadcrumbs'

export default Breadcrumbs
