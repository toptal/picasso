# @toptal/picasso-backdrop

## 100.0.0

### Major Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Raise the `react` and `react-dom` peer-dependency floor to React 17.

  - raise the `react` and `react-dom` peer-dependency floor from `>=16.12.0` to `>=17.0.0` across all Picasso packages — **React 16 is no longer supported**. Picasso components now depend on `@base-ui/react`, which requires React 17+ (`^17 || ^18 || ^19`), so React 16 could no longer be honored in practice.
  - this is a peer-range change only — no runtime or API changes. Existing upper bounds are untouched: packages currently capped at `<19.0.0` stay capped (lifting that cap to admit React 19 is tracked separately in PF-2236 / PF-2262).
  - consumer action: ensure `react` and `react-dom` resolve to `>=17`. [PF-2237]

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Re-baseline the entire Picasso library to a single unified major version (v100) as part of the @base-ui/react modernization.
  - all Picasso packages are released together at v100.0.0 as one unified version.
  - no API or behavior change comes from this re-baseline itself; see each package's changelog for the specific modernization changes it received.

### Minor Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!
  Align the `react` and `react-dom` peer-dependency range to a uniform `>=17.0.0 < 19.0.0` across all Picasso packages.
  - previously the base-UI-migrated packages declared an uncapped `react` peer (`>=17.0.0`) while the rest were capped at `< 19.0.0`; this unifies the whole library on one supported range so consumers see a consistent React requirement.
  - react 19 support is intentionally deferred — lifting the `< 19.0.0` cap across all packages, once validated, is tracked in PF-2262.
  - peer-range change only; no runtime or API changes.

### Patch Changes

- [#5059](https://github.com/toptal/picasso/pull/5059) [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5) Thanks [@vedrani](https://github.com/vedrani)!

### Backdrop

- Replace `@mui/base/Modal` `ModalBackdropSlotProps` import with a local `React.HTMLAttributes<HTMLDivElement>`-based Props type; public Props surface and runtime behavior unchanged
- Lift React peer-dependency cap (drop `< 19.0.0`)
- Updated dependencies [[`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5), [`de9dba3`](https://github.com/toptal/picasso/commit/de9dba37e3d371d4bf26fb025c555d8e679dcaa5)]:
  - @toptal/picasso-utils@100.0.0
  - @toptal/picasso-fade@100.0.0
  - @toptal/picasso-tailwind@100.0.0

## 2.0.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@4.0.1
  - @toptal/picasso-fade@1.0.10

## 2.0.0

### Major Changes

- [#4898](https://github.com/toptal/picasso/pull/4898) [`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1) Thanks [@javier-delgado](https://github.com/javier-delgado)!
  Upgraded Tailwind CSS from v3 to v4:
  - updated `tailwindcss` peer dependency from `^3.4.10` to `^4.2.1`
  - updated deprecated utility classes
  - min node version is 20 or higher

### Patch Changes

- Updated dependencies [[`e93f40b`](https://github.com/toptal/picasso/commit/e93f40bf03c4ea943ff9561c2dd032125a05ffc1)]:
  - @toptal/picasso-utils@4.0.0
  - @toptal/picasso-fade@1.0.9

## 1.0.9

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-utils@3.1.0
  - @toptal/picasso-fade@1.0.8

## 1.0.8

### Patch Changes

- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-utils@3.0.0
  - @toptal/picasso-fade@1.0.7

## 1.0.7

### Patch Changes

- [#4562](https://github.com/toptal/picasso/pull/4562) [`2880a4b`](https://github.com/toptal/picasso/commit/2880a4b68cb4676be3b91b416f45a87d201df715) Thanks [@sofiaternovskaya](https://github.com/sofiaternovskaya)!
- update mui/base lib to fix multiline textarea issue

## 1.0.6

### Patch Changes

- Updated dependencies [[`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-utils@2.0.0
  - @toptal/picasso-fade@1.0.6

## 1.0.5

### Patch Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- omit ownerState to not propagate it to DOM

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- update ts references

- Updated dependencies [[`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685)]:
  - @toptal/picasso-fade@1.0.5

## 1.0.4

### Patch Changes

- Updated dependencies [[`81ba64e`](https://github.com/toptal/picasso/commit/81ba64e3ee6206aa7119fa2069ca685228567746)]:
  - @toptal/picasso-fade@1.0.4

## 1.0.3

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@1.0.3
  - @toptal/picasso-fade@1.0.3

## 1.0.2

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-utils@1.0.2
  - @toptal/picasso-fade@1.0.2

## 1.0.1

### Patch Changes

- [#4172](https://github.com/toptal/picasso/pull/4172) [`0ccb256c05520b3a21bca08642bdf1cc47be88a2`](https://github.com/toptal/picasso/commit/0ccb256c05520b3a21bca08642bdf1cc47be88a2) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- initial release of the component

- Updated dependencies [[`0ccb256c05520b3a21bca08642bdf1cc47be88a2`](https://github.com/toptal/picasso/commit/0ccb256c05520b3a21bca08642bdf1cc47be88a2), [`0ccb256c05520b3a21bca08642bdf1cc47be88a2`](https://github.com/toptal/picasso/commit/0ccb256c05520b3a21bca08642bdf1cc47be88a2)]:
  - @toptal/picasso-fade@1.0.1
  - @toptal/picasso-tailwind@2.1.0
