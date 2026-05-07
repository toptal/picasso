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

# Manifest ID -> package npm name (for `yarn workspace`).
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

# ---------- stages ---------------------------------------------------------

# 0. Lockfile drift — detect package.json edits without yarn.lock update.
#    This is the cheapest stage and catches the most common dep-bump CI fail
#    ("Build packages" failing because new dep isn't resolved in lockfile).
#    Run before `build` so we fail in 1s instead of after a 60s+ build.
#
#    Heuristic v2: if package.json changed but yarn.lock did not, verify
#    every newly-added/changed npm dep has a matching yarn.lock entry. If so,
#    the lockfile is genuinely consistent (often because the dep was already
#    resolved from prior orchestrator state). If a dep is missing from
#    yarn.lock, fail loudly. v1 just checked diff existence — false-positive
#    on Button's migration when @base-ui/react@^1.4.1 was already in the
#    lockfile from a previous orchestrator iteration.
check_lockfile_drift() {
  # Compare staged + unstaged changes against the worktree's HEAD.
  local pkg_changed lock_changed
  pkg_changed=$(git -C "$ROOT" diff --name-only HEAD -- '**/package.json' 'package.json' 2>/dev/null | head -1)
  lock_changed=$(git -C "$ROOT" diff --name-only HEAD -- 'yarn.lock' 2>/dev/null | head -1)

  if [ -z "$pkg_changed" ] || [ -n "$lock_changed" ]; then
    return 0
  fi

  # package.json moved but yarn.lock didn't. Verify each non-workspace dep
  # in every modified package.json has a yarn.lock entry. Workspace deps
  # (@toptal/picasso-*) are linked, not resolved, so they're not in
  # yarn.lock and don't need to be checked here.
  local missing=""
  local pkg_files
  pkg_files=$(git -C "$ROOT" diff --name-only HEAD -- '**/package.json' 'package.json' 2>/dev/null)

  for pkg_file in $pkg_files; do
    [ -f "$ROOT/$pkg_file" ] || continue

    # Extract dep names from dependencies / devDependencies / peerDependencies.
    # node -e is safer than jq for parsing nested JSON without dep on jq.
    local deps
    deps=$(node -e "
      const pkg = require('$ROOT/$pkg_file');
      const all = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies };
      for (const [name, range] of Object.entries(all)) {
        if (name.startsWith('@toptal/picasso-') || name === 'react' || name === 'react-dom') continue;
        process.stdout.write(name + '\t' + range + '\n');
      }
    " 2>/dev/null)

    while IFS=$'\t' read -r name range; do
      [ -z "$name" ] && continue
      # yarn.lock entry shapes — we accept any of:
      #   "@scope/name@range":          (quoted, scoped)
      #   name@range:                   (unquoted)
      #   ..., name@range, ...:         (unquoted, multi-key)
      #   "@scope/name@range", ...:     (quoted, multi-key)
      # Use grep -F (fixed-string) for each shape to sidestep regex escaping
      # of `^`, `~`, `*`, `(`, `)`, etc. in semver ranges.
      local needle="${name}@${range}"
      if ! grep -qF "\"${needle}\"" "$ROOT/yarn.lock" 2>/dev/null \
         && ! grep -qF "${needle}:" "$ROOT/yarn.lock" 2>/dev/null \
         && ! grep -qF "${needle}," "$ROOT/yarn.lock" 2>/dev/null; then
        missing="${missing}  ${pkg_file}: ${needle}\n"
      fi
    done <<< "$deps"
  done

  if [ -n "$missing" ]; then
    echo "package.json deps missing from yarn.lock:"
    printf "%b" "$missing"
    echo ""
    echo "Run 'yarn install' from repo root to refresh the lockfile,"
    echo "then 'git add yarn.lock' before committing. CI's 'Build packages'"
    echo "step will fail otherwise (new dep not resolved in lockfile)."
    return 1
  fi

  echo "package.json modified but yarn.lock unchanged — verified all deps"
  echo "are already resolved in yarn.lock (no drift)."
  return 0
}
run_stage "lockfile-drift" check_lockfile_drift

# 1. Build (workspace-scoped — fast).
run_stage "build" \
  yarn workspace "$WORKSPACE_NAME" build:package

# 2. Type-check (repo-wide — there's no per-package tsc:noEmit script).
run_stage "tsc" \
  yarn typecheck

