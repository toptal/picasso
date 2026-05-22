---
'@toptal/picasso-backdrop': patch
---

### Backdrop

- Replace `@mui/base/Modal` `ModalBackdropSlotProps` import with a local `React.HTMLAttributes<HTMLDivElement>`-based Props type; public Props surface and runtime behavior unchanged
- Lift React peer-dependency cap (drop `< 19.0.0`)
