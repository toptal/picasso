---
'@toptal/picasso': major
---

Reverting naming of colors back to concrete colors for `Tag`, `Tag.Rectangular`, `Indicator`

We are not ready yet to switch to abstract color names in the whole application,
maybe we will come back to it when we will need to make Picasso themeable.

To revert most of the cases you can use [codemod for v16.0.0](https://github.com/toptal/picasso/tree/master/packages/picasso-codemod#v1600)

```diff
-<Tag variant='positive' />
+<Tag variant='green' />

-<Tag.Rectangular variant='positive' />
+<Tag.Rectangular variant='green' />

-<Tag.Rectangular indicator='positive' />
+<Tag.Rectangular indicator='green' />

-<Indicator color='positive' />
+<Indicator color='green' />
```
