import React from 'react'
import cx from 'classnames'

import type { ScrollMenuProps } from '../ScrollMenu'
import { ScrollMenu } from '../ScrollMenu'

export interface Props extends ScrollMenuProps {}

const SelectOptions = (props: Props) => {
  const {
    selectedIndex,
    onBlur,
    children,
    style,
    fixedHeader,
    fixedFooter,
    className,
    role,
    ...rest
  } = props

  return (
    <ScrollMenu
      className={cx(
        'shadow-5',
        {
          ['pt-[0.125rem] [&>div:first-child]:pb-2']: Boolean(fixedHeader),
          ['pb-0']: Boolean(fixedFooter),
        },
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

SelectOptions.defaultProps = {
  role: 'menu',
}

SelectOptions.displayName = 'SelectOptions'

export default SelectOptions
