---
'@toptal/picasso-dropdown': minor
'@toptal/picasso-shared': minor
'@toptal/picasso-utils': minor
'@toptal/picasso': minor
'@toptal/picasso-radio': patch
'@toptal/picasso-button': patch
'@toptal/picasso-autocomplete': patch
'@toptal/picasso-select': patch
'@toptal/picasso-accordion': patch
'@toptal/picasso-empty-state': patch
'@toptal/picasso-input-adornment': patch
'@toptal/picasso-notification': patch
'@toptal/picasso-tag': patch
'@toptal/picasso-tagselector': patch
'@toptal/picasso-timeline': patch
---

### Dropdown

- pass `{ open }` to a render-function `children`; the `isOpen` key still arrives, deprecated

### Radio

- a `Radio` or `Button.Radio` without a `value` reports `""` as its DOM value on React 19 too, instead of the browser's `"on"`

### Autocomplete

- on React 19, an `inputComponent` that takes `ref` as a prop receives the input ref, which Autocomplete used to drop with a `forwardRef` error. A class component still doesn't

### Select

- a click right after the search input's blur closed the options reopens them

### Accordion, Button, EmptyState, InputIconAdornment, Notification, Tag, TagSelector and Timeline

- an `icon`, `expandIcon`, `image` or `endAdornment` given as a Fragment renders without the classes a Fragment can't take, so React 19 logs no error

### Shared

- add the `IconElement` and `TransitionChild` types, also exported from `@toptal/picasso`, for the icon props and the child Fade and Slide clone
- add `cloneElementUnlessFragment` and `flattenFragments`

### Utils

- add the `NullableRefObject<T>` type, what `useRef<T>(null)` returns on every `@types/react` major
