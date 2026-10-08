---
'@topkit/analytics-charts': minor
'@toptal/base-tailwind': patch
'@toptal/picasso': minor
'@toptal/picasso-accordion': minor
'@toptal/picasso-account-select': minor
'@toptal/picasso-alert': minor
'@toptal/picasso-amount': minor
'@toptal/picasso-application-update-notification': minor
'@toptal/picasso-autocomplete': minor
'@toptal/picasso-avatar': minor
'@toptal/picasso-avatar-upload': minor
'@toptal/picasso-backdrop': minor
'@toptal/picasso-badge': minor
'@toptal/picasso-breadcrumbs': minor
'@toptal/picasso-button': minor
'@toptal/picasso-calendar': minor
'@toptal/picasso-carousel': minor
'@toptal/picasso-charts': minor
'@toptal/picasso-checkbox': minor
'@toptal/picasso-codemod': minor
'@toptal/picasso-collapse': minor
'@toptal/picasso-container': minor
'@toptal/picasso-date-picker': minor
'@toptal/picasso-date-select': minor
'@toptal/picasso-drawer': minor
'@toptal/picasso-dropdown': minor
'@toptal/picasso-dropzone': minor
'@toptal/picasso-empty-state': minor
'@toptal/picasso-environment-banner': minor
'@toptal/picasso-fade': minor
'@toptal/picasso-file-input': minor
'@toptal/picasso-form': minor
'@toptal/picasso-form-label': minor
'@toptal/picasso-form-layout': minor
'@toptal/picasso-forms': minor
'@toptal/picasso-grid': minor
'@toptal/picasso-helpbox': minor
'@toptal/picasso-icons': minor
'@toptal/picasso-image': minor
'@toptal/picasso-input': minor
'@toptal/picasso-input-adornment': minor
'@toptal/picasso-link': minor
'@toptal/picasso-list': minor
'@toptal/picasso-loader': minor
'@toptal/picasso-logo': minor
'@toptal/picasso-menu': minor
'@toptal/picasso-modal': minor
'@toptal/picasso-modal-context': minor
'@toptal/picasso-note': minor
'@toptal/picasso-notification': minor
'@toptal/picasso-number-input': minor
'@toptal/picasso-outlined-input': minor
'@toptal/picasso-overview-block': minor
'@toptal/picasso-page': minor
'@toptal/picasso-pagination': minor
'@toptal/picasso-paper': minor
'@toptal/picasso-password-input': minor
'@toptal/picasso-pictograms': minor
'@toptal/picasso-popper': minor
'@toptal/picasso-prompt-modal': minor
'@toptal/picasso-provider': minor
'@toptal/picasso-query-builder': minor
'@toptal/picasso-quote': minor
'@toptal/picasso-radio': minor
'@toptal/picasso-rating': minor
'@toptal/picasso-rich-text-editor': minor
'@toptal/picasso-section': minor
'@toptal/picasso-select': minor
'@toptal/picasso-shared': minor
'@toptal/picasso-show-more': minor
'@toptal/picasso-skeleton-loader': minor
'@toptal/picasso-slide': minor
'@toptal/picasso-slider': minor
'@toptal/picasso-step': minor
'@toptal/picasso-switch': minor
'@toptal/picasso-table': minor
'@toptal/picasso-tabs': minor
'@toptal/picasso-tag': minor
'@toptal/picasso-tagselector': minor
'@toptal/picasso-tailwind': patch
'@toptal/picasso-tailwind-merge': minor
'@toptal/picasso-test-utils': minor
'@toptal/picasso-timeline': minor
'@toptal/picasso-timepicker': minor
'@toptal/picasso-tooltip': minor
'@toptal/picasso-tree-view': minor
'@toptal/picasso-typography': minor
'@toptal/picasso-typography-overflow': minor
'@toptal/picasso-user-badge': minor
'@toptal/picasso-utils': minor
---

