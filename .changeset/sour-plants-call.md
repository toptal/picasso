---
'@toptal/picasso-button': patch
'@toptal/picasso-button-group': patch
---

- increase specifity of CSS selector from `[&+&]:ml-4` to `[[data-component-type="button"]+&]:ml-4`
- fix spacing between PicassoGroup and Button
