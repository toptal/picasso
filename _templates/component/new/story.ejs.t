---
to: components/<%= h.changeCase.pascalCase(name) %>/story/index.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import PicassoBook from '../../../.storybook/components/PicassoBook'
import { <%= Name %> } from '../<%= Name %>'

const page = PicassoBook.createPage(
  '<%= Name %>',
  `<-- description -->`
)

page
  .addComponentDocs(<%= Name %>)
  .addExample('<%= Name %>/story/Default.example.jsx', 'Default')
