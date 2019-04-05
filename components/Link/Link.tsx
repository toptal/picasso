import React from 'react'
import MUILink, { LinkProps } from '@material-ui/core/Link'

import './styles'

export const Link: React.FunctionComponent<LinkProps> = props => {
  return <MUILink {...props} />
}

Link.displayName = 'Link'

export default Link
