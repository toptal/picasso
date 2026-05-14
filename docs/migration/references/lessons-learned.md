# Migration lessons learned

Auto-accumulated by the orchestrator after each successful component migration. Each entry captures the 2–3 patterns that the agent applied, so subsequent migrations of similar components inherit hard-won knowledge.

**How this file is updated.** When the orchestrator successfully opens a PR for a component, a small post-success step (in `bin/lib/orchestrator-core.ts`) extracts the 2–3 most useful patterns from the agent's commit + asks claude to summarize them. The summary is appended to this file. Subsequent runs include this file in `migrationWorkflow.contextPack`, so the agent reads it as part of its prompt.

**How to read this.** Skim for components that share your migration shape (Tier 0 light path, Tier 1 cleanup, Tier 2 heavy, etc.). The patterns are not prescriptive — they're what worked for that specific component. Apply judgment.

**How to add manual entries.** If you discover a pattern outside an orchestrator run (e.g. while doing a manual migration takeover after escalation), append it manually using the same shape:

```markdown
## <ComponentName> — <YYYY-MM-DD>

- Tier <0–5> · target_path: `<@base-ui/react/...>` or `none` · iterations: <N>
- Pattern A: <one-line description of a non-obvious shift>
- Pattern B: <ditto>
- Pattern C (optional): <ditto>
- Reference: <PR URL or commit SHA>
```

---

<!-- Entries appended below by orchestrator. Do not delete this marker. -->

## Button — 2026-05-08

- Tier 0 · target_path: `@base-ui/react/button` · iterations: 1
- Pin `@base-ui/react` to `^1.4.1` and widen the React peer to `>=16.12.0` (drop the `<19.0.0` upper bound) when swapping out `@mui/base`, since Base UI's peer range and the migration's React-19 readiness were both required for CI to resolve installs.
- Expect snapshot churn in *consumer* packages too (e.g. `Pagination`) from Base UI's added `data-disabled=""` attribute and the dropped trailing `base-` token — regenerate snapshots across every package that renders Button, not just Button's own.
- Replace MUI's `slots`/`slotProps`/`rootElementName` polymorphism with Base UI's `nativeButton` + `render={React.createElement(as)}` pattern (see `rules/base-ui-react-api-crib.md`).
- Reference: https://github.com/toptal/picasso/pull/4947

## `classes` prop strategy — 2026-05-11 (revoked withClasses mandate)

- Scope · target_path: cross-tier policy · iterations: post-PR-#4947 review
- **Tier 0**: drop `classes` from public Props via `extends Omit<StandardProps, 'classes'>` (precedent: Button PR #4947). The prop was already broken since the @mui/base era — no real API change, no `<Component>-diff.json`. Also destructure `classes: _classes` as runtime backstop for `{...rest}` spreads.
- **Tier 1 cleanup-only**: don't touch `classes` — no source change.
- **Tier 2/3**: ⚠️ DECISION PENDING (due 2026-05-11 week) — three options: `SlottedProps<K>` shared type / per-component Omit+narrow / drop entirely. Escalate any Tier 2/3 migration until decision lands. Don't apply the old `withClasses` pattern.
- See `decisions/classes-shim.md` for full revision history + pending Tier 2/3 options.
- Reference: PR #4947 review threads r3207767115 + r3207780637

## Backdrop — 2026-05-14 (review iter 3)

- Tier 0 · target_path: `none` · iterations: 3
- When dropping an `@mui/base` slot-props import, replace it with `BaseProps + React.HTMLAttributes<ElementTag>` and keep `ownerState`/injected `className` as typed-but-stripped props with a comment naming the still-coupled consumers (Modal/Drawer) — see `rules/base-ui-react-api-crib`.
- Every migration PR needs a changeset entry that documents both the internal type swap and the peer-dependency cap lift (`react < 19.0.0` → `>=16.12.0`), not just a "behavior unchanged" note.
- "Renders without crashing" tests must include a real assertion (`expect(container).toBeInTheDocument()`) — bare `render()` calls get flagged on review.
- Reference: https://github.com/toptal/picasso/pull/4954

## Slider — 2026-05-14 (review iter 1)

- Tier 0 · target_path: `@base-ui/react/slider` · iterations: 1
- Snapshot diffs reveal API drift on first render (e.g. missing `aria-valuemin`/`aria-valuemax`, `position: fixed` input, `id` collisions) — agents must inspect snapshot churn for accessibility/markup regressions and restore parity (or document rationale) rather than just `--updateSnapshot`, per `rules/api-preservation.md`.
- When @base-ui/react replaces a single MUI component with compound parts (Root/Control/Track/Indicator/Thumb), derive ownerState locally (range detection, mark positions, active mark) and route slot props through children — see `rules/base-ui-react-api-crib.md`; don't try to shim `slots`/`slotProps`.
- Don't widen peerDeps incidentally (`react: ">=16.12.0 < 19.0.0"` → `">=16.12.0"`) as part of an internals swap — keep the existing range unless React 19 support is the explicit, tested scope of the PR.
- Reference: https://github.com/toptal/picasso/pull/4955
