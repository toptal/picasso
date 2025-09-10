#!/bin/bash

# Override davinci files with custom versions
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

echo "🔧 Overriding davinci files with custom versions..."

# Define file mappings as arrays
TARGET_FILES=(
    "$PROJECT_ROOT/node_modules/@toptal/davinci-engine/src/utils/publish-packages/publish-monorepo-packages.js"
    "$PROJECT_ROOT/node_modules/@toptal/davinci-cli-shared/src/utils/run.js"
)

SOURCE_FILES=(
    "$SCRIPT_DIR/overrides/publish-monorepo-packages.js"
    "$SCRIPT_DIR/overrides/run.js"
)

# Track success/failure
OVERRIDE_COUNT=${#TARGET_FILES[@]}
SUCCESS_COUNT=0

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
    
    # Create backup of original file (only if backup doesn't exist)
    BACKUP_FILE="${TARGET_FILE}.original"
    if [ ! -f "$BACKUP_FILE" ]; then
        echo "📦 Creating backup of original file..."
        cp "$TARGET_FILE" "$BACKUP_FILE"
    fi
    
    # Replace the file
    echo "🔄 Replacing with custom version..."
    cp "$SOURCE_FILE" "$TARGET_FILE"
    
    # Verify the replacement based on file type
    VERIFICATION_PASSED=false
    
    if [[ "$TARGET_FILE" == *"publish-monorepo-packages.js" ]]; then
        if grep -q "all: true" "$TARGET_FILE" && grep -q -- "--concurrency 1" "$TARGET_FILE"; then
            VERIFICATION_PASSED=true
        fi
    elif [[ "$TARGET_FILE" == *"run.js" ]]; then
        if grep -q "@@@ davinci-cli-shared runSync called with:" "$TARGET_FILE"; then
            VERIFICATION_PASSED=true
        fi
    fi
    
    if [ "$VERIFICATION_PASSED" = true ]; then
        echo "✅ Successfully replaced $(basename "$TARGET_FILE")!"
        SUCCESS_COUNT=$((SUCCESS_COUNT + 1))
    else
        echo "❌ File replacement may have failed - custom modifications not found in $(basename "$TARGET_FILE")"
    fi
done

echo ""
echo "🎯 Override Summary: $SUCCESS_COUNT/$OVERRIDE_COUNT files successfully overridden"

if [ "$SUCCESS_COUNT" -eq "$OVERRIDE_COUNT" ]; then
    echo "✅ All davinci file overrides completed successfully!"
    echo "   - Enhanced logging and error handling enabled"
    echo "   - Memory optimization (--concurrency 1) applied"
    echo "   - Debug console.log statements added"
    exit 0
else
    echo "⚠️  Some file overrides failed - check the logs above"
    exit 1
fi