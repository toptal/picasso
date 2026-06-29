# Decision — Backdrop replacement

**Status:** **LOCKED** (PF-1992 spike).
**Date:** 2026-05-04.
**Risk reference:** [migration plan v3 §9.8 R14](../../modernization/PI-4318-P1-MOD-01-migration-plan.md#98-open-decision-popper--backdrop--standalone-positioning-replacement).
**Affected manifest entries:** `Backdrop` (Tier 0), transitively `Modal` + `Drawer` (Tier 0; both compose Backdrop).

---

## Decision

Replace Picasso's standalone Backdrop with a **small custom `<div>` (Tailwind + scroll-lock)** rendered into a portal. Modal + Drawer (both Tier 0) continue to use Picasso's Backdrop as their dim-overlay implementation; nothing about the consumer-facing `<Backdrop>` API changes — only the internals do.

**`manifest.json` `target_path` for Backdrop: `none`.**

## Why

`@base-ui/react` v1.4.1 does **not** ship a standalone Backdrop primitive. Backdrop is internal to Dialog / AlertDialog / Drawer (as `Dialog.Backdrop`, `AlertDialog.Backdrop`, `Drawer.Backdrop`). Picasso has had a standalone `<Backdrop>` component for years; consumer apps depend on the import path `@toptal/picasso-backdrop` or the re-export from `@toptal/picasso`.

Three options were considered:

| Option | Description | Verdict |
|---|---|---|
| **A** (chosen) | Small custom `<div>` + scroll-lock + Tailwind, rendered via portal | ✅ Minimal blast radius; preserves the existing public API; no new runtime dependency |
| B | Thin wrapper around `Dialog.Backdrop`, exporting it as a standalone | ❌ Requires consumers to provide a `Dialog.Root` parent (not standalone in spirit); changes public semantics |
| C | Deprecate Backdrop in favour of `<Dialog>` only | ❌ Breaking API change for 23+ active consumers; out of scope for v3 |

## Implementation outline

```tsx
// packages/base/Backdrop/src/Backdrop/Backdrop.tsx
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { cx } from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export interface BackdropProps {
  open: boolean
  onClick?: () => void
  className?: string
  children?: React.ReactNode
  // Preserve any other public props from the pre-migration shape — mirror Picasso's
  // existing Backdrop props verbatim.
}

export const Backdrop = ({ open, onClick, className, children }: BackdropProps) => {
  // Scroll-lock while open
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      onClick={onClick}
      className={twMerge(cx(
        'fixed inset-0 bg-black/50 z-modal',
        'transition-opacity duration-150',
        className,
      ))}
    >
      {children}
    </div>,
    document.body,
  )
}
```

Notes on the snippet:
- `z-modal` (1300) is a Picasso Tailwind token (see [`tokens/picasso-tailwind-tokens.md`](../tokens/picasso-tailwind-tokens.md) §Z-index).
- `bg-black/50` is the Tailwind opacity-blend syntax for a 50% black overlay; verify the pre-migration value via Happo before locking the percentage.
- Scroll-lock is a simple `body.style.overflow` toggle. If Picasso's existing implementation does anything more sophisticated (RTL-aware scrollbar gutter, etc.), preserve it.
- No `@base-ui/react` import. No `@mui/base` import. No `@material-ui/core` import.

## Sequencing

Per migration plan §3.7:

- **Backdrop migrates first within Tier 0.** Modal + Drawer both compose Backdrop's public render output. After Backdrop merges, re-record Happo baselines for Modal and Drawer before they migrate.
- The Tier 1 batch (peer-dep + type-only fixes) can run **before** Backdrop with no coupling.

## Risk + mitigation

- **R14 (medium / low impact):** Backdrop has no standalone `@base-ui/react` analog. **Mitigated** by Option A: stay custom, preserve API, ~30 LOC.
- **Happo cascade:** Modal + Drawer Happo will shift after Backdrop class-name churn. **Mitigated** by re-recording baselines as part of the Backdrop PR's review checklist.
- **Future revisit:** if `@base-ui/react` v1.5+ ships a standalone Backdrop primitive, revisit per [`rules/base-ui-react-api-crib.md` refresh checklist](../rules/base-ui-react-api-crib.md#refresh-checklist). Migration to a primitive at that point is a 0.1d follow-up.

## What this unlocks

- PF-1994 Tier 0 batch can sequence: **Backdrop → Modal → Drawer** without further architectural blockers.
- The `target_path` for Backdrop in [`manifest.json`](../manifest.json) is locked at `"none"`.
