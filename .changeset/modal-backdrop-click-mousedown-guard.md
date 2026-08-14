---
'@toptal/picasso-modal': patch
---

### Modal

- fix the modal closing when a click starts inside its content and ends outside the paper, which most visibly wiped a form when selecting text in one of its fields. The popup is a transparent full-screen element covering the backdrop, so the browser dispatches such a click on the popup — the common ancestor of the press and release targets — making it indistinguishable from a backdrop click. Backdrop dismissal now also requires the press to have started on the popup itself. Note for tests: a bare synthetic `click` on the popup no longer dismisses the modal; dispatch a `mousedown` first (a real or `realClick`-style click already does)
