---
'@toptal/picasso-test-utils': major
'@toptal/picasso': minor
---

### TestUtils

- add `renderedProps(mock)`, the props each render of a mocked component received. Assert on it instead of `toHaveBeenCalledWith(props, {})`, which React 19 breaks by dropping the second argument
- **consumer action**: `@testing-library/react`, which the package re-exports, becomes a peer dependency (`^12` to `^16`). Use 12 on React 17, 13 to 16 on React 18, and 16.1 or newer on React 19

### Picasso

- declare `@testing-library/react` as an optional peer dependency for the `@toptal/picasso/test-utils` entry
