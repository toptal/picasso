---
'@toptal/picasso-test-utils': major
---

### TestUtils

- add `renderedProps(mock)`, the props each render of a mocked component received. Assert on it instead of `toHaveBeenCalledWith(props, {})`, which React 19 breaks by passing `undefined` instead of `{}`
- **consumer action**: `@testing-library/react`, which the package re-exports, becomes an optional peer dependency (`^12` to `^16`), so install it where you import the test utilities. Use 12 on React 17, 13 to 16 on React 18, and 16.1 or newer on React 19. From 16 on, also install `@testing-library/dom@^10`, which it peers on instead of bundling
