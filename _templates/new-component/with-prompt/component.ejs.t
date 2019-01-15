---
to: components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

import styles from './styles'

const <%= Name %> = props => {
  return null
}

<%= Name %>.propTypes = {
}

<%= Name %>.defaultProps = {
}

export default withStyles(styles.<%= Name %>)(<%= Name %>)
