#!/usr/bin/env bash
# bin/migration-gate.sh — autonomous-migration gate runner
# Runs build → tsc → lint → jest → cypress → happo → react19 (stub) for one component.
# Invoked by bin/migration-orchestrator.ts after the agent edits files.
# Composite exit code is the source of truth for "is this migration done".
#
# Usage:  bin/migration-gate.sh <ComponentName>
# Output: migration-runs/<date>/<Component>/{<stage>.log, report.md}
#
# Conventions:
#   - <ComponentName> is the manifest ID (PascalCase for base/*, slash-prefixed for siblings).
#   - The script runs from the git toplevel regardless of cwd.
#   - Each stage's exit code is captured; the script does NOT short-circuit on failure
#     (we want all gates' output for the report). Final exit code is nonzero iff any stage failed.
#   - React 19 stage is a stub until PF-1994 wires the real smoke. See
#     docs/migration/migration-plan.md §6.2.

set -uo pipefail

# ---------- args -----------------------------------------------------------

if [ $# -ne 1 ]; then
  echo "usage: bin/migration-gate.sh <ComponentName>" >&2
  exit 64
fi

COMPONENT="$1"
ROOT="$(git rev-parse --show-toplevel)"
cd "$ROOT"

# ---------- path resolution ------------------------------------------------

# Manifest ID -> package directory.
# Conventions:
#   "Note"                          -> packages/base/Note
#   "query-builder/AutoComplete"    -> packages/picasso-query-builder/src/AutoComplete
#   "rich-text-editor/RichText"     -> packages/picasso-rich-text-editor/src/RichText
#   "rich-text-editor/plugins/X"    -> packages/picasso-rich-text-editor/src/plugins/X
#   "charts/LineChart"              -> packages/picasso-charts/src/LineChart

resolve_package_path() {
  local id="$1"
  case "$id" in
    charts/*)
      echo "packages/picasso-charts/src/${id#charts/}"
      ;;
    query-builder/*)
      echo "packages/picasso-query-builder/src/${id#query-builder/}"
      ;;
    rich-text-editor/*)
      echo "packages/picasso-rich-text-editor/src/${id#rich-text-editor/}"
      ;;
    */*)
      # Unknown sibling prefix; flag as error
      echo ""
      ;;
    *)
      echo "packages/base/$id"
      ;;
  esac
}

# Manifest ID -> package npm name (for `pnpm --filter`).
# "Note" -> "@toptal/picasso-note"
# "FormLabel" -> "@toptal/picasso-form-label"
# Sibling components return their parent package name.

