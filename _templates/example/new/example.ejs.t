---
to: packages/<%= package %>/src/<%= h.changeCase.pascalCase(component) %>/story/<%= h.changeCase.pascalCase(example) %>.example.jsx
---
<%
  Component = h.changeCase.pascalCase(component)
  ExampleName = h.changeCase.pascalCase(example)
-%>
import React from 'react'
import { <%= Component %> } from '@toptal/picasso'

const <%= Component %><%= ExampleName %>Example = () => (
  <div>
    <<%= Component %> />
  </div>
)

export default <%= Component %><%= ExampleName %>Example
