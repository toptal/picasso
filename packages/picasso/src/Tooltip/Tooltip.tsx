import React, { FC } from 'react'

import TooltipBase, { Props as BaseProps } from '../TooltipBase'

export * from '../TooltipBase'

export type Props = Omit<BaseProps, 'preventOverflowOptions'> & {
  /** Allows tooltip to change its placement when it overflows */
  preventOverflow?: boolean
}

export const Tooltip: FC<Props> = ({ preventOverflow, ...props }) => (
  <TooltipBase
    preventOverflowOptions={{ enabled: preventOverflow }}
    {...props} // eslint-disable-line react/jsx-props-no-spreading
  />
)

Tooltip.defaultProps = {
  preventOverflow: false
}

export default Tooltip
