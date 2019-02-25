---
to: components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React from 'react'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

interface Props {
}

const <%= Name %>: React.FunctionComponent<Props> = props => {
  return null
}

<%= Name %>.defaultProps = {
}

export default withStyles(styles)(<%= Name %>)
