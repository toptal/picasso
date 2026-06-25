---
'@toptal/picasso-link': minor
'@toptal/picasso-typography': minor
---

### Link

- widen the `as` prop type from `ElementType<HTMLAttributes<HTMLElement>>` to `ElementType`, so components that require extra props (e.g. react-router's `Link`, which needs `to`) can be passed to `as` without an `as unknown as ElementType<…>` cast. Matches the other polymorphic components.

### Typography

- widen the `as` prop type to `ElementType` to match `Link` and the other polymorphic components.
