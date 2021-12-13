---
'@toptal/picasso': major
---

### Container

[Picasso Container Component](https://picasso.toptal.net/?path=/story/layout-container--container)

`packages/picasso/src/Container`

- Colored container variants - `red`, `green`, `yellow`, `blue`, `grey` -
  **cannot** have borders.
- Container variants - `white`, `transparent` - **can** have borders.
- User will see error in IDE if `bordered` is used with anything except `white`
  and `transparent` variants.

**Valid cases:**

```jsx
<Container bordered>some text</Container>
<Container variant='white' bordered>some text</Container>
<Container variant='transparent' bordered>some text</Container>
```

**Invalid cases:**

```jsx
<Container variant='red' bordered>some text</Container>
<Container variant='non-existing-color' bordered>some text</Container>
```
