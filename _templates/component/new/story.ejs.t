---
to: src/components/<%= h.changeCase.pascalCase(name) %>/story/index.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import PicassoBook from '~/.storybook/components/PicassoBook'

import { <%= Name %> } from '../<%= Name %>'

const page = PicassoBook.createPage(
  '<%= Name %>',
  `<-- description -->`
)

page
  .createChapter()
  .addComponentDocs({ component: <%= Name %>, name: '<%= Name %>' })
