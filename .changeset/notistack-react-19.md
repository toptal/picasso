---
'@toptal/picasso-notification': patch
'@toptal/picasso-provider': patch
'@toptal/picasso-shared': major
'@toptal/picasso': major
---

### Notifications

- upgrade `notistack` from `3.0.1` to `3.0.2`, the first release that admits React 19. It ships no code changes
- **consumer action** for `@toptal/picasso` and `@toptal/picasso-shared`: move to `notistack@3.0.2`, an exact peer that keeps a single notistack instance
