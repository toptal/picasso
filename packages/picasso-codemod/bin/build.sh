#!/bin/bash

rm -rf ./dist-package
mkdir ./dist-package
cp -R ./bin ./dist-package/bin
cp -R ./src ./dist-package
cp ./README.md ./dist-package/README.md
