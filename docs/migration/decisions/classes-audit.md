# Cross-tier `classes` prop audit — 2026-05-11

**Status**: research complete for Tier 1 + Tier 2 + Tier 3.
**Purpose**: feed the per-tier `classes` strategy in `decisions/classes-shim.md`. This is a research artefact — its data is a **starting hypothesis** for each migration, not gospel. Agents migrating a component must verify per-component (see §7).
**Companion**: `decisions/classes-shim.md` (per-tier strategy), `CLAUDE.md` §`classes` prop handling per tier.

---

## 1. Purpose

The migration plan (v4 §2.3) originally mandated "apply `withClasses` slot-routing to every component that has a `classes` prop." Button PR #4947 review (vedrani's r3207767115) surfaced that this mandate was overscoped — for Tier 0 components, `classes` was already broken since the @mui/base step. Tier 1 / Tier 2 / Tier 3 each have a different actual state. This audit measures each tier's reality.

Three strategy options were on the table across the program:

| Option | Description |
|---|---|
| **1. Defer to sunset wave** | Don't touch `classes` during the per-tier migration. Wait for a later "classes sunset" PR with paired codemod. |
| **2. Bundle drop** | Drop `classes` from public Props via `extends Omit<StandardProps, 'classes'>` + runtime destructure backstop. |
| **3. Keep narrowed + working** | Where `classes` IS a real, used slot-routing surface (Dropdown's `{ popper, content }`, OutlinedInput's `{ input, root }`), preserve as-is and port slot routing to the new @base-ui/react/Tailwind implementation. |

The right choice per component depends on three measured things:
- Whether the source actually declares + reads `classes`
- Whether internal Picasso callsites use it
- Whether external (toptal-org) consumer callsites use it

This audit measures all three.

---

## 2. Methodology

### 2.1 `gh search code` — useful but file-level

```bash
gh search code '<Container ' 'classes=' --owner toptal --limit 30
```

How it actually works (clarifying the initial confusion about new-line / second-position props):

- **File-level token matching with AND semantics** — returns files containing BOTH tokens somewhere, not adjacent or same-line.
- Quoted phrases (`"<Container "`) match anywhere in the file. The `classes=` token must appear *somewhere* in the same file.
- **Multi-line JSX is handled correctly** — the search doesn't care whether `classes={...}` is the 1st, 2nd, or 5th prop, or whether it's on a different line from the opening tag.

**The real caveat — false positives, not false negatives.** A file matches if it has both `<Container ` AND `classes=` anywhere — even if `classes=` belongs to a different component:

```jsx
<Container flex>...</Container>         // first usage, no classes
<SomeOtherComponent classes={...} />    // unrelated component with classes
```

Both tokens present → file reported as a "Container + classes=" match → but the `classes` belongs to `SomeOtherComponent`.

**Implication**: file-level counts are an **upper bound**. To get truth, **manually inspect each match's `textMatches` fragments** to see which JSX element the `classes=` is actually attached to. Slot-targeted queries (`Container classes={{ root`) reduce — but don't eliminate — false positives. Inspect the fragments.

### 2.2 Slot-targeted gh search

To narrow toward real usage, search for the slot-key pattern:

```bash
gh search code '<Container classes={{ root -repo:toptal/picasso' --owner toptal --limit 30 --json textMatches
```

Inspect each match's `textMatches[].fragment` to verify the `classes=` is on the target component, not a coincidence. Note: `-repo:toptal/picasso` must go inside the query string (not as a `--repo` flag — gh doesn't have an exclude-repo flag).

### 2.3 Internal — multiline ripgrep

```bash
rg --multiline --multiline-dotall -U \
  '<Container\b[^>]*?\bclasses\s*=\s*\{\{' \
  -g '*.tsx' -g '*.ts' packages/
```

