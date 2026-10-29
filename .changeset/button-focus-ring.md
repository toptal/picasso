---
'@toptal/picasso-button': patch
---

### Button

- keep the focus ring on a keyboard-focused `Button.Action` while it is loading
- use the shared focus ring in `Button`, `Button.Circular` and `Button.Action`, built from color tokens instead of raw `rgba` values and sized in rem; it looks the same
- stop showing the focus ring after a mouse click; it now shows on keyboard focus only

### ButtonCheckbox, ButtonRadio

- show the focus ring on the label only while the checkbox or radio inside it has keyboard focus, not after a mouse click
