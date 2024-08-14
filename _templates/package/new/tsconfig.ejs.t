---
to: <%= packagePath %>/tsconfig.json
sh: "yarn install && lerna run --scope=<%= packageName %> build:package"
---
{
  "extends": "<%= isBasePackage ? '../../../tsconfig.base.json' : '../../tsconfig.base.json' %>",
  "compilerOptions": { "outDir": "dist-package" },
  "include": ["src"],
  "references": [
    { "path": "<%= isBasePackage ? '../../picasso-provider' : '../picasso-provider' %>" },
    { "path": "<%= isBasePackage ? '../../picasso-tailwind' : '../picasso-tailwind' %>" },
    { "path": "<%= isBasePackage ? '../../picasso-tailwind-merge' : '../picasso-tailwind-merge' %>" },
    { "path": "<%= isBasePackage ? '../Utils' : '../base/Utils' %>" }
  ]
}
