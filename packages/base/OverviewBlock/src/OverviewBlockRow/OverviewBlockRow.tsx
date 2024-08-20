import type { HTMLAttributes } from 'react'
import React from 'react'
import { twMerge } from '@toptal/picasso-tailwind-merge'

type Props = HTMLAttributes<HTMLDivElement>

const OverviewBlockRow = (props: Props) => {
  const { className, ...rest } = props

  return (
    <div
      {...rest}
      className={twMerge(
        'flex justify-start rounded-md py-4 border border-solid border-gray-200 bg-white',
        '[&>*]:flex-1',
        '[&:not(:first-child)]:border-t-0 [&:not(:first-child)]:rounded-t-none',
        '[&:not(:last-child)]:border-b-0 [&:not(:last-child)]:rounded-b-none [&:not(:last-child)]:pb-0',
        className
      )}
    />
  )
}

OverviewBlockRow.displayName = 'OverviewBlockRow'

export default OverviewBlockRow
