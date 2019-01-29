---
to: components/<%= h.changeCase.pascalCase(name) %>/visual.test.tsx
---
<%
  Name = h.changeCase.pascalCase(name)
-%>
import { assertVisuals } from '../../puppeteer'

test('', assertVisuals('<%= Name %>', 'primary'))
test('', assertVisuals('<%= Name %>', 'secondary'))
