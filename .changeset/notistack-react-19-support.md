---
'@toptal/picasso': minor
'@toptal/picasso-shared': minor
'@toptal/picasso-provider': patch
'@toptal/picasso-notification': patch
---

### Notification

- upgrade `notistack` from `3.0.1` to `3.0.2`, the first release whose peer range admits React 19. It ships no code changes, so notification behavior and appearance are unchanged
- **consumer action** for `@toptal/picasso` and `@toptal/picasso-shared`: `notistack` is a pinned peer dependency, so consumers must move to `notistack@3.0.2`. The pin stays exact to guarantee a single notistack instance, since `SnackbarProvider` and `useSnackbar` communicate through React context and would not find each other across two copies
