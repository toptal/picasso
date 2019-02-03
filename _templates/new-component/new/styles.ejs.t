---
to: components/<%= h.changeCase.pascalCase(name) %>/styles.ts
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import { PicassoProvider } from '../Picasso'
import { Palette } from '@material-ui/core/styles/createPalette'

PicassoProvider.override(({ palette }: { palette: Palette }) => ({

}))

export default ({ palette }: { palette: Palette }) => ({
})
