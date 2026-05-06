# Button — migration plan

## Identity
- Path: `packages/base/Button/`
- Tier: Tier 0 — light path, **calibration anchor** (per migration plan v3 §3.1)
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/button`

## Dependencies
Migration must be applied AFTER:
- (none — Button is independent within Tier 0)

## Migration scope
Per migration plan v3 §3.1: replace `@mui/base/Button` with `@base-ui/react/button`. Tailwind already in place via `cx` + `twMerge`.

**Files touched:**
- `packages/base/Button/src/ButtonBase/ButtonBase.tsx` — primary site (imports + render).
- `packages/base/Button/package.json` — drop `@mui/base`, add `@base-ui/react`, lift React peer cap.

**Note: `ButtonBase` is the polymorphic primitive** (renders as `<button>` OR `<a>` OR a custom element via the `as` prop). The `@mui/base/Button` → `@base-ui/react/button` migration is **not** a 1:1 replacement — `@base-ui/react/button` has fundamentally different polymorphic semantics and the migration needs four distinct code shifts (§API alignment below).

## Known gotchas — `@mui/base/Button` → `@base-ui/react/button` API alignment

`@base-ui/react/button` is **stricter and shape-different** from `@mui/base/Button`. Apply each pattern below verbatim, in order, when migrating ButtonBase.tsx. These patterns generalise to any polymorphic component using `@base-ui/react`.

### Pattern 1 — `slots` / `slotProps` → `nativeButton` + `render`

`@mui/base/Button` accepted `rootElementName` + `slots={{ root: ... }}` + `slotProps` to swap the underlying element. `@base-ui/react/button` does NOT have this slot pattern. It has:

- `nativeButton: boolean` — declares whether the rendered element is a native `<button>`. Defaults to `true`.
- `render: ReactElement | undefined` — renders this element as the root, replacing the default `<button>`. Used together with `nativeButton: false` for polymorphic rendering.

Therefore, the `slots`/`slotProps`/`rootElementName` props go away entirely. Replace with:

```ts
const isNativeButton = finalAs === 'button'
// ...
<BaseUIButton
  nativeButton={isNativeButton}
  render={isNativeButton ? undefined : React.createElement(finalAs)}
  // ...rest
>
```

Where `finalAs` is the resolved `as` prop value (e.g., `'a'`, `'button'`, or a component). If `finalAs` is `'button'`, `nativeButton: true` (default) renders the native `<button>` and `render` is undefined. Otherwise, `render` is a React element of the target tag/component, and `nativeButton: false` tells Base UI to skip the native-button warning.

**Why this matters:** if you keep `nativeButton: true` (the default) but render as `<a>`, Base UI emits a runtime warning that breaks tests:
> `Base UI: A component that acts as a button expected a native <button> because the nativeButton prop is true.`

### Pattern 2 — `onClick` type cast (do NOT change the public type)

Picasso's public Button prop is:

```ts
onClick?: (event: MouseEvent<HTMLButtonElement & HTMLAnchorElement>) => void
```

`@base-ui/react/button`'s onClick expects `BaseUIEvent<MouseEvent<HTMLButtonElement>>`. **Preserve the public type unchanged** (per `rules/api-preservation.md` — strict API preservation). Cast at the call site:

```ts
<BaseUIButton
  onClick={getClickHandler(loading, onClick) as BaseUIButton.Props['onClick']}
  // ...
>
```

The `as BaseUIButton.Props['onClick']` indexed type access is the canonical pattern for narrowing Picasso's wider event type to Base UI's narrower one at the boundary. Do NOT change the public `onClick?: ...` declaration to `any` — that violates API preservation and triggers the `@typescript-eslint/no-explicit-any` lint error.

### Pattern 3 — `ref` widening cast

`@base-ui/react/button` accepts `Ref<HTMLElement>` (any element, since it can render polymorphically). Picasso's `forwardRef<HTMLButtonElement, ...>` produces a narrower type. Cast at the call site:

```ts
<BaseUIButton ref={ref as React.Ref<HTMLElement>} ... />
```

The forwardRef's outer signature stays the same — only the element-passing cast changes.

### Pattern 4 — validate `as` prop value

The `as` prop can be a string, function (component), or invalid (e.g., `null`). Base UI's `render` prop expects a valid ReactElement. Add a small helper:

```ts
const isValidAs = (value: Props['as']) => {
  const valueType = typeof value
  return (
    valueType === 'string' ||
    valueType === 'function' ||
    (valueType === 'object' && value !== null)
  )
}

const finalAs: ElementType = isValidAs(as) ? as : 'a'
```

This protects against the runtime case where `as` is undefined / null / a primitive other than string/function. Default fallback is `'a'` to match Picasso's existing behavior when `href` is provided without explicit `as`.

### Other notes

- The old `RootElement` forwardRef component (used to bridge `slots.root`) **goes away entirely** — `render` does the same work without an extra component layer.
- `tabIndex` precedence: ensure `tabIndex={rest.tabIndex ?? (disabled ? -1 : 0)}` has parentheses around the ternary — without parens, JS precedence parses as `(rest.tabIndex ?? disabled) ? -1 : 0`, which is wrong.
- **Add a backward-compat class:** `twMerge('base-Button-root', createCoreClassNames(...), className)`. Picasso CSS may target this class for legacy styling.

## Acceptance criteria (component-specific)
- [ ] Zero `@mui/base` imports in `src/**`.
- [ ] `@base-ui/react` listed in `dependencies` (replacing `@mui/base`).
- [ ] React peer-dep cap lifted to `>=16.12.0`.
- [ ] **Public `onClick` prop type unchanged** (`MouseEvent<HTMLButtonElement & HTMLAnchorElement>`); only the internal call-site cast changes.
- [ ] `nativeButton` semantics correct: `true` when rendering native `<button>`, `false` (with `render`) when rendering `<a>` or other.
- [ ] Jest tests green — no `nativeButton` runtime warnings.
- [ ] Cypress component spec green.
- [ ] Happo: pixel diff ≤0.5% per Picasso policy. Class-name churn from the new `base-Button-root` addition is expected; designer review on any visual delta.

## Reviewer notes
- Light-path multipliers are calibrated against Button + Switch. After Button + ~2 more Tier 0 components ship, recalibrate per migration plan §10 R12.
- These four patterns generalise to other polymorphic components (`as`-prop or `component`-prop). When migrating Drawer / Dialog / Tabs (also Tier 0), check whether they have polymorphic semantics and apply the same shape.
