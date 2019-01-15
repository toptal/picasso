---
to: components/<%= h.changeCase.pascalCase(name) %>/styles.js
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
/* eslint-disable no-unused-vars */
import color from 'color'

import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  
}))

export default {
  <%= Name %>: {
  }
}
