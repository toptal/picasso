---
'@toptal/picasso-codemod': minor
---

Codemod for `Container` component borders. Removes `bordered` prop from
`Container` components which do not require.

```bash
# <TARGET>: any .tsx file you want. Example: src/**/*.tsx
npx jscodeshift --parser=tsx -t node_modules/@toptal/picasso-codemod/v17.0.0/container-borders/container-borders.ts <TARGET>
```
