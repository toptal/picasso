#!/usr/bin/env bash

# Update version for badge inside README.md file as we have private repository we need to generate it 
# as static icon and we can't use shields.io service directly 
sed -i '' -e "s/npm-.*-\(.*\)\.svg/npm-$1-\1\.svg/g" 'README.md'
