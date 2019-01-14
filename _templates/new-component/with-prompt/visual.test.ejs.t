---
to: components/<%= h.changeCase.pascalCase(name) %>/visual.test.jsx
---
import { assertVisuals } from '../../puppeteer'

test('', assertVisuals('<%= h.changeCase.pascalCase(name) %>', 'primary'))
test('', assertVisuals('<%= h.changeCase.pascalCase(name) %>', 'secondary'))
