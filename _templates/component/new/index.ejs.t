---
to: src/components/<%= h.changeCase.pascalCase(name) %>/index.ts
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default } from './<%= Name %>'
