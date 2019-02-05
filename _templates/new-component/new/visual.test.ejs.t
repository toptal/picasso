---
to: components/<%= h.changeCase.pascalCase(name) %>/visual.test.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import { assertVisuals } from '../../puppeteer'

test('Default', assertVisuals('<%= Name %>', 'default'))
