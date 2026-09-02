---
'@toptal/picasso-test-utils': minor
---

### TestUtils

- add `renderedProps(mock)`, which returns the props each render of a mocked component received. React 19 no longer passes function components the legacy-context second argument, so assertions written as `toHaveBeenCalledWith(props, {})` pass on one React major only — compare the props alone instead
