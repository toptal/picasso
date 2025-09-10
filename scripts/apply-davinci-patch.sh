#!/bin/bash

# Apply patch to davinci-engine for enhanced logging
PATCH_FILE="node_modules/@toptal/davinci-engine/src/utils/publish-packages/publish-monorepo-packages.js"

if [ -f "$PATCH_FILE" ]; then
    echo "Applying davinci-engine patch for enhanced logging..."
    
    # Check if patch is already applied
    if grep -q "all: true" "$PATCH_FILE"; then
        echo "Patch already applied, skipping."
        exit 0
    fi
    
    # Apply the patch
    sed -i.bak 's/stdio: '\''pipe'\'',$/stdio: '\''pipe'\'',\
    all: true,/' "$PATCH_FILE"
    
    if [ $? -eq 0 ]; then
        echo "Patch applied successfully."
        rm "$PATCH_FILE.bak"  # Remove backup file
    else
        echo "Failed to apply patch."
        exit 1
    fi
else
    echo "Target file not found: $PATCH_FILE"
    exit 1
fi
