---
'@toptal/picasso': minor
'@toptal/picasso-shared': minor
'@toptal/picasso-provider': patch
'@toptal/picasso-notification': patch
---

### Notification

- upgrade `notistack` from `3.0.1` to `3.0.2`, the first release whose peer range admits React 19 (`^17.0.0 || ^18.0.0 || ^19.0.0`). `3.0.2` ships no code changes — every published file is byte-identical to `3.0.1` — so notification behavior and appearance are unchanged
- **consumer action** for `@toptal/picasso` and `@toptal/picasso-shared`: `notistack` is a pinned peer dependency, so consumers must move to `notistack@3.0.2`. The pin stays exact to guarantee a single notistack instance, since `SnackbarProvider` and `useSnackbar` communicate through React context and would not find each other across two copies
- the `react` peer range is unchanged (still `>=17.0.0 < 19.0.0`); lifting that cap library-wide is tracked in PF-2262
