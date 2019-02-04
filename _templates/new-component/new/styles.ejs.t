---
to: components/<%= h.changeCase.pascalCase(name) %>/styles.ts
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import { PicassoProvider } from '../Picasso'
import { Theme } from '@material-ui/core/styles'

PicassoProvider.override(({ palette }: Theme) => ({

}))

export default ({ palette }: Theme) => ({
})
