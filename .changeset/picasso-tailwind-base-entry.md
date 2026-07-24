---
'@toptal/picasso-tailwind': minor
---

### Base layer

- add an opt-in `@toptal/picasso-tailwind/base` CSS entry that ships the Picasso global reset inside `@layer base`. Import it in the Tailwind entry CSS after the theme import (`@import '@toptal/picasso-tailwind/base';`). It replaces the runtime reset previously injected by `@toptal/picasso-provider`; omit the import to opt out (the former `<Picasso reset={false}>`). Because the reset is cascade-layered, all Tailwind utilities and any unlayered app CSS win over it.
- the base entry also ships the page-width-jump fix formerly injected at runtime by the provider (`html { width: 100%; overflow-x: hidden }` + `body { width: 100vw }` from 768px up): page width no longer changes when the vertical scrollbar appears or disappears. Opt out with unlayered app CSS — `html { overflow-x: visible }` + `body { width: 100% }` — which wins over `@layer base` by cascade rules.
