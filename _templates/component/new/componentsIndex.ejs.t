---
inject: true
to: packages/<%= package %>/src/index.ts
before: // hygen code generator inserts export statements above this comment.
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default as <%= Name %> } from './<%= Name %>'
export type { <%= Name %>Props } from './<%= Name %>'
