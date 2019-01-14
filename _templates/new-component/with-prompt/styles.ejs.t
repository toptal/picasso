---
to: components/<%= h.changeCase.pascalCase(name) %>/styles.js
---
import color from 'color'
import { PicassoProvider } from '../Picasso'

PicassoProvider.override(({ pallete }) => ({
  
}))

export default {
  <%= h.changeCase.pascalCase(name) %>: {
  }
}
