import React, { ReactNode } from 'react'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { DelayType, VariantType } from '@toptal/picasso/Tooltip/Tooltip'

import Ellipsis from '../Ellipsis'

export interface Props extends BaseProps, TypographyProps {
  /** A typography which can possibly overflow */
  children?: ReactNode
  /** A content to show in tooltip when typography overflows. By default, TypographyOverflow's children are used. */
  tooltipContent?: ReactNode
  /** A delay in showing the tooltip when typography overflows. */
  tooltipDelay?: DelayType
  /** Tooltip color variant to use. */
  tooltipVariant?: VariantType
}

export const TypographyOverflow = ({
  children,
  tooltipContent,
  tooltipDelay,
  tooltipVariant,
  noWrap,
  ...rest
}: Props) => {
  const typography = (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography {...rest} noWrap={noWrap}>
      {children}
    </Typography>
  )

  return (
    <Ellipsis
      renderWhenEllipsis={child => (
        <Tooltip
          content={tooltipContent ?? children}
          variant={tooltipVariant}
          placement='top'
          delay={tooltipDelay}
          interactive
        >
          {child}
        </Tooltip>
      )}
    >
      {typography}
    </Ellipsis>
  )
}

TypographyOverflow.displayName = 'TypographyOverflow'

TypographyOverflow.defaultProps = {
  noWrap: true
}

export default TypographyOverflow
