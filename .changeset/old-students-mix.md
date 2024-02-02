---
'@toptal/picasso-provider': minor
'@toptal/picasso-forms': minor
'@toptal/picasso': minor
---

---

### Forms

- enhanced customization in horizontal Form layout: Introducing the `labelWidth` prop for adjusting the width of label columns in horizontal layout forms.

The new `labelWidth` property in the `Form` component significantly increases the flexibility of form design, allowing for more responsive and visually balanced layouts. This property can be set with either a single numeric value (e.g., `2`, `3`, or `4`) for a uniform width across all screen sizes, or an object mapping specific widths to breakpoints (e.g., `{ md: 4, lg: 3, xl: 2 }`).

Example Usage:
Uniform width setting: `<Form layout="horizontal" labelWidth={3}>...</Form>`
Responsive width setting: `<Form layout="horizontal" labelWidth={{ md: 4, lg: 3, xl: 2 }}>...</Form>`
