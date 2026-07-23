# Modernizing Picasso onto Base UI and Tailwind

## Problem

Picasso is not optional infrastructure — it is Toptal's frontend: roughly 75% of all React code, spanning 39 repositories and 3,000+ files across 23 actively developed apps. Its foundation had become a liability:

- **`@material-ui/core` v4 is deprecated** — it receives no security patches and is the hard blocker for **React 19** across every consuming repo.
- **`@mui/base`** (the interim headless layer Picasso partially adopted) **never left beta** and is itself now superseded.
- **Two styling systems coexist** — legacy JSS (`createStyles` / `PicassoProvider.override`) alongside a partial Tailwind adoption — so every component carries dual mental models and dual runtime cost.
- Developer friction is high, and AI coding tools generate poor Picasso code because the internals are non-standard.

Because Picasso *is* the frontend, any change must preserve the public component API — a breaking rewrite would ripple across 3,000+ files.

## Decision

**Modernize Picasso in place**: replace the `@material-ui/core` v4, `@mui/base`, and JSS internals with **`@base-ui/react` (Base UI) primitives styled with Tailwind CSS**, keeping each component's public API stable and shipping codemods for any unavoidable breaking change.

This is the "evolutionary upgrade" path — swap the guts, keep the shell. It is the technical core of the broader modernization program; a shadcn-compatible component registry and an AI-native tooling layer (MCP, editor rules) are built on top of this foundation and tracked as a separate workstream.

### Why Base UI (not Radix or React Aria)

A headless library supplies behavior + accessibility and lets Picasso own all styling. Three were compared:

| | Base UI | Radix UI | React Aria |
|---|---|---|---|
| Stability / coverage | v1 stable (Dec 2025), 35–40 components, **single package**, ships Combobox + multi-select | mature, 30+, per-component packages, no Combobox | mature, 40+ (Adobe) |
| Maintainer | teams behind **MUI, Radix, and Floating UI** | WorkOS (acquisition concerns) | Adobe |
| Tailwind / shadcn | excellent; first-class shadcn support (Jan 2026) | excellent; shadcn default | excellent; no shadcn support |

**Base UI** was chosen: it is the stable successor built by the same people who built Radix (with those lessons applied), ships as a single package with the widest component coverage, integrates cleanly with Tailwind, and — coming from the MUI lineage — maps most naturally onto Picasso's existing MUI-shaped internals. Where Base UI ships no primitive (standalone Popper, Backdrop), Picasso keeps a thin custom implementation — see [ADR 20](20-popper-floating-ui.md) and [ADR 21](21-backdrop-custom-implementation.md).

### Why Tailwind (not keep JSS)

- **One styling layer, not two.** Tailwind was already partially adopted; standardizing on it removes the JSS/Tailwind split and its duplicated runtime.
- **No runtime CSS-in-JS.** `createStyles` and `PicassoProvider.override` give way to static utility classes plus `data-*` state variants — simpler SSR, smaller runtime.
- **BASE token alignment and a predictable override model.** Tailwind utilities map directly onto BASE design tokens, and `twMerge` provides a consumer-`className`-always-wins override contract that JSS never expressed cleanly.

## Alternatives considered

| Option | Why not |
|---|---|
| **Adopt shadcn *inside* Picasso** — wrap shadcn components behind Picasso's API | A dual abstraction layer (Picasso wrapping shadcn) adds complexity and an ongoing sync burden; not every Picasso component has a shadcn equivalent; it invites "which API do I use?" confusion. |
| **Ditch Picasso, build a new kit on shadcn** | Highest AI-friendliness but existential risk: a 6–12-month, 3–5-engineer rewrite of 3,000+ files that discards 7+ years of battle-tested behavior and accessibility work, with a reduced-velocity feature freeze. Only justified if Picasso were beyond saving. |
| **AI-native tooling only** — MCP + editor rules, no internal change | Fast and zero-disruption, but does **not** fix the core debt (MUI v4, JSS, React 19). Valuable only as a complement — which is why the tooling layer sits on top of this modernization rather than replacing it. |

## Consequences

- **React 19 is unblocked** across all consuming repos, and Picasso returns to a maintained, patched foundation.
- **A single styling system** (Tailwind), with no runtime CSS-in-JS.
- **Consumer disruption stays low** — public APIs are preserved, and `picasso-codemod` (which has handled prior major migrations) covers the mechanical changes.
- Picasso **remains a custom design system**, so the maintenance cost of owning components continues — accepted, in exchange for avoiding a full rewrite.
- The modernized foundation enables the separately-tracked shadcn-registry + AI-native tooling workstream.

## References

- [Picasso Modernization Decision Framework](https://toptal-core.atlassian.net/wiki/spaces/PF/pages/5647925252/Picasso+Modernization+Decision+Framework) — options A–E, the headless-library comparison, and the weighted decision matrix.
- [Picasso proposal](https://toptal-core.atlassian.net/wiki/spaces/PF/pages/5715951617/Picasso+proposal)
- [Investment Proposal for Picasso Modernization — Unlocking AI Prototyping and React 19 Compatibility](https://toptal-core.atlassian.net/wiki/spaces/PF/pages/5615583238/Investment+Proposal+for+Picasso+Modernization+Unlocking+AI+Prototyping+and+React+19+Compatibility)
- [`03-mui-v5-migration.md`](03-mui-v5-migration.md) — the prior MUI-related decision this supersedes for the v4 packages.
