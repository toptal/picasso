# Changesets guidelines

## Version bump
`patch` - if you have a bug fix, a slight change in the existing functionality or the change, which doesn’t affect much Picasso users, but good to know this change exists.

`minor` - if you’ve added a new prop, new functionality for the component, which didn’t exist before. Picasso users will be benefited if would know that this change has been made.

`major` - if you’ve changed existing prop values, removed the prop, or changed the purpose of the prop. Also, if you’ve affected the horizontal layout of the component (which can mean a broken layout of the page for users of this component), If you removed a component. Picasso users must know about this change because they need to do some actions to upgrade their existing Picasso version to the current one.

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
