---
inject: true
append: true
to: .storybook/stories/index.js
---
import './<%= h.changeCase.pascalCase(name) %>'
