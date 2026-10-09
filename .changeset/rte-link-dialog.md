---
'@toptal/picasso-rich-text-editor': minor
---

### RichTextEditor

- replace the browser prompt of `LinkPlugin` with a dialog to set the link text, the URL and whether the link opens in a new tab. "Open in new tab" is checked by default, so new links get `target="_blank"` and `rel="noopener noreferrer"` unless the author unchecks it; previously links opened in the same tab
- clicking the link button on an existing link now opens the dialog to edit or remove it, instead of removing it right away
- keep `target` and `rel` on links when converting HTML to the editor value
- keep the editor focused while the link dialog is open, and return focus to it when the dialog closes. `onBlur` no longer fires when focus moves into the dialog, and `onFocus` no longer fires again when focus comes back from the toolbar or a dialog
