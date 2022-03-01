---
'@toptal/picasso': minor
---

---

### ShowMore

- Accepts ReactNode as children

It uses native functionality from `react-truncate`. In shortened state 
it converts children to string which is then truncated to set number of 
`rows`. That means any **formatting will be lost until the content is 
expanded**.

- Accepts 0 in `rows` prop

Previously, setting any falsy value to rows resulted into content
being expanded. Now when you explicitly set rows to 0, no content
is shown and only "Show more" button is there to display the content.
