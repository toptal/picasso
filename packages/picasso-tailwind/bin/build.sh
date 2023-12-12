#!/bin/bash

rm -rf ./dist-package
mkdir ./dist-package
cp -R ./src ./dist-package
cp ./README.md ./dist-package/README.md
cp ./package.json ./dist-package/package.json
cp ../../LICENSE ./dist-package/LICENSE
