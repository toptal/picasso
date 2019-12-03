# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.1.0...@toptal/picasso@4.1.1) (2019-12-03)

**Note:** Version bump only for package @toptal/picasso





# [4.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.0.0...@toptal/picasso@4.1.0) (2019-12-03)


### Features

* **RadioGroup:** add horizontal prop ([#918](https://github.com/toptal/picasso/issues/918)) ([b2ac0f0](https://github.com/toptal/picasso/commit/b2ac0f01c3ae6505035eb1e2cd67d07a44b05ae0))





# 4.0.0 (2019-12-03)


### Features

* [FX-593] Fix package json versions ([#929](https://github.com/toptal/picasso/issues/929)) ([340a01c](https://github.com/toptal/picasso/commit/340a01c1806ff9e5b9a475dd1821899c5384c33a))
* v4 ([#820](https://github.com/toptal/picasso/issues/820)) ([4378192](https://github.com/toptal/picasso/commit/437819284fe13a6385346c730912d7b94adfdf44))


### BREAKING CHANGES

* Picasso v4 release

## @toptal/picasso

- **Radio:** Changed type of the `label` prop and now `ReactNode` is allowed to pass there (https://github.com/toptal/picasso/pull/910)
- **Select:** Added loading indicator. (https://github.com/toptal/picasso/pull/829)
- **TagSelector:** Fix issue with size of the dropdown menu (https://github.com/toptal/picasso/pull/905)

### BREAKING CHANGES:
- Remove all lab components from the core Picasso and moved them to `@toptal/picasso-lab` package (https://github.com/toptal/picasso/pull/876)
- **Accordion:** Now, no styles are applied to summary and details of accordion by default. It is the responsibility of the user to style them or you have an option to use sub-components
`Accordion.Summary` and `Accordion.Details` to style summary and details according to the BASE design system (https://github.com/toptal/picasso/pull/814)
- **Autocomplete:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/858)
- **Autocomplete:** Changed type definition for Item to allow custom Item type shape (https://github.com/toptal/picasso/pull/887):
  - `onOtherOptionSelect` passing only `inputValue` instead of new `Item`
  - `getDisplayValue` item is of type `Item` not Autocomplete's Item
  - Item interface changed `text` from required to optional
  - Item allows custom props
  - onChange changed signature and got the second argument ‘options’
- **Autocomplete:** Added opportunity to hide NoOptions label via passing `null` as `options` (https://github.com/toptal/picasso/pull/901)
- **Checkbox:**: When Checkbox is used without a label, now it does not have any margins. Also, changed a type of the `label` prop and now you can pass ReactNode there (https://github.com/toptal/picasso/pull/912)
- **Dropdown:** Removed deprecated `anchorOrigin` and `transformOrigin` props (https://github.com/toptal/picasso/pull/913)
- **Icon:** Change type of color prop. Now it accepts a string.
  `<Settings16 color={palette.red.main} />` -> `<Settings16 color='red' />` (https://github.com/toptal/picasso/pull/914)
- **Image**: Change default variant type name to `rectangle` (https://github.com/toptal/picasso/pull/888)
- **Link**: Change default variant type name to `anchor` (https://github.com/toptal/picasso/pull/888)
- **Link**: Remove `invert` prop. You should control color via `color`  prop instead (https://github.com/toptal/picasso/pull/892)
- **Loaded**: Change default variant type name to `blue` (https://github.com/toptal/picasso/pull/888)
- **Logo**: Change default variant type name to `blue` (https://github.com/toptal/picasso/pull/888)
- **Logo**: Change default variant type name to `blue` (https://github.com/toptal/picasso/pull/888)
- **Modal:** Removed deprecated useModal hook. It was replaced by useModals hook (https://github.com/toptal/picasso/pull/913)
- **MonthSelect:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)
- **Page.Content:** Make it to be `display: flex` by default (https://github.com/toptal/picasso/pull/913)
- **PromptModal:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)
- **Select:** Replaced `Select` with a brand new `Select` with a search. Component API was changed 
  - value prop changed a type
  - onChange has a strict type check for the value type and not receiving a child node anymore
  - because of adding input and changing the internals of the component - markup is changed, so your unit test snapshots should be updated
  - Input component in error state doesn't have a background color anymore
  (https://github.com/toptal/picasso/pull/812)
- **Sidebar:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/876)
- **Slider:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)
- **TagSelector:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/858)
- **TagSelector:** Changed type definition for Item to allow custom Item type shape (https://github.com/toptal/picasso/pull/887):
  - `onOtherOptionSelect` passing only `inputValue` instead of new `Item`
  - Item interface changed `text` and `value` from required to optional
  - Item allows custom props
- **TextField:** Removed deprecated TextField component. It was replaced by Input (https://github.com/toptal/picasso/pull/913)
- **YearSelect:** Moved from lab to core Picasso (https://github.com/toptal/picasso/pull/911)

## @toptal/picasso-lab

- **DatePicker:** Change `onSelect` to `onChange` (https://github.com/toptal/picasso/pull/888)





# [3.45.0](https://github.com/toptal/picasso/compare/v3.44.0...v3.45.0) (2019-11-28)


### Features

* **Indicator:** add Indicator component ([#890](https://github.com/toptal/picasso/issues/890)) ([d298320](https://github.com/toptal/picasso/commit/d298320))

# [3.44.0](https://github.com/toptal/picasso/compare/v3.43.0...v3.44.0) (2019-11-22)


### Features

* **radio:** change label from string to ReactElement ([#891](https://github.com/toptal/picasso/issues/891)) ([21a8d36](https://github.com/toptal/picasso/commit/21a8d36))

# [3.43.0](https://github.com/toptal/picasso/compare/v3.42.0...v3.43.0) (2019-11-20)


### Features

* **button:** add secondary-green variant ([#883](https://github.com/toptal/picasso/issues/883)) ([c7ebde7](https://github.com/toptal/picasso/commit/c7ebde7))

# [3.42.0](https://github.com/toptal/picasso/compare/v3.41.0...v3.42.0) (2019-11-20)


### Features

* **icon:** add social icons ([#880](https://github.com/toptal/picasso/issues/880)) ([b4b7174](https://github.com/toptal/picasso/commit/b4b7174))

# [3.41.0](https://github.com/toptal/picasso/compare/v3.40.0...v3.41.0) (2019-11-14)


### Features

* **Table:** [FX-585] Add expandable rows ([#856](https://github.com/toptal/picasso/issues/856)) ([db058ee](https://github.com/toptal/picasso/commit/db058ee))

# [3.40.0](https://github.com/toptal/picasso/compare/v3.39.1...v3.40.0) (2019-11-13)


### Features

* **icon:** add guests icon ([#849](https://github.com/toptal/picasso/issues/849)) ([827566d](https://github.com/toptal/picasso/commit/827566d))

## [3.39.1](https://github.com/toptal/picasso/compare/v3.39.0...v3.39.1) (2019-11-12)


### Bug Fixes

* **TagSelector:** fix placeholder on loading ([#851](https://github.com/toptal/picasso/issues/851)) ([b2252cc](https://github.com/toptal/picasso/commit/b2252cc))

# [3.39.0](https://github.com/toptal/picasso/compare/v3.38.0...v3.39.0) (2019-11-08)


### Features

* **Accordion:** [FX-571] Align expand icon to the top ([#842](https://github.com/toptal/picasso/issues/842)) ([3266cc0](https://github.com/toptal/picasso/commit/3266cc0))

# [3.38.0](https://github.com/toptal/picasso/compare/v3.37.0...v3.38.0) (2019-11-08)


### Features

* create PageBanner component ([#835](https://github.com/toptal/picasso/issues/835)) ([a881c61](https://github.com/toptal/picasso/commit/a881c61))

# [3.37.0](https://github.com/toptal/picasso/compare/v3.36.1...v3.37.0) (2019-11-08)


### Features

* **TagSelector:** make TagSelector a controlled component ([#837](https://github.com/toptal/picasso/issues/837)) ([86fa5f3](https://github.com/toptal/picasso/commit/86fa5f3))

## [3.36.1](https://github.com/toptal/picasso/compare/v3.36.0...v3.36.1) (2019-11-07)


### Bug Fixes

* **Button:** accept all props of the component passed in the as property ([#834](https://github.com/toptal/picasso/issues/834)) ([753b953](https://github.com/toptal/picasso/commit/753b953))

# [3.36.0](https://github.com/toptal/picasso/compare/v3.35.0...v3.36.0) (2019-11-05)


### Features

* **SidebarItem:** [FX-510] Add 'as' type definitions ([#836](https://github.com/toptal/picasso/issues/836)) ([3db4216](https://github.com/toptal/picasso/commit/3db4216))

# [3.35.0](https://github.com/toptal/picasso/compare/v3.34.0...v3.35.0) (2019-11-01)


### Features

* **Input:** [FX-570] Add entered counter type ([#831](https://github.com/toptal/picasso/issues/831)) ([15dee54](https://github.com/toptal/picasso/commit/15dee54))

# [3.34.0](https://github.com/toptal/picasso/compare/v3.33.2...v3.34.0) (2019-10-30)


### Features

* **Tooltip:** allow controlling listeners ([#819](https://github.com/toptal/picasso/issues/819)) ([c5f757f](https://github.com/toptal/picasso/commit/c5f757f))

## [3.33.2](https://github.com/toptal/picasso/compare/v3.33.1...v3.33.2) (2019-10-28)


### Bug Fixes

* fix MUI version to 4.3 ([#826](https://github.com/toptal/picasso/issues/826)) ([1d3acc1](https://github.com/toptal/picasso/commit/1d3acc1))

## [3.33.1](https://github.com/toptal/picasso/compare/v3.33.0...v3.33.1) (2019-10-28)


### Bug Fixes

* **Helpbox:** render Helpbox.Content as a div element ([#821](https://github.com/toptal/picasso/issues/821)) ([f4ddfd7](https://github.com/toptal/picasso/commit/f4ddfd7)), closes [#789](https://github.com/toptal/picasso/issues/789)

# [3.33.0](https://github.com/toptal/picasso/compare/v3.32.0...v3.33.0) (2019-10-24)


### Features

* **Button:** add transparent variants ([#815](https://github.com/toptal/picasso/issues/815)) ([a2dda67](https://github.com/toptal/picasso/commit/a2dda67))

# [3.32.0](https://github.com/toptal/picasso/compare/v3.31.2...v3.32.0) (2019-10-21)


### Features

* **PromptModal:** improve api and error handling ([#805](https://github.com/toptal/picasso/issues/805)) ([e03f158](https://github.com/toptal/picasso/commit/e03f158))

## [3.31.2](https://github.com/toptal/picasso/compare/v3.31.1...v3.31.2) (2019-10-21)


### Bug Fixes

* **Autocomplete:** not show other option when matches with option ([#807](https://github.com/toptal/picasso/issues/807)) ([ba3520c](https://github.com/toptal/picasso/commit/ba3520c))

## [3.31.1](https://github.com/toptal/picasso/compare/v3.31.0...v3.31.1) (2019-10-18)


### Bug Fixes

* issue with content growing flexbox children element ([#804](https://github.com/toptal/picasso/issues/804)) ([f2eb6a8](https://github.com/toptal/picasso/commit/f2eb6a8))

# [3.31.0](https://github.com/toptal/picasso/compare/v3.30.0...v3.31.0) (2019-10-18)


### Features

* **Input:** add limit prop ([#803](https://github.com/toptal/picasso/issues/803)) ([8beab39](https://github.com/toptal/picasso/commit/8beab39))

# [3.30.0](https://github.com/toptal/picasso/compare/v3.29.1...v3.30.0) (2019-10-17)


### Features

* [FX-481] Autocomplete cleanup ([#799](https://github.com/toptal/picasso/issues/799)) ([960b749](https://github.com/toptal/picasso/commit/960b749))

## [3.29.1](https://github.com/toptal/picasso/compare/v3.29.0...v3.29.1) (2019-10-17)


### Bug Fixes

* **Modal:** fix scrollbar settings and spacing ([#800](https://github.com/toptal/picasso/issues/800)) ([a8155a3](https://github.com/toptal/picasso/commit/a8155a3))

# [3.29.0](https://github.com/toptal/picasso/compare/v3.28.0...v3.29.0) (2019-10-16)


### Features

* **DatePicker:** add possibility to use input props ([#785](https://github.com/toptal/picasso/issues/785)) ([a27bf1c](https://github.com/toptal/picasso/commit/a27bf1c))

# [3.28.0](https://github.com/toptal/picasso/compare/v3.27.0...v3.28.0) (2019-10-16)


### Features

* **Notification:** add notification acitons ([#767](https://github.com/toptal/picasso/issues/767)) ([c059d90](https://github.com/toptal/picasso/commit/c059d90))

# [3.27.0](https://github.com/toptal/picasso/compare/v3.26.1...v3.27.0) (2019-10-16)


### Features

* **Autocomplete:** add enableAutofill option ([#798](https://github.com/toptal/picasso/issues/798)) ([3de9683](https://github.com/toptal/picasso/commit/3de9683))
* **select:** add support for multiple selections ([#797](https://github.com/toptal/picasso/issues/797)) ([903b593](https://github.com/toptal/picasso/commit/903b593))

## [3.26.1](https://github.com/toptal/picasso/compare/v3.26.0...v3.26.1) (2019-10-14)


### Bug Fixes

* **ShowMore:** add props spreading to ShowMore component ([#793](https://github.com/toptal/picasso/issues/793)) ([e0f840f](https://github.com/toptal/picasso/commit/e0f840f))

# [3.26.0](https://github.com/toptal/picasso/compare/v3.25.1...v3.26.0) (2019-10-14)


### Features

* **icon:** add star solid ([#794](https://github.com/toptal/picasso/issues/794)) ([5c7884c](https://github.com/toptal/picasso/commit/5c7884c))

## [3.25.1](https://github.com/toptal/picasso/compare/v3.25.0...v3.25.1) (2019-10-14)


### Bug Fixes

* **icons:** glitch ([#784](https://github.com/toptal/picasso/issues/784)) ([1c200ed](https://github.com/toptal/picasso/commit/1c200ed))

# [3.25.0](https://github.com/toptal/picasso/compare/v3.24.5...v3.25.0) (2019-10-14)


### Features

* [FX-486] Add useScreens hook ([#773](https://github.com/toptal/picasso/issues/773)) ([78065df](https://github.com/toptal/picasso/commit/78065df))

## [3.24.5](https://github.com/toptal/picasso/compare/v3.24.4...v3.24.5) (2019-10-11)


### Bug Fixes

* **docs:** minor docs fix ([#788](https://github.com/toptal/picasso/issues/788)) ([61e428b](https://github.com/toptal/picasso/commit/61e428b))

## [3.24.4](https://github.com/toptal/picasso/compare/v3.24.3...v3.24.4) (2019-10-10)


### Bug Fixes

* **UserBadge:** [FX-179] Fix image squashing on IE11 ([#782](https://github.com/toptal/picasso/issues/782)) ([7020d7f](https://github.com/toptal/picasso/commit/7020d7f))
* modal overlay for autocomplete and dropdown ([#775](https://github.com/toptal/picasso/issues/775)) ([87f648f](https://github.com/toptal/picasso/commit/87f648f))

## [3.24.3](https://github.com/toptal/picasso/compare/v3.24.2...v3.24.3) (2019-10-09)


### Bug Fixes

* **Input:** [Fx-176] Fix icons in adornment in IE11 ([#778](https://github.com/toptal/picasso/issues/778)) ([383b53c](https://github.com/toptal/picasso/commit/383b53c))

## [3.24.2](https://github.com/toptal/picasso/compare/v3.24.1...v3.24.2) (2019-10-09)


### Bug Fixes

* **Button:** [FX-173] Fix styles for buttons in IE11 ([#770](https://github.com/toptal/picasso/issues/770)) ([e5e0aaf](https://github.com/toptal/picasso/commit/e5e0aaf))

## [3.24.1](https://github.com/toptal/picasso/compare/v3.24.0...v3.24.1) (2019-10-08)


### Bug Fixes

* [FX-173] Fix infinite loop of loading font in IE11 and Edge ([#769](https://github.com/toptal/picasso/issues/769)) ([30ffd96](https://github.com/toptal/picasso/commit/30ffd96))

# [3.24.0](https://github.com/toptal/picasso/compare/v3.23.0...v3.24.0) (2019-10-08)


### Features

* [FX-501] Make Sidebar and Top Header responsive for medium size ([#757](https://github.com/toptal/picasso/issues/757)) ([3045d2a](https://github.com/toptal/picasso/commit/3045d2a))

# [3.23.0](https://github.com/toptal/picasso/compare/v3.22.0...v3.23.0) (2019-10-07)


### Features

* [FX-502] Add grey variant to Container and Helpbox ([#747](https://github.com/toptal/picasso/issues/747)) ([d453f06](https://github.com/toptal/picasso/commit/d453f06))

# [3.22.0](https://github.com/toptal/picasso/compare/v3.21.1...v3.22.0) (2019-10-07)


### Features

* **Tabs:** add variant prop ([#720](https://github.com/toptal/picasso/issues/720)) ([a00ac45](https://github.com/toptal/picasso/commit/a00ac45))

## [3.21.1](https://github.com/toptal/picasso/compare/v3.21.0...v3.21.1) (2019-10-07)


### Bug Fixes

* **Autocomplete:** [FX-492] Extend the api with other option ([#760](https://github.com/toptal/picasso/issues/760)) ([780cd4f](https://github.com/toptal/picasso/commit/780cd4f))

# [3.21.0](https://github.com/toptal/picasso/compare/v3.20.0...v3.21.0) (2019-10-07)


### Features

* **userbadge:** new size xxsmall ([#751](https://github.com/toptal/picasso/issues/751)) ([d99cb6a](https://github.com/toptal/picasso/commit/d99cb6a))

# [3.20.0](https://github.com/toptal/picasso/compare/v3.19.0...v3.20.0) (2019-10-07)


### Features

* **PromptModal:** add PromptModal and showPrompt ([#753](https://github.com/toptal/picasso/issues/753)) ([a7c7c48](https://github.com/toptal/picasso/commit/a7c7c48))

# [3.19.0](https://github.com/toptal/picasso/compare/v3.18.0...v3.19.0) (2019-10-04)


### Features

* add DatePicker ([#736](https://github.com/toptal/picasso/issues/736)) ([9d0f506](https://github.com/toptal/picasso/commit/9d0f506))

# [3.18.0](https://github.com/toptal/picasso/compare/v3.17.4...v3.18.0) (2019-10-04)


### Features

* **Modal:** add sizes ([#756](https://github.com/toptal/picasso/issues/756)) ([49fb70d](https://github.com/toptal/picasso/commit/49fb70d))

## [3.17.4](https://github.com/toptal/picasso/compare/v3.17.3...v3.17.4) (2019-10-04)


### Bug Fixes

* **dropdown:** popper scrolling away ([#732](https://github.com/toptal/picasso/issues/732)) ([211dca8](https://github.com/toptal/picasso/commit/211dca8))

## [3.17.3](https://github.com/toptal/picasso/compare/v3.17.2...v3.17.3) (2019-10-03)


### Bug Fixes

* font loader for FF ([#750](https://github.com/toptal/picasso/issues/750)) ([5ba7ab0](https://github.com/toptal/picasso/commit/5ba7ab0))

## [3.17.2](https://github.com/toptal/picasso/compare/v3.17.1...v3.17.2) (2019-10-03)


### Bug Fixes

* **Typography:** add underline ([#744](https://github.com/toptal/picasso/issues/744)) ([8e63282](https://github.com/toptal/picasso/commit/8e63282))

## [3.17.1](https://github.com/toptal/picasso/compare/v3.17.0...v3.17.1) (2019-10-02)


### Bug Fixes

* **Input:** add ability to disable autofill for input ([#739](https://github.com/toptal/picasso/issues/739)) ([75c742c](https://github.com/toptal/picasso/commit/75c742c))

# [3.17.0](https://github.com/toptal/picasso/compare/v3.16.1...v3.17.0) (2019-10-02)


### Features

* **Autocomplete:** add error prop ([#742](https://github.com/toptal/picasso/issues/742)) ([9235f92](https://github.com/toptal/picasso/commit/9235f92))

## [3.16.1](https://github.com/toptal/picasso/compare/v3.16.0...v3.16.1) (2019-10-02)


### Bug Fixes

* **DropdownArrow:** added sizes for dropdown ([#741](https://github.com/toptal/picasso/issues/741)) ([a1e72dc](https://github.com/toptal/picasso/commit/a1e72dc))

# [3.16.0](https://github.com/toptal/picasso/compare/v3.15.2...v3.16.0) (2019-10-02)


### Features

* **Modal:** [FX-497] Change useModal hook api ([#737](https://github.com/toptal/picasso/issues/737)) ([f46fcc3](https://github.com/toptal/picasso/commit/f46fcc3))

## [3.15.2](https://github.com/toptal/picasso/compare/v3.15.1...v3.15.2) (2019-10-02)


### Bug Fixes

* **Menu:** refresh submenus in drill down ([#731](https://github.com/toptal/picasso/issues/731)) ([7905e7a](https://github.com/toptal/picasso/commit/7905e7a))

## [3.15.1](https://github.com/toptal/picasso/compare/v3.15.0...v3.15.1) (2019-09-30)


### Bug Fixes

* **EnvironmentBanner:** banner no longer steals clicks ([#726](https://github.com/toptal/picasso/issues/726)) ([f4ee655](https://github.com/toptal/picasso/commit/f4ee655)), closes [#725](https://github.com/toptal/picasso/issues/725)

# [3.15.0](https://github.com/toptal/picasso/compare/v3.14.0...v3.15.0) (2019-09-27)


### Features

* **Autocomplate:** icon, startAdornment, endAdornment ([#717](https://github.com/toptal/picasso/issues/717)) ([072e745](https://github.com/toptal/picasso/commit/072e745))

# [3.14.0](https://github.com/toptal/picasso/compare/v3.13.0...v3.14.0) (2019-09-26)


### Features

* **icon:** update color prop ([#712](https://github.com/toptal/picasso/issues/712)) ([f20cc41](https://github.com/toptal/picasso/commit/f20cc41))

# [3.13.0](https://github.com/toptal/picasso/compare/v3.12.2...v3.13.0) (2019-09-26)


### Features

* [FX-344] Activate tree-shaking for Picasso ([#714](https://github.com/toptal/picasso/issues/714)) ([349af61](https://github.com/toptal/picasso/commit/349af61))

## [3.12.2](https://github.com/toptal/picasso/compare/v3.12.1...v3.12.2) (2019-09-26)


### Bug Fixes

* **Menu:** fix arrow navigation ([#718](https://github.com/toptal/picasso/issues/718)) ([d5a2f70](https://github.com/toptal/picasso/commit/d5a2f70))

## [3.12.1](https://github.com/toptal/picasso/compare/v3.12.0...v3.12.1) (2019-09-25)


### Bug Fixes

* **sidebar & page header menu:** dropdown offsets ([#713](https://github.com/toptal/picasso/issues/713)) ([bd552cc](https://github.com/toptal/picasso/commit/bd552cc))

# [3.12.0](https://github.com/toptal/picasso/compare/v3.11.6...v3.12.0) (2019-09-24)


### Features

* **link:** add color prop ([#700](https://github.com/toptal/picasso/issues/700)) ([827684a](https://github.com/toptal/picasso/commit/827684a))

## [3.11.6](https://github.com/toptal/picasso/compare/v3.11.5...v3.11.6) (2019-09-24)


### Bug Fixes

* **TableCell:** children prop should be optional ([#687](https://github.com/toptal/picasso/issues/687)) ([a8f1729](https://github.com/toptal/picasso/commit/a8f1729))

## [3.11.5](https://github.com/toptal/picasso/compare/v3.11.4...v3.11.5) (2019-09-24)


### Bug Fixes

* **MenuItem:** remove useless class that provides a warning ([#711](https://github.com/toptal/picasso/issues/711)) ([66e466b](https://github.com/toptal/picasso/commit/66e466b))

## [3.11.4](https://github.com/toptal/picasso/compare/v3.11.3...v3.11.4) (2019-09-23)


### Bug Fixes

* **Picasso:** fix usePicassoRoot hook ([#710](https://github.com/toptal/picasso/issues/710)) ([2992ffc](https://github.com/toptal/picasso/commit/2992ffc))

## [3.11.3](https://github.com/toptal/picasso/compare/v3.11.2...v3.11.3) (2019-09-23)


### Bug Fixes

* **Autocomplete:** allow disabling default chrome autocomplete ([#706](https://github.com/toptal/picasso/issues/706)) ([05ed206](https://github.com/toptal/picasso/commit/05ed206))

## [3.11.2](https://github.com/toptal/picasso/compare/v3.11.1...v3.11.2) (2019-09-20)


### Bug Fixes

* **PageHeader:** title optional prop ([#704](https://github.com/toptal/picasso/issues/704)) ([98d0b06](https://github.com/toptal/picasso/commit/98d0b06))

## [3.11.1](https://github.com/toptal/picasso/compare/v3.11.0...v3.11.1) (2019-09-20)


### Bug Fixes

* **Page:** add flex to the Page.Content to simplify page layout ([#676](https://github.com/toptal/picasso/issues/676)) ([ddefacb](https://github.com/toptal/picasso/commit/ddefacb))

# [3.11.0](https://github.com/toptal/picasso/compare/v3.10.1...v3.11.0) (2019-09-19)


### Features

* **Menu:** [FX-436] drill-down functionality ([#684](https://github.com/toptal/picasso/issues/684)) ([3219579](https://github.com/toptal/picasso/commit/3219579)), closes [#2](https://github.com/toptal/picasso/issues/2) [#3](https://github.com/toptal/picasso/issues/3)

## [3.10.1](https://github.com/toptal/picasso/compare/v3.10.0...v3.10.1) (2019-09-19)


### Bug Fixes

* **utils:** expose controlled and uncontrolled mode hooks ([#697](https://github.com/toptal/picasso/issues/697)) ([583545f](https://github.com/toptal/picasso/commit/583545f))

# [3.10.0](https://github.com/toptal/picasso/compare/v3.9.0...v3.10.0) (2019-09-19)


### Features

* **Modal:** add useModal hook ([#694](https://github.com/toptal/picasso/issues/694)) ([bf2270f](https://github.com/toptal/picasso/commit/bf2270f))

# [3.9.0](https://github.com/toptal/picasso/compare/v3.8.7...v3.9.0) (2019-09-19)


### Features

* **autocomplete:** add custom renderer for an option ([#690](https://github.com/toptal/picasso/issues/690)) ([ab566df](https://github.com/toptal/picasso/commit/ab566df))

## [3.8.7](https://github.com/toptal/picasso/compare/v3.8.6...v3.8.7) (2019-09-18)


### Bug Fixes

* **Sidebar:** fix auto-closing on small screens ([#695](https://github.com/toptal/picasso/issues/695)) ([428ca2f](https://github.com/toptal/picasso/commit/428ca2f))

## [3.8.6](https://github.com/toptal/picasso/compare/v3.8.5...v3.8.6) (2019-09-18)


### Bug Fixes

* **autocomplete:** remove debouncing ([#682](https://github.com/toptal/picasso/issues/682)) ([6100769](https://github.com/toptal/picasso/commit/6100769))

## [3.8.5](https://github.com/toptal/picasso/compare/v3.8.4...v3.8.5) (2019-09-17)


### Bug Fixes

* **Accordion:** support inline components in content ([#688](https://github.com/toptal/picasso/issues/688)) ([59b0b61](https://github.com/toptal/picasso/commit/59b0b61))

## [3.8.4](https://github.com/toptal/picasso/compare/v3.8.3...v3.8.4) (2019-09-17)


### Bug Fixes

* visal test build image ([#691](https://github.com/toptal/picasso/issues/691)) ([a3f6ceb](https://github.com/toptal/picasso/commit/a3f6ceb))

## [3.8.3](https://github.com/toptal/picasso/compare/v3.8.2...v3.8.3) (2019-09-17)


### Bug Fixes

* **Modal:** fix close icon with content ([#686](https://github.com/toptal/picasso/issues/686)) ([1a15f24](https://github.com/toptal/picasso/commit/1a15f24))

## [3.8.2](https://github.com/toptal/picasso/compare/v3.8.1...v3.8.2) (2019-09-17)


### Bug Fixes

* **Icon:** [FX-456] Update miss-aligned icons inside viewbox ([#685](https://github.com/toptal/picasso/issues/685)) ([4bc7fa2](https://github.com/toptal/picasso/commit/4bc7fa2))

## [3.8.1](https://github.com/toptal/picasso/compare/v3.8.0...v3.8.1) (2019-09-16)


### Bug Fixes

* **Sidebar:** fix position on small screens ([#680](https://github.com/toptal/picasso/issues/680)) ([b862fa9](https://github.com/toptal/picasso/commit/b862fa9))

# [3.8.0](https://github.com/toptal/picasso/compare/v3.7.1...v3.8.0) (2019-09-13)


### Features

* add EnvironmentBanner component ([#674](https://github.com/toptal/picasso/issues/674)) ([f32ded0](https://github.com/toptal/picasso/commit/f32ded0))
* **Page:** make responsive page ([#656](https://github.com/toptal/picasso/issues/656)) ([4ff7a06](https://github.com/toptal/picasso/commit/4ff7a06))

## [3.7.1](https://github.com/toptal/picasso/compare/v3.7.0...v3.7.1) (2019-09-13)


### Bug Fixes

* **Menu:** export static props for Menu to fix ts type check ([#677](https://github.com/toptal/picasso/issues/677)) ([83d5908](https://github.com/toptal/picasso/commit/83d5908))

# [3.7.0](https://github.com/toptal/picasso/compare/v3.6.1...v3.7.0) (2019-09-12)


### Features

* add ThumbsUp and ThumbsDown icons ([#675](https://github.com/toptal/picasso/issues/675)) ([d4411c1](https://github.com/toptal/picasso/commit/d4411c1))

## [3.6.1](https://github.com/toptal/picasso/compare/v3.6.0...v3.6.1) (2019-09-12)


### Bug Fixes

* **Dropdown:** disable autofocus by default ([#657](https://github.com/toptal/picasso/issues/657)) ([7e29a8c](https://github.com/toptal/picasso/commit/7e29a8c)), closes [#664](https://github.com/toptal/picasso/issues/664) [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653) [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653)

# [3.6.0](https://github.com/toptal/picasso/compare/v3.5.0...v3.6.0) (2019-09-12)


### Features

* **Icon:** filter and sort icons ([#664](https://github.com/toptal/picasso/issues/664)) ([8dc3698](https://github.com/toptal/picasso/commit/8dc3698)), closes [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653)

# [3.5.0](https://github.com/toptal/picasso/compare/v3.4.1...v3.5.0) (2019-09-11)


### Bug Fixes

* add read/write rights for jenkins user for release ([#669](https://github.com/toptal/picasso/issues/669)) ([298dc26](https://github.com/toptal/picasso/commit/298dc26))
* fix release by adding ci env variable ([#666](https://github.com/toptal/picasso/issues/666)) ([6a002fe](https://github.com/toptal/picasso/commit/6a002fe))
* fix release ci build ([#668](https://github.com/toptal/picasso/issues/668)) ([d6f891b](https://github.com/toptal/picasso/commit/d6f891b))
* fix release ci job ([#667](https://github.com/toptal/picasso/issues/667)) ([1e97ae5](https://github.com/toptal/picasso/commit/1e97ae5))
* **autocomplete:** auto highlight first option ([#663](https://github.com/toptal/picasso/issues/663)) ([31552a0](https://github.com/toptal/picasso/commit/31552a0))
* **autocomplete:** fix diverse issues ([#654](https://github.com/toptal/picasso/issues/654)) ([c46dda6](https://github.com/toptal/picasso/commit/c46dda6))
* **autocomplete:** fix missing details ([#661](https://github.com/toptal/picasso/issues/661)) ([1bbe9ed](https://github.com/toptal/picasso/commit/1bbe9ed))
* **Sidebar:** [FX-384] Fix minWidth for Sidebar, add page sidebar tutorial ([#655](https://github.com/toptal/picasso/issues/655)) ([b673d8d](https://github.com/toptal/picasso/commit/b673d8d))


### Features

* allow 'defaultExpanded' prop for SidebarItem for plugging to re… ([#653](https://github.com/toptal/picasso/issues/653)) ([7088e16](https://github.com/toptal/picasso/commit/7088e16))

## [3.4.1](https://github.com/toptal/picasso/compare/v3.4.0...v3.4.1) (2019-09-03)


### Bug Fixes

* remove spacing on the left from an iconless sidebar menu item ([#640](https://github.com/toptal/picasso/issues/640)) ([65a5b43](https://github.com/toptal/picasso/commit/65a5b43))

# [3.4.0](https://github.com/toptal/picasso/compare/v3.3.0...v3.4.0) (2019-09-03)


### Features

* make Picasso publicly accessible ([#637](https://github.com/toptal/picasso/issues/637)) ([c3f1b43](https://github.com/toptal/picasso/commit/c3f1b43))

# [3.3.0](https://github.com/toptal/picasso/compare/v3.2.2...v3.3.0) (2019-09-02)


### Features

* **Link:** extend `as` prop type definition ([#626](https://github.com/toptal/picasso/issues/626)) ([85a5952](https://github.com/toptal/picasso/commit/85a5952))

## [3.2.2](https://github.com/toptal/picasso/compare/v3.2.1...v3.2.2) (2019-08-30)


### Bug Fixes

* **tagselector:** fix input style override ([#636](https://github.com/toptal/picasso/issues/636)) ([b2e1492](https://github.com/toptal/picasso/commit/b2e1492))

## [3.2.1](https://github.com/toptal/picasso/compare/v3.2.0...v3.2.1) (2019-08-28)


### Bug Fixes

* master release job increase timeout ([#635](https://github.com/toptal/picasso/issues/635)) ([6d26ef0](https://github.com/toptal/picasso/commit/6d26ef0))

# [3.2.0](https://github.com/toptal/picasso/compare/v3.1.1...v3.2.0) (2019-08-28)


### Features

* add tagselector component ([#617](https://github.com/toptal/picasso/issues/617)) ([378bc19](https://github.com/toptal/picasso/commit/378bc19))

## [3.1.1](https://github.com/toptal/picasso/compare/v3.1.0...v3.1.1) (2019-08-28)


### Bug Fixes

* [FX-391] Fix loading fonts multiple times if many Picasso roots ([#633](https://github.com/toptal/picasso/issues/633)) ([c687fc3](https://github.com/toptal/picasso/commit/c687fc3))

# [3.1.0](https://github.com/toptal/picasso/compare/v3.0.1...v3.1.0) (2019-08-27)


### Features

* **Button:** add augmentation with as prop ([#630](https://github.com/toptal/picasso/issues/630)) ([fb3682e](https://github.com/toptal/picasso/commit/fb3682e))

## [3.0.1](https://github.com/toptal/picasso/compare/v3.0.0...v3.0.1) (2019-08-27)


### Bug Fixes

* [FX-386] Export missing props to unlock styled components typing ([#627](https://github.com/toptal/picasso/issues/627)) ([83ed4ae](https://github.com/toptal/picasso/commit/83ed4ae))

# [3.0.0](https://github.com/toptal/picasso/compare/v2.27.1...v3.0.0) (2019-08-23)


### Bug Fixes

* **Accordion:** fix Accordion styles ([#592](https://github.com/toptal/picasso/issues/592)) ([c2636b9](https://github.com/toptal/picasso/commit/c2636b9))
* **Accordion:** fix an issue with no children rendered ([b9d198e](https://github.com/toptal/picasso/commit/b9d198e))
* **CssBaseline:** [FX-368] Use our own css baseline ([#595](https://github.com/toptal/picasso/issues/595)) ([bf9052c](https://github.com/toptal/picasso/commit/bf9052c))
* **Grid:** divide Picasso grid spacing according to MUI ([#586](https://github.com/toptal/picasso/issues/586)) ([41b9783](https://github.com/toptal/picasso/commit/41b9783))
* **paper:** fix default text color ([#594](https://github.com/toptal/picasso/issues/594)) ([5522976](https://github.com/toptal/picasso/commit/5522976))
* **Select:** issues after upgrade to MUI v4 ([#590](https://github.com/toptal/picasso/issues/590)) ([7c34698](https://github.com/toptal/picasso/commit/7c34698))
* **Slider:** [FX-378] Move Slider from lab to core ([#596](https://github.com/toptal/picasso/issues/596)) ([58e33b9](https://github.com/toptal/picasso/commit/58e33b9))
* **Table:** adjust cell paddings ([#591](https://github.com/toptal/picasso/issues/591)) ([550d901](https://github.com/toptal/picasso/commit/550d901))
* **Tabs:** after upgrade to v4 ([#593](https://github.com/toptal/picasso/issues/593)) ([07dcef8](https://github.com/toptal/picasso/commit/07dcef8))
* fix disabled state for Checkbox and Radio ([#587](https://github.com/toptal/picasso/issues/587)) ([bc73cea](https://github.com/toptal/picasso/commit/bc73cea))
* **Tooltip:** issues after upgrade to v4 ([#581](https://github.com/toptal/picasso/issues/581)) ([65676e0](https://github.com/toptal/picasso/commit/65676e0))
* **Typography:** fix typography, baseline visual issues ([#585](https://github.com/toptal/picasso/issues/585)) ([68e8aec](https://github.com/toptal/picasso/commit/68e8aec))


### chore

* **TextField:** remove deprecated props and rename to Input ([#606](https://github.com/toptal/picasso/issues/606)) ([1d63602](https://github.com/toptal/picasso/commit/1d63602))
* rename `justifyContent` prop in Grid to match Container ([#600](https://github.com/toptal/picasso/issues/600)) ([8da9a02](https://github.com/toptal/picasso/commit/8da9a02))
* **Icon:** delete deprecated icon components ([#598](https://github.com/toptal/picasso/issues/598)) ([b37be08](https://github.com/toptal/picasso/commit/b37be08))
* **Icon:** remove deprecated prop `size` from icons ([#599](https://github.com/toptal/picasso/issues/599)) ([033a5ac](https://github.com/toptal/picasso/commit/033a5ac))


### Features

* [FX-377] Forward refs for all components ([#612](https://github.com/toptal/picasso/issues/612)) ([677af2e](https://github.com/toptal/picasso/commit/677af2e))
* [FX-377] Proxy ref from forwardRef to FileInput ([#621](https://github.com/toptal/picasso/issues/621)) ([54668a3](https://github.com/toptal/picasso/commit/54668a3))
* upgrade MUI to v4 ([29d14bd](https://github.com/toptal/picasso/commit/29d14bd))


### BREAKING CHANGES

* **TextField:** TextField component to Input
* **Slider:** Slider component has been moved from `@toptal/picasso/lab` to `@toptal/picasso`
* rename `justify` prop in `Grid`  to `justifyContent`
* **Icon:** remove deprecated prop `size` from icons
* **Icon:** icon components deprecated in v2 have been fully removed in v3. To obtain support migrating these components, check: https://toptal-core.atlassian.net/wiki/x/boACG

## [2.27.1](https://github.com/toptal/picasso/compare/v2.27.0...v2.27.1) (2019-08-23)


### Bug Fixes

* **Checkbox:** adjust multiline label ([#615](https://github.com/toptal/picasso/issues/615)) ([90cfb2a](https://github.com/toptal/picasso/commit/90cfb2a))

# [2.27.0](https://github.com/toptal/picasso/compare/v2.26.4...v2.27.0) (2019-08-21)


### Features

* **Label:** add `white `variant to Label ([#607](https://github.com/toptal/picasso/issues/607)) ([5b62a0d](https://github.com/toptal/picasso/commit/5b62a0d))

## [2.26.4](https://github.com/toptal/picasso/compare/v2.26.3...v2.26.4) (2019-08-20)


### Bug Fixes

* **breakpoints:** fix useScreenSize hook ([#611](https://github.com/toptal/picasso/issues/611)) ([86a2caa](https://github.com/toptal/picasso/commit/86a2caa))

## [2.26.3](https://github.com/toptal/picasso/compare/v2.26.2...v2.26.3) (2019-08-19)


### Bug Fixes

* **autocomplete:** fix onchange event firing too often ([d9f3dcf](https://github.com/toptal/picasso/commit/d9f3dcf))
* **autocomplete:** fix onchange event firing too often ([aea8e4c](https://github.com/toptal/picasso/commit/aea8e4c))

## [2.26.2](https://github.com/toptal/picasso/compare/v2.26.1...v2.26.2) (2019-08-16)


### Bug Fixes

* **components:** reduce deprecation noise ([#597](https://github.com/toptal/picasso/issues/597)) ([e251579](https://github.com/toptal/picasso/commit/e251579))

## [2.26.1](https://github.com/toptal/picasso/compare/v2.26.0...v2.26.1) (2019-08-14)


### Bug Fixes

* [FX-370] Fix disabled label opacity for Radio and Checkbox ([#588](https://github.com/toptal/picasso/issues/588)) ([661bb1f](https://github.com/toptal/picasso/commit/661bb1f))

# [2.26.0](https://github.com/toptal/picasso/compare/v2.25.0...v2.26.0) (2019-08-13)


### Features

* **Slider:** add Slider component ([#576](https://github.com/toptal/picasso/issues/576)) ([c5d70f6](https://github.com/toptal/picasso/commit/c5d70f6))

# [2.25.0](https://github.com/toptal/picasso/compare/v2.24.0...v2.25.0) (2019-08-12)


### Features

* **Sidebar:** add dark variant ([#575](https://github.com/toptal/picasso/issues/575)) ([41744a9](https://github.com/toptal/picasso/commit/41744a9))

# [2.24.0](https://github.com/toptal/picasso/compare/v2.23.3...v2.24.0) (2019-08-09)


### Features

* **Sidebar:** implement Sidebar component ([#574](https://github.com/toptal/picasso/issues/574)) ([80f0add](https://github.com/toptal/picasso/commit/80f0add))

## [2.23.3](https://github.com/toptal/picasso/compare/v2.23.2...v2.23.3) (2019-08-07)


### Bug Fixes

* **textfield:** add new placeholder color to palette ([#573](https://github.com/toptal/picasso/issues/573)) ([b18bea4](https://github.com/toptal/picasso/commit/b18bea4))

## [2.23.2](https://github.com/toptal/picasso/compare/v2.23.1...v2.23.2) (2019-08-02)


### Bug Fixes

* **Autocomplete:** allow to pass any value to Autocomplete ([#568](https://github.com/toptal/picasso/issues/568)) ([c2c04d8](https://github.com/toptal/picasso/commit/c2c04d8))

## [2.23.1](https://github.com/toptal/picasso/compare/v2.23.0...v2.23.1) (2019-08-01)


### Performance Improvements

* use transpileOnly for ts-loader ([#567](https://github.com/toptal/picasso/issues/567)) ([842245e](https://github.com/toptal/picasso/commit/842245e))

# [2.23.0](https://github.com/toptal/picasso/compare/v2.22.0...v2.23.0) (2019-08-01)


### Features

* **Notification:** [FX-349] Add notifications stream ([#564](https://github.com/toptal/picasso/issues/564)) ([49e3b79](https://github.com/toptal/picasso/commit/49e3b79))

# [2.22.0](https://github.com/toptal/picasso/compare/v2.21.0...v2.22.0) (2019-07-31)


### Features

* **Autocomplete:** update autocomplete to accept Select options ([#562](https://github.com/toptal/picasso/issues/562)) ([493eac0](https://github.com/toptal/picasso/commit/493eac0))

# [2.21.0](https://github.com/toptal/picasso/compare/v2.20.0...v2.21.0) (2019-07-30)


### Features

* **Button:** add flat-white variant ([#565](https://github.com/toptal/picasso/issues/565)) ([ebcb4d5](https://github.com/toptal/picasso/commit/ebcb4d5))

# [2.20.0](https://github.com/toptal/picasso/compare/v2.19.1...v2.20.0) (2019-07-29)


### Features

* add MonthSelect and YearSelect components ([#557](https://github.com/toptal/picasso/issues/557)) ([0809c99](https://github.com/toptal/picasso/commit/0809c99))

## [2.19.1](https://github.com/toptal/picasso/compare/v2.19.0...v2.19.1) (2019-07-24)


### Bug Fixes

* update vulnerable dependencies to the latest versions ([#553](https://github.com/toptal/picasso/issues/553)) ([a47a89f](https://github.com/toptal/picasso/commit/a47a89f))

# [2.19.0](https://github.com/toptal/picasso/compare/v2.18.3...v2.19.0) (2019-07-22)


### Features

* **icon:** add ui guidelines and performance icons ([#559](https://github.com/toptal/picasso/issues/559)) ([0f3e7be](https://github.com/toptal/picasso/commit/0f3e7be))

## [2.18.3](https://github.com/toptal/picasso/compare/v2.18.2...v2.18.3) (2019-07-19)


### Bug Fixes

* **MenuItem:** allow to use MenuItem as react-router link ([#558](https://github.com/toptal/picasso/issues/558)) ([da4f7fe](https://github.com/toptal/picasso/commit/da4f7fe))

## [2.18.2](https://github.com/toptal/picasso/compare/v2.18.1...v2.18.2) (2019-07-19)


### Bug Fixes

* **Picasso:** refactor reset styles and portal destination ([#556](https://github.com/toptal/picasso/issues/556)) ([7138341](https://github.com/toptal/picasso/commit/7138341))

## [2.18.1](https://github.com/toptal/picasso/compare/v2.18.0...v2.18.1) (2019-07-16)


### Bug Fixes

* **Accordion:** adjust accordion styles for single item ([#551](https://github.com/toptal/picasso/issues/551)) ([11bd998](https://github.com/toptal/picasso/commit/11bd998))

# [2.18.0](https://github.com/toptal/picasso/compare/v2.17.0...v2.18.0) (2019-07-15)


### Features

* **typography:** add dark-grey color ([#510](https://github.com/toptal/picasso/issues/510)) ([b316dbe](https://github.com/toptal/picasso/commit/b316dbe))

# [2.17.0](https://github.com/toptal/picasso/compare/v2.16.1...v2.17.0) (2019-07-10)


### Bug Fixes

* **ShowMore:** remove icon leftover after its rotation ([#541](https://github.com/toptal/picasso/issues/541)) ([db912fd](https://github.com/toptal/picasso/commit/db912fd))


### Features

* **Dropdown:** add `onOpen` and `onClose` event handlers ([#538](https://github.com/toptal/picasso/issues/538)) ([cb4d055](https://github.com/toptal/picasso/commit/cb4d055))

## [2.16.1](https://github.com/toptal/picasso/compare/v2.16.0...v2.16.1) (2019-07-10)


### Bug Fixes

* **notification:** close icon margin ([#540](https://github.com/toptal/picasso/issues/540)) ([93b5669](https://github.com/toptal/picasso/commit/93b5669))

# [2.16.0](https://github.com/toptal/picasso/compare/v2.15.0...v2.16.0) (2019-07-10)


### Features

* **Link:** add invert prop ([#535](https://github.com/toptal/picasso/issues/535)) ([d5ae4ee](https://github.com/toptal/picasso/commit/d5ae4ee))

# [2.15.0](https://github.com/toptal/picasso/compare/v2.14.0...v2.15.0) (2019-07-09)


### Features

* **Label:** update colors and add disabled state ([#536](https://github.com/toptal/picasso/issues/536)) ([371ac62](https://github.com/toptal/picasso/commit/371ac62))

# [2.14.0](https://github.com/toptal/picasso/compare/v2.13.0...v2.14.0) (2019-07-08)


### Features

* **Helpbox:** implement Helpbox component ([#530](https://github.com/toptal/picasso/issues/530)) ([5afe038](https://github.com/toptal/picasso/commit/5afe038))

# [2.13.0](https://github.com/toptal/picasso/compare/v2.12.0...v2.13.0) (2019-07-05)


### Features

* **Autocomplete:** [FX-143] Add Autocomplete component ([#525](https://github.com/toptal/picasso/issues/525)) ([7f46aff](https://github.com/toptal/picasso/commit/7f46aff))

# [2.12.0](https://github.com/toptal/picasso/compare/v2.11.0...v2.12.0) (2019-07-05)


### Features

* spread native attributes ([#526](https://github.com/toptal/picasso/issues/526)) ([c0fe629](https://github.com/toptal/picasso/commit/c0fe629))

# [2.11.0](https://github.com/toptal/picasso/compare/v2.10.1...v2.11.0) (2019-07-04)


### Features

* **showmore:** add showmore component ([#502](https://github.com/toptal/picasso/issues/502)) ([7fa5db4](https://github.com/toptal/picasso/commit/7fa5db4))

## [2.10.1](https://github.com/toptal/picasso/compare/v2.10.0...v2.10.1) (2019-07-04)


### Bug Fixes

* **OutlinedInput:** spread props for TextField support ([#528](https://github.com/toptal/picasso/issues/528)) ([e4a8967](https://github.com/toptal/picasso/commit/e4a8967))

# [2.10.0](https://github.com/toptal/picasso/compare/v2.9.1...v2.10.0) (2019-07-03)


### Bug Fixes

* **icon:** update svg for Check icon ([#524](https://github.com/toptal/picasso/issues/524)) ([a7dfb40](https://github.com/toptal/picasso/commit/a7dfb40))


### Features

* **FileInput:** implement FileInput component ([#513](https://github.com/toptal/picasso/issues/513)) ([dd04ed0](https://github.com/toptal/picasso/commit/dd04ed0))

## [2.9.1](https://github.com/toptal/picasso/compare/v2.9.0...v2.9.1) (2019-07-01)


### Bug Fixes

* **button:** invalid markup ([#518](https://github.com/toptal/picasso/issues/518)) ([fd3d48d](https://github.com/toptal/picasso/commit/fd3d48d))

# [2.9.0](https://github.com/toptal/picasso/compare/v2.8.0...v2.9.0) (2019-06-29)


### Features

* **icon:** update whole icon library ([#491](https://github.com/toptal/picasso/issues/491)) ([1a224fd](https://github.com/toptal/picasso/commit/1a224fd))

# [2.8.0](https://github.com/toptal/picasso/compare/v2.7.5...v2.8.0) (2019-06-28)


### Features

* **Container:** add bordered prop ([#512](https://github.com/toptal/picasso/issues/512)) ([1d881fd](https://github.com/toptal/picasso/commit/1d881fd))

## [2.7.5](https://github.com/toptal/picasso/compare/v2.7.4...v2.7.5) (2019-06-28)


### Bug Fixes

* **button.group:** fix button style for secondary variant ([#475](https://github.com/toptal/picasso/issues/475)) ([a70c9ad](https://github.com/toptal/picasso/commit/a70c9ad))

## [2.7.4](https://github.com/toptal/picasso/compare/v2.7.3...v2.7.4) (2019-06-27)


### Bug Fixes

* **Table:** sync styles with base ([#504](https://github.com/toptal/picasso/issues/504)) ([aa8e710](https://github.com/toptal/picasso/commit/aa8e710))

## [2.7.3](https://github.com/toptal/picasso/compare/v2.7.2...v2.7.3) (2019-06-27)


### Bug Fixes

* **page-header:** prevent header from moving when dropdown is open ([#506](https://github.com/toptal/picasso/issues/506)) ([ed7337a](https://github.com/toptal/picasso/commit/ed7337a)), closes [#505](https://github.com/toptal/picasso/issues/505)

## [2.7.2](https://github.com/toptal/picasso/compare/v2.7.1...v2.7.2) (2019-06-25)


### Bug Fixes

* **TextField** pass native attributes correctly to the input ([#500](https://github.com/toptal/picasso/issues/500)) ([738cf93](https://github.com/toptal/picasso/commit/738cf93))

## [2.7.1](https://github.com/toptal/picasso/compare/v2.7.0...v2.7.1) (2019-06-24)


### Bug Fixes

* **accordion:** fix styles and editor docs ([#495](https://github.com/toptal/picasso/issues/495)) ([9adad1e](https://github.com/toptal/picasso/commit/9adad1e))

# [2.7.0](https://github.com/toptal/picasso/compare/v2.6.0...v2.7.0) (2019-06-24)


### Features

* **page-header-menu:** replace organization property with meta ([#487](https://github.com/toptal/picasso/issues/487)) ([de3882f](https://github.com/toptal/picasso/commit/de3882f))

# [2.6.0](https://github.com/toptal/picasso/compare/v2.5.0...v2.6.0) (2019-06-21)


### Features

* **accordion:** update styles accordingly with base ([#473](https://github.com/toptal/picasso/issues/473)) ([b984bca](https://github.com/toptal/picasso/commit/b984bca))

# [2.5.0](https://github.com/toptal/picasso/compare/v2.4.0...v2.5.0) (2019-06-21)


### Features

* **tabs:** add tabs component ([#478](https://github.com/toptal/picasso/issues/478)) ([479755d](https://github.com/toptal/picasso/commit/479755d))

# [2.4.0](https://github.com/toptal/picasso/compare/v2.3.0...v2.4.0) (2019-06-18)


### Features

* **TextField** add support of native input attributes ([#481](https://github.com/toptal/picasso/issues/481)) ([c2f882c](https://github.com/toptal/picasso/commit/c2f882c))

# [2.3.0](https://github.com/toptal/picasso/compare/v2.2.0...v2.3.0) (2019-06-18)


### Features

* **icon:** add crosshair icon ([#480](https://github.com/toptal/picasso/issues/480)) ([3d0937c](https://github.com/toptal/picasso/commit/3d0937c))

# [2.2.0](https://github.com/toptal/picasso/compare/v2.1.5...v2.2.0) (2019-06-14)


### Features

* **typography:** add yellow and light grey colors ([#467](https://github.com/toptal/picasso/issues/467)) ([56de5e6](https://github.com/toptal/picasso/commit/56de5e6)), closes [#464](https://github.com/toptal/picasso/issues/464)

## [2.1.5](https://github.com/toptal/picasso/compare/v2.1.4...v2.1.5) (2019-06-13)


### Bug Fixes

* **modal:** pass paperProps to enable custom styling of Modal dialog ([#465](https://github.com/toptal/picasso/issues/465)) ([cadcd68](https://github.com/toptal/picasso/commit/cadcd68))

## [2.1.4](https://github.com/toptal/picasso/compare/v2.1.3...v2.1.4) (2019-06-12)


### Bug Fixes

* **ci:** refactor release scripts ([#461](https://github.com/toptal/picasso/issues/461)) ([ae24f2a](https://github.com/toptal/picasso/commit/ae24f2a))

## [2.1.3](https://github.com/toptal/picasso/compare/v2.1.2...v2.1.3) (2019-06-12)


### Bug Fixes

* **ci:** fix incorrect generating of package.json ([#460](https://github.com/toptal/picasso/issues/460)) ([69718cb](https://github.com/toptal/picasso/commit/69718cb))

## [2.1.2](https://github.com/toptal/picasso/compare/v2.1.1...v2.1.2) (2019-06-12)


### Bug Fixes

* **ci:** allow installing picasso with git reference ([#458](https://github.com/toptal/picasso/issues/458)) ([8e0d7d2](https://github.com/toptal/picasso/commit/8e0d7d2))

## [2.1.1](https://github.com/toptal/picasso/compare/v2.1.0...v2.1.1) (2019-06-12)


### Bug Fixes

* **typography:** remove dropped bold font weight from typing ([#454](https://github.com/toptal/picasso/issues/454)) ([a27fd13](https://github.com/toptal/picasso/commit/a27fd13)), closes [#453](https://github.com/toptal/picasso/issues/453)

# [2.1.0](https://github.com/toptal/picasso/compare/v2.0.2...v2.1.0) (2019-06-10)


### Features

* **grid:** add wrap option ([#449](https://github.com/toptal/picasso/issues/449)) ([fa7f5a8](https://github.com/toptal/picasso/commit/fa7f5a8))

## [2.0.2](https://github.com/toptal/picasso/compare/v2.0.1...v2.0.2) (2019-06-10)


### Bug Fixes

* allow using Label and Link with Tooltip ([#432](https://github.com/toptal/picasso/issues/432)) ([d7fe5e7](https://github.com/toptal/picasso/commit/d7fe5e7))

## [2.0.1](https://github.com/toptal/picasso/compare/v2.0.0...v2.0.1) (2019-06-07)


### Bug Fixes

* **docs:** adjust changelog after major upgrade ([#448](https://github.com/toptal/picasso/issues/448)) ([dada27c](https://github.com/toptal/picasso/commit/dada27c))

# [2.0.0](https://github.com/toptal/picasso/compare/v1.9.3...v2.0.0) (2019-06-07)


### Bug Fixes

* **avatar:** change `Avatar` size for the `large` variant ([#416](https://github.com/toptal/picasso/issues/416)) ([68dd6ac](https://github.com/toptal/picasso/commit/68dd6ac))
* **dropdown:** change dropdown shadow elevation ([#433](https://github.com/toptal/picasso/issues/433)) ([235fba7](https://github.com/toptal/picasso/commit/235fba7))
* **loader:** change all `Loader` variant sizes ([#435](https://github.com/toptal/picasso/issues/435)) ([8e499cc](https://github.com/toptal/picasso/commit/8e499cc))
* **modal:** change design of `Modal` ([#343](https://github.com/toptal/picasso/issues/343)) ([8140e51](https://github.com/toptal/picasso/commit/8140e51))
* **radio:** change design of `Radio` and `Checkbox` components ([#369](https://github.com/toptal/picasso/issues/369)) ([50d8607](https://github.com/toptal/picasso/commit/50d8607))
* **stepper:** change `Stepper` margins and icon connector ([#437](https://github.com/toptal/picasso/issues/437)) ([b9043d4](https://github.com/toptal/picasso/commit/b9043d4))
* **table:** change design of `Table` component ([#365](https://github.com/toptal/picasso/issues/365)) ([d9f8090](https://github.com/toptal/picasso/commit/d9f8090))
* **text-field:** change design of `TextField` component ([#368](https://github.com/toptal/picasso/issues/368)) ([e288baf](https://github.com/toptal/picasso/commit/e288baf))
* **tooltip:** change size of an arrow and text for `Tooltip` ([#436](https://github.com/toptal/picasso/issues/436)) ([0091c7a](https://github.com/toptal/picasso/commit/0091c7a))
* **user-badge:** change `UserBadge` outer spacing ([#333](https://github.com/toptal/picasso/issues/333)) ([750e332](https://github.com/toptal/picasso/commit/750e332))


### Features

* **button:** add new variants for buttons ([3216787](https://github.com/toptal/picasso/commit/3216787))
* **colors:** change names and design of all colors ([#387](https://github.com/toptal/picasso/issues/387)) ([496dcdb](https://github.com/toptal/picasso/commit/496dcdb))
* **form:** add `Form.Error` component ([#410](https://github.com/toptal/picasso/issues/410)) ([cb329d7](https://github.com/toptal/picasso/commit/cb329d7))
* **form:** add new `Form.Label` component ([#372](https://github.com/toptal/picasso/issues/372)) ([f12e5f9](https://github.com/toptal/picasso/commit/f12e5f9))
* **label:** add ability to add `Icon` to `Label` component ([#396](https://github.com/toptal/picasso/issues/396)) ([1a10390](https://github.com/toptal/picasso/commit/1a10390))
* **page-header:** support enterprise variant for header ([#392](https://github.com/toptal/picasso/issues/392)) ([d0f9f61](https://github.com/toptal/picasso/commit/d0f9f61))
* **page-header-menu:** wrap header Menu to Page.HeaderMenu ([#406](https://github.com/toptal/picasso/issues/406)) ([0df9391](https://github.com/toptal/picasso/commit/0df9391))
* **pagination:** change design of `Pagination` component ([#412](https://github.com/toptal/picasso/issues/412)) ([989932a](https://github.com/toptal/picasso/commit/989932a))
* **select:** add ability to add icon to `Select` component ([#371](https://github.com/toptal/picasso/issues/371)) ([8b37458](https://github.com/toptal/picasso/commit/8b37458))
* **typography:** add new typography variants and colors ([#356](https://github.com/toptal/picasso/issues/356)) ([70dfb17](https://github.com/toptal/picasso/commit/70dfb17))


### BREAKING CHANGES

#### Select

* removed `variant` prop
* removed `label` prop

> You can check [Select](https://picasso.toptal.net/?path=/story/forms-folder--select) documentation.

#### Stepper

* stepper connector and margins were adjusted to larger
size.

> You can check [Stepper](https://picasso.toptal.net/?path=/story/components-folder--stepper#default) documentation.

#### Tooltip

* font size and pointing arrow size were adjusted for
`Tooltip` window.

> You can check [Tooltip](https://picasso.toptal.net/?path=/story/overlays-folder--tooltip#default) documentation.

#### Loader

* all sizes of `Loader` variants were adjusted. If you
had any static elements counting with size of a `Loader` please adjust
spacings accordingly.

New size list:

- *Small* `20` => `16`
- *Medium* `40` => `32`
- *Large* `80` => `64`

> You can check [Loader](https://picasso.toptal.net/?path=/story/components-folder--loader#sizes) documentation.

#### Avatar

* large `Avatar` is now a bit smaller. Please check your
layouts if you were directly using this variant.

> You can check [Avatar](https://picasso.toptal.net/?path=/story/components-folder--avatar#sizes) documentation.

#### Pagination

* pagination design and layout has been completely
revamped. Now the layout is much skinner and smaller and using default
buttons from UI kit. Please check your layouts.

> You can check [Pagination](https://picasso.toptal.net/?path=/story/components-folder--pagination#default) documentation.

#### UserBadge

* `children` is now wrapped to special component
which is exported as `Page.HeaderMenu` which accepts aggregated props
for `UserBadge` component. You should replace direct usage of `UserBadge`
inside `Header` with this new component.

* UserBadge outer spacing is now reduced, therefore check
your layouts which are using UserBadge as standalone component.

#### Page.Header

* header height has been adjusted and now is larger.
Check any elements which had fixed positions on layout if they need to
be adjusted to support new height of `Header`

* `zIndex` has been changed to `1100`

> You can check [Header](https://picasso.toptal.net/?path=/story/layout-folder--page#default) documentation.

#### Colors
* all colors shades which were specified as numbers, were
dropped and replaced with more semantic names.

New shade list:

- `100` => `lighter`
- `200` => `light`
- `300` => `main`
- `400` => `dark`
- `500` => `darker`

> You can check [Colors](https://picasso.toptal.net/?path=/story/utils-folder--colors) documentation.

* most of the colors were updated to the correct HEX
representations. Please use only those colors which are listed inside
documentation!

#### TextField

* spacing and size of TextField and Select has been
changed.
* `label` prop on `TextField` has been renamed to
`placeholder`. Achieving form field labels is now done by composing
field from new `Label` and `Hint` components.
* removed `inputLabelProps` prop

> You can check [Form](https://picasso.toptal.net/?path=/story/forms-folder--form#form-field) documentation.

#### Table

* decrease font size and paddings inside all `Table`
components. Layout of whole table is a bit skinnier now.

> You can check the full result in [Table](https://picasso.toptal.net/?path=/story/components-folder--table#plain-table) documentation.

#### Modal
* replaced `Title` and `CloseIcon` inside modal window
which makes layout and spacings a bit smaller now.

> You can check result in [Modal](https://picasso.toptal.net/?path=/story/overlays-folder--modal)
documentation.

#### Typography
* rename old `variant` type and introduce more semantic names for every variant.

New variant list:

- `heading`
- `body`

New size list:

- `small`
- `medium`
- `large`
- `xlarge`
- `inherit`

> You can check all variants inside [Typography](https://picasso.toptal.net/?path=/story/components-folder--typography)
documentation.

* all old variant names except `body` are now removed currently `Typography` styles are achieved with `variant`, `weight` and
`color` prop.

* remove all old `color` variants and rename them to more
semantic names.

- `primary` => `blue`
- `success` => `green`
- `error` => `red`
- `muted` => `grey`
- *New color:* `black`

#### Button

* rename old `variant` type and introduce more semantic
names for every variant

New variant list:

- `flat`
- `primary-blue`
- `primary-red`
- `primary-green`
- `secondary-blue`
- `secondary-red`
- `secondary-white`

> You can check full list of variants in [Button](https://picasso.toptal.net/?path=/story/components-folder--button#variants)
section of our documentation.

* remove `primary` variant and add multiple variants
with different intents.

> `primary` => `primary-blue`

* remove `secondary` variant and add multiple variants
with different intents.

> `secondary` => `secondary-blue`

* remove `success` variant and combine it with
primary variant.

> `success` => `primary-green`

* remove `error` variant and combine it with `primary`
and `secondary` variant.

> `error` => `primary-red`

* ***New Variant*** - `secondary-red`

* remove `basic` variant

#### AccountSelect

* layout has been changed

## [1.9.3](https://github.com/toptal/picasso/compare/v1.9.2...v1.9.3) (2019-06-06)


### Bug Fixes

* **ci:** run kill temploy job with cron ([#440](https://github.com/toptal/picasso/issues/440)) ([6018bae](https://github.com/toptal/picasso/commit/6018bae))

## [1.9.2](https://github.com/toptal/picasso/compare/v1.9.1...v1.9.2) (2019-06-04)


### Bug Fixes

* **ci:** post temploy comments only for PRs ([#429](https://github.com/toptal/picasso/issues/429)) ([53dac88](https://github.com/toptal/picasso/commit/53dac88))

## [1.9.1](https://github.com/toptal/picasso/compare/v1.9.0...v1.9.1) (2019-06-04)


### Bug Fixes

* **ci:** change folder structure of picasso docs ([#423](https://github.com/toptal/picasso/issues/423)) ([c9b961d](https://github.com/toptal/picasso/commit/c9b961d))

# [1.9.0](https://github.com/toptal/picasso/compare/v1.8.1...v1.9.0) (2019-06-03)


### Features

* **amount:** `amount` component to render currencies ([#418](https://github.com/toptal/picasso/issues/418)) ([b485826](https://github.com/toptal/picasso/commit/b485826))

## [1.8.1](https://github.com/toptal/picasso/compare/v1.8.0...v1.8.1) (2019-05-30)


### Bug Fixes

* **container:** add missing values to the `justifyContent` enum ([#409](https://github.com/toptal/picasso/issues/409)) ([b519782](https://github.com/toptal/picasso/commit/b519782))

# [1.8.0](https://github.com/toptal/picasso/compare/v1.7.4...v1.8.0) (2019-05-29)


### Features

* **icon:** add extra product icons ([#395](https://github.com/toptal/picasso/issues/395)) ([a5ee200](https://github.com/toptal/picasso/commit/a5ee200))

## [1.7.4](https://github.com/toptal/picasso/compare/v1.7.3...v1.7.4) (2019-05-28)


### Bug Fixes

* **button:** accept and proxy 'type' prop ([#373](https://github.com/toptal/picasso/issues/373)) ([395295d](https://github.com/toptal/picasso/commit/395295d))

## [1.7.3](https://github.com/toptal/picasso/compare/v1.7.2...v1.7.3) (2019-05-28)


### Bug Fixes

* **textfield:** add missing props ([#388](https://github.com/toptal/picasso/issues/388)) ([dc10b30](https://github.com/toptal/picasso/commit/dc10b30))

## [1.7.2](https://github.com/toptal/picasso/compare/v1.7.1...v1.7.2) (2019-05-28)


### Bug Fixes

* **radio:** fix interface definition for radio group ([#383](https://github.com/toptal/picasso/issues/383)) ([20de87c](https://github.com/toptal/picasso/commit/20de87c))

## [1.7.1](https://github.com/toptal/picasso/compare/v1.7.0...v1.7.1) (2019-05-27)


### Bug Fixes

* **header:** add proper zIndex on Page.Header ([#385](https://github.com/toptal/picasso/issues/385)) ([0d3d9f1](https://github.com/toptal/picasso/commit/0d3d9f1))

# [1.7.0](https://github.com/toptal/picasso/compare/v1.6.0...v1.7.0) (2019-05-27)


### Features

* **page-header:** add logoLink to PageHeader component ([#360](https://github.com/toptal/picasso/issues/360)) ([14e9a77](https://github.com/toptal/picasso/commit/14e9a77)), closes [#354](https://github.com/toptal/picasso/issues/354)

# [1.6.0](https://github.com/toptal/picasso/compare/v1.5.2...v1.6.0) (2019-05-17)


### Bug Fixes

* **textfield:** add autoFocus to TextField ([305b99e](https://github.com/toptal/picasso/commit/305b99e))


### Features

* **dropdown:** implement dropdown component ([834ef6a](https://github.com/toptal/picasso/commit/834ef6a))

## [1.5.2](https://github.com/toptal/picasso/compare/v1.5.1...v1.5.2) (2019-05-16)


### Bug Fixes

* **docs:** add contribution guide ([#277](https://github.com/toptal/picasso/issues/277)) ([f6d322d](https://github.com/toptal/picasso/commit/f6d322d))

## [1.5.1](https://github.com/toptal/picasso/compare/v1.5.0...v1.5.1) (2019-05-15)


### Bug Fixes

* **ci:** copy package.json to root and refactor releases ([#334](https://github.com/toptal/picasso/issues/334)) ([7610fd8](https://github.com/toptal/picasso/commit/7610fd8))

# [1.5.0](https://github.com/toptal/picasso/compare/v1.4.1...v1.5.0) (2019-05-15)


### Bug Fixes

* **ci:** update package.json with correct version after release ([#319](https://github.com/toptal/picasso/issues/319)) ([dbaf6ff](https://github.com/toptal/picasso/commit/dbaf6ff))


### Features

* trigger manual minor version change ([3e2f032](https://github.com/toptal/picasso/commit/3e2f032))

## [1.4.2](https://github.com/toptal/picasso/compare/v1.4.1...v1.4.2) (2019-05-15)


### Bug Fixes

* **ci:** update package.json with correct version after release ([#319](https://github.com/toptal/picasso/issues/319)) ([dbaf6ff](https://github.com/toptal/picasso/commit/dbaf6ff))

## [1.4.1](https://github.com/toptal/picasso/compare/v1.4.0...v1.4.1) (2019-05-15)


### Bug Fixes

* icons vertical alignment for Notification component ([#315](https://github.com/toptal/picasso/issues/315)) ([c3d6a7f](https://github.com/toptal/picasso/commit/c3d6a7f))

# [1.4.0](https://github.com/toptal/picasso/compare/v1.3.1...v1.4.0) (2019-05-14)


### Features

* **loader:** adjust color accordingly with BASE ([#317](https://github.com/toptal/picasso/issues/317)) ([88b4f12](https://github.com/toptal/picasso/commit/88b4f12))

## [1.3.1](https://github.com/toptal/picasso/compare/v1.3.0...v1.3.1) (2019-05-14)


### Bug Fixes

* Make some props not required for TextField, Select components ([#299](https://github.com/toptal/picasso/issues/299)) ([f97c7ce](https://github.com/toptal/picasso/commit/f97c7ce))

# [1.3.0](https://github.com/toptal/picasso/compare/v1.2.4...v1.3.0) (2019-05-13)


### Features

* **link:** adjust Link component and add docs ([#303](https://github.com/toptal/picasso/issues/303)) ([70313a9](https://github.com/toptal/picasso/commit/70313a9))

## [1.2.4](https://github.com/toptal/picasso/compare/v1.2.3...v1.2.4) (2019-05-13)


### Bug Fixes

* **docs:** fix layout tutorial example ([#310](https://github.com/toptal/picasso/issues/310)) ([82a0cc6](https://github.com/toptal/picasso/commit/82a0cc6))

## [1.2.3](https://github.com/toptal/picasso/compare/v1.2.2...v1.2.3) (2019-05-13)


### Bug Fixes

* **bash:** pascal case on linux ([#306](https://github.com/toptal/picasso/issues/306)) ([be55fb4](https://github.com/toptal/picasso/commit/be55fb4))

## [1.2.2](https://github.com/toptal/picasso/compare/v1.2.1...v1.2.2) (2019-05-10)


### Bug Fixes

* **storybook:** wrong Icon import path ([#309](https://github.com/toptal/picasso/issues/309)) ([b762249](https://github.com/toptal/picasso/commit/b762249)), closes [#308](https://github.com/toptal/picasso/issues/308)

## [1.2.1](https://github.com/toptal/picasso/compare/v1.2.0...v1.2.1) (2019-05-10)


### Bug Fixes

* [FX-154] Fix padding after removing padding for root ([#307](https://github.com/toptal/picasso/issues/307)) ([4fd84cb](https://github.com/toptal/picasso/commit/4fd84cb))

# [1.2.0](https://github.com/toptal/picasso/compare/v1.1.0...v1.2.0) (2019-05-10)


### Features

* **page-header:** [FX-154] Make PageHeader sticky ([#301](https://github.com/toptal/picasso/issues/301)) ([20fd7c0](https://github.com/toptal/picasso/commit/20fd7c0))

# [1.1.0](https://github.com/toptal/picasso/compare/v1.0.0...v1.1.0) (2019-05-09)


### Features

* **notification:** new notification component ([#275](https://github.com/toptal/picasso/issues/275)) ([cd5bc1d](https://github.com/toptal/picasso/commit/cd5bc1d))

# [1.0.0](https://github.com/toptal/picasso/compare/v0.3.1...v1.0.0) (2019-05-09)


### chore

* **timesheet:** migrate components into billing frontend ([#268](https://github.com/toptal/picasso/issues/268)) ([40e7583](https://github.com/toptal/picasso/commit/40e7583))


### BREAKING CHANGES

* **timesheet:** component removal

## [0.3.1](https://github.com/toptal/picasso/compare/v0.3.0...v0.3.1) (2019-05-08)


### Bug Fixes

* **ci:** fix pkgRoot while publishing to NPM ([d720b2f](https://github.com/toptal/picasso/commit/d720b2f))

# [0.3.0](https://github.com/toptal/picasso/compare/v0.2.0...v0.3.0) (2019-05-08)


### Features

* add title prop to UserBadge ([#267](https://github.com/toptal/picasso/issues/267)) ([247620b](https://github.com/toptal/picasso/commit/247620b))

# [0.2.0](https://github.com/toptal/picasso/compare/v0.1.0...v0.2.0) (2019-05-07)


### Bug Fixes

* **button:** pass icon.props.className in button component child icon ([#273](https://github.com/toptal/picasso/issues/273)) ([d4bb8bd](https://github.com/toptal/picasso/commit/d4bb8bd))
* **picasso:** expose types and `link` component ([#280](https://github.com/toptal/picasso/issues/280)) ([5ef3029](https://github.com/toptal/picasso/commit/5ef3029))


### Features

* add color property for Typography ([#261](https://github.com/toptal/picasso/issues/261)) ([f253a26](https://github.com/toptal/picasso/commit/f253a26))
* **button:** add circular style for the component ([#271](https://github.com/toptal/picasso/issues/271)) ([b645323](https://github.com/toptal/picasso/commit/b645323))
* **icon:** new notification icons ([#274](https://github.com/toptal/picasso/issues/274)) ([a2a3b45](https://github.com/toptal/picasso/commit/a2a3b45))
* [FX-141] Add Menu component ([#258](https://github.com/toptal/picasso/issues/258)) ([ccb55d4](https://github.com/toptal/picasso/commit/ccb55d4))
* initialize first semantic release ([d7ef6e4](https://github.com/toptal/picasso/commit/d7ef6e4))

# Changelog

## v0.1.0-beta.19 (25/04/2019)
*No changelog for this release.*

---

## v0.1.0-beta.18 (25/04/2019)

#### Chore

- [**Chore**] chore(docs): Speedup storybook builds on CI [#237](https://github.com/toptal/picasso/pull/237)

---

## v0.1.0-beta.17 (25/04/2019)

#### CI

- [**CI**] Fix docker problems with latest chromium [#240](https://github.com/toptal/picasso/pull/240)

#### Chore

- [**Chore**] Add issue templates for picasso board [#235](https://github.com/toptal/picasso/pull/235)
- [**Chore**] [FX-147] Group components doc pages by area of usage [#232](https://github.com/toptal/picasso/pull/232)

---

## v0.1.0-beta.16 (24/04/2019)

#### Chore

- [**Chore**] Update edited icons from Talent Onboarding Wizard [#220](https://github.com/toptal/picasso/pull/220)

#### WIP

- [**WIP**] [FX-52] Add IE11 support for Storybook [#233](https://github.com/toptal/picasso/pull/233)

#### depfu

- [**depfu**] Update ts-loader: 5.3.3 → 5.4.3 (minor) [#234](https://github.com/toptal/picasso/pull/234)
- [**depfu**] Update react-ace: 6.4.0 → 6.5.0 (minor) [#229](https://github.com/toptal/picasso/pull/229)
- [**depfu**] Update @typescript-eslint/parser: 1.6.0 → 1.7.0 (minor) [#228](https://github.com/toptal/picasso/pull/228)
- [**depfu**] Update @typescript-eslint/eslint-plugin: 1.6.0 → 1.7.0 (minor) [#225](https://github.com/toptal/picasso/pull/225)
- [**depfu**] Update @types/react: 16.8.13 → 16.8.14 (patch) [#224](https://github.com/toptal/picasso/pull/224)
- [**depfu**] Update typescript: 3.4.3 → 3.4.4 (patch) [#222](https://github.com/toptal/picasso/pull/222)

---

## v0.1.0-beta.15 (19/04/2019)

#### closed

- [**closed**] [FX-134] Add List example and Icon prop docs [#219](https://github.com/toptal/picasso/pull/219)

---

## v0.1.0-beta.14 (19/04/2019)

#### BREAKING CHANGE

- [**BREAKING CHANGE**][**Chore**] [FX-6] Simplify Loader component api [#207](https://github.com/toptal/picasso/pull/207)

#### Bugfix

- [**Bugfix**] Fix root height [#218](https://github.com/toptal/picasso/pull/218)

#### Chore

- [**Chore**] Remove prop-types as we don't use them anymore after move all components to TS [#216](https://github.com/toptal/picasso/pull/216)
- [**Chore**] [FX-44] Initial alias setup for types and components [#209](https://github.com/toptal/picasso/pull/209)
- [**Chore**] [FX-9] Automate adding icons process [#199](https://github.com/toptal/picasso/pull/199)

#### Feature

- [**Feature**] [FX-17] Add icons from Talent Onboarding Wizard project [#213](https://github.com/toptal/picasso/pull/213)
- [**Feature**] [FX-145] Add Stepper variant without labels and full-width [#204](https://github.com/toptal/picasso/pull/204)

#### closed

- [**closed**] Enable TS type definitions in build [#200](https://github.com/toptal/picasso/pull/200)

#### depfu

- [**depfu**] Update all of storybook: 5.0.9 → 5.0.10 (patch) [#217](https://github.com/toptal/picasso/pull/217)
- [**depfu**] Update @types/prop-types: 15.7.0 → 15.7.1 (patch) [#214](https://github.com/toptal/picasso/pull/214)
- [**depfu**] Update all of storybook: 5.0.8 → 5.0.9 (patch) [#212](https://github.com/toptal/picasso/pull/212)
- [**depfu**] Update eslint-plugin-import: 2.17.1 → 2.17.2 (patch) [#211](https://github.com/toptal/picasso/pull/211)
- [**depfu**] Upgrade yargs: 12.0.5 → 13.2.2 (major) [#206](https://github.com/toptal/picasso/pull/206)
- [**depfu**] Upgrade ts-jest: 23.10.5 → 24.0.2 (major) [#205](https://github.com/toptal/picasso/pull/205)
- [**depfu**] Update react-markdown: 4.0.6 → 4.0.8 (patch) [#203](https://github.com/toptal/picasso/pull/203)
- [**depfu**] Upgrade raw-loader: 1.0.0 → 2.0.0 (major) [#197](https://github.com/toptal/picasso/pull/197)
- [**depfu**] Update all of storybook: 5.0.7 → 5.0.8 (patch) [#202](https://github.com/toptal/picasso/pull/202)
- [**depfu**] Update eslint-plugin-import: 2.16.0 → 2.17.1 (minor) [#201](https://github.com/toptal/picasso/pull/201)
- [**depfu**] Update @svgr/cli: 4.1.0 → 4.2.0 (minor) [#195](https://github.com/toptal/picasso/pull/195)
- [**depfu**] Upgrade react-testing-library: 5.9.0 → 6.1.2 (major) [#198](https://github.com/toptal/picasso/pull/198)
- [**depfu**] Upgrade storybook-readme: 4.0.5 → 5.0.2 (major) [#196](https://github.com/toptal/picasso/pull/196)
- [**depfu**] Update all of storybook: 5.0.6 → 5.0.7 (patch) [#194](https://github.com/toptal/picasso/pull/194)
- [**depfu**] Update @types/react-dom: 16.8.3 → 16.8.4 (patch) [#193](https://github.com/toptal/picasso/pull/193)

---

## v0.1.0-beta.13 (15/04/2019)

#### Bugfix

- [**Bugfix**] [FX-62] Fix vertical alignment for icons inline [#160](https://github.com/toptal/picasso/pull/160)
- [**Bugfix**] Fix Button usage in Timesheets [#153](https://github.com/toptal/picasso/pull/153)

#### Chore

- [**Chore**] Initial change of rest and style, classname props [#161](https://github.com/toptal/picasso/pull/161)
- [**Chore**] [FX-76] Align size props in between components [#183](https://github.com/toptal/picasso/pull/183)
- [**Chore**] Add dependency badge to README [#172](https://github.com/toptal/picasso/pull/172)
- [**Chore**] [FX-67] Use Icons directly, remove IconLibrary [#157](https://github.com/toptal/picasso/pull/157)
- [**Chore**] Change shadows according to new design specs [#152](https://github.com/toptal/picasso/pull/152)

#### Feature

- [**Feature**] [FX-16] Component stepper [#190](https://github.com/toptal/picasso/pull/190)
- [**Feature**] [FX-123] Component user badge [#156](https://github.com/toptal/picasso/pull/156)

#### depfu

- [**depfu**] Update jest-environment-puppeteer: 4.1.0 → 4.1.1 (patch) [#192](https://github.com/toptal/picasso/pull/192)
- [**depfu**] Update jest-puppeteer: 4.1.0 → 4.1.1 (patch) [#191](https://github.com/toptal/picasso/pull/191)
- [**depfu**] Upgrade prettier-standard: 8.0.1 → 9.1.1 (major) [#189](https://github.com/toptal/picasso/pull/189)
- [**depfu**] Upgrade jest-puppeteer: 3.9.1 → 4.1.0 (major) [#188](https://github.com/toptal/picasso/pull/188)
- [**depfu**] Upgrade hygen: 2.1.2 → 4.0.2 (major) [#187](https://github.com/toptal/picasso/pull/187)
- [**depfu**] Upgrade eslint-config-prettier: 3.6.0 → 4.1.0 (major) [#186](https://github.com/toptal/picasso/pull/186)
- [**depfu**] Upgrade jest: 23.6.0 → 24.7.1 (major) [#185](https://github.com/toptal/picasso/pull/185)
- [**depfu**] Upgrade @types/jest: 23.3.14 → 24.0.11 (major) [#184](https://github.com/toptal/picasso/pull/184)
- [**depfu**] Upgrade eslint-plugin-react: 7.11.1 → 7.12.4 (minor) [#182](https://github.com/toptal/picasso/pull/182)
- [**depfu**] Update typescript: 3.3.3333 → 3.4.3 (minor) [#181](https://github.com/toptal/picasso/pull/181)
- [**depfu**] Update regenerator-runtime: 0.13.1 → 0.13.2 (minor) [#180](https://github.com/toptal/picasso/pull/180)
- [**depfu**] Update puppeteer: 1.13.0 → 1.14.0 (minor) [#179](https://github.com/toptal/picasso/pull/179)
- [**depfu**] Update jest-environment-puppeteer: 4.0.0 → 4.1.0 (minor) [#178](https://github.com/toptal/picasso/pull/178)
- [**depfu**] Update eslint-plugin-promise: 4.0.1 → 4.1.1 (minor) [#177](https://github.com/toptal/picasso/pull/177)
- [**depfu**] Update eslint: 5.15.1 → 5.16.0 (minor) [#176](https://github.com/toptal/picasso/pull/176)
- [**depfu**] Update copy-to-clipboard: 3.0.8 → 3.1.0 (minor) [#175](https://github.com/toptal/picasso/pull/175)
- [**depfu**] Update @typescript-eslint/parser: 1.4.2 → 1.6.0 (minor) [#174](https://github.com/toptal/picasso/pull/174)
- [**depfu**] Update @typescript-eslint/eslint-plugin: 1.4.2 → 1.6.0 (minor) [#173](https://github.com/toptal/picasso/pull/173)
- [**depfu**] Update @babel/standalone: 7.3.4 → 7.4.3 (minor) [#171](https://github.com/toptal/picasso/pull/171)
- [**depfu**] Update react-storybook-addon-chapters: 3.1.1 → 3.1.3 (patch) [#170](https://github.com/toptal/picasso/pull/170)
- [**depfu**] Update @types/puppeteer: 1.12.2 → 1.12.3 (patch) [#158](https://github.com/toptal/picasso/pull/158)
- [**depfu**] Update all of react: 16.8.4 → 16.8.6 (patch) [#168](https://github.com/toptal/picasso/pull/168)
- [**depfu**] Update @types/react-dom: 16.8.2 → 16.8.3 (patch) [#162](https://github.com/toptal/picasso/pull/162)
- [**depfu**] Update @material-ui/core: 3.9.2 → 3.9.3 (patch) [#167](https://github.com/toptal/picasso/pull/167)
- [**depfu**] Update @types/react: 16.8.8 → 16.8.13 (patch) [#166](https://github.com/toptal/picasso/pull/166)
- [**depfu**] Update jest-puppeteer: 3.9.0 → 3.9.1 (patch) [#169](https://github.com/toptal/picasso/pull/169)
- [**depfu**] Update all of storybook: 5.0.5 → 5.0.6 (patch) [#154](https://github.com/toptal/picasso/pull/154)
- [**depfu**] Update @storybook/theming: 5.0.5 → 5.0.6 (patch) [#155](https://github.com/toptal/picasso/pull/155)

---

## v0.1.0-beta.12 (08/04/2019)

#### Bugfix

- [**Bugfix**] [FX-121] Add support for Safari with clip-path [#150](https://github.com/toptal/picasso/pull/150)
- [**Bugfix**] [FX-59] Add custom CssBaseline to add height 100vh to root tags [#141](https://github.com/toptal/picasso/pull/141)

#### CI

- [**CI**] [INF] Improve build status reporting [#139](https://github.com/toptal/picasso/pull/139)

#### Chore

- [**Chore**] [FX-73] Timesheets. Fix link for show more, replace with button [#151](https://github.com/toptal/picasso/pull/151)
- [**Chore**] Migrate Checkbox to TS [#149](https://github.com/toptal/picasso/pull/149)
- [**Chore**] Migrate Buttongroup to TS [#148](https://github.com/toptal/picasso/pull/148)
- [**Chore**] Migrate Button to TS [#145](https://github.com/toptal/picasso/pull/145)
- [**Chore**] Ugrade to the latest docgen package [#138](https://github.com/toptal/picasso/pull/138)
- [**Chore**] [FX-81] Make lowercase for subcomponent names [#137](https://github.com/toptal/picasso/pull/137)

#### Feature

- [**Feature**] [FX-121] Add avatar component [#147](https://github.com/toptal/picasso/pull/147)
- [**Feature**] [FX-13] Add Paper component [#143](https://github.com/toptal/picasso/pull/143)
- [**Feature**] [FX-61] Add option to make select dynamic in width size [#142](https://github.com/toptal/picasso/pull/142)
- [**Feature**] [FX-14] Add Image component [#146](https://github.com/toptal/picasso/pull/146)
- [**Feature**] [FX-73] Add show more to Timesheets [#136](https://github.com/toptal/picasso/pull/136)

---

## v0.1.0-beta.11 (29/03/2019)

#### Chore

- [**Chore**] [FX-101] Migrate accordion to TSX [#133](https://github.com/toptal/picasso/pull/133)
- [**Chore**] Upgrade storybook to 5.0.5 [#134](https://github.com/toptal/picasso/pull/134)
- [**Chore**] Fix minor issues [#127](https://github.com/toptal/picasso/pull/127)
- [**Chore**] Selectable table example implemented with hooks [#128](https://github.com/toptal/picasso/pull/128)
- [**Chore**] [FX-75] Refactor to use children props where possible [#129](https://github.com/toptal/picasso/pull/129)
- [**Chore**] [FX-114] Migrate MenuItem to TSX [#132](https://github.com/toptal/picasso/pull/132)
- [**Chore**] [FX-74] Fix positive/negative to success/error copies [#125](https://github.com/toptal/picasso/pull/125)

#### Feature

- [**Feature**] [FX-64] Add Timesheets widget [#131](https://github.com/toptal/picasso/pull/131)
- [**Feature**] [FX-77] Remove color for Radio [#135](https://github.com/toptal/picasso/pull/135)
- [**Feature**] Initial Table components [#124](https://github.com/toptal/picasso/pull/124)
- [**Feature**] [TACT-69] Change footer's paddings [#126](https://github.com/toptal/picasso/pull/126)

---

## v0.1.0-beta.10 (20/03/2019)

#### closed

- [**closed**] Changes toward davinci standard [#123](https://github.com/toptal/picasso/pull/123)

---

## v0.1.0-beta.9 (18/03/2019)

#### Bugfix

- [**Bugfix**] [FX-66] Fix Icon mangled names inside prod build [#122](https://github.com/toptal/picasso/pull/122)

#### Chore

- [**Chore**] Update visual tests steps documentation [#121](https://github.com/toptal/picasso/pull/121)

---

## v0.1.0-beta.8 (15/03/2019)

#### Bugfix

- [**Bugfix**] Center Toptal logo vertically in header [#115](https://github.com/toptal/picasso/pull/115)

#### Chore

- [**Chore**] Add markdown prop description support [#120](https://github.com/toptal/picasso/pull/120)
- [**Chore**] Adjust support info [#118](https://github.com/toptal/picasso/pull/118)
- [**Chore**] [FX-7] Add story sections anchor link [#117](https://github.com/toptal/picasso/pull/117)
- [**Chore**] Add hard-source-webpack-plugin to cache for development sources between webpack builds [#119](https://github.com/toptal/picasso/pull/119)
- [**Chore**] Add createStyles to style files and implement withStyles [#116](https://github.com/toptal/picasso/pull/116)

---

## v0.1.0-beta.7 (13/03/2019)

#### Bugfix

- [**Bugfix**] Fix checkbox alignment [#113](https://github.com/toptal/picasso/pull/113)

#### Chore

- [**Chore**] Storybook 5 [#114](https://github.com/toptal/picasso/pull/114)

---

## v0.1.0-beta.6 (12/03/2019)

#### Chore

- [**Chore**] [FX-45] Prepare tsconfig for storybook [#111](https://github.com/toptal/picasso/pull/111)
- [**Chore**] Add symlink yarn command and document linking [#110](https://github.com/toptal/picasso/pull/110)
- [**Chore**] Add support info [#112](https://github.com/toptal/picasso/pull/112)

---

## v0.1.0-beta.5 (11/03/2019)

#### Chore

- [**Chore**] [FX-18] Restructure Form examples [#108](https://github.com/toptal/picasso/pull/108)
- [**Chore**] Change logo [#109](https://github.com/toptal/picasso/pull/109)

#### Feature

- [**Feature**] Add Tooltip component [#104](https://github.com/toptal/picasso/pull/104)

---

## v0.1.0-beta.4 (08/03/2019)
*No changelog for this release.*

---

## v0.1.0-beta.3 (08/03/2019)

#### CI

- [**CI**] Fix jenkins workspace concurrecy [#105](https://github.com/toptal/picasso/pull/105)

#### Chore

- [**Chore**] Add types file in Page folder [#103](https://github.com/toptal/picasso/pull/103)
- [**Chore**] Fix hot reload [#107](https://github.com/toptal/picasso/pull/107)

#### Feature

- [**Feature**] [FX-42] Migrate manual props docs to auto-generated [#101](https://github.com/toptal/picasso/pull/101)
- [**Feature**] [FX-18] Add Form.Field and Form.Hint components [#100](https://github.com/toptal/picasso/pull/100)

---

## v0.1.0-beta.2 (07/03/2019)

#### Chore

- [**Chore**][**DO NOT MERGE**] Speed up webpack build [#102](https://github.com/toptal/picasso/pull/102)
- [**Chore**] [FX-20] Add breakpoints [#98](https://github.com/toptal/picasso/pull/98)
- [**Chore**] Change PR template, adjust version badge [#97](https://github.com/toptal/picasso/pull/97)

#### Feature

- [**Feature**] [FX-19] Add Page container component [#95](https://github.com/toptal/picasso/pull/95)
- [**Feature**] [FX-20] Add grid component [#94](https://github.com/toptal/picasso/pull/94)
- [**Feature**] [FX-18] Add full width option for TextField [#99](https://github.com/toptal/picasso/pull/99)
- [**Feature**] Add Modal component [#92](https://github.com/toptal/picasso/pull/92)
- [**Feature**] [FX-48] Add CssBaseline component to provider [#96](https://github.com/toptal/picasso/pull/96)

---

## v0.1.0-beta.1 (04/03/2019)

#### Chore

- [**Chore**] Release BETA version [#93](https://github.com/toptal/picasso/pull/93)
- [**Chore**] Rename Spacer to Container [#91](https://github.com/toptal/picasso/pull/91)

#### closed

- [**closed**] Add component prop documentation auto generation [#88](https://github.com/toptal/picasso/pull/88)

---

## v0.1.0-alpha.32 (01/03/2019)

#### Chore

- [**Chore**] Handle full user like imports in source code examples [#90](https://github.com/toptal/picasso/pull/90)

---

## v0.1.0-alpha.31 (28/02/2019)

#### Chore

- [**Chore**] Upgrade material ui package [#89](https://github.com/toptal/picasso/pull/89)

#### Feature

- [**Feature**] Add Footer component [#87](https://github.com/toptal/picasso/pull/87)

---

## v0.1.0-alpha.30 (27/02/2019)

#### Bugfix

- [**Bugfix**] Fix select component caret color [#85](https://github.com/toptal/picasso/pull/85)

#### Chore

- [**Chore**] Picas 71 docs for components [#86](https://github.com/toptal/picasso/pull/86)
- [**Chore**] Prop types documentation [#80](https://github.com/toptal/picasso/pull/80)

#### Feature

- [**Feature**] Add Header component [#84](https://github.com/toptal/picasso/pull/84)

#### closed

- [**closed**] Fix readme for adding svg to Picasso [#83](https://github.com/toptal/picasso/pull/83)

---

## v0.1.0-alpha.29 (25/02/2019)

#### Bugfix

- [**Bugfix**] Fix userback integration [#79](https://github.com/toptal/picasso/pull/79)

#### Chore

- [**Chore**] Fix hygen component generation template in favor of the new visual tests structure [#77](https://github.com/toptal/picasso/pull/77)
- [**Chore**][**DO NOT MERGE**] Move -examples to .examples [#78](https://github.com/toptal/picasso/pull/78)

#### Feature

- [**Feature**] Add logo component [#82](https://github.com/toptal/picasso/pull/82)

#### closed

- [**closed**] Fix some issues with component generator template [#81](https://github.com/toptal/picasso/pull/81)

---

## v0.1.0-alpha.28 (22/02/2019)

#### Specs

- [**Specs**] Integrate storybook visual testing [#67](https://github.com/toptal/picasso/pull/67)

---

## v0.1.0-alpha.27 (22/02/2019)

#### Bugfix

- [**Bugfix**] Fix Picasso main js [#75](https://github.com/toptal/picasso/pull/75)

---

## v0.1.0-alpha.26 (21/02/2019)
*No changelog for this release.*

---

## v0.1.0-alpha.25 (21/02/2019)

#### Bugfix

- [**Bugfix**] Move Userback integration into Storybook iframe [#76](https://github.com/toptal/picasso/pull/76)

#### closed

- [**closed**] Fix text field icon padding [#74](https://github.com/toptal/picasso/pull/74)

---

## v0.1.0-alpha.24 (21/02/2019)

#### Bugfix

- [**Bugfix**] Set precise size of TextFiel and Select components [#72](https://github.com/toptal/picasso/pull/72)

#### CI

- [**CI**] Publish Visual Tests on CI [#73](https://github.com/toptal/picasso/pull/73)

---

## v0.1.0-alpha.23 (20/02/2019)

#### closed

- [**closed**] Fix alignment for the caret icon for Select [#71](https://github.com/toptal/picasso/pull/71)
- [**closed**] Fix design issues with text fields [#70](https://github.com/toptal/picasso/pull/70)

---

## v0.1.0-alpha.22 (19/02/2019)

#### CI

- [**CI**] Refactor visual tests CI scripts [#69](https://github.com/toptal/picasso/pull/69)

#### closed

- [**closed**] Minor design issues with select [#68](https://github.com/toptal/picasso/pull/68)
