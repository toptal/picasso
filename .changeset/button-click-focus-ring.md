---
'@toptal/picasso-button': patch
---

---

### Button

- remove the `focus-within` ring so a mouse click no longer leaves the button
  ringed until it blurs; keyboard focus still rings through `focus-visible`

### ButtonControlLabel

- ring the label while the Radio or Checkbox inside it holds focus, keeping the
  behaviour that previously came from Button
