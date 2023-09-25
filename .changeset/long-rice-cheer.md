---
'@toptal/picasso': major
'@toptal/picasso-shared': major
'@toptal/picasso-codemod': patch
---

### Spacings

- add BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing to Picasso's theme and to `picasso-shared`

### Codemod

- add `spacing-values` codemod. Please run the codemod (`npx @toptal/picasso-codemod@latest v39.3.0`) to replace spacing property values of `Container` and `Dropdown` components with BASE-aligned property values according to the https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md. Property values that do not have BASE counterpart or are complex expressions have to be updated manually (non-BASE values have to be replaced with BASE ones after consulting with Design Team), codemod outputs the list of such cases for convenience. Run linter or prettier to align updated code with project code style.

- update peer dependencies for `@toptal/picasso` and `@toptal/picasso-shared`
- rename the codemod for spacings
