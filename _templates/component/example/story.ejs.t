---
inject: true
to: packages/<%= package %>/src/<%= h.changeCase.pascalCase(component) %>/story/index.jsx
append: true
---
<%
  Component = h.changeCase.pascalCase(component)
  ExampleName = h.changeCase.pascalCase(example)
-%>
  .addExample('<%= Component %>/story/<%= ExampleName %>.example.jsx', '<%= h.changeCase.sentence(ExampleName) %>')
