---
to: components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React, { FunctionComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

interface Props {
}

export const <%= Name %>: FunctionComponent<Props> = props => {
  return null
}

<%= Name %>.defaultProps = {
}

<%= Name %>.displayName = '<%= Name %>'

export default withStyles(styles)(<%= Name %>)
