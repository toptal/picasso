---
inject: true
to: packages/<%= package %>/src/index.ts
before: export \* from './Icon'
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default as <%= Name %> } from './<%= Name %>'
export type { <%= Name %>Props } from './<%= Name %>'
