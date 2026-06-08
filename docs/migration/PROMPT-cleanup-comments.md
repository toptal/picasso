# Review-aid comment cleanup protocol

You are stripping **review-aid comments** from a migration PR's source, run by the operator
(`pnpm orchestrate --cleanup`) right before they merge manually. During the migration you (or a
prior agent) added comments that explain the WHY of the change for reviewers — multi-paragraph
`@mui/base`-vs-`@base-ui/react` narration, pointers like *"see code-standards.md §X"*, restatements
of what the next line does. **These help during review but must not survive into the codebase.** The
repo's comment policy (root `CLAUDE.md` / `AGENTS.md`): *"Default to writing no comments. Only add one
when the WHY is non-obvious."*

Your job: remove the throwaway review aids, **preserve the load-bearing ones**, change **nothing
else**. This is a comment-only edit pass — no code, no logic, no formatting churn.

## Scope — added lines only

You are given this PR's diff (`git diff <base>...HEAD`). **Only comments on `+`-added lines are in
scope.** NEVER touch a comment that exists on the base branch (an unchanged/context line in the
diff). If you're unsure whether a comment is pre-existing, leave it.

Touch `.ts` / `.tsx` source. Do not edit tests (`test.tsx`, `*.test.ts`), stories (`story/`),
snapshots, changesets, or docs.

## The test, and the overriding rule

After merge the migration is history — nobody reading this file cares what `@mui/base` did or why the
swap chose X. **Default to REMOVE.** A comment survives only if it documents the *current* code's
behavior for someone who never saw the migration.

**Overriding REMOVE rule — migration-referential comments (this BEATS every PRESERVE rule below).**
Delete any added comment that references the migration or the libraries involved. Triggers — ANY of:

- Names a library: `@base-ui/react`, `@mui/base` / "MUI".
- Names a `@base-ui/react` **compound part** — `Slider.Root` / `.Track` / `.Thumb` / `.Indicator` /
  `.Control`, or any `<Part>.<Subpart>` from the new library's anatomy. (Referencing the part tree is
  library-implementation detail; describe the DOM/CSS effect plainly or not at all.)
- Cites a doctrine **"rung"**.
- Uses **change-framing** that only makes sense relative to the swap: "now …", "no longer …",
  "previously / used to …", or "preserves / mirrors / matches **prior / legacy / previous**
  behavior". (Post-merge there is no "before" — "now nests inside Slider.Track" is pure narration.)

These exist to help *review* the swap; post-merge they are noise. Remove them **entirely** even when
they carry a kernel of rationale — that rationale belongs in the PR description / changeset, not the
source. **Do NOT rewrite them shorter** — condensing migration narration still leaves migration
narration; delete the whole block. Also delete **restatement-of-code** comments that merely narrate
the adjacent classes/line (e.g. "Centered via `top-1/2 + -translate-y`" sitting above those exact
utilities).

> The three canonical offenders, all REMOVE: the `// No contain-layout… @base-ui/react sets translate
> -50%… (kept via rung -1)` layout note; the `// Public Props.onFocus/onBlur… @base-ui/react
> SliderThumb forwards… Cast at the helper boundary` cast note; the `// @base-ui/react defaults
> thumbCollisionBehavior to 'push'… '@mui/base' swapped thumbs…` behavior note. Each names a library
> or rung → gone, not shortened.

## PRESERVE — load-bearing comments (DO NOT remove)

Removing any of these would lose information a future maintainer (with no migration context) needs.
**None of these override the migration-referential rule above** — if a candidate also names a
library / rung / "prior behavior", it is REMOVE regardless of the category it otherwise fits:

- **`// eslint-disable-next-line <rule> -- <reason>`** and any `eslint-disable` with a rationale — the
  reason is the contract for why the rule is suppressed.
