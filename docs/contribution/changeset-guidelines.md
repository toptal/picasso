# Changesets guidelines

The same as commits, we write changeset in `present simple`.

## Version bump
`patch`

- Bug fix
- Change in the existing functionality
- Change, which does not affect Picasso users

`minor`

- New property
- New property value
- New functionality
- New component

`major`

- Deleting a component
- Deleting a component property
- Changing values for existing properties
- Changing purpose of the property
- Changing horizontal layout of a component (which can mean page layout break where the component is used)
- Picasso users need to take action to use released version with the changes

## Summary of the change (changelog message)

Please use this format:

```
---
'@toptal/[package]': [version bump]
---

---
### Component name 1

- change 1 for the component 1

### Component name 2

- change 1 for the component 2
- change 2 for the component 2
```
