---
'@toptal/base-tailwind': patch
'@toptal/picasso-tailwind': major
'@toptal/picasso': patch
---

- add `@toptal/base-tailwind` package
- update documentation of `@toptal/picasso-tailwind` and `@toptal/picasso` packages
- breaking change: `@toptal/picasso-tailwind` no longer extends default Tailwind configuration. The `@toptal/base-tailwind` preset has to be used along with `@toptal/picasso-tailwind` preset in Tailwind configurations in all projects. The `@toptal/base-tailwind` has to be mentioned first in the presets list.
