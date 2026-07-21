---
"@toptal/picasso-tabs": patch
"@toptal/picasso-drawer": patch
"@toptal/picasso-tooltip": patch
"@toptal/picasso-accordion": patch
"@toptal/picasso-checkbox": patch
"@toptal/picasso-slider": patch
"@toptal/picasso-button": patch
"@toptal/picasso-switch": patch
"@toptal/picasso-modal": patch
---

Upgrade `@base-ui/react` from 1.4.1 to 1.6.0

No consumer-facing API changes. base-ui 1.6 emits a few additional data
attributes for styling/animation (`data-popup-open`, `data-activation-direction`,
`data-hidden`) and tightens its internal accessibility semantics (Accordion Root
no longer carries `role="region"`, per APG; Modal focus guards use
`aria-hidden` instead of `role="button"`).