- **`// @ts-expect-error <reason>`** / `// @ts-ignore <reason>` — type-system escape hatches.
- **`/** @deprecated [TICKET] … */`** and **Props JSDoc blocks** (`/** … */` documenting a public
  prop/type) — consumer-facing API docs surfaced in generated docs.
- **`// TODO(tokens): <desc>`** and other `// TODO([TICKET]): …` trackers (`code-standards.md` §arbitrary
  values, `practices.md`) — future-work markers.
- **Variance/cast rationale — ONLY if migration-free.** Keep a one-line note at a cast/narrow ONLY
  when it explains a *current-code* constraint without invoking the migration. If it justifies the
  cast by what `@base-ui/react` / `@mui/base` does (e.g. "SliderThumb forwards onFocus to the nested
  `<input>`…"), it is migration-referential → **REMOVE** per the overriding rule.
- **Passthrough-prop rationale** — comments naming the still-coupled *consumer* for a prop kept in the
  type but stripped at runtime, e.g. `ownerState` "kept for Modal/Drawer; discarded at runtime"
  (`lessons-learned.md` §slot-props). These name a Picasso consumer (not the library) and stop readers
  treating the prop as dead code, so they stay.
- **Any one-line comment stating a genuinely non-obvious WHY about the current code** — a hidden
  invariant, a workaround for a specific bug, surprising behavior — **provided it does NOT reference
  the migration / library / doctrine rung.** A comment whose WHY is "to preserve/mirror the old
  library's behavior" (e.g. the `thumbCollisionBehavior='swap'` note) is migration narration →
  REMOVE, not keep.

## REMOVE — review-aid comments

- **Multi-paragraph migration narration** — prose explaining what was done and why during the swap
  (e.g. "Margin compensation preserves @mui/base baseline positioning; the new primitive sets
  `translate: -50% -50%` so we removed the legacy `-mt`…"). The decision belongs in the changeset /
  PR description, not the source (`lessons-learned.md` §"don't leave authoring-only/reasoning
  comments").
- **Doc-pointer comments** — *"see code-standards.md §X"*, *"see rules/…md"*, *"per references/…",
  *"see PR #…"*. Internal references for reviewers, noise in the codebase.
- **`@mui/base` vs `@base-ui/react` history** — comments contrasting the old and new library's
  behavior purely to justify the migration choice.
- **Restatement-of-code** — comments that paraphrase what the next line obviously does.
- **Subtle: JSDoc on internal passthrough props** — a `/** … */` block added to an internal-only prop
  like `ownerState` leaks into public API doc generation; convert to a plain `//` comment if the WHY
  is load-bearing, otherwise remove (`lessons-learned.md` §JSDoc-passthrough).

## Heuristic when uncertain

Read each candidate as a maintainer who has **no migration context**: *if removing the comment
wouldn't confuse them, remove it.* Lean aggressive — most added comments are review aids and should
go. Two tie-breakers:

- **Migration-referential and torn → REMOVE.** If the comment names a library / rung / "prior
  behavior" at all, the overriding rule wins; don't rescue it as a "WHY".
- **Truly migration-free and torn → keep** a terse version only if it documents a current-code
  invariant a maintainer would genuinely re-derive wrong without it (eslint-disable reason,
  `@ts-expect-error`, a real bug workaround). Everything else: remove.

## Workflow

1. Read the diff above; list the `+`-added comments and classify each PRESERVE / REMOVE.
2. Apply edits per file with the Edit tool (absolute paths under your cwd). Remove whole comment
   blocks cleanly — watch for dangling `/*` or `*/` and leftover blank lines.
3. **Self-check:** run the package typecheck (e.g. `pnpm --filter <pkg> build:package`) to confirm no
   comment removal left a malformed block comment. Fix any breakage you caused.
4. Exit naturally. The orchestrator stages, re-verifies, commits `[cleanup]`, and pushes; you do not
   commit or push.

Do not create files, do not run `git commit`/`git push`, do not edit anything outside the in-scope
source comments.
