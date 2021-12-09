---
'@toptal/picasso': major
---

### Changing sizes in `Typography` for `body` variant.

**Reason behind it:**

In multiple Picasso components (`TableCell`, `Tab`, `Notification`, `Tooltip`)
was used a type of `font-size: 13px; line-height: 20px` but it wasn't officially
part of BASE `Typography` component, so it had to be styled manually in multiple places creating duplicates.

**Solution**

Introduced new size type (**13px/20px**) named `small`.

This change pushed other size types down, making:

>`small` --> `xsmall`
>
>`xsmall` --> `xxsmall`

There is a [codemod for v17.0.0](https://github.com/toptal/picasso/tree/master/packages/picasso-codemod#v1700) to help you with this transition.
Note that this codemod also changes props in `TypographyOverflow` and `Amount` component as they are both wrappers for `Typography`

**Other consequences**

- This update also changed line-height in `Tooltip` from previous **19.5px** to **20px** 
  and fixed `compact` variant's height to **24px** to comply with BASE
- Table header height for `compact` spacing changed to **24px** (from previous 26.5px)
- There is also a **change in `TableCell` structure**. 
  Now its children are wrapped by `Typography` component.
  It looks basically like this:

```diff
<MUITableCell>
+ <Typography as='div' size='small'>
    {children}
+ </Typography>
</MUITableCell>
```

Please bare in mind this may cause some unexpected issues, if you rely on table-cell properties in your children.
