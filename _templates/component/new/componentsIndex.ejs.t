---
inject: true
to: packages/<%= package %>/src/index.ts
before: // placeholder for hygen generator. Genereates export before this comment.
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default as <%= Name %> } from './<%= Name %>'
export type { <%= Name %>Props } from './<%= Name %>'
