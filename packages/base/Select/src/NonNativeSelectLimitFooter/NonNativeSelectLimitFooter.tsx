import React from 'react'
import type { BaseProps } from '@toptal/picasso-shared'
import { MenuItem } from '@toptal/picasso-menu'

interface Props extends BaseProps {
  totalCount: number
  limit: number
}

export const NonNativeSelectLimitFooter = ({
  totalCount,
  limit,
  'data-testid': dataTestId,
}: Props) => {
  return limit < totalCount ? (
    <MenuItem
      data-testid={dataTestId}
      titleCase={false}
      className='text-graphite-700 py-3 px-4 border border-solid border-gray-300 text-[0.6875rem]'
      disabled
    >
      Showing only first {limit} of {totalCount} items
    </MenuItem>
  ) : null
}

export default NonNativeSelectLimitFooter
