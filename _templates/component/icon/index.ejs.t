---
inject: true
to: src/components/Icon/index.ts
append: true
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
export { default as <%= Name %> } from './<%= Name %>'