resolve_workspace_name() {
  local id="$1"
  case "$id" in
    charts/*)            echo "@toptal/picasso-charts" ;;
    query-builder/*)     echo "@toptal/picasso-query-builder" ;;
    rich-text-editor/*)  echo "@toptal/picasso-rich-text-editor" ;;
    *)
      # PascalCase -> kebab-case via sed; prepend prefix
      local kebab
      kebab=$(echo "$id" | sed -E 's/([a-z0-9])([A-Z])/\1-\2/g' | tr '[:upper:]' '[:lower:]')
      echo "@toptal/picasso-$kebab"
      ;;
  esac
}

PKG_PATH="$(resolve_package_path "$COMPONENT")"
WORKSPACE_NAME="$(resolve_workspace_name "$COMPONENT")"

if [ -z "$PKG_PATH" ] || [ ! -d "$PKG_PATH" ]; then
  echo "error: cannot resolve package path for component '$COMPONENT' (got '$PKG_PATH')" >&2
  exit 65
fi

# ---------- output dir -----------------------------------------------------

DATE="${MIGRATION_RUN_DATE:-$(date +%Y-%m-%d)}"
RUN_DIR="migration-runs/$DATE/$COMPONENT"
mkdir -p "$RUN_DIR"

# ---------- per-stage runner ----------------------------------------------

# Track per-stage status. We use parallel arrays instead of associative arrays
# for portability with macOS' default bash 3.2.
STAGES=()
STATUSES=()
DURATIONS=()

run_stage() {
  local name="$1"; shift
  local logfile="$RUN_DIR/$name.log"
  local started elapsed status

  echo "→ [$name] $*" | tee -a "$RUN_DIR/console.log"
  started=$(date +%s)

  if "$@" >"$logfile" 2>&1; then
    status="PASS"
  else
    status="FAIL"
  fi

  elapsed=$(( $(date +%s) - started ))
  STAGES+=("$name")
  STATUSES+=("$status")
  DURATIONS+=("$elapsed")
  echo "  $status (${elapsed}s, log: $logfile)" | tee -a "$RUN_DIR/console.log"
}

run_stage_skip() {
  local name="$1"
  local reason="$2"
  echo "→ [$name] SKIP: $reason" | tee -a "$RUN_DIR/console.log"
  STAGES+=("$name")
  STATUSES+=("SKIP")
  DURATIONS+=("0")
  echo "SKIP: $reason" >"$RUN_DIR/$name.log"
}

# Part 4 (2026-05-13): hard-fail a stage without running a command. Used
# for missing-prerequisite cases (e.g. HAPPO_API_KEY unset). Distinguished
# from `run_stage` (runs + FAIL on non-zero exit) — `run_stage_fail`
# records the FAIL outright with an explanatory reason.
run_stage_fail() {
  local name="$1"
  local reason="$2"
  echo "→ [$name] FAIL: $reason" | tee -a "$RUN_DIR/console.log"
  STAGES+=("$name")
  STATUSES+=("FAIL")
  DURATIONS+=("0")
  echo "FAIL: $reason" >"$RUN_DIR/$name.log"
}

# ---------- stages ---------------------------------------------------------

# 0a. Changeset presence — the agent must author .changeset/<component>-migration.md
#    so that `feature/picasso-modernization` accumulates per-PR changesets that the
#    final `pnpm changeset version` aggregates into a per-package CHANGELOG. See
#    docs/migration/PROMPT-light.md / PROMPT-heavy.md §7 (Changeset) for the
#    template + the versionBump rules.
#
#    Detection scans the worktree's `.changeset/` for any new `*.md` (either
#    uncommitted in the working tree OR added on the current branch since base)
#    that isn't the boilerplate README.md / config files. Cheap filesystem +
#    git check — runs first so the agent gets fast feedback if it skipped the
#    step.
#
#    Opt-out: MIGRATION_GATE_CHANGESET=skip (used by orchestrator self-tests +
#    sandbox runs that exercise the gate without authoring real changesets).
check_changeset() {
  local uncommitted committed total
  uncommitted=$(git status --porcelain -- .changeset/ 2>/dev/null \
    | awk '{ print $NF }' \
    | grep -E '^\.changeset/[^/]+\.md$' \
    | grep -v 'README\.md' \
    | grep -v 'changelog\.config\.js' || true)
  committed=$(git log --diff-filter=A --name-only --format= HEAD ^"$(git merge-base HEAD master 2>/dev/null || echo HEAD)" -- .changeset/ 2>/dev/null \
    | grep -E '^\.changeset/[^/]+\.md$' \
    | grep -v 'README\.md' || true)
  total=$(printf '%s\n%s\n' "$uncommitted" "$committed" | grep -v '^$' | sort -u | wc -l | tr -d ' ')
  if [ "$total" -eq 0 ]; then
    echo "FAIL: no new .changeset/<component>-migration.md found." >&2
    echo "      Agent must author the changeset before the gate runs." >&2
    echo "      Template + rules: docs/migration/PROMPT-light.md / PROMPT-heavy.md §7 (Changeset)." >&2
    echo "      versionBump value is locked per-component in docs/migration/manifest.json." >&2
    return 1
  fi
  return 0
}
if [ "${MIGRATION_GATE_CHANGESET:-run}" = "skip" ]; then
  run_stage_skip "changeset" "MIGRATION_GATE_CHANGESET=skip"
else
  run_stage "changeset" check_changeset
fi

# 0. Lockfile drift — verify pnpm-lock.yaml satisfies package.json by running
#    `pnpm install --frozen-lockfile`, which exits non-zero if any dep in
#    package.json can't be resolved against the existing lockfile.
#
#    Earlier version used a diff-based check (package.json changed && lockfile
#    didn't → FAIL), but produced false positives: when an agent adds a dep
#    that's already resolved in the lockfile (e.g. `@base-ui/react@^1.4.1`
#    already pulled in by some other path), pnpm install doesn't need to
#    touch the lockfile — but the diff check flagged it as drift. CI also
#    runs pnpm install and would NOT fail in that case.
#
#    Running --frozen-lockfile mirrors what CI does: succeeds iff every
#    required dep is present in the lockfile. Cost: ~5-15s when warm
#    (no network, just verification).
check_lockfile_drift() {
  if ! command -v pnpm >/dev/null 2>&1; then return 0; fi
  pnpm install --frozen-lockfile 2>&1
  return $?
}
run_stage "lockfile-drift" check_lockfile_drift

# 0.5. Syncpack — validate dependency-version policy (catches CI's
#      "Static checks" failure mode locally). Picasso enforces:
#        - npm deps use caret prefix: "1.4.1" → must be "^1.4.1"
#        - workspace package deps use exact local version (no caret/tilde).
#      Picasso's `package.json` defines:
#        "syncpack": "pnpm syncpack:list & pnpm syncpack:fix"
#        "syncpack:list": "syncpack list-mismatches"
#      So invoking `pnpm syncpack <args>` runs the COMPOUND script with extra
#      args appended → "too many arguments" error from syncpack CLI. Use the
#      explicit `:list` subscript to call syncpack list-mismatches directly.
check_syncpack() {
  if ! command -v pnpm >/dev/null 2>&1; then return 0; fi
  pnpm --silent syncpack:list 2>&1
  return $?
}
run_stage "syncpack" check_syncpack

# 1. Build (workspace-scoped — fast).
run_stage "build" \
  pnpm --filter "$WORKSPACE_NAME" build:package

# 2. Type-check (repo-wide — there's no per-package tsc:noEmit script).
run_stage "tsc" \
  pnpm typecheck

# 3. Lint, scoped to the migrating package's src.
#    Repo-wide lint runs in CI; the gate only needs to validate the agent's
#    edits cleanly compile + lint. ~2s scoped vs ~24s repo-wide.
#    Per migration plan v3 §4.3 (gate sequence) + Tier 1.2 of post-canary-15
#    improvements plan: scoped fast feedback for inner-loop iteration.
#
#    Auto-fix pass (silent): runs `pnpm davinci-syntax lint code <path>` (no
#    --check) before the strict --check stage. Fixes formatting / blank-line /
#    import-order rules that don't merit an iteration loop. Output suppressed
#    so the run log isn't cluttered. Rationale: in canaries 16+17 the agent
#    repeatedly hit single-line `padding-line-between-statements` errors and
#    failed to self-fix despite mandatory instructions — auto-fix in the gate
#    skips that whole class of rules.
pnpm davinci-syntax lint code "$PKG_PATH/src" >/dev/null 2>&1 || true

run_stage "lint" \
  pnpm davinci-syntax lint code --check "$PKG_PATH/src"

# 3.5. Doctrine check — `!important` Tailwind utility patterns are forbidden in
#      v1 migration code per `rules/styling.md` §"@base-ui/react v1 prescriptions".
#      Per `references/base-ui-styling.md` §7.1 rung -1: walk the override-
#      preference ladder before reaching for !important; if a Tailwind utility
#      isn't winning, there's a rung you haven't tried (usually rung -1 = don't
#      override, OR rung 3 = `render` prop with `mergeProps` filtering).
#
#      Scope: only the migrating package's src/. Legacy occurrences in
#      Radio/styles.ts and RichTextEditorToolbar/styles.ts predate `@base-ui/react`
#      and are NOT in scope for this gate (per `code-standards.md` legacy note).
#
#      Pattern: a quote character (', ", `) immediately followed by `!` and an
#      optional `[`, then a word character. Catches:
#        '!flex', "!absolute"           — utility variant
#        '![translate:none]'            — arbitrary-value variant
#        '!hidden', '!translate-none'    — single utilities
#      Does NOT match JS expressions like `!isLoading` (no leading quote) or
#      TypeScript non-null assertions like `foo!.bar` (no leading quote).
#
#      Why this exists: Slider v2 PR #4975 shipped `'![translate:none]'` and
#      `'!absolute'` across 4 iters. PR #4976 (vedrani fork) replicated with
#      `'!translate-none'`. PR #4959 (manual) used `'!translate-none'` too.
#      Documentation alone (practices.md, doctrine, rules) hasn't been enough
#      to prevent these regressions — a mechanical gate is needed.
#
#      Opt-out: MIGRATION_GATE_DOCTRINE=skip (sandbox / smoke runs).
check_doctrine_no_important() {
  local hits
  hits=$(git grep -nE "['\"\`]!\[?\w" -- "$PKG_PATH/src" 2>/dev/null || true)
  if [ -n "$hits" ]; then
    echo "FAIL: !important Tailwind utility patterns detected in migration scope."
    echo ""
    echo "$hits"
    echo ""
    echo "  Per rules/styling.md §\"@base-ui/react v1 prescriptions\":"
    echo "    No !important. Walk the override-preference ladder in"
    echo "    references/base-ui-styling.md §7.1 — if a Tailwind utility isn't"
    echo "    winning, there's a rung you haven't tried."
    echo ""
    echo "  Usually the right answer is:"
    echo "    - rung -1: don't override (restructure DOM or accept Base UI's geometry"
    echo "      and classify the sub-pixel diff as 'intentional improvement')"
    echo "    - rung 3: <BaseUI.Part render={(props) => {"
    echo "                const { offendingProp, ...keepStyle } = props.style || {}"
    echo "                return <span {...props} style={keepStyle} className={...} />"
    echo "              }} />"
    echo ""
    echo "  Canonical case study: Slider PR #4976 (vedrani) eliminated both"
    echo "  '![translate:none]' (v2 PR #4975) and the legacy -mt-[7px] -ml-[6px]"
    echo "  margins it was defending — geometric correctness, no override."
    return 1
  fi
  return 0
}
if [ "${MIGRATION_GATE_DOCTRINE:-run}" = "skip" ]; then
  run_stage_skip "doctrine" "MIGRATION_GATE_DOCTRINE=skip"
else
  run_stage "doctrine" check_doctrine_no_important
fi

# 4. Jest, scoped to the package directory.
#    Skip the test:unit prelude (build) since stage 1 already covers it.
run_stage "jest" \
  env NODE_OPTIONS='--no-experimental-require-module' \
  pnpm davinci-qa unit --config=./jest.spec.mjs --testPathPattern "$PKG_PATH"

# 4b. Consumer-snapshot stage. Catches DOM-ripple snapshot drift in packages
#     that include the migrating component in their `__snapshots__/*.snap`.
#
#     Why this exists: stage 4's jest scope covers only the migrating package's
#     own tests. A Tier 0 base component (Button, Switch, Modal, etc.) renders
#     into many sibling-package snapshots — when its DOM changes, those
#     consumer snapshots drift. The narrow stage 4 misses it; full-repo CI
#     catches it post-PR-open. Canary 19 (PR #4926, closed) hit this exact
#     mode: Button's DOM cleanup ('base-' empty class removal + new
#     data-disabled attr) broke 2 Pagination snapshots while stage 4 was
#     green. See ORCHESTRATOR.md §Known integration gaps for the full
#     write-up.
#
#     Detection heuristic: Picasso's convention is that every base component
#     emits a `base-<Name>` className on its root, so consumer snapshots
#     containing the migrating component's DOM contain `base-<COMPONENT_LEAF>`
#     literally. We grep snapshot files for that string and run jest scoped
#     to the matching packages.
#
#     Auto-fix: jest is idempotent for non-snapshot failures, so we attempt
#     `jest -u` once. If a real assertion regression exists, the post--u
#     re-verify still fails; if only snapshots drifted, the re-verify passes
#     and the orchestrator's `git add .` picks up the regenerated `.snap`
#     files in the migration commit.

COMPONENT_LEAF="${COMPONENT##*/}"

