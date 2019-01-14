---
to: components/<%= h.changeCase.pascalCase(name) %>/index.js
---
<%
  Name = h.changeCase.pascalCase(name)
%>export { default } from './<%= Name %>'
