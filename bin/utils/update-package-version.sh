#!/bin/bash

for file in $(find . -name 'package.json')
do
    sed -i 's/\("@toptal\/picasso-tailwind-merge":\s*\)".*"/\1"^2.0.0"/' $file
done
