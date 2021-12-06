---
'@toptal/picasso-lab': minor
---

Updated sizes in Typography components to comply with new changes introduced in `@toptal/picasso@17.0.0`

Changed components: 

- `EmptyStateCollection`
```diff
-<Typography size='small'>{children}</Typography>
+<Typography size='xsmall'>{children}</Typography>
```
- `EmptyStatePage`
```diff
<Typography
- size='small'
+ size='xsmall'
  as={typeof children === 'string' ? 'p' : 'div'}
>
  {children}
</Typography>
```
- `NoteSubtitle`
```diff
-<Typography color='dark-grey' size='small'>
+<Typography color='dark-grey' size='xsmall'>
  {children}
</Typography>
```
- `OverviewBlock`
```diff
-<Typography size='xsmall' weight='semibold' color={color.label}>
+<Typography size='xxsmall' weight='semibold' color={color.label}>
  {titleCase ? toTitleCase(label) : label}
</Typography>
```