Allow React 19: the `react` and `react-dom` peer ranges become `^17.0.0 || ^18.0.0 || ^19.0.0` on every Picasso package.

- the `< 19.0.0` cap set in v100 is lifted now that the unit suite runs green on React 19 next to React 18 (`pnpm test:react19`, CI job `react19-validate`), Collapse no longer depends on `react-transition-group`, element refs are read from the location each React major stores them in, and the head-tag rendering React 19 hoists at mount is handled in the provider
- explicit majors rather than an open range, so the next React major stays opted out until it is validated the same way
- the floor stays React 17, the minimum `@base-ui/react` supports; `@toptal/picasso-show-more` joins the uniform range after its earlier uncapped `>=17.0.0`
- the package sources type-check against `@types/react` 19 as well as 17 and 18: explicit `JSX.Element` annotations (a global React 19's types removed) become `React.ReactElement`, refs created with `useRef(null)` are accepted as `RefObject<T | null>`, elements read through `cloneElement` carry the props they are read for, the `content` and `children` HTML attributes no longer collide with Picasso's own props on Accordion, Dropdown, Table.ExpandableRow and Tooltip, and `OverridableComponent` (picasso-shared) returns what the installed React's component types return. `Dropdown` now declares the render-function `children` it already supported: the function receives `{ open }`, and the `isOpen` key it received before still arrives, deprecated
- the published declarations compile against `@types/react` 19 with `skipLibCheck: false`, which the `react19-validate` CI job now checks: the components and hooks declare a `React.ReactElement` return type instead of an inferred `JSX.Element`, a global React 19's types no longer have; the favicon icons are typed `string` instead of importing the images; and the Tailwind presets no longer name Tailwind 3's `CustomThemeConfig`, while their `theme` keeps the `any` type it had. With that setting two dependencies still report errors in their own declarations: `react-dropzone`, which uses the global `JSX`, and `react-final-form`, which imports its `package.json` without `resolveJsonModule`
- a `@toptal/picasso-shared` names the two element shapes those declarations share, re-exported from `@toptal/picasso`: `IconElement` for the `icon`/`expandIcon`/`image` props that receive an `<Icon />`-like element and add classes to it, and `TransitionChild` for the single child `Fade` and `Slide` clone with transition classes, style and a ref. Existing usages type-check unchanged; the types exist so the same shape is not spelled out on every package. `@toptal/picasso-utils` adds `NullableRefObject<T>`, the ref object `useRef<T>(null)` returns on every `@types/react` major, for refs that are both read and passed to a JSX `ref` prop
- a function child of `Form` is called with the form's render props, as `react-final-form` documents
- a known limitation on React 19, where behavior differs from React 17 and 18: helmets rendered with `Page.Helmet` merge only their titles, so duplicate `<meta>` tags stay, a `<script>` child without `async` does not run, and a server render gets no `<title>` from them, since they set it after mount
- a `Radio` or `Button.Radio` rendered without a `value` reports `""` as its DOM value on React 19 too, as on React 17 and 18, where React 19 alone would leave the browser's `"on"`
- an `inputComponent` passed to `Autocomplete` that takes `ref` as a prop receives the input ref on React 19, where Autocomplete used to drop it and log that the component needs `forwardRef`, which only React 17 and 18 require. A class component still doesn't receive it, since its ref would be the instance rather than the input
- an `icon`, `expandIcon`, `image` or `endAdornment` given as a Fragment renders as it is: Accordion, Button, ButtonAction, EmptyState, InputIconAdornment, Notification, Tag, TagSelector and Timeline no longer pass their classes to a Fragment, which takes no props and makes React 19 log an error for each. `@toptal/picasso-shared` exports the `cloneElementUnlessFragment` they use
- a click on `Select` reopens its options when the search input's blur closed them in the same task, where the click read the open state from before the blur and closed them again. Testing Library and Cypress clicks, and a `click()` after moving the focus, hit it; a real pointer click rarely did
