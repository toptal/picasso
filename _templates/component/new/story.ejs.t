---
to: components/<%= h.changeCase.pascalCase(name) %>/story/index.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import PicassoBook from '../../../.storybook/components/PicassoBook'

const page = PicassoBook.createPage(
  '<%= Name %>',
  `<-- description -->`
)

page
  .addExample('<%= Name %>/story/Default.example.jsx', 'Default')
