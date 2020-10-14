import React, { FC } from 'react'

import BaseTooltip, { Props as BaseProps } from './BaseTooltip'

export { PlacementType } from './BaseTooltip'

export type Props = Omit<BaseProps, 'preventOverflowOptions'>

export const Tooltip: FC<Props> = props => (
  <BaseTooltip {...props} /> // eslint-disable-line react/jsx-props-no-spreading
)

export default Tooltip
