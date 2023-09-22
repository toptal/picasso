---
'@toptal/picasso-codemod': minor
---

- add `spacing-values` codemod. Please run the codemod (`npx @toptal/picasso-codemod@latest v39.3.0`) to replace spacing property values of `Container` and `Dropdown` components with BASE-aligned property values according to the https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md. The implementation of spacing properties changed, please double-check places where custom styling is applied for containers (for example, `:nth-child()` selectors that overwrite spacing can stop working as spacing is now defined in `style` attribute of `Container` component). Property values that do not have BASE counterpart or are complex expressions have to be updated manually (non-BASE values have to be replaced with BASE ones after consulting with Design Team), codemod outputs the list of such cases for convenience. Run linter or prettier to align updated code with project code style.
