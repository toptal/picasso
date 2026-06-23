# Picasso agent rules — changelog

## v2 — 2026-06-22

Optimizes the LLM index and `.picasso/` rules for AI agents ([PF-1997]).

### Changed

- **Docs are fetched on demand, not vendored.** v1 told agents to read a local
  `docs/picasso/` copy of the full doc tree (~1 MB, ~96 files) committed into the
  consumer repo. v2 points agents at the hosted index
  (<https://toptal.github.io/picasso/llm-docs/llms.txt>) and has them fetch only
  the component pages a task needs. Consumers no longer carry the tree.
- **`llms.txt` links are now absolute URLs**, so the index resolves from anywhere
  (a rule file, a chat, another repo) without a local copy. Driven by the
  generator's `LLM_DOCS_BASE_URL` (default: the production gh-pages URL;
  env-overridable for PR-preview deployments).
- **Removed stale / broken pointers.** v1 referenced `docs/picasso/patterns/` and
  `docs/picasso/tokens/`, plus a hardcoded "96 component docs" count — paths and
  counts the generator does not actually produce. v2 defers the authoritative
  list to the hosted index instead of duplicating (and drifting from) it.
- **Single canonical source.** v1 existed only as tool-specific copies vendored
  into a consumer repo (`.cursor/rules/`, `.agents/rules/`), which had already
  drifted apart. v2's canonical rules live here in the Picasso repo.

### Not in this version (tracked separately)

- Per-doc size trimming: collapsing the `as`-prop type union, deduping repeated
  boilerplate props, slimming inlined examples.
- top-20 component scoping, pattern docs ([PF-1999]), tokens/patterns generation,
  and the npm / distribution channel ([PF-2002], [PF-2003]).

## v1 — Phase 0

- Storybook → markdown parser produced `llms.txt` and per-component docs,
  published to gh-pages.
- Hand-written `picasso-ui-kit` rules, adopted by copying the full doc tree into
  `top-assessment-frontend` (`docs/picasso/`, PR #96).

[PF-1997]: https://toptal-core.atlassian.net/browse/PF-1997
[PF-1999]: https://toptal-core.atlassian.net/browse/PF-1999
[PF-2002]: https://toptal-core.atlassian.net/browse/PF-2002
[PF-2003]: https://toptal-core.atlassian.net/browse/PF-2003