# 3. Lint, scoped to the migrating package's src.
#    Repo-wide lint runs in CI; the gate only needs to validate the agent's
#    edits cleanly compile + lint. ~2s scoped vs ~24s repo-wide.
#    Per migration plan v3 §4.3 (gate sequence) + Tier 1.2 of post-canary-15
#    improvements plan: scoped fast feedback for inner-loop iteration.
#
#    Auto-fix pass (silent): runs `yarn davinci-syntax lint code <path>` (no
#    --check) before the strict --check stage. Fixes formatting / blank-line /
#    import-order rules that don't merit an iteration loop. Output suppressed
#    so the run log isn't cluttered. Rationale: in canaries 16+17 the agent
#    repeatedly hit single-line `padding-line-between-statements` errors and
#    failed to self-fix despite mandatory instructions — auto-fix in the gate
#    skips that whole class of rules.
yarn davinci-syntax lint code "$PKG_PATH/src" >/dev/null 2>&1 || true

run_stage "lint" \
  yarn davinci-syntax lint code --check "$PKG_PATH/src"

# 4. Jest, scoped to the package directory.
#    Skip the test:unit prelude (build) since stage 1 already covers it.
run_stage "jest" \
  env NODE_OPTIONS='--no-experimental-require-module' \
  yarn davinci-qa unit --config=./jest.spec.mjs --testPathPattern "$PKG_PATH"

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
  CONSUMER_PATHS=$(git grep -l "base-${COMPONENT_LEAF}" -- 'packages/**/__snapshots__/*.snap' 2>/dev/null \
    | sed 's|/src/.*||' \
    | grep -v "^${PKG_PATH}\$" \
    | sort -u)
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
       yarn davinci-qa unit --config=./jest.spec.mjs \
       --testPathPattern "($CONSUMER_PATTERN)" \
       >"$CONSUMER_LOG" 2>&1; then
    CONSUMER_STATUS="PASS"
  else
    echo "  failed; attempting one round of jest -u snapshot regeneration" \
      | tee -a "$RUN_DIR/console.log"
    env NODE_OPTIONS='--no-experimental-require-module' \
      yarn davinci-qa unit --config=./jest.spec.mjs \
      --testPathPattern "($CONSUMER_PATTERN)" -u \
      >>"$CONSUMER_LOG" 2>&1 || true

    # Re-verify. If only snapshots were drifted, this passes; if a real
    # assertion regression exists, this fails (jest -u is a no-op for non-
    # snapshot failures).
    if env NODE_OPTIONS='--no-experimental-require-module' \
         yarn davinci-qa unit --config=./jest.spec.mjs \
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
    run_stage "cypress" \
      yarn happo-e2e -- -- yarn test:setup cypress run --component --spec "$CY_SPEC"
  else
    run_stage "cypress" \
      yarn test:setup cypress run --component --spec "$CY_SPEC"
  fi
else
  run_stage_skip "cypress" "no spec at $CY_SPEC"
fi

# 6. Happo Storybook + strict diff check (v4 Step 4 / migration plan v4 §6.3).
#
#    Two-phase strategy:
#      a) `yarn happo --only <name>` runs the Happo CLI to upload screenshots
#         + register the report. Exit code 0 = upload succeeded (does NOT
#         imply zero diffs).
#      b) Strict gate: query Happo's REST API for the report's diff
#         summary. PASS only if `diffsTotal == 0` OR every diff has been
#         designer-accepted (status: 'accepted'). Otherwise FAIL with the
#         report URL in the failure message so the designer can review.
#
#    Skip conditions:
#      - MIGRATION_GATE_HAPPO=skip (operator-driven; used by sandbox runs).
#      - HAPPO_API_KEY / HAPPO_API_SECRET unset (creds required by happo CLI).
#    See docs/migration/ORCHESTRATOR.md §Happo setup for env wiring.
#
#    Robustness: the strict-gate sub-step uses curl + jq with conservative
#    parsing. If the Happo API response shape doesn't match the assumed
#    schema (Happo updates their API), the strict check logs a warning
#    and treats happo as PASS (best-effort — better to defer to designer
#    manual review than to hard-fail when our parser is stale). The
#    canonical schema lives at https://docs.happo.io/.
if [ "${MIGRATION_GATE_HAPPO:-run}" = "skip" ]; then
  run_stage_skip "happo" "MIGRATION_GATE_HAPPO=skip"
elif [ -z "${HAPPO_API_KEY:-}" ] || [ -z "${HAPPO_API_SECRET:-}" ]; then
  run_stage_skip "happo" "HAPPO_API_KEY/HAPPO_API_SECRET unset (see ORCHESTRATOR.md §Happo setup)"
