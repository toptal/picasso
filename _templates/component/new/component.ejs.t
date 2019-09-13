---
to: src/components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React, { forwardRef } from 'react'
import { withStyles } from '@material-ui/core/styles'

import { StandardProps } from '../Picasso'
import styles from './styles'

export interface Props extends StandardProps {
}

export const <%= Name %> = forwardRef<HTMLElement, Props>(function <%= Name %>(props, ref) {
  return null
})

<%= Name %>.defaultProps = {
}

<%= Name %>.displayName = '<%= Name %>'

export default withStyles(styles)(<%= Name %>)
