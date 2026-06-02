# Agent guidance — Picasso

Guidance for AI coding assistants (Claude Code, Cursor, Codex) working in this repo.

> This file is intentionally terse. The canonical, exhaustive rules live in
> `PICASSO_COMPONENT_DESIGN_PATTERNS.md` (repo root) and `docs/migration/references/`
> (`code-standards.md`, `practices.md`, `base-ui-styling.md`) + `docs/migration/rules/`.
> Read those when you need depth; the lines below are the high-signal defaults.

## Styling (Picasso components)

- Use Tailwind CSS for styling — no `.css`/`.scss`/`.module.css`, no JSS (`makeStyles`/`createStyles`/`withStyles`/`&$selector`), no inline `style` for static values (inline `style` only for runtime-computed numbers).
- Compose with `twMerge(...)` from `@toptal/picasso-tailwind-merge`; **consumer `className` LAST** so overrides win. Use `twMerge(cx({ ... }))` for conditional classes (prefer `cx` from `classnames` over chained `&&`/ternary for readability); plain `twMerge('a', 'b', className)` for simple concatenation.
- State-driven styling: `data-[…]:` variants (e.g. `data-[checked]:bg-blue-500`). No `!important` — escalate `className` → `data-[…]:` → `render` prop → (last resort) inline `style`.
- Tokens over arbitrary values; use Picasso token names (`text-graphite-800`, `shadow-2`). `[arbitrary-value]` + `// TODO(tokens):` only as a last resort to raise with designers — don't invent tokens.
- Don't change a component's public `Props` surface during a migration; adapt `@base-ui/react` type mismatches at the boundary (destructure the specific incompatible props, spread `...rest`). No `any` / blanket `as unknown as` casts in component source.
