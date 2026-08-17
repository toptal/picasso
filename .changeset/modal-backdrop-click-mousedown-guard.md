---
'@toptal/picasso-modal': patch
---

### Modal

- fix the modal closing when a click starts or ends inside its content instead of on the backdrop, which most visibly wiped a form when selecting the text of one of its fields. The popup is a transparent full-screen element covering the backdrop, so when a press and its release land on different elements the browser dispatches the click on their common ancestor — that same popup — making it indistinguishable from a backdrop click. Backdrop dismissal now requires both ends of the interaction to have been on the popup itself. Note for tests: a bare synthetic `click` on the popup no longer dismisses the modal; dispatch `mousedown` and `mouseup` on it first (a real or `realClick`-style click already does)
