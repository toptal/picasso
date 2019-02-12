---
to: components/<%= h.changeCase.pascalCase(component) %>/story/<%= h.changeCase.pascalCase(example) %>-example.tsx
---
<%
  Component = h.changeCase.pascalCase(component)
  ExampleName = h.changeCase.pascalCase(example)
-%>
import React from 'react'

import <%= Component %> from '../<%= Component %>'

const <%= Component %><%= ExampleName %>Example = () => (
  <div>
    <<%= Component %> />
  </div>
)

export default <%= Component %><%= ExampleName %>Example
