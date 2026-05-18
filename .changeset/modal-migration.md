---
'@toptal/picasso-modal': major
---

### Modal

- Migrate internals from `@mui/base/Modal` to `@base-ui/react/dialog` (`Dialog.Root` + `Dialog.Portal` + `Dialog.Popup`) with behavioral parity
- Drop the `@mui/base`, `@toptal/picasso-backdrop` runtime dependencies; the backdrop is now rendered inline within the dialog portal
- Lift the React peer dependency upper bound from `< 19.0.0` to `>=16.12.0`, in line with `@base-ui/react`'s React 19 support
- Preserve the locally narrowed `classes?: { closeButton?: string }` API — used by external consumers (see `docs/migration/decisions/classes-audit.md` §6/§9)
