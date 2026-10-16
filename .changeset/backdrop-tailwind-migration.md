---
'@toptal/picasso-backdrop': major
---

### Backdrop

- **consumer action**: `@toptal/picasso-tailwind-merge` becomes a peer dependency, as it already is for most Picasso packages
- build on the Tailwind Fade, so react-transition-group leaves the dependency tree
- the consumer `className` is merged last, so it wins on conflicts
- **consumer action (tests)**: a closed Backdrop is hidden by the `invisible` class instead of an inline `visibility: hidden`, which jsdom doesn't apply. Assert `toHaveClass('invisible')` instead of `not.toBeVisible()`
