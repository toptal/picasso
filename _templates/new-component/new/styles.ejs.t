---
to: components/<%= h.changeCase.pascalCase(name) %>/styles.ts
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ palette }: { palette: any }) => ({

}))

export default ({ palette }) => ({
})
