---
to: components/<%= h.changeCase.pascalCase(name) %>/visual.test.jsx
---
<%
  Name = h.changeCase.pascalCase(name)
%>import { assertVisuals } from '../../puppeteer'

test('', assertVisuals('<%= Name %>', 'primary'))
test('', assertVisuals('<%= Name %>', 'secondary'))
