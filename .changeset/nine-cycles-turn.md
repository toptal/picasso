---
'@toptal/picasso-codemod': minor
'@toptal/picasso-forms': minor
---

---

- all the Picasso Forms components exported from `picasso-forms` are now available to be directly imported from the root entry point
- compound usage of `Form` is now deprecated, you can replace the compound `Form` with `FormNonCompound` (in the future compound Form will no longer be available)
- added a codemod to effortlessly migrate your compound `Form` to separate components