# Operator-driven skip — primarily used by Phase 3 validation canaries that
# WANT the consumer-stage to NOT pre-fix downstream snapshot drift, so CI's
# Jest catches it and Phase 3.3's auto-fix-snapshot path gets exercised
# end-to-end. Default unset → run normally.
if [ "${MIGRATION_GATE_CONSUMERS:-run}" = "skip" ]; then
  run_stage_skip "consumers" "MIGRATION_GATE_CONSUMERS=skip"
  CONSUMER_PATHS=""
else
  # Detection has TWO sources, unioned:
  #
  # (1) Snapshot files containing the `base-<Name>` className — Picasso's
  #     convention to mark "this component rendered here". The old, fast
  #     detection. Fails when the snapshot was previously regenerated and
  #     the new render lost the marker (e.g. @base-ui/react's primitive
  #     swap drops the `base-Modal` className in favor of
  #     `data-base-ui-portal`), so prior consumer snaps may be silently
  #     dropped after one migration round.
  #
  # (2) Test files that import `@toptal/picasso-<pkg-name>` directly,
  #     where <pkg-name> is the kebab-cased package name (e.g.
  #     `@toptal/picasso-modal` for Modal). Added 2026-05-18 after Modal
  #     PR #4967: PromptModal's snapshot lost the `base-Modal` marker
  #     after an in-worktree jest -u regenerated it with the new DOM,
  #     so source (1) skipped PromptModal as a consumer — but its test
  #     still imports Modal and would fail in CI. The import-based
  #     detection catches consumers regardless of snap state.
  # Derive the kebab-case package suffix from the component leaf name.
  # Picasso convention: PascalCase component (Modal, PromptModal, Backdrop)
  # → kebab npm name (@toptal/picasso-modal, @toptal/picasso-prompt-modal,
  # @toptal/picasso-backdrop). Read the actual package.json `name` field
  # rather than transforming — handles edge cases (acronyms, numbers)
  # without portable-sed gymnastics across BSD/GNU. Falls back to a
  # lowercase guess if the package.json isn't readable.
  if [ -f "${PKG_PATH}/package.json" ]; then
    PKG_NAME=$(node -e "console.log(require('./${PKG_PATH}/package.json').name)" 2>/dev/null || echo "")
    PKG_NAME_KEBAB="${PKG_NAME#@toptal/picasso-}"
  fi

  if [ -z "${PKG_NAME_KEBAB:-}" ] || [ "$PKG_NAME_KEBAB" = "$PKG_NAME" ]; then
    PKG_NAME_KEBAB=$(echo "$COMPONENT_LEAF" | tr '[:upper:]' '[:lower:]')
  fi

  SNAP_CONSUMER_PATHS=$(git grep -l "base-${COMPONENT_LEAF}" -- 'packages/**/__snapshots__/*.snap' 2>/dev/null \
    | sed 's|/src/.*||' \
    | grep -v "^${PKG_PATH}\$" \
    | sort -u)
  # Source-import detection: walk all .ts/.tsx under packages/ for files
  # that `import` the migrating package, take their containing package
  # directory, and filter to only those packages that have tests (else
  # there's no snapshot to regenerate). Note: PromptModal/test.tsx imports
  # `../PromptModal` (relative) — not `@toptal/picasso-modal` — but
  # PromptModal/PromptModal.tsx imports `@toptal/picasso-modal` directly,
  # and PromptModal's test renders the component that internally renders
  # Modal. So grepping only test files misses this case; we must scan
  # all sources and use "has tests" as the gating signal.
  IMPORT_CONSUMER_PATHS=$(git grep -l "@toptal/picasso-${PKG_NAME_KEBAB}\(['\"]\|/\)" \
      -- 'packages/**/*.ts' 'packages/**/*.tsx' 2>/dev/null \
    | sed 's|/src/.*||' \
    | sort -u \
    | grep -v "^${PKG_PATH}\$" \
    | while read -r pkgdir; do
        if [ -d "${pkgdir}/src" ] && \
           git ls-files "${pkgdir}/src/**/test.tsx" \
                       "${pkgdir}/src/**/*.test.tsx" \
                       "${pkgdir}/src/**/*.spec.tsx" 2>/dev/null | grep -q .; then
          echo "$pkgdir"
        fi
      done)
  CONSUMER_PATHS=$(printf '%s\n%s\n' "$SNAP_CONSUMER_PATHS" "$IMPORT_CONSUMER_PATHS" \
    | grep -v '^$' | sort -u)
