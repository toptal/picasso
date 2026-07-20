---
'@toptal/picasso-select': patch
---

### Select

- fix `Select` opening its options popup when a click on an associated `<label>` is forwarded to the select input by the browser (label activation). The select now only receives focus from label clicks, matching native `<select>` behavior. Real pointer clicks and assistive-technology clicks keep toggling the popup.
