---
'@toptal/picasso-tailwind': minor
---

### Base layer

- add an opt-in `@toptal/picasso-tailwind/base` CSS entry that ships the Picasso global reset inside `@layer base`. Import it in the Tailwind entry CSS after the theme import (`@import '@toptal/picasso-tailwind/base';`). It replaces the runtime reset previously injected by `@toptal/picasso-provider`; omit the import to opt out (the former `<Picasso reset={false}>`). Because the reset is cascade-layered, all Tailwind utilities and any unlayered app CSS win over it.
