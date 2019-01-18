---
to: components/<%= h.changeCase.pascalCase(name) %>/styles.js
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({

}))

export default {
  <%= Name %>: {
  }
}