(Note: `rg --type tsx` is wrong — `tsx` isn't a registered rg type. Use `-g '*.tsx'`.)

This correctly handles multi-line JSX and explicitly anchors `classes=` to the opening tag — no cross-component false positives within the same file.

### 2.4 Source-level slot-key extraction

For each component:
1. Read main `.tsx` for the public `Props` interface. Check whether it `extends StandardProps` (open-ended `classes` inherited) or declares a LOCAL `classes?: { ... }` override (narrowed surface).
2. Read sibling `styles.ts` for `createStyles({ root: {...}, foo: {...} })`. The keys of the JSS object ARE the historical slot keys — but these are the JSS-LOCAL slot names, not necessarily a public-prop API.
3. Grep the component file for `classes.` / `classes?.` access.

### 2.5 The JSS-local trap (don't confuse with public prop)

Most Picasso heavy components have a pattern like:

```ts
const Checkbox = (props) => {
  const classes = useStyles()    // ← JSS-LOCAL `classes`, NOT the prop
  return <div className={classes.root}>...</div>
}
```

Here `classes` is a LOCAL variable shadowing any inherited `props.classes`. Even if the public Props extends StandardProps (open-ended inherited `classes`), the BODY's `classes.X` references are to the local JSS map, not to the prop. The prop itself is vestigial — never accessed.

**To detect a real prop-read**: look for `props.classes`, or destructure-style `const { classes } = props` where `classes` is THEN used. If the only `classes` reference is the JSS-local hook output, the prop is vestigial regardless of inheritance.

**Source-level checklist for "is the public `classes` prop real?"**:
- Source extends `StandardProps` OR declares local `classes?: { ... }`? — if NO, no public `classes` prop. Done.
- If YES (one of those), is `props.classes` / destructured prop-classes used in body? — if YES, it's a real used surface. If NO, it's vestigial.

---

## 3. Tier 1 findings

11 components. Migration is cleanup-only (`package.json` delta — no source touch).

### 3.1 Source-level status

| Component | Extends `StandardProps`? | Narrowed locally? | Slot keys exposed |
|---|---|---|---|
| Container | yes (line 23) | no | open-ended |
| Typography | yes (line 124) | no | open-ended |
| Notification | yes (line 20) | no | open-ended |
| FormControlLabel | yes (line 16) | **YES** (lines 27–30 narrow to `{ root?, label? }`) | `root`, `label` |
| FormLabel | no — `BaseProps` only | n/a | none |
| Grid | no — `BaseProps` only | n/a | none |
| Form | no — `BaseProps` only | n/a | none |
| Note | no — `BaseProps` only | n/a | none |
| Menu | no — `BaseProps` only | n/a | none |
| FormLayout | n/a — context provider | — | — |
| ModalContext | n/a — context provider | — | — |
| Utils | n/a — utility package | — | — |

**Key finding: 4 of 11 Tier 1 components actually expose `classes`.** The other 7 don't — the "bundle drop" question is moot for them.

### 3.2 Internal usage

| Component | Internal callsites | Slot keys used |
|---|---|---|
| Container | **0** | — |
| Typography | **0** | — |
| Notification | **0** | — |
| FormControlLabel | **3** | `root`, `label` |
| (others) | n/a — no `classes` API | — |

The 3 FormControlLabel callers all pass both slots:
- `packages/base/Switch/src/Switch/Switch.tsx:100`
- `packages/base/Radio/src/Radio/Radio.tsx:92`
- `packages/base/Checkbox/src/Checkbox/Checkbox.tsx:114`

### 3.3 External usage (manual inspection of textMatches fragments)

| Component | Real external `<Component classes={{...}}>` callsites |
|---|---|
| Container | **0** (16 file-level matches were all coincidental — typically `<SnackbarProvider classes={...}>` or `<Unavailable24 classes={{root}}>` in the same file) |
| Typography | **0** (snapshot test files with classes on SnackbarProvider) |
| Notification | **0** (notistack SnackbarProvider misattributions) |
| FormControlLabel | **0** |

### 3.4 Tier 1 conclusion

- Container / Typography / Notification: technical `classes` API surface but **vestigial** (no read in source, no internal usage, no external usage). Drop via `extends Omit<StandardProps, 'classes'>` + runtime destructure backstop is **zero blast radius**.
- FormControlLabel: narrowed AND used internally (3 Picasso callers). Defer its sunset to the Switch (Tier 0) / Radio/Checkbox (Tier 2) tickets — those decide whether to keep the slot API or migrate to `className`.
- All other Tier 1 components: don't expose `classes` — no-op.

---

## 4. Tier 2 findings

5 components. Migration is the heavy MUI v4 + JSS rewrite.

### 4.1 Source-level status (CORRECTED 2026-05-11 — most don't actually extend `StandardProps`)

Initial draft of this section claimed all 5 Tier 2 components extend `StandardProps`. Source-level rg verified that only Radio does. The other 4 extend `BaseProps` and have NO public `classes` API.

**Important distinction**: many of these components use `const classes = useStyles()` (a JSS-local hook output) internally. That `classes` is a local variable, NOT the prop. Don't conflate JSS-local usage with public-prop usage.

| Component | Public Props extends | Has public `classes` prop? | JSS-local slot keys (internal use) | Classes prop read in body? |
|---|---|---|---|---|
| Checkbox | `BaseProps` (line 22) | **NO** | 9 keys via `useStyles()`: `root`, `disabled`, `withLabel`, `focused`, `checkedIcon`, `uncheckedIcon`, `indeterminateIcon`, `labelWithRightSpacing`, `checkboxWrapper` | n/a (no prop to read) |
| Radio | `StandardProps` (line 17) | **YES (inherited, vestigial)** | 6 keys via `useStyles()`: `root`, `disabled`, `withLabel`, `focused`, `uncheckedIcon`, `checkedIcon` | NO — `classes` is shadowed by local `useStyles()` output |
| Tooltip | `BaseProps, HTMLAttributes` (line 59) | **NO** | 5 keys via `useStyles()`: `tooltip`, `arrow`, `light`, `compact`, `noMaxWidth` | n/a |
| FileInput | `BaseProps` (line 12) | **NO** | 0 keys on FileInput itself | n/a |
| FileList (sub) | check source | check | 1 key: `root` | check |
| ProgressBar (sub) | check source | check | 3 keys | check |
| FileListItem (sub) | no | n/a | n/a | n/a |
| Popper | `BaseProps` (line 27) | **NO** | 0 keys (Tailwind-only) | n/a |

### 4.2 Internal usage

| Component | Internal callsites passing `classes={{...}}` |
|---|---|
| Checkbox | 2 (within Checkbox.tsx itself — to MUICheckbox + FormControlLabel) |
| Radio | 2 (same pattern as Checkbox) |
| Tooltip | 1 (within Tooltip.tsx — to MUITooltip) |
| FileInput / FileList / ProgressBar | 0 |
| Popper | 0 |

These are **internal plumbing** callsites (component-to-MUI), not consumer-style overrides.

### 4.3 External usage (gh search code, manual fragment inspection)

| Component | Real external callsites |
|---|---|
| Checkbox | **0** (empty result for slot-targeted query) |
| Radio | **0** (empty) |
| Tooltip | **0** (2 file-level matches were FALSE positives — Button + showImfHeading) |
| FileInput | **0** (empty) |
| Popper | **0** (3 file-level matches all on Dropdown / OutlinedInput in the same file) |

### 4.4 Tier 2 conclusion (REVISED post-source-verification)

- **Radio**: extends `StandardProps` → vestigial inheritance (body never reads `props.classes` — `classes` is a JSS-local shadow). Safe to `Omit` drop.
- **Checkbox, Tooltip, FileInput, Popper**: extend `BaseProps` only → **no public `classes` API exists**. NO-OP. Don't add `Omit` for something that wasn't there. The `classes` inside their bodies is JSS-local (`const classes = useStyles()`), unrelated to a public prop.
- All sub-components (FileList, ProgressBar, FileListItem): verify per source per migration.

So Tier 2 has only ONE component with a real `classes` API to touch (Radio, vestigial drop). The other 4 are no-ops for the `classes` decision.

---

## 5. Tier 3 findings

4 components. Heavy composites.

### 5.1 Source-level status (CORRECTED 2026-05-11)

| Component | Public Props extends | Local `classes?: { ... }` narrow? | JSS-local slot keys | Public `classes` prop read in body? |
|---|---|---|---|---|
| Accordion | `StandardProps` (line 33) | no | 10 keys via `useStyles()`: `root`, `bordersAll/Middle/None`, `expandIcon`, `expandIconExpanded`, `expandIconAlignTop`, `summary`, `details`, `content` | NO — `classes` shadowed by JSS local; the prop is vestigial |
| AccordionSummary (sub) | `StandardProps, ButtonOrAnchorProps` | no | 2 keys | NO |
| AccordionDetails (sub) | `StandardProps, HTMLAttributes` | no | n/a | **explicitly ignores** received `classes` prop (current source destructures and never uses) |
| **Dropdown** | `StandardProps` (line 31) | **YES** (line 60: `classes?: { popper?, content? }`) | n/a (Tailwind-only) | **YES** — line 282 reads `externalClasses?.popper`, line 317 reads `externalClasses?.content` |
| Page | `BaseProps, HTMLAttributes` (line 12) — NOT StandardProps | no | 1 key via `useStyles()`: `root` | n/a (no public `classes` prop) |
| Page sub-components | varies | varies | n/a | **YES** — internal callers pass `<Dropdown classes={{...}}>` and `<Accordion classes={{...}}>` |
| **OutlinedInput** | `BaseProps` + types.ts | **YES** (`types.ts:43`: `classes?: { input?, root? }`) | n/a (utility-fn styling) | **YES** — `OutlinedInput.tsx:178 + 185` apply `classes?.root` / `classes?.input` via twMerge |

### 5.2 Internal usage

| Component | Internal callsites passing `classes={{...}}` | Slot keys used |
|---|---|---|
| Accordion | 3 (within Accordion.tsx — to MUIAccordion, AccordionSummary, AccordionDetails) | `root`, `summary`, `content`, `details` |
| Dropdown | 0 (Dropdown consumes its own classes prop) | — |
| Page sub-components | 4+ — PageHamburger → Dropdown `{content, popper}`, PageTopBarMenu → Dropdown `{content}`, SidebarItemAccordion → Accordion `{summary, content}`, SidebarItemCompact → Dropdown `{popper}` | `popper`, `content`, `summary` |
| OutlinedInput | 0 (consumes own classes via twMerge) | — |

### 5.3 External usage (manual inspection)

| Component | Real external callsites | Slot keys used externally |
|---|---|---|
| Accordion | **0** | — |
| **Dropdown** | **2 real** | `content` (staff-portal `TypeSelect.tsx`), `popper` (topcall-desktop `Menu.tsx`) |
| Page | **0** (file-level matches all coincidental) | — |
| **OutlinedInput** | **4 real** | `input` × 3 (topteam-frontend `GlobalSearchInputSmallScreen`, `GlobalSearchDesktop`, `ExtendableInput`), `root` × 2 (topteam-frontend `ExtendableInput`, `ButtonedSelect`) |

### 5.4 Tier 3 conclusion (REVISED)

Three sub-categories:

**5.4.a — Open-ended `StandardProps`, vestigial public** (Accordion + its subs):
- `extends StandardProps` so the prop exists in the public type, but the body never reads `props.classes` (it uses JSS-local `useStyles()`).
- AccordionDetails explicitly destructures and ignores its `classes` prop.
- Drop via `Omit<StandardProps, 'classes'>` is safe.
- Internal callsites within Accordion.tsx pass to MUI* wrappers that disappear post-migration. Rewrite during the heavy migration.

**5.4.b — Locally narrowed, internally read, externally used** (Dropdown, OutlinedInput):
- **KEEP the narrowed `classes` API as-is.** Real consumers depend on these slots.
- Port the slot-routing to @base-ui/react part-level `className`.
- No diff JSON needed.

**5.4.c — No public `classes` API** (Page):
- Page extends `BaseProps`, no `classes` prop in the public type.
- NO-OP for `classes` on Page itself.
- Page sub-components (PageHamburger, SidebarItemAccordion, etc.) pass `classes={{...}}` to Dropdown/Accordion — those callsites stay (targeting downstream-component narrowed APIs or future @base-ui/react classNames).

---

## 6. Cross-tier summary table

**Tier 0 correction (post-rg verification)**: Most Tier 0 components actually extend `BaseProps`, NOT `StandardProps` — they don't expose `classes` at all. Only Button + ButtonBase (extend `StandardProps`) and Modal (extends `BaseProps` but declares LOCAL `classes?: { closeButton }`) have a `classes` API surface. Backdrop / Badge / Drawer / Slider / Switch / Tabs need no `classes` change.

| Component | Tier | `classes` API | Internal callsites | External real callsites | Recommendation |
|---|---|---|---|---|---|
| Backdrop | 0 | none — extends `ModalBackdropSlotProps` from @mui/base | n/a | n/a | no-op for classes |
| Badge | 0 | none — extends `BaseProps` only | n/a | n/a | no-op |
| Button + ButtonBase | 0 | `extends StandardProps` (open-ended) — broken since @mui/base | 0 | 0 | `Omit` drop ✅ done (PR #4947) |
| Drawer | 0 | none — extends `BaseProps` only | n/a | n/a | no-op |
| **Modal** | 0 | **locally narrowed** `classes?: { closeButton?: string }` (Modal.tsx:64–66); does NOT extend `StandardProps` | — | **uses `closeButton`** (talent-activation-frontend, top-assessment-frontend, topteam-frontend) | **KEEP narrowed** — Modal is structurally a Tier 3.b shape despite Tier 0 migration path. Don't drop. |
| Slider | 0 | none — extends `BaseProps` only | n/a | n/a | no-op |
| Switch | 0 | extends `BaseProps,` (not StandardProps) | uses FormControlLabel `{ root, label }` internally | 0 | no-op for own classes; preserve FormControlLabel call |
| Tabs | 0 | none — extends `BaseProps` only | n/a | n/a | no-op |
| Container | 1 | open-ended StandardProps, vestigial | 0 | 0 | `Omit` drop (bundle into Tier 1 cleanup) |
| Typography | 1 | same | 0 | 0 | `Omit` drop |
| Notification | 1 | same | 0 | 0 | `Omit` drop |
| FormControlLabel | 1 | locally narrowed `{ root, label }`, used by Switch/Radio/Checkbox | 3 | 0 | KEEP narrowed surface; defer sunset to dependents' tickets |
| FormLabel / Grid / Form / Note / Menu | 1 | no `classes` (BaseProps only) | n/a | n/a | no-op |
| FormLayout / ModalContext / Utils | 1 | n/a (provider / utility) | n/a | n/a | no-op |
| Checkbox | 2 | extends `BaseProps` — **no public `classes`** | n/a | n/a | **no-op for classes**; `classes` inside Checkbox.tsx is JSS-local (`useStyles()`) |
| Radio | 2 | extends `StandardProps`, vestigial inherited (body uses JSS-local shadow, not the prop) | 0 callsites passing to Radio | 0 | `Omit` drop public |
| Tooltip | 2 | extends `BaseProps` — **no public `classes`** | n/a | n/a | **no-op for classes**; `classes` inside body is JSS-local |
| FileInput / FileList / ProgressBar | 2 | check each sub source — FileInput extends `BaseProps` (no `classes`) | n/a | n/a | **no-op for classes** on FileInput. FileList / ProgressBar: verify per source. |
| Popper | 2 | extends `BaseProps` — **no public `classes`** | n/a | n/a | **no-op for classes** |
| Accordion + subs | 3 | extends `StandardProps`, vestigial (body uses JSS-local) | 3 within Accordion.tsx itself (plumbing to MUI/subs) | 0 | `Omit` drop public; rewrite internal plumbing |
| **Dropdown** | 3 | **locally narrowed `{ popper, content }`**, body reads, externally used | 0 callsites passing (consumes own); ~4 in Page subs | **2 real** | **KEEP narrowed API**, port slot routing |
| Page | 3 | extends `BaseProps` — **no public `classes`** | n/a | n/a | **no-op on Page itself**. Sub-components pass to Dropdown/Accordion — those callsites stay. |
| **OutlinedInput** | 3 | **locally narrowed `{ input, root }`**, body reads, externally used | 0 (consumes own) | **4 real** | **KEEP narrowed API**, port slot routing |

---

## 7. How migration agents should use this audit

**This audit is a hypothesis, not a script.** Every component's source can drift; assumptions can become stale; the agent migrating a specific component must verify per-component.

### 7.1 Research steps the agent must perform per migration

Before applying any `classes`-related change, the agent does:

1. **Read the component's `Props` interface** in the main `.tsx`.
   - Does it `extends StandardProps`? (Open-ended `classes` inherited.)
   - Does it declare LOCAL `classes?: { ... }`? (Narrowed.)
   - Both? (Local declaration shadows the inherited one — TypeScript narrows.)

2. **Read the sibling `styles.ts`** (if any).
   - JSS `createStyles({ ... })` keys are the historical slot vocabulary.

3. **Grep the component body** for `classes.` / `classes?.` access.
   - If declared but never read → vestigial.
   - If read → identify which slots are actively consumed.

4. **Multiline rg internal callsites**:
   ```bash
   rg --multiline --multiline-dotall -U \
     '<<Name>\b[^>]*?\bclasses\s*=\s*\{\{' \
     -g '*.tsx' -g '*.ts' packages/
   ```
   List each callsite + the slot keys it passes.

5. **Cross-reference with this audit** (§3 / §4 / §5).
   - Does YOUR finding match the audit's row?
   - If yes: apply the recommended action.
   - If no: stop. Update the audit. Don't proceed on a stale assumption.

### 7.2 Decision matrix based on YOUR findings

| YOUR finding | Action |
|---|---|
| Component extends `StandardProps` only (open-ended), `classes` never read in source, 0 internal callsites, audit says 0 external usage | Drop via `extends Omit<StandardProps, 'classes'>` + destructure `classes: _classes` as runtime backstop. No diff JSON. |
| Component extends `StandardProps`, `classes` read for slots that disappear under the new stack (e.g. consumed by MUI v4 wrapper being replaced) | Drop public `classes` via `Omit`. Rewrite internal slot-routing during the migration (slots → @base-ui/react part-level `className`). Note in PR description. |
| Component has locally narrowed `classes?: { slotA, slotB }` AND it's read in the body AND audit shows external real usage | **KEEP narrowed surface.** Port the slot-routing to the new @base-ui/react/Tailwind implementation. Each slot maps to an @base-ui/react part's `className`. |
| Audit assumption contradicts what you find in source (e.g. audit says vestigial but the body reads `classes.root`) | STOP. Don't proceed. Update `classes-audit.md` with your finding (correct it). Re-evaluate the recommendation. |
| `gh search code` upper-bound says non-zero external but you haven't manually inspected the `textMatches` fragments | Inspect the fragments. File-level matches are often false positives (notistack / icons / etc. on the same file as the target component). |

### 7.3 What NOT to do

- Don't blindly `Omit<StandardProps, 'classes'>` without confirming the component actually extends StandardProps.
- Don't add the deprecated `withClasses` helper from `@toptal/picasso-utils` — that pattern is retired (see `classes-shim.md`).
- Don't drop a locally narrowed `classes?: { ... }` API on a component where consumers depend on it (Dropdown, OutlinedInput).
- Don't generate `<Component>-diff.json` for "we dropped `classes`" if the audit confirms zero external usage — there's no real API change to document.
- Don't trust gh-search-code upper-bound counts without inspecting the `textMatches` fragments. File-level matches lie.

### 7.4 If you find new external usage

The audit was run on 2026-05-11. Consumer repos change. If you spot new external real usage (via fresh gh search code + manual fragment inspection):

1. Update §3 / §4 / §5 of `classes-audit.md` with the new finding.
2. Re-evaluate the recommendation — if external real usage now exists where it didn't before, drop becomes risky and the component should be treated as Tier 3.b (narrowed + preserved).

---

## 8. Recommendation summary

| Tier | Action |
|---|---|
| **Tier 0 — Button + ButtonBase** | `Omit<StandardProps, 'classes'>` drop. ✅ done (PR #4947). |
| **Tier 0 — Modal** | **KEEP narrowed `classes?: { closeButton }`** (Modal already declares this locally; real external consumers use it). Tier 3.b shape despite Tier 0 migration path. |
| **Tier 0 — Backdrop / Badge / Drawer / Slider / Switch / Tabs** | No-op for `classes`. These extend `BaseProps` (not `StandardProps`), have no `classes` API to drop. |
| **Tier 1 — Container / Typography / Notification** | `Omit` drop (zero blast radius — vestigial inheritance). |
| **Tier 1 — FormControlLabel** | KEEP narrowed `{ root, label }` (used internally by Switch/Radio/Checkbox). |
| **Tier 1 — FormLabel / Grid / Form / Note / Menu** | No-op (extend `BaseProps`, no `classes`). |
| **Tier 1 — FormLayout / ModalContext / Utils** | n/a (providers / utility). |
| **Tier 2 — Radio** | `Omit<StandardProps, 'classes'>` drop (vestigial — body uses JSS-local shadow, not the prop). |
| **Tier 2 — Checkbox / Tooltip / FileInput / Popper** | **no-op for classes**. They extend `BaseProps` and have no public `classes` API. Inside-body `classes` references are JSS-local (`useStyles()`). |
| **Tier 3.a** — Accordion + subs | `Omit<StandardProps, 'classes'>` drop (vestigial). Rewrite internal plumbing during heavy migration. |
| **Tier 3.b** (Dropdown, OutlinedInput) | **KEEP narrowed `classes?: { ... }`**. Real external consumers depend. Port slot-routing to @base-ui/react part-level `className`. |
| **Tier 3 — Page** | **no-op on Page itself** (extends `BaseProps`, no public `classes`). Page subs pass to Dropdown/Accordion — those callsites stay or rewrite alongside Accordion migration. |

This collapses the three-option matrix in `classes-shim.md` to a per-tier decision driven by actual data.

End-state: once all 28 components migrate, `StandardProps`, `JssProps`, `Classes` are removed from `@toptal/picasso-shared`. Dropdown + OutlinedInput retain their locally narrowed `classes?: { popper, content }` / `{ input, root }` API permanently.

---

## 9. Open follow-ups

- **FormControlLabel sunset**: tracked under Switch (Tier 0) + Radio/Checkbox (Tier 2) migrations.
- **Modal `closeButton` slot**: Modal is Tier 0 but external consumers use `<Modal classes={{ closeButton }}>` (verified in audit data — talent-activation-frontend, top-assessment-frontend, topteam-frontend all pass it). The Tier 0 `Omit` drop is in tension with this real usage. **Re-verify when Modal migrates** — may need to be treated as Tier 3.b (narrowed + preserved) instead of Tier 0 (drop).
- **Update `classes-shim.md`**: reflect the per-tier decisions from this audit (current shim doc still says "Tier 2/3 PENDING").
- **Update per-component plan files** with the research-aware classes guidance.
