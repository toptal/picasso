# Picasso → Figma Product Library mapping

**File:** [Product Library](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library) (key `5SCTOPrCDcHuk5We091GBn`)
**Scope:** the 28 Picasso components in the PI-4318 modernization (Tier 0–3 of [manifest.json](../migration/manifest.json)).
**Generated:** 2026-05-26 (auto-discovery via Figma MCP `get_metadata`)

Each row links to the Figma **page** that hosts the component spec. Pages contain a 📜 Docs frame (header + usage) plus variant component-sets. Use the page link as the entry point, then drill into the named variant frame.

URL convention: `…/Product-Library?node-id=<page-id>` (Figma accepts both `:` and `-` as separator).

---

## Tier 0 — Light path (8 components)

| Component | Status | Figma page | Key variant frames | Notes |
|---|---|---|---|---|
| Backdrop | done | _(no dedicated page)_ | — | Backdrop is a layout primitive used by Modal + Drawer. In Figma it lives as part of Modal/Drawer screens, not as a standalone component. Migration note in manifest: "No standalone Backdrop in @base-ui/react (only Dialog.Backdrop)". |
| Badge | done | [Badges](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=60-0) | — | Page id `60:0`. |
| Button | done | [Buttons](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=86-0) | `Rectangle / Primary` (`104:1623`), `/ Secondary` (`104:1729`), `/ Positive` (`104:1652`), `/ Negative` (`104:1672`), `/ Transparent` (`104:1749`), `Action / Primary` (`109:297`), `Action / Transparent` (`9912:39173`), `Circle / Primary` (`110:252`), `Circle / Secondary` (`110:253`), `Circle / Transparent` (`110:451`), `Rectangle / Primary Split` (`832:14859`), `Rectangle / Secondary Split` (`832:14968`) | Page id `86:0`. Variants: 5 styles × 3 sizes × 7 states × icon-left/right; plus IconButton (Circle/*) and SplitButton. |
| Drawer | awaiting_review | [Drawer](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=344-13034) | — | Page id `344:13034`. |
| Modal | queued | [Modals](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=280-13388) | — | Page id `280:13388`. |
| Slider | needs_human | [Slider](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=319-12959) | — | Page id `319:12959`. |
| Switch | awaiting_review | [Switches](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=172-2237) | — | Page id `172:2237`. |
| Tabs | needs_human | [Tabs](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=238-10918) | — | Page id `238:10918`. |

## Tier 1 — Cleanup-only (11 components)

| Component | Status | Figma page | Key variant frames | Notes |
|---|---|---|---|---|
| Container | queued | [Containers](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=139-2221) | — | Page id `139:2221`. |
| Form | queued | _(no dedicated frame)_ | — | Hosted on the [Forms](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=213-10592) page but no standalone "Form" wrapper frame exists — Form is a layout/data primitive without a discrete Figma spec. |
| FormLabel | queued | _(no dedicated frame)_ | — | On the [Forms](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=213-10592) page, FormLabel appears only as the `<Label>` text child inside Input frames — not modeled as a standalone Figma component. |
| FormLayout | queued | _(no dedicated frame)_ | — | Code-only spacing primitive; no Figma representation. |
| Grid | queued | [Grids](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=252-11005) | — | Page id `252:11005` (under FOUNDATIONS). |
| Menu | queued | [Dropdown](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=191-2806) _(tentative)_ | — | No dedicated "Menu" page; the popover-menu variants live inside the Dropdown page. Verify on next sweep — could also surface in [Sidebars](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=401-13190). |
| ModalContext | queued | _(no UI)_ | — | React context provider — no design representation. |
| Note | awaiting_review | [Notes](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=280-13367) | — | Page id `280:13367`. |
| Notification | queued | [Notifications](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=344-13192) | — | Page id `344:13192`. Also see [Alerts](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=83-0) for inline notification variants. |
| Typography | queued | [Typography](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=3-2) | — | Page id `3:2` (under FOUNDATIONS). |
| Utils | queued | _(no UI)_ | — | Utility re-exports — no design representation. |

## Tier 2 — Heavy path A (5 components)

| Component | Status | Figma page | Key variant frames | Notes |
|---|---|---|---|---|
| Checkbox | queued | [Forms](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=213-10592) | `X / Checkbox / Checkbox` (`245:11069`); `Checkbox + Label` (`245:11326`) | Frame `245:11069` is the bare checkbox; `245:11326` is the FormControlLabel-equivalent. |
| FileInput | queued | [Dropzone](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=3472-15758) | — | Page id `3472:15758`. Picasso's FileInput renders as a dropzone. |
| Popper | queued | _(no dedicated page)_ | — | Positioning primitive — wraps Tooltip/Dropdown/Menu content. No standalone Figma component; see the consumers' pages instead. |
| Radio | queued | [Forms](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=213-10592) | `X / Radio / Radio` (`245:11055`); `Radio + Label` (`245:11325`) | Frame `245:11055` is the bare radio; `245:11325` is the FormControlLabel-equivalent. |
| Tooltip | queued | [Tooltips](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=72-0) | — | Page id `72:0`. |

## Tier 3 — Heavy path B + mixed (4 components)

| Component | Status | Figma page | Key variant frames | Notes |
|---|---|---|---|---|
| Accordion | queued | [Accordions](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=82-0) | — | Page id `82:0`. |
| Dropdown | queued | [Dropdown](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=191-2806) | — | Page id `191:2806`. Tier 3.b — retains narrowed `classes` shim (`docs/migration/decisions/classes-audit.md`). |
| OutlinedInput | queued | [Forms](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=213-10592) | `Input Vertical, Select, Number, Currency` (`12107:36998`); `Input Horizontal, ...` (`12123:35178`) | Two layout orientations. Tier 3.b — retains narrowed `classes` shim. Deprecated counterparts on the same page (prefixed `DEPRECATED`) intentionally omitted. |
| Page | queued | _(composite)_ | — | Picasso's Page is a layout shell composed of three Figma areas: [Page Heads](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=279-11840) (`279:11840`, contains Section Heads at `271:12265`), [Top Bars](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=282-12300) (`282:12300`), [Sidebars](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=401-13190) (`401:13190`). |

---

## Out-of-scope sibling packages (Tier 4–5)

Not in the 28-component scope but listed for completeness:

| Package | Tier | Figma page |
|---|---|---|
| picasso-charts | 4 | [DATA VIZ section](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=15136-6519) — Bar Chart (`8699:22398`), Line Chart (`8699:22399`) |
| picasso-query-builder | 4 | [Search Query Builder](https://www.figma.com/design/5SCTOPrCDcHuk5We091GBn/Product-Library?node-id=8577-21825) |
| picasso-rich-text-editor | 4 | _(no dedicated page; tokens referenced from List page deprecated Text Area)_ |
| picasso-provider | 5 | _(no UI; theming runtime)_ |

---

## Coverage summary

- **Direct match (page-level):** 19 / 28 — Backdrop excluded as known-no-page, plus the 18 components with their own Figma page.
- **Sub-frame within a host page:** 6 / 28 — Checkbox, Radio, OutlinedInput on Forms; Menu tentatively on Dropdown; Notification cross-referenced with Alerts; Page composed from 3 host pages.
- **No Figma representation:** 5 / 28 — Form, FormLabel, FormLayout, ModalContext, Popper, Utils (architectural/utility — design lives in their consumers' specs).

**Open questions to confirm with design:**

1. **Menu** — is the canonical spec on the Dropdown page, on Sidebars, or somewhere else? Drilled briefly but not confirmed; flagged for next pass.
2. **FormLabel** — confirm there is no standalone label spec, or whether labels are documented under Typography/foundations.
3. **Backdrop** — confirm migration team's intent: does the Figma side need a standalone Backdrop spec to mirror the code, or stay implicit via Modal/Drawer overlays?
4. **Notification vs. Alerts** — two adjacent pages (`344:13192` Notifications, `83:0` Alerts). Confirm which is canonical for the Picasso `Notification` component.
