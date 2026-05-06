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
run_stage "lint" \
  yarn davinci-syntax lint code --check "$PKG_PATH/src"

# 4. Jest, scoped to the package directory.
#    Skip the test:unit prelude (build) since stage 1 already covers it.
run_stage "jest" \
  env NODE_OPTIONS='--no-experimental-require-module' \
  yarn davinci-qa unit --config=./jest.spec.mjs --testPathPattern "$PKG_PATH"

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

# 6. Happo Storybook. Best-effort per-component filter via --only.
#    Skip conditions:
#      - MIGRATION_GATE_HAPPO=skip (operator-driven; used by sandbox runs).
#      - HAPPO_API_KEY / HAPPO_API_SECRET unset (creds required by happo CLI).
#    See docs/migration/ORCHESTRATOR.md §Happo setup for env wiring.
if [ "${MIGRATION_GATE_HAPPO:-run}" = "skip" ]; then
  run_stage_skip "happo" "MIGRATION_GATE_HAPPO=skip"
elif [ -z "${HAPPO_API_KEY:-}" ] || [ -z "${HAPPO_API_SECRET:-}" ]; then
  run_stage_skip "happo" "HAPPO_API_KEY/HAPPO_API_SECRET unset (see ORCHESTRATOR.md §Happo setup)"
else
  # Storybook project is the Picasso default per `yarn happo` script wrapper.
  run_stage "happo" \
    yarn happo --only "${COMPONENT##*/}"
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

REPORT="$RUN_DIR/report.md"
EXIT=0
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
    local_status="${STATUSES[$i]}"
    if [ "$local_status" = "FAIL" ]; then EXIT=1; fi
    echo "| ${STAGES[$i]} | $local_status | ${DURATIONS[$i]}s | \`$RUN_DIR/${STAGES[$i]}.log\` |"
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

echo
echo "Report: $REPORT"
exit $EXIT
