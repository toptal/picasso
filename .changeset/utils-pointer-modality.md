---
'@toptal/picasso-utils': minor
---

### Utils

- Add `isPointerModality`, `subscribePointerModality` and
  `unsubscribePointerModality` — a shared, ref-counted input-modality tracker
  (window-capture `keydown`/`pointerdown` listeners) for telling
  pointer-initiated focus from keyboard-initiated focus in environments where
  `:focus-visible` cannot. First consumer: Tooltip's pointer-focus open
  suppression. [PF-2253]
