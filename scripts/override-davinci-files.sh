#!/bin/bash

# This is a temporary script to override files with custom versions, patch-package is not working properly
# Override files with custom versions
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🔧 Overriding files with custom versions..."

# Define file mappings as arrays
TARGET_FILES=(
    "$PROJECT_ROOT/node_modules/@toptal/davinci-engine/src/utils/publish-packages/publish-monorepo-packages.js"
)

SOURCE_FILES=(
    "$SCRIPT_DIR/overrides/publish-monorepo-packages.js"
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
