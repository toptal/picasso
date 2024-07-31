---
'@toptal/picasso-environment-banner': major
---

- migrate EnvironmentBanner to Tailwind
- breaking change: the `environment` property now allows only values that are actually supported by component (`production` and `test` values trigger TypeScript error)
