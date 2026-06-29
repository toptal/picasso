# Proposed changes to the Impact / Metrics table

The current table mixes outcomes ("React 19 unblocked"), outputs ("23/23 repos migrated"), pilot-gate thresholds ("85% component accuracy"), and four TBDs. After the PI ends, four of seven rows can't be evaluated. The recommendation below splits the table into three layers — pilot-gate, outcome, and operating — removes weak rows, and adds metrics for the new tracks (AI-driven migration, `.picasso`, Code Connect, Maestro, Figma middleware).

---

## What's wrong with the current table

1. **Three rows are TBD/TBD.** A metric with both columns blank is not a metric; it is a placeholder. They should either get baselines on day 1 of the pilot or be deleted.
2. **The two "85% / 75%" pilot-gate numbers are unanchored.** Without specifying *with vs. without the AI context layer*, the same number could mean "the AI is good" or "the AI context layer is doing nothing." We need a comparison, not an absolute.
3. **"Repos migrated 0/39 → 23/23" is the wrong shape.** It is binary at PI close and gives no leading indicator during execution. A weekly burndown of components and consumer files is much more useful for a 14-week PI.
4. **Nothing in the table measures the cost or quality of the AI-driven migration**, which is the single biggest execution risk introduced by the new scope.
5. **No quality / regression metric.** "Modernized" is meaningless if Happo diffs blow up or post-migration bug rate spikes.
6. **Security framing in the abstract is not reflected.** Abstract says "no security patches"; metrics should track CVE / dependency-health movement.
7. **Track 2 (AI context), Track 3 (Figma), Track 4 (Maestro) are under-instrumented.** Code Connect coverage, llm index coverage, `.picasso` adoption, Figma middleware status are all missing.
8. **"Developer time savings" lacks a methodology.** Without naming the comparison protocol (e.g. paired implementation of N screens with/without pipeline), the number will be unreproducible and dismissable.

---

## Proposed structure: three tiers

Split the existing table into three smaller tables. This makes it obvious which numbers gate the pilot, which prove the PI hit its goals, and which we keep watching after the PI closes.

### Tier 1 — Pilot gate metrics (week 4 Go / Adjust / No-Go)

These are the only metrics the gate decision depends on. Targets are anchored to a comparison, not absolute thresholds.

| Metric | Baseline | Target at week 4 | How measured |
| --- | --- | --- | --- |
| AI component selection accuracy on pilot screens | Cursor/Codex without `.picasso` rules + without Code Connect (run on same 5 screens) | ≥ +30 pp absolute improvement, and ≥ 85% absolute | Manual scoring of AI output on 5 production screens by 2 reviewers; Cohen's kappa for inter-rater check |
| AI prop-mapping accuracy on pilot screens | Same baseline as above | ≥ +25 pp absolute improvement, and ≥ 75% absolute | Same protocol |
| Time-to-screen with pipeline vs. without | Median engineer time on 3 screens implemented manually | ≥ 40% median reduction across 3 paired screens | Stopwatch protocol, same engineers, randomized order to control for learning |
| Visual fidelity (Happo diff) of AI output vs. Figma | Manual implementation baseline | ≤ 1.5× the manual baseline diff score | Happo visual regression on the 5 pilot screens |
| AI-migration cost per component | Button + Switch actuals (Codex spend, human review hours) | ≤ 2× the prototype actuals per component on 3 newly migrated components | Migration log + AI spend dashboard |
| Pilot-team sentiment | N/A | ≥ 4/5 on "I want to keep using this" from all pilot engineers | Anonymous survey at week 3 |

Notes: every threshold is paired with a baseline so the gate decision is defensible. Drop "Developer time savings: TBD/TBD" — this row replaces it with a real protocol.

### Tier 2 — PI outcome metrics (judged at PI close)

These are what leadership will look at to decide if the PI delivered.

| Metric | Baseline (start of PI) | Target at PI close | How measured |
| --- | --- | --- | --- |
| Deprecated runtime deps in Picasso | MUI v4 (16 pkgs) + JSS (113 files) + @mui/base beta (11 pkgs) | 0 | `package.json` audit + grep for JSS imports |
| Open critical/high CVEs in Picasso dep tree | TBD — measured week 1 | 0 critical, 0 high | `yarn audit` / Snyk weekly report |
| React 19 unblocked | Blocked (Picasso peer-dep ≤ 18) | Picasso ships React 19-compatible major | Picasso `peerDependencies`; consumer-repo upgrade PR count |
| Picasso components on Base UI + Tailwind | 0/75 | 75/75 (or scoped subset if Q3 split) | Component audit |
| Active consumer repos on modern Picasso | 0/23 | ≥ 20/23 (stretch 23/23) | Migration tracker; weekly burndown chart attached |
| Code Connect coverage | 1/75 | 75/75 | Figma Code Connect publish report |
| Picasso llm index coverage | 0/75 | 75/75 components + 4 patterns + 3 token files; published at `picasso.toptal.net/llms.txt` | Index manifest |
| `.picasso` rules adoption in Portal apps | 0 | All actively developed Portal apps | Repo audit (`.picasso` file present + version current) |
| Maestro prototypes defaulting to Picasso | 0 | 100% of new Maestro prototypes started after week 8 | Maestro project audit |
| Figma middleware for Maestro | Does not exist | Production endpoint or vendor brokered; documented decision recorded | Architecture decision record + endpoint health check |

