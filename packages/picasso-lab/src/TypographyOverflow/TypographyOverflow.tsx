import React, { ReactNode } from 'react'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'
import { BaseProps } from '@toptal/picasso-shared'
import { DelayType, VariantType } from '@toptal/picasso/Tooltip/Tooltip'
import { makeStyles, Theme } from '@material-ui/core/styles'

import Ellipsis from '../Ellipsis'
import styles from './styles'

export interface Props extends BaseProps, TypographyProps {
  /** A typography which can possibly overflow */
  children?: ReactNode
  /** How many vertical lines of content should be displayed */
  lines?: number
  /** A content to show in tooltip when typography overflows. By default, TypographyOverflow's children are used. */
  tooltipContent?: ReactNode
  /** A delay in showing the tooltip when typography overflows. */
  tooltipDelay?: DelayType
  /** Tooltip color variant to use. */
  tooltipVariant?: VariantType
  /** Do not show tooltips for shorten content. */
  tooltipDisabled?: boolean
}

const useStyles = makeStyles<Theme, Props>(styles, {
  name: 'TypographyOverflow'
})

export const TypographyOverflow = ({
  children,
  lines = 1,
  tooltipContent,
  tooltipDelay,
  tooltipVariant,
  tooltipDisabled,
  ...rest
}: Props) => {
  const classes = useStyles({ lines })

  return (
    <Ellipsis
      renderWhenEllipsis={child => (
        <Tooltip
          disableListeners={tooltipDisabled}
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
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Typography {...rest} className={classes.wrapper}>
        {children}
      </Typography>
    </Ellipsis>
  )
}

TypographyOverflow.displayName = 'TypographyOverflow'

TypographyOverflow.defaultProps = {
  noWrap: true
}

export default TypographyOverflow