fi

if [ -z "$CONSUMER_PATHS" ] && [ "${MIGRATION_GATE_CONSUMERS:-run}" != "skip" ]; then
  run_stage_skip "consumers" "no consumer packages with base-${COMPONENT_LEAF} in snapshots"
elif [ -z "$CONSUMER_PATHS" ]; then
  : # already handled by skip branch above
else
  CONSUMER_PATTERN=$(echo "$CONSUMER_PATHS" | tr '\n' '|' | sed 's/|$//')
  CONSUMER_LOG="$RUN_DIR/consumers.log"
  CONSUMER_COUNT=$(echo "$CONSUMER_PATHS" | wc -l | tr -d ' ')
  CONSUMER_STARTED=$(date +%s)

  echo "→ [consumers] $CONSUMER_COUNT packages match base-${COMPONENT_LEAF}; running scoped jest" \
    | tee -a "$RUN_DIR/console.log"

  if env NODE_OPTIONS='--no-experimental-require-module' \
       pnpm davinci-qa unit --config=./jest.spec.mjs \
       --testPathPattern "($CONSUMER_PATTERN)" \
       >"$CONSUMER_LOG" 2>&1; then
    CONSUMER_STATUS="PASS"
  else
    echo "  failed; attempting one round of jest -u snapshot regeneration" \
      | tee -a "$RUN_DIR/console.log"
    env NODE_OPTIONS='--no-experimental-require-module' \
      pnpm davinci-qa unit --config=./jest.spec.mjs \
      --testPathPattern "($CONSUMER_PATTERN)" -u \
      >>"$CONSUMER_LOG" 2>&1 || true

    # Re-verify. If only snapshots were drifted, this passes; if a real
    # assertion regression exists, this fails (jest -u is a no-op for non-
    # snapshot failures).
    if env NODE_OPTIONS='--no-experimental-require-module' \
         pnpm davinci-qa unit --config=./jest.spec.mjs \
         --testPathPattern "($CONSUMER_PATTERN)" \
         >>"$CONSUMER_LOG" 2>&1; then
      CONSUMER_STATUS="PASS"
      SNAP_REGEN_COUNT=$(git status --short \
        | grep -E '__snapshots__/.+\.snap$' | wc -l | tr -d ' ')
      echo "  snapshots regenerated ($SNAP_REGEN_COUNT files); gate continuing" \
        | tee -a "$RUN_DIR/console.log"
    else
      CONSUMER_STATUS="FAIL"
      echo "  re-verify still failing after jest -u; real regression — see log" \
        | tee -a "$RUN_DIR/console.log"
    fi
  fi

  CONSUMER_ELAPSED=$(( $(date +%s) - CONSUMER_STARTED ))
  STAGES+=("consumers")
  STATUSES+=("$CONSUMER_STATUS")
  DURATIONS+=("$CONSUMER_ELAPSED")
  echo "  $CONSUMER_STATUS (${CONSUMER_ELAPSED}s, log: $CONSUMER_LOG)" \
    | tee -a "$RUN_DIR/console.log"
fi

# HEAD SHA — stable across the Cypress + Happo stages (the orchestrator commits
# before the gate; no commits happen mid-gate). Hoisted here so the Cypress
# stage can key its Happo upload to it via HAPPO_CURRENT_SHA, matching the
# Storybook stage's explicit `happo run "$HEAD_SHA"`. Recomputed identically
# in step 6.
HEAD_SHA="$(git rev-parse HEAD 2>/dev/null || echo)"

# 5. Cypress component spec, only if it exists.
#    When HAPPO_API_KEY + HAPPO_API_SECRET are present, wrap with `happo-e2e`
#    to also produce Cypress visual diffs (matches `test:integration:ci`).
#    Without creds, fall back to plain Cypress.
CY_SPEC="cypress/component/${COMPONENT##*/}.spec.tsx"
if [ -f "$CY_SPEC" ]; then
  if [ -n "${HAPPO_API_KEY:-}" ] && [ -n "${HAPPO_API_SECRET:-}" ]; then
    # Happo-Cypress requires HAPPO_PROJECT pointing at the Cypress project.
    # Default to the Picasso repo's Cypress project per README.md §"Run Happo
    # locally for Cypress". Operator can override via env.
    export HAPPO_PROJECT="${HAPPO_PROJECT:-Picasso/Cypress}"
    # Key the Happo-Cypress upload to HEAD so step 6's Cypress verify can
    # compare base→HEAD for the Picasso/Cypress project (same as Storybook).
    # happo-e2e auto-finalizes on exit 0 — no HAPPO_NONCE (synchronous upload).
    export HAPPO_CURRENT_SHA="$HEAD_SHA"
    run_stage "cypress" \
      pnpm happo-e2e -- pnpm test:setup cypress run --component --spec "$CY_SPEC"
  else
    run_stage "cypress" \
      pnpm test:setup cypress run --component --spec "$CY_SPEC"
  fi
else
  run_stage_skip "cypress" "no spec at $CY_SPEC"
fi

