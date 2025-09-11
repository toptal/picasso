#!/bin/bash

# Override files with custom versions
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🔧 Overriding files with custom versions..."

# Define file mappings as arrays
TARGET_FILES=(
    "$PROJECT_ROOT/node_modules/@toptal/davinci-engine/src/utils/publish-packages/publish-monorepo-packages.js"
    #"$PROJECT_ROOT/node_modules/@toptal/davinci-cli-shared/src/utils/run.js"
    #"$PROJECT_ROOT/node_modules/libnpmpublish/lib/publish.js"
    #"$PROJECT_ROOT/node_modules/@nx/js/src/executors/release-publish/release-publish.impl.js"
    #"$PROJECT_ROOT/node_modules/nx/src/utils/package-manager.js"
)

SOURCE_FILES=(
    "$SCRIPT_DIR/overrides/publish-monorepo-packages.js"
    #"$SCRIPT_DIR/overrides/run.js"
    #"$SCRIPT_DIR/overrides/publish.js"
    #"$SCRIPT_DIR/overrides/release-publish.impl.js"
    #"$SCRIPT_DIR/overrides/package-manager.js"
)

# Track success/failure
OVERRIDE_COUNT=${#TARGET_FILES[@]}

# Process each file mapping
for i in "${!TARGET_FILES[@]}"; do
    TARGET_FILE="${TARGET_FILES[$i]}"
    SOURCE_FILE="${SOURCE_FILES[$i]}"
    FILE_NUM=$((i + 1))
    
    echo ""
    echo "📁 Processing file $FILE_NUM/$OVERRIDE_COUNT: $(basename "$TARGET_FILE")"
    
    # Check if target file exists
    if [ ! -f "$TARGET_FILE" ]; then
        echo "❌ Target file not found: $TARGET_FILE"
        echo "   Make sure the corresponding package is installed"
        continue
    fi
    
    # Check if source file exists
    if [ ! -f "$SOURCE_FILE" ]; then
        echo "❌ Source file not found: $SOURCE_FILE"
        continue
    fi
    
    # Replace the file
    echo "🔄 Replacing with custom version..."
    cp "$SOURCE_FILE" "$TARGET_FILE"
done

echo "Done overriding"
