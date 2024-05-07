# @toptal/picasso-query-builder

## 6.0.2

### Patch Changes

- Updated dependencies [[`f19a613`](https://github.com/toptal/picasso/commit/f19a61397870dcfd3bb5bb2e645a3ae1be8632ce)]:
  - @toptal/picasso-button@1.0.11
  - @toptal/picasso-notification@2.0.3
  - @toptal/picasso-prompt-modal@1.0.11
  - @toptal/picasso-input@1.0.11
  - @toptal/picasso-number-input@1.0.11
  - @toptal/picasso-select@1.0.12
  - @toptal/picasso-tagselector@1.0.13

## 6.0.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-button@1.0.10
  - @toptal/picasso-select@1.0.11
  - @toptal/picasso-notification@2.0.2
  - @toptal/picasso-prompt-modal@1.0.10
  - @toptal/picasso-tagselector@1.0.12
  - @toptal/picasso-input@1.0.10
  - @toptal/picasso-number-input@1.0.10

## 6.0.0

### Major Changes

- [#4261](https://github.com/toptal/picasso/pull/4261) [`cab40a729fae5009c40b028befc0108e7fd98f2b`](https://github.com/toptal/picasso/commit/cab40a729fae5009c40b028befc0108e7fd98f2b) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- remove `totalCount` and `totalCountLoading` props from Query Builder. Add `runQueryButtonContent` prop to Query Builder.
  In order to allow consumers to add the desired functionality for the Run Query button, we added `runQueryButtonContent` prop.
  `totalCount` and `totalCountLoading` are properties that should not be defined at the library level.
  Instead they will be implemented in the consumer.
  - remove deprecation of `hideControls` propery.

## 5.0.3

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-tagselector@1.0.11

## 5.0.2

### Patch Changes

- [#4250](https://github.com/toptal/picasso/pull/4250) [`47fd7b59374386a09f853c5c45750948a00e525d`](https://github.com/toptal/picasso/commit/47fd7b59374386a09f853c5c45750948a00e525d) Thanks [@mkrl](https://github.com/mkrl)!
- migrate packages to use Picasso By Parts

## 5.0.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-notification@2.0.1

## 5.0.0

### Major Changes

- [#4236](https://github.com/toptal/picasso/pull/4236) [`d7d581bc608ed11b3b98a0ae9209d883ba29e5de`](https://github.com/toptal/picasso/commit/d7d581bc608ed11b3b98a0ae9209d883ba29e5de) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- remove padding dependency on `hideControls` property
  Padding on the Query Builder was tied to the `hideControls` property,
  we changed it in such a way that now you can set the desired padding size.
  By default, the padding will be SPACING_6.
  In those places where there should be no padding on Query Builder we should provide padded property set to SPACING_0.
  - add `padded` property to define padded layout
  - mark `hideControls` property as deprecated

## 4.0.0

### Major Changes

- [#4200](https://github.com/toptal/picasso/pull/4200) [`4ee1ebdafd9e5830d5ec6007620186d5a61befee`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee) Thanks [@mkrl](https://github.com/mkrl)!
- added a `tailwindcss` dependency (tailwindcss is now required to make this package work)

### Patch Changes

- Updated dependencies [[`4ee1ebd`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee)]:
  - @toptal/picasso-notification@2.0.0

## 3.2.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-notification@1.0.7

## 3.2.0

### Minor Changes

- [#4227](https://github.com/toptal/picasso/pull/4227) [`02080a822f02e896372011a23ebe89b655481fc2`](https://github.com/toptal/picasso/commit/02080a822f02e896372011a23ebe89b655481fc2) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- add property to set the Query builder's footer

## 3.1.2

### Patch Changes

- Updated dependencies [[`c05387d`](https://github.com/toptal/picasso/commit/c05387de5636ed094365d1eff67b955d84b81c61)]:
  - @toptal/picasso-notification@1.0.6

## 3.1.1

### Patch Changes

- Updated dependencies [[`3512588`](https://github.com/toptal/picasso/commit/3512588b06c3660471a68500275321c640278cf0)]:
  - @toptal/picasso-notification@1.0.5

## 3.1.0

### Minor Changes

- [#4208](https://github.com/toptal/picasso/pull/4208) [`977da669eaa4ee5aefbe2acda773e3621e5981c4`](https://github.com/toptal/picasso/commit/977da669eaa4ee5aefbe2acda773e3621e5981c4) Thanks [@toptalwadiibasmi](https://github.com/toptalwadiibasmi)!
- add tooltip support to the query builder fields using the `tooltip` property in the fields' configuration.

## 3.0.2

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-notification@1.0.4
  - @toptal/picasso-utils@1.0.2

## 3.0.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-notification@1.0.3

## 3.0.0

### Patch Changes

- Updated dependencies [[`cb9586eefcd4bad2a594d4cf9ddbbc2a65e1b334`](https://github.com/toptal/picasso/commit/cb9586eefcd4bad2a594d4cf9ddbbc2a65e1b334)]:
  - @toptal/picasso@44.0.0

## 2.0.1

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-notification@1.0.2

## 2.0.0

### Patch Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages
- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso@43.0.0
  - @toptal/picasso-notification@1.0.1
  - @toptal/picasso-utils@1.0.1

## 1.5.1

### Patch Changes

- [#4132](https://github.com/toptal/picasso/pull/4132) [`c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149`](https://github.com/toptal/picasso/commit/c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149) Thanks [@dependabot](https://github.com/apps/dependabot)!
- bump classnames dependency

## 1.5.0

### Minor Changes

- [#4116](https://github.com/toptal/picasso/pull/4116) [`0743d4164838535eb15774f5b60a31021c888b2d`](https://github.com/toptal/picasso/commit/0743d4164838535eb15774f5b60a31021c888b2d) Thanks [@toptalwadiibasmi](https://github.com/toptalwadiibasmi)!
- add property to set the Query builder's header

## 1.4.1

### Patch Changes

- [#4093](https://github.com/toptal/picasso/pull/4093) [`06ad5e3db4b8c86d4a86b9a136164739d11f1cec`](https://github.com/toptal/picasso/commit/06ad5e3db4b8c86d4a86b9a136164739d11f1cec) Thanks [@rasitozcan](https://github.com/rasitozcan)!
- fix type for multiselect field

## 1.4.0

### Minor Changes

- [#4084](https://github.com/toptal/picasso/pull/4084) [`a1ee7a5453321e660943e75ffd8bc19f0178953f`](https://github.com/toptal/picasso/commit/a1ee7a5453321e660943e75ffd8bc19f0178953f) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- add `enableReset` property for `multiselect` filter type

## 1.3.0

### Minor Changes

- [#4075](https://github.com/toptal/picasso/pull/4075) [`2d0c9d45eb9596838b3805aa2e7f25dd109ca455`](https://github.com/toptal/picasso/commit/2d0c9d45eb9596838b3805aa2e7f25dd109ca455) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- add search input clearing functionality for `select` and `multiselect` filter types through filter configuration with `enableResetSearch` property.

## 1.2.0

### Minor Changes

- [#4047](https://github.com/toptal/picasso/pull/4047) [`43a6e5ae3`](https://github.com/toptal/picasso/commit/43a6e5ae375549c8a321d385d39e73798eb5b00b) Thanks [@toptalwadiibasmi](https://github.com/toptalwadiibasmi)!

### QueryBuilder

- update validationErrors to testIds properties

### ValidationErrors

- add validationErrorsTestId property as a test id for its container.
- property validationErrorsTestId is used to set test id for validation errors messages with their corresponding index.

## 1.1.2

### Patch Changes

- [#3998](https://github.com/toptal/picasso/pull/3998) [`ec2feaab1`](https://github.com/toptal/picasso/commit/ec2feaab145a32980a970eb0001c16315b2e3097) Thanks [@dependabot](https://github.com/apps/dependabot)!
- update dependencies (`@react-querybuilder/dnd`)

## 1.1.1

### Patch Changes

- [#3955](https://github.com/toptal/picasso/pull/3955) [`73d6869ea`](https://github.com/toptal/picasso/commit/73d6869eaef7a22d45c8e127466702fd73728095) Thanks [@dependabot](https://github.com/apps/dependabot)!
- update dependency (`react-querybuilder`)

## 1.1.0

### Minor Changes

- [#3872](https://github.com/toptal/picasso/pull/3872) [`0f573b231`](https://github.com/toptal/picasso/commit/0f573b231886bd02ebf63d01365caa4c0f3dba12) Thanks [@rasitozcan](https://github.com/rasitozcan)!

### QueryBuilder

- move query builder library from Staff Portal to Picasso monorepo