# 6. Happo Storybook + strict diff check (v4 Step 4 / migration plan v4 §6.3).
#
#    Two-phase strategy:
#      a) `pnpm happo --only <name>` runs the Happo CLI to upload screenshots
#         + register the report. Exit code 0 = upload succeeded (does NOT
#         imply zero diffs).
#      b) Strict gate: query Happo's REST API for the report's diff
#         summary. PASS only if `diffsTotal == 0` OR every diff has been
#         designer-accepted (status: 'accepted'). Otherwise FAIL with the
#         report URL in the failure message so the designer can review.
#
#    Skip conditions:
#      - MIGRATION_GATE_HAPPO=skip (operator-driven; used by sandbox runs).
#      - Auto-skip: diff against base branch is config-only (no source
#        files that can affect rendered pixels). Disable with
#        MIGRATION_GATE_HAPPO_AUTOSKIP=0.
#      - HAPPO_API_KEY / HAPPO_API_SECRET unset (creds required by happo CLI).
#    See docs/migration/ORCHESTRATOR.md §Happo setup for env wiring.
#
#    Robustness: the strict-gate sub-step uses curl + jq with conservative
#    parsing. If the Happo API response shape doesn't match the assumed
#    schema (Happo updates their API), the strict check logs a warning
#    and treats happo as PASS (best-effort — better to defer to designer
#    manual review than to hard-fail when our parser is stale). The
#    canonical schema lives at https://docs.happo.io/.
#
# Auto-skip detection: if the migration commit changes only config/docs
# (changesets, package.json, lockfile, tsconfig, *.md), Happo cannot
# produce meaningful diffs. Common cases: peer-dep drops (Note PF-1994
# was package.json + changeset + lockfile only), changeset-only PRs,
# docs updates. Without this, Note migration 2026-05-25 burned ~30 min
# on Happo for a change that physically cannot change pixels.
#
# Scope = HEAD~1..HEAD, not origin/<base>...HEAD. The orchestrator
# commits each iter as a single commit (fresh on iter 1, amended on
# iter 2+ — see orchestrator-core.ts "committed agent edits (fresh)" /
# "amended commit — fresh SHA for Happo"). So HEAD~1 is reliably the
# pre-migration tip and HEAD..HEAD~1 shows exactly the agent's work.
# The PR-level diff (origin/<base>...HEAD) would also include
# orchestrator-branch tooling commits (.gitignore, manifest.json) that
# precede the migration commit; those are operationally irrelevant but
# would suppress the auto-skip if we scoped to them.
#
# Opt-out: MIGRATION_GATE_HAPPO_AUTOSKIP=0 forces Happo to run.
HAPPO_AUTOSKIP_REASON=""
if [ "${MIGRATION_GATE_HAPPO_AUTOSKIP:-1}" = "1" ]; then
  HAPPO_DIFF_FILES="$(git diff --name-only HEAD~1 HEAD 2>/dev/null || echo)"

  if [ -n "$HAPPO_DIFF_FILES" ]; then
    # Files that physically cannot affect rendered Storybook pixels.
    # Anchored alternation:
    #   .changeset/*.md   — changeset notes
    #   package.json       — at any depth
    #   pnpm-lock.yaml     — repo-root lockfile
    #   tsconfig*.json     — TS config at any depth
    #   *.md               — any markdown (READMEs, docs, ADRs)
    HAPPO_NONCONFIG_FILES="$(echo "$HAPPO_DIFF_FILES" \
      | grep -vE '^(\.changeset/[^/]+\.md|([^[:space:]]+/)?package\.json|pnpm-lock\.yaml|([^[:space:]]+/)?tsconfig[^/]*\.json|([^[:space:]]+/)?[^/]+\.md)$' \
      || true)"

    if [ -z "$HAPPO_NONCONFIG_FILES" ]; then
      HAPPO_DIFF_COUNT="$(echo "$HAPPO_DIFF_FILES" | grep -c . || echo 0)"
      HAPPO_AUTOSKIP_REASON="HEAD commit is config-only (${HAPPO_DIFF_COUNT} file(s): changesets/package.json/lockfile/tsconfig/docs) — cannot affect rendered pixels. Override with MIGRATION_GATE_HAPPO_AUTOSKIP=0."
    fi
  fi
fi

if [ "${MIGRATION_GATE_HAPPO:-run}" = "skip" ]; then
  run_stage_skip "happo" "MIGRATION_GATE_HAPPO=skip"
elif [ -n "$HAPPO_AUTOSKIP_REASON" ]; then
  run_stage_skip "happo" "$HAPPO_AUTOSKIP_REASON"
elif [ -z "${HAPPO_API_KEY:-}" ] || [ -z "${HAPPO_API_SECRET:-}" ]; then
  # Part 4 (2026-05-13): Happo is now MANDATORY for migrations. Previously
  # this path skipped silently — that meant Happo failures first surfaced
  # in CI (Backdrop PR #4954, Slider PR #4955) with no opportunity for the
  # agent to iterate locally. Now we hard-fail with explicit setup hints.
  # Bypass: set MIGRATION_GATE_HAPPO=skip explicitly (sandbox/smoke runs).
  {
    echo "❌ [happo] HAPPO_API_KEY / HAPPO_API_SECRET unset — Happo is required for migrations."
    echo "   Setup: see docs/migration/ORCHESTRATOR.md §Happo setup."
    echo "   Quick fix — inline for this run:"
    echo "     HAPPO_API_KEY=... HAPPO_API_SECRET=... pnpm orchestrate --component=<Name> ..."
    echo "   Explicit opt-out (sandbox / smoke only):"
    echo "     MIGRATION_GATE_HAPPO=skip pnpm orchestrate --component=<Name> ..."
  } | tee -a "$RUN_DIR/console.log"
  run_stage_fail "happo" "HAPPO_API_KEY/HAPPO_API_SECRET unset — required for migration. See docs/migration/ORCHESTRATOR.md §Happo setup."
