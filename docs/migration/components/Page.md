# Page — migration plan

## Identity
- Path: `packages/base/Page/`
- Tier: Tier 3 — heavy composite, pure Tailwind rewrite (NO Base UI primitive)
- Track: Modernization (PF-1994)
- `target_path`: `none` — no @base-ui/react Page analog. Picasso-specific shell (hamburger, responsive layout).

## Dependencies
Migration must be applied AFTER (Page is the LAST migration in base/*):
- Backdrop, Modal, Drawer, Button, Tabs, Tooltip, Notification, Menu, Dropdown, Accordion

## Migration scope
- Many subcomponents to migrate together (or in sub-PRs):
  - **Page** (main shell) — `packages/base/Page/src/Page/Page.tsx`, styles.ts
  - **PageHamburger** — uses `<Dropdown classes={{ content, popper }}>` internally
  - **PageTopBar** + **PageTopBarMenu** — uses `<Dropdown classes={{ content }}>` internally
  - **PageContent**, **PageSidebar**, **PageFooter** — layout shells
  - **SidebarItem** + **SidebarItemAccordion** + **SidebarItemCompact**:
    - SidebarItemAccordion passes `<Accordion classes={{ summary, content }}>`
    - SidebarItemCompact passes `<Dropdown classes={{ popper }}>`
- All custom — pure Tailwind rewrite.
- `packages/base/Page/package.json`: drop `@material-ui/core` peerDep, lift React 19 cap.

## Known gotchas
- Sticky topbar + hamburger UX — responsive media queries; use Tailwind `lg:` / `md:` / `sm:` breakpoints.
- Page composition is a tree of slot components — keep the public API of each subcomponent stable.
- Internal `<Dropdown classes={{...}}>` callsites depend on Dropdown's `{ popper, content }` narrow surface being KEPT (per Dropdown.md) — verify Dropdown migration landed first.

## Acceptance criteria (component-specific)
- [ ] Zero `@material-ui/*` imports across all Page subcomponents in `src/**`.
- [ ] Responsive breakpoints work (Happo at viewport widths 320, 768, 1280, 1920).
- [ ] Hamburger dropdown opens / closes / dismisses correctly.
- [ ] Sidebar accordion items expand/collapse.
- [ ] Cypress: page-navigation spec passes.
- [ ] Happo: visual diff ≤0.5%.

## `classes` handling — no-op on Page; subs pass to Dropdown/Accordion narrowed APIs

Cross-tier audit (`decisions/classes-audit.md` §5, corrected):
- **Page main**: `extends BaseProps, HTMLAttributes<HTMLDivElement>` (line 12) — NOT StandardProps. **No public `classes` prop**. The `classes` reference at line 44 is JSS-local (`useStyles()`).
- **Page subcomponents** that pass `classes` to children:
  - PageHamburger → `<Dropdown classes={{ content, popper }}>`
  - PageTopBarMenu → `<Dropdown classes={{ content }}>`
  - SidebarItemAccordion → `<Accordion classes={{ summary, content }}>`
  - SidebarItemCompact → `<Dropdown classes={{ popper }}>`
- External real callsites on Page: 0.

### Hypothesis to verify

- **Page main**: no-op for `classes`. No public prop to drop.
- **Page subcomponents passing classes to Dropdown/Accordion**: these target Dropdown's narrowed `{ popper, content }` and Accordion's slots. Preserve verbatim. If Accordion is mid-migration to drop its public `classes`, pair the changes (rewrite Page subs' callsites to direct `className` on Accordion's new @base-ui/react parts).

### Verify per migration (DO this)

1. **Source — Page main**:
   - Open `packages/base/Page/src/Page/Page.tsx`. Confirm `extends BaseProps, HTMLAttributes<HTMLDivElement>` (line 12).
   - Confirm no local `classes?: { ... }` declaration.
   - The `classes` at line 44 is `useStyles()` output — JSS-local, not the public prop.

2. **Page sub-components — source verification**:
   - For each (PageHamburger, PageTopBarMenu, SidebarItemAccordion, SidebarItemCompact, SidebarItem etc.): check what each extends. None should expose a public `classes` prop unless verified otherwise.

3. **Internal callsite check on Page**:
   ```bash
   rg --multiline --multiline-dotall -U '<Page\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/
   ```
   Expected: 0.

4. **Subcomponent callsite check on Dropdown / Accordion**:
   ```bash
   rg --multiline --multiline-dotall -U '<(Dropdown|Accordion)\b[^>]*?\bclasses\s*=\s*\{\{' -g '*.tsx' -g '*.ts' packages/base/Page/
   ```
   Expected: 4+ hits in Page subcomponents using `{ popper, content }` / `{ summary, content }`.

5. **External freshness check on Page**:
   ```bash
   gh search code 'Page classes={{ -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
   ```
   Inspect fragments — most hits coincidental.

6. **Action**:
   - **Page main**: **no-op for the public `classes` prop**.
   - **Page subs**: depends on per-sub source. If a sub also doesn't extend StandardProps, no-op for its own classes. If a sub passes `classes={{...}}` to a downstream Picasso component (Dropdown, Accordion), preserve the callsite — that's the downstream contract.
   - **If Accordion's migration has dropped its public `classes`** (Tier 3.a): `SidebarItemAccordion`'s `<Accordion classes={{ summary, content }}>` callsite MUST change to direct `className` on Accordion's @base-ui/react parts at the same time. Pair these PRs.

7. **No diff JSON** for Page itself.
