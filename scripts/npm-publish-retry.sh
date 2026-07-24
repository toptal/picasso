#!/usr/bin/env bash
# Retry `changeset publish` to survive npm's ~429 rate limit on large releases.
# changeset publish is resumable: versions already on the registry are skipped,
# so each retry only publishes what remains.
set -uo pipefail
max_attempts="${PUBLISH_MAX_ATTEMPTS:-5}"
delay="${PUBLISH_RETRY_DELAY:-60}"   # seconds, doubled after each failure
attempt=1
while true; do
  pnpm exec changeset publish && exit 0
  code=$?
  if [ "$attempt" -ge "$max_attempts" ]; then
    echo "changeset publish failed after ${attempt} attempts (exit ${code})" >&2
    exit "$code"
  fi
  echo "Attempt ${attempt} failed (exit ${code}); retrying in ${delay}s — already-published packages are skipped." >&2
  sleep "${delay}"; attempt=$((attempt + 1)); delay=$((delay * 2))
done
