import React, { FC } from 'react'

import BaseTooltip, { Props as BaseProps } from '../BaseTooltip'

export { PlacementType } from '../BaseTooltip'

export type Props = Omit<BaseProps, 'preventOverflowOptions'> & {
  /** Allows tooltip to change its placement when it overflows */
  preventOverflow?: boolean
}

export const Tooltip: FC<Props> = ({ preventOverflow, ...props }) => (
  <BaseTooltip
    preventOverflowOptions={{ enabled: preventOverflow }}
    {...props} // eslint-disable-line react/jsx-props-no-spreading
  />
)

Tooltip.defaultProps = {
  preventOverflow: false
}

export default Tooltip
