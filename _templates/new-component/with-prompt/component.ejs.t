---
to: components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.jsx
---
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import styles from './styles'

const <%= h.changeCase.pascalCase(name) %> = props => {
  return null
}

<%= h.changeCase.pascalCase(name) %>.propTypes = {
}

<%= h.changeCase.pascalCase(name) %>.defaultProps = {
}

export default withStyles(styles.<%= h.changeCase.pascalCase(name) %>)(<%= h.changeCase.pascalCase(name) %>)
