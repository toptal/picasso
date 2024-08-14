---
to: <%= packagePath %>/src/index.ts
---
<%
  Name = h.changeCase.pascalCase(shortName)
-%>

import { SPACING_4 } from '@toptal/picasso-utils'

console.log('Hello from <%= packageName %>')

export { SPACING_4 as <%= Name %> }