else
  # Local Happo: ENABLED when the operator's HAPPO_API_KEY matches the
  # CI/org account, SKIPPED otherwise.
  #
  # Rationale: compare-results requires both base + head reports on the
  # SAME Happo account. CI uploads to the Picasso org account
  # (HAPPO_ACCOUNT_ID, default 675). Operators using their PERSONAL Happo
  # account (a different ID) can only have HEAD on their account; the
  # base baseline lives on the org account → cross-account compare is
  # impossible.
  #
  # To enable full local verification: swap `.envrc`'s HAPPO_API_KEY +
  # HAPPO_API_SECRET to the CI-level secrets (GitHub Actions → Repo
  # Settings → Secrets and variables → HAPPO_API_KEY / HAPPO_API_SECRET).
  # Then local `happo run` uploads to account 675; compare-results
  # works; full per-iter Happo gating engages.
  #
  # Detection: after `happo run`, parse the `View results at https://
  # happo.io/a/<accountId>/p/<projectId>/report/...` line for the
  # accountId. If it matches HAPPO_ACCOUNT_ID env var → run verifier;
  # otherwise SKIP with a clear hint to swap creds.
  HAPPO_LOG="$RUN_DIR/happo.log"
  HAPPO_STARTED=$(date +%s)
  HEAD_SHA="$(git rev-parse HEAD 2>/dev/null || echo)"
  EXPECTED_ACCOUNT_ID="${HAPPO_ACCOUNT_ID:-}"

  echo "→ [happo] pnpm exec happo run (full Storybook upload, head=$HEAD_SHA)" \
    | tee -a "$RUN_DIR/console.log"
  # Build packages first (Storybook plugin needs them), then `happo run`
  # with explicit subcommand (Picasso's `pnpm happo` script uses bare
  # `happo` which shows help — a long-standing latent bug). Same env
  # vars Picasso's CI happo script uses.
  #
  # 2026-05-24 (post-Slider v2): dropped `--only ${COMPONENT##*/}` filter
  # from the upload. CI uploads the FULL Storybook (no --only); a Slider-
  # filtered baseline vs Slider-filtered head can pass with 0 diffs while
  # CI's full-baseline-vs-full-head sees 7 diffs because the baseline
  # reference frame differs. The filter belongs on the diff verification
  # step (bin/lib/happo-verify.ts:348 already filters the COMPARISON
  # result to the migrating component), NOT on the upload. Cost: ~3-5 min
  # slower per iter (full upload vs filtered). Worth it — without this,
  # local PASS is a false-positive against what CI will see.
  #
  # HAPPO_STORYBOOK_BUILD_COMMAND (2026-05-22): bypass happo-plugin-storybook's
  # default `npx build-storybook` spawn. Default is broken in pnpm workspaces
  # because Corepack intercepts `npx` when package.json declares
  # `"packageManager": "pnpm@..."` and refuses with "This project is
  # configured to use pnpm" (npx exits non-zero before build-storybook can
  # run). Setting this env var to a path that contains `node_modules`
  # makes the plugin use it directly as the binary (see
  # node_modules/happo-plugin-storybook/index.js:92-94), skipping npx +
  # Corepack entirely. Smoking gun: Slider v2 happo.log line "This project
  # is configured to use pnpm ... ✗ Failed to build static storybook package".
  if pnpm build:package >"$HAPPO_LOG" 2>&1 && \
     SCREENSHOT_BREAKPOINTS=true TEST_ENV=visual HAPPO_PROJECT=Picasso/Storybook \
     HAPPO_STORYBOOK_BUILD_COMMAND="./node_modules/.bin/build-storybook" \
     pnpm exec happo run "$HEAD_SHA" >>"$HAPPO_LOG" 2>&1; then
    HAPPO_CLI_OK=1
  else
    HAPPO_CLI_OK=0
  fi

  HAPPO_STATUS="PASS"
  HAPPO_REASON=""

  if [ "$HAPPO_CLI_OK" -ne 1 ]; then
    HAPPO_STATUS="FAIL"
    HAPPO_REASON="happo CLI failed (build or upload error); see $HAPPO_LOG"
  else
    # Extract account ID from the upload output URL.
    REPORT_URL_LINE="$(grep -oE 'https://happo\.io/a/[0-9]+/p/[0-9]+/report/[^ ]+' "$HAPPO_LOG" | tail -1)"
    UPLOAD_ACCOUNT_ID="$(echo "$REPORT_URL_LINE" | sed -nE 's|https://happo.io/a/([0-9]+)/.*|\1|p')"

    echo "  [happo] upload OK; account=$UPLOAD_ACCOUNT_ID expected=$EXPECTED_ACCOUNT_ID report=$REPORT_URL_LINE" \
      | tee -a "$RUN_DIR/console.log"

    if [ -z "$EXPECTED_ACCOUNT_ID" ] || [ -z "$UPLOAD_ACCOUNT_ID" ] || [ "$UPLOAD_ACCOUNT_ID" != "$EXPECTED_ACCOUNT_ID" ]; then
      # 2026-05-24 (post-Slider v2): account mismatch is now a HARD FAIL,
      # not a silent PASS. The previous "deferring to CI" path produced
      # false-positive local PASSes — the gate passed without actually
      # comparing diffs, the agent assumed visuals were clean, and CI
      # caught real regressions hours later. The orchestrator's whole
      # value prop is honest local feedback per iter; soft-skipping on
      # account mismatch breaks that contract.
      HAPPO_STATUS="FAIL"
      HAPPO_REASON="Happo account mismatch — local upload went to account $UPLOAD_ACCOUNT_ID, gate expects account $EXPECTED_ACCOUNT_ID (CI org). Cross-account compare is impossible; gate can't verify diffs."
      {
        echo "❌ [happo] Account mismatch: upload account=$UPLOAD_ACCOUNT_ID, expected=$EXPECTED_ACCOUNT_ID (CI/org account)."
        echo "   Local Happo verification REQUIRES org creds — compare-results needs base + head on the SAME account."
        echo "   To fix:"
        echo "     1. Get CI Happo creds: toptal/picasso → Settings → Secrets → HAPPO_API_KEY + HAPPO_API_SECRET"
        echo "     2. Replace .envrc's HAPPO_API_KEY / HAPPO_API_SECRET with those values"
        echo "     3. direnv allow && re-run orchestrate"
        echo "   Explicit opt-out (skip Happo entirely for non-visual changes):"
        echo "     MIGRATION_GATE_HAPPO=skip pnpm orchestrate --component=<Name> ..."
      } | tee -a "$RUN_DIR/console.log"
    elif [ -z "${HAPPO_BASE_BRANCH:-}" ] || [ -z "${HAPPO_STORYBOOK_PROJECT_ID:-}" ]; then
      HAPPO_STATUS="FAIL"
      HAPPO_REASON="HAPPO_BASE_BRANCH/HAPPO_STORYBOOK_PROJECT_ID not set; cannot run verifier."
      {
        echo "❌ [happo] HAPPO_BASE_BRANCH or HAPPO_STORYBOOK_PROJECT_ID not set."
        echo "   Both are required for the verifier to construct the compare URL."
        echo "   Setup: docs/migration/ORCHESTRATOR.md §Happo setup. Quick fix in .envrc:"
        echo "     export HAPPO_BASE_BRANCH=feature/picasso-modernization-temp  # or your --base-branch"
        echo "     export HAPPO_STORYBOOK_PROJECT_ID=1189"
      } | tee -a "$RUN_DIR/console.log"
    else
      # Account match: run the full verifier. This deterministically
      # queries Happo's compare-results API for the diff count between
      # the base-branch's merge-base SHA and HEAD's SHA, both on the
      # SAME account (since creds match CI's).
      VERIFY_OUT_FILE="$RUN_DIR/happo-verify.json"

      echo "  [happo] running happo-verify.ts (account=$EXPECTED_ACCOUNT_ID project=$HAPPO_STORYBOOK_PROJECT_ID base=$HAPPO_BASE_BRANCH)" \
        | tee -a "$RUN_DIR/console.log"

      GATE_SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
      pnpm exec tsx "$GATE_SCRIPT_DIR/lib/happo-verify.ts" \
        --worktree="$(pwd)" \
        --base-branch="$HAPPO_BASE_BRANCH" \
        --account-id="$EXPECTED_ACCOUNT_ID" \
        --project-id="$HAPPO_STORYBOOK_PROJECT_ID" \
        --project-label="Picasso/Storybook" \
        --component="${COMPONENT##*/}" \
        > "$VERIFY_OUT_FILE" 2>>"$HAPPO_LOG"
      VERIFY_EXIT=$?

      VERIFY_STATUS=$(jq -r '.status // "ERROR"' "$VERIFY_OUT_FILE" 2>/dev/null || echo "ERROR")
      VERIFY_REPORT_URL=$(jq -r '.reportUrl // ""' "$VERIFY_OUT_FILE" 2>/dev/null)
      VERIFY_COMPONENT_DIFFS=$(jq -r '.componentDiffs // 0' "$VERIFY_OUT_FILE" 2>/dev/null)

      echo "  [happo] status=$VERIFY_STATUS componentDiffs=$VERIFY_COMPONENT_DIFFS report=$VERIFY_REPORT_URL" \
        | tee -a "$RUN_DIR/console.log"

      case "$VERIFY_STATUS" in
        PASS|NO_BASELINE)
          HAPPO_STATUS="PASS"
          ;;
        FAIL)
          HAPPO_STATUS="FAIL"
          HAPPO_REASON="$VERIFY_COMPONENT_DIFFS unresolved Happo diff(s) on migrated component ${COMPONENT##*/} — see report $VERIFY_REPORT_URL (verifier output: $VERIFY_OUT_FILE)"
          ;;
        *)
          # ERROR (verifier itself errored — most common cause: Happo
          # propagation delay beyond the 210s retry budget). Policy
          # changed 2026-05-18 (post-Modal-PR-#4967 incident): treat as
          # FAIL instead of advisory-PASS. The previous "advisory PASS"
          # path let the loop push to origin with unverified Happo,
          # turning local gate green into a CI-only regression discovery
          # — exactly the failure mode the local gate is supposed to
          # prevent. By failing the stage, the migrate-loop retries
          # the gate (which re-verifies; if Happo is now indexed it
          # PASSes), and only pushes when Happo is actually verified.
          # The orchestrator's stuck-detection still treats consecutive
          # `happo:ERROR` keys as transient (see readHappoFailureKey)
          # so we don't burn iterations on indexing delays — we just
          # don't pretend the gate passed when it didn't.
          HAPPO_STATUS="FAIL"
          HAPPO_REASON="Happo verifier ERROR — could not confirm zero diffs on migrated component. Most likely Happo indexing delay beyond retry budget; retry gate or increase HAPPO_VERIFY_BUDGET. Verifier output: $VERIFY_OUT_FILE"
          echo "  [happo] verifier ERROR — failing stage (was advisory before 2026-05-18)" \
            | tee -a "$RUN_DIR/console.log"
          ;;
      esac

      # ---- Cypress-Happo verify (advisory by default, 2026-06-09) --------
      # Step 5 uploaded a Picasso/Cypress report for HEAD via happo-e2e's
      # auto-finalize. Verify it the SAME way as Storybook, reusing the
      # project-agnostic happo-verify.ts against the Cypress project
      # (HAPPO_CYPRESS_PROJECT_ID, default 848). Writes a sibling
      # happo-verify-cypress.json the orchestrator reads to re-fetch Cypress
      # diff PNGs for the agent and to fold into the stuck-key.
      #
      # ADVISORY by default: a Cypress diff is logged + surfaced but does NOT
      # fail the gate (Cypress specs compose multiple components and compare
      # against master, so they're noisier than Storybook — see
      # docs/migration/ORCHESTRATOR.md §"Cypress visual verification"). Set
      # MIGRATION_GATE_HAPPO_CYPRESS_STRICT=1 for full Storybook parity, or
      # MIGRATION_GATE_HAPPO_CYPRESS=skip to disable.
      if [ "${MIGRATION_GATE_HAPPO_CYPRESS:-run}" != "skip" ] &&
         [ -f "$CY_SPEC" ] &&
         [ -n "${HAPPO_CYPRESS_PROJECT_ID:-}" ]; then
        CY_VERIFY_OUT_FILE="$RUN_DIR/happo-verify-cypress.json"

        echo "  [happo-cypress] running happo-verify.ts (account=$EXPECTED_ACCOUNT_ID project=$HAPPO_CYPRESS_PROJECT_ID base=$HAPPO_BASE_BRANCH)" \
          | tee -a "$RUN_DIR/console.log"

        pnpm exec tsx "$GATE_SCRIPT_DIR/lib/happo-verify.ts" \
          --worktree="$(pwd)" \
          --base-branch="$HAPPO_BASE_BRANCH" \
          --account-id="$EXPECTED_ACCOUNT_ID" \
          --project-id="$HAPPO_CYPRESS_PROJECT_ID" \
          --project-label="Picasso/Cypress" \
          --component="${COMPONENT##*/}" \
          >"$CY_VERIFY_OUT_FILE" 2>>"$HAPPO_LOG"

        CY_VERIFY_STATUS=$(jq -r '.status // "ERROR"' "$CY_VERIFY_OUT_FILE" 2>/dev/null || echo "ERROR")
        CY_VERIFY_REPORT_URL=$(jq -r '.reportUrl // ""' "$CY_VERIFY_OUT_FILE" 2>/dev/null)
        CY_VERIFY_COMPONENT_DIFFS=$(jq -r '.componentDiffs // 0' "$CY_VERIFY_OUT_FILE" 2>/dev/null)

        echo "  [happo-cypress] status=$CY_VERIFY_STATUS componentDiffs=$CY_VERIFY_COMPONENT_DIFFS report=$CY_VERIFY_REPORT_URL" \
          | tee -a "$RUN_DIR/console.log"

        if [ "${MIGRATION_GATE_HAPPO_CYPRESS_STRICT:-0}" = "1" ]; then
          # Strict: Cypress diffs/errors gate exactly like Storybook.
          case "$CY_VERIFY_STATUS" in
            PASS|NO_BASELINE) ;;
            FAIL)
              HAPPO_STATUS="FAIL"
              HAPPO_REASON="${HAPPO_REASON:+$HAPPO_REASON; }$CY_VERIFY_COMPONENT_DIFFS unresolved Cypress-Happo diff(s) on ${COMPONENT##*/} (strict) — see $CY_VERIFY_REPORT_URL"
              ;;
            *)
              HAPPO_STATUS="FAIL"
              HAPPO_REASON="${HAPPO_REASON:+$HAPPO_REASON; }Cypress-Happo verifier ERROR (strict) — see $CY_VERIFY_OUT_FILE"
              ;;
          esac
        elif [ "$CY_VERIFY_STATUS" = "FAIL" ]; then
          # Advisory: surface but never gate. The orchestrator still re-fetches
          # the Cypress diff PNGs for the agent from happo-verify-cypress.json.
          echo "  [happo-cypress] ADVISORY: $CY_VERIFY_COMPONENT_DIFFS Cypress diff(s) on ${COMPONENT##*/} — NOT gating (set MIGRATION_GATE_HAPPO_CYPRESS_STRICT=1 to gate). Report: $CY_VERIFY_REPORT_URL" \
            | tee -a "$RUN_DIR/console.log"
        fi
      fi
      # -------------------------------------------------------------------
    fi
  fi

  HAPPO_ELAPSED=$(( $(date +%s) - HAPPO_STARTED ))
  STAGES+=("happo")
  STATUSES+=("$HAPPO_STATUS")
  DURATIONS+=("$HAPPO_ELAPSED")
  if [ -n "$HAPPO_REASON" ]; then
    echo "  $HAPPO_STATUS (${HAPPO_ELAPSED}s): $HAPPO_REASON" \
      | tee -a "$RUN_DIR/console.log"
    echo "" >>"$HAPPO_LOG"
    echo "[gate] $HAPPO_REASON" >>"$HAPPO_LOG"
  else
    echo "  $HAPPO_STATUS (${HAPPO_ELAPSED}s)" | tee -a "$RUN_DIR/console.log"
  fi
