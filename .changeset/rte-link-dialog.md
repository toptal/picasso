---
'@toptal/picasso-rich-text-editor': minor
---

### RichTextEditor

- replace the browser prompt of `LinkPlugin` with a dialog to set the link text, the URL and whether the link opens in a new tab. "Open in new tab" is checked by default, so new links get `target="_blank"` and `rel="noopener noreferrer"` unless the author unchecks it; previously links opened in the same tab
- clicking the link button on an existing link now opens the dialog to edit or remove it, instead of removing it right away
- keep `target` and `rel` on links when converting HTML to the editor value
