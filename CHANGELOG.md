# Changelog

## v0.1.0-alpha.12 (12/02/2019)

#### CI

- [**CI**] Finalize publish and docs CI jobs [#54](https://github.com/toptal/picasso/pull/54)

#### Chore

- [**Chore**] Fix prop type warning in specs [#53](https://github.com/toptal/picasso/pull/53)

#### Feature

- [**Feature**] Add withClasses HOC [#43](https://github.com/toptal/picasso/pull/43)

#### closed

- [**closed**] Fix for running visual tests inside docker container [#56](https://github.com/toptal/picasso/pull/56)

---

## v0.1.0-alpha.11 (08/02/2019)

#### CI

- [**CI**] Add visual tests in CI pipeline [#50](https://github.com/toptal/picasso/pull/50)

#### Chore

- [**Chore**] Remove usage of data-testid in unit tests [#48](https://github.com/toptal/picasso/pull/48)
- [**Chore**] Add unit tests for Checkbox component [#47](https://github.com/toptal/picasso/pull/47)
- [**Chore**] Add Typescript type check for Palette object [#46](https://github.com/toptal/picasso/pull/46)

#### Feature

- [**Feature**] Added Typography component [#49](https://github.com/toptal/picasso/pull/49)

#### closed

- [**closed**] Fix Dockerfile PATH variable [#52](https://github.com/toptal/picasso/pull/52)

---

## v0.1.0-alpha.10 (01/02/2019)

#### Bugfix

- [**Bugfix**] Fix Label style [#40](https://github.com/toptal/picasso/pull/40)

#### Chore

- [**Chore**] Add documentation about how to add new Icon to the Picasso project [#45](https://github.com/toptal/picasso/pull/45)
- [**Chore**] Fix warnings in unit tests [#41](https://github.com/toptal/picasso/pull/41)
- [**Chore**] Change eslint rule sort-default-prop-types to sort-prop-types [#37](https://github.com/toptal/picasso/pull/37)

#### Feature

- [**Feature**] Add component Icon and support of svg icons (new API) [#44](https://github.com/toptal/picasso/pull/44)
- [**Feature**] Add font directly from adobe using link [#39](https://github.com/toptal/picasso/pull/39)
- [**Feature**] Adjust Button styles, add new props [#38](https://github.com/toptal/picasso/pull/38)

---

## v0.1.0-alpha.9 (29/01/2019)

#### Chore

- [**Chore**] Truncate svg dynamic classnames parts using jss snapshot serializer [#34](https://github.com/toptal/picasso/pull/34)
- [**Chore**] Add error state for Text Field component [#33](https://github.com/toptal/picasso/pull/33)

#### Feature

- [**Feature**] Add Pagination component [#35](https://github.com/toptal/picasso/pull/35)
- [**Feature**] Added Accordion component (collapsable panel) [#32](https://github.com/toptal/picasso/pull/32)

#### closed

- [**closed**] Move to Typescript [#36](https://github.com/toptal/picasso/pull/36)

---

## v0.1.0-alpha.8 (22/01/2019)

#### Feature

- [**Feature**] Add initial component - Label [#31](https://github.com/toptal/picasso/pull/31)
- [**Feature**] Added Loader component, loading support for Button [#30](https://github.com/toptal/picasso/pull/30)

---

## v0.1.0-alpha.7 (21/01/2019)

#### CI

- [**CI**] Deploy storybook to docs server [#26](https://github.com/toptal/picasso/pull/26)

#### Chore

- [**Chore**] Fix palette name syntax for overriding MUI theme [#29](https://github.com/toptal/picasso/pull/29)
- [**Chore**] Fix story template for component generator [#28](https://github.com/toptal/picasso/pull/28)
- [**Chore**] Add component template code generator [#20](https://github.com/toptal/picasso/pull/20)
- [**Chore**] Split TextField styles [#22](https://github.com/toptal/picasso/pull/22)

#### Feature

- [**Feature**] Initial components: Button.Group [#25](https://github.com/toptal/picasso/pull/25)
- [**Feature**] Initial components Checkbox [#23](https://github.com/toptal/picasso/pull/23)
- [**Feature**] Add Select component [#21](https://github.com/toptal/picasso/pull/21)

#### Specs

- [**Specs**] Move all stories to the component folders [#24](https://github.com/toptal/picasso/pull/24)

---

## v0.1.0-alpha.6 (14/01/2019)

#### Feature

- [**Feature**] Initial components: Radio button [#19](https://github.com/toptal/picasso/pull/19)

#### Specs

- [**Specs**] Add snapshot serializer to remove dynamic parts of classnames from MUI components [#18](https://github.com/toptal/picasso/pull/18)

---

## v0.1.0-alpha.5 (11/01/2019)

#### CI

- [**CI**] Fix Jenkins PR job to have NPM_TOKEN [#17](https://github.com/toptal/picasso/pull/17)

#### Feature

- [**Feature**] Introduce Picasso component. Add TextField with an option to render Icon [#16](https://github.com/toptal/picasso/pull/16)

---

## v0.1.0-alpha.4 (10/01/2019)

#### Feature

- [**Feature**] [PICAS-17] Initial components - Button [#15](https://github.com/toptal/picasso/pull/15)

---

## v0.1.0-alpha.3 (21/12/2018)
*No changelog for this release.*

---

## v0.1.0-alpha.2 (21/12/2018)

#### Chore

- [**Chore**] Include build folder when publish [#14](https://github.com/toptal/picasso/pull/14)

---

## v0.1.0-alpha.1 (20/12/2018)

#### Chore

- [**Chore**] [BASE-61] Add PR template and codeowners file [#8](https://github.com/toptal/picasso/pull/8)

#### Lint

- [**Lint**] Fix lint and test setup [#5](https://github.com/toptal/picasso/pull/5)
- [**Lint**] [BASE-54] Setup linter [#1](https://github.com/toptal/picasso/pull/1)

#### Test

- [**Test**] [PICAS-1] Implement lint job on jenkins [#9](https://github.com/toptal/picasso/pull/9)
- [**Test**] [Base-66] Visual regression [#6](https://github.com/toptal/picasso/pull/6)
- [**Test**] [BASE-55] Setup test runner [#2](https://github.com/toptal/picasso/pull/2)

#### enhancement

- [**enhancement**] [PICAS-27] Add release command [#12](https://github.com/toptal/picasso/pull/12)
- [**enhancement**] [63] Build dist version [#7](https://github.com/toptal/picasso/pull/7)
- [**enhancement**] Update CI tasks [#10](https://github.com/toptal/picasso/pull/10)