fi

# 7. React 19 smoke — stub until PF-1994 wires the real smoke.
#    See docs/migration/migration-plan.md §6.2.
#    Detect by reading package.json directly — `pnpm run` (no args) output
#    format differs from yarn 1's so a grep against the listing isn't portable.
if grep -q '"test:react19"' package.json 2>/dev/null; then
  run_stage "react19" \
    pnpm test:react19 --only "${COMPONENT##*/}"
else
  run_stage_skip "react19" "no test:react19 script (pending PF-1994)"
fi

# ---------- report ---------------------------------------------------------
#
# Two parallel formats. Tier 2.2 (structured JSON gate report).
#   - report.md  — human-readable; surfaces failed-log tails for review.
#   - report.json — machine-readable; orchestrator + classifier consume
#                   this directly instead of regex-parsing the markdown.
#                   Schema mirrors `GateReport` in bin/lib/workflow.ts.
#
# Stable JSON is more important than pretty markdown for downstream
# automation (CI poll-loop, lessons extraction, future telemetry). The
# orchestrator prefers report.json when present; falls back to report.md
# parsing for backward-compat with worktrees that still have the old
# gate.sh.

REPORT="$RUN_DIR/report.md"
JSON_REPORT="$RUN_DIR/report.json"
EXIT=0

