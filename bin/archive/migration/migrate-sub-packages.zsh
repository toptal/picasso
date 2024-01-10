#! /usr/bin/env zsh

set -exu -o pipefail

migrate() (
  local target="$1"

  cd "$target"

  if [ -f tsconfig.build.json ]; then
    rm tsconfig.build.json
  fi

  npm pkg set \
    type=module \
    main=./dist/src/index.js \
    module=./dist/src/index.js \
    'exports[.]=./dist/src/index.js' \
    scripts.build="tsc -b tsconfig.json" \
    scripts.prepare="yarn build" > /dev/null

  npm pkg delete \
    'scripts[build:package]' \
    scripts.prepublishOnly \
    scripts.prepublishOnly \
    publishConfig.directory > /dev/null

  tsconfig='{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}'
  cat <<< "$tsconfig" > tsconfig.json

  printf "%s\n" "$(realpath package.json)"
)

migrate_all() {
  local dir="$1"

  local pkgs_json=()

  for pkg in "$dir"/*/; do
    if [ -f "$pkg/tsconfig.json" ]; then
      continue
    fi

    pkgJson+=("$(migrate "$pkg")")
  done

  npx -y sort-package-json "${pkgs_json[@]}"
}

migrate_all packages
