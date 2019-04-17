import React, { MouseEvent, FunctionComponent, ReactNode } from 'react'
import MUILink from '@material-ui/core/Link'

import { BaseProps, JssProps } from '../Picasso'
import './styles'

type UnderlineType = 'none' | 'hover' | 'always'

interface Props extends BaseProps, Partial<JssProps> {
  underline?: UnderlineType
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void
  children: ReactNode
}

export const Link: FunctionComponent<Props> = ({
  underline,
  onClick,
  children,
  classes,
  className,
  style
}) => (
  <MUILink
    underline={underline}
    onClick={onClick}
    classes={classes}
    className={className}
    style={style}
  >
    {children}
  </MUILink>
)

Link.displayName = 'Link'

export default Link