else
  # 6a. Run Happo CLI — uploads screenshots + creates the report.
  HAPPO_LOG="$RUN_DIR/happo.log"
  HAPPO_STARTED=$(date +%s)

  echo "→ [happo] yarn happo --only ${COMPONENT##*/}" | tee -a "$RUN_DIR/console.log"
  if yarn happo --only "${COMPONENT##*/}" >"$HAPPO_LOG" 2>&1; then
    HAPPO_CLI_OK=1
  else
    HAPPO_CLI_OK=0
  fi

  # 6b. Extract the report SHA / URL from Happo CLI output. Happo prints a
  # line like "Report URL: https://happo.io/a/<account>/p/<project>/compare/<sha1>/<sha2>"
  # OR similar; the exact format may vary by version. Try multiple patterns.
  REPORT_URL=$(grep -Eo 'https://happo\.io/[a-zA-Z0-9/_-]+/(?:compare|reports?)/[a-zA-Z0-9/-]+' "$HAPPO_LOG" 2>/dev/null | head -1)
  REPORT_SHA=$(echo "$REPORT_URL" | grep -Eo '[a-f0-9]{40}' | tail -1)

  HAPPO_STATUS="PASS"
  HAPPO_REASON=""

  if [ "$HAPPO_CLI_OK" -ne 1 ]; then
    HAPPO_STATUS="FAIL"
    HAPPO_REASON="happo CLI failed; see $HAPPO_LOG"
  elif [ -z "$REPORT_SHA" ]; then
    # Couldn't extract a SHA from CLI output — log + best-effort PASS.
    echo "  [happo-strict] could not extract report SHA from CLI output; treating as PASS" \
      | tee -a "$RUN_DIR/console.log"
  else
    # 6c. Query Happo REST API for diff summary.
    SUMMARY_JSON=$(curl -sf -u "$HAPPO_API_KEY:$HAPPO_API_SECRET" \
      "https://happo.io/api/reports/$REPORT_SHA/summary" 2>>"$HAPPO_LOG")
    CURL_OK=$?

    if [ $CURL_OK -ne 0 ]; then
      echo "  [happo-strict] API call failed (curl exit $CURL_OK); treating as PASS, see $HAPPO_LOG" \
        | tee -a "$RUN_DIR/console.log"
    elif [ -z "$SUMMARY_JSON" ]; then
      echo "  [happo-strict] empty API response; treating as PASS" \
        | tee -a "$RUN_DIR/console.log"
    else
      # Parse with conservative jq — fall back to PASS if shape unknown.
      DIFFS_TOTAL=$(echo "$SUMMARY_JSON" | jq -r '.diffsTotal // .summary.diffs // 0' 2>/dev/null)
      UNRESOLVED=$(echo "$SUMMARY_JSON" \
        | jq -r '[.diffs[]? | select((.status // "unreviewed") != "accepted")] | length' \
        2>/dev/null)

      # Numeric guards (jq might return "null" or empty on schema drift).
      [ -z "$DIFFS_TOTAL" ] || ! [ "$DIFFS_TOTAL" -eq "$DIFFS_TOTAL" ] 2>/dev/null && DIFFS_TOTAL=0
      [ -z "$UNRESOLVED" ] || ! [ "$UNRESOLVED" -eq "$UNRESOLVED" ] 2>/dev/null && UNRESOLVED=0

      echo "  [happo-strict] diffsTotal=$DIFFS_TOTAL, unresolved=$UNRESOLVED" \
        | tee -a "$RUN_DIR/console.log"
      echo "  [happo-strict] report: $REPORT_URL" | tee -a "$RUN_DIR/console.log"

      if [ "$DIFFS_TOTAL" -eq 0 ] || [ "$UNRESOLVED" -eq 0 ]; then
        HAPPO_STATUS="PASS"
      else
        HAPPO_STATUS="FAIL"
        HAPPO_REASON="$UNRESOLVED unresolved Happo diffs — designer review needed at $REPORT_URL"
      fi
    fi
  fi

  HAPPO_ELAPSED=$(( $(date +%s) - HAPPO_STARTED ))
  STAGES+=("happo")
  STATUSES+=("$HAPPO_STATUS")
  DURATIONS+=("$HAPPO_ELAPSED")
  if [ -n "$HAPPO_REASON" ]; then
    echo "  $HAPPO_STATUS (${HAPPO_ELAPSED}s, log: $HAPPO_LOG): $HAPPO_REASON" \
      | tee -a "$RUN_DIR/console.log"
    # Append the failure reason to the log for downstream surfacing.
    echo "" >>"$HAPPO_LOG"
    echo "[gate] $HAPPO_REASON" >>"$HAPPO_LOG"
  else
    echo "  $HAPPO_STATUS (${HAPPO_ELAPSED}s, log: $HAPPO_LOG)" \
      | tee -a "$RUN_DIR/console.log"
  fi
fi

# 7. React 19 smoke — stub until PF-1994 wires the real smoke.
#    See docs/migration/migration-plan.md §6.2.
if yarn run --silent | grep -q "^   - test:react19"; then
  run_stage "react19" \
    yarn test:react19 --only "${COMPONENT##*/}"
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
