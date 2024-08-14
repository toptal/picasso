---
inject: true
to: "<%= isBasePackage ? `.storybook/components/CodeExample/CodeExample.tsx` : null %>"
after: const imports
---
  '<%= packageName %>': require('<%= packageName %>'),