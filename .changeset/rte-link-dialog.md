---
'@toptal/picasso-rich-text-editor': minor
---

### RichTextEditor

- replace the browser prompt of `LinkPlugin` with a dialog to set the link text, the URL and whether the link opens in a new tab. "Open in new tab" is unchecked by default, so links keep opening in the same tab; checked, a link gets `target="_blank"` and `rel="noopener noreferrer"`
- add `defaultTarget` prop to `LinkPlugin`; `'_blank'` checks "Open in new tab" for new links. Its props type is exported as `LinkPluginProps`
- give every link that opens in a new tab `rel="noopener noreferrer"` in the editor output, including links that came in from HTML
- clicking the link button on an existing link now opens the dialog to edit or remove it, instead of removing it right away
- keep `target` and `rel` on links when converting HTML to the editor value
- keep the editor focused while the link dialog is open, and return focus to it when the dialog closes. `onBlur` no longer fires when focus moves into the dialog, and `onFocus` no longer fires again when focus comes back from the toolbar or a dialog
