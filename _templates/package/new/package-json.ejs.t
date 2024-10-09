---
to: <%= packagePath %>/package.json
---
<%
  Name = h.changeCase.pascalCase(shortName)
-%>
{
  "name": "<%= packageName %>",
  "version": "1.0.0",
  "description": "Toptal UI components library - <%= Name %>",
  "publishConfig": {
    "access": "public"
  },
  "main": "./dist-package/src/index.js",
  "module": "./dist-package/src/index.js",
  "scripts": {
    "build:package": "tsc -b tsconfig.json",
    "prepublishOnly": "yarn build:package"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/toptal/picasso.git"
  },
  "author": "Toptal",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/toptal/picasso/issues"
  },
  "homepage": "https://github.com/toptal/picasso/tree/master/packages/picasso#readme",
  "dependencies": {
    "@toptal/picasso-utils": "1.0.3"
  },
  "peerDependencies": {
    "@toptal/picasso-provider": "*",
    "@toptal/picasso-tailwind": ">=2.7",
    "react": ">=16.12.0 < 19.0.0",
    "@toptal/picasso-tailwind-merge": "^1.1.1"
  },
  "exports": {
    ".": "./dist-package/src/index.js"
  },
  "files": [
    "dist-package/**",
    "!dist-package/tsconfig.tsbuildinfo",
    "src"
  ]
}

