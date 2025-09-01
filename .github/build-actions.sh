#!/usr/bin/env bash

set -euo pipefail

ACTIONS_DIR=".github/actions"

if ! command -v yarn >/dev/null 2>&1; then
  echo "yarn is required but not found in PATH" >&2
  exit 1
fi

find "$ACTIONS_DIR" -mindepth 2 -maxdepth 2 -type f -name index.js | while read -r entry; do
  action_root="$(dirname "$entry")"
  out_dir="$action_root/dist"
  echo "Building Node action at $action_root"
  rm -rf "$out_dir"
  yarn ncc build "$entry" -o "$out_dir"
  git add "$out_dir"
done