Note the deletion of "Maestro projects using Picasso TBD/TBD" — replaced by a measurable cutover rule (any new prototype after week 8).

### Tier 3 — Operating metrics (weekly during execution, kept after PI)

These don't gate anything but they are the dashboard that catches drift early.

| Metric | Cadence | What we want to see |
| --- | --- | --- |
| Components migrated this week | Weekly | Linear or front-loaded burndown to 75 |
| Consumer files touched by codemods this week | Weekly | Front-loaded; tail off as PI closes |
| AI migration spend (rolling 4-week) | Weekly | Inside the Track 1 budget envelope |
| AI migration cost per component (rolling 5) | Weekly | Within 2× of Button/Switch baseline; trigger pause if breached |
| Post-migration bug rate per component | Per release | No statistically significant uptick vs. pre-migration baseline (last 2 quarters) |
| Happo diff regressions per migrated component | Per PR | < 5 reviewable diffs per component median |
| `.picasso` rules version skew across consumer repos | Weekly | ≥ 80% of repos on latest minor within 2 weeks of release |
| llm index freshness | Per Picasso release | Index regenerated and published in same release as the components it documents |
| Pilot-team weekly satisfaction pulse (after pilot, for first 4 wks of full investment) | Weekly | ≥ 4/5 sustained |

---

## Specific row-by-row recommendations vs. the current table

| Current row | Recommendation |
| --- | --- |
| Deprecated/unmaintained deps — MUI v4 + JSS → 0 | **Keep.** Move to Tier 2. Add `@mui/base` beta to the "Current" cell so the picture is complete. |
| React 19 adoption — Blocked → Unblocked | **Keep, sharpen.** "Unblocked" is fuzzy. Define as: Picasso publishes a major with React 19 in `peerDependencies` AND ≥ 1 consumer repo on React 19. Move to Tier 2. |
| AI component accuracy (pilot gate) — N/A → 85% | **Replace** with the baseline-anchored version above. The 85% absolute is fine as a floor; the meaningful number is the *delta* vs. no-context baseline. |
| AI prop mapping accuracy — N/A → 75% | **Same fix** as above. |
| Developer time savings from AI — TBD → TBD | **Delete this row.** Replace with the Tier 1 "Time-to-screen with vs. without" row that has a baseline, target, and protocol. |
| Repos migrated — 0/39 → 23/23 | **Reframe.** 39 includes 16 dormant repos, target is already 23/23 in description. Make the row "Active consumer repos on modern Picasso, 0/23 → ≥20/23 (stretch 23/23)" and pair it with the weekly burndown in Tier 3. |
| Maestro projects using Picasso — TBD → TBD | **Delete the TBDs.** Replace with the cutover rule above ("100% of new Maestro prototypes started after week 8"). |

---

## New rows to add (mapped to the four tracks)

| Track | New metric | Why |
| --- | --- | --- |
| 1 — Modernization | AI-migration cost per component (envelope + per-component) | Track 1 is now AI-agent-led; without this row there is no way to know if the budget held. |
| 1 — Modernization | Components migrated burndown | Leading indicator for a 14-week execution; required for a healthy weekly status. |
| 1 — Modernization | Post-migration bug rate / Happo diff regressions | Quality gate; "modernized" must not mean "regressed." |
| 1 — Modernization | Open critical/high CVEs in Picasso dep tree | Matches the security framing in the abstract. |
| 2 — AI context | Picasso llm index coverage | Names a concrete artifact; today's table doesn't mention it. |
| 2 — AI context | `.picasso` rules adoption in Portal apps | The only metric that proves "AI-context layer reached the consumers." |
| 2 — AI context | llm index freshness (regenerated per Picasso release) | Without this the index rots; it is the #1 risk for the AI layer. |
| 3 — Figma | Code Connect coverage (1/75 → 75/75) | The single highest-leverage Track 3 deliverable; should be a top-line metric. |
| 4 — Maestro | Figma middleware status (does not exist → in production / brokered) | The biggest unknown in the PI; deserves its own row, not a TBD. |
| 4 — Maestro | Maestro prototype cutover rule | Replaces the TBD/TBD row with something binary and measurable. |

---

## Two principles to apply across the table

1. **Every row needs a baseline.** "TBD" in the Current column is a smell. If a baseline doesn't exist, the first deliverable of week 1 is to measure it; otherwise the row should be deleted.
2. **Every accuracy/percentage target needs a comparison protocol.** "85% accuracy" in isolation is not meaningful. Always pair the absolute floor with a *delta vs. baseline* and name the test set (5 pilot screens, paired protocol, two reviewers). This is what makes the gate decision defensible.

---

## TL;DR for the ticket edit

- Delete the three TBD/TBD rows.
- Anchor the two 85% / 75% rows to a baseline-with-vs-without comparison.
- Add: AI-migration cost per component, post-migration bug rate / Happo regressions, CVE count, Code Connect coverage, llm index coverage, `.picasso` adoption, Figma middleware status, Maestro cutover rule.
- Tier the table into Pilot gate / PI outcome / Operating, so leadership can scan it.
- Move the components-migrated and consumer-files-touched curves into a weekly burndown attached to the PI page.