# Determine composite first (loops below depend on it).
for i in "${!STAGES[@]}"; do
  if [ "${STATUSES[$i]}" = "FAIL" ]; then EXIT=1; fi
done

# --- markdown ---
{
  echo "# $COMPONENT — gate report"
  echo
  echo "**Package:** \`$PKG_PATH\`"
  echo "**Workspace:** \`$WORKSPACE_NAME\`"
  echo "**Run:** $DATE"
  echo
  echo "## Stages"
  echo
  echo "| Stage | Status | Duration | Log |"
  echo "|---|---|---|---|"
  for i in "${!STAGES[@]}"; do
    echo "| ${STAGES[$i]} | ${STATUSES[$i]} | ${DURATIONS[$i]}s | \`$RUN_DIR/${STAGES[$i]}.log\` |"
  done
  echo
  if [ $EXIT -eq 0 ]; then
    echo "**Composite:** PASS"
  else
    echo "**Composite:** FAIL"
    echo
    echo "Failed stages — see logs:"
    for i in "${!STAGES[@]}"; do
      if [ "${STATUSES[$i]}" = "FAIL" ]; then
        echo "- \`${STAGES[$i]}\` → \`$RUN_DIR/${STAGES[$i]}.log\` (last 30 lines:)"
        # Per-stage doc pointers (2026-05-21): tell the agent which canonical
        # doc resolves THIS failure class. Keeps it from re-discovering rules
        # already in the contextPack.
        case "${STAGES[$i]}" in
          lint)
            echo "  *Likely doc:* \`docs/migration/references/code-standards.md\` (ESLint custom rules, naming, JSDoc, casts) + \`PICASSO_COMPONENT_DESIGN_PATTERNS.md\` (canonical API rules)."
            ;;
          build)
            echo "  *Likely doc:* \`docs/migration/rules/package-and-build.md\` (pnpm rules, lockfile diff caps, build-before-snapshot)."
            ;;
          jest)
            echo "  *Likely doc:* \`docs/migration/references/practices.md\` §\"Build & snapshot precondition\" + §\"Test conventions\". If snapshots regressed, rerun \`pnpm -F <package> build:package\` BEFORE \`jest -u\` — see \`docs/migration/rules/package-and-build.md\` §\"Build-before-snapshot precondition\"."
            ;;
          tsc)
            echo "  *Likely doc:* \`docs/migration/rules/api-preservation.md\` (cast at the boundary) + \`docs/migration/references/code-standards.md\` §\"Type-narrowing & casting\"."
            ;;
          happo)
            echo "  *Likely doc:* \`docs/migration/references/happo-iteration.md\` (classification matrix, computed-style-diff requirement) + \`docs/migration/references/visual-verification.md\` (Playwright workflow, worked compensation examples)."
            ;;
          changeset)
            echo "  *Likely doc:* \`docs/migration/PROMPT-light.md\` / \`PROMPT-heavy.md\` §7 (Changeset) + \`docs/migration/references/practices.md\` §\"Changesets\"."
            ;;
          doctrine)
            echo "  *Likely doc:* \`docs/migration/rules/styling.md\` §\"@base-ui/react v1 prescriptions\" + \`docs/migration/references/base-ui-styling.md\` §7.1 (override-preference ladder, especially rung -1)."
            ;;
        esac
        echo
        echo '  ```'
        tail -n 30 "$RUN_DIR/${STAGES[$i]}.log" 2>/dev/null | sed 's/^/  /'
        echo '  ```'
        echo
      fi
    done
  fi
} >"$REPORT"

# --- JSON ---
# Hand-rolled to avoid a jq dependency. All values controlled inputs; no
# user content goes into the JSON keys. Stage names + log paths are
# orchestrator-controlled.
composite_str="PASS"
[ $EXIT -ne 0 ] && composite_str="FAIL"

{
  echo "{"
  echo "  \"component\": \"$COMPONENT\","
  echo "  \"package\": \"$PKG_PATH\","
  echo "  \"workspace\": \"$WORKSPACE_NAME\","
  echo "  \"runDate\": \"$DATE\","
  echo "  \"composite\": \"$composite_str\","
  echo "  \"stages\": ["
  last_idx=$(( ${#STAGES[@]} - 1 ))
  for i in "${!STAGES[@]}"; do
    sep=","
    [ "$i" -eq "$last_idx" ] && sep=""
    echo "    {"
    echo "      \"name\": \"${STAGES[$i]}\","
    echo "      \"status\": \"${STATUSES[$i]}\","
    echo "      \"durationSeconds\": ${DURATIONS[$i]},"
    echo "      \"logPath\": \"$RUN_DIR/${STAGES[$i]}.log\""
    echo "    }$sep"
  done
  echo "  ],"
  echo "  \"reportPath\": \"$REPORT\""
  echo "}"
} >"$JSON_REPORT"

echo
echo "Report (md):   $REPORT"
echo "Report (json): $JSON_REPORT"
exit $EXIT
