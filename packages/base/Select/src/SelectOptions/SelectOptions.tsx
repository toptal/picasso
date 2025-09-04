import React from 'react'
import { twJoin } from '@toptal/picasso-tailwind-merge'

import type { ScrollMenuProps } from '../ScrollMenu'
import { ScrollMenu } from '../ScrollMenu'

export interface Props extends ScrollMenuProps {}

const SelectOptions = ({ role = 'menu', ...props }: Props) => {
  const {
    selectedIndex,
    onBlur,
    children,
    style,
    fixedHeader,
    fixedFooter,
    className,
    ...rest
  } = props

  return (
    <ScrollMenu
      className={twJoin(
        'shadow-5',
        Boolean(fixedHeader) && 'pt-[0.125rem] [&>div:first-child]:pb-2',
        Boolean(fixedFooter) && 'pb-0',
        className
      )}
      style={style}
      selectedIndex={selectedIndex}
      fixedFooter={fixedFooter}
      fixedHeader={fixedHeader}
      onBlur={onBlur}
      role={role}
      {...rest}
    >
      {children}
    </ScrollMenu>
  )
}

SelectOptions.displayName = 'SelectOptions'

export default SelectOptions
