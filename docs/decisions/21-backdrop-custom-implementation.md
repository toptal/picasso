# Backdrop implementation

## Problem

Picasso ships a standalone `<Backdrop>` component (`@toptal/picasso-backdrop`, also re-exported from `@toptal/picasso`) — a dim overlay used on its own and composed by `Modal` and `Drawer`. Consumer apps have depended on it for years.

Picasso's UI primitives moved to `@base-ui/react` (see [ADR 22](22-base-ui-tailwind-modernization.md)), which does **not** ship a standalone Backdrop primitive: a backdrop only exists internal to `Dialog` / `AlertDialog` (`Dialog.Backdrop`, etc.). So there is no drop-in Base UI primitive for a standalone `<Backdrop>`, and the public API must be preserved.

## Decision

Picasso's `<Backdrop>` keeps its public API and is implemented as a **small custom `<div>`** — a Tailwind-styled overlay with scroll-lock, rendered into a portal. It takes on no new runtime dependency. `Modal` and `Drawer` continue to compose it as their dim-overlay.

## Alternatives

| Option | Description | Verdict |
|---|---|---|
| **Custom `<div>` (chosen)** | Tailwind overlay + scroll-lock, portaled | ✅ Minimal blast radius; preserves the public API; no new runtime dependency (~30 LOC) |
| Wrap `Dialog.Backdrop` | Re-export Base UI's backdrop as standalone | ❌ Requires a `Dialog.Root` parent — not standalone in spirit; changes public semantics |
| Deprecate `<Backdrop>` | Offer `<Dialog>` only | ❌ Breaking API change for the many active consumers |

## Implementation

```tsx
import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import cx from 'classnames'
import { twMerge } from '@toptal/picasso-tailwind-merge'

export const Backdrop = ({ open, onClick, className, children }: BackdropProps) => {
  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden' // scroll-lock while open
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  if (!open) return null

  return createPortal(
    <div
      onClick={onClick}
      className={twMerge(
        cx('fixed inset-0 bg-black/50 z-modal transition-opacity duration-150', className)
      )}
    >
      {children}
    </div>,
    document.body
  )
}
```

- `z-modal` is a Picasso Tailwind token — see [`../contribution/tailwind-tokens.md`](../contribution/tailwind-tokens.md) (§Z-index).
- `bg-black/50` is Tailwind's opacity-blend syntax for a 50% black overlay.
- Scroll-lock is a simple `body.style.overflow` toggle; preserve anything more sophisticated the existing implementation does (e.g. RTL-aware scrollbar-gutter handling).

## Future direction

If a future `@base-ui/react` release ships a standalone Backdrop primitive, revisit — swapping the custom `<div>` for the primitive would be a small follow-up.
