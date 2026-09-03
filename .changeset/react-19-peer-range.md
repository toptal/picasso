---
'@topkit/analytics-charts': minor
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
- the published declarations type-check against `@types/react` 19 as well as 17 and 18: `JSX.Element` (a global React 19's types removed) becomes `React.ReactElement`, refs created with `useRef(null)` are accepted as `RefObject<T | null>`, elements read through `cloneElement` carry the props they are read for, the `content` and `children` HTML attributes no longer collide with Picasso's own props on Accordion, Dropdown, Table.ExpandableRow and Tooltip, and `OverridableComponent` (picasso-shared) returns what the installed React's component types return. `Dropdown` now declares the render-function `children` it already supported, and that function receives `{ open }` (previously the untyped form passed `{ isOpen }`)
- no runtime changes beyond `Form` rendering a function child the way `react-final-form` documents
