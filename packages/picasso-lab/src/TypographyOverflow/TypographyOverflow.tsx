import React, { ReactText } from 'react'
import { BaseProps } from '@toptal/picasso-shared'
import { Tooltip, Typography, TypographyProps } from '@toptal/picasso'

import Ellipsis from '../Ellipsis'

export interface Props extends BaseProps, TypographyProps {
  /** A typography which can possibly overflow */
  children: ReactText
}

export const TypographyOverflow = ({ children, noWrap, ...rest }: Props) => {
  const typography = (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Typography {...rest} noWrap={noWrap}>
      {children}
    </Typography>
  )

  return (
    <Ellipsis
      renderWhenEllipsis={child => (
        <Tooltip content={children} placement='top' interactive preventOverflow>
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
