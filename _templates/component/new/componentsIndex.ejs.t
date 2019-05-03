---
inject: true
to: src/components/index.ts
before: export { default } from './Picasso'
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default as <%= Name %> } from './<%= Name %>'