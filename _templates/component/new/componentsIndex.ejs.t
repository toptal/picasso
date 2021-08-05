---
inject: true
to: packages/picasso/src/index.ts
before: // insert point for hypen
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default as <%= Name %> } from './<%= Name %>'
export type { <%= Name %>Props } from './<%= Name %>'
