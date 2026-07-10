# Notification — migration plan

## Identity
- Path: `packages/base/Notification/`
- Tier: Tier 1 — type-only fix (per migration plan v3 §3.2; ~0.1d effort)
- Track: Modernization (PF-1994)
- `target_path`: `none` (`@base-ui/react/toast` exists but Picasso uses `notistack` — keep the `notistack` integration for v3; per migration plan §9.9 + §12 open decision #11)

## Dependencies
Migration must be applied AFTER:
- Typography (notification body renders `<Typography>`)

## Migration scope
Per migration plan v3 §3.2 + audit §1.4: **single MUI v4 type import**, no JSS, no runtime MUI usage.

- One MUI v4 type import remains in source:
  - `packages/base/Notification/src/use-notification/use-notifications.tsx` — `import type { SnackbarOrigin } from '@material-ui/core/Snackbar'`
- Replace with a Picasso-native type:
  ```ts
  type SnackbarOrigin = {
    vertical: 'top' | 'bottom'
    horizontal: 'left' | 'center' | 'right'
  }
  ```
- `packages/base/Notification/package.json`:
  - Note: per audit §1.4, Notification's package.json **does NOT carry `@material-ui/core`** in dependencies. Verify before removing — it may already be clean.
  - Lift React peer cap to `>=16.12.0`.
- The `notistack` integration stays. No notistack rewrite — that's an open decision deferred post-PI per migration plan §12.

## Known gotchas
- `notistack` 3.0.1 is already pinned in `package.json` (per migration plan §1.9). Don't bump it.
- The `useNotifications` hook's API is consumed in many active repos; `SnackbarOrigin` type is exposed via the hook's return shape. Keeping the type-shape identical is critical.
- Notification has its own `SnackbarOrigin`-shaped prop on `<NotificationGrowl>` and similar components — ensure the type swap propagates through all signature sites.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports (including `import type`) in `src/**`.
- [ ] `SnackbarOrigin` type's structural shape unchanged (anchor positions still `top|bottom` × `left|center|right`).
- [ ] `notistack` integration still renders correctly (Cypress + Happo cover this).
- [ ] If `package.json` has any `@material-ui/core` entry remaining, it's removed.

## Reviewer notes
- The `@base-ui/react/toast` migration is **not** in PF-1992 scope per the v3 plan's §12 decision — Picasso keeps `notistack` for minimal blast radius. Revisit post-PI.
- One of 5 type-only fixes in the Tier 1 batch.

## `classes` handling — drop public surface (audit-verified vestigial)

Cross-tier audit (`decisions/classes-audit.md` §3) flagged Notification's `classes` prop as **vestigial**:
- Source `extends StandardProps` (line 20) — open-ended inherited.
- Body never reads `classes` (Tailwind-based; `classByVariant` at line 131 is a LOCAL type-annotated map, unrelated to the prop).
- Internal Picasso callsites: 0.
- External real callsites: 0 (file-level matches were all notistack's `<SnackbarProvider classes={...}>` in tests).

### Hypothesis to verify

Drop the public `classes` via `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` runtime backstop.

### Verify per migration (DO this — don't assume)

1. **Source verification**:
   - Open `packages/base/Notification/src/Notification/Notification.tsx`.
   - Confirm `extends StandardProps` (audit says line 20).
   - Note: `Classes` IS imported (line 3) but used as the TYPE of a local `classByVariant` map (line 131) — keep that import. Don't conflate with the prop drop.
   - Grep for `classes\.|classes\?\.` access on the PROP (`props.classes` or via destructuring) — confirm zero hits.

2. **Internal callsite verification**:
   ```bash
   rg --multiline --multiline-dotall -U '<Notification\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0 hits.

3. **Subcomponent check**: NotificationGrowl, NotificationBanner, NotificationContent (if they exist as separate files) — verify each one's `classes` handling separately. Audit says they don't exist as exportable components, but verify.

4. **Action if hypothesis confirmed**:
   ```ts
   export interface Props
     extends Omit<StandardProps, 'classes'>,
             /* other extensions unchanged */ {
     // ...
   }
   ```
   Plus `classes: _classes` runtime destructure backstop. KEEP the `Classes` type import — it's used by `classByVariant`.

5. **If hypothesis contradicted**: STOP. Update `classes-audit.md` §3.

6. **No `<Component>-diff.json`** — vestigial drop.
