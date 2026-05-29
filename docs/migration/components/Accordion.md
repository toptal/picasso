# Accordion — migration plan

## Identity
- Path: `packages/base/Accordion/`
- Tier: Tier 3 — heavy composite
- Track: Modernization (PF-1994)
- `target_path`: `@base-ui/react/accordion`

## Dependencies
Migration must be applied AFTER:
- Utils (Accordion uses `Rotate180` chevron from `@toptal/picasso-utils`)

## Migration scope
- Three subcomponents:
  - **Accordion** (main) — `packages/base/Accordion/src/Accordion/Accordion.tsx`, styles.ts
  - **AccordionSummary** — `packages/base/Accordion/src/AccordionSummary/AccordionSummary.tsx`, styles.ts
  - **AccordionDetails** — `packages/base/Accordion/src/AccordionDetails/AccordionDetails.tsx`
- Replace MUI v4 `Accordion` with `@base-ui/react/accordion` composition: `Accordion.Root` + `Accordion.Item` + `Accordion.Header` + `Accordion.Trigger` + `Accordion.Panel`.
- JSS `&$expanded` parent-refs unwind to `data-[state=open]:` Tailwind selectors (@base-ui/react/accordion exposes `data-state` attribute).
- PicassoProvider.override usage removed.
- `packages/base/Accordion/package.json`: drop `@material-ui/core` peerDep, lift React 19 cap.

## Known gotchas
- `&$expanded` JSS pattern: rewrite to `data-[state=open]:` Tailwind classes. Each affected slot needs the data-attr selector.
- `expandIcon` rotation: existing `Rotate180` chevron from Utils. Verify it still works post-migration (Utils migrates first per dependency).
- `bordersAll` / `bordersMiddle` / `bordersNone` JSS variants: rewrite as Tailwind conditional classes.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports in `src/**`.
- [ ] AccordionGroup-style use case (multiple Accordion stacked) still has correct border-collapse.
- [ ] Animation: open/close transitions preserved (use `transition-[height]` or `interpolate-size: allow-keywords`).
- [ ] Keyboard: arrow-keys + Enter cycle items correctly.
- [ ] Happo: visual diff ≤0.5%.

## `classes` handling — drop public surface (audit-verified)

Cross-tier audit (`decisions/classes-audit.md` §5) flagged Accordion's `classes`:
- **Accordion** main: `extends StandardProps` (line 33). 10 JSS keys (`root`, `bordersAll/Middle/None`, `expandIcon`, `expandIconExpanded`, `expandIconAlignTop`, `summary`, `details`, `content`).
- Body reads `classes` heavily (3 internal callsites within Accordion.tsx — to MUIAccordion + AccordionSummary + AccordionDetails). All plumbing-only.
- **AccordionSummary**: `extends StandardProps`. 2 JSS keys (`root`, `content`). Receives `classes` but doesn't pass downstream.
- **AccordionDetails**: `extends StandardProps`. **Explicitly ignores** received `classes` (current source destructures and never uses).
- Internal callsites passing `<Accordion classes={{...}}>` to the public API: 0.
- External real callsites: 0.

### Hypothesis to verify

Drop public `classes` on Accordion + AccordionSummary + AccordionDetails via `Omit<StandardProps, 'classes'>` + runtime backstop. Internal slot-routing (root/summary/content/details) rewrites on @base-ui/react part-level `className`.

### Verify per migration (DO this)

1. **Source**: confirm Accordion (line 33) + AccordionSummary + AccordionDetails extends StandardProps. Confirm AccordionDetails ignores `classes`.

2. **Internal callsite check**:
   ```bash
   rg --multiline --multiline-dotall -U '<(Accordion|AccordionSummary|AccordionDetails)\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 3 hits (all within Accordion.tsx itself — to MUIAccordion + AccordionSummary + AccordionDetails). Any callsite OUTSIDE the Accordion package directory is a real consumer pattern — escalate.

3. **External freshness check**:
   ```bash
   gh search code 'Accordion classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect fragments.

4. **Action if confirmed**: drop public `classes` on all 3 subcomponents via `Omit`. Rewrite internal plumbing: `root` → `<Accordion.Root className>`, `summary` → `<Accordion.Header / Accordion.Trigger className>`, `content` → `<Accordion.Panel className>`, etc.

5. **Page sub-component caller**: `packages/base/Page/src/SidebarItem/SidebarItemAccordion.tsx:47-49` passes `classes={{ summary, content }}` to Accordion. This is an internal Picasso callsite that uses Accordion's API. Either:
   - Migrate SidebarItemAccordion's slot-routing to direct `className`-on-Accordion-Root inline at the same time (best — single PR), OR
   - Block Accordion's `Omit` until SidebarItemAccordion is rewritten first.

6. **If contradicted**: STOP, update audit §5.

7. **No diff JSON** for the public drop (vestigial-equivalent — no external usage).
