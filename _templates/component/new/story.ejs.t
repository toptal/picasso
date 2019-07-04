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
  .createTabChapter('Props')
  .addComponentDocs({ component: <%= Name %>, name: '<%= Name %>' })
