---
'@toptal/picasso': minor
'@toptal/picasso-accordion': minor
'@toptal/picasso-backdrop': minor
'@toptal/picasso-badge': minor
'@toptal/picasso-button': minor
'@toptal/picasso-charts': minor
'@toptal/picasso-checkbox': minor
'@toptal/picasso-container': minor
'@toptal/picasso-drawer': minor
'@toptal/picasso-dropdown': minor
'@toptal/picasso-file-input': minor
'@toptal/picasso-form': minor
'@toptal/picasso-form-label': minor
'@toptal/picasso-form-layout': minor
'@toptal/picasso-grid': minor
'@toptal/picasso-menu': minor
'@toptal/picasso-modal': minor
'@toptal/picasso-modal-context': minor
'@toptal/picasso-note': minor
'@toptal/picasso-notification': minor
'@toptal/picasso-outlined-input': minor
'@toptal/picasso-page': minor
'@toptal/picasso-popper': minor
'@toptal/picasso-provider': minor
'@toptal/picasso-query-builder': minor
'@toptal/picasso-radio': minor
'@toptal/picasso-rich-text-editor': minor
'@toptal/picasso-slider': minor
'@toptal/picasso-switch': minor
'@toptal/picasso-tabs': minor
'@toptal/picasso-tooltip': minor
'@toptal/picasso-typography': minor
'@toptal/picasso-utils': minor
---

Align the `react` and `react-dom` peer-dependency range to a uniform `>=17.0.0 < 19.0.0` across all Picasso packages.

- previously the base-UI-migrated packages declared an uncapped `react` peer (`>=17.0.0`) while the rest were capped at `< 19.0.0`; this unifies the whole library on one supported range so consumers see a consistent React requirement.
- react 19 support is intentionally deferred — lifting the `< 19.0.0` cap across all packages, once validated, is tracked in PF-2262.
- peer-range change only; no runtime or API changes.
