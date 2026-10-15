---
'@toptal/picasso-carousel': patch
---

### Carousel

- rename `bg-gradient-to-r` to `bg-linear-to-r` in the edge gradients, the Tailwind v4 spelling. Same CSS, no visual change
- build the navigation dots' classes with `twJoin` instead of a multi-line template literal, so the `class` attribute no longer carries its newlines and indentation. Same classes, same order
