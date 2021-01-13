---
to: src/components/<%= h.changeCase.pascalCase(name) %>/<%= h.changeCase.pascalCase(name) %>.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import React, { forwardRef } from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { BaseProps } from '@toptal/picasso-shared'
import styles from './styles'

export interface Props extends BaseProps {
}

const useStyles = makeStyles<Theme>(styles)

export const <%= Name %> = forwardRef<HTMLElement, Props>(function <%= Name %>(props, ref) {
  const classes = useStyles()

  return null
})

<%= Name %>.defaultProps = {
}

<%= Name %>.displayName = '<%= Name %>'

export default <%= Name %>
