---
'@toptal/picasso-forms': major
---

### Form

- a field that unmounts and remounts, or that mounts over a value the consumer already wrote with `form.change()`, now keeps that value. `react-final-form@7.0.1` reseeds a field from `initialValues` whenever it mounts and final-form holds no field state for it, and final-form drops that state as soon as the field's last subscriber unregisters — which happens on any ordinary unmount, not only under `destroyOnUnregister`. A conditional field, a wizard step or an edit/preview toggle therefore came back holding the initial value rather than the edited one, and a field seeded with `''` was refilled, so its `required` validation never fired
- the form's values were right the whole time; only final-form's per-field state was missing. So that state is recreated from those values for exactly as long as react-final-form's mount effect needs to see it, with a subscriber that carries no subscription and no validator and is released in the next effect. Nothing outlives the field: `getRegisteredFields()`, field errors and submit behaviour are what final-form reports without the workaround
- forms that set `destroyOnUnregister` are untouched: they ask for values to be dropped on unmount, which is the behaviour this works around
- this is a workaround for [react-final-form#1095](https://github.com/final-form/react-final-form/issues/1095), fixed upstream by the still-unreleased [#1096](https://github.com/final-form/react-final-form/pull/1096). It lives in one module, `Field/keep-field-state.ts`, and goes away with a `react-final-form` release that contains that fix
