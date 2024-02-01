#!/bin/bash

rm -rf ./dist
mkdir ./dist
cp -R ./src ./dist
cp ./README.md ./dist/README.md
cp ./package.json ./dist/package.json
cp ../../LICENSE ./dist/LICENSE
