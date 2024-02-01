#!/bin/bash

rm -rf ./dist
mkdir ./dist
cp -R ./src ./dist
cp ./README.md ./dist-package/README.md
cp ./package.json ./dist-package/package.json
cp ../../LICENSE ./dist-package/LICENSE
