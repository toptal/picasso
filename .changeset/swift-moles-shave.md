---
'@toptal/picasso': patch
---

### NonNativeSelect

- In `NonNativeSelect` component we were passing `NonNativeSelectLimitFooter`
  component as a `fixedFooter` prop for `NonNativeSelectOptions` component even
  if it was not needed. Now we have conditional check for that.

### ScrollMenu

- `ScrollMenu` is styled according to the [BASE design](https://share.goabstract.com/6869aded-577c-4c63-b959-40650701ff51?mode=design&sha=4f1f6493dfac89015cc6c71ea348807e931fe3bc).
