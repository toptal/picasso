# Changesets guidelines

## Version bump
`patch` - a bug fix, a slight change in the existing functionality or the change, which doesn’t affect Picasso users, but good to know it exists.

`minor` - a new prop, new functionality for the component. Picasso users will be benefited if know this change has been made.

`major` - a change in values for the existing prop, the prop removal, a change of the prop purpose, removal of the component. Also, if the horizontal layout of the component is affected (which can mean a broken layout of the page for users of this component). Picasso users must know about this change because they need to take action to upgrade their existing Picasso version.

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
