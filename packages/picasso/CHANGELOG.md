# Change Log

## 54.0.3

### Patch Changes

- Updated dependencies [[`dae5bce`](https://github.com/toptal/picasso/commit/dae5bce794a5c4f6406449c83a6e425cfcafff0f)]:
  - @toptal/picasso-notification@4.0.23
  - @toptal/picasso-tagselector@3.3.2
  - @toptal/picasso-date-select@1.0.72
  - @toptal/picasso-typography@4.0.4
  - @toptal/picasso-accordion@3.0.22
  - @toptal/picasso-file-input@4.0.22
  - @toptal/picasso-helpbox@5.0.23
  - @toptal/picasso-button@4.0.23
  - @toptal/picasso-alert@3.0.34
  - @toptal/picasso-table@3.0.25
  - @toptal/picasso-form@6.3.2
  - @toptal/picasso-grid@5.0.10
  - @toptal/picasso-note@4.0.5
  - @toptal/picasso-page@5.4.7
  - @toptal/picasso-tabs@5.0.15
  - @toptal/picasso-autocomplete@5.2.2
  - @toptal/picasso-breadcrumbs@3.0.11
  - @toptal/picasso-calendar@4.1.5
  - @toptal/picasso-checkbox@5.0.13
  - @toptal/picasso-drawer@3.0.35
  - @toptal/picasso-link@3.0.6
  - @toptal/picasso-list@5.0.11
  - @toptal/picasso-menu@3.0.17
  - @toptal/picasso-modal@3.2.2
  - @toptal/picasso-radio@5.0.13
  - @toptal/picasso-slider@4.0.5
  - @toptal/picasso-step@4.0.10
  - @toptal/picasso-tag@4.0.11
  - @toptal/picasso-tooltip@2.0.3
  - @toptal/picasso-account-select@3.0.18
  - @toptal/picasso-amount@1.0.11
  - @toptal/picasso-application-update-notification@2.0.34
  - @toptal/picasso-avatar@6.1.11
  - @toptal/picasso-dropzone@5.0.23
  - @toptal/picasso-empty-state@2.0.14
  - @toptal/picasso-overview-block@4.0.5
  - @toptal/picasso-pagination@4.0.24
  - @toptal/picasso-prompt-modal@2.1.2
  - @toptal/picasso-quote@2.0.7
  - @toptal/picasso-section@5.1.7
  - @toptal/picasso-select@4.1.2
  - @toptal/picasso-show-more@2.0.22
  - @toptal/picasso-timeline@5.0.5
  - @toptal/picasso-typography-overflow@4.0.4
  - @toptal/picasso-user-badge@5.1.12
  - @toptal/picasso-carousel@4.0.23
  - @toptal/picasso-outlined-input@4.1.2
  - @toptal/picasso-password-input@5.1.2
  - @toptal/picasso-skeleton-loader@1.0.59
  - @toptal/picasso-tree-view@3.0.35
  - @toptal/picasso-input@4.1.2
  - @toptal/picasso-number-input@4.2.2
  - @toptal/picasso-avatar-upload@3.0.27
  - @toptal/picasso-date-picker@3.2.2
  - @toptal/picasso-timepicker@4.1.2

## 54.0.2

### Patch Changes

- Updated dependencies [[`54593ef`](https://github.com/toptal/picasso/commit/54593efdbe6cb655584e06023ea5e5378e0e2410)]:
  - @toptal/picasso-drawer@3.0.34

## 54.0.1

### Patch Changes

- [#4782](https://github.com/toptal/picasso/pull/4782) [`099f76c`](https://github.com/toptal/picasso/commit/099f76c548a70d6c5988515f6fe6b8ec15dc560c) Thanks [@ascrazy](https://github.com/ascrazy)!
- update TableSectionHead to apply incoming className prop

- Updated dependencies [[`099f76c`](https://github.com/toptal/picasso/commit/099f76c548a70d6c5988515f6fe6b8ec15dc560c)]:
  - @toptal/picasso-table@3.0.24

## 54.0.0

### Major Changes

- [#4777](https://github.com/toptal/picasso/pull/4777) [`6aae8c6`](https://github.com/toptal/picasso/commit/6aae8c67f2f3c4979df322d30494b0f2958d6ccb) Thanks [@ascrazy](https://github.com/ascrazy)!

### Popper

- migrate to tailwind styling

This affects priority of Popper's default `margin` and `padding` rules. Consumers that are supplying any overrides for these rules might need to increase specificity on their side. e.g. if you are using `<Popper className='mt-4' />`, after the upgrade `mt-4` will not have effect. In order to make it work you'll need to do `<Popper className='[&]:mt-4' />`

### Patch Changes

- Updated dependencies [[`6aae8c6`](https://github.com/toptal/picasso/commit/6aae8c67f2f3c4979df322d30494b0f2958d6ccb)]:
  - @toptal/picasso-popper@2.0.0
  - @toptal/picasso-autocomplete@5.2.1
  - @toptal/picasso-date-picker@3.2.1
  - @toptal/picasso-dropdown@4.2.3
  - @toptal/picasso-menu@3.0.16
  - @toptal/picasso-select@4.1.1
  - @toptal/picasso-page@5.4.6
  - @toptal/picasso-tagselector@3.3.1
  - @toptal/picasso-button@4.0.22
  - @toptal/picasso-account-select@3.0.17
  - @toptal/picasso-date-select@1.0.71
  - @toptal/picasso-accordion@3.0.21
  - @toptal/picasso-alert@3.0.33
  - @toptal/picasso-application-update-notification@2.0.33
  - @toptal/picasso-calendar@4.1.4
  - @toptal/picasso-carousel@4.0.22
  - @toptal/picasso-drawer@3.0.33
  - @toptal/picasso-file-input@4.0.21
  - @toptal/picasso-helpbox@5.0.22
  - @toptal/picasso-modal@3.2.1
  - @toptal/picasso-notification@4.0.22
  - @toptal/picasso-outlined-input@4.1.1
  - @toptal/picasso-pagination@4.0.23
  - @toptal/picasso-password-input@5.1.1
  - @toptal/picasso-prompt-modal@2.1.1
  - @toptal/picasso-section@5.1.6
  - @toptal/picasso-show-more@2.0.21
  - @toptal/picasso-skeleton-loader@1.0.58
  - @toptal/picasso-table@3.0.23
  - @toptal/picasso-tree-view@3.0.34
  - @toptal/picasso-form@6.3.1
  - @toptal/picasso-dropzone@5.0.22
  - @toptal/picasso-avatar-upload@3.0.26
  - @toptal/picasso-input@4.1.1
  - @toptal/picasso-number-input@4.2.1
  - @toptal/picasso-timepicker@4.1.1

## 53.2.1

### Patch Changes

- Updated dependencies [[`290e2f4`](https://github.com/toptal/picasso/commit/290e2f4520f8675f7e29bca79d8cdea847078598)]:
  - @toptal/picasso-outlined-input@4.1.0
  - @toptal/picasso-password-input@5.1.0
  - @toptal/picasso-autocomplete@5.2.0
  - @toptal/picasso-number-input@4.2.0
  - @toptal/picasso-tagselector@3.3.0
  - @toptal/picasso-date-picker@3.2.0
  - @toptal/picasso-timepicker@4.1.0
  - @toptal/picasso-select@4.1.0
  - @toptal/picasso-input@4.1.0
  - @toptal/picasso-form@6.3.0
  - @toptal/picasso-avatar-upload@3.0.25
  - @toptal/picasso-page@5.4.5
  - @toptal/picasso-date-select@1.0.70
  - @toptal/picasso-dropzone@5.0.21
  - @toptal/picasso-file-input@4.0.20

## 53.2.0

### Minor Changes

- [#4774](https://github.com/toptal/picasso/pull/4774) [`bd230dc`](https://github.com/toptal/picasso/commit/bd230dc10767f1318503c90523904a01bcd04e6a) Thanks [@ascrazy](https://github.com/ascrazy)!
- Allowed variant=primary for the PromptModal

### Patch Changes

- Updated dependencies [[`bd230dc`](https://github.com/toptal/picasso/commit/bd230dc10767f1318503c90523904a01bcd04e6a)]:
  - @toptal/picasso-prompt-modal@2.1.0

## 53.1.3

### Patch Changes

- Updated dependencies [[`890ac65`](https://github.com/toptal/picasso/commit/890ac6591e17c7cabc5c22c7509a8164ef2d3944)]:
  - @toptal/picasso-modal@3.2.0
  - @toptal/picasso-prompt-modal@2.0.33

## 53.1.2

### Patch Changes

- Updated dependencies [[`899aaad`](https://github.com/toptal/picasso/commit/899aaade09a4a491d6ba8b1cd0ce8fcbd5533fc6)]:
  - @toptal/picasso-section@5.1.5

## 53.1.1

### Patch Changes

- Updated dependencies [[`6c0bb76`](https://github.com/toptal/picasso/commit/6c0bb760cb87de2e2225adcb2664de2a84ae2447)]:
  - @toptal/picasso-popper@1.1.0
  - @toptal/picasso-modal@3.1.0
  - @toptal/picasso-utils@3.1.0
  - @toptal/picasso-autocomplete@5.1.3
  - @toptal/picasso-date-picker@3.1.3
  - @toptal/picasso-dropdown@4.2.2
  - @toptal/picasso-menu@3.0.15
  - @toptal/picasso-select@4.0.20
  - @toptal/picasso-prompt-modal@2.0.32
  - @toptal/picasso-accordion@3.0.20
  - @toptal/picasso-account-select@3.0.16
  - @toptal/picasso-alert@3.0.32
  - @toptal/picasso-amount@1.0.10
  - @toptal/picasso-application-update-notification@2.0.32
  - @toptal/picasso-avatar@6.1.10
  - @toptal/picasso-avatar-upload@3.0.24
  - @toptal/picasso-badge@3.0.4
  - @toptal/picasso-breadcrumbs@3.0.10
  - @toptal/picasso-button@4.0.21
  - @toptal/picasso-calendar@4.1.3
  - @toptal/picasso-carousel@4.0.21
  - @toptal/picasso-checkbox@5.0.12
  - @toptal/picasso-container@3.1.2
  - @toptal/picasso-date-select@1.0.69
  - @toptal/picasso-drawer@3.0.32
  - @toptal/picasso-dropzone@5.0.20
  - @toptal/picasso-file-input@4.0.19
  - @toptal/picasso-form@6.2.1
  - @toptal/picasso-form-label@1.0.2
  - @toptal/picasso-grid@5.0.9
  - @toptal/picasso-helpbox@5.0.21
  - @toptal/picasso-icons@1.12.1
  - @toptal/picasso-image@3.0.3
  - @toptal/picasso-input@4.0.20
  - @toptal/picasso-input-adornment@3.0.10
  - @toptal/picasso-link@3.0.5
  - @toptal/picasso-list@5.0.10
  - @toptal/picasso-loader@3.0.3
  - @toptal/picasso-logo@2.0.9
  - @toptal/picasso-notification@4.0.21
  - @toptal/picasso-number-input@4.1.4
  - @toptal/picasso-outlined-input@4.0.20
  - @toptal/picasso-overview-block@4.0.4
  - @toptal/picasso-page@5.4.4
  - @toptal/picasso-pagination@4.0.22
  - @toptal/picasso-paper@4.0.3
  - @toptal/picasso-password-input@5.0.20
  - @toptal/picasso-radio@5.0.12
  - @toptal/picasso-rating@3.0.10
  - @toptal/picasso-section@5.1.4
  - @toptal/picasso-skeleton-loader@1.0.57
  - @toptal/picasso-slider@4.0.4
  - @toptal/picasso-step@4.0.9
  - @toptal/picasso-table@3.0.22
  - @toptal/picasso-tabs@5.0.14
  - @toptal/picasso-tag@4.0.10
  - @toptal/picasso-tagselector@3.2.4
  - @toptal/picasso-timeline@5.0.4
  - @toptal/picasso-timepicker@4.0.21
  - @toptal/picasso-tooltip@2.0.2
  - @toptal/picasso-tree-view@3.0.33
  - @toptal/picasso-typography@4.0.3
  - @toptal/picasso-typography-overflow@4.0.3
  - @toptal/picasso-user-badge@5.1.11
  - @toptal/picasso-show-more@2.0.20
  - @toptal/picasso-empty-state@2.0.13
  - @toptal/picasso-note@4.0.4
  - @toptal/picasso-quote@2.0.6
  - @toptal/picasso-switch@4.0.11

## 53.1.0

### Minor Changes

- [#4743](https://github.com/toptal/picasso/pull/4743) [`8d415f6`](https://github.com/toptal/picasso/commit/8d415f60ed7dc215ea26d0cd08085f3d38e42638) Thanks [@denieler](https://github.com/denieler)!

---

- new components FormLevelError and FormLevelWarning are introduced to establish the way to represent form-level errors and warnings in the forms.

### Patch Changes

- [#4743](https://github.com/toptal/picasso/pull/4743) [`8d415f6`](https://github.com/toptal/picasso/commit/8d415f60ed7dc215ea26d0cd08085f3d38e42638) Thanks [@denieler](https://github.com/denieler)!

---

- introduced additional form-label and form-layout packages that are used internally to solve cross-package circular dependencies.
- Updated dependencies [[`8d415f6`](https://github.com/toptal/picasso/commit/8d415f60ed7dc215ea26d0cd08085f3d38e42638), [`8d415f6`](https://github.com/toptal/picasso/commit/8d415f60ed7dc215ea26d0cd08085f3d38e42638)]:
  - @toptal/picasso-form-label@1.0.1
  - @toptal/picasso-checkbox@5.0.11
  - @toptal/picasso-switch@4.0.10
  - @toptal/picasso-radio@5.0.11
  - @toptal/picasso-form@6.2.0
  - @toptal/picasso-button@4.0.20
  - @toptal/picasso-autocomplete@5.1.2
  - @toptal/picasso-dropzone@5.0.19
  - @toptal/picasso-file-input@4.0.18
  - @toptal/picasso-input@4.0.19
  - @toptal/picasso-number-input@4.1.3
  - @toptal/picasso-outlined-input@4.0.19
  - @toptal/picasso-select@4.0.19
  - @toptal/picasso-tagselector@3.2.3
  - @toptal/picasso-accordion@3.0.19
  - @toptal/picasso-alert@3.0.31
  - @toptal/picasso-application-update-notification@2.0.31
  - @toptal/picasso-calendar@4.1.2
  - @toptal/picasso-carousel@4.0.20
  - @toptal/picasso-drawer@3.0.31
  - @toptal/picasso-helpbox@5.0.20
  - @toptal/picasso-modal@3.0.31
  - @toptal/picasso-notification@4.0.20
  - @toptal/picasso-page@5.4.3
  - @toptal/picasso-pagination@4.0.21
  - @toptal/picasso-password-input@5.0.19
  - @toptal/picasso-prompt-modal@2.0.31
  - @toptal/picasso-section@5.1.3
  - @toptal/picasso-show-more@2.0.19
  - @toptal/picasso-skeleton-loader@1.0.56
  - @toptal/picasso-table@3.0.21
  - @toptal/picasso-tree-view@3.0.32
  - @toptal/picasso-date-picker@3.1.2
  - @toptal/picasso-timepicker@4.0.20
  - @toptal/picasso-avatar-upload@3.0.23
  - @toptal/picasso-date-select@1.0.68

## 53.0.29

### Patch Changes

- Updated dependencies [[`d7ba29a`](https://github.com/toptal/picasso/commit/d7ba29af8935cc97ab7aa48fbe79d63a7403060a)]:
  - @toptal/picasso-icons@1.12.0
  - @toptal/picasso-accordion@3.0.18
  - @toptal/picasso-account-select@3.0.15
  - @toptal/picasso-alert@3.0.30
  - @toptal/picasso-application-update-notification@2.0.30
  - @toptal/picasso-avatar@6.1.9
  - @toptal/picasso-avatar-upload@3.0.22
  - @toptal/picasso-breadcrumbs@3.0.9
  - @toptal/picasso-button@4.0.19
  - @toptal/picasso-calendar@4.1.1
  - @toptal/picasso-carousel@4.0.19
  - @toptal/picasso-date-picker@3.1.1
  - @toptal/picasso-drawer@3.0.30
  - @toptal/picasso-dropzone@5.0.18
  - @toptal/picasso-empty-state@2.0.12
  - @toptal/picasso-file-input@4.0.17
  - @toptal/picasso-form@6.1.8
  - @toptal/picasso-grid@5.0.8
  - @toptal/picasso-helpbox@5.0.19
  - @toptal/picasso-input@4.0.18
  - @toptal/picasso-input-adornment@3.0.9
  - @toptal/picasso-list@5.0.9
  - @toptal/picasso-logo@2.0.8
  - @toptal/picasso-menu@3.0.14
  - @toptal/picasso-modal@3.0.30
  - @toptal/picasso-notification@4.0.19
  - @toptal/picasso-number-input@4.1.2
  - @toptal/picasso-outlined-input@4.0.18
  - @toptal/picasso-page@5.4.2
  - @toptal/picasso-password-input@5.0.18
  - @toptal/picasso-rating@3.0.9
  - @toptal/picasso-section@5.1.2
  - @toptal/picasso-select@4.0.18
  - @toptal/picasso-show-more@2.0.18
  - @toptal/picasso-step@4.0.8
  - @toptal/picasso-table@3.0.20
  - @toptal/picasso-tabs@5.0.13
  - @toptal/picasso-tag@4.0.9
  - @toptal/picasso-timepicker@4.0.19
  - @toptal/picasso-user-badge@5.1.10
  - @toptal/picasso-pagination@4.0.20
  - @toptal/picasso-prompt-modal@2.0.30
  - @toptal/picasso-skeleton-loader@1.0.55
  - @toptal/picasso-tree-view@3.0.31
  - @toptal/picasso-autocomplete@5.1.1
  - @toptal/picasso-checkbox@5.0.10
  - @toptal/picasso-radio@5.0.10
  - @toptal/picasso-switch@4.0.9
  - @toptal/picasso-tagselector@3.2.2
  - @toptal/picasso-date-select@1.0.67

## 53.0.28

### Patch Changes

- Updated dependencies [[`5714528`](https://github.com/toptal/picasso/commit/5714528c24bdb19f66e2f728978b01a311d9b700)]:
  - @toptal/picasso-date-picker@3.1.0
  - @toptal/picasso-calendar@4.1.0

## 53.0.27

### Patch Changes

- Updated dependencies [[`ea49927`](https://github.com/toptal/picasso/commit/ea49927fb27852a89a50432cbec510bfc3706590)]:
  - @toptal/picasso-page@5.4.1

## 53.0.26

### Patch Changes

- Updated dependencies [[`8f97160`](https://github.com/toptal/picasso/commit/8f971603cd8576c0a6485a3d310f04e18a8a1bc2)]:
  - @toptal/picasso-page@5.4.0

## 53.0.25

### Patch Changes

- Updated dependencies [[`6b41628`](https://github.com/toptal/picasso/commit/6b41628fd589efbb54edcdc05c0cd7efac4a4732)]:
  - @toptal/picasso-page@5.3.0

## 53.0.24

### Patch Changes

- Updated dependencies [[`32d45e4`](https://github.com/toptal/picasso/commit/32d45e4765fbf0ffaae760e8c04a0ee266bd84c3)]:
  - @toptal/picasso-section@5.1.1

## 53.0.23

### Patch Changes

- Updated dependencies [[`efcdd8e`](https://github.com/toptal/picasso/commit/efcdd8eb41f30ed00e64cfa6253310119b7421ea)]:
  - @toptal/picasso-page@5.2.3

## 53.0.22

### Patch Changes

- Updated dependencies [[`da9f360`](https://github.com/toptal/picasso/commit/da9f360e93f65215907928948d7697cf6b1dc4af)]:
  - @toptal/picasso-page@5.2.2

## 53.0.21

### Patch Changes

- Updated dependencies [[`08c8141`](https://github.com/toptal/picasso/commit/08c81414eb7965a20ad00852d721636bb64f184c)]:
  - @toptal/picasso-page@5.2.1

## 53.0.20

### Patch Changes

- Updated dependencies [[`f337756`](https://github.com/toptal/picasso/commit/f33775679304c447ffe377b279c790d8eced266b)]:
  - @toptal/picasso-page@5.2.0

## 53.0.19

### Patch Changes

- Updated dependencies [[`00d74d6`](https://github.com/toptal/picasso/commit/00d74d6683d1e37d730b13591cd0f801d613c19b)]:
  - @toptal/picasso-autocomplete@5.1.0
  - @toptal/picasso-page@5.1.21
  - @toptal/picasso-tagselector@3.2.1

## 53.0.18

### Patch Changes

- Updated dependencies [[`df6e61b`](https://github.com/toptal/picasso/commit/df6e61baf1cf56158814b4ca8c5c5638799ed5f4)]:
  - @toptal/picasso-tagselector@3.2.0

## 53.0.17

### Patch Changes

- Updated dependencies [[`7447748`](https://github.com/toptal/picasso/commit/74477483a287d27229c12a8e8788381955155dc3)]:
  - @toptal/picasso-table@3.0.19

## 53.0.16

### Patch Changes

- Updated dependencies [[`41dce38`](https://github.com/toptal/picasso/commit/41dce38c2790ab7642f984024335802c2e0c8965)]:
  - @toptal/picasso-section@5.1.0

## 53.0.15

### Patch Changes

- Updated dependencies [[`1f985cb`](https://github.com/toptal/picasso/commit/1f985cb82c6292cbe81bce96d1ebd6f6fd476b34)]:
  - @toptal/picasso-pagination@4.0.19

## 53.0.14

### Patch Changes

- Updated dependencies [[`fc811e8`](https://github.com/toptal/picasso/commit/fc811e8a4c1df2105bc83af72a264e69ef776dbe)]:
  - @toptal/picasso-page@5.1.20

## 53.0.13

### Patch Changes

- Updated dependencies [[`bb47d73`](https://github.com/toptal/picasso/commit/bb47d739884b873182ba45c4cea714c799e0fccd)]:
  - @toptal/picasso-button@4.0.18
  - @toptal/picasso-accordion@3.0.17
  - @toptal/picasso-alert@3.0.29
  - @toptal/picasso-application-update-notification@2.0.29
  - @toptal/picasso-calendar@4.0.18
  - @toptal/picasso-carousel@4.0.18
  - @toptal/picasso-drawer@3.0.29
  - @toptal/picasso-file-input@4.0.16
  - @toptal/picasso-helpbox@5.0.18
  - @toptal/picasso-modal@3.0.29
  - @toptal/picasso-notification@4.0.18
  - @toptal/picasso-outlined-input@4.0.17
  - @toptal/picasso-page@5.1.19
  - @toptal/picasso-pagination@4.0.18
  - @toptal/picasso-password-input@5.0.17
  - @toptal/picasso-prompt-modal@2.0.29
  - @toptal/picasso-section@5.0.18
  - @toptal/picasso-show-more@2.0.17
  - @toptal/picasso-skeleton-loader@1.0.54
  - @toptal/picasso-table@3.0.18
  - @toptal/picasso-tree-view@3.0.30
  - @toptal/picasso-date-picker@3.0.17
  - @toptal/picasso-dropzone@5.0.17
  - @toptal/picasso-autocomplete@5.0.19
  - @toptal/picasso-avatar-upload@3.0.21
  - @toptal/picasso-input@4.0.17
  - @toptal/picasso-number-input@4.1.1
  - @toptal/picasso-select@4.0.17
  - @toptal/picasso-tagselector@3.1.19
  - @toptal/picasso-timepicker@4.0.18
  - @toptal/picasso-date-select@1.0.66

## 53.0.12

### Patch Changes

- Updated dependencies [[`5b24021`](https://github.com/toptal/picasso/commit/5b24021fb4becb9147434d3b9440c06a51daf0d1)]:
  - @toptal/picasso-tabs@5.0.12

## 53.0.11

### Patch Changes

- Updated dependencies [[`c1a7cbb`](https://github.com/toptal/picasso/commit/c1a7cbb9592cc7f27e4d9bcbb3e85e550bb4cabc)]:
  - @toptal/picasso-number-input@4.1.0

## 53.0.10

### Patch Changes

- Updated dependencies [[`cf69d42`](https://github.com/toptal/picasso/commit/cf69d4231e4ac6e53b9c31d62ca134d9472b33a0)]:
  - @toptal/picasso-timepicker@4.0.17

## 53.0.9

### Patch Changes

- Updated dependencies [[`00ee4e9`](https://github.com/toptal/picasso/commit/00ee4e95cbafa3de5e249cbe6d6528da114ee511)]:
  - @toptal/picasso-tabs@5.0.11

## 53.0.8

### Patch Changes

- Updated dependencies [[`37b95cc`](https://github.com/toptal/picasso/commit/37b95ccd1a28aeb9971f1b8ab27cdcc2190854a8)]:
  - @toptal/picasso-icons@1.11.0
  - @toptal/picasso-accordion@3.0.16
  - @toptal/picasso-account-select@3.0.14
  - @toptal/picasso-alert@3.0.28
  - @toptal/picasso-application-update-notification@2.0.28
  - @toptal/picasso-avatar@6.1.8
  - @toptal/picasso-avatar-upload@3.0.20
  - @toptal/picasso-breadcrumbs@3.0.8
  - @toptal/picasso-button@4.0.17
  - @toptal/picasso-calendar@4.0.17
  - @toptal/picasso-carousel@4.0.17
  - @toptal/picasso-date-picker@3.0.16
  - @toptal/picasso-drawer@3.0.28
  - @toptal/picasso-dropzone@5.0.16
  - @toptal/picasso-empty-state@2.0.11
  - @toptal/picasso-file-input@4.0.15
  - @toptal/picasso-form@6.1.7
  - @toptal/picasso-grid@5.0.7
  - @toptal/picasso-helpbox@5.0.17
  - @toptal/picasso-input@4.0.16
  - @toptal/picasso-input-adornment@3.0.8
  - @toptal/picasso-list@5.0.8
  - @toptal/picasso-logo@2.0.7
  - @toptal/picasso-menu@3.0.13
  - @toptal/picasso-modal@3.0.28
  - @toptal/picasso-notification@4.0.17
  - @toptal/picasso-number-input@4.0.20
  - @toptal/picasso-outlined-input@4.0.16
  - @toptal/picasso-page@5.1.18
  - @toptal/picasso-password-input@5.0.16
  - @toptal/picasso-rating@3.0.8
  - @toptal/picasso-section@5.0.17
  - @toptal/picasso-select@4.0.16
  - @toptal/picasso-show-more@2.0.16
  - @toptal/picasso-step@4.0.7
  - @toptal/picasso-table@3.0.17
  - @toptal/picasso-tabs@5.0.10
  - @toptal/picasso-tag@4.0.8
  - @toptal/picasso-timepicker@4.0.16
  - @toptal/picasso-user-badge@5.1.9
  - @toptal/picasso-pagination@4.0.17
  - @toptal/picasso-prompt-modal@2.0.28
  - @toptal/picasso-skeleton-loader@1.0.53
  - @toptal/picasso-tree-view@3.0.29
  - @toptal/picasso-autocomplete@5.0.18
  - @toptal/picasso-checkbox@5.0.9
  - @toptal/picasso-radio@5.0.9
  - @toptal/picasso-switch@4.0.8
  - @toptal/picasso-tagselector@3.1.18
  - @toptal/picasso-date-select@1.0.65

## 53.0.7

### Patch Changes

- Updated dependencies [[`bad3a6d`](https://github.com/toptal/picasso/commit/bad3a6dd4dbdfef0a06b47a6e33aa1530eaca8ed)]:
  - @toptal/picasso-icons@1.10.0
  - @toptal/picasso-accordion@3.0.15
  - @toptal/picasso-account-select@3.0.13
  - @toptal/picasso-alert@3.0.27
  - @toptal/picasso-application-update-notification@2.0.27
  - @toptal/picasso-avatar@6.1.7
  - @toptal/picasso-avatar-upload@3.0.19
  - @toptal/picasso-breadcrumbs@3.0.7
  - @toptal/picasso-button@4.0.16
  - @toptal/picasso-calendar@4.0.16
  - @toptal/picasso-carousel@4.0.16
  - @toptal/picasso-date-picker@3.0.15
  - @toptal/picasso-drawer@3.0.27
  - @toptal/picasso-dropzone@5.0.15
  - @toptal/picasso-empty-state@2.0.10
  - @toptal/picasso-file-input@4.0.14
  - @toptal/picasso-form@6.1.6
  - @toptal/picasso-grid@5.0.6
  - @toptal/picasso-helpbox@5.0.16
  - @toptal/picasso-input@4.0.15
  - @toptal/picasso-input-adornment@3.0.7
  - @toptal/picasso-list@5.0.7
  - @toptal/picasso-logo@2.0.6
  - @toptal/picasso-menu@3.0.12
  - @toptal/picasso-modal@3.0.27
  - @toptal/picasso-notification@4.0.16
  - @toptal/picasso-number-input@4.0.19
  - @toptal/picasso-outlined-input@4.0.15
  - @toptal/picasso-page@5.1.17
  - @toptal/picasso-password-input@5.0.15
  - @toptal/picasso-rating@3.0.7
  - @toptal/picasso-section@5.0.16
  - @toptal/picasso-select@4.0.15
  - @toptal/picasso-show-more@2.0.15
  - @toptal/picasso-step@4.0.6
  - @toptal/picasso-table@3.0.16
  - @toptal/picasso-tabs@5.0.9
  - @toptal/picasso-tag@4.0.7
  - @toptal/picasso-timepicker@4.0.15
  - @toptal/picasso-user-badge@5.1.8
  - @toptal/picasso-pagination@4.0.16
  - @toptal/picasso-prompt-modal@2.0.27
  - @toptal/picasso-skeleton-loader@1.0.52
  - @toptal/picasso-tree-view@3.0.28
  - @toptal/picasso-autocomplete@5.0.17
  - @toptal/picasso-checkbox@5.0.8
  - @toptal/picasso-radio@5.0.8
  - @toptal/picasso-switch@4.0.7
  - @toptal/picasso-tagselector@3.1.17
  - @toptal/picasso-date-select@1.0.64

## 53.0.6

### Patch Changes

- Updated dependencies [[`41357fe`](https://github.com/toptal/picasso/commit/41357fe4ac2d804ce6cb7f1dbc7a8b00e7cb77df)]:
  - @toptal/picasso-icons@1.9.0
  - @toptal/picasso-accordion@3.0.14
  - @toptal/picasso-account-select@3.0.12
  - @toptal/picasso-alert@3.0.26
  - @toptal/picasso-application-update-notification@2.0.26
  - @toptal/picasso-avatar@6.1.6
  - @toptal/picasso-avatar-upload@3.0.18
  - @toptal/picasso-breadcrumbs@3.0.6
  - @toptal/picasso-button@4.0.15
  - @toptal/picasso-calendar@4.0.15
  - @toptal/picasso-carousel@4.0.15
  - @toptal/picasso-date-picker@3.0.14
  - @toptal/picasso-drawer@3.0.26
  - @toptal/picasso-dropzone@5.0.14
  - @toptal/picasso-empty-state@2.0.9
  - @toptal/picasso-file-input@4.0.13
  - @toptal/picasso-form@6.1.5
  - @toptal/picasso-grid@5.0.5
  - @toptal/picasso-helpbox@5.0.15
  - @toptal/picasso-input@4.0.14
  - @toptal/picasso-input-adornment@3.0.6
  - @toptal/picasso-list@5.0.6
  - @toptal/picasso-logo@2.0.5
  - @toptal/picasso-menu@3.0.11
  - @toptal/picasso-modal@3.0.26
  - @toptal/picasso-notification@4.0.15
  - @toptal/picasso-number-input@4.0.18
  - @toptal/picasso-outlined-input@4.0.14
  - @toptal/picasso-page@5.1.16
  - @toptal/picasso-password-input@5.0.14
  - @toptal/picasso-rating@3.0.6
  - @toptal/picasso-section@5.0.15
  - @toptal/picasso-select@4.0.14
  - @toptal/picasso-show-more@2.0.14
  - @toptal/picasso-step@4.0.5
  - @toptal/picasso-table@3.0.15
  - @toptal/picasso-tabs@5.0.8
  - @toptal/picasso-tag@4.0.6
  - @toptal/picasso-timepicker@4.0.14
  - @toptal/picasso-user-badge@5.1.7
  - @toptal/picasso-pagination@4.0.15
  - @toptal/picasso-prompt-modal@2.0.26
  - @toptal/picasso-skeleton-loader@1.0.51
  - @toptal/picasso-tree-view@3.0.27
  - @toptal/picasso-autocomplete@5.0.16
  - @toptal/picasso-checkbox@5.0.7
  - @toptal/picasso-radio@5.0.7
  - @toptal/picasso-switch@4.0.6
  - @toptal/picasso-tagselector@3.1.16
  - @toptal/picasso-date-select@1.0.63

## 53.0.5

### Patch Changes

- Updated dependencies [[`b3868a1`](https://github.com/toptal/picasso/commit/b3868a1c174d9567b4d1638089ea5ab5f941f252)]:
  - @toptal/picasso-outlined-input@4.0.13
  - @toptal/picasso-select@4.0.13
  - @toptal/picasso-input@4.0.13
  - @toptal/picasso-autocomplete@5.0.15
  - @toptal/picasso-avatar-upload@3.0.17
  - @toptal/picasso-date-picker@3.0.13
  - @toptal/picasso-number-input@4.0.17
  - @toptal/picasso-password-input@5.0.13
  - @toptal/picasso-tagselector@3.1.15
  - @toptal/picasso-timepicker@4.0.13
  - @toptal/picasso-date-select@1.0.62
  - @toptal/picasso-page@5.1.15

## 53.0.4

### Patch Changes

- Updated dependencies [[`1cafabe`](https://github.com/toptal/picasso/commit/1cafabe2e3926a5332f6cc106826cf9b1b8b73b1)]:
  - @toptal/picasso-number-input@4.0.16

## 53.0.3

### Patch Changes

- [#4608](https://github.com/toptal/picasso/pull/4608) [`980c0ae`](https://github.com/toptal/picasso/commit/980c0ae9e111d73a114b5b52ed640ce3972ef6d6) Thanks [@sashuk](https://github.com/sashuk)!

### NumberInput

- fix border rendering for controls
- Updated dependencies [[`980c0ae`](https://github.com/toptal/picasso/commit/980c0ae9e111d73a114b5b52ed640ce3972ef6d6)]:
  - @toptal/picasso-number-input@4.0.15

## 53.0.2

### Patch Changes

- [#4606](https://github.com/toptal/picasso/pull/4606) [`2c4c584`](https://github.com/toptal/picasso/commit/2c4c584c72a093ec1b778961d28864ef6fbf5c4d) Thanks [@sashuk](https://github.com/sashuk)!

### NumberInput

- disable value change on mouse wheel (to enable the behavior, use `enableMouseWheelChange` prop)
- Updated dependencies [[`2c4c584`](https://github.com/toptal/picasso/commit/2c4c584c72a093ec1b778961d28864ef6fbf5c4d)]:
  - @toptal/picasso-number-input@4.0.14

## 53.0.1

### Patch Changes

- [#4604](https://github.com/toptal/picasso/pull/4604) [`1ba3f82`](https://github.com/toptal/picasso/commit/1ba3f82802f018025ef899746a7914c5777354d2) Thanks [@sashuk](https://github.com/sashuk)!

### NumberInput

- restore `type=button` in number input controls
- Updated dependencies [[`1ba3f82`](https://github.com/toptal/picasso/commit/1ba3f82802f018025ef899746a7914c5777354d2)]:
  - @toptal/picasso-number-input@4.0.13

## 53.0.0

### Major Changes

- [#4572](https://github.com/toptal/picasso/pull/4572) [`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### useOnScreen

- change return value of the hook to let component know when the oberver starts observing

```diff
-const isOnScreen = useOnScreen({...})
+const { isOnScreen, isObserved } = useOnScreen({...})
```

### Patch Changes

- [#4572](https://github.com/toptal/picasso/pull/4572) [`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Slider

- fix initial position of Tooltip
- Updated dependencies [[`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498), [`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498), [`0dbab90`](https://github.com/toptal/picasso/commit/0dbab90237a18e15e092355bb2f894395148e498)]:
  - @toptal/picasso-slider@4.0.3
  - @toptal/picasso-carousel@4.0.14
  - @toptal/picasso-utils@3.0.0
  - @toptal/picasso-accordion@3.0.13
  - @toptal/picasso-account-select@3.0.11
  - @toptal/picasso-alert@3.0.25
  - @toptal/picasso-amount@1.0.9
  - @toptal/picasso-application-update-notification@2.0.25
  - @toptal/picasso-autocomplete@5.0.14
  - @toptal/picasso-avatar@6.1.5
  - @toptal/picasso-avatar-upload@3.0.16
  - @toptal/picasso-badge@3.0.3
  - @toptal/picasso-breadcrumbs@3.0.5
  - @toptal/picasso-button@4.0.14
  - @toptal/picasso-calendar@4.0.14
  - @toptal/picasso-checkbox@5.0.6
  - @toptal/picasso-container@3.1.1
  - @toptal/picasso-date-picker@3.0.12
  - @toptal/picasso-date-select@1.0.61
  - @toptal/picasso-drawer@3.0.25
  - @toptal/picasso-dropdown@4.2.1
  - @toptal/picasso-dropzone@5.0.13
  - @toptal/picasso-file-input@4.0.12
  - @toptal/picasso-form@6.1.4
  - @toptal/picasso-grid@5.0.4
  - @toptal/picasso-helpbox@5.0.14
  - @toptal/picasso-icons@1.8.1
  - @toptal/picasso-image@3.0.2
  - @toptal/picasso-input@4.0.12
  - @toptal/picasso-input-adornment@3.0.5
  - @toptal/picasso-link@3.0.4
  - @toptal/picasso-list@5.0.5
  - @toptal/picasso-loader@3.0.2
  - @toptal/picasso-logo@2.0.4
  - @toptal/picasso-menu@3.0.10
  - @toptal/picasso-modal@3.0.25
  - @toptal/picasso-notification@4.0.14
  - @toptal/picasso-number-input@4.0.12
  - @toptal/picasso-outlined-input@4.0.12
  - @toptal/picasso-overview-block@4.0.3
  - @toptal/picasso-page@5.1.14
  - @toptal/picasso-pagination@4.0.14
  - @toptal/picasso-paper@4.0.2
  - @toptal/picasso-password-input@5.0.12
  - @toptal/picasso-popper@1.0.5
  - @toptal/picasso-prompt-modal@2.0.25
  - @toptal/picasso-radio@5.0.6
  - @toptal/picasso-rating@3.0.5
  - @toptal/picasso-section@5.0.14
  - @toptal/picasso-select@4.0.12
  - @toptal/picasso-skeleton-loader@1.0.50
  - @toptal/picasso-step@4.0.4
  - @toptal/picasso-table@3.0.14
  - @toptal/picasso-tabs@5.0.7
  - @toptal/picasso-tag@4.0.5
  - @toptal/picasso-tagselector@3.1.14
  - @toptal/picasso-timeline@5.0.3
  - @toptal/picasso-timepicker@4.0.12
  - @toptal/picasso-tooltip@2.0.1
  - @toptal/picasso-tree-view@3.0.26
  - @toptal/picasso-typography@4.0.2
  - @toptal/picasso-typography-overflow@4.0.2
  - @toptal/picasso-user-badge@5.1.6
  - @toptal/picasso-show-more@2.0.13
  - @toptal/picasso-empty-state@2.0.8
  - @toptal/picasso-note@4.0.3
  - @toptal/picasso-quote@2.0.5
  - @toptal/picasso-switch@4.0.5

## 52.1.9

### Patch Changes

- [#4597](https://github.com/toptal/picasso/pull/4597) [`05fa2c9`](https://github.com/toptal/picasso/commit/05fa2c927de80a218fe2cf59042c4e7db1cb8e11) Thanks [@sashuk](https://github.com/sashuk)!

### PageSidebar

- migrate `PageSidebar` to TailwindCSS
- Updated dependencies [[`f8cb675`](https://github.com/toptal/picasso/commit/f8cb675a660c22afd128bbdb76c4eeeac9f9ca27), [`05fa2c9`](https://github.com/toptal/picasso/commit/05fa2c927de80a218fe2cf59042c4e7db1cb8e11)]:
  - @toptal/picasso-icons@1.8.0
  - @toptal/picasso-page@5.1.13
  - @toptal/picasso-accordion@3.0.12
  - @toptal/picasso-account-select@3.0.10
  - @toptal/picasso-alert@3.0.24
  - @toptal/picasso-application-update-notification@2.0.24
  - @toptal/picasso-avatar@6.1.4
  - @toptal/picasso-avatar-upload@3.0.15
  - @toptal/picasso-breadcrumbs@3.0.4
  - @toptal/picasso-button@4.0.13
  - @toptal/picasso-calendar@4.0.13
  - @toptal/picasso-carousel@4.0.13
  - @toptal/picasso-date-picker@3.0.11
  - @toptal/picasso-drawer@3.0.24
  - @toptal/picasso-dropzone@5.0.12
  - @toptal/picasso-empty-state@2.0.7
  - @toptal/picasso-file-input@4.0.11
  - @toptal/picasso-form@6.1.3
  - @toptal/picasso-grid@5.0.3
  - @toptal/picasso-helpbox@5.0.13
  - @toptal/picasso-input@4.0.11
  - @toptal/picasso-input-adornment@3.0.4
  - @toptal/picasso-list@5.0.4
  - @toptal/picasso-logo@2.0.3
  - @toptal/picasso-menu@3.0.9
  - @toptal/picasso-modal@3.0.24
  - @toptal/picasso-notification@4.0.13
  - @toptal/picasso-number-input@4.0.11
  - @toptal/picasso-outlined-input@4.0.11
  - @toptal/picasso-password-input@5.0.11
  - @toptal/picasso-rating@3.0.4
  - @toptal/picasso-section@5.0.13
  - @toptal/picasso-select@4.0.11
  - @toptal/picasso-show-more@2.0.12
  - @toptal/picasso-step@4.0.3
  - @toptal/picasso-table@3.0.13
  - @toptal/picasso-tabs@5.0.6
  - @toptal/picasso-tag@4.0.4
  - @toptal/picasso-timepicker@4.0.11
  - @toptal/picasso-user-badge@5.1.5
  - @toptal/picasso-pagination@4.0.13
  - @toptal/picasso-prompt-modal@2.0.24
  - @toptal/picasso-skeleton-loader@1.0.49
  - @toptal/picasso-tree-view@3.0.25
  - @toptal/picasso-autocomplete@5.0.13
  - @toptal/picasso-checkbox@5.0.5
  - @toptal/picasso-radio@5.0.5
  - @toptal/picasso-switch@4.0.4
  - @toptal/picasso-tagselector@3.1.13
  - @toptal/picasso-date-select@1.0.60

## 52.1.8

### Patch Changes

- Updated dependencies [[`0dda7dc`](https://github.com/toptal/picasso/commit/0dda7dc3dd41aba05055f3d765497831f816cfaa), [`0dda7dc`](https://github.com/toptal/picasso/commit/0dda7dc3dd41aba05055f3d765497831f816cfaa)]:
  - @toptal/picasso-user-badge@5.1.4
  - @toptal/picasso-page@5.1.12
  - @toptal/picasso-account-select@3.0.9
  - @toptal/picasso-tabs@5.0.5

## 52.1.7

### Patch Changes

- Updated dependencies [[`7d2ff8f`](https://github.com/toptal/picasso/commit/7d2ff8fdcfc8251084fe63b0d28458540a07d721)]:
  - @toptal/picasso-page@5.1.11

## 52.1.6

### Patch Changes

- [#4586](https://github.com/toptal/picasso/pull/4586) [`6af79c2`](https://github.com/toptal/picasso/commit/6af79c22523e07c8f539a18093949f9c363c90ba) Thanks [@sashuk](https://github.com/sashuk)!

### OutlinedInput

- fix the text breaking logic for adornments in inputs
- Updated dependencies [[`6af79c2`](https://github.com/toptal/picasso/commit/6af79c22523e07c8f539a18093949f9c363c90ba)]:
  - @toptal/picasso-outlined-input@4.0.10
  - @toptal/picasso-autocomplete@5.0.12
  - @toptal/picasso-number-input@4.0.10
  - @toptal/picasso-tagselector@3.1.12
  - @toptal/picasso-date-picker@3.0.10
  - @toptal/picasso-date-select@1.0.59
  - @toptal/picasso-timepicker@4.0.10
  - @toptal/picasso-select@4.0.10
  - @toptal/picasso-input@4.0.10
  - @toptal/picasso-form@6.1.2
  - @toptal/picasso-page@5.1.10
  - @toptal/picasso-avatar-upload@3.0.14
  - @toptal/picasso-password-input@5.0.10
  - @toptal/picasso-checkbox@5.0.4
  - @toptal/picasso-dropzone@5.0.11
  - @toptal/picasso-file-input@4.0.10
  - @toptal/picasso-radio@5.0.4
  - @toptal/picasso-switch@4.0.3
  - @toptal/picasso-button@4.0.12
  - @toptal/picasso-accordion@3.0.11
  - @toptal/picasso-alert@3.0.23
  - @toptal/picasso-application-update-notification@2.0.23
  - @toptal/picasso-calendar@4.0.12
  - @toptal/picasso-carousel@4.0.12
  - @toptal/picasso-drawer@3.0.23
  - @toptal/picasso-helpbox@5.0.12
  - @toptal/picasso-modal@3.0.23
  - @toptal/picasso-notification@4.0.12
  - @toptal/picasso-pagination@4.0.12
  - @toptal/picasso-prompt-modal@2.0.23
  - @toptal/picasso-section@5.0.12
  - @toptal/picasso-show-more@2.0.11
  - @toptal/picasso-skeleton-loader@1.0.48
  - @toptal/picasso-table@3.0.12
  - @toptal/picasso-tree-view@3.0.24

## 52.1.5

### Patch Changes

- Updated dependencies [[`c8a6762`](https://github.com/toptal/picasso/commit/c8a676272ac1050c987ba63742609e7d010021af)]:
  - @toptal/picasso-page@5.1.9

## 52.1.4

### Patch Changes

- Updated dependencies [[`ad34150`](https://github.com/toptal/picasso/commit/ad34150858a482fb56ffc981ed04d0743350104b)]:
  - @toptal/picasso-page@5.1.8

## 52.1.3

### Patch Changes

- [#4580](https://github.com/toptal/picasso/pull/4580) [`aa78d0d`](https://github.com/toptal/picasso/commit/aa78d0d45e209d8b81c2b68b87024adf55ee0434) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Button

- fix active state of buttons in button group
- Updated dependencies [[`aa78d0d`](https://github.com/toptal/picasso/commit/aa78d0d45e209d8b81c2b68b87024adf55ee0434)]:
  - @toptal/picasso-button@4.0.11
  - @toptal/picasso-accordion@3.0.10
  - @toptal/picasso-alert@3.0.22
  - @toptal/picasso-application-update-notification@2.0.22
  - @toptal/picasso-calendar@4.0.11
  - @toptal/picasso-carousel@4.0.11
  - @toptal/picasso-drawer@3.0.22
  - @toptal/picasso-file-input@4.0.9
  - @toptal/picasso-helpbox@5.0.11
  - @toptal/picasso-modal@3.0.22
  - @toptal/picasso-notification@4.0.11
  - @toptal/picasso-outlined-input@4.0.9
  - @toptal/picasso-page@5.1.7
  - @toptal/picasso-pagination@4.0.11
  - @toptal/picasso-password-input@5.0.9
  - @toptal/picasso-prompt-modal@2.0.22
  - @toptal/picasso-section@5.0.11
  - @toptal/picasso-show-more@2.0.10
  - @toptal/picasso-skeleton-loader@1.0.47
  - @toptal/picasso-table@3.0.11
  - @toptal/picasso-tree-view@3.0.23
  - @toptal/picasso-date-picker@3.0.9
  - @toptal/picasso-dropzone@5.0.10
  - @toptal/picasso-autocomplete@5.0.11
  - @toptal/picasso-avatar-upload@3.0.13
  - @toptal/picasso-input@4.0.9
  - @toptal/picasso-number-input@4.0.9
  - @toptal/picasso-select@4.0.9
  - @toptal/picasso-tagselector@3.1.11
  - @toptal/picasso-timepicker@4.0.9
  - @toptal/picasso-date-select@1.0.58

## 52.1.2

### Patch Changes

- Updated dependencies [[`0c35d60`](https://github.com/toptal/picasso/commit/0c35d60122cdb3a13bad4b28b827e1f4123341fa)]:
  - @toptal/picasso-tree-view@3.0.22

## 52.1.1

### Patch Changes

- Updated dependencies [[`e11be3f`](https://github.com/toptal/picasso/commit/e11be3f5663ec1ef18ac45e37a77ead984588c3d)]:
  - @toptal/picasso-page@5.1.6

## 52.1.0

### Minor Changes

- [#4568](https://github.com/toptal/picasso/pull/4568) [`75087fa`](https://github.com/toptal/picasso/commit/75087fa5ddbb989681255807fba61288b207e2b6) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Dropdown

- support disabled state

### Patch Changes

- [#4568](https://github.com/toptal/picasso/pull/4568) [`75087fa`](https://github.com/toptal/picasso/commit/75087fa5ddbb989681255807fba61288b207e2b6) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### PageSidebar

- fix disabled state for collapsible compact sidebar item
- Updated dependencies [[`75087fa`](https://github.com/toptal/picasso/commit/75087fa5ddbb989681255807fba61288b207e2b6), [`75087fa`](https://github.com/toptal/picasso/commit/75087fa5ddbb989681255807fba61288b207e2b6)]:
  - @toptal/picasso-dropdown@4.2.0
  - @toptal/picasso-page@5.1.5
  - @toptal/picasso-button@4.0.10
  - @toptal/picasso-accordion@3.0.9
  - @toptal/picasso-alert@3.0.21
  - @toptal/picasso-application-update-notification@2.0.21
  - @toptal/picasso-calendar@4.0.10
  - @toptal/picasso-carousel@4.0.10
  - @toptal/picasso-drawer@3.0.21
  - @toptal/picasso-file-input@4.0.8
  - @toptal/picasso-helpbox@5.0.10
  - @toptal/picasso-modal@3.0.21
  - @toptal/picasso-notification@4.0.10
  - @toptal/picasso-outlined-input@4.0.8
  - @toptal/picasso-pagination@4.0.10
  - @toptal/picasso-password-input@5.0.8
  - @toptal/picasso-prompt-modal@2.0.21
  - @toptal/picasso-section@5.0.10
  - @toptal/picasso-show-more@2.0.9
  - @toptal/picasso-skeleton-loader@1.0.46
  - @toptal/picasso-table@3.0.10
  - @toptal/picasso-tree-view@3.0.21
  - @toptal/picasso-date-picker@3.0.8
  - @toptal/picasso-dropzone@5.0.9
  - @toptal/picasso-autocomplete@5.0.10
  - @toptal/picasso-avatar-upload@3.0.12
  - @toptal/picasso-input@4.0.8
  - @toptal/picasso-number-input@4.0.8
  - @toptal/picasso-select@4.0.8
  - @toptal/picasso-tagselector@3.1.10
  - @toptal/picasso-timepicker@4.0.8
  - @toptal/picasso-date-select@1.0.57

## 52.0.4

### Patch Changes

- [#4567](https://github.com/toptal/picasso/pull/4567) [`5287366`](https://github.com/toptal/picasso/commit/5287366074142990aab61c63a58c74eb48fc50c3) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- update HTML tag of Tag.Rectangular to span

- Updated dependencies [[`5287366`](https://github.com/toptal/picasso/commit/5287366074142990aab61c63a58c74eb48fc50c3)]:
  - @toptal/picasso-tag@4.0.3
  - @toptal/picasso-page@5.1.4
  - @toptal/picasso-tagselector@3.1.9

## 52.0.3

### Patch Changes

- [#4565](https://github.com/toptal/picasso/pull/4565) [`78656d5`](https://github.com/toptal/picasso/commit/78656d5876ea450bc142760dc1b95181378549e6) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- add pointer cursor to Link when only onClick is provided

- Updated dependencies [[`78656d5`](https://github.com/toptal/picasso/commit/78656d5876ea450bc142760dc1b95181378549e6)]:
  - @toptal/picasso-link@3.0.3
  - @toptal/picasso-account-select@3.0.8
  - @toptal/picasso-button@4.0.9
  - @toptal/picasso-menu@3.0.8
  - @toptal/picasso-accordion@3.0.8
  - @toptal/picasso-alert@3.0.20
  - @toptal/picasso-application-update-notification@2.0.20
  - @toptal/picasso-calendar@4.0.9
  - @toptal/picasso-carousel@4.0.9
  - @toptal/picasso-drawer@3.0.20
  - @toptal/picasso-file-input@4.0.7
  - @toptal/picasso-helpbox@5.0.9
  - @toptal/picasso-modal@3.0.20
  - @toptal/picasso-notification@4.0.9
  - @toptal/picasso-outlined-input@4.0.7
  - @toptal/picasso-page@5.1.3
  - @toptal/picasso-pagination@4.0.9
  - @toptal/picasso-password-input@5.0.7
  - @toptal/picasso-prompt-modal@2.0.20
  - @toptal/picasso-section@5.0.9
  - @toptal/picasso-show-more@2.0.8
  - @toptal/picasso-skeleton-loader@1.0.45
  - @toptal/picasso-table@3.0.9
  - @toptal/picasso-tree-view@3.0.20
  - @toptal/picasso-autocomplete@5.0.9
  - @toptal/picasso-select@4.0.7
  - @toptal/picasso-date-picker@3.0.7
  - @toptal/picasso-dropzone@5.0.8
  - @toptal/picasso-avatar-upload@3.0.11
  - @toptal/picasso-input@4.0.7
  - @toptal/picasso-number-input@4.0.7
  - @toptal/picasso-tagselector@3.1.8
  - @toptal/picasso-timepicker@4.0.7
  - @toptal/picasso-date-select@1.0.56

## 52.0.2

### Patch Changes

- Updated dependencies [[`2880a4b`](https://github.com/toptal/picasso/commit/2880a4b68cb4676be3b91b416f45a87d201df715)]:
  - @toptal/picasso-outlined-input@4.0.6
  - @toptal/picasso-dropdown@4.1.2
  - @toptal/picasso-button@4.0.8
  - @toptal/picasso-drawer@3.0.19
  - @toptal/picasso-slider@4.0.2
  - @toptal/picasso-switch@4.0.2
  - @toptal/picasso-badge@3.0.2
  - @toptal/picasso-modal@3.0.19
  - @toptal/picasso-menu@3.0.7
  - @toptal/picasso-autocomplete@5.0.8
  - @toptal/picasso-avatar-upload@3.0.10
  - @toptal/picasso-date-picker@3.0.6
  - @toptal/picasso-input@4.0.6
  - @toptal/picasso-number-input@4.0.6
  - @toptal/picasso-password-input@5.0.6
  - @toptal/picasso-select@4.0.6
  - @toptal/picasso-tagselector@3.1.7
  - @toptal/picasso-timepicker@4.0.6
  - @toptal/picasso-page@5.1.2
  - @toptal/picasso-accordion@3.0.7
  - @toptal/picasso-alert@3.0.19
  - @toptal/picasso-application-update-notification@2.0.19
  - @toptal/picasso-calendar@4.0.8
  - @toptal/picasso-carousel@4.0.8
  - @toptal/picasso-file-input@4.0.6
  - @toptal/picasso-helpbox@5.0.8
  - @toptal/picasso-notification@4.0.8
  - @toptal/picasso-pagination@4.0.8
  - @toptal/picasso-prompt-modal@2.0.19
  - @toptal/picasso-section@5.0.8
  - @toptal/picasso-show-more@2.0.7
  - @toptal/picasso-skeleton-loader@1.0.44
  - @toptal/picasso-table@3.0.8
  - @toptal/picasso-tree-view@3.0.19
  - @toptal/picasso-account-select@3.0.7
  - @toptal/picasso-date-select@1.0.55
  - @toptal/picasso-dropzone@5.0.7

## 52.0.1

### Patch Changes

- Updated dependencies [[`0d88ec7`](https://github.com/toptal/picasso/commit/0d88ec7dfab46c4eb02669ee8d69a921e6cac569)]:
  - @toptal/picasso-icons@1.7.0
  - @toptal/picasso-avatar@6.1.3
  - @toptal/picasso-accordion@3.0.6
  - @toptal/picasso-account-select@3.0.6
  - @toptal/picasso-alert@3.0.18
  - @toptal/picasso-application-update-notification@2.0.18
  - @toptal/picasso-avatar-upload@3.0.9
  - @toptal/picasso-breadcrumbs@3.0.3
  - @toptal/picasso-button@4.0.7
  - @toptal/picasso-calendar@4.0.7
  - @toptal/picasso-carousel@4.0.7
  - @toptal/picasso-date-picker@3.0.5
  - @toptal/picasso-drawer@3.0.18
  - @toptal/picasso-dropzone@5.0.6
  - @toptal/picasso-empty-state@2.0.6
  - @toptal/picasso-file-input@4.0.5
  - @toptal/picasso-form@6.1.1
  - @toptal/picasso-grid@5.0.2
  - @toptal/picasso-helpbox@5.0.7
  - @toptal/picasso-input@4.0.5
  - @toptal/picasso-input-adornment@3.0.3
  - @toptal/picasso-list@5.0.3
  - @toptal/picasso-logo@2.0.2
  - @toptal/picasso-menu@3.0.6
  - @toptal/picasso-modal@3.0.18
  - @toptal/picasso-notification@4.0.7
  - @toptal/picasso-number-input@4.0.5
  - @toptal/picasso-outlined-input@4.0.5
  - @toptal/picasso-page@5.1.1
  - @toptal/picasso-password-input@5.0.5
  - @toptal/picasso-rating@3.0.3
  - @toptal/picasso-section@5.0.7
  - @toptal/picasso-select@4.0.5
  - @toptal/picasso-show-more@2.0.6
  - @toptal/picasso-step@4.0.2
  - @toptal/picasso-table@3.0.7
  - @toptal/picasso-tabs@5.0.4
  - @toptal/picasso-tag@4.0.2
  - @toptal/picasso-timepicker@4.0.5
  - @toptal/picasso-user-badge@5.1.3
  - @toptal/picasso-pagination@4.0.7
  - @toptal/picasso-prompt-modal@2.0.18
  - @toptal/picasso-skeleton-loader@1.0.43
  - @toptal/picasso-tree-view@3.0.18
  - @toptal/picasso-autocomplete@5.0.7
  - @toptal/picasso-checkbox@5.0.3
  - @toptal/picasso-radio@5.0.3
  - @toptal/picasso-switch@4.0.1
  - @toptal/picasso-tagselector@3.1.6
  - @toptal/picasso-date-select@1.0.54

## 52.0.0

### Major Changes

- [#4529](https://github.com/toptal/picasso/pull/4529) [`e7e45d2`](https://github.com/toptal/picasso/commit/e7e45d2349d548bee964db8aebe55c5326725329) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- update `@toptal/picasso-tailwind` to `3.0.0` in peerDependencies with the latest `tailwindcss`

### Patch Changes

- [#4559](https://github.com/toptal/picasso/pull/4559) [`38a7e47`](https://github.com/toptal/picasso/commit/38a7e4795ca8f5d5d39315fcd0c569128d276f78) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Section

- fix padding of collapsible bordered section not following BASE spec
- Updated dependencies [[`e7e45d2`](https://github.com/toptal/picasso/commit/e7e45d2349d548bee964db8aebe55c5326725329), [`e7e45d2`](https://github.com/toptal/picasso/commit/e7e45d2349d548bee964db8aebe55c5326725329), [`38a7e47`](https://github.com/toptal/picasso/commit/38a7e4795ca8f5d5d39315fcd0c569128d276f78), [`e7e45d2`](https://github.com/toptal/picasso/commit/e7e45d2349d548bee964db8aebe55c5326725329)]:
  - @toptal/picasso-tabs@5.0.3
  - @toptal/picasso-button@4.0.6
  - @toptal/picasso-section@5.0.6
  - @toptal/picasso-page@5.1.0
  - @toptal/picasso-select@4.0.4
  - @toptal/picasso-switch@4.0.0
  - @toptal/picasso-tagselector@3.1.5
  - @toptal/picasso-accordion@3.0.5
  - @toptal/picasso-alert@3.0.17
  - @toptal/picasso-application-update-notification@2.0.17
  - @toptal/picasso-calendar@4.0.6
  - @toptal/picasso-carousel@4.0.6
  - @toptal/picasso-drawer@3.0.17
  - @toptal/picasso-file-input@4.0.4
  - @toptal/picasso-helpbox@5.0.6
  - @toptal/picasso-modal@3.0.17
  - @toptal/picasso-notification@4.0.6
  - @toptal/picasso-outlined-input@4.0.4
  - @toptal/picasso-pagination@4.0.6
  - @toptal/picasso-password-input@5.0.4
  - @toptal/picasso-prompt-modal@2.0.17
  - @toptal/picasso-show-more@2.0.5
  - @toptal/picasso-skeleton-loader@1.0.42
  - @toptal/picasso-table@3.0.6
  - @toptal/picasso-tree-view@3.0.17
  - @toptal/picasso-date-picker@3.0.4
  - @toptal/picasso-dropzone@5.0.5
  - @toptal/picasso-autocomplete@5.0.6
  - @toptal/picasso-avatar-upload@3.0.8
  - @toptal/picasso-input@4.0.4
  - @toptal/picasso-number-input@4.0.4
  - @toptal/picasso-timepicker@4.0.4
  - @toptal/picasso-date-select@1.0.53

## 51.0.7

### Patch Changes

- Updated dependencies [[`23e4e28`](https://github.com/toptal/picasso/commit/23e4e28c19e7ab3b777f07b7b524a55035fc5556)]:
  - @toptal/picasso-autocomplete@5.0.5
  - @toptal/picasso-page@5.0.7
  - @toptal/picasso-tagselector@3.1.4

## 51.0.6

### Patch Changes

- Updated dependencies [[`be813d1`](https://github.com/toptal/picasso/commit/be813d167816fb899037fda038c92abee73c0b39), [`be813d1`](https://github.com/toptal/picasso/commit/be813d167816fb899037fda038c92abee73c0b39), [`be813d1`](https://github.com/toptal/picasso/commit/be813d167816fb899037fda038c92abee73c0b39)]:
  - @toptal/picasso-dropzone@5.0.4
  - @toptal/picasso-form@6.1.0
  - @toptal/picasso-outlined-input@4.0.3
  - @toptal/picasso-autocomplete@5.0.4
  - @toptal/picasso-checkbox@5.0.2
  - @toptal/picasso-file-input@4.0.3
  - @toptal/picasso-input@4.0.3
  - @toptal/picasso-number-input@4.0.3
  - @toptal/picasso-radio@5.0.2
  - @toptal/picasso-select@4.0.3
  - @toptal/picasso-switch@3.0.2
  - @toptal/picasso-tagselector@3.1.3
  - @toptal/picasso-avatar-upload@3.0.7
  - @toptal/picasso-date-picker@3.0.3
  - @toptal/picasso-password-input@5.0.3
  - @toptal/picasso-timepicker@4.0.3
  - @toptal/picasso-page@5.0.6
  - @toptal/picasso-button@4.0.5
  - @toptal/picasso-date-select@1.0.52
  - @toptal/picasso-accordion@3.0.4
  - @toptal/picasso-alert@3.0.16
  - @toptal/picasso-application-update-notification@2.0.16
  - @toptal/picasso-calendar@4.0.5
  - @toptal/picasso-carousel@4.0.5
  - @toptal/picasso-drawer@3.0.16
  - @toptal/picasso-helpbox@5.0.5
  - @toptal/picasso-modal@3.0.16
  - @toptal/picasso-notification@4.0.5
  - @toptal/picasso-pagination@4.0.5
  - @toptal/picasso-prompt-modal@2.0.16
  - @toptal/picasso-section@5.0.5
  - @toptal/picasso-show-more@2.0.4
  - @toptal/picasso-skeleton-loader@1.0.41
  - @toptal/picasso-table@3.0.5
  - @toptal/picasso-tree-view@3.0.16

## 51.0.5

### Patch Changes

- [#4543](https://github.com/toptal/picasso/pull/4543) [`6e77f38`](https://github.com/toptal/picasso/commit/6e77f3854838667e79c27007b4e41f8cb7560119) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### PageArticle

- replace MUI styles with Tailwind
- Updated dependencies [[`6e77f38`](https://github.com/toptal/picasso/commit/6e77f3854838667e79c27007b4e41f8cb7560119)]:
  - @toptal/picasso-page@5.0.5

## 51.0.4

### Patch Changes

- Updated dependencies [[`2984ddf`](https://github.com/toptal/picasso/commit/2984ddf167dfc3a08ab7e978ef31ebfc69eae163)]:
  - @toptal/picasso-link@3.0.2
  - @toptal/picasso-account-select@3.0.5
  - @toptal/picasso-button@4.0.4
  - @toptal/picasso-menu@3.0.5
  - @toptal/picasso-accordion@3.0.3
  - @toptal/picasso-alert@3.0.15
  - @toptal/picasso-application-update-notification@2.0.15
  - @toptal/picasso-calendar@4.0.4
  - @toptal/picasso-carousel@4.0.4
  - @toptal/picasso-drawer@3.0.15
  - @toptal/picasso-file-input@4.0.2
  - @toptal/picasso-helpbox@5.0.4
  - @toptal/picasso-modal@3.0.15
  - @toptal/picasso-notification@4.0.4
  - @toptal/picasso-outlined-input@4.0.2
  - @toptal/picasso-page@5.0.4
  - @toptal/picasso-pagination@4.0.4
  - @toptal/picasso-password-input@5.0.2
  - @toptal/picasso-prompt-modal@2.0.15
  - @toptal/picasso-section@5.0.4
  - @toptal/picasso-show-more@2.0.3
  - @toptal/picasso-skeleton-loader@1.0.40
  - @toptal/picasso-table@3.0.4
  - @toptal/picasso-tree-view@3.0.15
  - @toptal/picasso-autocomplete@5.0.3
  - @toptal/picasso-select@4.0.2
  - @toptal/picasso-date-picker@3.0.2
  - @toptal/picasso-dropzone@5.0.3
  - @toptal/picasso-avatar-upload@3.0.6
  - @toptal/picasso-input@4.0.2
  - @toptal/picasso-number-input@4.0.2
  - @toptal/picasso-tagselector@3.1.2
  - @toptal/picasso-timepicker@4.0.2
  - @toptal/picasso-date-select@1.0.51

## 51.0.3

### Patch Changes

- Updated dependencies [[`b44b4bb`](https://github.com/toptal/picasso/commit/b44b4bbc12075d379a87395c3786736007bedc98)]:
  - @toptal/picasso-container@3.1.0
  - @toptal/picasso-account-select@3.0.4
  - @toptal/picasso-alert@3.0.14
  - @toptal/picasso-application-update-notification@2.0.14
  - @toptal/picasso-autocomplete@5.0.2
  - @toptal/picasso-avatar@6.1.2
  - @toptal/picasso-button@4.0.3
  - @toptal/picasso-calendar@4.0.3
  - @toptal/picasso-carousel@4.0.3
  - @toptal/picasso-checkbox@5.0.1
  - @toptal/picasso-date-picker@3.0.1
  - @toptal/picasso-drawer@3.0.14
  - @toptal/picasso-dropzone@5.0.2
  - @toptal/picasso-empty-state@2.0.5
  - @toptal/picasso-file-input@4.0.1
  - @toptal/picasso-form@6.0.1
  - @toptal/picasso-helpbox@5.0.3
  - @toptal/picasso-input@4.0.1
  - @toptal/picasso-input-adornment@3.0.2
  - @toptal/picasso-list@5.0.2
  - @toptal/picasso-menu@3.0.4
  - @toptal/picasso-note@4.0.2
  - @toptal/picasso-notification@4.0.3
  - @toptal/picasso-number-input@4.0.1
  - @toptal/picasso-overview-block@4.0.2
  - @toptal/picasso-page@5.0.3
  - @toptal/picasso-pagination@4.0.3
  - @toptal/picasso-prompt-modal@2.0.14
  - @toptal/picasso-quote@2.0.4
  - @toptal/picasso-rating@3.0.2
  - @toptal/picasso-section@5.0.3
  - @toptal/picasso-select@4.0.1
  - @toptal/picasso-tabs@5.0.2
  - @toptal/picasso-timeline@5.0.2
  - @toptal/picasso-tree-view@3.0.14
  - @toptal/picasso-user-badge@5.1.2
  - @toptal/picasso-tagselector@3.1.1
  - @toptal/picasso-avatar-upload@3.0.5
  - @toptal/picasso-accordion@3.0.2
  - @toptal/picasso-modal@3.0.14
  - @toptal/picasso-outlined-input@4.0.1
  - @toptal/picasso-password-input@5.0.1
  - @toptal/picasso-show-more@2.0.2
  - @toptal/picasso-skeleton-loader@1.0.39
  - @toptal/picasso-table@3.0.3
  - @toptal/picasso-radio@5.0.1
  - @toptal/picasso-switch@3.0.1
  - @toptal/picasso-timepicker@4.0.1
  - @toptal/picasso-date-select@1.0.50

## 51.0.2

### Patch Changes

- Updated dependencies [[`8b94619`](https://github.com/toptal/picasso/commit/8b94619e9fec3a3009ba785aaa714dc6f9fbb85c), [`8b94619`](https://github.com/toptal/picasso/commit/8b94619e9fec3a3009ba785aaa714dc6f9fbb85c)]:
  - @toptal/picasso-autocomplete@5.0.1
  - @toptal/picasso-tagselector@3.1.0
  - @toptal/picasso-page@5.0.2

## 51.0.1

### Patch Changes

- [#4542](https://github.com/toptal/picasso/pull/4542) [`0da0237`](https://github.com/toptal/picasso/commit/0da0237c01ae52514b92c443d0e06ebcec4d44f0) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Breadcrumbs

- propage `data-testid`
- Updated dependencies [[`0da0237`](https://github.com/toptal/picasso/commit/0da0237c01ae52514b92c443d0e06ebcec4d44f0)]:
  - @toptal/picasso-breadcrumbs@3.0.2

## 51.0.0

### Major Changes

- [#4531](https://github.com/toptal/picasso/pull/4531) [`1bf35ad`](https://github.com/toptal/picasso/commit/1bf35ad42af6d0a457972064e355ad1181dea6a0) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Autocomplete, DatePicker, Input, NumberInput, OutlinedInput, PasswordInput, Select, TagSelector, TimePicker, RichTextEditor

- `error` no longer exists as a prop. It has been replaced by `status` which support success and error states.

- [#4540](https://github.com/toptal/picasso/pull/4540) [`031e242`](https://github.com/toptal/picasso/commit/031e242924442575d7dbafcc8a644b5ec03658de) Thanks [@sashuk](https://github.com/sashuk)!

### Autocomplete, FileInput, Checkbox, Tooltip, Switch, Input, Radio, Form

- breaking change: components no longer export `Props` type. Import prop types as `component name + Props` (e.g. `AutocompleteProps`, `FileInputProps`, etc.)

- [#4527](https://github.com/toptal/picasso/pull/4527) [`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Utils

- remove the export of "Maybe" type from the Utils package
- the type can be defined directly in your project or imported from private package `@topkit/gql-base-types` if you have access

### Patch Changes

- Updated dependencies [[`1bf35ad`](https://github.com/toptal/picasso/commit/1bf35ad42af6d0a457972064e355ad1181dea6a0), [`031e242`](https://github.com/toptal/picasso/commit/031e242924442575d7dbafcc8a644b5ec03658de), [`031e242`](https://github.com/toptal/picasso/commit/031e242924442575d7dbafcc8a644b5ec03658de), [`80407eb`](https://github.com/toptal/picasso/commit/80407eb734c69894ee6d2dadd3e773752fc43c5d)]:
  - @toptal/picasso-outlined-input@4.0.0
  - @toptal/picasso-password-input@5.0.0
  - @toptal/picasso-autocomplete@5.0.0
  - @toptal/picasso-number-input@4.0.0
  - @toptal/picasso-tagselector@3.0.0
  - @toptal/picasso-date-picker@3.0.0
  - @toptal/picasso-timepicker@4.0.0
  - @toptal/picasso-select@4.0.0
  - @toptal/picasso-input@4.0.0
  - @toptal/picasso-file-input@4.0.0
  - @toptal/picasso-checkbox@5.0.0
  - @toptal/picasso-tooltip@2.0.0
  - @toptal/picasso-switch@3.0.0
  - @toptal/picasso-radio@5.0.0
  - @toptal/picasso-form@6.0.0
  - @toptal/picasso-utils@2.0.0
  - @toptal/picasso-avatar-upload@3.0.4
  - @toptal/picasso-page@5.0.1
  - @toptal/picasso-date-select@1.0.49
  - @toptal/picasso-dropzone@5.0.1
  - @toptal/picasso-button@4.0.2
  - @toptal/picasso-slider@4.0.1
  - @toptal/picasso-typography-overflow@4.0.1
  - @toptal/picasso-accordion@3.0.1
  - @toptal/picasso-account-select@3.0.3
  - @toptal/picasso-alert@3.0.13
  - @toptal/picasso-amount@1.0.8
  - @toptal/picasso-application-update-notification@2.0.13
  - @toptal/picasso-avatar@6.1.1
  - @toptal/picasso-badge@3.0.1
  - @toptal/picasso-breadcrumbs@3.0.1
  - @toptal/picasso-calendar@4.0.2
  - @toptal/picasso-carousel@4.0.2
  - @toptal/picasso-container@3.0.1
  - @toptal/picasso-drawer@3.0.13
  - @toptal/picasso-dropdown@4.1.1
  - @toptal/picasso-grid@5.0.1
  - @toptal/picasso-helpbox@5.0.2
  - @toptal/picasso-icons@1.6.1
  - @toptal/picasso-image@3.0.1
  - @toptal/picasso-input-adornment@3.0.1
  - @toptal/picasso-link@3.0.1
  - @toptal/picasso-list@5.0.1
  - @toptal/picasso-loader@3.0.1
  - @toptal/picasso-logo@2.0.1
  - @toptal/picasso-menu@3.0.3
  - @toptal/picasso-modal@3.0.13
  - @toptal/picasso-notification@4.0.2
  - @toptal/picasso-overview-block@4.0.1
  - @toptal/picasso-pagination@4.0.2
  - @toptal/picasso-paper@4.0.1
  - @toptal/picasso-popper@1.0.4
  - @toptal/picasso-prompt-modal@2.0.13
  - @toptal/picasso-rating@3.0.1
  - @toptal/picasso-section@5.0.2
  - @toptal/picasso-skeleton-loader@1.0.38
  - @toptal/picasso-step@4.0.1
  - @toptal/picasso-table@3.0.2
  - @toptal/picasso-tabs@5.0.1
  - @toptal/picasso-tag@4.0.1
  - @toptal/picasso-timeline@5.0.1
  - @toptal/picasso-tree-view@3.0.13
  - @toptal/picasso-typography@4.0.1
  - @toptal/picasso-user-badge@5.1.1
  - @toptal/picasso-show-more@2.0.1
  - @toptal/picasso-empty-state@2.0.4
  - @toptal/picasso-note@4.0.1
  - @toptal/picasso-quote@2.0.3

## 50.0.0

### Major Changes

- [#4530](https://github.com/toptal/picasso/pull/4530) [`8a29ff0`](https://github.com/toptal/picasso/commit/8a29ff092ed06d4b2fbaf0b4d1ad98eeebea3c43) Thanks [@sashuk](https://github.com/sashuk)!

### ListItem

- breaking change: `icon` property no longer exists. If your project uses it, please contact the BASE Team to confirm that it should be added to the component.

### Patch Changes

- Updated dependencies [[`8a29ff0`](https://github.com/toptal/picasso/commit/8a29ff092ed06d4b2fbaf0b4d1ad98eeebea3c43)]:
  - @toptal/picasso-list@5.0.0

## 49.0.0

### Major Changes

- [#4526](https://github.com/toptal/picasso/pull/4526) [`310302a`](https://github.com/toptal/picasso/commit/310302a66ec446973398cee560d38ba9bf716fbd) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- revert add `expandIconPlacement` prop to Picasso Accordion

### Patch Changes

- Updated dependencies [[`310302a`](https://github.com/toptal/picasso/commit/310302a66ec446973398cee560d38ba9bf716fbd)]:
  - @toptal/picasso-typography-overflow@4.0.0
  - @toptal/picasso-accordion@3.0.0
  - @toptal/picasso-file-input@3.0.0
  - @toptal/picasso-dropzone@5.0.0
  - @toptal/picasso-timeline@5.0.0
  - @toptal/picasso-page@5.0.0
  - @toptal/picasso-step@4.0.0
  - @toptal/picasso-tabs@5.0.0

## 48.1.26

### Patch Changes

- [#4520](https://github.com/toptal/picasso/pull/4520) [`2903881`](https://github.com/toptal/picasso/commit/290388118eb10b866f3078eebac26755573d0ca6) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### TypographyOverflow

- migrate to TailwindCSS, `material-ui@4` is no longer required for this package
- require `@toptal/picasso-tailwind` and `@toptal/picasso-tailwind-merge` to be installed
- Updated dependencies [[`bf29f1f`](https://github.com/toptal/picasso/commit/bf29f1fff6e9e183b5b75dde931d068ccc2145db), [`34f55d4`](https://github.com/toptal/picasso/commit/34f55d46a0f604b19f6ba619cb09d224a99846e4), [`2903881`](https://github.com/toptal/picasso/commit/290388118eb10b866f3078eebac26755573d0ca6)]:
  - @toptal/picasso-page@4.0.4
  - @toptal/picasso-accordion@2.1.0
  - @toptal/picasso-typography-overflow@3.0.0
  - @toptal/picasso-file-input@2.0.14
  - @toptal/picasso-step@3.0.1
  - @toptal/picasso-tabs@4.0.8
  - @toptal/picasso-dropzone@4.0.2

## 48.1.25

### Patch Changes

- [#4521](https://github.com/toptal/picasso/pull/4521) [`e759dcb`](https://github.com/toptal/picasso/commit/e759dcb03cbe9b2aae937b8d8f20c1e2ba79f351) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Timeline

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make @toptal/picasso-tailwind-merge a peer dependency
- Updated dependencies [[`e759dcb`](https://github.com/toptal/picasso/commit/e759dcb03cbe9b2aae937b8d8f20c1e2ba79f351)]:
  - @toptal/picasso-timeline@4.0.0

## 48.1.24

### Patch Changes

- [#4517](https://github.com/toptal/picasso/pull/4517) [`e551bb5`](https://github.com/toptal/picasso/commit/e551bb56fda72940e4a12aa2bebc2d5c3345b2ec) Thanks [@sashuk](https://github.com/sashuk)!

### ShowMore

- migrate to TailwindCSS, `material-ui@4` is no longer required for this package
- update peer dependencies
- Updated dependencies [[`e551bb5`](https://github.com/toptal/picasso/commit/e551bb56fda72940e4a12aa2bebc2d5c3345b2ec)]:
  - @toptal/picasso-show-more@2.0.0

## 48.1.23

### Patch Changes

- [#4512](https://github.com/toptal/picasso/pull/4512) [`17a4b55`](https://github.com/toptal/picasso/commit/17a4b5532bf013071119429711dad21ddc66645d) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Rating

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make @toptal/picasso-tailwind-merge a peer dependency
- Updated dependencies [[`17a4b55`](https://github.com/toptal/picasso/commit/17a4b5532bf013071119429711dad21ddc66645d)]:
  - @toptal/picasso-rating@3.0.0

## 48.1.22

### Patch Changes

- Updated dependencies [[`3a0125d`](https://github.com/toptal/picasso/commit/3a0125df1849c66335436c3adaea1b90f989ee7b)]:
  - @toptal/picasso-dropdown@4.1.0
  - @toptal/picasso-button@4.0.1
  - @toptal/picasso-page@4.0.3
  - @toptal/picasso-accordion@2.0.12
  - @toptal/picasso-alert@3.0.12
  - @toptal/picasso-application-update-notification@2.0.12
  - @toptal/picasso-calendar@4.0.1
  - @toptal/picasso-carousel@4.0.1
  - @toptal/picasso-drawer@3.0.12
  - @toptal/picasso-file-input@2.0.13
  - @toptal/picasso-helpbox@5.0.1
  - @toptal/picasso-modal@3.0.12
  - @toptal/picasso-notification@4.0.1
  - @toptal/picasso-outlined-input@3.0.1
  - @toptal/picasso-pagination@4.0.1
  - @toptal/picasso-password-input@4.0.1
  - @toptal/picasso-prompt-modal@2.0.12
  - @toptal/picasso-section@5.0.1
  - @toptal/picasso-show-more@1.0.37
  - @toptal/picasso-skeleton-loader@1.0.37
  - @toptal/picasso-table@3.0.1
  - @toptal/picasso-tree-view@3.0.12
  - @toptal/picasso-date-picker@2.0.16
  - @toptal/picasso-dropzone@4.0.1
  - @toptal/picasso-autocomplete@4.0.3
  - @toptal/picasso-avatar-upload@3.0.3
  - @toptal/picasso-input@3.0.14
  - @toptal/picasso-number-input@3.0.1
  - @toptal/picasso-select@3.0.3
  - @toptal/picasso-tagselector@2.0.18
  - @toptal/picasso-timepicker@3.0.1
  - @toptal/picasso-date-select@1.0.48

## 48.1.21

### Patch Changes

- Updated dependencies [[`9e089cc`](https://github.com/toptal/picasso/commit/9e089cc183a95391f73dc0bf28c59b3c1bfa4758)]:
  - @toptal/picasso-user-badge@5.1.0
  - @toptal/picasso-avatar@6.1.0
  - @toptal/picasso-account-select@3.0.2
  - @toptal/picasso-page@4.0.2
  - @toptal/picasso-tabs@4.0.7
  - @toptal/picasso-avatar-upload@3.0.2
  - @toptal/picasso-menu@3.0.2
  - @toptal/picasso-autocomplete@4.0.2
  - @toptal/picasso-select@3.0.2
  - @toptal/picasso-tagselector@2.0.17
  - @toptal/picasso-date-select@1.0.47

## 48.1.20

### Patch Changes

- [#4506](https://github.com/toptal/picasso/pull/4506) [`e1b01cd`](https://github.com/toptal/picasso/commit/e1b01cd6e9526a9c2fc51cf9730b40d4d6ceb4cd) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Logo

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make @toptal/picasso-tailwind-merge a peer dependency
- Updated dependencies [[`e1b01cd`](https://github.com/toptal/picasso/commit/e1b01cd6e9526a9c2fc51cf9730b40d4d6ceb4cd)]:
  - @toptal/picasso-logo@2.0.0
  - @toptal/picasso-avatar@6.0.1
  - @toptal/picasso-page@4.0.1
  - @toptal/picasso-avatar-upload@3.0.1
  - @toptal/picasso-menu@3.0.1
  - @toptal/picasso-user-badge@5.0.1
  - @toptal/picasso-account-select@3.0.1
  - @toptal/picasso-autocomplete@4.0.1
  - @toptal/picasso-select@3.0.1
  - @toptal/picasso-tabs@4.0.6
  - @toptal/picasso-tagselector@2.0.16
  - @toptal/picasso-date-select@1.0.46

## 48.1.19

### Patch Changes

- [#4497](https://github.com/toptal/picasso/pull/4497) [`1f9def0`](https://github.com/toptal/picasso/commit/1f9def0a6f588d9e96eab0bb4829c6165c04f830) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- migrate `List` and `ListItem` to TailwindCSS
  - add `@toptal/picasso-tailwind-merge` as a peer dependency
  - remove `material-ui/core` from peer dependencies
- Updated dependencies [[`1f9def0`](https://github.com/toptal/picasso/commit/1f9def0a6f588d9e96eab0bb4829c6165c04f830)]:
  - @toptal/picasso-list@4.0.0

## 48.1.18

### Patch Changes

- [#4500](https://github.com/toptal/picasso/pull/4500) [`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- this update should have been performed previously but was inadvertently missed

- Updated dependencies [[`3ed8c02`](https://github.com/toptal/picasso/commit/3ed8c0271982a82dd9cdc6b967c63656afd3654f)]:
  - @toptal/picasso-account-select@3.0.0
  - @toptal/picasso-autocomplete@4.0.0
  - @toptal/picasso-avatar@6.0.0
  - @toptal/picasso-avatar-upload@3.0.0
  - @toptal/picasso-badge@3.0.0
  - @toptal/picasso-breadcrumbs@3.0.0
  - @toptal/picasso-button@4.0.0
  - @toptal/picasso-calendar@4.0.0
  - @toptal/picasso-carousel@4.0.0
  - @toptal/picasso-checkbox@4.0.0
  - @toptal/picasso-container@3.0.0
  - @toptal/picasso-dropdown@4.0.0
  - @toptal/picasso-dropzone@4.0.0
  - @toptal/picasso-environment-banner@3.0.0
  - @toptal/picasso-form@5.0.0
  - @toptal/picasso-grid@5.0.0
  - @toptal/picasso-helpbox@5.0.0
  - @toptal/picasso-image@3.0.0
  - @toptal/picasso-input-adornment@3.0.0
  - @toptal/picasso-link@3.0.0
  - @toptal/picasso-loader@3.0.0
  - @toptal/picasso-menu@3.0.0
  - @toptal/picasso-note@4.0.0
  - @toptal/picasso-notification@4.0.0
  - @toptal/picasso-number-input@3.0.0
  - @toptal/picasso-outlined-input@3.0.0
  - @toptal/picasso-overview-block@4.0.0
  - @toptal/picasso-page@4.0.0
  - @toptal/picasso-pagination@4.0.0
  - @toptal/picasso-paper@4.0.0
  - @toptal/picasso-password-input@4.0.0
  - @toptal/picasso-radio@4.0.0
  - @toptal/picasso-section@5.0.0
  - @toptal/picasso-select@3.0.0
  - @toptal/picasso-slider@4.0.0
  - @toptal/picasso-step@3.0.0
  - @toptal/picasso-table@3.0.0
  - @toptal/picasso-tag@4.0.0
  - @toptal/picasso-timepicker@3.0.0
  - @toptal/picasso-typography@4.0.0
  - @toptal/picasso-tagselector@2.0.15
  - @toptal/picasso-user-badge@5.0.0
  - @toptal/picasso-accordion@2.0.11
  - @toptal/picasso-alert@3.0.11
  - @toptal/picasso-application-update-notification@2.0.11
  - @toptal/picasso-drawer@3.0.11
  - @toptal/picasso-file-input@2.0.12
  - @toptal/picasso-modal@3.0.11
  - @toptal/picasso-prompt-modal@2.0.11
  - @toptal/picasso-show-more@1.0.36
  - @toptal/picasso-skeleton-loader@1.0.36
  - @toptal/picasso-tree-view@3.0.11
  - @toptal/picasso-date-picker@2.0.15
  - @toptal/picasso-empty-state@2.0.3
  - @toptal/picasso-input@3.0.13
  - @toptal/picasso-list@3.0.2
  - @toptal/picasso-quote@2.0.2
  - @toptal/picasso-rating@2.0.2
  - @toptal/picasso-tabs@4.0.5
  - @toptal/picasso-timeline@3.0.1
  - @toptal/picasso-switch@2.0.12
  - @toptal/picasso-date-select@1.0.45
  - @toptal/picasso-amount@1.0.7
  - @toptal/picasso-tooltip@1.1.5
  - @toptal/picasso-typography-overflow@2.0.5

## 48.1.17

### Patch Changes

- Updated dependencies [[`fb36465`](https://github.com/toptal/picasso/commit/fb3646581c0be1ded3754978d73e8443514a968d)]:
  - @toptal/picasso-user-badge@4.0.0
  - @toptal/picasso-account-select@2.0.3
  - @toptal/picasso-page@3.0.15
  - @toptal/picasso-tabs@4.0.4

## 48.1.16

### Patch Changes

- [#4491](https://github.com/toptal/picasso/pull/4491) [`b9aee47`](https://github.com/toptal/picasso/commit/b9aee476b9422d19543ec25ee3f4a5280d616b03) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!
- migrate to TailwindCSS, material-ui@4 is no longer required for this package
  - make @toptal/picasso-tailwind-merge a peer dependency
- Updated dependencies [[`b9aee47`](https://github.com/toptal/picasso/commit/b9aee476b9422d19543ec25ee3f4a5280d616b03), [`1c2648f`](https://github.com/toptal/picasso/commit/1c2648f330b40d85f277eea0a7956dd5b727991c)]:
  - @toptal/picasso-autocomplete@3.0.0
  - @toptal/picasso-pagination@3.0.11
  - @toptal/picasso-page@3.0.14
  - @toptal/picasso-tagselector@2.0.14

## 48.1.15

### Patch Changes

- [#4490](https://github.com/toptal/picasso/pull/4490) [`7b64f21`](https://github.com/toptal/picasso/commit/7b64f21273b039a5f0652edf4bb1abecba2b5eff) Thanks [@dmaklygin](https://github.com/dmaklygin)!
- migrate `@toptal/picasso-overview-block` to tailwind CSS

- Updated dependencies [[`a5d61c8`](https://github.com/toptal/picasso/commit/a5d61c8f5295a669e480a5baadced66cfe80b711), [`7b64f21`](https://github.com/toptal/picasso/commit/7b64f21273b039a5f0652edf4bb1abecba2b5eff)]:
  - @toptal/picasso-badge@2.0.1
  - @toptal/picasso-tabs@4.0.3
  - @toptal/picasso-checkbox@3.0.9
  - @toptal/picasso-overview-block@3.0.0
  - @toptal/picasso-page@3.0.13
  - @toptal/picasso-button@3.0.10
  - @toptal/picasso-accordion@2.0.10
  - @toptal/picasso-alert@3.0.10
  - @toptal/picasso-application-update-notification@2.0.10
  - @toptal/picasso-calendar@3.0.9
  - @toptal/picasso-carousel@3.0.9
  - @toptal/picasso-drawer@3.0.10
  - @toptal/picasso-file-input@2.0.11
  - @toptal/picasso-helpbox@4.0.10
  - @toptal/picasso-modal@3.0.10
  - @toptal/picasso-notification@3.0.10
  - @toptal/picasso-outlined-input@2.0.11
  - @toptal/picasso-pagination@3.0.10
  - @toptal/picasso-password-input@3.0.11
  - @toptal/picasso-prompt-modal@2.0.10
  - @toptal/picasso-section@4.0.10
  - @toptal/picasso-show-more@1.0.35
  - @toptal/picasso-skeleton-loader@1.0.35
  - @toptal/picasso-table@2.0.10
  - @toptal/picasso-tree-view@3.0.10
  - @toptal/picasso-date-picker@2.0.14
  - @toptal/picasso-dropzone@3.0.12
  - @toptal/picasso-autocomplete@2.0.13
  - @toptal/picasso-avatar-upload@2.0.12
  - @toptal/picasso-input@3.0.12
  - @toptal/picasso-number-input@2.0.12
  - @toptal/picasso-select@2.0.13
  - @toptal/picasso-tagselector@2.0.13
  - @toptal/picasso-timepicker@2.0.12
  - @toptal/picasso-date-select@1.0.44

## 48.1.14

### Patch Changes

- Updated dependencies [[`a7ce3ac`](https://github.com/toptal/picasso/commit/a7ce3ac077d50bd8a14e7acb1acf23d3e10124c9)]:
  - @toptal/picasso-quote@2.0.1

## 48.1.13

### Patch Changes

- [#4483](https://github.com/toptal/picasso/pull/4483) [`13863c9`](https://github.com/toptal/picasso/commit/13863c98aa0b73e202b0b46f6bdedbfb9de66177) Thanks [@mkrl](https://github.com/mkrl)!

### Image

- migrated to Tailwind CSS
- added `@toptal/picasso-tailwind` as a peer dependency to `@toptal/picasso-image`
- Updated dependencies [[`13863c9`](https://github.com/toptal/picasso/commit/13863c98aa0b73e202b0b46f6bdedbfb9de66177)]:
  - @toptal/picasso-image@2.0.0
  - @toptal/picasso-avatar@5.0.2
  - @toptal/picasso-avatar-upload@2.0.11
  - @toptal/picasso-menu@2.0.2
  - @toptal/picasso-page@3.0.12
  - @toptal/picasso-user-badge@3.0.2
  - @toptal/picasso-account-select@2.0.2
  - @toptal/picasso-autocomplete@2.0.12
  - @toptal/picasso-select@2.0.12
  - @toptal/picasso-tabs@4.0.2
  - @toptal/picasso-tagselector@2.0.12
  - @toptal/picasso-date-select@1.0.43

## 48.1.12

### Patch Changes

- [#4479](https://github.com/toptal/picasso/pull/4479) [`4a32b80`](https://github.com/toptal/picasso/commit/4a32b80b6d2bb269e71f3cfeea170790e5671576) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- migrate Note to TailwindCSS, the packages `@toptal/picasso-tailwind-merge` now need to be provided from the host project, and tailwind needs to be configured for compiling `@toptal/picasso-note` using `@toptal/picasso-tailwind` configuration

- Updated dependencies [[`4a32b80`](https://github.com/toptal/picasso/commit/4a32b80b6d2bb269e71f3cfeea170790e5671576), [`db535c5`](https://github.com/toptal/picasso/commit/db535c53cc437ca71edeec55480a8c2be11fbd70)]:
  - @toptal/picasso-note@3.0.0
  - @toptal/picasso-checkbox@3.0.8
  - @toptal/picasso-button@3.0.9
  - @toptal/picasso-accordion@2.0.9
  - @toptal/picasso-alert@3.0.9
  - @toptal/picasso-application-update-notification@2.0.9
  - @toptal/picasso-calendar@3.0.8
  - @toptal/picasso-carousel@3.0.8
  - @toptal/picasso-drawer@3.0.9
  - @toptal/picasso-file-input@2.0.10
  - @toptal/picasso-helpbox@4.0.9
  - @toptal/picasso-modal@3.0.9
  - @toptal/picasso-notification@3.0.9
  - @toptal/picasso-outlined-input@2.0.10
  - @toptal/picasso-page@3.0.11
  - @toptal/picasso-pagination@3.0.9
  - @toptal/picasso-password-input@3.0.10
  - @toptal/picasso-prompt-modal@2.0.9
  - @toptal/picasso-section@4.0.9
  - @toptal/picasso-show-more@1.0.34
  - @toptal/picasso-skeleton-loader@1.0.34
  - @toptal/picasso-table@2.0.9
  - @toptal/picasso-tree-view@3.0.9
  - @toptal/picasso-date-picker@2.0.13
  - @toptal/picasso-dropzone@3.0.11
  - @toptal/picasso-autocomplete@2.0.11
  - @toptal/picasso-avatar-upload@2.0.10
  - @toptal/picasso-input@3.0.11
  - @toptal/picasso-number-input@2.0.11
  - @toptal/picasso-select@2.0.11
  - @toptal/picasso-tagselector@2.0.11
  - @toptal/picasso-timepicker@2.0.11
  - @toptal/picasso-date-select@1.0.42

## 48.1.11

### Patch Changes

- Updated dependencies [[`30f8a78`](https://github.com/toptal/picasso/commit/30f8a782c340b2148df2876b2cd7b927c6e09142)]:
  - @toptal/picasso-tabs@4.0.1

## 48.1.10

### Patch Changes

- Updated dependencies [[`e5b6e64`](https://github.com/toptal/picasso/commit/e5b6e64fcb0e5e4d0e5fc45a46230cb706d0d13b)]:
  - @toptal/picasso-tabs@4.0.0

## 48.1.9

### Patch Changes

- Updated dependencies [[`9f68a50`](https://github.com/toptal/picasso/commit/9f68a50c86112a8c491f0852a7da17e0db25128a)]:
  - @toptal/picasso-form@4.1.4
  - @toptal/picasso-autocomplete@2.0.10
  - @toptal/picasso-checkbox@3.0.7
  - @toptal/picasso-dropzone@3.0.10
  - @toptal/picasso-file-input@2.0.9
  - @toptal/picasso-input@3.0.10
  - @toptal/picasso-number-input@2.0.10
  - @toptal/picasso-outlined-input@2.0.9
  - @toptal/picasso-radio@3.0.7
  - @toptal/picasso-select@2.0.10
  - @toptal/picasso-switch@2.0.11
  - @toptal/picasso-tagselector@2.0.10
  - @toptal/picasso-page@3.0.10
  - @toptal/picasso-button@3.0.8
  - @toptal/picasso-date-picker@2.0.12
  - @toptal/picasso-timepicker@2.0.10
  - @toptal/picasso-avatar-upload@2.0.9
  - @toptal/picasso-password-input@3.0.9
  - @toptal/picasso-date-select@1.0.41
  - @toptal/picasso-accordion@2.0.8
  - @toptal/picasso-alert@3.0.8
  - @toptal/picasso-application-update-notification@2.0.8
  - @toptal/picasso-calendar@3.0.7
  - @toptal/picasso-carousel@3.0.7
  - @toptal/picasso-drawer@3.0.8
  - @toptal/picasso-helpbox@4.0.8
  - @toptal/picasso-modal@3.0.8
  - @toptal/picasso-notification@3.0.8
  - @toptal/picasso-pagination@3.0.8
  - @toptal/picasso-prompt-modal@2.0.8
  - @toptal/picasso-section@4.0.8
  - @toptal/picasso-show-more@1.0.33
  - @toptal/picasso-skeleton-loader@1.0.33
  - @toptal/picasso-table@2.0.8
  - @toptal/picasso-tree-view@3.0.8

## 48.1.8

### Patch Changes

- Updated dependencies [[`eb2193e`](https://github.com/toptal/picasso/commit/eb2193e4f2b5ba18c492403dd6db6504c21b0ae8)]:
  - @toptal/picasso-input@3.0.9
  - @toptal/picasso-autocomplete@2.0.9
  - @toptal/picasso-date-picker@2.0.11
  - @toptal/picasso-select@2.0.9
  - @toptal/picasso-timepicker@2.0.9
  - @toptal/picasso-page@3.0.9
  - @toptal/picasso-tagselector@2.0.9
  - @toptal/picasso-date-select@1.0.40

## 48.1.7

### Patch Changes

- Updated dependencies [[`bdc1c4e`](https://github.com/toptal/picasso/commit/bdc1c4e077e6e041a45c5b7bc885e5efa0df278d)]:
  - @toptal/picasso-number-input@2.0.9

## 48.1.6

### Patch Changes

- Updated dependencies [[`f86b1ce`](https://github.com/toptal/picasso/commit/f86b1ced3fa3b82ed75bc9417aa69c5a85e4b4de)]:
  - @toptal/picasso-outlined-input@2.0.8
  - @toptal/picasso-autocomplete@2.0.8
  - @toptal/picasso-avatar-upload@2.0.8
  - @toptal/picasso-date-picker@2.0.10
  - @toptal/picasso-input@3.0.8
  - @toptal/picasso-number-input@2.0.8
  - @toptal/picasso-password-input@3.0.8
  - @toptal/picasso-select@2.0.8
  - @toptal/picasso-tagselector@2.0.8
  - @toptal/picasso-timepicker@2.0.8
  - @toptal/picasso-page@3.0.8
  - @toptal/picasso-date-select@1.0.39

## 48.1.5

### Patch Changes

- [#4458](https://github.com/toptal/picasso/pull/4458) [`5fcbb88`](https://github.com/toptal/picasso/commit/5fcbb88dd0b1dd4abb9839687875753bf078c105) Thanks [@mkrl](https://github.com/mkrl)!

### FileInput

- migrated `FileInput` to TailwindCSS
- Updated dependencies [[`5fcbb88`](https://github.com/toptal/picasso/commit/5fcbb88dd0b1dd4abb9839687875753bf078c105)]:
  - @toptal/picasso-file-input@2.0.8
  - @toptal/picasso-dropzone@3.0.9

## 48.1.4

### Patch Changes

- Updated dependencies [[`f084dd3`](https://github.com/toptal/picasso/commit/f084dd34bd262db8efb00c7c9c8638eb284c2f1f)]:
  - @toptal/picasso-checkbox@3.0.6
  - @toptal/picasso-radio@3.0.6
  - @toptal/picasso-form@4.1.3
  - @toptal/picasso-button@3.0.7
  - @toptal/picasso-autocomplete@2.0.7
  - @toptal/picasso-dropzone@3.0.8
  - @toptal/picasso-file-input@2.0.7
  - @toptal/picasso-input@3.0.7
  - @toptal/picasso-number-input@2.0.7
  - @toptal/picasso-outlined-input@2.0.7
  - @toptal/picasso-select@2.0.7
  - @toptal/picasso-switch@2.0.10
  - @toptal/picasso-tagselector@2.0.7
  - @toptal/picasso-accordion@2.0.7
  - @toptal/picasso-alert@3.0.7
  - @toptal/picasso-application-update-notification@2.0.7
  - @toptal/picasso-calendar@3.0.6
  - @toptal/picasso-carousel@3.0.6
  - @toptal/picasso-drawer@3.0.7
  - @toptal/picasso-helpbox@4.0.7
  - @toptal/picasso-modal@3.0.7
  - @toptal/picasso-notification@3.0.7
  - @toptal/picasso-page@3.0.7
  - @toptal/picasso-pagination@3.0.7
  - @toptal/picasso-password-input@3.0.7
  - @toptal/picasso-prompt-modal@2.0.7
  - @toptal/picasso-section@4.0.7
  - @toptal/picasso-show-more@1.0.32
  - @toptal/picasso-skeleton-loader@1.0.32
  - @toptal/picasso-table@2.0.7
  - @toptal/picasso-tree-view@3.0.7
  - @toptal/picasso-date-picker@2.0.9
  - @toptal/picasso-timepicker@2.0.7
  - @toptal/picasso-avatar-upload@2.0.7
  - @toptal/picasso-date-select@1.0.38

## 48.1.3

### Patch Changes

- Updated dependencies [[`8b2bc9d`](https://github.com/toptal/picasso/commit/8b2bc9d596317060845e4b5c8a48c5c178d72f5f)]:
  - @toptal/picasso-form@4.1.2
  - @toptal/picasso-checkbox@3.0.5
  - @toptal/picasso-radio@3.0.5
  - @toptal/picasso-switch@2.0.9
  - @toptal/picasso-autocomplete@2.0.6
  - @toptal/picasso-dropzone@3.0.7
  - @toptal/picasso-file-input@2.0.6
  - @toptal/picasso-input@3.0.6
  - @toptal/picasso-number-input@2.0.6
  - @toptal/picasso-outlined-input@2.0.6
  - @toptal/picasso-select@2.0.6
  - @toptal/picasso-tagselector@2.0.6
  - @toptal/picasso-button@3.0.6
  - @toptal/picasso-page@3.0.6
  - @toptal/picasso-date-picker@2.0.8
  - @toptal/picasso-timepicker@2.0.6
  - @toptal/picasso-avatar-upload@2.0.6
  - @toptal/picasso-password-input@3.0.6
  - @toptal/picasso-date-select@1.0.37
  - @toptal/picasso-accordion@2.0.6
  - @toptal/picasso-alert@3.0.6
  - @toptal/picasso-application-update-notification@2.0.6
  - @toptal/picasso-calendar@3.0.5
  - @toptal/picasso-carousel@3.0.5
  - @toptal/picasso-drawer@3.0.6
  - @toptal/picasso-helpbox@4.0.6
  - @toptal/picasso-modal@3.0.6
  - @toptal/picasso-notification@3.0.6
  - @toptal/picasso-pagination@3.0.6
  - @toptal/picasso-prompt-modal@2.0.6
  - @toptal/picasso-section@4.0.6
  - @toptal/picasso-show-more@1.0.31
  - @toptal/picasso-skeleton-loader@1.0.31
  - @toptal/picasso-table@2.0.6
  - @toptal/picasso-tree-view@3.0.6

## 48.1.2

### Patch Changes

- Updated dependencies [[`22e2a67`](https://github.com/toptal/picasso/commit/22e2a674c96eb54f36d71515a6328877faae0576)]:
  - @toptal/picasso-form@4.1.1
  - @toptal/picasso-autocomplete@2.0.5
  - @toptal/picasso-checkbox@3.0.4
  - @toptal/picasso-dropzone@3.0.6
  - @toptal/picasso-file-input@2.0.5
  - @toptal/picasso-input@3.0.5
  - @toptal/picasso-number-input@2.0.5
  - @toptal/picasso-outlined-input@2.0.5
  - @toptal/picasso-radio@3.0.4
  - @toptal/picasso-select@2.0.5
  - @toptal/picasso-switch@2.0.8
  - @toptal/picasso-tagselector@2.0.5
  - @toptal/picasso-page@3.0.5
  - @toptal/picasso-button@3.0.5
  - @toptal/picasso-date-picker@2.0.7
  - @toptal/picasso-timepicker@2.0.5
  - @toptal/picasso-avatar-upload@2.0.5
  - @toptal/picasso-password-input@3.0.5
  - @toptal/picasso-date-select@1.0.36
  - @toptal/picasso-accordion@2.0.5
  - @toptal/picasso-alert@3.0.5
  - @toptal/picasso-application-update-notification@2.0.5
  - @toptal/picasso-calendar@3.0.4
  - @toptal/picasso-carousel@3.0.4
  - @toptal/picasso-drawer@3.0.5
  - @toptal/picasso-helpbox@4.0.5
  - @toptal/picasso-modal@3.0.5
  - @toptal/picasso-notification@3.0.5
  - @toptal/picasso-pagination@3.0.5
  - @toptal/picasso-prompt-modal@2.0.5
  - @toptal/picasso-section@4.0.5
  - @toptal/picasso-show-more@1.0.30
  - @toptal/picasso-skeleton-loader@1.0.30
  - @toptal/picasso-table@2.0.5
  - @toptal/picasso-tree-view@3.0.5

## 48.1.1

### Patch Changes

- Updated dependencies [[`a1c2b1d`](https://github.com/toptal/picasso/commit/a1c2b1dc5ee808034171dc2879b30a63de24257d)]:
  - @toptal/picasso-calendar@3.0.3
  - @toptal/picasso-dropdown@3.0.0
  - @toptal/picasso-page@3.0.4
  - @toptal/picasso-date-picker@2.0.6
  - @toptal/picasso-button@3.0.4
  - @toptal/picasso-accordion@2.0.4
  - @toptal/picasso-alert@3.0.4
  - @toptal/picasso-application-update-notification@2.0.4
  - @toptal/picasso-carousel@3.0.3
  - @toptal/picasso-drawer@3.0.4
  - @toptal/picasso-file-input@2.0.4
  - @toptal/picasso-helpbox@4.0.4
  - @toptal/picasso-modal@3.0.4
  - @toptal/picasso-notification@3.0.4
  - @toptal/picasso-outlined-input@2.0.4
  - @toptal/picasso-pagination@3.0.4
  - @toptal/picasso-password-input@3.0.4
  - @toptal/picasso-prompt-modal@2.0.4
  - @toptal/picasso-section@4.0.4
  - @toptal/picasso-show-more@1.0.29
  - @toptal/picasso-skeleton-loader@1.0.29
  - @toptal/picasso-table@2.0.4
  - @toptal/picasso-tree-view@3.0.4
  - @toptal/picasso-dropzone@3.0.5
  - @toptal/picasso-autocomplete@2.0.4
  - @toptal/picasso-avatar-upload@2.0.4
  - @toptal/picasso-input@3.0.4
  - @toptal/picasso-number-input@2.0.4
  - @toptal/picasso-select@2.0.4
  - @toptal/picasso-tagselector@2.0.4
  - @toptal/picasso-timepicker@2.0.4
  - @toptal/picasso-date-select@1.0.35

## 48.1.0

### Minor Changes

- [#4448](https://github.com/toptal/picasso/pull/4448) [`2f6e42e`](https://github.com/toptal/picasso/commit/2f6e42e3adc968a48e15f0599395f79d8097eb1c) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- refactor FormHint and FormError to TailwindCSS

### Patch Changes

- Updated dependencies [[`2f6e42e`](https://github.com/toptal/picasso/commit/2f6e42e3adc968a48e15f0599395f79d8097eb1c)]:
  - @toptal/picasso-form@4.1.0
  - @toptal/picasso-autocomplete@2.0.3
  - @toptal/picasso-checkbox@3.0.3
  - @toptal/picasso-dropzone@3.0.4
  - @toptal/picasso-file-input@2.0.3
  - @toptal/picasso-input@3.0.3
  - @toptal/picasso-number-input@2.0.3
  - @toptal/picasso-outlined-input@2.0.3
  - @toptal/picasso-radio@3.0.3
  - @toptal/picasso-select@2.0.3
  - @toptal/picasso-switch@2.0.7
  - @toptal/picasso-tagselector@2.0.3
  - @toptal/picasso-page@3.0.3
  - @toptal/picasso-button@3.0.3
  - @toptal/picasso-date-picker@2.0.5
  - @toptal/picasso-timepicker@2.0.3
  - @toptal/picasso-avatar-upload@2.0.3
  - @toptal/picasso-password-input@3.0.3
  - @toptal/picasso-date-select@1.0.34
  - @toptal/picasso-accordion@2.0.3
  - @toptal/picasso-alert@3.0.3
  - @toptal/picasso-application-update-notification@2.0.3
  - @toptal/picasso-calendar@3.0.2
  - @toptal/picasso-carousel@3.0.2
  - @toptal/picasso-drawer@3.0.3
  - @toptal/picasso-helpbox@4.0.3
  - @toptal/picasso-modal@3.0.3
  - @toptal/picasso-notification@3.0.3
  - @toptal/picasso-pagination@3.0.3
  - @toptal/picasso-prompt-modal@2.0.3
  - @toptal/picasso-section@4.0.3
  - @toptal/picasso-show-more@1.0.28
  - @toptal/picasso-skeleton-loader@1.0.28
  - @toptal/picasso-table@2.0.3
  - @toptal/picasso-tree-view@3.0.3

## 48.0.4

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-form@4.0.2
  - @toptal/picasso-section@4.0.2
  - @toptal/picasso-table@2.0.2
  - @toptal/picasso-autocomplete@2.0.2
  - @toptal/picasso-checkbox@3.0.2
  - @toptal/picasso-dropzone@3.0.3
  - @toptal/picasso-file-input@2.0.2
  - @toptal/picasso-input@3.0.2
  - @toptal/picasso-number-input@2.0.2
  - @toptal/picasso-outlined-input@2.0.2
  - @toptal/picasso-radio@3.0.2
  - @toptal/picasso-select@2.0.2
  - @toptal/picasso-switch@2.0.6
  - @toptal/picasso-tagselector@2.0.2
  - @toptal/picasso-page@3.0.2
  - @toptal/picasso-button@3.0.2
  - @toptal/picasso-date-picker@2.0.4
  - @toptal/picasso-timepicker@2.0.2
  - @toptal/picasso-avatar-upload@2.0.2
  - @toptal/picasso-password-input@3.0.2
  - @toptal/picasso-date-select@1.0.33
  - @toptal/picasso-accordion@2.0.2
  - @toptal/picasso-alert@3.0.2
  - @toptal/picasso-application-update-notification@2.0.2
  - @toptal/picasso-calendar@3.0.1
  - @toptal/picasso-carousel@3.0.1
  - @toptal/picasso-drawer@3.0.2
  - @toptal/picasso-helpbox@4.0.2
  - @toptal/picasso-modal@3.0.2
  - @toptal/picasso-notification@3.0.2
  - @toptal/picasso-pagination@3.0.2
  - @toptal/picasso-prompt-modal@2.0.2
  - @toptal/picasso-show-more@1.0.27
  - @toptal/picasso-skeleton-loader@1.0.27
  - @toptal/picasso-tree-view@3.0.2

## 48.0.3

### Patch Changes

- [#4431](https://github.com/toptal/picasso/pull/4431) [`745ffbc`](https://github.com/toptal/picasso/commit/745ffbc8c5804cbfb44a3abfb1e57308b4341702) Thanks [@sashuk](https://github.com/sashuk)!

### Calendar

- migrate component to TailwindCSS
- remove peer dependency on `@material-ui/core`
- add peer dependency on `@toptal/picasso-tailwind-merge`
- Updated dependencies [[`745ffbc`](https://github.com/toptal/picasso/commit/745ffbc8c5804cbfb44a3abfb1e57308b4341702)]:
  - @toptal/picasso-calendar@3.0.0
  - @toptal/picasso-date-picker@2.0.3

## 48.0.2

### Patch Changes

- [#4439](https://github.com/toptal/picasso/pull/4439) [`5097840`](https://github.com/toptal/picasso/commit/5097840440d21c074fea8db2dccec836131f1eb9) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- migrate Carousel to tailwind, now @toptal/picasso-tailwind-merge is a peer dependency and needs to be provided by the consuming app

- Updated dependencies [[`5097840`](https://github.com/toptal/picasso/commit/5097840440d21c074fea8db2dccec836131f1eb9)]:
  - @toptal/picasso-carousel@3.0.0

## 48.0.1

### Patch Changes

- Updated dependencies [[`ead8d50`](https://github.com/toptal/picasso/commit/ead8d50cfc224b638d2c7ac1efca97aa7c4a904a)]:
  - @toptal/picasso-empty-state@2.0.2

## 48.0.0

### Major Changes

- [#4430](https://github.com/toptal/picasso/pull/4430) [`27d596a`](https://github.com/toptal/picasso/commit/27d596a3bb913923f7d7e577ac3a7b6f9045b42f) Thanks [@sashuk](https://github.com/sashuk)!
- migrate EnvironmentBanner to Tailwind
  - update peer dependencies

### Patch Changes

- Updated dependencies [[`27d596a`](https://github.com/toptal/picasso/commit/27d596a3bb913923f7d7e577ac3a7b6f9045b42f)]:
  - @toptal/picasso-environment-banner@2.0.0

## 47.0.4

### Patch Changes

- Updated dependencies [[`d1e9886`](https://github.com/toptal/picasso/commit/d1e9886d04014c541459f75a555ae40972ed9155)]:
  - @toptal/picasso-date-picker@2.0.2

## 47.0.3

### Patch Changes

- Updated dependencies [[`941aaa8`](https://github.com/toptal/picasso/commit/941aaa827318acc969968b1b770ddb5bb63471a7)]:
  - @toptal/picasso-icons@1.6.0
  - @toptal/picasso-accordion@2.0.1
  - @toptal/picasso-account-select@2.0.1
  - @toptal/picasso-alert@3.0.1
  - @toptal/picasso-application-update-notification@2.0.1
  - @toptal/picasso-avatar@5.0.1
  - @toptal/picasso-avatar-upload@2.0.1
  - @toptal/picasso-breadcrumbs@2.0.1
  - @toptal/picasso-button@3.0.1
  - @toptal/picasso-calendar@2.0.1
  - @toptal/picasso-carousel@2.0.1
  - @toptal/picasso-date-picker@2.0.1
  - @toptal/picasso-drawer@3.0.1
  - @toptal/picasso-dropzone@3.0.2
  - @toptal/picasso-empty-state@2.0.1
  - @toptal/picasso-file-input@2.0.1
  - @toptal/picasso-form@4.0.1
  - @toptal/picasso-grid@4.0.1
  - @toptal/picasso-helpbox@4.0.1
  - @toptal/picasso-input@3.0.1
  - @toptal/picasso-input-adornment@2.0.1
  - @toptal/picasso-list@3.0.1
  - @toptal/picasso-logo@1.0.9
  - @toptal/picasso-menu@2.0.1
  - @toptal/picasso-modal@3.0.1
  - @toptal/picasso-notification@3.0.1
  - @toptal/picasso-number-input@2.0.1
  - @toptal/picasso-outlined-input@2.0.1
  - @toptal/picasso-page@3.0.1
  - @toptal/picasso-password-input@3.0.1
  - @toptal/picasso-rating@2.0.1
  - @toptal/picasso-section@4.0.1
  - @toptal/picasso-select@2.0.1
  - @toptal/picasso-show-more@1.0.26
  - @toptal/picasso-step@2.0.1
  - @toptal/picasso-table@2.0.1
  - @toptal/picasso-tabs@3.0.1
  - @toptal/picasso-tag@3.0.1
  - @toptal/picasso-timepicker@2.0.1
  - @toptal/picasso-user-badge@3.0.1
  - @toptal/picasso-pagination@3.0.1
  - @toptal/picasso-prompt-modal@2.0.1
  - @toptal/picasso-skeleton-loader@1.0.26
  - @toptal/picasso-tree-view@3.0.1
  - @toptal/picasso-autocomplete@2.0.1
  - @toptal/picasso-checkbox@3.0.1
  - @toptal/picasso-radio@3.0.1
  - @toptal/picasso-switch@2.0.5
  - @toptal/picasso-tagselector@2.0.1
  - @toptal/picasso-date-select@1.0.32

## 47.0.2

### Patch Changes

- Updated dependencies [[`3c57cb2`](https://github.com/toptal/picasso/commit/3c57cb2e2a0abdf9ac23f4cf011aefaa53173754)]:
  - @toptal/picasso-dropzone@3.0.1

## 47.0.1

### Patch Changes

- [#4417](https://github.com/toptal/picasso/pull/4417) [`c480aa7`](https://github.com/toptal/picasso/commit/c480aa74834bad61d4a91e461dcbb6e83005385c) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### AvatarUpload

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make "@toptal/picasso-tailwind-merge": "^1.1.0" a peer dependency
- Updated dependencies [[`c480aa7`](https://github.com/toptal/picasso/commit/c480aa74834bad61d4a91e461dcbb6e83005385c)]:
  - @toptal/picasso-avatar-upload@2.0.0

## 47.0.0

### Major Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- remove `getTypographyClassName`, `TypographyOptions`, and `typographyStyles`

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Modal

- as we don't use Paper from material ui anymore, we have to change
  `paperProps` to `HTMLDivAttributes`.
- it should not affect our users as
  from the research we found out that it is used mainly to set aria attributes, change the role attribute, or customize styles.
  Still, technically it is breaking change.

- [#4409](https://github.com/toptal/picasso/pull/4409) [`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Container

- migrate to TailwindCSS, material-ui@4 is no longer required for this package
- make "@toptal/picasso-tailwind-merge": "^1.1.1" a peer dependency
- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Picasso, AccountSelect, Alert, ApplicationUpdateNotification, Autocomplete, Avatar, Button, Calendar, Carousel, Checkbox, DatePicker, Drawer, Dropzone, EmptyState, FileInput, Form, Helpbox, Input, InputAdornment, List, Menu, Note, Notification, NumberInput, OverviewBlock, Page, Pagination, PromptModal, Quote, Rating, Section, Select, Tabs, Timeline, TreeView, Forms, QueryBuilder, RichTextEditor, AnalyticsCharts

- the "@toptal/picasso-tailwind" package has been updated to the latest version in peerDependencies

### Patch Changes

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Notification

- migrate from `mui@4` to `TailwindCSS`
- remove `mui` peer dependency

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Link

- migrated `Link` to not use MUI and only use Tailwind CSS instead

- [#4345](https://github.com/toptal/picasso/pull/4345) [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### ApplicationUpdateNotification

- migrate from `mui@4` to `TailwindCSS`
- package requires `@toptal/picasso-tailwind` preset to be used (BREAKING CHANGE)

- [#4414](https://github.com/toptal/picasso/pull/4414) [`c06cf2c`](https://github.com/toptal/picasso/commit/c06cf2c21d6cd294ef4903613268e747670f252b) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Alert, Helpbox, Container

- all variants except white (in Container only) and transparent now have a 1px border by default.

- [#4414](https://github.com/toptal/picasso/pull/4414) [`c06cf2c`](https://github.com/toptal/picasso/commit/c06cf2c21d6cd294ef4903613268e747670f252b) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### picasso-tailwind

- add new colors to tailwindCss configuration
- Updated dependencies [[`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`3a11dd5`](https://github.com/toptal/picasso/commit/3a11dd530575b3a51acc3cf010264e5ec658ce8a), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`8d97d12`](https://github.com/toptal/picasso/commit/8d97d12c07ed656a22273aaccf6be4ae6a5b3c29), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`c06cf2c`](https://github.com/toptal/picasso/commit/c06cf2c21d6cd294ef4903613268e747670f252b), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`0351ab2`](https://github.com/toptal/picasso/commit/0351ab22db1dad0b1de81d37e4d0365b3eb5ad3f), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685), [`6716e0b`](https://github.com/toptal/picasso/commit/6716e0bb3178a7f452f2c79ce56dd524e9bd8685)]:
  - @toptal/picasso-timeline@3.0.0
  - @toptal/picasso-page@3.0.0
  - @toptal/picasso-notification@3.0.0
  - @toptal/picasso-calendar@2.0.0
  - @toptal/picasso-link@2.0.0
  - @toptal/picasso-table@2.0.0
  - @toptal/picasso-number-input@2.0.0
  - @toptal/picasso-drawer@3.0.0
  - @toptal/picasso-account-select@2.0.0
  - @toptal/picasso-autocomplete@2.0.0
  - @toptal/picasso-select@2.0.0
  - @toptal/picasso-input-adornment@2.0.0
  - @toptal/picasso-password-input@3.0.0
  - @toptal/picasso-pagination@3.0.0
  - @toptal/picasso-typography@3.0.0
  - @toptal/picasso-checkbox@3.0.0
  - @toptal/picasso-section@4.0.0
  - @toptal/picasso-button@3.0.0
  - @toptal/picasso-loader@2.0.0
  - @toptal/picasso-slider@3.0.0
  - @toptal/picasso-badge@2.0.0
  - @toptal/picasso-paper@3.0.0
  - @toptal/picasso-radio@3.0.0
  - @toptal/picasso-grid@4.0.0
  - @toptal/picasso-menu@2.0.0
  - @toptal/picasso-step@2.0.0
  - @toptal/picasso-tag@3.0.0
  - @toptal/picasso-prompt-modal@2.0.0
  - @toptal/picasso-modal@3.0.0
  - @toptal/picasso-accordion@2.0.0
  - @toptal/picasso-tabs@3.0.0
  - @toptal/picasso-application-update-notification@2.0.0
  - @toptal/picasso-form@4.0.0
  - @toptal/picasso-breadcrumbs@2.0.0
  - @toptal/picasso-outlined-input@2.0.0
  - @toptal/picasso-timepicker@2.0.0
  - @toptal/picasso-input@3.0.0
  - @toptal/picasso-container@2.0.0
  - @toptal/picasso-alert@3.0.0
  - @toptal/picasso-helpbox@4.0.0
  - @toptal/picasso-avatar@5.0.0
  - @toptal/picasso-carousel@2.0.0
  - @toptal/picasso-date-picker@2.0.0
  - @toptal/picasso-dropzone@3.0.0
  - @toptal/picasso-empty-state@2.0.0
  - @toptal/picasso-file-input@2.0.0
  - @toptal/picasso-list@3.0.0
  - @toptal/picasso-note@2.0.0
  - @toptal/picasso-overview-block@2.0.0
  - @toptal/picasso-quote@2.0.0
  - @toptal/picasso-rating@2.0.0
  - @toptal/picasso-tree-view@3.0.0
  - @toptal/picasso-user-badge@3.0.0
  - @toptal/picasso-tagselector@2.0.0
  - @toptal/picasso-date-select@1.0.31
  - @toptal/picasso-dropdown@2.0.4
  - @toptal/picasso-switch@2.0.4
  - @toptal/picasso-tooltip@1.1.4
  - @toptal/picasso-amount@1.0.6
  - @toptal/picasso-show-more@1.0.25
  - @toptal/picasso-typography-overflow@2.0.4
  - @toptal/picasso-skeleton-loader@1.0.25
  - @toptal/picasso-avatar-upload@1.0.27

## 46.0.15

### Patch Changes

- Updated dependencies [[`f5e1655`](https://github.com/toptal/picasso/commit/f5e16551b24a5a48e4b8a288928686fdbf57fae1)]:
  - @toptal/picasso-page@2.2.0

## 46.0.14

### Patch Changes

- [#4399](https://github.com/toptal/picasso/pull/4399) [`3b4fc59`](https://github.com/toptal/picasso/commit/3b4fc5959cadc90c6d4376b50c8d14791921c5d4) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Tag

- allow to customize the color of an icon

- [#4400](https://github.com/toptal/picasso/pull/4400) [`a7c226f`](https://github.com/toptal/picasso/commit/a7c226f33753682c001e31b76aa72e9e8172d5a4) Thanks [@AdrianContiu](https://github.com/AdrianContiu)!

### Avatar, AvatarGroup

- add `showEmblem` prop to Avatar and AvatarGroup to enable display of Toptal logo
- remove `variant` prop because we no longer display avatar as `portrait` or `landscape`
- these changes are the result of the design update that can be tracked [here](https://www.figma.com/design/bUFkua511v5UOOpn08KSZO/Library-2.0?node-id=15794-15305&t=pLpfBxoMagKCtLIi-4)
- Updated dependencies [[`3b4fc59`](https://github.com/toptal/picasso/commit/3b4fc5959cadc90c6d4376b50c8d14791921c5d4), [`cd00880`](https://github.com/toptal/picasso/commit/cd008802e9701bb6574b3354f9d6e95c6ffc61ed), [`a7c226f`](https://github.com/toptal/picasso/commit/a7c226f33753682c001e31b76aa72e9e8172d5a4)]:
  - @toptal/picasso-tag@2.0.6
  - @toptal/picasso-icons@1.5.0
  - @toptal/picasso-avatar@4.0.0
  - @toptal/picasso-page@2.1.1
  - @toptal/picasso-tagselector@1.0.33
  - @toptal/picasso-accordion@1.0.24
  - @toptal/picasso-account-select@1.0.17
  - @toptal/picasso-alert@2.0.1
  - @toptal/picasso-application-update-notification@1.0.24
  - @toptal/picasso-avatar-upload@1.0.26
  - @toptal/picasso-breadcrumbs@1.0.12
  - @toptal/picasso-button@2.1.1
  - @toptal/picasso-calendar@1.1.1
  - @toptal/picasso-carousel@1.0.25
  - @toptal/picasso-date-picker@1.1.1
  - @toptal/picasso-drawer@2.1.3
  - @toptal/picasso-dropzone@2.0.2
  - @toptal/picasso-empty-state@1.0.11
  - @toptal/picasso-file-input@1.0.26
  - @toptal/picasso-form@3.0.7
  - @toptal/picasso-grid@3.0.6
  - @toptal/picasso-helpbox@3.0.1
  - @toptal/picasso-input@2.0.8
  - @toptal/picasso-input-adornment@1.0.8
  - @toptal/picasso-list@2.0.7
  - @toptal/picasso-logo@1.0.8
  - @toptal/picasso-menu@1.0.17
  - @toptal/picasso-modal@2.0.10
  - @toptal/picasso-notification@2.0.16
  - @toptal/picasso-number-input@1.0.26
  - @toptal/picasso-outlined-input@1.1.5
  - @toptal/picasso-password-input@2.0.12
  - @toptal/picasso-rating@1.0.8
  - @toptal/picasso-section@3.0.5
  - @toptal/picasso-select@1.0.30
  - @toptal/picasso-show-more@1.0.24
  - @toptal/picasso-step@1.1.9
  - @toptal/picasso-table@1.1.21
  - @toptal/picasso-tabs@2.0.9
  - @toptal/picasso-timepicker@1.0.26
  - @toptal/picasso-user-badge@2.0.8
  - @toptal/picasso-pagination@2.0.10
  - @toptal/picasso-prompt-modal@1.0.24
  - @toptal/picasso-skeleton-loader@1.0.24
  - @toptal/picasso-tree-view@2.0.3
  - @toptal/picasso-autocomplete@1.0.30
  - @toptal/picasso-checkbox@2.0.7
  - @toptal/picasso-radio@2.0.7
  - @toptal/picasso-switch@2.0.3
  - @toptal/picasso-date-select@1.0.30

## 46.0.13

### Patch Changes

- Updated dependencies [[`337d17a`](https://github.com/toptal/picasso/commit/337d17a31cf871c7ef5c7f9241d50b632a8738a7), [`1c99af9`](https://github.com/toptal/picasso/commit/1c99af999c8a242e1035a5416a5d63411a0abaf2), [`8b1aa26`](https://github.com/toptal/picasso/commit/8b1aa267dd0797cb5a9b24ce3052af8d68a85d53), [`423ceac`](https://github.com/toptal/picasso/commit/423ceac1737a27c11f1794fc09ccf727a26dfea6), [`5acb05f`](https://github.com/toptal/picasso/commit/5acb05fa9a9d779d25585263240d77fd642be622)]:
  - @toptal/picasso-page@2.1.0
  - @toptal/picasso-avatar@3.0.0
  - @toptal/picasso-alert@2.0.0
  - @toptal/picasso-date-picker@1.1.0
  - @toptal/picasso-calendar@1.1.0
  - @toptal/picasso-helpbox@3.0.0
  - @toptal/picasso-avatar-upload@1.0.25
  - @toptal/picasso-menu@1.0.16
  - @toptal/picasso-user-badge@2.0.7
  - @toptal/picasso-account-select@1.0.16
  - @toptal/picasso-autocomplete@1.0.29
  - @toptal/picasso-select@1.0.29
  - @toptal/picasso-tabs@2.0.8
  - @toptal/picasso-tagselector@1.0.32
  - @toptal/picasso-date-select@1.0.29

## 46.0.12

### Patch Changes

- Updated dependencies [[`34097ae`](https://github.com/toptal/picasso/commit/34097ae9d85c813a4067b95642c1fdde4edfa216)]:
  - @toptal/picasso-drawer@2.1.2

## 46.0.11

### Patch Changes

- Updated dependencies [[`f81346e`](https://github.com/toptal/picasso/commit/f81346e54232231f7085dc2c9a2912dd6a04fd11)]:
  - @toptal/picasso-step@1.1.8

## 46.0.10

### Patch Changes

- Updated dependencies [[`d2d58ab`](https://github.com/toptal/picasso/commit/d2d58ab35a0f245b7f6cc0bbea3b9b2727d8c578), [`d2d58ab`](https://github.com/toptal/picasso/commit/d2d58ab35a0f245b7f6cc0bbea3b9b2727d8c578)]:
  - @toptal/picasso-button@2.1.0
  - @toptal/picasso-accordion@1.0.23
  - @toptal/picasso-alert@1.0.23
  - @toptal/picasso-application-update-notification@1.0.23
  - @toptal/picasso-calendar@1.0.23
  - @toptal/picasso-carousel@1.0.24
  - @toptal/picasso-drawer@2.1.1
  - @toptal/picasso-file-input@1.0.25
  - @toptal/picasso-helpbox@2.0.9
  - @toptal/picasso-modal@2.0.9
  - @toptal/picasso-notification@2.0.15
  - @toptal/picasso-outlined-input@1.1.4
  - @toptal/picasso-page@2.0.23
  - @toptal/picasso-pagination@2.0.9
  - @toptal/picasso-password-input@2.0.11
  - @toptal/picasso-prompt-modal@1.0.23
  - @toptal/picasso-section@3.0.4
  - @toptal/picasso-show-more@1.0.23
  - @toptal/picasso-skeleton-loader@1.0.23
  - @toptal/picasso-table@1.1.20
  - @toptal/picasso-tree-view@2.0.2
  - @toptal/picasso-date-picker@1.0.25
  - @toptal/picasso-dropzone@2.0.1
  - @toptal/picasso-autocomplete@1.0.28
  - @toptal/picasso-avatar-upload@1.0.24
  - @toptal/picasso-input@2.0.7
  - @toptal/picasso-number-input@1.0.25
  - @toptal/picasso-select@1.0.28
  - @toptal/picasso-tagselector@1.0.31
  - @toptal/picasso-timepicker@1.0.25
  - @toptal/picasso-date-select@1.0.28

## 46.0.9

### Patch Changes

- Updated dependencies [[`4a71002`](https://github.com/toptal/picasso/commit/4a71002c89400db184edec86ca4668a74bf07377), [`b2f0d71`](https://github.com/toptal/picasso/commit/b2f0d71869ff4ce899837ca0a57864bc839e1394), [`c5aaee5`](https://github.com/toptal/picasso/commit/c5aaee5529e41b8db855c05e2d757c3c7472f9e3)]:
  - @toptal/picasso-drawer@2.1.0
  - @toptal/picasso-typography-overflow@2.0.3
  - @toptal/picasso-dropzone@2.0.0
  - @toptal/picasso-file-input@1.0.24
  - @toptal/picasso-step@1.1.7
  - @toptal/picasso-tabs@2.0.7

## 46.0.8

### Patch Changes

- Updated dependencies [[`c5651b1`](https://github.com/toptal/picasso/commit/c5651b165b82e3ac76f616d622c6f1226697f713)]:
  - @toptal/picasso-button@2.0.8
  - @toptal/picasso-accordion@1.0.22
  - @toptal/picasso-alert@1.0.22
  - @toptal/picasso-application-update-notification@1.0.22
  - @toptal/picasso-calendar@1.0.22
  - @toptal/picasso-carousel@1.0.23
  - @toptal/picasso-drawer@2.0.14
  - @toptal/picasso-file-input@1.0.23
  - @toptal/picasso-helpbox@2.0.8
  - @toptal/picasso-modal@2.0.8
  - @toptal/picasso-notification@2.0.14
  - @toptal/picasso-outlined-input@1.1.3
  - @toptal/picasso-page@2.0.22
  - @toptal/picasso-pagination@2.0.8
  - @toptal/picasso-password-input@2.0.10
  - @toptal/picasso-prompt-modal@1.0.22
  - @toptal/picasso-section@3.0.3
  - @toptal/picasso-show-more@1.0.22
  - @toptal/picasso-skeleton-loader@1.0.22
  - @toptal/picasso-table@1.1.19
  - @toptal/picasso-tree-view@2.0.1
  - @toptal/picasso-date-picker@1.0.24
  - @toptal/picasso-dropzone@1.0.23
  - @toptal/picasso-autocomplete@1.0.27
  - @toptal/picasso-avatar-upload@1.0.23
  - @toptal/picasso-input@2.0.6
  - @toptal/picasso-number-input@1.0.24
  - @toptal/picasso-select@1.0.27
  - @toptal/picasso-tagselector@1.0.30
  - @toptal/picasso-timepicker@1.0.24
  - @toptal/picasso-date-select@1.0.27

## 46.0.7

### Patch Changes

- Updated dependencies [[`147fc5f`](https://github.com/toptal/picasso/commit/147fc5ff8893d71a73e3f6046e7de9fd0d67a06d)]:
  - @toptal/picasso-select@1.0.26
  - @toptal/picasso-autocomplete@1.0.26
  - @toptal/picasso-date-select@1.0.26
  - @toptal/picasso-page@2.0.21
  - @toptal/picasso-tagselector@1.0.29

## 46.0.6

### Patch Changes

- [#4375](https://github.com/toptal/picasso/pull/4375) [`ca379cb9334324ed794074e7c7e3fddf8538b5d6`](https://github.com/toptal/picasso/commit/ca379cb9334324ed794074e7c7e3fddf8538b5d6) Thanks [@trofim-samusev](https://github.com/trofim-samusev)!

### picasso-select

- export SelectCaret component

### picasso

- export OutlinedInputProps type
- Updated dependencies [[`ca379cb`](https://github.com/toptal/picasso/commit/ca379cb9334324ed794074e7c7e3fddf8538b5d6)]:
  - @toptal/picasso-select@1.0.25
  - @toptal/picasso-autocomplete@1.0.25
  - @toptal/picasso-date-select@1.0.25
  - @toptal/picasso-page@2.0.20
  - @toptal/picasso-tagselector@1.0.28

## 46.0.5

### Patch Changes

- Updated dependencies [[`08cfcd4`](https://github.com/toptal/picasso/commit/08cfcd4483a532e437b9cca087c0e498a70b2197)]:
  - @toptal/picasso-tree-view@2.0.0

## 46.0.4

### Patch Changes

- Updated dependencies [[`f267743`](https://github.com/toptal/picasso/commit/f2677435e4e43253d87d5bb4105f0bb540dca56e)]:
  - @toptal/picasso-icons@1.4.0
  - @toptal/picasso-accordion@1.0.21
  - @toptal/picasso-account-select@1.0.15
  - @toptal/picasso-alert@1.0.21
  - @toptal/picasso-application-update-notification@1.0.21
  - @toptal/picasso-avatar@2.0.6
  - @toptal/picasso-avatar-upload@1.0.22
  - @toptal/picasso-breadcrumbs@1.0.11
  - @toptal/picasso-button@2.0.7
  - @toptal/picasso-calendar@1.0.21
  - @toptal/picasso-carousel@1.0.22
  - @toptal/picasso-date-picker@1.0.23
  - @toptal/picasso-drawer@2.0.13
  - @toptal/picasso-dropzone@1.0.22
  - @toptal/picasso-empty-state@1.0.10
  - @toptal/picasso-file-input@1.0.22
  - @toptal/picasso-form@3.0.6
  - @toptal/picasso-grid@3.0.5
  - @toptal/picasso-helpbox@2.0.7
  - @toptal/picasso-input@2.0.5
  - @toptal/picasso-input-adornment@1.0.7
  - @toptal/picasso-list@2.0.6
  - @toptal/picasso-logo@1.0.7
  - @toptal/picasso-menu@1.0.15
  - @toptal/picasso-modal@2.0.7
  - @toptal/picasso-notification@2.0.13
  - @toptal/picasso-number-input@1.0.23
  - @toptal/picasso-outlined-input@1.1.2
  - @toptal/picasso-page@2.0.19
  - @toptal/picasso-password-input@2.0.9
  - @toptal/picasso-rating@1.0.7
  - @toptal/picasso-section@3.0.2
  - @toptal/picasso-select@1.0.24
  - @toptal/picasso-show-more@1.0.21
  - @toptal/picasso-step@1.1.6
  - @toptal/picasso-table@1.1.18
  - @toptal/picasso-tabs@2.0.6
  - @toptal/picasso-tag@2.0.5
  - @toptal/picasso-timepicker@1.0.23
  - @toptal/picasso-user-badge@2.0.6
  - @toptal/picasso-pagination@2.0.7
  - @toptal/picasso-prompt-modal@1.0.21
  - @toptal/picasso-skeleton-loader@1.0.21
  - @toptal/picasso-tree-view@1.0.21
  - @toptal/picasso-autocomplete@1.0.24
  - @toptal/picasso-checkbox@2.0.6
  - @toptal/picasso-radio@2.0.6
  - @toptal/picasso-switch@2.0.2
  - @toptal/picasso-tagselector@1.0.27
  - @toptal/picasso-date-select@1.0.24

## 46.0.3

### Patch Changes

- [#4337](https://github.com/toptal/picasso/pull/4337) [`79c7c29a6fed6b5f1941e753d8428ad92f21cc96`](https://github.com/toptal/picasso/commit/79c7c29a6fed6b5f1941e753d8428ad92f21cc96) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### TagGroup

- remove `min-width: 100%` it was added by mistake during the migration
- Updated dependencies [[`79c7c29`](https://github.com/toptal/picasso/commit/79c7c29a6fed6b5f1941e753d8428ad92f21cc96)]:
  - @toptal/picasso-tag@2.0.4
  - @toptal/picasso-page@2.0.18
  - @toptal/picasso-tagselector@1.0.26

## 46.0.2

### Patch Changes

- Updated dependencies [[`87ace4e`](https://github.com/toptal/picasso/commit/87ace4e92a7ec66d5312ac62cefffc41cb0899a0)]:
  - @toptal/picasso-icons@1.3.0
  - @toptal/picasso-accordion@1.0.20
  - @toptal/picasso-account-select@1.0.14
  - @toptal/picasso-alert@1.0.20
  - @toptal/picasso-application-update-notification@1.0.20
  - @toptal/picasso-avatar@2.0.5
  - @toptal/picasso-avatar-upload@1.0.21
  - @toptal/picasso-breadcrumbs@1.0.10
  - @toptal/picasso-button@2.0.6
  - @toptal/picasso-calendar@1.0.20
  - @toptal/picasso-carousel@1.0.21
  - @toptal/picasso-date-picker@1.0.22
  - @toptal/picasso-drawer@2.0.12
  - @toptal/picasso-dropzone@1.0.21
  - @toptal/picasso-empty-state@1.0.9
  - @toptal/picasso-file-input@1.0.21
  - @toptal/picasso-form@3.0.5
  - @toptal/picasso-grid@3.0.4
  - @toptal/picasso-helpbox@2.0.6
  - @toptal/picasso-input@2.0.4
  - @toptal/picasso-input-adornment@1.0.6
  - @toptal/picasso-list@2.0.5
  - @toptal/picasso-logo@1.0.6
  - @toptal/picasso-menu@1.0.14
  - @toptal/picasso-modal@2.0.6
  - @toptal/picasso-notification@2.0.12
  - @toptal/picasso-number-input@1.0.22
  - @toptal/picasso-outlined-input@1.1.1
  - @toptal/picasso-page@2.0.17
  - @toptal/picasso-password-input@2.0.8
  - @toptal/picasso-rating@1.0.6
  - @toptal/picasso-section@3.0.1
  - @toptal/picasso-select@1.0.23
  - @toptal/picasso-show-more@1.0.20
  - @toptal/picasso-step@1.1.5
  - @toptal/picasso-table@1.1.17
  - @toptal/picasso-tabs@2.0.5
  - @toptal/picasso-tag@2.0.3
  - @toptal/picasso-timepicker@1.0.22
  - @toptal/picasso-user-badge@2.0.5
  - @toptal/picasso-pagination@2.0.6
  - @toptal/picasso-prompt-modal@1.0.20
  - @toptal/picasso-skeleton-loader@1.0.20
  - @toptal/picasso-tree-view@1.0.20
  - @toptal/picasso-autocomplete@1.0.23
  - @toptal/picasso-checkbox@2.0.5
  - @toptal/picasso-radio@2.0.5
  - @toptal/picasso-switch@2.0.1
  - @toptal/picasso-tagselector@1.0.25
  - @toptal/picasso-date-select@1.0.23

## 46.0.1

### Patch Changes

- [#4317](https://github.com/toptal/picasso/pull/4317) [`27acfb01f720505e1bfa3dad341800ba7fe1d1b2`](https://github.com/toptal/picasso/commit/27acfb01f720505e1bfa3dad341800ba7fe1d1b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- refactor highlight and vertical layout

- Updated dependencies [[`5ce143b`](https://github.com/toptal/picasso/commit/5ce143b0cea7b98797e63114756208119790c4af), [`27acfb0`](https://github.com/toptal/picasso/commit/27acfb01f720505e1bfa3dad341800ba7fe1d1b2), [`27acfb0`](https://github.com/toptal/picasso/commit/27acfb01f720505e1bfa3dad341800ba7fe1d1b2)]:
  - @toptal/picasso-outlined-input@1.1.0
  - @toptal/picasso-number-input@1.0.21
  - @toptal/picasso-password-input@2.0.7
  - @toptal/picasso-tagselector@1.0.24
  - @toptal/picasso-select@1.0.22
  - @toptal/picasso-input@2.0.3
  - @toptal/picasso-autocomplete@1.0.22
  - @toptal/picasso-avatar-upload@1.0.20
  - @toptal/picasso-date-picker@1.0.21
  - @toptal/picasso-timepicker@1.0.21
  - @toptal/picasso-date-select@1.0.22
  - @toptal/picasso-page@2.0.16

## 46.0.0

### Major Changes

- [#4320](https://github.com/toptal/picasso/pull/4320) [`75540be4ee8bd57c4da93ae725782c39c7cf85b2`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Tailwind preset

- add `@toptal/picasso-tailwind` package to peer dependencies
- please, update `@toptal/picasso-tailwind` to the **latest** version!
- add `currentColor` to the tailwind theme

- [#4320](https://github.com/toptal/picasso/pull/4320) [`75540be4ee8bd57c4da93ae725782c39c7cf85b2`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Slider

- migrate from MUI@4 to MUI Base and TailwindCSS
- remove `compact`, `disablePortal` and `TooltipComponent` props in Slider component

- [#4320](https://github.com/toptal/picasso/pull/4320) [`75540be4ee8bd57c4da93ae725782c39c7cf85b2`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Switch

- migrate Switch component from MUI@4 to MUI Base and TailwindCSS
- remove `value` property from Switch.

### Patch Changes

- [#4320](https://github.com/toptal/picasso/pull/4320) [`75540be4ee8bd57c4da93ae725782c39c7cf85b2`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Collapse

- wrap content into additional layer to stretch the content as in legacy implementation

- [#4320](https://github.com/toptal/picasso/pull/4320) [`75540be4ee8bd57c4da93ae725782c39c7cf85b2`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Section

- migrate component from MUI@4 to custom solution and TailwindCSS
- update peer dependencies
- Updated dependencies [[`75540be`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2), [`75540be`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2), [`75540be`](https://github.com/toptal/picasso/commit/75540be4ee8bd57c4da93ae725782c39c7cf85b2)]:
  - @toptal/picasso-slider@2.0.0
  - @toptal/picasso-switch@2.0.0
  - @toptal/picasso-section@3.0.0

## 45.0.7

### Patch Changes

- Updated dependencies [[`2820f38`](https://github.com/toptal/picasso/commit/2820f38931f1b2736c4ad20b5609ca562da0d515)]:
  - @toptal/picasso-typography@2.0.2
  - @toptal/picasso-account-select@1.0.13
  - @toptal/picasso-alert@1.0.19
  - @toptal/picasso-amount@1.0.5
  - @toptal/picasso-application-update-notification@1.0.19
  - @toptal/picasso-autocomplete@1.0.21
  - @toptal/picasso-avatar@2.0.4
  - @toptal/picasso-breadcrumbs@1.0.9
  - @toptal/picasso-calendar@1.0.19
  - @toptal/picasso-drawer@2.0.11
  - @toptal/picasso-dropzone@1.0.20
  - @toptal/picasso-empty-state@1.0.8
  - @toptal/picasso-file-input@1.0.20
  - @toptal/picasso-form@3.0.4
  - @toptal/picasso-grid@3.0.3
  - @toptal/picasso-helpbox@2.0.5
  - @toptal/picasso-list@2.0.4
  - @toptal/picasso-menu@1.0.13
  - @toptal/picasso-modal@2.0.5
  - @toptal/picasso-note@1.0.7
  - @toptal/picasso-notification@2.0.11
  - @toptal/picasso-overview-block@1.0.7
  - @toptal/picasso-page@2.0.15
  - @toptal/picasso-pagination@2.0.5
  - @toptal/picasso-prompt-modal@1.0.19
  - @toptal/picasso-quote@1.0.5
  - @toptal/picasso-section@2.0.11
  - @toptal/picasso-select@1.0.21
  - @toptal/picasso-show-more@1.0.19
  - @toptal/picasso-step@1.1.4
  - @toptal/picasso-table@1.1.16
  - @toptal/picasso-tabs@2.0.4
  - @toptal/picasso-tag@2.0.2
  - @toptal/picasso-timeline@2.0.2
  - @toptal/picasso-tooltip@1.1.3
  - @toptal/picasso-typography-overflow@2.0.2
  - @toptal/picasso-user-badge@2.0.4
  - @toptal/picasso-tagselector@1.0.23
  - @toptal/picasso-avatar-upload@1.0.19
  - @toptal/picasso-date-picker@1.0.20
  - @toptal/picasso-checkbox@2.0.4
  - @toptal/picasso-input@2.0.2
  - @toptal/picasso-number-input@1.0.20
  - @toptal/picasso-radio@2.0.4
  - @toptal/picasso-switch@1.0.12
  - @toptal/picasso-date-select@1.0.21
  - @toptal/picasso-slider@1.0.6
  - @toptal/picasso-button@2.0.5
  - @toptal/picasso-password-input@2.0.6
  - @toptal/picasso-timepicker@1.0.20
  - @toptal/picasso-accordion@1.0.19
  - @toptal/picasso-carousel@1.0.20
  - @toptal/picasso-outlined-input@1.0.19
  - @toptal/picasso-skeleton-loader@1.0.19
  - @toptal/picasso-tree-view@1.0.19

## 45.0.6

### Patch Changes

- [#4321](https://github.com/toptal/picasso/pull/4321) [`d03712b77511528d0139da4b5ef74e797d64446c`](https://github.com/toptal/picasso/commit/d03712b77511528d0139da4b5ef74e797d64446c) Thanks [@ruslan-sed](https://github.com/ruslan-sed)!
- mention `Merging classes` tutorial in README.md

## 45.0.5

### Patch Changes

- Updated dependencies [[`978ae36`](https://github.com/toptal/picasso/commit/978ae36fa8e0306ecbffdddf1a725dc0997c3d6e)]:
  - @toptal/picasso-icons@1.2.0
  - @toptal/picasso-accordion@1.0.18
  - @toptal/picasso-account-select@1.0.12
  - @toptal/picasso-alert@1.0.18
  - @toptal/picasso-application-update-notification@1.0.18
  - @toptal/picasso-avatar@2.0.3
  - @toptal/picasso-avatar-upload@1.0.18
  - @toptal/picasso-breadcrumbs@1.0.8
  - @toptal/picasso-button@2.0.4
  - @toptal/picasso-calendar@1.0.18
  - @toptal/picasso-carousel@1.0.19
  - @toptal/picasso-date-picker@1.0.19
  - @toptal/picasso-drawer@2.0.10
  - @toptal/picasso-dropzone@1.0.19
  - @toptal/picasso-empty-state@1.0.7
  - @toptal/picasso-file-input@1.0.19
  - @toptal/picasso-form@3.0.3
  - @toptal/picasso-grid@3.0.2
  - @toptal/picasso-helpbox@2.0.4
  - @toptal/picasso-input@2.0.1
  - @toptal/picasso-input-adornment@1.0.5
  - @toptal/picasso-list@2.0.3
  - @toptal/picasso-logo@1.0.5
  - @toptal/picasso-menu@1.0.12
  - @toptal/picasso-modal@2.0.4
  - @toptal/picasso-notification@2.0.10
  - @toptal/picasso-number-input@1.0.19
  - @toptal/picasso-outlined-input@1.0.18
  - @toptal/picasso-page@2.0.14
  - @toptal/picasso-password-input@2.0.5
  - @toptal/picasso-rating@1.0.5
  - @toptal/picasso-section@2.0.10
  - @toptal/picasso-select@1.0.20
  - @toptal/picasso-show-more@1.0.18
  - @toptal/picasso-step@1.1.3
  - @toptal/picasso-table@1.1.15
  - @toptal/picasso-tabs@2.0.3
  - @toptal/picasso-tag@2.0.1
  - @toptal/picasso-timepicker@1.0.19
  - @toptal/picasso-user-badge@2.0.3
  - @toptal/picasso-pagination@2.0.4
  - @toptal/picasso-prompt-modal@1.0.18
  - @toptal/picasso-skeleton-loader@1.0.18
  - @toptal/picasso-tree-view@1.0.18
  - @toptal/picasso-autocomplete@1.0.20
  - @toptal/picasso-checkbox@2.0.3
  - @toptal/picasso-radio@2.0.3
  - @toptal/picasso-switch@1.0.11
  - @toptal/picasso-tagselector@1.0.22
  - @toptal/picasso-date-select@1.0.20

## 45.0.4

### Patch Changes

- Updated dependencies [[`5259486`](https://github.com/toptal/picasso/commit/52594865c858dab4d7a3e2419ca87d38d7d01588)]:
  - @toptal/picasso-tag@2.0.0
  - @toptal/picasso-page@2.0.13
  - @toptal/picasso-tagselector@1.0.21

## 45.0.3

### Patch Changes

- Updated dependencies [[`3d327e8`](https://github.com/toptal/picasso/commit/3d327e88a923d2dfeafe3e2f0ba5a69416eb6270)]:
  - @toptal/picasso-page@2.0.12

## 45.0.2

### Patch Changes

- Updated dependencies [[`c3700ac`](https://github.com/toptal/picasso/commit/c3700ac185178d83561ee5fde0b5d259f2d0b049)]:
  - @toptal/picasso-input@2.0.0
  - @toptal/picasso-autocomplete@1.0.19
  - @toptal/picasso-date-picker@1.0.18
  - @toptal/picasso-number-input@1.0.18
  - @toptal/picasso-password-input@2.0.4
  - @toptal/picasso-select@1.0.19
  - @toptal/picasso-tagselector@1.0.20
  - @toptal/picasso-timepicker@1.0.18
  - @toptal/picasso-page@2.0.11
  - @toptal/picasso-date-select@1.0.19

## 45.0.1

### Patch Changes

- Updated dependencies [[`81ba64e`](https://github.com/toptal/picasso/commit/81ba64e3ee6206aa7119fa2069ca685228567746)]:
  - @toptal/picasso-checkbox@2.0.2
  - @toptal/picasso-radio@2.0.2
  - @toptal/picasso-form@3.0.2
  - @toptal/picasso-grid@3.0.1
  - @toptal/picasso-button@2.0.3
  - @toptal/picasso-autocomplete@1.0.18
  - @toptal/picasso-dropzone@1.0.18
  - @toptal/picasso-file-input@1.0.18
  - @toptal/picasso-input@1.0.17
  - @toptal/picasso-number-input@1.0.17
  - @toptal/picasso-select@1.0.18
  - @toptal/picasso-switch@1.0.10
  - @toptal/picasso-tagselector@1.0.19
  - @toptal/picasso-accordion@1.0.17
  - @toptal/picasso-alert@1.0.17
  - @toptal/picasso-application-update-notification@1.0.17
  - @toptal/picasso-calendar@1.0.17
  - @toptal/picasso-carousel@1.0.18
  - @toptal/picasso-drawer@2.0.9
  - @toptal/picasso-helpbox@2.0.3
  - @toptal/picasso-modal@2.0.3
  - @toptal/picasso-notification@2.0.9
  - @toptal/picasso-outlined-input@1.0.17
  - @toptal/picasso-page@2.0.10
  - @toptal/picasso-pagination@2.0.3
  - @toptal/picasso-password-input@2.0.3
  - @toptal/picasso-prompt-modal@1.0.17
  - @toptal/picasso-section@2.0.9
  - @toptal/picasso-show-more@1.0.17
  - @toptal/picasso-skeleton-loader@1.0.17
  - @toptal/picasso-table@1.1.14
  - @toptal/picasso-tree-view@1.0.17
  - @toptal/picasso-date-picker@1.0.17
  - @toptal/picasso-timepicker@1.0.17
  - @toptal/picasso-date-select@1.0.18
  - @toptal/picasso-avatar-upload@1.0.17

## 45.0.0

### Major Changes

- [#4303](https://github.com/toptal/picasso/pull/4303) [`98abedf74fb621f9036e6a3925631e541424133b`](https://github.com/toptal/picasso/commit/98abedf74fb621f9036e6a3925631e541424133b) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- update `@toptal/picasso-tailwind` to the latest version

### Patch Changes

- Updated dependencies [[`98abedf`](https://github.com/toptal/picasso/commit/98abedf74fb621f9036e6a3925631e541424133b)]:
  - @toptal/picasso-password-input@2.0.2
  - @toptal/picasso-pagination@2.0.2
  - @toptal/picasso-helpbox@2.0.2
  - @toptal/picasso-button@2.0.2
  - @toptal/picasso-modal@2.0.2
  - @toptal/picasso-page@2.0.9
  - @toptal/picasso-accordion@1.0.16
  - @toptal/picasso-alert@1.0.16
  - @toptal/picasso-application-update-notification@1.0.16
  - @toptal/picasso-calendar@1.0.16
  - @toptal/picasso-carousel@1.0.17
  - @toptal/picasso-drawer@2.0.8
  - @toptal/picasso-file-input@1.0.17
  - @toptal/picasso-notification@2.0.8
  - @toptal/picasso-outlined-input@1.0.16
  - @toptal/picasso-prompt-modal@1.0.16
  - @toptal/picasso-section@2.0.8
  - @toptal/picasso-show-more@1.0.16
  - @toptal/picasso-skeleton-loader@1.0.16
  - @toptal/picasso-table@1.1.13
  - @toptal/picasso-tree-view@1.0.16
  - @toptal/picasso-date-picker@1.0.16
  - @toptal/picasso-dropzone@1.0.17
  - @toptal/picasso-autocomplete@1.0.17
  - @toptal/picasso-avatar-upload@1.0.16
  - @toptal/picasso-input@1.0.16
  - @toptal/picasso-number-input@1.0.16
  - @toptal/picasso-select@1.0.17
  - @toptal/picasso-tagselector@1.0.18
  - @toptal/picasso-timepicker@1.0.16
  - @toptal/picasso-date-select@1.0.17

## 44.0.21

### Patch Changes

- Updated dependencies [[`ab2b605`](https://github.com/toptal/picasso/commit/ab2b605da9877b2f5fca18830923e0dcfbe1b9ed)]:
  - @toptal/picasso-paper@2.0.4
  - @toptal/picasso-dropdown@2.0.3
  - @toptal/picasso-menu@1.0.11
  - @toptal/picasso-button@2.0.1
  - @toptal/picasso-page@2.0.8
  - @toptal/picasso-account-select@1.0.11
  - @toptal/picasso-autocomplete@1.0.16
  - @toptal/picasso-select@1.0.16
  - @toptal/picasso-accordion@1.0.15
  - @toptal/picasso-alert@1.0.15
  - @toptal/picasso-application-update-notification@1.0.15
  - @toptal/picasso-calendar@1.0.15
  - @toptal/picasso-carousel@1.0.16
  - @toptal/picasso-drawer@2.0.7
  - @toptal/picasso-file-input@1.0.16
  - @toptal/picasso-helpbox@2.0.1
  - @toptal/picasso-modal@2.0.1
  - @toptal/picasso-notification@2.0.7
  - @toptal/picasso-outlined-input@1.0.15
  - @toptal/picasso-pagination@2.0.1
  - @toptal/picasso-password-input@2.0.1
  - @toptal/picasso-prompt-modal@1.0.15
  - @toptal/picasso-section@2.0.7
  - @toptal/picasso-show-more@1.0.15
  - @toptal/picasso-skeleton-loader@1.0.15
  - @toptal/picasso-table@1.1.12
  - @toptal/picasso-tree-view@1.0.15
  - @toptal/picasso-tagselector@1.0.17
  - @toptal/picasso-date-select@1.0.16
  - @toptal/picasso-date-picker@1.0.15
  - @toptal/picasso-dropzone@1.0.16
  - @toptal/picasso-avatar-upload@1.0.15
  - @toptal/picasso-input@1.0.15
  - @toptal/picasso-number-input@1.0.15
  - @toptal/picasso-timepicker@1.0.15

## 44.0.20

### Patch Changes

- Updated dependencies [[`7611536`](https://github.com/toptal/picasso/commit/761153604f33bd1b9427240846b2d0cbb8ae5ed4), [`0c9807b`](https://github.com/toptal/picasso/commit/0c9807b800ed8a992de72f47bc1263d24a2fd4d8), [`7611536`](https://github.com/toptal/picasso/commit/761153604f33bd1b9427240846b2d0cbb8ae5ed4), [`d599529`](https://github.com/toptal/picasso/commit/d599529bcb283c367b63c612fee81394e66c9740)]:
  - @toptal/picasso-notification@2.0.6
  - @toptal/picasso-drawer@2.0.6
  - @toptal/picasso-page@2.0.7
  - @toptal/picasso-button@2.0.0
  - @toptal/picasso-password-input@2.0.0
  - @toptal/picasso-pagination@2.0.0
  - @toptal/picasso-helpbox@2.0.0
  - @toptal/picasso-modal@2.0.0
  - @toptal/picasso-shared@15.0.0
  - @toptal/picasso-accordion@1.0.14
  - @toptal/picasso-alert@1.0.14
  - @toptal/picasso-application-update-notification@1.0.14
  - @toptal/picasso-calendar@1.0.14
  - @toptal/picasso-carousel@1.0.15
  - @toptal/picasso-file-input@1.0.15
  - @toptal/picasso-outlined-input@1.0.14
  - @toptal/picasso-prompt-modal@1.0.14
  - @toptal/picasso-section@2.0.6
  - @toptal/picasso-show-more@1.0.14
  - @toptal/picasso-skeleton-loader@1.0.14
  - @toptal/picasso-table@1.1.11
  - @toptal/picasso-tree-view@1.0.14
  - @toptal/picasso-autocomplete@1.0.15
  - @toptal/picasso-avatar@2.0.2
  - @toptal/picasso-avatar-upload@1.0.14
  - @toptal/picasso-badge@1.0.3
  - @toptal/picasso-breadcrumbs@1.0.7
  - @toptal/picasso-checkbox@2.0.1
  - @toptal/picasso-environment-banner@1.0.3
  - @toptal/picasso-form@3.0.1
  - @toptal/picasso-grid@3.0.0
  - @toptal/picasso-input@1.0.14
  - @toptal/picasso-input-adornment@1.0.4
  - @toptal/picasso-list@2.0.2
  - @toptal/picasso-menu@1.0.10
  - @toptal/picasso-number-input@1.0.14
  - @toptal/picasso-overview-block@1.0.6
  - @toptal/picasso-popper@1.0.3
  - @toptal/picasso-radio@2.0.1
  - @toptal/picasso-select@1.0.15
  - @toptal/picasso-slider@1.0.5
  - @toptal/picasso-step@1.1.2
  - @toptal/picasso-switch@1.0.9
  - @toptal/picasso-tabs@2.0.2
  - @toptal/picasso-tag@1.1.2
  - @toptal/picasso-tagselector@1.0.16
  - @toptal/picasso-test-utils@1.1.1
  - @toptal/picasso-timeline@2.0.1
  - @toptal/picasso-tooltip@1.1.2
  - @toptal/picasso-utils@1.0.3
  - @toptal/picasso-date-picker@1.0.14
  - @toptal/picasso-dropzone@1.0.15
  - @toptal/picasso-timepicker@1.0.14
  - @toptal/picasso-user-badge@2.0.2
  - @toptal/picasso-account-select@1.0.10
  - @toptal/picasso-dropdown@2.0.2
  - @toptal/picasso-date-select@1.0.15
  - @toptal/picasso-amount@1.0.4
  - @toptal/picasso-container@1.0.3
  - @toptal/picasso-link@1.0.3
  - @toptal/picasso-note@1.0.6
  - @toptal/picasso-paper@2.0.3
  - @toptal/picasso-quote@1.0.4
  - @toptal/picasso-rating@1.0.4
  - @toptal/picasso-typography@2.0.1
  - @toptal/picasso-typography-overflow@2.0.1
  - @toptal/picasso-icons@1.1.1
  - @toptal/picasso-image@1.0.3
  - @toptal/picasso-loader@1.0.3
  - @toptal/picasso-logo@1.0.4
  - @toptal/picasso-empty-state@1.0.6

## 44.0.19

### Patch Changes

- Updated dependencies [[`045081f`](https://github.com/toptal/picasso/commit/045081fe7fed880890cb16d5defd7859d1e0b147), [`045081f`](https://github.com/toptal/picasso/commit/045081fe7fed880890cb16d5defd7859d1e0b147), [`045081f`](https://github.com/toptal/picasso/commit/045081fe7fed880890cb16d5defd7859d1e0b147), [`045081f`](https://github.com/toptal/picasso/commit/045081fe7fed880890cb16d5defd7859d1e0b147)]:
  - @toptal/picasso-grid@2.0.0
  - @toptal/picasso-checkbox@2.0.0
  - @toptal/picasso-form@3.0.0
  - @toptal/picasso-radio@2.0.0
  - @toptal/picasso-button@1.0.13
  - @toptal/picasso-accordion@1.0.13
  - @toptal/picasso-alert@1.0.13
  - @toptal/picasso-autocomplete@1.0.14
  - @toptal/picasso-calendar@1.0.13
  - @toptal/picasso-drawer@2.0.5
  - @toptal/picasso-input@1.0.13
  - @toptal/picasso-modal@1.0.13
  - @toptal/picasso-notification@2.0.5
  - @toptal/picasso-outlined-input@1.0.13
  - @toptal/picasso-page@2.0.6
  - @toptal/picasso-switch@1.0.8
  - @toptal/picasso-table@1.1.10
  - @toptal/picasso-dropzone@1.0.14
  - @toptal/picasso-file-input@1.0.14
  - @toptal/picasso-number-input@1.0.13
  - @toptal/picasso-select@1.0.14
  - @toptal/picasso-tagselector@1.0.15
  - @toptal/picasso-application-update-notification@1.0.13
  - @toptal/picasso-carousel@1.0.14
  - @toptal/picasso-helpbox@1.0.13
  - @toptal/picasso-pagination@1.0.13
  - @toptal/picasso-password-input@1.0.13
  - @toptal/picasso-prompt-modal@1.0.13
  - @toptal/picasso-section@2.0.5
  - @toptal/picasso-show-more@1.0.13
  - @toptal/picasso-skeleton-loader@1.0.13
  - @toptal/picasso-tree-view@1.0.13
  - @toptal/picasso-date-picker@1.0.13
  - @toptal/picasso-timepicker@1.0.13
  - @toptal/picasso-date-select@1.0.14
  - @toptal/picasso-avatar-upload@1.0.13

## 44.0.18

### Patch Changes

- Updated dependencies [[`c7560ae`](https://github.com/toptal/picasso/commit/c7560aed9dd41bb458c5532608ddd542890523e5)]:
  - @toptal/picasso-icons@1.1.0
  - @toptal/picasso-accordion@1.0.12
  - @toptal/picasso-account-select@1.0.9
  - @toptal/picasso-alert@1.0.12
  - @toptal/picasso-application-update-notification@1.0.12
  - @toptal/picasso-avatar@2.0.1
  - @toptal/picasso-avatar-upload@1.0.12
  - @toptal/picasso-breadcrumbs@1.0.6
  - @toptal/picasso-button@1.0.12
  - @toptal/picasso-calendar@1.0.12
  - @toptal/picasso-carousel@1.0.13
  - @toptal/picasso-date-picker@1.0.12
  - @toptal/picasso-drawer@2.0.4
  - @toptal/picasso-dropzone@1.0.13
  - @toptal/picasso-empty-state@1.0.5
  - @toptal/picasso-file-input@1.0.13
  - @toptal/picasso-form@2.0.1
  - @toptal/picasso-grid@1.0.6
  - @toptal/picasso-helpbox@1.0.12
  - @toptal/picasso-input@1.0.12
  - @toptal/picasso-input-adornment@1.0.3
  - @toptal/picasso-list@2.0.1
  - @toptal/picasso-logo@1.0.3
  - @toptal/picasso-menu@1.0.9
  - @toptal/picasso-modal@1.0.12
  - @toptal/picasso-notification@2.0.4
  - @toptal/picasso-number-input@1.0.12
  - @toptal/picasso-outlined-input@1.0.12
  - @toptal/picasso-page@2.0.5
  - @toptal/picasso-password-input@1.0.12
  - @toptal/picasso-rating@1.0.3
  - @toptal/picasso-section@2.0.4
  - @toptal/picasso-select@1.0.13
  - @toptal/picasso-show-more@1.0.12
  - @toptal/picasso-step@1.1.1
  - @toptal/picasso-table@1.1.9
  - @toptal/picasso-tabs@2.0.1
  - @toptal/picasso-tag@1.1.1
  - @toptal/picasso-timepicker@1.0.12
  - @toptal/picasso-user-badge@2.0.1
  - @toptal/picasso-pagination@1.0.12
  - @toptal/picasso-prompt-modal@1.0.12
  - @toptal/picasso-skeleton-loader@1.0.12
  - @toptal/picasso-tree-view@1.0.12
  - @toptal/picasso-autocomplete@1.0.13
  - @toptal/picasso-checkbox@1.0.7
  - @toptal/picasso-radio@1.0.7
  - @toptal/picasso-switch@1.0.7
  - @toptal/picasso-tagselector@1.0.14
  - @toptal/picasso-date-select@1.0.13

## 44.0.17

### Patch Changes

- Updated dependencies [[`f19a613`](https://github.com/toptal/picasso/commit/f19a61397870dcfd3bb5bb2e645a3ae1be8632ce)]:
  - @toptal/picasso-button@1.0.11
  - @toptal/picasso-accordion@1.0.11
  - @toptal/picasso-alert@1.0.11
  - @toptal/picasso-application-update-notification@1.0.11
  - @toptal/picasso-calendar@1.0.11
  - @toptal/picasso-carousel@1.0.12
  - @toptal/picasso-drawer@2.0.3
  - @toptal/picasso-file-input@1.0.12
  - @toptal/picasso-helpbox@1.0.11
  - @toptal/picasso-modal@1.0.11
  - @toptal/picasso-notification@2.0.3
  - @toptal/picasso-outlined-input@1.0.11
  - @toptal/picasso-page@2.0.4
  - @toptal/picasso-pagination@1.0.11
  - @toptal/picasso-password-input@1.0.11
  - @toptal/picasso-prompt-modal@1.0.11
  - @toptal/picasso-section@2.0.3
  - @toptal/picasso-show-more@1.0.11
  - @toptal/picasso-skeleton-loader@1.0.11
  - @toptal/picasso-table@1.1.8
  - @toptal/picasso-tree-view@1.0.11
  - @toptal/picasso-date-picker@1.0.11
  - @toptal/picasso-dropzone@1.0.12
  - @toptal/picasso-autocomplete@1.0.12
  - @toptal/picasso-avatar-upload@1.0.11
  - @toptal/picasso-input@1.0.11
  - @toptal/picasso-number-input@1.0.11
  - @toptal/picasso-select@1.0.12
  - @toptal/picasso-tagselector@1.0.13
  - @toptal/picasso-timepicker@1.0.11
  - @toptal/picasso-date-select@1.0.12

## 44.0.16

### Patch Changes

- Updated dependencies [[`da32106`](https://github.com/toptal/picasso/commit/da32106624188e82773df7fadcf708943e4fc09a)]:
  - @toptal/picasso-paper@2.0.2
  - @toptal/picasso-dropdown@2.0.1
  - @toptal/picasso-menu@1.0.8
  - @toptal/picasso-button@1.0.10
  - @toptal/picasso-page@2.0.3
  - @toptal/picasso-account-select@1.0.8
  - @toptal/picasso-autocomplete@1.0.11
  - @toptal/picasso-select@1.0.11
  - @toptal/picasso-accordion@1.0.10
  - @toptal/picasso-alert@1.0.10
  - @toptal/picasso-application-update-notification@1.0.10
  - @toptal/picasso-calendar@1.0.10
  - @toptal/picasso-carousel@1.0.11
  - @toptal/picasso-drawer@2.0.2
  - @toptal/picasso-file-input@1.0.11
  - @toptal/picasso-helpbox@1.0.10
  - @toptal/picasso-modal@1.0.10
  - @toptal/picasso-notification@2.0.2
  - @toptal/picasso-outlined-input@1.0.10
  - @toptal/picasso-pagination@1.0.10
  - @toptal/picasso-password-input@1.0.10
  - @toptal/picasso-prompt-modal@1.0.10
  - @toptal/picasso-section@2.0.2
  - @toptal/picasso-show-more@1.0.10
  - @toptal/picasso-skeleton-loader@1.0.10
  - @toptal/picasso-table@1.1.7
  - @toptal/picasso-tree-view@1.0.10
  - @toptal/picasso-tagselector@1.0.12
  - @toptal/picasso-date-select@1.0.11
  - @toptal/picasso-date-picker@1.0.10
  - @toptal/picasso-dropzone@1.0.11
  - @toptal/picasso-avatar-upload@1.0.10
  - @toptal/picasso-input@1.0.10
  - @toptal/picasso-number-input@1.0.10
  - @toptal/picasso-timepicker@1.0.10

## 44.0.15

### Patch Changes

- Updated dependencies [[`9afe571`](https://github.com/toptal/picasso/commit/9afe5710d418dfa30dcfe7eda88cd74b81838fc3)]:
  - @toptal/picasso-step@1.1.0

## 44.0.14

### Patch Changes

- Updated dependencies [[`ad19765`](https://github.com/toptal/picasso/commit/ad19765ee6219369a45cd86f65490fdb07b747b6)]:
  - @toptal/picasso-tag@1.1.0
  - @toptal/picasso-page@2.0.2
  - @toptal/picasso-tagselector@1.0.11

## 44.0.13

### Patch Changes

- Updated dependencies [[`d97ddf4`](https://github.com/toptal/picasso/commit/d97ddf4e9ed41e2b294d3701f37cf7cdadbf39c6)]:
  - @toptal/picasso-button@1.0.9
  - @toptal/picasso-accordion@1.0.9
  - @toptal/picasso-alert@1.0.9
  - @toptal/picasso-application-update-notification@1.0.9
  - @toptal/picasso-calendar@1.0.9
  - @toptal/picasso-carousel@1.0.10
  - @toptal/picasso-drawer@2.0.1
  - @toptal/picasso-file-input@1.0.10
  - @toptal/picasso-helpbox@1.0.9
  - @toptal/picasso-modal@1.0.9
  - @toptal/picasso-notification@2.0.1
  - @toptal/picasso-outlined-input@1.0.9
  - @toptal/picasso-page@2.0.1
  - @toptal/picasso-pagination@1.0.9
  - @toptal/picasso-password-input@1.0.9
  - @toptal/picasso-prompt-modal@1.0.9
  - @toptal/picasso-section@2.0.1
  - @toptal/picasso-show-more@1.0.9
  - @toptal/picasso-skeleton-loader@1.0.9
  - @toptal/picasso-table@1.1.6
  - @toptal/picasso-tree-view@1.0.9
  - @toptal/picasso-date-picker@1.0.9
  - @toptal/picasso-dropzone@1.0.10
  - @toptal/picasso-autocomplete@1.0.10
  - @toptal/picasso-avatar-upload@1.0.9
  - @toptal/picasso-input@1.0.9
  - @toptal/picasso-number-input@1.0.9
  - @toptal/picasso-select@1.0.10
  - @toptal/picasso-tagselector@1.0.10
  - @toptal/picasso-timepicker@1.0.9
  - @toptal/picasso-date-select@1.0.10

## 44.0.12

### Patch Changes

- Updated dependencies [[`4ee1ebd`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee), [`4ee1ebd`](https://github.com/toptal/picasso/commit/4ee1ebdafd9e5830d5ec6007620186d5a61befee)]:
  - @toptal/picasso-typography@2.0.0
  - @toptal/picasso-typography-overflow@2.0.0
  - @toptal/picasso-notification@2.0.0
  - @toptal/picasso-timeline@2.0.0
  - @toptal/picasso-section@2.0.0
  - @toptal/picasso-tabs@2.0.0
  - @toptal/picasso-avatar@2.0.0
  - @toptal/picasso-drawer@2.0.0
  - @toptal/picasso-form@2.0.0
  - @toptal/picasso-list@2.0.0
  - @toptal/picasso-page@2.0.0
  - @toptal/picasso-user-badge@2.0.0
  - @toptal/picasso-account-select@1.0.7
  - @toptal/picasso-alert@1.0.8
  - @toptal/picasso-amount@1.0.3
  - @toptal/picasso-application-update-notification@1.0.8
  - @toptal/picasso-autocomplete@1.0.9
  - @toptal/picasso-breadcrumbs@1.0.5
  - @toptal/picasso-calendar@1.0.8
  - @toptal/picasso-dropzone@1.0.9
  - @toptal/picasso-empty-state@1.0.4
  - @toptal/picasso-file-input@1.0.9
  - @toptal/picasso-grid@1.0.5
  - @toptal/picasso-helpbox@1.0.8
  - @toptal/picasso-menu@1.0.7
  - @toptal/picasso-modal@1.0.8
  - @toptal/picasso-note@1.0.5
  - @toptal/picasso-overview-block@1.0.5
  - @toptal/picasso-pagination@1.0.8
  - @toptal/picasso-prompt-modal@1.0.8
  - @toptal/picasso-quote@1.0.3
  - @toptal/picasso-select@1.0.9
  - @toptal/picasso-show-more@1.0.8
  - @toptal/picasso-table@1.1.5
  - @toptal/picasso-tag@1.0.5
  - @toptal/picasso-tooltip@1.1.1
  - @toptal/picasso-step@1.0.6
  - @toptal/picasso-accordion@1.0.8
  - @toptal/picasso-button@1.0.8
  - @toptal/picasso-checkbox@1.0.6
  - @toptal/picasso-input@1.0.8
  - @toptal/picasso-outlined-input@1.0.8
  - @toptal/picasso-radio@1.0.6
  - @toptal/picasso-slider@1.0.4
  - @toptal/picasso-switch@1.0.6
  - @toptal/picasso-avatar-upload@1.0.8
  - @toptal/picasso-number-input@1.0.8
  - @toptal/picasso-tagselector@1.0.9
  - @toptal/picasso-date-picker@1.0.8
  - @toptal/picasso-date-select@1.0.9
  - @toptal/picasso-password-input@1.0.8
  - @toptal/picasso-timepicker@1.0.8
  - @toptal/picasso-carousel@1.0.9
  - @toptal/picasso-skeleton-loader@1.0.8
  - @toptal/picasso-tree-view@1.0.8

## 44.0.11

### Patch Changes

- Updated dependencies [[`77acf9d`](https://github.com/toptal/picasso/commit/77acf9dfab19a88f41a9fcc1240b636d44b44628), [`b779ddc`](https://github.com/toptal/picasso/commit/b779ddce4a67593bab27e8d09c2c930708cfb2ec)]:
  - @toptal/picasso-page@1.0.10
  - @toptal/picasso-dropdown@2.0.0
  - @toptal/picasso-button@1.0.7
  - @toptal/picasso-accordion@1.0.7
  - @toptal/picasso-alert@1.0.7
  - @toptal/picasso-application-update-notification@1.0.7
  - @toptal/picasso-calendar@1.0.7
  - @toptal/picasso-carousel@1.0.8
  - @toptal/picasso-drawer@1.0.7
  - @toptal/picasso-file-input@1.0.8
  - @toptal/picasso-helpbox@1.0.7
  - @toptal/picasso-modal@1.0.7
  - @toptal/picasso-notification@1.0.7
  - @toptal/picasso-outlined-input@1.0.7
  - @toptal/picasso-pagination@1.0.7
  - @toptal/picasso-password-input@1.0.7
  - @toptal/picasso-prompt-modal@1.0.7
  - @toptal/picasso-section@1.0.7
  - @toptal/picasso-show-more@1.0.7
  - @toptal/picasso-skeleton-loader@1.0.7
  - @toptal/picasso-table@1.1.4
  - @toptal/picasso-tree-view@1.0.7
  - @toptal/picasso-date-picker@1.0.7
  - @toptal/picasso-dropzone@1.0.8
  - @toptal/picasso-autocomplete@1.0.8
  - @toptal/picasso-avatar-upload@1.0.7
  - @toptal/picasso-input@1.0.7
  - @toptal/picasso-number-input@1.0.7
  - @toptal/picasso-select@1.0.8
  - @toptal/picasso-tagselector@1.0.8
  - @toptal/picasso-timepicker@1.0.7
  - @toptal/picasso-date-select@1.0.8

## 44.0.10

### Patch Changes

- Updated dependencies [[`c05387d`](https://github.com/toptal/picasso/commit/c05387de5636ed094365d1eff67b955d84b81c61)]:
  - @toptal/picasso-application-update-notification@1.0.6
  - @toptal/picasso-overview-block@1.0.4
  - @toptal/picasso-notification@1.0.6
  - @toptal/picasso-breadcrumbs@1.0.4
  - @toptal/picasso-tagselector@1.0.7
  - @toptal/picasso-accordion@1.0.6
  - @toptal/picasso-helpbox@1.0.6
  - @toptal/picasso-avatar@1.0.4
  - @toptal/picasso-button@1.0.6
  - @toptal/picasso-alert@1.0.6
  - @toptal/picasso-modal@1.0.6
  - @toptal/picasso-radio@1.0.5
  - @toptal/picasso-table@1.1.3
  - @toptal/picasso-form@1.1.3
  - @toptal/picasso-grid@1.0.4
  - @toptal/picasso-menu@1.0.6
  - @toptal/picasso-note@1.0.4
  - @toptal/picasso-page@1.0.9
  - @toptal/picasso-step@1.0.5
  - @toptal/picasso-tabs@1.0.5
  - @toptal/picasso-tag@1.0.4
  - @toptal/picasso-avatar-upload@1.0.6
  - @toptal/picasso-user-badge@1.0.4
  - @toptal/picasso-calendar@1.0.6
  - @toptal/picasso-carousel@1.0.7
  - @toptal/picasso-drawer@1.0.6
  - @toptal/picasso-file-input@1.0.7
  - @toptal/picasso-outlined-input@1.0.6
  - @toptal/picasso-pagination@1.0.6
  - @toptal/picasso-password-input@1.0.6
  - @toptal/picasso-prompt-modal@1.0.6
  - @toptal/picasso-section@1.0.6
  - @toptal/picasso-show-more@1.0.6
  - @toptal/picasso-skeleton-loader@1.0.6
  - @toptal/picasso-tree-view@1.0.6
  - @toptal/picasso-autocomplete@1.0.7
  - @toptal/picasso-checkbox@1.0.5
  - @toptal/picasso-dropzone@1.0.7
  - @toptal/picasso-input@1.0.6
  - @toptal/picasso-number-input@1.0.6
  - @toptal/picasso-select@1.0.7
  - @toptal/picasso-switch@1.0.5
  - @toptal/picasso-account-select@1.0.6
  - @toptal/picasso-date-picker@1.0.6
  - @toptal/picasso-timepicker@1.0.6
  - @toptal/picasso-date-select@1.0.7

## 44.0.9

### Patch Changes

- Updated dependencies [[`1a9c1c0`](https://github.com/toptal/picasso/commit/1a9c1c0c7feaf1937b756bdf5bf348047f229f66)]:
  - @toptal/picasso-table@1.1.2

## 44.0.8

### Patch Changes

- Updated dependencies [[`3512588`](https://github.com/toptal/picasso/commit/3512588b06c3660471a68500275321c640278cf0)]:
  - @toptal/picasso-application-update-notification@1.0.5
  - @toptal/picasso-overview-block@1.0.3
  - @toptal/picasso-notification@1.0.5
  - @toptal/picasso-breadcrumbs@1.0.3
  - @toptal/picasso-tagselector@1.0.6
  - @toptal/picasso-accordion@1.0.5
  - @toptal/picasso-helpbox@1.0.5
  - @toptal/picasso-avatar@1.0.3
  - @toptal/picasso-button@1.0.5
  - @toptal/picasso-alert@1.0.5
  - @toptal/picasso-modal@1.0.5
  - @toptal/picasso-radio@1.0.4
  - @toptal/picasso-table@1.1.1
  - @toptal/picasso-form@1.1.2
  - @toptal/picasso-grid@1.0.3
  - @toptal/picasso-menu@1.0.5
  - @toptal/picasso-note@1.0.3
  - @toptal/picasso-page@1.0.8
  - @toptal/picasso-step@1.0.4
  - @toptal/picasso-tabs@1.0.4
  - @toptal/picasso-tag@1.0.3
  - @toptal/picasso-avatar-upload@1.0.5
  - @toptal/picasso-user-badge@1.0.3
  - @toptal/picasso-calendar@1.0.5
  - @toptal/picasso-carousel@1.0.6
  - @toptal/picasso-drawer@1.0.5
  - @toptal/picasso-file-input@1.0.6
  - @toptal/picasso-outlined-input@1.0.5
  - @toptal/picasso-pagination@1.0.5
  - @toptal/picasso-password-input@1.0.5
  - @toptal/picasso-prompt-modal@1.0.5
  - @toptal/picasso-section@1.0.5
  - @toptal/picasso-show-more@1.0.5
  - @toptal/picasso-skeleton-loader@1.0.5
  - @toptal/picasso-tree-view@1.0.5
  - @toptal/picasso-autocomplete@1.0.6
  - @toptal/picasso-checkbox@1.0.4
  - @toptal/picasso-dropzone@1.0.6
  - @toptal/picasso-input@1.0.5
  - @toptal/picasso-number-input@1.0.5
  - @toptal/picasso-select@1.0.6
  - @toptal/picasso-switch@1.0.4
  - @toptal/picasso-account-select@1.0.5
  - @toptal/picasso-date-picker@1.0.5
  - @toptal/picasso-timepicker@1.0.5
  - @toptal/picasso-date-select@1.0.6

## 44.0.7

### Patch Changes

- Updated dependencies [[`977da66`](https://github.com/toptal/picasso/commit/977da669eaa4ee5aefbe2acda773e3621e5981c4)]:
  - @toptal/picasso-tooltip@1.1.0
  - @toptal/picasso-file-input@1.0.5
  - @toptal/picasso-page@1.0.7
  - @toptal/picasso-slider@1.0.3
  - @toptal/picasso-typography-overflow@1.0.3
  - @toptal/picasso-dropzone@1.0.5
  - @toptal/picasso-step@1.0.3
  - @toptal/picasso-tabs@1.0.3

## 44.0.6

### Patch Changes

- Updated dependencies [[`ae69e0e`](https://github.com/toptal/picasso/commit/ae69e0e985c48542e7cc1df401d82ca91aa474ad), [`ae69e0e`](https://github.com/toptal/picasso/commit/ae69e0e985c48542e7cc1df401d82ca91aa474ad), [`ae69e0e`](https://github.com/toptal/picasso/commit/ae69e0e985c48542e7cc1df401d82ca91aa474ad)]:
  - @toptal/picasso-test-utils@1.1.0
  - @toptal/picasso-page@1.0.6
  - @toptal/picasso-carousel@1.0.5

## 44.0.5

### Patch Changes

- Updated dependencies [[`77481cdea0de49a2a296831b38fb6e368d4a6b2f`](https://github.com/toptal/picasso/commit/77481cdea0de49a2a296831b38fb6e368d4a6b2f)]:
  - @toptal/picasso-table@1.1.0

## 44.0.4

### Patch Changes

- Updated dependencies [[`3f72c27390e390d2b545448677adaefe9f4a486b`](https://github.com/toptal/picasso/commit/3f72c27390e390d2b545448677adaefe9f4a486b)]:
  - @toptal/picasso-empty-state@1.0.3

## 44.0.3

### Patch Changes

- Updated dependencies [[`a1d523092cc4de6cb376156435b99b1e483f39b9`](https://github.com/toptal/picasso/commit/a1d523092cc4de6cb376156435b99b1e483f39b9)]:
  - @toptal/picasso-shared@14.0.1
  - @toptal/picasso-autocomplete@1.0.5
  - @toptal/picasso-avatar@1.0.2
  - @toptal/picasso-avatar-upload@1.0.4
  - @toptal/picasso-badge@1.0.2
  - @toptal/picasso-breadcrumbs@1.0.2
  - @toptal/picasso-button@1.0.4
  - @toptal/picasso-calendar@1.0.4
  - @toptal/picasso-carousel@1.0.4
  - @toptal/picasso-checkbox@1.0.3
  - @toptal/picasso-environment-banner@1.0.2
  - @toptal/picasso-file-input@1.0.4
  - @toptal/picasso-form@1.1.1
  - @toptal/picasso-input@1.0.4
  - @toptal/picasso-input-adornment@1.0.2
  - @toptal/picasso-list@1.0.2
  - @toptal/picasso-menu@1.0.4
  - @toptal/picasso-notification@1.0.4
  - @toptal/picasso-number-input@1.0.4
  - @toptal/picasso-outlined-input@1.0.4
  - @toptal/picasso-overview-block@1.0.2
  - @toptal/picasso-page@1.0.5
  - @toptal/picasso-popper@1.0.2
  - @toptal/picasso-radio@1.0.3
  - @toptal/picasso-select@1.0.5
  - @toptal/picasso-skeleton-loader@1.0.4
  - @toptal/picasso-slider@1.0.2
  - @toptal/picasso-step@1.0.2
  - @toptal/picasso-switch@1.0.3
  - @toptal/picasso-table@1.0.2
  - @toptal/picasso-tabs@1.0.2
  - @toptal/picasso-tag@1.0.2
  - @toptal/picasso-tagselector@1.0.5
  - @toptal/picasso-test-utils@1.0.2
  - @toptal/picasso-timeline@1.0.2
  - @toptal/picasso-tooltip@1.0.2
  - @toptal/picasso-utils@1.0.2
  - @toptal/picasso-user-badge@1.0.2
  - @toptal/picasso-accordion@1.0.4
  - @toptal/picasso-alert@1.0.4
  - @toptal/picasso-application-update-notification@1.0.4
  - @toptal/picasso-drawer@1.0.4
  - @toptal/picasso-helpbox@1.0.4
  - @toptal/picasso-modal@1.0.4
  - @toptal/picasso-pagination@1.0.4
  - @toptal/picasso-password-input@1.0.4
  - @toptal/picasso-prompt-modal@1.0.4
  - @toptal/picasso-section@1.0.4
  - @toptal/picasso-show-more@1.0.4
  - @toptal/picasso-tree-view@1.0.4
  - @toptal/picasso-date-picker@1.0.4
  - @toptal/picasso-dropzone@1.0.4
  - @toptal/picasso-timepicker@1.0.4
  - @toptal/picasso-account-select@1.0.4
  - @toptal/picasso-dropdown@1.0.3
  - @toptal/picasso-date-select@1.0.5
  - @toptal/picasso-amount@1.0.2
  - @toptal/picasso-container@1.0.2
  - @toptal/picasso-grid@1.0.2
  - @toptal/picasso-link@1.0.2
  - @toptal/picasso-note@1.0.2
  - @toptal/picasso-paper@2.0.1
  - @toptal/picasso-quote@1.0.2
  - @toptal/picasso-rating@1.0.2
  - @toptal/picasso-typography@1.0.2
  - @toptal/picasso-typography-overflow@1.0.2
  - @toptal/picasso-icons@1.0.2
  - @toptal/picasso-image@1.0.2
  - @toptal/picasso-loader@1.0.2
  - @toptal/picasso-logo@1.0.2
  - @toptal/picasso-empty-state@1.0.2

## 44.0.2

### Patch Changes

- Updated dependencies [[`d22bf5d913428b586e2813cf530f4e96d46b622e`](https://github.com/toptal/picasso/commit/d22bf5d913428b586e2813cf530f4e96d46b622e), [`d22bf5d913428b586e2813cf530f4e96d46b622e`](https://github.com/toptal/picasso/commit/d22bf5d913428b586e2813cf530f4e96d46b622e), [`d22bf5d913428b586e2813cf530f4e96d46b622e`](https://github.com/toptal/picasso/commit/d22bf5d913428b586e2813cf530f4e96d46b622e), [`d22bf5d913428b586e2813cf530f4e96d46b622e`](https://github.com/toptal/picasso/commit/d22bf5d913428b586e2813cf530f4e96d46b622e)]:
  - @toptal/picasso-modal@1.0.3
  - @toptal/picasso-dropdown@1.0.2
  - @toptal/picasso-paper@2.0.0
  - @toptal/picasso-menu@1.0.3
  - @toptal/picasso-prompt-modal@1.0.3
  - @toptal/picasso-button@1.0.3
  - @toptal/picasso-page@1.0.4
  - @toptal/picasso-account-select@1.0.3
  - @toptal/picasso-autocomplete@1.0.4
  - @toptal/picasso-select@1.0.4
  - @toptal/picasso-accordion@1.0.3
  - @toptal/picasso-alert@1.0.3
  - @toptal/picasso-application-update-notification@1.0.3
  - @toptal/picasso-calendar@1.0.3
  - @toptal/picasso-carousel@1.0.3
  - @toptal/picasso-drawer@1.0.3
  - @toptal/picasso-file-input@1.0.3
  - @toptal/picasso-helpbox@1.0.3
  - @toptal/picasso-notification@1.0.3
  - @toptal/picasso-outlined-input@1.0.3
  - @toptal/picasso-pagination@1.0.3
  - @toptal/picasso-password-input@1.0.3
  - @toptal/picasso-section@1.0.3
  - @toptal/picasso-show-more@1.0.3
  - @toptal/picasso-skeleton-loader@1.0.3
  - @toptal/picasso-tree-view@1.0.3
  - @toptal/picasso-tagselector@1.0.4
  - @toptal/picasso-date-select@1.0.4
  - @toptal/picasso-date-picker@1.0.3
  - @toptal/picasso-dropzone@1.0.3
  - @toptal/picasso-avatar-upload@1.0.3
  - @toptal/picasso-input@1.0.3
  - @toptal/picasso-number-input@1.0.3
  - @toptal/picasso-timepicker@1.0.3

## 44.0.1

### Patch Changes

- Updated dependencies [[`372e152aadc737cfacdf7f35110bc1ce2f35a90f`](https://github.com/toptal/picasso/commit/372e152aadc737cfacdf7f35110bc1ce2f35a90f)]:
  - @toptal/picasso-menu@1.0.2
  - @toptal/picasso-account-select@1.0.2
  - @toptal/picasso-autocomplete@1.0.3
  - @toptal/picasso-page@1.0.3
  - @toptal/picasso-select@1.0.3
  - @toptal/picasso-tagselector@1.0.3
  - @toptal/picasso-date-select@1.0.3

## 44.0.0

### Major Changes

- [#4183](https://github.com/toptal/picasso/pull/4183) [`cb9586eefcd4bad2a594d4cf9ddbbc2a65e1b334`](https://github.com/toptal/picasso/commit/cb9586eefcd4bad2a594d4cf9ddbbc2a65e1b334) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- add TailwindCSS as a peer dependency
  - users of Picasso are expected to have TailwindCSS setup in their project
  - [adoption guide](https://toptal-core.atlassian.net/wiki/spaces/FE/pages/3558866965/Adopting+Tailwind+CSS+in+current+project)

## 43.2.0

### Minor Changes

- [#4179](https://github.com/toptal/picasso/pull/4179) [`18b529d89edb26e0bdf43458326012ab3072ee8f`](https://github.com/toptal/picasso/commit/18b529d89edb26e0bdf43458326012ab3072ee8f) Thanks [@yvniTop](https://github.com/yvniTop)!

### FormField

- export `FormField` independently

## 43.1.0

### Minor Changes

- [#4161](https://github.com/toptal/picasso/pull/4161) [`8142d393588c8c3cf5193b4273957646258883e2`](https://github.com/toptal/picasso/commit/8142d393588c8c3cf5193b4273957646258883e2) Thanks [@pudek357](https://github.com/pudek357)!
- introduce `labelEndAdornment` prop for `FormLabel` component.

### Patch Changes

- Updated dependencies [[`8142d393588c8c3cf5193b4273957646258883e2`](https://github.com/toptal/picasso/commit/8142d393588c8c3cf5193b4273957646258883e2)]:
  - @toptal/picasso-form@1.1.0
  - @toptal/picasso-autocomplete@1.0.2
  - @toptal/picasso-checkbox@1.0.2
  - @toptal/picasso-dropzone@1.0.2
  - @toptal/picasso-file-input@1.0.2
  - @toptal/picasso-input@1.0.2
  - @toptal/picasso-number-input@1.0.2
  - @toptal/picasso-radio@1.0.2
  - @toptal/picasso-select@1.0.2
  - @toptal/picasso-switch@1.0.2
  - @toptal/picasso-tagselector@1.0.2
  - @toptal/picasso-page@1.0.2
  - @toptal/picasso-button@1.0.2
  - @toptal/picasso-date-picker@1.0.2
  - @toptal/picasso-password-input@1.0.2
  - @toptal/picasso-timepicker@1.0.2
  - @toptal/picasso-date-select@1.0.2
  - @toptal/picasso-accordion@1.0.2
  - @toptal/picasso-alert@1.0.2
  - @toptal/picasso-application-update-notification@1.0.2
  - @toptal/picasso-calendar@1.0.2
  - @toptal/picasso-carousel@1.0.2
  - @toptal/picasso-drawer@1.0.2
  - @toptal/picasso-helpbox@1.0.2
  - @toptal/picasso-modal@1.0.2
  - @toptal/picasso-notification@1.0.2
  - @toptal/picasso-outlined-input@1.0.2
  - @toptal/picasso-pagination@1.0.2
  - @toptal/picasso-prompt-modal@1.0.2
  - @toptal/picasso-section@1.0.2
  - @toptal/picasso-show-more@1.0.2
  - @toptal/picasso-skeleton-loader@1.0.2
  - @toptal/picasso-tree-view@1.0.2
  - @toptal/picasso-avatar-upload@1.0.2

## 43.0.0

### Major Changes

- [#4164](https://github.com/toptal/picasso/pull/4164) [`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30) Thanks [@mkrl](https://github.com/mkrl)!
- migrate to Picasso by Parts
  - picasso is now distributed as a set of independent packages with the main package `@toptal/picasso` now being a collection of re-exported packages

### Patch Changes

- Updated dependencies [[`84d579cee65c88aeb6ba58318c43d8deb5201b30`](https://github.com/toptal/picasso/commit/84d579cee65c88aeb6ba58318c43d8deb5201b30)]:
  - @toptal/picasso-shared@14.0.0
  - @toptal/picasso-application-update-notification@1.0.1
  - @toptal/picasso-typography-overflow@1.0.1
  - @toptal/picasso-environment-banner@1.0.1
  - @toptal/picasso-input-adornment@1.0.1
  - @toptal/picasso-skeleton-loader@1.0.1
  - @toptal/picasso-account-select@1.0.1
  - @toptal/picasso-outlined-input@1.0.1
  - @toptal/picasso-overview-block@1.0.1
  - @toptal/picasso-password-input@1.0.1
  - @toptal/picasso-autocomplete@1.0.1
  - @toptal/picasso-avatar-upload@1.0.1
  - @toptal/picasso-notification@1.0.1
  - @toptal/picasso-breadcrumbs@1.0.1
  - @toptal/picasso-number-input@1.0.1
  - @toptal/picasso-prompt-modal@1.0.1
  - @toptal/picasso-tagselector@1.0.1
  - @toptal/picasso-date-picker@1.0.1
  - @toptal/picasso-date-select@1.0.1
  - @toptal/picasso-empty-state@1.0.1
  - @toptal/picasso-pagination@1.0.1
  - @toptal/picasso-test-utils@1.0.1
  - @toptal/picasso-timepicker@1.0.1
  - @toptal/picasso-typography@1.0.1
  - @toptal/picasso-accordion@1.0.1
  - @toptal/picasso-container@1.0.1
  - @toptal/picasso-file-input@1.0.1
  - @toptal/picasso-user-badge@1.0.1
  - @toptal/picasso-calendar@1.0.1
  - @toptal/picasso-carousel@1.0.1
  - @toptal/picasso-checkbox@1.0.1
  - @toptal/picasso-dropdown@1.0.1
  - @toptal/picasso-dropzone@1.0.1
  - @toptal/picasso-show-more@1.0.1
  - @toptal/picasso-timeline@1.0.1
  - @toptal/picasso-tree-view@1.0.1
  - @toptal/picasso-helpbox@1.0.1
  - @toptal/picasso-section@1.0.1
  - @toptal/picasso-tooltip@1.0.1
  - @toptal/picasso-amount@1.0.1
  - @toptal/picasso-avatar@1.0.1
  - @toptal/picasso-button@1.0.1
  - @toptal/picasso-drawer@1.0.1
  - @toptal/picasso-loader@1.0.1
  - @toptal/picasso-popper@1.0.1
  - @toptal/picasso-rating@1.0.1
  - @toptal/picasso-select@1.0.1
  - @toptal/picasso-slider@1.0.1
  - @toptal/picasso-switch@1.0.1
  - @toptal/picasso-alert@1.0.1
  - @toptal/picasso-badge@1.0.1
  - @toptal/picasso-icons@1.0.1
  - @toptal/picasso-image@1.0.1
  - @toptal/picasso-input@1.0.1
  - @toptal/picasso-modal@1.0.1
  - @toptal/picasso-paper@1.0.1
  - @toptal/picasso-quote@1.0.1
  - @toptal/picasso-radio@1.0.1
  - @toptal/picasso-table@1.0.1
  - @toptal/picasso-utils@1.0.1
  - @toptal/picasso-form@1.0.1
  - @toptal/picasso-grid@1.0.1
  - @toptal/picasso-link@1.0.1
  - @toptal/picasso-list@1.0.1
  - @toptal/picasso-logo@1.0.1
  - @toptal/picasso-menu@1.0.1
  - @toptal/picasso-note@1.0.1
  - @toptal/picasso-page@1.0.1
  - @toptal/picasso-step@1.0.1
  - @toptal/picasso-tabs@1.0.1
  - @toptal/picasso-tag@1.0.1

## 42.7.3

### Patch Changes

- [#4158](https://github.com/toptal/picasso/pull/4158) [`3e5486c0e4024d5c2f8ed73ac96eedf323778ed5`](https://github.com/toptal/picasso/commit/3e5486c0e4024d5c2f8ed73ac96eedf323778ed5) Thanks [@isabellymonteiro](https://github.com/isabellymonteiro)!

### TimePicker Icon

- fix `TimePicker` duplicate clock icons

## 42.7.2

### Patch Changes

- [#4132](https://github.com/toptal/picasso/pull/4132) [`c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149`](https://github.com/toptal/picasso/commit/c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149) Thanks [@dependabot](https://github.com/apps/dependabot)!
- bump classnames dependency

- Updated dependencies [[`c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149`](https://github.com/toptal/picasso/commit/c76a0d6d0f68e50bb51927d0b6c3ebdd65c60149)]:
  - @toptal/picasso-shared@13.1.4

## 42.7.1

### Patch Changes

- [#4151](https://github.com/toptal/picasso/pull/4151) [`67d14345bc1b9a02b5631275ad2bfe21b5284329`](https://github.com/toptal/picasso/commit/67d14345bc1b9a02b5631275ad2bfe21b5284329) Thanks [@doug2k1](https://github.com/doug2k1)!

### PasswordInput

- fix `size` prop not having effect on component size

## 42.7.0

### Minor Changes

- [#4145](https://github.com/toptal/picasso/pull/4145) [`9b1ec5be553cfce1c78424649d00f4bb9704b7e3`](https://github.com/toptal/picasso/commit/9b1ec5be553cfce1c78424649d00f4bb9704b7e3) Thanks [@sofiaternovskaya](https://github.com/sofiaternovskaya)!

### Icon

- add `Quote16` and `Quote24` icons

## 42.6.0

### Minor Changes

- [#4141](https://github.com/toptal/picasso/pull/4141) [`841d06000dbf7937687e817806b725bb691f1b97`](https://github.com/toptal/picasso/commit/841d06000dbf7937687e817806b725bb691f1b97) Thanks [@pudek357](https://github.com/pudek357)!

### Forms

- the labels for fields with heights up to 48px are center-aligned with their respective inputs.
- for larger fields, such as text areas and avatars, which are significantly taller, the labels are aligned to the top of the field.

## 42.5.0

### Minor Changes

- [#4126](https://github.com/toptal/picasso/pull/4126) [`02d69ac79e7dc02bbde3c6a2808793befe67f89c`](https://github.com/toptal/picasso/commit/02d69ac79e7dc02bbde3c6a2808793befe67f89c) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

### Forms

- enhanced customization in horizontal Form layout: Introducing the `labelWidth` prop for adjusting the width of label columns in horizontal layout forms.

The new `labelWidth` property in the `Form` component significantly increases the flexibility of form design, allowing for more responsive and visually balanced layouts. This property can be set with either a single numeric value (e.g., `2`, `3`, or `4`) for a uniform width across all screen sizes, or an object mapping specific widths to breakpoints (e.g., `{ md: 4, lg: 3, xl: 2 }`).

Example Usage:
Uniform width setting: `<Form layout="horizontal" labelWidth={3}>...</Form>`
Responsive width setting: `<Form layout="horizontal" labelWidth={{ md: 4, lg: 3, xl: 2 }}>...</Form>`

- [#4126](https://github.com/toptal/picasso/pull/4126) [`02d69ac79e7dc02bbde3c6a2808793befe67f89c`](https://github.com/toptal/picasso/commit/02d69ac79e7dc02bbde3c6a2808793befe67f89c) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Form

- add customizable label width for horizontal forms

## 42.4.0

### Minor Changes

- [#4101](https://github.com/toptal/picasso/pull/4101) [`93132438bf0daef30683f1d75aba01e3a1e2fa30`](https://github.com/toptal/picasso/commit/93132438bf0daef30683f1d75aba01e3a1e2fa30) Thanks [@toptalwadiibasmi](https://github.com/toptalwadiibasmi)!
- select input no longer closes after searched option is selected (when select works in multiple values mode)
  - select input no longer resets the search input when an option is selected (when select works in multiple values mode)

## 42.3.6

### Patch Changes

- [#4090](https://github.com/toptal/picasso/pull/4090) [`b024f26f52a48ab0d3629c0fdeabe00d019d19c6`](https://github.com/toptal/picasso/commit/b024f26f52a48ab0d3629c0fdeabe00d019d19c6) Thanks [@sashuk](https://github.com/sashuk)!
- revert `debounce` update

## 42.3.5

### Patch Changes

- [#4100](https://github.com/toptal/picasso/pull/4100) [`b84a9383257b6b860de912c22d1bff8f740c7c16`](https://github.com/toptal/picasso/commit/b84a9383257b6b860de912c22d1bff8f740c7c16) Thanks [@sashuk](https://github.com/sashuk)!
- remove injectFirst and styles import from TestingPicasso

## 42.3.4

### Patch Changes

- [#4083](https://github.com/toptal/picasso/pull/4083) [`147fd703c1b9e70d2446bfb5f41dfaeb16a57381`](https://github.com/toptal/picasso/commit/147fd703c1b9e70d2446bfb5f41dfaeb16a57381) Thanks [@sashuk](https://github.com/sashuk)!
- bump `notistack` version

- Updated dependencies [[`147fd703c1b9e70d2446bfb5f41dfaeb16a57381`](https://github.com/toptal/picasso/commit/147fd703c1b9e70d2446bfb5f41dfaeb16a57381)]:
  - @toptal/picasso-shared@13.1.3

## 42.3.3

### Patch Changes

- [#4089](https://github.com/toptal/picasso/pull/4089) [`9b60dd2681821a23eb6dd2d24c67c0c0d961b601`](https://github.com/toptal/picasso/commit/9b60dd2681821a23eb6dd2d24c67c0c0d961b601) Thanks [@sashuk](https://github.com/sashuk)!
- do not pass `enableResetSearch` property further

## 42.3.2

### Patch Changes

- [#4082](https://github.com/toptal/picasso/pull/4082) [`58ca9e1fb82c0969b1f00d92742ebdbe3f524b50`](https://github.com/toptal/picasso/commit/58ca9e1fb82c0969b1f00d92742ebdbe3f524b50) Thanks [@dependabot](https://github.com/apps/dependabot)!
- bump `react-day-picker` version

## 42.3.1

### Patch Changes

- [#4079](https://github.com/toptal/picasso/pull/4079) [`96e439aaf6b621ca72937beaefb74a97ce710554`](https://github.com/toptal/picasso/commit/96e439aaf6b621ca72937beaefb74a97ce710554) Thanks [@dependabot](https://github.com/apps/dependabot)!
- bump debounce to v2

## 42.3.0

### Minor Changes

- [#4075](https://github.com/toptal/picasso/pull/4075) [`2d0c9d45eb9596838b3805aa2e7f25dd109ca455`](https://github.com/toptal/picasso/commit/2d0c9d45eb9596838b3805aa2e7f25dd109ca455) Thanks [@angelinastavniiciuc](https://github.com/angelinastavniiciuc)!
- add `enableResetSearch` prop to `Select` component to render reset icon which clears search input

## 42.2.4

### Patch Changes

- [#4067](https://github.com/toptal/picasso/pull/4067) [`60d622ed4`](https://github.com/toptal/picasso/commit/60d622ed47c1c908304464877cfd474bf84863f2) Thanks [@iatanas0v](https://github.com/iatanas0v)!

### picasso-shared types

- fixed `data-private` type to allow `lipsum` value as well
- Updated dependencies [[`60d622ed4`](https://github.com/toptal/picasso/commit/60d622ed47c1c908304464877cfd474bf84863f2)]:
  - @toptal/picasso-shared@13.1.2

## 42.2.3

### Patch Changes

- [#4064](https://github.com/toptal/picasso/pull/4064) [`7f3c15998`](https://github.com/toptal/picasso/commit/7f3c159988913752c5f410552fa077156218e7a3) Thanks [@OleksandrNechai](https://github.com/OleksandrNechai)!

### Pagination

- add aria-current to buttons

## 42.2.2

### Patch Changes

- [#4058](https://github.com/toptal/picasso/pull/4058) [`cdd77e055`](https://github.com/toptal/picasso/commit/cdd77e055784258b2a189b6957dd0375c570d967) Thanks [@mkrl](https://github.com/mkrl)!

### picasso-shared types

- fixed `data-private` type to be mistakenly `string` instead of `boolean`
- Updated dependencies [[`cdd77e055`](https://github.com/toptal/picasso/commit/cdd77e055784258b2a189b6957dd0375c570d967)]:
  - @toptal/picasso-shared@13.1.1

## 42.2.1

### Patch Changes

- [#4056](https://github.com/toptal/picasso/pull/4056) [`d70202b0d`](https://github.com/toptal/picasso/commit/d70202b0d9ad9ab379712009b0882ff30f2473d6) Thanks [@mkrl](https://github.com/mkrl)!

### Radio, Checkbox, Tooltip, Avatar, Page.TopBarMenu

- pass `data-private` to relevant DOM elements
- Updated dependencies [[`d70202b0d`](https://github.com/toptal/picasso/commit/d70202b0d9ad9ab379712009b0882ff30f2473d6)]:
  - @toptal/picasso-shared@13.1.0

## 42.2.0

### Minor Changes

- [#4045](https://github.com/toptal/picasso/pull/4045) [`2eec5f0a4`](https://github.com/toptal/picasso/commit/2eec5f0a43301eed82733992320f923355cc4344) Thanks [@sashuk](https://github.com/sashuk)!
- add `FormActionsContainer` component that renders form actions according to BASE design

## 42.1.1

### Patch Changes

- [#4044](https://github.com/toptal/picasso/pull/4044) [`b107dc216`](https://github.com/toptal/picasso/commit/b107dc21677d779804befd4221dfc456b79eb419) Thanks [@sashuk](https://github.com/sashuk)!
- align form labels to the top of container

## 42.1.0

### Minor Changes

- [#4033](https://github.com/toptal/picasso/pull/4033) [`090c79414`](https://github.com/toptal/picasso/commit/090c79414505c1bac46078a587b7099012b8f6ea) Thanks [@sashuk](https://github.com/sashuk)!
- export `useFieldsLayoutContext()` hook

## 42.0.0

### Major Changes

- [#4031](https://github.com/toptal/picasso/pull/4031) [`a450d3a56`](https://github.com/toptal/picasso/commit/a450d3a56526b4418b72788ae80d4c7b6927f722) Thanks [@sashuk](https://github.com/sashuk)!

### TimePicker

- change the signature of `onChange` handler to accept `string` instead of event object. In order to migrate, please replace usage of `event.target.value` with `value` in your `onChange` handler
- do not emit incorrect time values, e.g. `12:--` or `60:00`. When input has incorrect value, the `onChange` handler will be called with empty string value

## 41.4.2

### Patch Changes

- [#4029](https://github.com/toptal/picasso/pull/4029) [`a7e202a56`](https://github.com/toptal/picasso/commit/a7e202a566f097a186af09bc530cc8160dc06486) Thanks [@mkrl](https://github.com/mkrl)!

### Notification

- fix banner-type `Notification` padding for responbsible screen sizes

## 41.4.1

### Patch Changes

- [#4028](https://github.com/toptal/picasso/pull/4028) [`a177c79e1`](https://github.com/toptal/picasso/commit/a177c79e14cd9e85c90c17c058ce59e851b522ba) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Select

- restore option for `large` size

## 41.4.0

### Minor Changes

- [#4025](https://github.com/toptal/picasso/pull/4025) [`1709730ec`](https://github.com/toptal/picasso/commit/1709730ecf4fb7369b778e23ac909aa7d2459d78) Thanks [@mkrl](https://github.com/mkrl)!

### Alert

- add support for split buttons to `Alert` actions

## 41.3.0

### Minor Changes

- [#4016](https://github.com/toptal/picasso/pull/4016) [`0591c1312`](https://github.com/toptal/picasso/commit/0591c1312a3fb05e733244815fdbe9682f07c203) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### TagSelector

- add a possibility to show an error status on tags

## 41.2.0

### Minor Changes

- [#3990](https://github.com/toptal/picasso/pull/3990) [`4a4497354`](https://github.com/toptal/picasso/commit/4a4497354c6e64f2b3c53fd6583e41d8b9225f4d) Thanks [@mkrl](https://github.com/mkrl)!

### Alert

- add `actions` prop that allows passing `primary` and `secondary` action buttons

### Patch Changes

- [#4002](https://github.com/toptal/picasso/pull/4002) [`6233bd14b`](https://github.com/toptal/picasso/commit/6233bd14bbb1de3fcf76501ecd07dd9dfecd4ad0) Thanks [@mkrl](https://github.com/mkrl)!

### Tag, Tag.Rectangular

- remove unwanted transitions for background-color and box-shadow

## 41.1.0

### Minor Changes

- [#3966](https://github.com/toptal/picasso/pull/3966) [`386c7f484`](https://github.com/toptal/picasso/commit/386c7f484204cb416bb35fbffe990991165a5c8d) Thanks [@Gtosta96-Toptal](https://github.com/Gtosta96-Toptal)!

### Stepper

- implement custom stepper content

## 41.0.5

### Patch Changes

- [#3962](https://github.com/toptal/picasso/pull/3962) [`043a09483`](https://github.com/toptal/picasso/commit/043a09483d994a4db714a7121dd84f29c6d36429) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Modal

- remove MUI container scroll lock as we already use body scroll lock when open

## 41.0.4

### Patch Changes

- [#3951](https://github.com/toptal/picasso/pull/3951) [`dec04b5d8`](https://github.com/toptal/picasso/commit/dec04b5d866e845d6952e447b607f4b28a7c0503) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### DatePicker

- make datepickers work inside drawers

## 41.0.3

### Patch Changes

- [#3948](https://github.com/toptal/picasso/pull/3948) [`fdeaf1ba8`](https://github.com/toptal/picasso/commit/fdeaf1ba83b8506f96faeb9c8a3ff277f28bbd6e) Thanks [@mkrl](https://github.com/mkrl)!

### Section

- fixed invalid DOM nesting when non-string `subtitle` is provided

## 41.0.2

### Patch Changes

- [#3942](https://github.com/toptal/picasso/pull/3942) [`324c96b56`](https://github.com/toptal/picasso/commit/324c96b56890ac5d2492d9df7c3eab29e5f069f0) Thanks [@sashuk](https://github.com/sashuk)!
- make date picker calendar popup fit the screen on small screens

## 41.0.1

### Patch Changes

- [#3931](https://github.com/toptal/picasso/pull/3931) [`6dcdf306f`](https://github.com/toptal/picasso/commit/6dcdf306f0601ec685f9826f559e4975e11e5fae) Thanks [@sashuk](https://github.com/sashuk)!

### Timeline

- make Timeline follow table layout (cells from the same column have equal width)

## 41.0.0

### Major Changes

- [#3725](https://github.com/toptal/picasso/pull/3725) [`53ab6f695`](https://github.com/toptal/picasso/commit/53ab6f695432a819c4cde7660f10e6e67e0f4401) Thanks [@alexvcasillas](https://github.com/alexvcasillas)!

### ApplicationUpdateNotification

- update the component to meet the new BASE requirements
- the component now accepts actions as a prop in order to customize it further
- the component now can justify the actions with a simple prop
- the component now can be dismissed with a simple prop that calls the onClose prop
- the component now can have description prop as a ReactNode to further extend the customization

## 40.0.1

### Patch Changes

- [#3898](https://github.com/toptal/picasso/pull/3898) [`53ad2d8e3`](https://github.com/toptal/picasso/commit/53ad2d8e3458503240af9d8d8250c0ba01f74c0c) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### PageHamburger

- correctly shows and hides when `Sidebar` and `PageTopBar` `centerContent` are being used

## 40.0.0

### Major Changes

- [#3895](https://github.com/toptal/picasso/pull/3895) [`a9f5c85b6`](https://github.com/toptal/picasso/commit/a9f5c85b65b123826d4420acae4b3f897101e814) Thanks [@sashuk](https://github.com/sashuk)!

### Spacings

- add BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing to Picasso's theme and to `picasso-shared`

### Codemod

- add `spacing-values` codemod. Please run the codemod (`npx @toptal/picasso-codemod@latest v39.3.0`) to replace spacing property values of `Container` and `Dropdown` components with BASE-aligned property values according to the https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md. Property values that do not have BASE counterpart or are complex expressions have to be updated manually (non-BASE values have to be replaced with BASE ones after consulting with Design Team), codemod outputs the list of such cases for convenience. Run linter or prettier to align updated code with project code style.

- update peer dependencies for `@toptal/picasso` and `@toptal/picasso-shared`
- rename the codemod for spacings

### Patch Changes

- Updated dependencies [[`a9f5c85b6`](https://github.com/toptal/picasso/commit/a9f5c85b65b123826d4420acae4b3f897101e814)]:
  - @toptal/picasso-shared@13.0.0

## 39.3.0

### Minor Changes

- [#3890](https://github.com/toptal/picasso/pull/3890) [`17e25b470`](https://github.com/toptal/picasso/commit/17e25b47007948ee31781d35e94644137707c1c8) Thanks [@sashuk](https://github.com/sashuk)!

### Container

- add support for BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing in `top`, `right`, `bottom`, `left`, `padding`, and `gap` properties. Please use BASE spacings only when defining spacing properties for Container component. Non-BASE spacing is deprecated and will be removed

### Dropdown

- add support for BASE ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md)) and responsive ([RFC](https://github.com/toptal/picasso/blob/master/docs/decisions/19-responsive-component-spacing-properties.md)) spacing responsive spacing in `offset` property. Please use BASE spacings only when defining spacing properties for Dropdown component. Non-BASE spacing is deprecated and will be removed

### Patch Changes

- Updated dependencies [[`17e25b470`](https://github.com/toptal/picasso/commit/17e25b47007948ee31781d35e94644137707c1c8)]:
  - @toptal/picasso-shared@12.1.0

## 39.2.0

### Minor Changes

- [#3811](https://github.com/toptal/picasso/pull/3811) [`5a729ea53`](https://github.com/toptal/picasso/commit/5a729ea53d83939dae0696afe1db8b6fc315764d) Thanks [@sashuk](https://github.com/sashuk)!
- prevent page width change caused by vertical scrollbar (that appears depending on the page height). The behaviour can be disabled by setting `preventPageWidthChangeOnScrollbar` to `false` in Picasso provider.

## 39.1.0

### Minor Changes

- [#3873](https://github.com/toptal/picasso/pull/3873) [`f9eb9327a`](https://github.com/toptal/picasso/commit/f9eb9327ab651dc6aad913c43f09d1fb017052d7) Thanks [@diogolessa](https://github.com/diogolessa)!

### Icon

- add Employee16 and Employee24 icons

## 39.0.0

### Major Changes

- [#3866](https://github.com/toptal/picasso/pull/3866) [`1ab02d0d8`](https://github.com/toptal/picasso/commit/1ab02d0d84d4a9720f5faed6dfeb0195569e00f7) Thanks [@mkrl](https://github.com/mkrl)!

### Drawer

- modified Drawer component to lock the body scroll when opened (previously it was locking the scroll on Picasso root)
- prop `maintainBodyScrollLock` is now true by default

## 38.2.0

### Minor Changes

- [#3863](https://github.com/toptal/picasso/pull/3863) [`8d27c7475`](https://github.com/toptal/picasso/commit/8d27c7475cb096b325c1c8f972b4b3882e8bf619) Thanks [@alisanad007](https://github.com/alisanad007)!

### Icon

- update Twitter16 and Twitter24 icons

## 38.1.0

### Minor Changes

- [#3850](https://github.com/toptal/picasso/pull/3850) [`d333af698`](https://github.com/toptal/picasso/commit/d333af698f34a268f282326e87ec67320bb60843) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Icon

- add Home16 and Home24 icon

## 38.0.0

### Major Changes

- [#3838](https://github.com/toptal/picasso/pull/3838) [`9a02bbdb4`](https://github.com/toptal/picasso/commit/9a02bbdb4574cbdac26a2f6e9e4cf9de65609695) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Dependencies

- update picasso-provider

## 37.9.0

### Minor Changes

- [#3785](https://github.com/toptal/picasso/pull/3785) [`680ceb497`](https://github.com/toptal/picasso/commit/680ceb4970baa5a188b731ef9e0c32b8c3de816e) Thanks [@mkrl](https://github.com/mkrl)!

### ButtonCircular

- make `ButtonCircular` component responsive (opt-in). You can now provide a 24x24 px icon for `xl` screens. Button size for screens under `xl` has been increased.

## 37.8.0

### Minor Changes

- [#3823](https://github.com/toptal/picasso/pull/3823) [`b0e558eaa`](https://github.com/toptal/picasso/commit/b0e558eaa2373395c3c800959b4d9cb53b7865a5) Thanks [@mkrl](https://github.com/mkrl)!

### Icon

- added responsive icons (16px on xl screens, 24px otherwise)

## 37.7.0

### Minor Changes

- [#3812](https://github.com/toptal/picasso/pull/3812) [`3489d8826`](https://github.com/toptal/picasso/commit/3489d88265d330308194f572a4cfaa214fd72eb3) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### Form

- add horizontal layout to Forms

## 37.6.1

### Patch Changes

- [#3814](https://github.com/toptal/picasso/pull/3814) [`ba78d6f1a`](https://github.com/toptal/picasso/commit/ba78d6f1ad506687dd6b8c8b2d2653b8fcf72913) Thanks [@sashuk](https://github.com/sashuk)!

### Page

- fix background color for pages without sidebar

## 37.6.0

### Minor Changes

- [#3815](https://github.com/toptal/picasso/pull/3815) [`519c98f77`](https://github.com/toptal/picasso/commit/519c98f776c8791586ccc0c21fc7a200e9e6bfed) Thanks [@OleksandrNechai](https://github.com/OleksandrNechai)!

### Tag

- add light blue color
- align line hight of the text with BASE (can break visual tests, accept new snapshots to resolve)

## 37.5.0

### Minor Changes

- [#3786](https://github.com/toptal/picasso/pull/3786) [`769011c66`](https://github.com/toptal/picasso/commit/769011c661cd2c52c64d217d56d8d5e334bd20ad) Thanks [@sashuk](https://github.com/sashuk)!

### Modal

- add xsmall and xlarge Modal sizes

## 37.4.0

### Minor Changes

- [#3788](https://github.com/toptal/picasso/pull/3788) [`036717042`](https://github.com/toptal/picasso/commit/036717042cf28a60f6fc6a733cc6c051699bcc8b) Thanks [@sashuk](https://github.com/sashuk)!

### Icon

- add `ach24` and `creditCard24` icons

## 37.3.5

### Patch Changes

- [#3784](https://github.com/toptal/picasso/pull/3784) [`a41d75d34`](https://github.com/toptal/picasso/commit/a41d75d34c2e2680fd078ec373ea9d1a5ec3496c) Thanks [@sashuk](https://github.com/sashuk)!
- rename files according to guidelines

## 37.3.4

### Patch Changes

- [#3781](https://github.com/toptal/picasso/pull/3781) [`d430b427f`](https://github.com/toptal/picasso/commit/d430b427f73a6f5980d9b4fc0e0344a4109b0669) Thanks [@sashuk](https://github.com/sashuk)!
- align page background color with BASE design

## 37.3.3

### Patch Changes

- [#3756](https://github.com/toptal/picasso/pull/3756) [`6b65be13e`](https://github.com/toptal/picasso/commit/6b65be13e66b90a10c89971b67897668197dd88e) Thanks [@sashuk](https://github.com/sashuk)!

### Popper

- use compact layout on extra-small screens

## 37.3.2

### Patch Changes

- [#3762](https://github.com/toptal/picasso/pull/3762) [`612fb2753`](https://github.com/toptal/picasso/commit/612fb275319ff1d84d733de6b2d77fc6b6925dec) Thanks [@dmaklygin](https://github.com/dmaklygin)!

### Modal

- adjust full-screen state for Modal component

## 37.3.1

### Patch Changes

- [#3755](https://github.com/toptal/picasso/pull/3755) [`d26fd9591`](https://github.com/toptal/picasso/commit/d26fd9591b18034504d86d2c4b6536bbf5cd0efe) Thanks [@dmaklygin](https://github.com/dmaklygin)!

### Drawer

- use proper width for narrow Drawer in xs screens

## 37.3.0

### Minor Changes

- [#3746](https://github.com/toptal/picasso/pull/3746) [`48236bb28`](https://github.com/toptal/picasso/commit/48236bb28a8c7da8f3c7b6a58f47979376974333) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Icon

- add `CodeBlock16` and `CodeBlock24` icons

## 37.2.0

### Minor Changes

- [#3736](https://github.com/toptal/picasso/pull/3736) [`2f9735aaa`](https://github.com/toptal/picasso/commit/2f9735aaaf3197108523dbbc87412f02d4499f20) Thanks [@sashuk](https://github.com/sashuk)!

### PageHamburgerPortal

- disable portal for page menu dropdown

## 37.1.2

### Patch Changes

- [#3743](https://github.com/toptal/picasso/pull/3743) [`99d95c6c7`](https://github.com/toptal/picasso/commit/99d95c6c791f04297ea690e984794b92d7028195) Thanks [@sashuk](https://github.com/sashuk)!

### PageHamburger

- fix hamburger button and menu position

## 37.1.1

### Patch Changes

- [#3737](https://github.com/toptal/picasso/pull/3737) [`dbf87ffed`](https://github.com/toptal/picasso/commit/dbf87ffed2331e5db46b8ea74f47a4c95bbc3bfe) Thanks [@mkrl](https://github.com/mkrl)!

### DatePicker

- fix DatePicker visible input value not reacting to async external changes appropriately

## 37.1.0

### Minor Changes

- [#3708](https://github.com/toptal/picasso/pull/3708) [`f3b2622cd`](https://github.com/toptal/picasso/commit/f3b2622cd7f6ad8cdf53cec3b0dae1b9222558a0) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### utils

- add utility for forwarding a ref to multiple holders

## 37.0.1

### Patch Changes

- [#3684](https://github.com/toptal/picasso/pull/3684) [`3bddaf34b`](https://github.com/toptal/picasso/commit/3bddaf34b110de4fae22037e8566991019f6529a) Thanks [@dependabot](https://github.com/apps/dependabot)!
- dependencies update (`date-fns`)

## 37.0.0

### Major Changes

- [#3702](https://github.com/toptal/picasso/pull/3702) [`7fe284d96`](https://github.com/toptal/picasso/commit/7fe284d96dea180744f4f3eb6c274517b5a24153) Thanks [@sashuk](https://github.com/sashuk)!

### Icon

- the `Resouces24` icon was renamed to `Resources24`, please find and replace its occurences in the code
- newly added icons have to have both `16` and `24` pixels variants (according to BASE)

## 36.1.0

### Minor Changes

- [#3607](https://github.com/toptal/picasso/pull/3607) [`bb53892da`](https://github.com/toptal/picasso/commit/bb53892da329a8de9e300ffe53063b81971a4d17) Thanks [@dmaklygin](https://github.com/dmaklygin)!

### List

- add appropriate list item types for nested lists

## 36.0.0

### Major Changes

- [#3637](https://github.com/toptal/picasso/pull/3637) [`d4795a8a5`](https://github.com/toptal/picasso/commit/d4795a8a5fb9f36ae724c0cddf80822701e753cc) Thanks [@dmaklygin](https://github.com/dmaklygin)!

### RichTextEditor

- remove Rich Text Editor from picasso package. Now, this is a separate package: @toptal/picasso-rich-text-editor. Use `npx @toptal/picasso-codemod v36.0.0 --run-in-band` to adopt a new RichTextEditor to `@toptal/picasso` and `@toptal/picasso-forms`

## 35.3.0

### Minor Changes

- [#3650](https://github.com/toptal/picasso/pull/3650) [`7989e5fea`](https://github.com/toptal/picasso/commit/7989e5fea33f3b88540c55fa1d54238d61c4f014) Thanks [@mateusbzerra](https://github.com/mateusbzerra)!

### OverviewBlock

- it allows to use custom labels on `OverviewBlock`

## 35.2.3

### Patch Changes

- [#3652](https://github.com/toptal/picasso/pull/3652) [`6b3b4111c`](https://github.com/toptal/picasso/commit/6b3b4111c7836b2b8a3b435205a25ad75d120c4e) Thanks [@dmaklygin](https://github.com/dmaklygin)!

### RichTextEditor

- export utils for Typography

## 35.2.2

### Patch Changes

- [#3647](https://github.com/toptal/picasso/pull/3647) [`41ca9853e`](https://github.com/toptal/picasso/commit/41ca9853eca606e1dfd3309188f3aac73796d73a) Thanks [@sashuk](https://github.com/sashuk)!

### Calendar

- add legacy classname (`.calendar-month`) to ease migration

## 35.2.1

### Patch Changes

- [#3639](https://github.com/toptal/picasso/pull/3639) [`91a45a0a6`](https://github.com/toptal/picasso/commit/91a45a0a611b08aabf88c95a0f49cc78bb4041ac) Thanks [@pedromonad](https://github.com/pedromonad)!

### ButtonGroup

- add disabled appearance

### PaginationButton

- add disabled appearance

## 35.2.0

### Minor Changes

- [#3628](https://github.com/toptal/picasso/pull/3628) [`818174975`](https://github.com/toptal/picasso/commit/818174975abadb967b581d890af6317b98b50e5a) Thanks [@sashuk](https://github.com/sashuk)!

### PageHamburger

- add test identifier to hamburger button

## 35.1.0

### Minor Changes

- [#3604](https://github.com/toptal/picasso/pull/3604) [`c7e22ccda`](https://github.com/toptal/picasso/commit/c7e22ccda1ebee0f2aa40903e06afa5834e3b696) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### SkeletonLoader

- add `uniqueKey` prop, to disable the default random unique id to make it compatible with SSR

### Patch Changes

- [#3604](https://github.com/toptal/picasso/pull/3604) [`c7e22ccda`](https://github.com/toptal/picasso/commit/c7e22ccda1ebee0f2aa40903e06afa5834e3b696) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Page.TopBar

- stop rendering components conditionaly with JS to fix SSR

## 35.0.3

### Patch Changes

- [#3610](https://github.com/toptal/picasso/pull/3610) [`951591101`](https://github.com/toptal/picasso/commit/95159110183d47b78c4bfc595417196247c93627) Thanks [@ascrazy](https://github.com/ascrazy)!

---

### Modal

- Fix scrollable shade at the bottom to properly disappear on different screen sizes

## 35.0.2

### Patch Changes

- [#3612](https://github.com/toptal/picasso/pull/3612) [`cb4dafe24`](https://github.com/toptal/picasso/commit/cb4dafe24c2d386d1b898ada03fd762ece863b3b) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### DatePicker

- remove unused `showTwoMonths` from default props to stop propagating it to DOM

## 35.0.1

### Patch Changes

- [#3616](https://github.com/toptal/picasso/pull/3616) [`6a5530274`](https://github.com/toptal/picasso/commit/6a553027426002804f2da503a1560799fc6f2746) Thanks [@denieler](https://github.com/denieler)!

---

### useBreakpoint

- show useBreakpoint code example in storybook

## 35.0.0

### Major Changes

- [#3602](https://github.com/toptal/picasso/pull/3602) [`d8f00db97`](https://github.com/toptal/picasso/commit/d8f00db976808f078693edce331a70e85c05ab2e) Thanks [@sashuk](https://github.com/sashuk)!

### Calendar and DatePicker

- the `simple-react-calendar` was replaced with `react-day-picker` library
  - unit test snapshots might need to be updated due to the changed underlying structure of the `Calendar` component (however, mocking any third-party component like `Calendar` in unit tests should be preferred)
  - feature test selectors might also need to be updated. For example, the `.rdp-months` selector should be used instead of `.calendar-month` one due to the changed underlying structure of `Calendar` component
  - test selectors that used `data-simple-react-calendar-day` prop will break as it was replaced by `data-calendar-day` prop to be more generic (the value stays the same)
- the `weekStartsOn` property is typed more strictly using `WeekStart` type (exported from `Calendar` component), please use it in order to migrate in case of compiler errors
- the `numberOfMonths` property was added to support multi-month display

## 34.1.1

### Patch Changes

- [#3596](https://github.com/toptal/picasso/pull/3596) [`f4d02d57c`](https://github.com/toptal/picasso/commit/f4d02d57c3fd834b7187169f34fe7e91660d2362) Thanks [@dependabot](https://github.com/apps/dependabot)!

### Icons, Pictograms

- regenerated with svgo@3, attributes in the SVG are sorted

## 34.1.0

### Minor Changes

- [#3594](https://github.com/toptal/picasso/pull/3594) [`9219d3fa5`](https://github.com/toptal/picasso/commit/9219d3fa5da2244b262f8912f7fec0d1002b742c) Thanks [@aesqe](https://github.com/aesqe)!

### Icon

- add `PauseSolid16` and `PauseSolid24` icons

## 34.0.2

### Patch Changes

- [#3590](https://github.com/toptal/picasso/pull/3590) [`89b0697ba`](https://github.com/toptal/picasso/commit/89b0697ba3a94338f18bdfbae343060e98410929) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Page.TopBar

- fix responsiveness when running on react@16

## 34.0.1

### Patch Changes

- [#3574](https://github.com/toptal/picasso/pull/3574) [`160529614`](https://github.com/toptal/picasso/commit/160529614704e2fcf5cd08d59ac0264efc58d1d1) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### Page.TopBar

- apply new responsive BASE design

## 34.0.0

### Major Changes

- [#3561](https://github.com/toptal/picasso/pull/3561) [`d4d055678`](https://github.com/toptal/picasso/commit/d4d055678455cdefdcc6d814a5eb773146eb17f9) Thanks [@dependabot](https://github.com/apps/dependabot)!

### Dropdown, AvatarUpload

- type of the `accept` prop has changed

```diff
<Dropzone
- accept='image/*'
+ accept={{ 'image/*': [] }}
>
```

## 33.2.0

### Minor Changes

- [#3571](https://github.com/toptal/picasso/pull/3571) [`5263f70ae`](https://github.com/toptal/picasso/commit/5263f70ae601dc691e12e30f6af1328c6b7fb328) Thanks [@samsonovkirill](https://github.com/samsonovkirill)!

---

### Indicator

- add light-blue color

## 33.1.2

### Patch Changes

- [#3565](https://github.com/toptal/picasso/pull/3565) [`aac446bba`](https://github.com/toptal/picasso/commit/aac446bbacf6b6c3c424e655240e55a2996acc5d) Thanks [@isabellymonteiro](https://github.com/isabellymonteiro)!

### Drawer

- fix close button and standard title overlap

## 33.1.1

### Patch Changes

- [#3556](https://github.com/toptal/picasso/pull/3556) [`c3ab7f29a`](https://github.com/toptal/picasso/commit/c3ab7f29ad6cdbda0754d7531c669338027af377) Thanks [@dmaklygin](https://github.com/dmaklygin)!

---

- fix quill issue in Safari when editor is hidden

## 33.1.0

### Minor Changes

- [#3551](https://github.com/toptal/picasso/pull/3551) [`fa9b2aebb`](https://github.com/toptal/picasso/commit/fa9b2aebb530a0d64a1b747778e5f7b5d3813ace) Thanks [@vzinchenko06](https://github.com/vzinchenko06)!

### Icon

- add keyboard icon

### Patch Changes

- [#3546](https://github.com/toptal/picasso/pull/3546) [`c00953688`](https://github.com/toptal/picasso/commit/c00953688a796466fe91f02cfa5e58a9cf18b4ec) Thanks [@MrBra1nwash](https://github.com/MrBra1nwash)!

### Drawer

- add transparentBackdrop

## 33.0.0

### Major Changes

- [#3552](https://github.com/toptal/picasso/pull/3552) [`87068a468`](https://github.com/toptal/picasso/commit/87068a4680f099185be00863b7ebeada893c0e29) Thanks [@sashuk](https://github.com/sashuk)!

### Breakpoints ([#3535](https://github.com/toptal/picasso/pull/3535))

- in order to comply with BASE design, Picasso breakpoint values were updated, please see the https://github.com/toptal/picasso/blob/master/docs/decisions/13-breakpoints.md for more details. As a consequence, breakpoint ranges were updated as well.

```
Before:
Value         |0px     576px    768px    992px    1920px
Breakpoint    |xs      sm       md       lg       xl
Screen width  |--------|--------|--------|--------|-------->
Range         |   sm   |   md   |   lg   |   xl   |   xl
After:
Value         |0px     480px    768px    1024px   1440px
Breakpoint    |xs      sm       md       lg       xl
Screen width  |--------|--------|--------|--------|-------->
Range         |   xs   |   sm   |   md   |   lg   |   xl
```

**Migration guide**

- `screenSizeToBreakpointKey()` hook now returns the breakpoint range for a specific screen size in a different manner (according to the differences in the breakpoints ranges scheme mentioned above, there is a new breakpoint range `xs`, the smallest one). Please see the examples below:
  - before: `screenSizeToBreakpointKey(300) = 'small'`; now: `screenSizeToBreakpointKey(300) = 'xs'` (because `300px` is between `xs` and `sm` breakpoints)
  - before: `screenSizeToBreakpointKey(2000) = 'extra-large'`; now: `screenSizeToBreakpointKey(2000) = 'xl'` (because `2000px` is bigger than the biggest `xl` breakpoint)
- `isScreenSize()`, `useBreakpoint()`, and `useScreens()` hooks also changed their behavior due to the same changes in breakpoint ranges.

### Grid ([#3538](https://github.com/toptal/picasso/pull/3538))

- in order to comply with BASE design, `Grid` spacing property automatically adjusts to the screen size, unless explicitly specified by consumer. Extra-small and small screens have `16px` spacing, medium screens have `24px` spacing and large and extra-large screens have `32px` spacing. If you want to keep the old behavior, please explicitly set `spacing={32}` for `Grid` components.

**Migration guide**

- grids are expected to work as before, as responsive grid spacing (the space between grid items) does not change the overall layout. However, please manually check how Grids that do not have `spacing` property set explicitly (so, the responsive spacing will be applied by default) look on different screens to ensure that it does not interfere with some custom grid item styling if there is any.

### Grid.Item, Checkbox.Group and Radio.Group ([#3540](https://github.com/toptal/picasso/pull/3540))

- components have replaced `small`, `medium`, and `large` properties with `xs`, `sm`, `md`, `lg`, and `xl` properties to align with updated BASE-compatible breakpoints.

**Migration guide**

For the mentioned components

- replace `small` property with `xs` property. Please note, that old `small` property is not the same as new `sm` property – the `sm` is not a minimal breakpoint range anymore (the `xs` now covers all the screen sizes now), plus `small` breakpoints was `576px` and `sm` is `480px` now;
- replace `medium` property with `md` property;
- replace `large` property with `lg` property. Please note, that old `large` property is not the same as new `lg` property – `large` breakpoint was `992px`, and `lg` is `1024px` now.

### Patch Changes

- Updated dependencies [[`87068a468`](https://github.com/toptal/picasso/commit/87068a4680f099185be00863b7ebeada893c0e29)]:
  - @toptal/picasso-provider@3.0.0
  - @toptal/picasso-shared@12.0.0

## 32.3.2

### Patch Changes

- [#3529](https://github.com/toptal/picasso/pull/3529) [`a2aa14332`](https://github.com/toptal/picasso/commit/a2aa1433217ab3eaca16d07a3982375a1eafd5cb) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### RichTextEditor

- fix unhandled error in nested lists

## 32.3.1

### Patch Changes

- [#3520](https://github.com/toptal/picasso/pull/3520) [`384988790`](https://github.com/toptal/picasso/commit/384988790cb57de868829da3af305515eccc24db) Thanks [@sergiubutnarasu](https://github.com/sergiubutnarasu)!

---

### DatePicker

- prevent opening the calendar when clicking on the datepicker reset button

## 32.3.0

### Minor Changes

- [#3509](https://github.com/toptal/picasso/pull/3509) [`a67a29ad3`](https://github.com/toptal/picasso/commit/a67a29ad327fdf8c7d34101452eda7145a17048c) Thanks [@alexvcasillas](https://github.com/alexvcasillas)!
- implement emoji picker into RichTextEditor with support for native unicode emojis and custom emojis provided from external source as images

## 32.2.0

### Minor Changes

- [#3510](https://github.com/toptal/picasso/pull/3510) [`87a11eb9f`](https://github.com/toptal/picasso/commit/87a11eb9fd7962208896e307d126607b9b3ac238) Thanks [@DmitriyT51](https://github.com/DmitriyT51)!

---

### PageHead

- add className property to PageHead components

## 32.1.0

### Minor Changes

- [#3504](https://github.com/toptal/picasso/pull/3504) [`e1a5f6f76`](https://github.com/toptal/picasso/commit/e1a5f6f76a1cf7e34b288e3d98f3be86bb88c464) Thanks [@sachalifs](https://github.com/sachalifs)!

---

### Icon

- add new `flag` icon from BASE
- add new `leadOrgUnitJoin` icon from BASE

## 32.0.2

### Patch Changes

- [#3506](https://github.com/toptal/picasso/pull/3506) [`8c6645af0`](https://github.com/toptal/picasso/commit/8c6645af02f41d2767b95721e2a2485e46148b34) Thanks [@aesqe](https://github.com/aesqe)!

---

### Stepper

- always show active Step's StepLabel

## 32.0.1

### Patch Changes

- [#3498](https://github.com/toptal/picasso/pull/3498) [`5ecfc70e5`](https://github.com/toptal/picasso/commit/5ecfc70e53bf0b19f2cfed09aa3d5832aa498cbd) Thanks [@mkrl](https://github.com/mkrl)!

### Page, Page.Sidebar

- fixed dropdown menu not being visible when initially rendered on a narrow viewport

## 32.0.0

### Major Changes

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

- basic gradients were added (blue, darker blue, light grey, grey, darker grey); `@toptal/picasso` requires `@toptal/picasso-provider >= 2.2.0`

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

### List

- add support for BASE nested lists
- requires latest version of @toptal/picasso-provider

### Patch Changes

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!
- bump date-fns-tz from 1.3.6 to 2.0.0

- [#3501](https://github.com/toptal/picasso/pull/3501) [`dd2dc7a28`](https://github.com/toptal/picasso/commit/dd2dc7a28b71e07506a5c5422a3e0df6f4a7b7cd) Thanks [@augustobmoura](https://github.com/augustobmoura)!

---

### RichTextEditor

- fix bug when removing formatted word, it should also update the toolbar

## 31.13.0

### Minor Changes

- [#3485](https://github.com/toptal/picasso/pull/3485) [`360a28d3d`](https://github.com/toptal/picasso/commit/360a28d3d635b4bb48673170f671a62f5ad1f176) Thanks [@mkrl](https://github.com/mkrl)!

---

### SkeletonLoader

- updated `SkeletonLoader` and all subcomponents to use a new color scheme suitable for dark backgrounds

## 31.12.4

### Patch Changes

- [#3486](https://github.com/toptal/picasso/pull/3486) [`fbe7d8e01`](https://github.com/toptal/picasso/commit/fbe7d8e01d76a7a25c52b5f03f9e08d281568d0d) Thanks [@dmaklygin](https://github.com/dmaklygin)!

---

- use non-fixable lint command on CI

## 31.12.3

### Patch Changes

- [#3475](https://github.com/toptal/picasso/pull/3475) [`612d5b6d7`](https://github.com/toptal/picasso/commit/612d5b6d7e2c77c83cd4385fb66dc5d67fc7aa85) Thanks [@mkrl](https://github.com/mkrl)!

### Notification

- fix prop description

## 31.12.2

### Patch Changes

- [#3444](https://github.com/toptal/picasso/pull/3444) [`6fd3dec59`](https://github.com/toptal/picasso/commit/6fd3dec59080d280dbd92de8ded8f2db429d9e1b) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### DatePicker

  - use passed `onClick` and `onFocus` from the parent component

## 31.12.1

### Patch Changes

- [#3466](https://github.com/toptal/picasso/pull/3466) [`307ca32dd`](https://github.com/toptal/picasso/commit/307ca32dde6b386d51e69d6a4fa12ddb164117db) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Picasso inputs

  - rename `highlightAutofill` to `highlight`

## 31.12.0

### Minor Changes

- [#3447](https://github.com/toptal/picasso/pull/3447) [`b82f644f0`](https://github.com/toptal/picasso/commit/b82f644f06cf5f0de0b40b80da830fb06caa21a5) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### RichTextEditor

  - allow nested lists

## 31.11.1

### Patch Changes

- [#3455](https://github.com/toptal/picasso/pull/3455) [`d93b63ab2`](https://github.com/toptal/picasso/commit/d93b63ab26571dffedcab8c8d6b0b881ab675897) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### RichText

  - update font-size to follow BASE

## 31.11.0

### Minor Changes

- [#3434](https://github.com/toptal/picasso/pull/3434) [`1b328123a`](https://github.com/toptal/picasso/commit/1b328123aae7469f3a218b15dc8567b8326e7934) Thanks [@mkrl](https://github.com/mkrl)! - ---

  ### Dropdown

  - removed deprecated RootRef from all the dropdown components in Picasso

## 31.10.0

### Minor Changes

- [#3435](https://github.com/toptal/picasso/pull/3435) [`78f5771d6`](https://github.com/toptal/picasso/commit/78f5771d62e4de1de341cc18e321b117dac200bc) Thanks [@denys-medynskyi](https://github.com/denys-medynskyi)! - ---

  ### Icon

  - add `Image16`, `Image24`, `Preview16`, `Preview24` icons

## 31.9.0

### Minor Changes

- [#3439](https://github.com/toptal/picasso/pull/3439) [`28c98b23a`](https://github.com/toptal/picasso/commit/28c98b23ad837554059f0ff49fff521c483f1b38) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### NumberInput

  - add `highlightAutofill` property

  ### Autocomplete

  - add `highlightAutofill` property

  ### PasswordInput

  - add `highlightAutofill` property

  ### TagSelector

  - add `highlightAutofill` property

  ### Select

  - add `highlightAutofill` property

  ### DatePicker

  - add `highlightAutofill` property

  ### TimePicker

  - add `highlightAutofill` property

  ### RichTextEditor

  - add `highlightAutofill` property

## 31.8.1

### Patch Changes

- [#3431](https://github.com/toptal/picasso/pull/3431) [`2d3a195f`](https://github.com/toptal/picasso/commit/2d3a195f1342348465ba20ad9d000988cd6895c6) Thanks [@ascrazy](https://github.com/ascrazy)! - ---

  ### Modal

  - Make scrollable shades properly apply on modals with dynamic content

## 31.8.0

### Minor Changes

- [#3427](https://github.com/toptal/picasso/pull/3427) [`be5fc491`](https://github.com/toptal/picasso/commit/be5fc491311cd91fe58bb40b5c230c2616817ef3) Thanks [@dulishkovych](https://github.com/dulishkovych)! - ---

  ### Icon

  - add `VerificationBadge16` and `VerificationBadge24` icons

## 31.7.0

### Minor Changes

- [#3421](https://github.com/toptal/picasso/pull/3421) [`a3e0d03e`](https://github.com/toptal/picasso/commit/a3e0d03ecc6c38908d368778227137b48257846d) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Input

  - add `highlightAutofill` property

## 31.6.1

### Patch Changes

- [#3408](https://github.com/toptal/picasso/pull/3408) [`c1157bef`](https://github.com/toptal/picasso/commit/c1157befbcbed60ebb0ae4be8d858b62b9211564) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Calendar

  - highlight weekends
  - remove border-radius on selected items between the start and end date

## 31.6.0

### Minor Changes

- [#3389](https://github.com/toptal/picasso/pull/3389) [`742ba65a`](https://github.com/toptal/picasso/commit/742ba65a48f4305df4dc140b0efb61bebf974184) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Carousel

  - add new component Carousel component using Glider.js
  - for more details, you can check examples in [the storybook](https://picasso.toptal.net/?path=/story/components-carousel--carousel)

  ```jsx
  <Carousel slidesToShow={2} autoplay hasArrows hasDots rewind>
    <div>slide 1</div>
    <div>slide 2</div>
    <div>slide 3</div>
  </Carousel>
  ```

## 31.5.1

### Patch Changes

- [#3395](https://github.com/toptal/picasso/pull/3395) [`dcbe1ab4`](https://github.com/toptal/picasso/commit/dcbe1ab4dfcef506c13bf1cf17d74f5c1ede23f0) Thanks [@mateusbzerra](https://github.com/mateusbzerra)! - ---

  ### Datepicker

  - fix `datepicker` disabled days attribute that prevents buttons from being able to trigger tooltips

## 31.5.0

### Minor Changes

- [#3380](https://github.com/toptal/picasso/pull/3380) [`4ab3bded`](https://github.com/toptal/picasso/commit/4ab3bded76bac251105f9b46ec4e7fcd4996fec7) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### ShowMore

  - add a new state as a parameter to `onToggle` callback

  ```diff
  <ShowMore
    onToggle={
  -    () => {}
  +    (newState) => {}
    }
  />
  ```

## 31.4.3

### Patch Changes

- [#3392](https://github.com/toptal/picasso/pull/3392) [`fc4b5c66`](https://github.com/toptal/picasso/commit/fc4b5c66864066863b0e1a2436f5cee259d9a6f9) Thanks [@domagojkorman](https://github.com/domagojkorman)! - ---

  ### Tabs

  - fix typings for the `onChange` handler

## 31.4.2

### Patch Changes

- [#3382](https://github.com/toptal/picasso/pull/3382) [`edd10829`](https://github.com/toptal/picasso/commit/edd10829ce9fe09604d4a4a98e339966795b0573) Thanks [@sashuk](https://github.com/sashuk)! - ---

  - updated d3 dependencies

## 31.4.1

### Patch Changes

- [#3379](https://github.com/toptal/picasso/pull/3379) [`b81d000c`](https://github.com/toptal/picasso/commit/b81d000c6a976a99eea5df096b35de582b2d7da5) Thanks [@mateusbzerra](https://github.com/mateusbzerra)! - ---

  ### Calendar

  - fix `calendar` disabled dates by adding disabled attribute and default cursor

## 31.4.0

### Minor Changes

- [#3378](https://github.com/toptal/picasso/pull/3378) [`18f16f2a`](https://github.com/toptal/picasso/commit/18f16f2a3f04e3eb82089e6e94f657dd2f26d00e) Thanks [@sachalifs](https://github.com/sachalifs)! - ---

  ### Tabs

  - add `variant` prop

## 31.3.1

### Patch Changes

- [#3360](https://github.com/toptal/picasso/pull/3360) [`924b95fd`](https://github.com/toptal/picasso/commit/924b95fd06d5de4d86fe5c3dbc94d35b1d14d550) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Dropdown

  - add comment for `placement` prop to appear in props table

## 31.3.0

### Minor Changes

- [#3365](https://github.com/toptal/picasso/pull/3365) [`6d9a4064`](https://github.com/toptal/picasso/commit/6d9a40640423a12d1c4dbb627fa63caa0b3fbe20) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Select

  - add new `filterOptions` prop to provide custom filtering functionality

## 31.2.0

### Minor Changes

- [#3356](https://github.com/toptal/picasso/pull/3356) [`db764470`](https://github.com/toptal/picasso/commit/db7644708bbe9f6703f5449ff2329fd51cf39ac0) Thanks [@sofiaternovskaya](https://github.com/sofiaternovskaya)! - ---

  ### Icon

  - add `TimeSolid16` and `TimeSolid24` icons

## 31.1.4

### Patch Changes

- [#3347](https://github.com/toptal/picasso/pull/3347) [`cd8b59d2`](https://github.com/toptal/picasso/commit/cd8b59d279d2bdbbe4fc7e9be941374c6bbe1767) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Autocomplete

  - pass `data-testid` to `Menu.Item` only when `testIds?.menuItem` is available

## 31.1.3

### Patch Changes

- [#3346](https://github.com/toptal/picasso/pull/3346) [`640e009e`](https://github.com/toptal/picasso/commit/640e009e38a9c97f74d5bdeebc56a481451eeb37) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Autocomplete

  - fix typo `data-test-id` -> `data-testid` so `getByTestId` works correctly

## 31.1.2

### Patch Changes

- [#3338](https://github.com/toptal/picasso/pull/3338) [`462d0383`](https://github.com/toptal/picasso/commit/462d0383d8d0bd309e5dc78a52f356edf2344dbb) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### PageTopBarMenu

  - fix alignment of Avatar initials on small screens

## 31.1.1

### Patch Changes

- [#3341](https://github.com/toptal/picasso/pull/3341) [`c9c7a127`](https://github.com/toptal/picasso/commit/c9c7a1276183b4f5ac6fc225dfe64610fb48eae5) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### TagRectangular

  - rename exported variant type to the correct name

## 31.1.0

### Minor Changes

- [#3337](https://github.com/toptal/picasso/pull/3337) [`10ea15b7`](https://github.com/toptal/picasso/commit/10ea15b7358feeea45f36a5c8fcc8340724fe25a) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### TagRectangular

  - export VariantType from main package

## 31.0.2

### Patch Changes

- [#3331](https://github.com/toptal/picasso/pull/3331) [`0c5da322`](https://github.com/toptal/picasso/commit/0c5da32206a8fab8dd3f9c5ef0976facdb3fc82b) Thanks [@zorguiala](https://github.com/zorguiala)! - ---

  ### RichTextEditor

  - fix disabled default value bug

## 31.0.1

### Patch Changes

- [#3332](https://github.com/toptal/picasso/pull/3332) [`2eba69f1`](https://github.com/toptal/picasso/commit/2eba69f1b6ff1ff6a8d8a9fd66944196b7498aa9) Thanks [@damianstasik](https://github.com/damianstasik)! - ---

  - import from `@material-ui/core` barrel module in restyled components to fix MUI's side-effects being executed in wrong order

## 31.0.0

### Major Changes

- [#3326](https://github.com/toptal/picasso/pull/3326) [`e1f6d98e`](https://github.com/toptal/picasso/commit/e1f6d98e55a65025b98dda38d29f9e9d0c7573c0) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Modal

  - trigger `onClose` callback by default when the backdrop is clicked
  - add new prop `disableBackdropClick` to prevent calling onClose after clicking the backdrop

## 30.3.0

### Minor Changes

- [#3327](https://github.com/toptal/picasso/pull/3327) [`04c73c80`](https://github.com/toptal/picasso/commit/04c73c804f2e76a262b463f4ee7ddf7213d5b2a4) Thanks [@besirovic](https://github.com/besirovic)! - - add new `onCollapse` prop
  - call `onCollapse` when collapse button is clicked

## 30.2.0

### Minor Changes

- [#3324](https://github.com/toptal/picasso/pull/3324) [`ff13e63e`](https://github.com/toptal/picasso/commit/ff13e63e390fc69825cfbdd6ca76174f7813e504) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Icon

  - add `BellSolid16` and `BellSolid24` icons

## 30.1.0

### Minor Changes

- [#3318](https://github.com/toptal/picasso/pull/3318) [`c074bdb1`](https://github.com/toptal/picasso/commit/c074bdb172b7893ec6393e0acaf3f6557f06eff0) Thanks [@ascrazy](https://github.com/ascrazy)! - ---

  ### Drawer

  - Add support for optional body scroll lock enabled mode

## 30.0.4

### Patch Changes

- [#3315](https://github.com/toptal/picasso/pull/3315) [`8d1d3a66`](https://github.com/toptal/picasso/commit/8d1d3a6697a30c1d991a5f7750e6cef189fa6ee8) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### Autocomplete

  - focus Autocomplete when clicking on its adornments

  > NOTE: when using custom `inputComponent` in Autocomplete,
  > make sure you wrap it with React.forwardRef

- Updated dependencies [[`8d1d3a66`](https://github.com/toptal/picasso/commit/8d1d3a6697a30c1d991a5f7750e6cef189fa6ee8)]:
  - @toptal/picasso-shared@11.3.0

## 30.0.3

### Patch Changes

- [#3314](https://github.com/toptal/picasso/pull/3314) [`9090119b`](https://github.com/toptal/picasso/commit/9090119b7cc870b743f5625340eb237dc3fc74a1) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Input

  - fix the size and spacing of adornments

## 30.0.2

### Patch Changes

- [#3300](https://github.com/toptal/picasso/pull/3300) [`36b7fd9c`](https://github.com/toptal/picasso/commit/36b7fd9c7c24fb002fa8e4c486e206341a352009) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### ShowMore

  - hide "Show More" button when there's nothing to show

## 30.0.1

### Patch Changes

- [#3295](https://github.com/toptal/picasso/pull/3295) [`c18cc7c5`](https://github.com/toptal/picasso/commit/c18cc7c50628d2eeb49c774c4b2d544984268db3) Thanks [@dependabot](https://github.com/apps/dependabot)! - ---

  Bump d3-hierarchy from 2 to 3

## 30.0.0

### Major Changes

- [#3282](https://github.com/toptal/picasso/pull/3282) [`24c1be48`](https://github.com/toptal/picasso/commit/24c1be48ad35ed5624b1962a256ad614134a2b1f) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### PageSidebar

  #### BREAKING CHANGE

  - sidebar sticks to TopBar on scroll
  - you can opt-out by setting:

  ```jsx
  <Page.Sidebar disableSticky>
    <Page.Sidebar.Menu>...</Page.Sidebar.Menu>
  </Page.Sidebar>
  ```

## 29.1.3

### Patch Changes

- Updated dependencies [[`a9218c42`](https://github.com/toptal/picasso/commit/a9218c42b85ed5964909b9493fdd58503d036cb4)]:
  - @toptal/picasso-shared@11.2.1

## 29.1.2

### Patch Changes

- [#3279](https://github.com/toptal/picasso/pull/3279) [`8c26ca36`](https://github.com/toptal/picasso/commit/8c26ca36ba5efc031c429e7aeb153f30c82b54f1) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### InputLimitAdornment

  - split limit message into translatable and non-translatable part to handle google translation better

## 29.1.1

### Patch Changes

- [#3272](https://github.com/toptal/picasso/pull/3272) [`014069aa`](https://github.com/toptal/picasso/commit/014069aaa24094a8ed2effa804cf6f011f7ae3e4) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### Input

  - fix success state for multiline input with counter

## 29.1.0

### Minor Changes

- [#3271](https://github.com/toptal/picasso/pull/3271) [`cf337f2b`](https://github.com/toptal/picasso/commit/cf337f2b00eb31e6b001a4c899e1ff78aef8a3b7) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Icon

  - add new `add` and `ask` icons from the BASE.

## 29.0.1

### Patch Changes

- [#3251](https://github.com/toptal/picasso/pull/3251) [`efd2b03a`](https://github.com/toptal/picasso/commit/efd2b03ab78e825f99eb904dd7067937f525e4ec) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - show character count for multiline input and RichTextEditor below the component

## 29.0.0

### Major Changes

- [#3256](https://github.com/toptal/picasso/pull/3256) [`a0cfb3aa`](https://github.com/toptal/picasso/commit/a0cfb3aa11c78d781298c8b90c22d5e85b649f40) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Page.SidebarItem

  - add the new prop `tag` to display a new feature in the sidebar

  ```jsx
  <Page.Sidebar.Item tag='New'>Label</Page.Sidebar.Item>
  <Page.Sidebar.Item tag={{ content: 'New', ...otherTagProps }}>Label</Page.Sidebar.Item>
  ```

  - update `badge` prop to also support `number` as it is the most common way of the usage
  - the badge is now aligned to the right

  ```jsx
  <Page.Sidebar.Item badge={5}>Label</Page.Sidebar.Item>
  ```

  #### BREAKING CHANGES

  - sidebar item with a submenu (parent)
    - will not display a `badge` or `tag` (**BREAKING CHANGE**)
    - will display an indicator when any hidden child item has a `badge` or `tag`
  - submenu items will no longer display an icon (**BREAKING CHANGE**)

## 28.14.2

### Patch Changes

- [#3264](https://github.com/toptal/picasso/pull/3264) [`921da632`](https://github.com/toptal/picasso/commit/921da632eb0e1f3aa54b89bd15b61160f4e2220b) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### PageHamburger

  - change role from `tooltip` to `navigation` for hamburger content

## 28.14.1

### Patch Changes

- [#3259](https://github.com/toptal/picasso/pull/3259) [`2dc67848`](https://github.com/toptal/picasso/commit/2dc67848365538fb6e27c352027d6fa83403ce30) Thanks [@mkrl](https://github.com/mkrl)! - ---

  ### Timeline.Row

  - adjust row content to being able to take up to the full width of the container (`flex-grow: 1`)

## 28.14.0

### Minor Changes

- [#3257](https://github.com/toptal/picasso/pull/3257) [`a4b70ba3`](https://github.com/toptal/picasso/commit/a4b70ba30a70c965f3b5875c36c3f89125c21092) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Page.Sidebar

  - add `size` prop to support different widths
    - **small** for `212px`
    - **medium** for `236px`
    - **large** for `280px`

## 28.13.0

### Minor Changes

- [#3258](https://github.com/toptal/picasso/pull/3258) [`d0e014b2`](https://github.com/toptal/picasso/commit/d0e014b2fc8f80be4b9e65e3c7432b1fe595092f) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### useBoolean

  - add new reusable hook `useBoolean`

  ```diff
  const Component = () => {
  -  const [isOpened, setOpen] = useState(false)
  -
  -  const handleOpen = () => setOpen(true)
  -  const handleClose = () => setOpen(false)
  -  const handleToggle = () => setOpen(value => !value)

  + const [isOpened, handleOpen, handleClose, handleToggle] = useBoolean()
  }
  ```

  ```diff
  const Component = () => {
  -  const [isCollapsed, setCollapsed] = useState(true)
  -
  -  const handleToggle = () => setCollapsed(value => !value)

  + const [isCollapsed, , , handleToggle] = useBoolean(true)
  }
  ```

## 28.12.0

### Minor Changes

- [#3211](https://github.com/toptal/picasso/pull/3211) [`9028491d`](https://github.com/toptal/picasso/commit/9028491d5aae8731dbad767ac1bf86ef4cf22b72) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Tabs

  - update styles of the vertical variant to comply with BASE
  - add `description` and `avatar` props to `Tabs.Tab` in the vertical variant
  - add [new examples](https://picasso.toptal.net/?path=/story/layout-tabs--tabs#tabs-tab-vertical-tab) in the storybook

## 28.11.0

### Minor Changes

- [#3246](https://github.com/toptal/picasso/pull/3246) [`83f57466`](https://github.com/toptal/picasso/commit/83f57466ab64eb581e172382da63573ee7ff2bb2) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### Page.TopBar

  - add new variant `grey`
  - add `centerContent` prop to display center menu

  ### Page.TopBar.Menu

  - new component for center menu in `TopBar` designed to be used in the new `grey` variant
  - allows maximum of 6 menu items
  - on mobile the menu can be accessed from the hamburger menu
  - example usage:

  ```jsx
  <Page.TopBar.Menu>
    <Page.TopBar.Item icon={<Profile16 />}>Menu item 1</Page.TopBar.Item>
    <Page.TopBar.Item>Menu item 2</Page.TopBar.Item>
  </Page.TopBar.Menu>
  ```

### Patch Changes

- Updated dependencies [[`83f57466`](https://github.com/toptal/picasso/commit/83f57466ab64eb581e172382da63573ee7ff2bb2)]:
  - @toptal/picasso-shared@11.2.0

## 28.10.1

### Patch Changes

- [#3228](https://github.com/toptal/picasso/pull/3228) [`28c97407`](https://github.com/toptal/picasso/commit/28c97407a30529e3a9052633c17f535fcb93af6f) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Avatar

  - add outline for focused state when editable
    Due to changes in the component structure, snapshot changes should be expected.

## 28.10.0

### Minor Changes

- [#3210](https://github.com/toptal/picasso/pull/3210) [`4f3897e0`](https://github.com/toptal/picasso/commit/4f3897e02418852c5d24c496c7332f57adfd0cb8) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### FormAutoSaveIndicator

  - add a new component to be used inside forms to show the auto-saving state

## 28.9.0

### Minor Changes

- [#3212](https://github.com/toptal/picasso/pull/3212) [`05f2672e`](https://github.com/toptal/picasso/commit/05f2672e8cd9babaeda3d97ba96d7446a55445f9) Thanks [@mkrl](https://github.com/mkrl)! - ---

  ### Dropzone

  - adjust copy text for the Dropzone component

## 28.8.0

### Minor Changes

- [#3206](https://github.com/toptal/picasso/pull/3206) [`04f111b0`](https://github.com/toptal/picasso/commit/04f111b0dc3f7c022facec765d6a44aea3930749) Thanks [@DmitriyT51](https://github.com/DmitriyT51)! - ---

  ### Container

  - add additional values to direction property of Container component

## 28.7.0

### Minor Changes

- [#3201](https://github.com/toptal/picasso/pull/3201) [`fc18936c`](https://github.com/toptal/picasso/commit/fc18936ce276e404ec5c3514b2e6f7b5c8651008) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### MenuItem

  - add avatar option for MenuItem and consenquentely to Dropdown

## 28.6.1

### Patch Changes

- [#3180](https://github.com/toptal/picasso/pull/3180) [`6400592f`](https://github.com/toptal/picasso/commit/6400592fbe4844ea373168a1b070fb21f5ce973d) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Dropzone

  - deprecate `errorMessages` prop
  - comply with BASE design

## 28.6.0

### Minor Changes

- [#3182](https://github.com/toptal/picasso/pull/3182) [`32d512ee`](https://github.com/toptal/picasso/commit/32d512ee262853265038d81c8859ffca1595970e) Thanks [@pedromonad](https://github.com/pedromonad)! - ---

  ### DatePicker

  - add footer background color

## 28.5.0

### Minor Changes

- [#3183](https://github.com/toptal/picasso/pull/3183) [`9b12b62b`](https://github.com/toptal/picasso/commit/9b12b62b536bf53831dc80fc5eae9c2ee6385c97) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Typography

  - enable `grey-main-2` as a `color` option of Typography
  - update reusable `ColorType`

### Patch Changes

- Updated dependencies [[`9b12b62b`](https://github.com/toptal/picasso/commit/9b12b62b536bf53831dc80fc5eae9c2ee6385c97)]:
  - @toptal/picasso-shared@11.1.0

## 28.4.0

### Minor Changes

- [#3179](https://github.com/toptal/picasso/pull/3179) [`690d52c1d`](https://github.com/toptal/picasso/commit/690d52c1d9c4e259334afb1ebf058ac6e8f0e402) Thanks [@oksana-artyshko](https://github.com/oksana-artyshko)! - ---

  ### Icon

  - add `Layers` icon

## 28.3.0

### Minor Changes

- [#3173](https://github.com/toptal/picasso/pull/3173) [`c5c086f71`](https://github.com/toptal/picasso/commit/c5c086f71fd4d4124d02aab560ed44706e94a667) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Menu.Item

  - add new prop `icon` to render any Icon. Check [example](https://picasso.toptal.net/?path=/story/components-dropdown--dropdown#dropdown-menu) for more info.

## 28.2.2

### Patch Changes

- [#3168](https://github.com/toptal/picasso/pull/3168) [`b04cb788d`](https://github.com/toptal/picasso/commit/b04cb788d090920d9b62fe88863edef04bc4aa2b) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Avatar

  - remove functional styles

  ### Dropdown

  - remove functional styles

  ### RichtextEditorToolbar

  - remove functional styles

  ### ProgressBar

  - remove functional styles

## 28.2.1

### Patch Changes

- [#3166](https://github.com/toptal/picasso/pull/3166) [`f7db29420`](https://github.com/toptal/picasso/commit/f7db294205c83321e4f6b4897e06ecff99fe907b) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Menu Item

  - update `min-width` to 144px to follow BASE design
  - fix color of description when item is disabled

## 28.2.0

### Minor Changes

- [#3158](https://github.com/toptal/picasso/pull/3158) [`ae95eae59`](https://github.com/toptal/picasso/commit/ae95eae59207bc9e58052b23129c3515beb3d523) Thanks [@ybouhjira](https://github.com/ybouhjira)! - ---

  ### Amount

  - add props maximumFractionDigits, minimumFractionDigits

## 28.1.2

### Patch Changes

- [#3153](https://github.com/toptal/picasso/pull/3153) [`0dbe7be79`](https://github.com/toptal/picasso/commit/0dbe7be79e7a6ea09a889ac6dc24207b685b114f) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Modal

  - fix `onBackdropClick` deprecation issue and use `onClose` instead

## 28.1.1

### Patch Changes

- [#3147](https://github.com/toptal/picasso/pull/3147) [`31e24f9af`](https://github.com/toptal/picasso/commit/31e24f9afff79271999f845c3f613a250f3d4ca4) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### ButtonAction

  - update `font-weight` in all variants to `semibold` to comply with BASE

## 28.1.0

### Minor Changes

- [#3144](https://github.com/toptal/picasso/pull/3144) [`b700a5377`](https://github.com/toptal/picasso/commit/b700a537776183c14890c6af964daa27c5cbc882) Thanks [@ybouhjira](https://github.com/ybouhjira)! - ---

  ### Formatters

  - formatAmount(): add options maximumFractionDigits, minimumFractionDigits

## 28.0.0

### Major Changes

- [#3137](https://github.com/toptal/picasso/pull/3137) [`356678e34`](https://github.com/toptal/picasso/commit/356678e341388e60fce5dcfc5cc4b9aa956d2c02) Thanks [@sanex3339](https://github.com/sanex3339)! - ---

  ### Picasso

  **BREAKING CHANGE:**

  - update `@toptal/picasso-provider` to version `2.0.0`
  - replace usage of `react-helmet` package with `react-helmet-async`

### Patch Changes

- Updated dependencies []:
  - @toptal/picasso-shared@11.0.0

## 27.4.0

### Minor Changes

- [#3142](https://github.com/toptal/picasso/pull/3142) [`06ec10cdd`](https://github.com/toptal/picasso/commit/06ec10cdd6096cc883cf2d65a0968fcb29e91e38) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### AvatarUpload

  - add new prop `avatarStyle` to allow styling on the inner `Avatar` component

## 27.3.2

### Patch Changes

- [#3138](https://github.com/toptal/picasso/pull/3138) [`09f7dbb49`](https://github.com/toptal/picasso/commit/09f7dbb496ae30a0bca02e52f720db41d4189e52) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Typography

  - inherits font-weight correctly when taken as italic component.

  **Example**

  ```jsx
  <Typography as='strong' weight='semibold'>
    <Typography as='em'>Should be both bold and italic</Typography>
  </Typography>
  ```

## 27.3.1

### Patch Changes

- [#3134](https://github.com/toptal/picasso/pull/3134) [`8adb1d360`](https://github.com/toptal/picasso/commit/8adb1d360e88814f2d3b1f7d0e4f3b9e7ec2872c) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### AvatarUpload

  - remove redundant time unit for animation function

## 27.3.0

### Minor Changes

- [#3132](https://github.com/toptal/picasso/pull/3132) [`2d872820e`](https://github.com/toptal/picasso/commit/2d872820ec07986833e84116a0d6436c93729571) Thanks [@nikolalsvk](https://github.com/nikolalsvk)! - ---

  ### Icon

  - add mobile icon

## 27.2.0

### Minor Changes

- [#3130](https://github.com/toptal/picasso/pull/3130) [`5e0b23b1a`](https://github.com/toptal/picasso/commit/5e0b23b1aa3b1cbb5c648749eac7428bc3500c18) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### PageHead

  - add `noBorder` property to hide bottom border, when PageHead is directly followed by bordered section.
    Check [storybook example](https://picasso.toptal.net/?path=/story/components-pagehead--pagehead#no-border) for more details

## 27.1.0

### Minor Changes

- [#3122](https://github.com/toptal/picasso/pull/3122) [`e3c897296`](https://github.com/toptal/picasso/commit/e3c89729662ac68075f8f81ff418ef0637fc68ff) Thanks [@ykaragol](https://github.com/ykaragol)! - ---

  ### Dropzone

  - add `hideContentText` property for hiding default text

## 27.0.1

### Patch Changes

- [#3112](https://github.com/toptal/picasso/pull/3112) [`8fb49a981`](https://github.com/toptal/picasso/commit/8fb49a981ff904579b4a175f7ab93f79994bc2bf) Thanks [@sergiubutnarasu](https://github.com/sergiubutnarasu)! - ---

  - use `TypographyOverflow` to display the file name inside `Dropzone`

## 27.0.0

### Major Changes

- [#3098](https://github.com/toptal/picasso/pull/3098) [`92b701958`](https://github.com/toptal/picasso/commit/92b701958f75e3a0962e15acf806d60fbb5d3dd9) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Select

  - remove internal value state and make component controlled only

### Minor Changes

- [#3103](https://github.com/toptal/picasso/pull/3103) [`54b09c177`](https://github.com/toptal/picasso/commit/54b09c177ba5e32bcc894ae44b86e1b1092daad9) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### Tabs

  - fix vertical active tab has not background color
  - fix vertical tabs labels are center align instead of left aligned
  - fix active vertical tab's shadow is not visible on the left

### Patch Changes

- [#3104](https://github.com/toptal/picasso/pull/3104) [`1915606f6`](https://github.com/toptal/picasso/commit/1915606f631a574a35d59a4df0c5c423e7ef1e74) Thanks [@ykaragol](https://github.com/ykaragol)! - ---

  - add source link to storybook for AvatarUpload component

## 26.15.3

### Patch Changes

- [#3099](https://github.com/toptal/picasso/pull/3099) [`932c5da44`](https://github.com/toptal/picasso/commit/932c5da44042127b9f44e909e9274087c6c391c9) Thanks [@domagojkorman](https://github.com/domagojkorman)! - ---

  ### PasswordInput

  - remove `startAdornment` and `endAdornment` from PasswordInput's prop typings

## 26.15.2

### Patch Changes

- [#3096](https://github.com/toptal/picasso/pull/3096) [`5b08902c9`](https://github.com/toptal/picasso/commit/5b08902c9dc80fe331da594b99eee54e13e6a6cd) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### Tabs

  - introduce `orientation` prop. possible values are `horizontal` and `vertical`

## 26.15.1

### Patch Changes

- [#3088](https://github.com/toptal/picasso/pull/3088) [`b17bd9725`](https://github.com/toptal/picasso/commit/b17bd9725f8a63ab55943ef0c7e525ff4b78115d) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### RichText

  - fix losing single root containers in html to ast parsing

## 26.15.0

### Minor Changes

- [#3086](https://github.com/toptal/picasso/pull/3086) [`42c841330`](https://github.com/toptal/picasso/commit/42c8413304518723b0ed0a0842357b42b4191901) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### AvatarUpload

  - add `xxsmall`, `xsmall`, and `medium` size variants
  - pixel perfect the border and outline of the component

## 26.14.0

### Minor Changes

- [#3082](https://github.com/toptal/picasso/pull/3082) [`514eb9fe6`](https://github.com/toptal/picasso/commit/514eb9fe68ce7986bcf2bea8246161b15c7daf5c) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### AvatarUpload

  - add `value`, `onFocus` and `onBlur` props to be used in forms

## 26.13.1

### Patch Changes

- [#3080](https://github.com/toptal/picasso/pull/3080) [`6c54f7dd8`](https://github.com/toptal/picasso/commit/6c54f7dd8afd9c75ab82a3f6ed248f9a549b3329) Thanks [@pedrobarrostech](https://github.com/pedrobarrostech)! - ---

  ### DatePicker

  - fix footer alignment

## 26.13.0

### Minor Changes

- [#3079](https://github.com/toptal/picasso/pull/3079) [`aac672c9b`](https://github.com/toptal/picasso/commit/aac672c9b366d5d7836ab6ebcff9c284f1bf30b7) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### AvatarUpload

  - add `focused`, `hovered`, `active` and `error` states for the component

## 26.12.0

### Minor Changes

- [#3069](https://github.com/toptal/picasso/pull/3069) [`3ee414e7c`](https://github.com/toptal/picasso/commit/3ee414e7c7088011992b731642099c68d6e25a17) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### AvatarUpload

  - add new component for avatar uploads
  - add `size` prop and large variant for the component

## 26.11.0

### Minor Changes

- [#3065](https://github.com/toptal/picasso/pull/3065) [`c2ca8780e`](https://github.com/toptal/picasso/commit/c2ca8780e73d62ff51e0baaac98702e62862df24) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Avatar

  - add `onEdit` prop to Avatar

## 26.10.2

### Patch Changes

- [#3062](https://github.com/toptal/picasso/pull/3062) [`af55d5ddb`](https://github.com/toptal/picasso/commit/af55d5ddbf553ea0fedaebf20d0a671bb149e207) Thanks [@alexvcasillas](https://github.com/alexvcasillas)! - ### RichText

  - fix useRichText hook and make it pass props down properly so Links can work fine

## 26.10.1

### Patch Changes

- Updated dependencies [[`549bbb96d`](https://github.com/toptal/picasso/commit/549bbb96d4d1a5090b3fbc8169d16f19a939659e)]:
  - @toptal/picasso-shared@10.0.0

## 26.10.0

### Minor Changes

- [#3036](https://github.com/toptal/picasso/pull/3036) [`d0208e04d`](https://github.com/toptal/picasso/commit/d0208e04d88e83a3a09114a918fd1123baae06b9) Thanks [@doglasbatista](https://github.com/doglasbatista)! - ---

  ### Dropdown

  - add `contentStyle` prop

## 26.9.2

### Patch Changes

- [#3037](https://github.com/toptal/picasso/pull/3037) [`41be6f1e`](https://github.com/toptal/picasso/commit/41be6f1ed513ab2e580a7e74bcd465b3e7b5e154) Thanks [@yonathan-pineda](https://github.com/yonathan-pineda)! - ---

  ### Calendar

  - add rule on calendar styles

## 26.9.1

### Patch Changes

- [#3030](https://github.com/toptal/picasso/pull/3030) [`108a3161`](https://github.com/toptal/picasso/commit/108a31619fef88f64d08912bf6ef00955f5272ea) Thanks [@SergeyKolchenko](https://github.com/SergeyKolchenko)! - ---
  PicassoProvider

  - uses `createTheme` instead of deprecated `createMuiTheme` due to the function was renamed

  ***

  Grid

  - uses the `justifyContent` property instead of deprecated `justify` one

  ***

  Loader

  - uses the `determinate` variant property value instead of deprecated `static` one

  ***

  OutlinedInput

  - uses `minRows` and `maxRows` props instead of deprecated `rows` and `rowsMax` respectively

## 26.9.0

### Minor Changes

- [#3029](https://github.com/toptal/picasso/pull/3029) [`5833af3c`](https://github.com/toptal/picasso/commit/5833af3cd47fae18d68f839f6b20a401f7133d0a) Thanks [@ascrazy](https://github.com/ascrazy)! - ---

  ### Drawer

  - add `transitionProps` prop for better control over open/close transitions

## 26.8.0

### Minor Changes

- [#3016](https://github.com/toptal/picasso/pull/3016) [`2082a952`](https://github.com/toptal/picasso/commit/2082a952874740fed64c4d698e500192377275ed) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Dependencies

  - update material-ui to latest 4.x.x version

### Patch Changes

- [#3015](https://github.com/toptal/picasso/pull/3015) [`3ede7108`](https://github.com/toptal/picasso/commit/3ede71081b89fe74ad84d69253e677e9a97da643) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Storybook

  - fix broken links for `Paper` and `Container` components

- [#3005](https://github.com/toptal/picasso/pull/3005) [`e0c883f8`](https://github.com/toptal/picasso/commit/e0c883f872b7ae322c831c324c342cccf91973be) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### TagSelector

  - fix input's width issue after adding multiple tags

- [#3014](https://github.com/toptal/picasso/pull/3014) [`e1727d95`](https://github.com/toptal/picasso/commit/e1727d952c25321117cdace3d814c79dbc53e521) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### TopBarMenu

  - fix meta is invisible on small and medium screens

## 26.7.0

### Minor Changes

- [#2994](https://github.com/toptal/picasso/pull/2994) [`ada629ca`](https://github.com/toptal/picasso/commit/ada629ca32486603906803f7ecb62ac5e4db31b3) Thanks [@pedrobarrostech](https://github.com/pedrobarrostech)! - ---

  ### DatePicker

  - add custom footer and indicated date range options

## 26.6.0

### Minor Changes

- [#3010](https://github.com/toptal/picasso/pull/3010) [`ae9ff336`](https://github.com/toptal/picasso/commit/ae9ff336efe04e3514cc7ed3d019fb3a48ddfe95) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### Autocomplete

  - add `onResetClick` prop

## 26.5.2

### Patch Changes

- [#3008](https://github.com/toptal/picasso/pull/3008) [`bad2a80e`](https://github.com/toptal/picasso/commit/bad2a80ee0edcd5dbd9ed198b1baacc0e67e117a) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### TagSelector

  - fix using TagSelector with form's initial values

## 26.5.1

### Patch Changes

- [#3002](https://github.com/toptal/picasso/pull/3002) [`035e7368`](https://github.com/toptal/picasso/commit/035e73683f3133abb101eed1d531579ba3784eab) Thanks [@SergeyKolchenko](https://github.com/SergeyKolchenko)! - ---

  ### TagSelector

  - support all testids values inherited from Autocomplete

## 26.5.0

### Minor Changes

- [#2997](https://github.com/toptal/picasso/pull/2997) [`eaf8bd3e`](https://github.com/toptal/picasso/commit/eaf8bd3ea3fcd47511bba1b397e81a5639229cb4) Thanks [@sanex3339](https://github.com/sanex3339)! - ---

  ### Stepper

  Add `overflowEllipsis` prop to enable proper ellipsis overflow for `Stepper` labels

## 26.4.0

### Minor Changes

- [#2969](https://github.com/toptal/picasso/pull/2969) [`15f613dd`](https://github.com/toptal/picasso/commit/15f613dde58ec389e345b5b08999b709bd3e6ca2) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### TagSelector

  - introduce `closeOnSelect` prop that controls whether the options menu would be closed after selection. The default value is `true` - closing the options menu after each selection

## 26.3.3

### Patch Changes

- [#2981](https://github.com/toptal/picasso/pull/2981) [`40fe9832`](https://github.com/toptal/picasso/commit/40fe98327512e3dc5de85e1124b097cab6057c5a) Thanks [@krav4enkodm](https://github.com/krav4enkodm)! - ---

  ### Modal

  - adjust modal content top padding

## 26.3.2

### Patch Changes

- [#2970](https://github.com/toptal/picasso/pull/2970) [`ff4a70ef`](https://github.com/toptal/picasso/commit/ff4a70ef7b568a8a94131f30598577399c188cf3) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### Autocomplete

  - show options on every click

## 26.3.1

### Patch Changes

- [#2959](https://github.com/toptal/picasso/pull/2959) [`984b826a`](https://github.com/toptal/picasso/commit/984b826af8f54835c6914586c338d60c64c741ff) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - bump `notistack` to `1.0.10`

- Updated dependencies [[`984b826a`](https://github.com/toptal/picasso/commit/984b826af8f54835c6914586c338d60c64c741ff)]:
  - @toptal/picasso-shared@9.0.1

## 26.3.0

### Minor Changes

- [#2952](https://github.com/toptal/picasso/pull/2952) [`7185c71b`](https://github.com/toptal/picasso/commit/7185c71bfb7896d125c9cb2d795589f2ba8b8ba1) Thanks [@tiagoporto](https://github.com/tiagoporto)! - ---

  ### Icon

  - Add inbox icon

## 26.2.2

### Patch Changes

- [#2943](https://github.com/toptal/picasso/pull/2943) [`713a9a7a`](https://github.com/toptal/picasso/commit/713a9a7af38850d9fddfcd50fc04311ce06db348) Thanks [@sergiubutnarasu](https://github.com/sergiubutnarasu)! - ---

  ### Section

  - Improve collapsible section animation to be smoother.

## 26.2.1

### Patch Changes

- [#2930](https://github.com/toptal/picasso/pull/2930) [`2ae747b7`](https://github.com/toptal/picasso/commit/2ae747b78b0c28c6b802a0681648e6eabf199b9b) Thanks [@alexvcasillas](https://github.com/alexvcasillas)! - ## RichTextEditor

  - Refactor format creation to avoid possible bug when recreating the format global class

## 26.2.0

### Minor Changes

- [#2916](https://github.com/toptal/picasso/pull/2916) [`949e7069`](https://github.com/toptal/picasso/commit/949e70691b6625249239253387710e39a41dcfb4) Thanks [@alexvcasillas](https://github.com/alexvcasillas)! - ### RichTextEditor, RichText

  - Add support for links

## 26.1.2

### Patch Changes

- [#2919](https://github.com/toptal/picasso/pull/2919) [`627161f4`](https://github.com/toptal/picasso/commit/627161f40182fd636eeacf3a6b4d96545098ec4e) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### Input

  - use '1 character' instead of '1 characters' in the limit message

## 26.1.1

### Patch Changes

- [#2884](https://github.com/toptal/picasso/pull/2884) [`187eb79a`](https://github.com/toptal/picasso/commit/187eb79ab70045243037754d29c9a3da74ac202f) Thanks [@konstrybakov](https://github.com/konstrybakov)! - ---

  ### AccordionCompound

  ### AlertCompound

  ### BreadcrumbsCompound

  ### CheckboxCompound

  ### DropdownCompound

  ### FormCompound

  ### GridCompound

  ### HelpboxCompound

  ### MenuCompound

  ### ModalCompound

  ### NoteCompound

  ### NotificationCompound

  ### OverviewBlockCompound

  ### RadioCompound

  ### TabsCompound

  ### TagSelectorCompound

  - Standardised CompoundComponent technique usage

  ***

  ***

  ## '@toptal/picasso-provider': patch

  ***

  ### PicassoLight

  - Added a composable Picasso version. This change may affect direct component imports (the usage of which is not recommended).

  ### FixViewport

  ### PicassoGlobalStylesProvider

  ### PicassoRootNode

  - Extracted to a separate component

  ***

## 26.1.0

### Minor Changes

- [#2899](https://github.com/toptal/picasso/pull/2899) [`149fdb67`](https://github.com/toptal/picasso/commit/149fdb6759b18a07f2ba300321307bb10f904c1b) Thanks [@ascrazy](https://github.com/ascrazy)! - ---

  ### Modal

  - Improve body scroll lock to properly handle multiple open modals

### Patch Changes

- [#2912](https://github.com/toptal/picasso/pull/2912) [`3b55d20a`](https://github.com/toptal/picasso/commit/3b55d20a420f944e4fbad36c159574c920b86a28) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### OutlinedInput

  - add red shadow when error input is focused

- [#2894](https://github.com/toptal/picasso/pull/2894) [`244169f5`](https://github.com/toptal/picasso/commit/244169f55820341797c3c3d787e08aa5e1bdd9ed) Thanks [@dmaklygin](https://github.com/dmaklygin)! - - Use davinci github actions directly

## 26.0.1

### Patch Changes

- [#2885](https://github.com/toptal/picasso/pull/2885) [`a767ce37`](https://github.com/toptal/picasso/commit/a767ce371c956b80c75da2005043ee0d09d268c1) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### TagSelector

  - fix selected items filtering when custom key provided

## 26.0.0

### Major Changes

- [#2864](https://github.com/toptal/picasso/pull/2864) [`b07a0fe8`](https://github.com/toptal/picasso/commit/b07a0fe8f72d670aa2a1844e1b7da9ec26a19d12) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### dependencies

  - `picasso-provider` is now a peer dependency of `picasso`, you should add it to your own project as a `dependency`

### Patch Changes

- Updated dependencies [[`b07a0fe8`](https://github.com/toptal/picasso/commit/b07a0fe8f72d670aa2a1844e1b7da9ec26a19d12)]:
  - @toptal/picasso-shared@9.0.0

## 25.4.0

### Minor Changes

- [#2868](https://github.com/toptal/picasso/pull/2868) [`0645f129`](https://github.com/toptal/picasso/commit/0645f129cbdd797d2f6254ecb4b0c218e913ef73) Thanks [@sanex3339](https://github.com/sanex3339)! - ---

  ### Autocomplete

  - allow passing popper options

  ### TagSelector

  - allow passing popper options

## 25.3.3

### Patch Changes

- [#2849](https://github.com/toptal/picasso/pull/2849) [`47f2013a`](https://github.com/toptal/picasso/commit/47f2013a4e76f360af5fc7009f90523a536de090) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### Select

  - forward ref properly

- Updated dependencies [[`053e386c`](https://github.com/toptal/picasso/commit/053e386c7268bc34f294adbaa3327470c80947f1)]:
  - @toptal/picasso-provider@1.2.0

## 25.3.2

### Patch Changes

- [#2840](https://github.com/toptal/picasso/pull/2840) [`38e61c28`](https://github.com/toptal/picasso/commit/38e61c286d48d33f7e4e1080d2f0b48747950e67) Thanks [@vvmarulin](https://github.com/vvmarulin)! - ---

  # Notification

  Fix overflow of notifications on the small screens

- Updated dependencies [[`38e61c28`](https://github.com/toptal/picasso/commit/38e61c286d48d33f7e4e1080d2f0b48747950e67), [`38e61c28`](https://github.com/toptal/picasso/commit/38e61c286d48d33f7e4e1080d2f0b48747950e67)]:
  - @toptal/picasso-provider@1.1.4
  - @toptal/picasso-shared@8.2.2

## 25.3.1

### Patch Changes

- [#2812](https://github.com/toptal/picasso/pull/2812) [`56149a1a`](https://github.com/toptal/picasso/commit/56149a1a5be67e10dbdb458465dd284c0db2dcf3) Thanks [@mupkoo](https://github.com/mupkoo)! - ---

  ### Autocomplete

  - Improve the look of `PoweredByGoogle` label

## 25.3.0

### Minor Changes

- [#2801](https://github.com/toptal/picasso/pull/2801) [`73279a39`](https://github.com/toptal/picasso/commit/73279a3947f9dd9c644218b0c0388242ac0181bc) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ---

  ### FileInput

  - add new `buttonLabel` prop to customize default text

- [#2809](https://github.com/toptal/picasso/pull/2809) [`f9751dff`](https://github.com/toptal/picasso/commit/f9751dff012635d1d2798d48a0ad1553d3ce1ca9) Thanks [@OKendigelian](https://github.com/OKendigelian)! - Add Cube icon

### Patch Changes

- [#2806](https://github.com/toptal/picasso/pull/2806) [`81a56673`](https://github.com/toptal/picasso/commit/81a56673a16f0290564d7205f414efebbfd9f7ce) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---
  - Fix format of peerDependency for `react` and `react-dom`
- Updated dependencies [[`81a56673`](https://github.com/toptal/picasso/commit/81a56673a16f0290564d7205f414efebbfd9f7ce)]:
  - @toptal/picasso-provider@1.1.3
  - @toptal/picasso-shared@8.2.1

## 25.2.0

### Minor Changes

- [#2776](https://github.com/toptal/picasso/pull/2776) [`18e33252`](https://github.com/toptal/picasso/commit/18e3325295032e5eff6dd5c6ba052f5cd8d55778) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### RichTextEditor

  - quill editor is lazy-loaded using React.lazy and React.Suspense
  - [quill](https://www.npmjs.com/package/quill) is no longer part of main bundle

## 25.1.1

### Patch Changes

- [#2793](https://github.com/toptal/picasso/pull/2793) [`9aa6250e`](https://github.com/toptal/picasso/commit/9aa6250eef419aa4cf873390fd573882854fa162) Thanks [@denieler](https://github.com/denieler)! - Fix file circularity issues

## 25.1.0

### Minor Changes

- [#2758](https://github.com/toptal/picasso/pull/2758) [`846d3180`](https://github.com/toptal/picasso/commit/846d3180f3285593a1d77cd824711b2b1e84e2ea) Thanks [@iatanas0v](https://github.com/iatanas0v)! - ### Input

  - show success icon at the bottom of multiline input

## 25.0.0

### Major Changes

- [#2765](https://github.com/toptal/picasso/pull/2765) [`34fa989f`](https://github.com/toptal/picasso/commit/34fa989f7514ffb50fc1cc6425c92499c1812fe5) Thanks [@sashuk](https://github.com/sashuk)! - ---

  ### Badge

  - badge is not hidden when the content is zero

## 24.2.0

### Minor Changes

- [#2754](https://github.com/toptal/picasso/pull/2754) [`6c3226e9`](https://github.com/toptal/picasso/commit/6c3226e9348065a243cce14477ae1c115189525d) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### PageSidebar

  - Update dropdown menus with new adjustments made to BASE

### Patch Changes

- [#2753](https://github.com/toptal/picasso/pull/2753) [`c49d9073`](https://github.com/toptal/picasso/commit/c49d90735837b121c34da9681958a31b9dfcce6a) Thanks [@konstrybakov](https://github.com/konstrybakov)! - SSR compatibility updates

- Updated dependencies [[`c49d9073`](https://github.com/toptal/picasso/commit/c49d90735837b121c34da9681958a31b9dfcce6a)]:
  - @toptal/picasso-provider@1.1.2

## 24.1.0

### Minor Changes

- [#2752](https://github.com/toptal/picasso/pull/2752) [`db28ce62`](https://github.com/toptal/picasso/commit/db28ce62875388f82b00171b0edf7f6bfacfc165) Thanks [@pudek357](https://github.com/pudek357)! - ---

  ### Dropdown

  - Add `keepMounted` prop

## 24.0.0

### Major Changes

- [#2747](https://github.com/toptal/picasso/pull/2747) [`2c452cb0`](https://github.com/toptal/picasso/commit/2c452cb0a781613eb4d38be09ffa49423381b39e) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Sidebar

  - Renamed to PageSidebar
  - No longer is exported from Picasso, the only way to use it now it's as `Page.Sidebar`
  - Now has a collapsible property that allows one to collapse the sidebar on the side

  ### SidebarItem

  - Add an special property `badge` for controlling badges on Menu items, it becomes an overlay when the sidebar is collapsed
  - Add tooltips for Menu items when collapsed
  - Change sub-menus to a dropdown when in compact mode

  ### SidebarContext

  - Removed direct access to `SidebarContext.Provider` and `SidebarContext.Consumer`. Now you need to use the new component `SidebarContextProvider` and the new hook `useSidebarContext` and their respective places

## 23.0.0

### Major Changes

- [#2714](https://github.com/toptal/picasso/pull/2714) [`c3392de3`](https://github.com/toptal/picasso/commit/c3392de3498af2cfd630905d5342cd0bc96f4635) Thanks [@separatio](https://github.com/separatio)! - ---

  ### MenuItem

  - remove the size prop completely
  - change gutters size and add a small radius

## 22.4.2

### Patch Changes

- [#2741](https://github.com/toptal/picasso/pull/2741) [`deed54dd`](https://github.com/toptal/picasso/commit/deed54dd5906689df45931d5bc146172cbddc3f6) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### DatePicker

  - Update to latest design

## 22.4.1

### Patch Changes

- [#2732](https://github.com/toptal/picasso/pull/2732) [`93527039`](https://github.com/toptal/picasso/commit/93527039cbc64d47b9ef9dd46ea3be95ae01fe37) Thanks [@vshyrokov](https://github.com/vshyrokov)! - ---

  ### Alert

  - Remove duplicated className

## 22.4.0

### Minor Changes

- [#2699](https://github.com/toptal/picasso/pull/2699) [`cfd5ad5c`](https://github.com/toptal/picasso/commit/cfd5ad5c4bea8a5ee10e98ecf6d211c9cb73efe3) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Select

  - introduce new prop `disablePortal` to allow using search input inside Drawer

- [#2701](https://github.com/toptal/picasso/pull/2701) [`7d7a17b2`](https://github.com/toptal/picasso/commit/7d7a17b2748364a7880691cfec7b84162380ae11) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### AlertInline

  - Updated styles to be compliant with BASE design

  ### Icons

  - Add `DoneSolid16`, `DoneSolid24` icons
  - Add `InfoSolid16`, `InfoSolid24` icons
  - Add `darkGreen` color

  ### Typography

  - Add `lightBlue` color

- [#2689](https://github.com/toptal/picasso/pull/2689) [`9a8e2549`](https://github.com/toptal/picasso/commit/9a8e25490123793ee614edb52a59fddf2fe7b423) Thanks [@vshyrokov](https://github.com/vshyrokov)! - ---
  ### Calendar
  - Added custom day, month and container renderers

### Patch Changes

- [#2712](https://github.com/toptal/picasso/pull/2712) [`0ebe078c`](https://github.com/toptal/picasso/commit/0ebe078cd88d4201e677539f308551e95b4f2adc) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Select

  - Enable search input to be focused by click

- [#2715](https://github.com/toptal/picasso/pull/2715) [`a365d67d`](https://github.com/toptal/picasso/commit/a365d67d8d27e2f861a4f7d89e31ef4614e41706) Thanks [@separatio](https://github.com/separatio)! - ---

  - Applied prettier formatting to the whole codebase

- Updated dependencies [[`a365d67d`](https://github.com/toptal/picasso/commit/a365d67d8d27e2f861a4f7d89e31ef4614e41706), [`7d7a17b2`](https://github.com/toptal/picasso/commit/7d7a17b2748364a7880691cfec7b84162380ae11)]:
  - @toptal/picasso-provider@1.1.1
  - @toptal/picasso-shared@8.2.0

## 22.3.2

### Patch Changes

- [#2693](https://github.com/toptal/picasso/pull/2693) [`fc11cd9a`](https://github.com/toptal/picasso/commit/fc11cd9a466f2b965e1ccd786a8b9eda565b1a53) Thanks [@xandmore](https://github.com/xandmore)! - ---

  ### Avatar

  - Applied `image-rendering` css property for `<AvatarImage />`, preventing blur on downscaled images

## 22.3.1

### Patch Changes

- [#2675](https://github.com/toptal/picasso/pull/2675) [`a58b9232`](https://github.com/toptal/picasso/commit/a58b9232a0da30b299db0b0c499f5ba8126285d0) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Pagination

  - Left ellipses were appearing even when not necessary

## 22.3.0

### Minor Changes

- [#2666](https://github.com/toptal/picasso/pull/2666) [`0ffb81ac`](https://github.com/toptal/picasso/commit/0ffb81ac8cd9a865ad3056db2c84428bf1ac99ad) Thanks [@yusufzmly](https://github.com/yusufzmly)! - ---

  ### Drawer

  - Add aria-label attribute to close button

### Patch Changes

- [#2672](https://github.com/toptal/picasso/pull/2672) [`6ef91782`](https://github.com/toptal/picasso/commit/6ef91782fbd76b2e61d0e451e41f3ae93ad84d91) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### Badge

  - Use MUI `max` property instead of our custom.
    When we sended `string` (+9999) to MUIBadge,
    it worked as we expected, but when we passed `number` (150),
    it was always trimmed by default mui `max` +99

## 22.2.2

### Patch Changes

- [#2662](https://github.com/toptal/picasso/pull/2662) [`388e1589`](https://github.com/toptal/picasso/commit/388e1589903e082e1b2cdb7d74a5862055a8c717) Thanks [@sanex3339](https://github.com/sanex3339)! - ---

  ### ModalContent

  - clear `updateShades` debounce on component unmount

## 22.2.1

### Patch Changes

- [#2655](https://github.com/toptal/picasso/pull/2655) [`93b2280d`](https://github.com/toptal/picasso/commit/93b2280d69a59019b89dd073d5994536a39119db) Thanks [@separatio](https://github.com/separatio)! - ---

  ### Select

  - remove `onSearchChange` deprecated prop

## 22.2.0

### Minor Changes

- [#2643](https://github.com/toptal/picasso/pull/2643) [`40b70c1b`](https://github.com/toptal/picasso/commit/40b70c1be90854b02ddcdc8d09116a26b62176f3) Thanks [@sanex3339](https://github.com/sanex3339)! - ---

  ### Tooltip

  - add `followCursor` prop based on implementation from `@material-ui@5+`
  - fix of broken existing event listeners for `Tooltip`'s target when `disableListeners` is `true`

## 22.1.1

### Patch Changes

- [#2633](https://github.com/toptal/picasso/pull/2633) [`f53a174f`](https://github.com/toptal/picasso/commit/f53a174f4295ad33c0ac943aa1a5020f19de8d6b) Thanks [@the-teacher](https://github.com/the-teacher)! - ### Modal

  - `useScrollableShades` hook was covered with tests.
  - With the commit [`c617c7d4`](https://github.com/toptal/picasso/commit/c617c7d4) the hook `useScrollableShades` was fixed to hide bottom shade for zoomed views.

## 22.1.0

### Minor Changes

- [#2605](https://github.com/toptal/picasso/pull/2605) [`ec1ab713`](https://github.com/toptal/picasso/commit/ec1ab7130b28cac2ba7ad1080cb0859743cececb) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### React 18

  update peerDependencies to support React@18

### Patch Changes

- Updated dependencies [[`ec1ab713`](https://github.com/toptal/picasso/commit/ec1ab7130b28cac2ba7ad1080cb0859743cececb)]:
  - @toptal/picasso-provider@1.1.0
  - @toptal/picasso-shared@8.1.0

## 22.0.0

### Major Changes

- [#2561](https://github.com/toptal/picasso/pull/2561) [`eae1c46f`](https://github.com/toptal/picasso/commit/eae1c46fbaedbbebd1928dd704002e9a11b13264) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Badge

  - Merged with OverlayBadge, now if has children it should work the same way as OverlayBadge
  - Style was also updated to better follow BASE 2.0

  ### OverlayBadge

  - Removed in favor of Badge

## 21.2.0

### Minor Changes

- [#2588](https://github.com/toptal/picasso/pull/2588) [`ace2ae7c`](https://github.com/toptal/picasso/commit/ace2ae7c1e2771fd87985e0e62eaf8dc71d3c424) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### RichTextEditor

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage

### Patch Changes

- [#2589](https://github.com/toptal/picasso/pull/2589) [`e6ee5341`](https://github.com/toptal/picasso/commit/e6ee5341d2fd75659733f2a91b21a80912840e60) Thanks [@sunRock98](https://github.com/sunRock98)! - ---

  ### DatePicker

  - fixed a bug, that disabled DatePicker when clicked was showing a Calendar

## 21.1.0

### Minor Changes

- [#2547](https://github.com/toptal/picasso/pull/2547) [`070afaeb`](https://github.com/toptal/picasso/commit/070afaebd68da0c42310e0757aa04b7f0d716257) Thanks [@ascrazy](https://github.com/ascrazy)! - ---

  ### DatePicker

  - add `popperProps` prop to let consumers control data-\* attrs of the Popper

### Patch Changes

- [#2597](https://github.com/toptal/picasso/pull/2597) [`7b6d3382`](https://github.com/toptal/picasso/commit/7b6d3382c67f11780dfcb796728ee25ce3273803) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Move `storybook-readme` to devDependencies to reduce bundle size

## 21.0.0

### Major Changes

- [#2569](https://github.com/toptal/picasso/pull/2569) [`e8833df2`](https://github.com/toptal/picasso/commit/e8833df2329c6285840ae02c0d029fe4eebb8247) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Project

  - Update typescript to version 4.6

### Patch Changes

- Updated dependencies [[`e8833df2`](https://github.com/toptal/picasso/commit/e8833df2329c6285840ae02c0d029fe4eebb8247)]:
  - @toptal/picasso-provider@1.0.0
  - @toptal/picasso-shared@8.0.0

## 20.1.0

### Minor Changes

- [#2571](https://github.com/toptal/picasso/pull/2571) [`f75a83ee`](https://github.com/toptal/picasso/commit/f75a83ee4ff5e067a87d8ca3606df6eb54d33a65) Thanks [@rhuankarlus](https://github.com/rhuankarlus)! - ---

  ### FileInput

  - Added the `onFocus` and `onBlur` events to the `FileInput` component.

## 20.0.1

### Patch Changes

- [#2566](https://github.com/toptal/picasso/pull/2566) [`52f992fe`](https://github.com/toptal/picasso/commit/52f992fe194db50ac9de1a7ba3667a388812e7f9) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### RichText

  Handle empty children of ReactNode.

## 20.0.0

### Major Changes

- [#2572](https://github.com/toptal/picasso/pull/2572) [`1ba287fa`](https://github.com/toptal/picasso/commit/1ba287fa839146f347d7fba8842368f8cd2bbb0e) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### Tooltip

  - `variant` prop has been removed according to BASE 2.0 designs. From now on, tooltip background color will change according to `compact` prop usage.

## 19.4.1

### Patch Changes

- [#2563](https://github.com/toptal/picasso/pull/2563) [`8f3f3363`](https://github.com/toptal/picasso/commit/8f3f3363bb586c77249731f9117dbdd74276b7b7) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  - replaced `useIsomorphicLayoutEffect` with `useEffect` where it was a better fit

## 19.4.0

### Minor Changes

- [#2536](https://github.com/toptal/picasso/pull/2536) [`0950255b`](https://github.com/toptal/picasso/commit/0950255bf20899b1e6e22f9fa1e7c5e0c79022e6) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  - Input components which use `error` prop are updated. It is still being supported but it will be deprecated and totally replaced with `status` in the next major release.

  ### Autocomplete

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage

  ### DatePicker

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage

  ### Input

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage
  - added new functionality to display valid state green-check icon inside input field when `status="success"`

  ### NativeSelect

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage

  ### NonNativeSelect

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage

  ### NumberInput

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage
  - added new functionality to display valid state green-check icon inside input field when `status="success"`

  ### PasswordInput

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage
  - added new functionality to display valid state green-check icon inside input field when `status="success"`

  ### Select

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage

  ### TagSelector

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage
  - added new functionality to display valid state green-check icon inside input field when `status="success"`

  ### TimePicker

  - added new prop `status` to indicate the status of input field
  - added deprecation warning for `error` prop usage

## 19.3.0

### Minor Changes

- [#2312](https://github.com/toptal/picasso/pull/2312) [`f433783c`](https://github.com/toptal/picasso/commit/f433783cf6e565ee84dd08fe5abcb868b12ac070) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### RichTextEditor

  Added new component to enable writting formatted text.

## 19.2.0

### Minor Changes

- [#2546](https://github.com/toptal/picasso/pull/2546) [`9a075e8a`](https://github.com/toptal/picasso/commit/9a075e8af6ff2d3775cdf8eb2bda0490c1e75ae0) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### Tabs.Tab

  - when using `icon`, underline is extended under it

## 19.1.1

### Patch Changes

- [#2543](https://github.com/toptal/picasso/pull/2543) [`c25d0953`](https://github.com/toptal/picasso/commit/c25d0953ff819f7e6e82ad8a3cee8b4467ec3889) Thanks [@hmschreiner](https://github.com/hmschreiner)! - ---

  ### OverlayBadge

  - Fix line-height on small variant

## 19.1.0

### Minor Changes

- [#2521](https://github.com/toptal/picasso/pull/2521) [`fc9b34cc`](https://github.com/toptal/picasso/commit/fc9b34ccad04a2e7926a84eb1d710350f1d663d5) Thanks [@deniskaber](https://github.com/deniskaber)! - Change useLayoutEffect to useIsomorphicLayoutEffect for SSR support

### Patch Changes

- Updated dependencies [[`fc9b34cc`](https://github.com/toptal/picasso/commit/fc9b34ccad04a2e7926a84eb1d710350f1d663d5)]:
  - @toptal/picasso-shared@7.3.0
  - @toptal/picasso-provider@0.7.1

## 19.0.1

### Patch Changes

- [#2509](https://github.com/toptal/picasso/pull/2509) [`6e29b84f`](https://github.com/toptal/picasso/commit/6e29b84f03daad28abe899f98f819cec2fefbb0a) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Select

  - fix null pointer exception when using keyboard controls on an empty select

## 19.0.0

### Major Changes

- [#2481](https://github.com/toptal/picasso/pull/2481) [`4e9c01c7`](https://github.com/toptal/picasso/commit/4e9c01c722fa138d8d8c820240853f2d206e1b58) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Rating

  - Rename `Rating` to `Rating.Stars` and its `picasso-forms` counterpart, `Form.Rating`
    to `Form.Rating.Stars`, as to better reflect the nomenclature in BASE, and to
    consistently accomodate new variants, like the recently implemented `Rating.Thumbs`

### Minor Changes

- [#2499](https://github.com/toptal/picasso/pull/2499) [`8a371aef`](https://github.com/toptal/picasso/commit/8a371aefeee0022396800b108c1b1d297b2ee86d) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ---

  ### RichText

  new util function `htmlToHast` to enable pass output of `RichTextEditor`
  directly to `RichText`. Check new story of [RichText](https://picasso.toptal.net/?path=/story/components-richtext--richtext) for example.

## 18.13.1

### Patch Changes

- Updated dependencies [[`d82ed00d`](https://github.com/toptal/picasso/commit/d82ed00d8ab94b77654f2b3be4776aa514c44daa)]:
  - @toptal/picasso-provider@0.7.0
  - @toptal/picasso-shared@7.2.4

## 18.13.0

### Minor Changes

- [#2485](https://github.com/toptal/picasso/pull/2485) [`b8cf916d`](https://github.com/toptal/picasso/commit/b8cf916db7b4e64feb4afda3f1488690f0aefee4) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### Link

  - Aligned color for visited state with BASE. Changed to `#6727cf`

## 18.12.0

### Minor Changes

- [#2476](https://github.com/toptal/picasso/pull/2476) [`c2e71484`](https://github.com/toptal/picasso/commit/c2e714841c17d90cf075630a8c4bffab92741ff5) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### FieldRequirements

  - add new input component to list requirements

  ### FormField

  - add new prop to pass field requirements as a ReactNode

## 18.11.0

### Minor Changes

- [#2404](https://github.com/toptal/picasso/pull/2404) [`2eedad81`](https://github.com/toptal/picasso/commit/2eedad81d89f516c62e2e6a4da049ec3fc1fd10d) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ---

  ### ShowMore

  - Accepts ReactNode as children

  It uses native functionality from `react-truncate`. In shortened state
  it converts children to string which is then truncated to set number of
  `rows`. That means any **formatting will be lost until the content is
  expanded**.

  - Accepts 0 in `rows` prop

  Previously, setting any falsy value to rows resulted into content
  being expanded. Now when you explicitly set rows to 0, no content
  is shown and only "Show more" button is there to display the content.

## 18.10.0

### Minor Changes

- [#2478](https://github.com/toptal/picasso/pull/2478) [`cd39e12b`](https://github.com/toptal/picasso/commit/cd39e12b96e88d870e7470310291cbb7b9a89ce3) Thanks [@dulishkovych](https://github.com/dulishkovych)! - ---
  ### StepLabel
  - make Stepper responsive by hiding stepper labels on small screens (using media queries)

### Patch Changes

- [#2451](https://github.com/toptal/picasso/pull/2451) [`53efb37c`](https://github.com/toptal/picasso/commit/53efb37cc242cff904a06eb793b5ded47945204e) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Applies to all Components

  - fix linting errors

  ### package.json

  - update `davinci` to `v11.11.0`
  - update `cypress` to `v9.5.0`
  - add `webpack` `v4.0.0` to resolutions

- Updated dependencies [[`53efb37c`](https://github.com/toptal/picasso/commit/53efb37cc242cff904a06eb793b5ded47945204e), [`53efb37c`](https://github.com/toptal/picasso/commit/53efb37cc242cff904a06eb793b5ded47945204e)]:
  - @toptal/picasso-provider@0.6.1
  - @toptal/picasso-shared@7.2.3

## 18.9.0

### Minor Changes

- [#2467](https://github.com/toptal/picasso/pull/2467) [`77a7efc5`](https://github.com/toptal/picasso/commit/77a7efc590eae2a5c48edce7a2ac58baf386f60c) Thanks [@separatio](https://github.com/separatio)! - ---

  ### NumberInput

  - Extracted NumberInputEndAdornment
  - Fixed design inconsistencies
  - Added 'large' size icons for NumberInputEndAdornment

## 18.8.0

### Minor Changes

- [#2462](https://github.com/toptal/picasso/pull/2462) [`e425ab4b`](https://github.com/toptal/picasso/commit/e425ab4b01c76059f4ef98c2d50d27adefe2d25f) Thanks [@ozgurkececioglu](https://github.com/ozgurkececioglu)! - ---

  ### PasswordInput

  - add new input component with a toggle for showing/hiding the password

  ### NumberInput

  - fix styling for control buttons

## 18.7.0

### Minor Changes

- [#2437](https://github.com/toptal/picasso/pull/2437) [`ef6eecb0`](https://github.com/toptal/picasso/commit/ef6eecb07094b69a4938213c5107685c4887c539) Thanks [@augustobmoura](https://github.com/augustobmoura)! - ---

  ### Rating.Thumbs

  - add new component for Rating on positive (thumbs up) and negative (thumbs down) feedback

## 18.6.0

### Minor Changes

- [#2459](https://github.com/toptal/picasso/pull/2459) [`d5aa8112`](https://github.com/toptal/picasso/commit/d5aa811242cb52a8109d5ba80e85ef4f9d0e8fd3) Thanks [@separatio](https://github.com/separatio)! - ---

  ### NumberInput

  - added `large` size

## 18.5.2

### Patch Changes

- [#2465](https://github.com/toptal/picasso/pull/2465) [`2cb23f53`](https://github.com/toptal/picasso/commit/2cb23f530d28c5c4f32126fe3e1540972bb7facf) Thanks [@sanex3339](https://github.com/sanex3339)! - ### Stepper

  - change `Stepper` background color to `inherit`

## 18.5.1

### Patch Changes

- [#2457](https://github.com/toptal/picasso/pull/2457) [`9a4dd244`](https://github.com/toptal/picasso/commit/9a4dd24417197a9bf030181a150ff3053d12edc0) Thanks [@sanex3339](https://github.com/sanex3339)! - - chore(date-picker): fix an invalid displayed date after clicking in DatePicker when timezone is passed

## 18.5.0

### Minor Changes

- [#2442](https://github.com/toptal/picasso/pull/2442) [`11576821`](https://github.com/toptal/picasso/commit/11576821ab8be61b7c22ca2cb44f9e643f334753) Thanks [@separatio](https://github.com/separatio)! - ---

  ### Input

  - added `large` size

  ### Select

  - added `large` size

## 18.4.1

### Patch Changes

- [#2449](https://github.com/toptal/picasso/pull/2449) [`e6f05363`](https://github.com/toptal/picasso/commit/e6f05363cc6f7a49a1f2b95d7ea85662b4724389) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ### RichText

  Downgrade version of `hast-to-hyperscript` to version without ESM to fix jest tests in all other projects

## 18.4.0

### Minor Changes

- [#2419](https://github.com/toptal/picasso/pull/2419) [`67c6d803`](https://github.com/toptal/picasso/commit/67c6d803e5db2349c21e279a105b4bdd326bae0e) Thanks [@TomasSlama](https://github.com/TomasSlama)! - ### RichText

  New component that accepts AST and renders Picasso components. AST needs to be in [HAST format](https://github.com/syntax-tree/hast)

## 18.3.1

### Patch Changes

- [#2440](https://github.com/toptal/picasso/pull/2440) [`ac198e4a`](https://github.com/toptal/picasso/commit/ac198e4adfa0560dc93feac78910dbb0811ff139) Thanks [@mupkoo](https://github.com/mupkoo)! - ### Info Icon

  Update `Info` icon to the new one from Product Iconography

## 18.3.0

### Minor Changes

- [#2421](https://github.com/toptal/picasso/pull/2421) [`e652eb11`](https://github.com/toptal/picasso/commit/e652eb11fd514ca038503f30f3a1ad921e291e85) Thanks [@RusPosevkin](https://github.com/RusPosevkin)! - ---

  ### PageTopBar

  - add custom logo with the new `logo` prop

## 18.2.0

### Minor Changes

- [#2426](https://github.com/toptal/picasso/pull/2426) [`906b2015`](https://github.com/toptal/picasso/commit/906b20156bf876ab0dba728ca62b581c2d56f0e8) Thanks [@sergiubutnarasu](https://github.com/sergiubutnarasu)! - Disable dropzone when multiple property is false and a file is already selected.

## 18.1.0

### Minor Changes

- [#2413](https://github.com/toptal/picasso/pull/2413) [`65c762e1`](https://github.com/toptal/picasso/commit/65c762e1c1646737b37f575e21ffb63209decbde) Thanks [@separatio](https://github.com/separatio)! - ---

  ### FormLabel

  - added size prop with `medium` and `large` values

## 18.0.0

### Major Changes

- [#2409](https://github.com/toptal/picasso/pull/2409) [`163d5609`](https://github.com/toptal/picasso/commit/163d56095fd29689e9700cabbc06fb36692bf710) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Common

  - Move `picasso-lab` components to `picasso`

### Patch Changes

- [#2408](https://github.com/toptal/picasso/pull/2408) [`802b673c`](https://github.com/toptal/picasso/commit/802b673cc3042d9dd79da0e029346dda40fa2001) Thanks [@denys-medynskyi](https://github.com/denys-medynskyi)! - ---

  ### PageFooter

  - make copyright text customizable in `PageFooter`

## 17.4.1

### Patch Changes

- [#2385](https://github.com/toptal/picasso/pull/2385) [`782623fc`](https://github.com/toptal/picasso/commit/782623fc0ff41ad4835dc3db32b4e1f3524929d7) Thanks [@denieler](https://github.com/denieler)! - ---

  ### Menu.Item

  - fixed [underline styling](https://toptal-core.slack.com/archives/CCC3GP6CC/p1642067846008000) when used as a Link by replacing passed Link as `as` prop with HTML anchor.

## 17.4.0

### Minor Changes

- [#2388](https://github.com/toptal/picasso/pull/2388) [`2845cd0d`](https://github.com/toptal/picasso/commit/2845cd0d753fc91c836c2b793f194b3868de69e9) Thanks [@vshyrokov](https://github.com/vshyrokov)! - `ShowMore` component now displays line breaks in truncated state

## 17.3.3

### Patch Changes

- [#2375](https://github.com/toptal/picasso/pull/2375) [`16574dee`](https://github.com/toptal/picasso/commit/16574dee549095cc06deccccdbcfb4c7a073a601) Thanks [@LashaJini](https://github.com/LashaJini)! - ---

  ### Select

  - Change **options** according to the [BASE design](https://share.goabstract.com/6869aded-577c-4c63-b959-40650701ff51?mode=design&sha=4f1f6493dfac89015cc6c71ea348807e931fe3bc).
    - Add new shadow
    - Update paddings

  ### Autocomplete

  - Change **options** according to the [BASE design](https://share.goabstract.com/6869aded-577c-4c63-b959-40650701ff51?mode=design&sha=4f1f6493dfac89015cc6c71ea348807e931fe3bc).
    - Add new shadow
    - Update paddings

- Updated dependencies [[`16574dee`](https://github.com/toptal/picasso/commit/16574dee549095cc06deccccdbcfb4c7a073a601)]:
  - @toptal/picasso-provider@0.6.0
  - @toptal/picasso-shared@7.2.2

## 17.3.2

### Patch Changes

- [#2383](https://github.com/toptal/picasso/pull/2383) [`3141521b`](https://github.com/toptal/picasso/commit/3141521ba1bd5eb6aaee9ae2749eb490959e6e7b) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Update `picasso-provider` to the latest version

- Updated dependencies [[`3141521b`](https://github.com/toptal/picasso/commit/3141521ba1bd5eb6aaee9ae2749eb490959e6e7b)]:
  - @toptal/picasso-shared@7.2.1

## 17.3.1

### Patch Changes

- [#2370](https://github.com/toptal/picasso/pull/2370) [`574db0fc`](https://github.com/toptal/picasso/commit/574db0fc37cfa305005e65bce2abe311cde75271) Thanks [@bogdanalexe90](https://github.com/bogdanalexe90)! - fix(section): [SPC-1575] allow ellipsis in title and subtitle content

## 17.3.0

### Minor Changes

- [#2362](https://github.com/toptal/picasso/pull/2362) [`df144e2d`](https://github.com/toptal/picasso/commit/df144e2d5defed03aeabb89cb1654f3d7ace7bfa) Thanks [@denieler](https://github.com/denieler)! - Deleting the fixed version of the reference to `picasso-provider` package to allow more flexible version management for `picasso-provider` package in projects.

### Patch Changes

- Updated dependencies [[`df144e2d`](https://github.com/toptal/picasso/commit/df144e2d5defed03aeabb89cb1654f3d7ace7bfa)]:
  - @toptal/picasso-shared@7.2.0

## 17.2.2

### Patch Changes

- [#2356](https://github.com/toptal/picasso/pull/2356) [`11744a28`](https://github.com/toptal/picasso/commit/11744a28c81e36d01af4111bae2a70e33427ffa2) Thanks [@sanex3339](https://github.com/sanex3339)! - ### Select

  - Typing special symbols after clicking on Select component now triggers focus to its search input

## 17.2.1

### Patch Changes

- [#2351](https://github.com/toptal/picasso/pull/2351) [`045c1c84`](https://github.com/toptal/picasso/commit/045c1c84ceaaa6155674923faf2f41477027b85f) Thanks [@ascrazy](https://github.com/ascrazy)! - ## List

  - set List's root element font-size to 1rem to fix unordered list bullets alignment

## 17.2.0

### Minor Changes

- [#2348](https://github.com/toptal/picasso/pull/2348) [`9fcad1bb`](https://github.com/toptal/picasso/commit/9fcad1bb62f2c23825cc7fc52ade8c098fbcd491) Thanks [@ascrazy](https://github.com/ascrazy)! - ## TreeNodeAvatar

  - Add objectFit prop to control image fitting

* [#2340](https://github.com/toptal/picasso/pull/2340) [`1aebe81f`](https://github.com/toptal/picasso/commit/1aebe81f2bc4a80145b20ea3c0447ae052c71fa4) Thanks [@sanex3339](https://github.com/sanex3339)! - Fixed Popper overflow when inside Modal

## 17.1.1

### Patch Changes

- [#2339](https://github.com/toptal/picasso/pull/2339) [`a4fdc617`](https://github.com/toptal/picasso/commit/a4fdc617ac1278499573d17926b249ced845b7f7) Thanks [@joantalarn](https://github.com/joantalarn)! - Fix of text color of disabled form input. The new color is grey.main2 (#84888E).

## 17.1.0

### Minor Changes

- [#2336](https://github.com/toptal/picasso/pull/2336) [`4370e2d8`](https://github.com/toptal/picasso/commit/4370e2d84c3768719a530c621eefae835e163e73) Thanks [@ascrazy](https://github.com/ascrazy)! - ## TreeView

  - Fix PointLink positioning to avoid unexpected 0.5px shifts

## 17.0.0

### Major Changes

- [#2308](https://github.com/toptal/picasso/pull/2308) [`ce7be40f`](https://github.com/toptal/picasso/commit/ce7be40fbfb04536058cc94b03ccf86f7125529b) Thanks [@LashaJini](https://github.com/LashaJini)! - ### Container

  [Picasso Container Component](https://picasso.toptal.net/?path=/story/layout-container--container)

  `packages/picasso/src/Container`

  - Colored container variants - `red`, `green`, `yellow`, `blue`, `grey` -
    **cannot** have borders.
  - Container variants - `white`, `transparent` - **can** have borders.
  - User will see error in IDE if `bordered` is used with anything except `white`
    and `transparent` variants.

  **Valid cases:**

  ```jsx
  <Container bordered>some text</Container>
  <Container variant='white' bordered>some text</Container>
  <Container variant='transparent' bordered>some text</Container>
  ```

  **Invalid cases:**

  ```jsx
  <Container variant='red' bordered>some text</Container>
  <Container variant='non-existing-color' bordered>some text</Container>
  ```

* [#2295](https://github.com/toptal/picasso/pull/2295) [`b9859b6c`](https://github.com/toptal/picasso/commit/b9859b6c246f582d336250b7df45e6c284902299) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - ### Changing sizes in `Typography` for `body` variant.

  **Reason behind it:**

  In multiple Picasso components (`TableCell`, `Tab`, `Notification`, `Tooltip`)
  was used a type of `font-size: 13px; line-height: 20px` but it wasn't officially
  part of BASE `Typography` component, so it had to be styled manually in multiple places creating duplicates.

  **Solution**

  Introduced new size type (**13px/20px**) named `small`.

  This change pushed other size types down, making:

  > `small` --> `xsmall`
  >
  > `xsmall` --> `xxsmall`

  There is a [codemod for v17.0.0](https://github.com/toptal/picasso/tree/master/packages/picasso-codemod#v1700)
  named `typography-sizes` to help you with this transition.
  Note that this codemod also changes props in `TypographyOverflow` and `Amount` component as they are both wrappers for `Typography`.

  > If you use custom wrapper components for `Typography`,
  > you can include them in codemod via `--parser-config` param.
  >
  > Read more inside [README](https://github.com/toptal/picasso/tree/master/packages/picasso-codemod#v1700)

  **Other consequences**

  - This update also changed line-height in `Tooltip` from previous **19.5px** to **20px**
    and fixed `compact` variant's height to **24px** to comply with BASE
  - Table header height for `compact` spacing changed to **24px** (from previous 26.5px)
  - There is also a **change in `TableCell` structure**.
    Now its children are wrapped by `Typography` component.
    It looks basically like this:

  ```diff
  <MUITableCell>
  + <Typography as='div' size='small'>
      {children}
  + </Typography>
  </MUITableCell>
  ```

  Please bare in mind this may cause some unexpected issues, if you rely on table-cell properties in your children.

### Minor Changes

- [#2304](https://github.com/toptal/picasso/pull/2304) [`6446e620`](https://github.com/toptal/picasso/commit/6446e620808fed2a411fc124821c4cc896add734) Thanks [@yusufzmly](https://github.com/yusufzmly)! - Add isBrowser utils function and Fix NumberInput and Tooltip component for SSR

### Patch Changes

- Updated dependencies [[`6446e620`](https://github.com/toptal/picasso/commit/6446e620808fed2a411fc124821c4cc896add734)]:
  - @toptal/picasso-provider@0.5.0
  - @toptal/picasso-shared@7.1.1

## 16.4.0

### Minor Changes

- [#2318](https://github.com/toptal/picasso/pull/2318) [`9f6579ad`](https://github.com/toptal/picasso/commit/9f6579ad97304aaa39ef3a388fda6b0ac1a4c2f6) Thanks [@pudek357](https://github.com/pudek357)! - increase maxHeight for ScrollMenu

* [#2315](https://github.com/toptal/picasso/pull/2315) [`ee92ee0c`](https://github.com/toptal/picasso/commit/ee92ee0cdb2aa0d4b679b25cb1b34be48d5c7a71) Thanks [@ascrazy](https://github.com/ascrazy)! - \* Add `transitionProps` prop for the `Modal`
  - Add `transitionProps` prop for the `Accordion`

### Patch Changes

- Updated dependencies [[`ee92ee0c`](https://github.com/toptal/picasso/commit/ee92ee0cdb2aa0d4b679b25cb1b34be48d5c7a71)]:
  - @toptal/picasso-shared@7.1.0

## 16.3.1

### Patch Changes

- [#2314](https://github.com/toptal/picasso/pull/2314) [`26117318`](https://github.com/toptal/picasso/commit/26117318ef455be1d4c97acfb61deacdeb9ea3a3) Thanks [@tamatomas](https://github.com/tamatomas)! - Fix `Modal`'s close button overflow by adding the right padding to `Modal.Title`.

## 16.3.0

### Minor Changes

- [#2301](https://github.com/toptal/picasso/pull/2301) [`7c9cc79b`](https://github.com/toptal/picasso/commit/7c9cc79b007f546c310684000cbbc6b1870516a9) Thanks [@george-aidonidis](https://github.com/george-aidonidis)! - Add visited state for Link component.

* [#2292](https://github.com/toptal/picasso/pull/2292) [`bc7427db`](https://github.com/toptal/picasso/commit/bc7427dbf53fef3e1f1a60c0d9edf57c997ce019) Thanks [@ascrazy](https://github.com/ascrazy)! - ## TreeView

  - Deprecate `centerTranslation` and `transitionDuration` props from component public API
  - Minor fixes to relative positioning of the nodes and root node center detection

  ## StaticTreeView

  Add new TreeView-like component that renders without d3-zoom in it and auto-resizes SVG to always fit all of the content

## 16.2.0

### Minor Changes

- [#2285](https://github.com/toptal/picasso/pull/2285) [`be64ee77`](https://github.com/toptal/picasso/commit/be64ee77b10b683ec04a4ca9a702b94e6590f9a4) Thanks [@LashaJini](https://github.com/LashaJini)! - ### List

  Components changed:

  [Picasso List Component](https://picasso.toptal.net/?path=/story/components-list--list)

  `packages/picasso/src/List` and `packages/picasso/src/ListItem` (List.Item)

  - Unordered list item's bullet has dark gray `#455065` color.
  - Line height of list item is `22px`.
  - Spacing between list items is increased to `8px`.
  - Ordered list item's bullet numbers cannot exceed 2 digits, thus, the maximum
    number of characters are 3: `00.`, with maximum width of `20px`, which leaves
    us with `12px` margin to the right.

* [#2310](https://github.com/toptal/picasso/pull/2310) [`1c5807b1`](https://github.com/toptal/picasso/commit/1c5807b12b35bc85d7700cacd1519a267eb7280f) Thanks [@buithehoa](https://github.com/buithehoa)! - Update support phone number.

## 16.1.0

### Minor Changes

- [#2305](https://github.com/toptal/picasso/pull/2305) [`ba2ddd61`](https://github.com/toptal/picasso/commit/ba2ddd610e44ac0b6776436858ec3976343f5d65) Thanks [@denieler](https://github.com/denieler)! - - Pass `onClose` to the notifications opened by `use-notification` hooks.

## 16.0.0

### Major Changes

- [#2300](https://github.com/toptal/picasso/pull/2300) [`4953df3d`](https://github.com/toptal/picasso/commit/4953df3d2642c704b404ff565e63c3d53b415832) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Reverting naming of colors back to concrete colors for `Tag`, `Tag.Rectangular`, `Indicator`

  We are not ready yet to switch to abstract color names in the whole application,
  maybe we will come back to it when we will need to make Picasso themeable.

  To revert most of the cases you can use [codemod for v16.0.0](https://github.com/toptal/picasso/tree/master/packages/picasso-codemod#v1600)

  ```diff
  -<Tag variant='positive' />
  +<Tag variant='green' />

  -<Tag.Rectangular variant='positive' />
  +<Tag.Rectangular variant='green' />

  -<Tag.Rectangular indicator='positive' />
  +<Tag.Rectangular indicator='green' />

  -<Indicator color='positive' />
  +<Indicator color='green' />
  ```

## 15.2.0

### Minor Changes

- [#2297](https://github.com/toptal/picasso/pull/2297) [`0dcd4178`](https://github.com/toptal/picasso/commit/0dcd4178c581d7b390834e2f34c9cb661771c841) Thanks [@teimurjan](https://github.com/teimurjan)! - Fixed the bug in Select when a disabled & selected option is highlighted initially.

## 15.1.1

### Patch Changes

- [#2272](https://github.com/toptal/picasso/pull/2272) [`9548a15d`](https://github.com/toptal/picasso/commit/9548a15d541dd4b5505d11e32f0c7557297613e4) Thanks [@konstrybakov](https://github.com/konstrybakov)! - Adding documentation for Server Side Rendering and related utility function `getServersideStylesheets`

- Updated dependencies [[`9548a15d`](https://github.com/toptal/picasso/commit/9548a15d541dd4b5505d11e32f0c7557297613e4)]:
  - @toptal/picasso-provider@0.4.1

## 15.1.0

### Minor Changes

- [#2290](https://github.com/toptal/picasso/pull/2290) [`3d484420`](https://github.com/toptal/picasso/commit/3d48442096da95eabdbf74b3975fea9050a794bd) Thanks [@diogolessa](https://github.com/diogolessa)! - [COMM-475] Add flash24 icon

### Patch Changes

- [#2289](https://github.com/toptal/picasso/pull/2289) [`36fc6c72`](https://github.com/toptal/picasso/commit/36fc6c72f1edd39314f6ca1ac559a28c8ffc5b8c) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Fix styling of `Tag` when wrapped by `Tooltip`

## 15.0.2

### Patch Changes

- [#2286](https://github.com/toptal/picasso/pull/2286) [`2ba6a7ec`](https://github.com/toptal/picasso/commit/2ba6a7ecba690f2a86de2d85f0cf1fc7b15776e6) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Added separate testid for Autocomplete autofill input

* [#2288](https://github.com/toptal/picasso/pull/2288) [`1ed32e74`](https://github.com/toptal/picasso/commit/1ed32e745766ba1d8675fa309207d20f6791e7da) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Added separate testid for Autocomplete autofill input

## 15.0.1

### Patch Changes

- [#2283](https://github.com/toptal/picasso/pull/2283) [`11ff9181`](https://github.com/toptal/picasso/commit/11ff9181ce0abb580fe1cf9cef711e0b29e0c934) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Fixed error with passing testIds into the TagSelectorInput

## 15.0.0

### Major Changes

- [#2280](https://github.com/toptal/picasso/pull/2280) [`88b091e2`](https://github.com/toptal/picasso/commit/88b091e2be71bb5aeae51a051d3653ccb10512bc) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Removed fontSize prop from the Link
  The Link fontSize should be controlled by the wrapper e.g. Typography

* [#2226](https://github.com/toptal/picasso/pull/2226) [`6619b3d8`](https://github.com/toptal/picasso/commit/6619b3d8011b1dae26032a4144e3228d07dc9544) Thanks [@LashaJini](https://github.com/LashaJini)! - Removed static `data-testid` values and replaced them with dynamic ones, which
  means that now you should manually provide values for them.

  ##### Autocomplete

  `picasso/src/Autocomplete/Autocomplete.tsx`

  Has 2 new dynamic `data-testid`s for `Input` and `InputAdornment`. To add
  custom `data-testid`s user should set values for `testIds.input` or
  `testIds.InputAdornment`. For example:

  ```jsx
  <Autocomplete
    testIds={{ input: 'custom-name-1', loadingAdornment: 'custom-name-2' }}
    {...props}
  />
  ```

  ##### PageAutocomplete

  `picasso/src/PageAutocomplete/PageAutocomplete.tsx`

  Has 2 new dynamic `data-testid`s like `Autocomplete` does.

  ##### Menu

  `picasso/src/Menu/Menu.tsx`

  Has 1 new dynamic `data-testid` for `MenuItem`. To add custom `data-testid`
  user should set value for `testIds.menuItem`. For example:

  ```jsx
  <Menu testIds={{ menuItem: 'custom-name-1' }} {...props} />
  ```

  ##### BarChart

  `picasso-charts/src/BarChart/BarChart.tsx`

  Has 1 new dynamic `data-testid` for `Tooltip`. To add custom `data-testitd`
  user should set value for `testIds.tooltip`. For example:

  ```jsx
  <BarChart testIds={{ tooltip: 'custom-name-1' }} {...props} />
  ```

  ##### DatePicker

  `picasso-lab/src/DatePicker/DatePicker.tsx`

  Has 2 new dynamic `data-testid`s for `Input` and `Calendar`. To add custom
  `data-testid` user should set values for `testIds.input` or `testIds.calendar`.
  For example:

  ```jsx
  <DatePicker
    testIds={{ input: 'custom-name-1', calendar: 'custom-name-2' }}
    {...props}
  />
  ```

  ##### Accordion

  `picasso/src/Accordion/Accordion.tsx`

  Has 2 new dynamic `data-testid`s for `EmptyAccordionSummary` and
  `AccordionSummary`. To add custom `data-testid`s user shold set values for
  `testIds.emptyAccordionSummary` or `testIds.accordionSummary`. For example:

  ```jsx
  <Accordion
    testIds={{
      emptyAccordionSummary: 'custom-name-1',
      calendar: 'custom-name-2',
    }}
    {...props}
  />
  ```

  ##### FileListItem

  `picasso/src/FileListItem/FileListItem.tsx`

  Has 1 new dynamic `data-testid` for `ProgressBar`. To add custom `data-testid`
  user should set value for `testIds.progressBar`. For example:

  ```jsx
  <FileListItem testIds={{ progressBar: 'custom-name-1' }} {...props} />
  ```

  ##### OutlinedInput

  `picasso/src/OutlinedInput/OutlinedInput.tsx`

  Has 1 new dynamic `data-testid` for `InputAdornment`. To add custom
  `data-testid` user should set value for `testIds.resetButton`. For example:

  ```jsx
  <OutlinedInput testIds={{ resetButton: 'custom-name-1' }} {...props} />
  ```

  ##### Input

  `picasso/src/Input/Input.tsx`

  Has 2 new dynamic `data-testid`s for `InputAdornment` and for `OutlinedInput`
  component's child component - `InputAdornment`. To add custom `data-testid`
  user should set values for `testIds.inputAdornment` or `testIds.resetButton`.
  For example:

  ```jsx
  <Input
    testIds={{ inputAdornment: 'custom-name-1', resetButton: 'custom-name-2' }}
    {...props}
  />
  ```

  ##### CategoriesChartTooltip

  `topkit-analytics-charts/src/CategoriesChartTooltip/CategoriesChartTooltip.tsx`

  Has 1 new dynamic `data-testid` for `Paper`. To add custom `data-testid` user
  should set value for `testIds.paper`. For example:

  ```jsx
  <CategoriesChartTooltip testIds={{ paper: 'custom-name-1' }} {...props} />
  ```

### Minor Changes

- [#2267](https://github.com/toptal/picasso/pull/2267) [`f081e380`](https://github.com/toptal/picasso/commit/f081e3800513ba85c5c5f7a077b2c472db18c867) Thanks [@yvniTop](https://github.com/yvniTop)! - feat(icon): [CT-2094] Add backspace icons

## 14.1.1

### Patch Changes

- [#2271](https://github.com/toptal/picasso/pull/2271) [`e2417ca8`](https://github.com/toptal/picasso/commit/e2417ca8e4bef621ae9640591eb3fe6e08660df4) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Updated Notification testIds props to be optional

## 14.1.0

### Minor Changes

- [#2262](https://github.com/toptal/picasso/pull/2262) [`d225d195`](https://github.com/toptal/picasso/commit/d225d1956f3cc8ae3507a836f7e4667bf3aaa729) Thanks [@elviocb](https://github.com/elviocb)! - feat(Icons): [SPC-1436] Add new arrow subdirectory icon

### Patch Changes

- [#2268](https://github.com/toptal/picasso/pull/2268) [`78312c45`](https://github.com/toptal/picasso/commit/78312c45170ae975f7c30385f06fa64161cbf29b) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Added data-testid into the Notification

## 14.0.2

### Patch Changes

- [#2261](https://github.com/toptal/picasso/pull/2261) [`a91e6b3c`](https://github.com/toptal/picasso/commit/a91e6b3cc8b30e9c423aee13c34ed75941b64814) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Added aria-disabled prop into the Link, to prevent overriding of aria-disable, by the disabled prop

## 14.0.1

### Patch Changes

- [#2257](https://github.com/toptal/picasso/pull/2257) [`ad250b5b`](https://github.com/toptal/picasso/commit/ad250b5bbbf23168b810f9f67f1ee9cb8cc9818c) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Fixed warnings in the Pagination, caused by incorrect key name for the ellipsis component

## 14.0.0

### Major Changes

- [#2234](https://github.com/toptal/picasso/pull/2234) [`95b61597`](https://github.com/toptal/picasso/commit/95b6159716cef8deeae5bfd816c540ea6d7352a3) Thanks [@vshyrokov](https://github.com/vshyrokov)! - Updated link appearence according to the designs
  - Removed ColorType `Black`
  - Link with ColorType `White`, has underline always
  - Link with ColorType `Blue`, has underline on hover only
  - `textDecoration` property, has a single variant, which is `none`

## 13.7.0

### Minor Changes

- [#2236](https://github.com/toptal/picasso/pull/2236) [`b2332734`](https://github.com/toptal/picasso/commit/b2332734ba730e9c001638bee47d6ce1f3b87a22) Thanks [@michal-bednarz](https://github.com/michal-bednarz)! - Add 'New' icon

* [#2235](https://github.com/toptal/picasso/pull/2235) [`dedc9057`](https://github.com/toptal/picasso/commit/dedc905704f93a3a2f3f024c850f5db55599fdcb) Thanks [@michal-bednarz](https://github.com/michal-bednarz)! - Add Support icon

### Patch Changes

- Updated dependencies [[`34e990a3`](https://github.com/toptal/picasso/commit/34e990a3fe6d66bb204d1d468c505ebe0b8fd127)]:
  - @toptal/picasso-provider@0.4.0
  - @toptal/picasso-shared@7.0.2

## 13.6.1

### Patch Changes

- [#2233](https://github.com/toptal/picasso/pull/2233) [`499d0996`](https://github.com/toptal/picasso/commit/499d099644d3873eb644a448941f12c24c2f2e5a) Thanks [@OleksandrNechai](https://github.com/OleksandrNechai)! - Fixed closing overlay when scrolling in TagSelector and Autocomplete

## 13.6.0

### Minor Changes

- [#2237](https://github.com/toptal/picasso/pull/2237) [`e00c54e7`](https://github.com/toptal/picasso/commit/e00c54e7c56d660c986ae5e096dc6da67ccd48e9) Thanks [@teimurjan](https://github.com/teimurjan)! - Fix option in Select cannot be selected when using number values.

## 13.5.0

### Minor Changes

- [#2219](https://github.com/toptal/picasso/pull/2219) [`07e80d4e`](https://github.com/toptal/picasso/commit/07e80d4ee4275a8717c422c82d062519e232d6dc) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - Introduced size attribute to Picasso Rating component. Default is "small" and newly added is a "large" variant.

### Patch Changes

- [#2217](https://github.com/toptal/picasso/pull/2217) [`d8cb590b`](https://github.com/toptal/picasso/commit/d8cb590b7e181acf0e5534913f13af0655caac62) Thanks [@OndrejTuma](https://github.com/OndrejTuma)! - Updated generate-icons script to use our .prettierrc.js config

## 13.4.2

### Patch Changes

- [#2218](https://github.com/toptal/picasso/pull/2218) [`6a7073f0`](https://github.com/toptal/picasso/commit/6a7073f012bdc60b1ef95f30d0731204802731e4) Thanks [@TomasSlama](https://github.com/TomasSlama)! - Update storybook to latest version and make some small adjusments in components to work properly in the new Storybook.

## 13.4.1

### Patch Changes

- [#2220](https://github.com/toptal/picasso/pull/2220) [`410e267e`](https://github.com/toptal/picasso/commit/410e267e166228f23ca7fd59e16122901b16a578) Thanks [@vshyrokov](https://github.com/vshyrokov)! - add font-size style into the SideBarItem

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [13.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.4...@toptal/picasso@13.4.0) (2021-11-09)

### Features

- **icon:** add dialpad16 icon ([#2211](https://github.com/toptal/picasso/issues/2211)) ([3a7d65b](https://github.com/toptal/picasso/commit/3a7d65b6a931e8b8cb53520edb6bbd472dd6958a))

## [13.3.4](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.3...@toptal/picasso@13.3.4) (2021-11-09)

### Bug Fixes

- **Modal:** [FX-2237] shadows are broken in desktop Safari & iOs ([#2213](https://github.com/toptal/picasso/issues/2213)) ([6ca10bc](https://github.com/toptal/picasso/commit/6ca10bca4658fc3c1f0c5e2d1b65b94894199f21))

## [13.3.3](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.2...@toptal/picasso@13.3.3) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso

## [13.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.1...@toptal/picasso@13.3.2) (2021-11-09)

### Bug Fixes

- **Link:** [FX-2231] fix on hover style ([#2209](https://github.com/toptal/picasso/issues/2209)) ([3b8cf3a](https://github.com/toptal/picasso/commit/3b8cf3aa299597fee95f511e0ce1f84eb5c449f4))

## [13.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@13.3.0...@toptal/picasso@13.3.1) (2021-11-09)

**Note:** Version bump only for package @toptal/picasso

# [13.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.2.1...@toptal/picasso@13.3.0) (2021-11-08)

### Features

- **tag:** [FX-2232] update Tag props type ([#2210](https://github.com/toptal/picasso/issues/2210)) ([199a4cb](https://github.com/toptal/picasso/commit/199a4cb2abd2bd462baf9d68e1cdb447263952f7))

## [13.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@13.2.0...@toptal/picasso@13.2.1) (2021-11-05)

**Note:** Version bump only for package @toptal/picasso

# [13.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.1.1...@toptal/picasso@13.2.0) (2021-11-04)

### Features

- **AvatarGroup:** create new component Avatar.Group ([#2194](https://github.com/toptal/picasso/issues/2194)) ([ffd0ef0](https://github.com/toptal/picasso/commit/ffd0ef0610853b78ef902c41654ebb9d3a2164d5))

## [13.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@13.1.0...@toptal/picasso@13.1.1) (2021-11-04)

**Note:** Version bump only for package @toptal/picasso

# [13.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@13.0.0...@toptal/picasso@13.1.0) (2021-11-03)

### Features

- **prompt modal:** [FX-2217] add data-testid into PromptModal ([#2205](https://github.com/toptal/picasso/issues/2205)) ([72fcf5d](https://github.com/toptal/picasso/commit/72fcf5db09727fd3bd25f31440d437e060dcb667))

# [13.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.4.0...@toptal/picasso@13.0.0) (2021-11-02)

### Code Refactoring

- **Container:** make gap to fuction as other size props ([#2201](https://github.com/toptal/picasso/issues/2201)) ([281de61](https://github.com/toptal/picasso/commit/281de61a52a1f3b500766930e84a7bad2c240b69))

### BREAKING CHANGES

- **Container:** `gap` property accepts different values

# [12.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.3.1...@toptal/picasso@12.4.0) (2021-10-26)

### Features

- **Select:** add disabled option ([#2195](https://github.com/toptal/picasso/issues/2195)) ([9df4459](https://github.com/toptal/picasso/commit/9df4459cf6bed91315f104ab7bdd2c7e8b4263aa))

## [12.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@12.3.0...@toptal/picasso@12.3.1) (2021-10-26)

### Bug Fixes

- ensure Notification has allways alert role ([#2199](https://github.com/toptal/picasso/issues/2199)) ([cfc9330](https://github.com/toptal/picasso/commit/cfc93307b286ee148fc30f21742202468dcfb9cd))

# [12.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.2.2...@toptal/picasso@12.3.0) (2021-10-22)

### Features

- **Typography:** add new size of Typography ([#2196](https://github.com/toptal/picasso/issues/2196)) ([905088b](https://github.com/toptal/picasso/commit/905088bf84f6efd1904fd6c9211bfb090d576481))

## [12.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso@12.2.1...@toptal/picasso@12.2.2) (2021-10-21)

### Bug Fixes

- **Select:** fix invalid highlighting for groups ([#2192](https://github.com/toptal/picasso/issues/2192)) ([2719b5f](https://github.com/toptal/picasso/commit/2719b5f18453372628bfc771eff5913646fb6b82))

## [12.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@12.2.0...@toptal/picasso@12.2.1) (2021-10-19)

### Bug Fixes

- **Autocomplete:** add inputProps type to the definition of Autocomplete props ([#2114](https://github.com/toptal/picasso/issues/2114)) ([704c2e1](https://github.com/toptal/picasso/commit/704c2e11a896dfb6ecc00da3b921f55369811fdf))

# [12.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.1.0...@toptal/picasso@12.2.0) (2021-10-15)

### Features

- **icon:** add bell off icon ([#2188](https://github.com/toptal/picasso/issues/2188)) ([d8585fe](https://github.com/toptal/picasso/commit/d8585fea44b56c58f3a9fd269f10008e044a462c))

# [12.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.3...@toptal/picasso@12.1.0) (2021-10-15)

### Features

- **Avatar:** add default state variant with icon placeholder ([#2181](https://github.com/toptal/picasso/issues/2181)) ([c43b031](https://github.com/toptal/picasso/commit/c43b0310a38a6e738b74327c20aa60bb2f0c97e5))

## [12.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.2...@toptal/picasso@12.0.3) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso

## [12.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.1...@toptal/picasso@12.0.2) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso

## [12.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@12.0.0...@toptal/picasso@12.0.1) (2021-10-14)

**Note:** Version bump only for package @toptal/picasso

# [12.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@11.0.0...@toptal/picasso@12.0.0) (2021-10-14)

### Features

- v12 ([b0a00a0](https://github.com/toptal/picasso/commit/b0a00a0a8d3d92fcd7930a4a0bf0fdc09103ac6c))

### BREAKING CHANGES

- - Stepper - remove fullWidth property

* Link - fontSize changed to 14px, if you are using `Link` inside
  headings or perex, you need to use `size="inherit"` - underline prop was replaced by textDecoration: `'none' | 'underline'`. `'none'` by default.
* Badge - new medium size - previous medium size is now large, - the default value is changed to large - new type of content `content: number` - content higher than or equal to 100 is transformed to 99+ - for small size, the threshold is 10
* ButtonGroup - since button group can have only one style of Button,
  we have Button.Group.Item that should be used
  instead of `<Button variant='secondary' />`
* Tag - users of Tag and Indicator will need to check names of variant

# [11.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.7.0...@toptal/picasso@11.0.0) (2021-10-13)

### Features

- **Typography:** update line heights and colors to match BASE 2.0 ([#2184](https://github.com/toptal/picasso/issues/2184)) ([aacd827](https://github.com/toptal/picasso/commit/aacd8271dd6c6ef5093fef78d4a419c48b046db5))

### BREAKING CHANGES

- **Typography:** - Changed line-height of small heading and body

* Removed blue color from Typography
* Removed blue color from OverviewBlock

# [10.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.6.0...@toptal/picasso@10.7.0) (2021-10-11)

### Features

- **Link:** remove focus borders ([#2182](https://github.com/toptal/picasso/issues/2182)) ([e57b8c3](https://github.com/toptal/picasso/commit/e57b8c3f181a2a7aaa20896579d5faf7ef5b8cb6))

# [10.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.5.2...@toptal/picasso@10.6.0) (2021-09-27)

### Features

- **Icon:** [SPB-2461] add transfer icon ([#2177](https://github.com/toptal/picasso/issues/2177)) ([caee460](https://github.com/toptal/picasso/commit/caee460457267392067879b29746535fcc118543))

## [10.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.5.1...@toptal/picasso@10.5.2) (2021-09-17)

### Bug Fixes

- **Autocomplete:** do not render noOptions item when no options available ([#2167](https://github.com/toptal/picasso/issues/2167)) ([02ce33b](https://github.com/toptal/picasso/commit/02ce33baf532178d88f29c0a11bbf6d92aec860a))

## [10.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.5.0...@toptal/picasso@10.5.1) (2021-09-16)

### Bug Fixes

- remove material-ui/styles from dependencies ([#2165](https://github.com/toptal/picasso/issues/2165)) ([d403a67](https://github.com/toptal/picasso/commit/d403a67d11338bb2fcb1af09dc9766b235e27236))

# [10.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.4.2...@toptal/picasso@10.5.0) (2021-09-10)

### Features

- add limit property for Form.Select ([#2153](https://github.com/toptal/picasso/issues/2153)) ([1a036ad](https://github.com/toptal/picasso/commit/1a036ad071a08dc24d20b2fc1c731303b90dc86d))

## [10.4.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.4.1...@toptal/picasso@10.4.2) (2021-09-09)

### Bug Fixes

- **picasso:** add explicit dependency on debounce ([#2161](https://github.com/toptal/picasso/issues/2161)) ([7471191](https://github.com/toptal/picasso/commit/7471191f2e7f6e3953e3066d627fc25209dda9c4))

## [10.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.4.0...@toptal/picasso@10.4.1) (2021-09-08)

**Note:** Version bump only for package @toptal/picasso

# [10.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.5...@toptal/picasso@10.4.0) (2021-09-08)

### Features

- **TreeView:** [FX-2016] Horizontal layout, margin props & compact variant for TreeView ([#2122](https://github.com/toptal/picasso/issues/2122)) ([6b9d41f](https://github.com/toptal/picasso/commit/6b9d41f4206d8b5bca098eec0dd5e63bf907bcab))

## [10.3.5](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.4...@toptal/picasso@10.3.5) (2021-09-07)

### Bug Fixes

- update modal scrollable shades to fix resize inheritance ([#2154](https://github.com/toptal/picasso/issues/2154)) ([0cdd7fc](https://github.com/toptal/picasso/commit/0cdd7fc5084a08eaf652f1a45bf2fb5798f7e332))

## [10.3.4](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.3...@toptal/picasso@10.3.4) (2021-08-25)

**Note:** Version bump only for package @toptal/picasso

## [10.3.3](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.2...@toptal/picasso@10.3.3) (2021-08-19)

**Note:** Version bump only for package @toptal/picasso

## [10.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.1...@toptal/picasso@10.3.2) (2021-08-15)

### Bug Fixes

- fix path of generated component ([#2127](https://github.com/toptal/picasso/issues/2127)) ([fa175e6](https://github.com/toptal/picasso/commit/fa175e6cfa27cced19c4cc920b7d5380be6ef614))

## [10.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.3.0...@toptal/picasso@10.3.1) (2021-08-12)

### Bug Fixes

- allow default tooltip to be overwriten on slider ([#2133](https://github.com/toptal/picasso/issues/2133)) ([4ebdc7b](https://github.com/toptal/picasso/commit/4ebdc7b3afacb9f459ea627e681251caaea4a147))

# [10.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.2.1...@toptal/picasso@10.3.0) (2021-08-12)

### Features

- **Icon:** add 24px version of the Player icon ([#2132](https://github.com/toptal/picasso/issues/2132)) ([200864d](https://github.com/toptal/picasso/commit/200864d127863cf378cddd76a825cdf4949a05bc))

## [10.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.2.0...@toptal/picasso@10.2.1) (2021-08-11)

### Bug Fixes

- **Tooltip:** add container prop ([#2130](https://github.com/toptal/picasso/issues/2130)) ([b1b4b8d](https://github.com/toptal/picasso/commit/b1b4b8ddc84becb7b30cd002702a0e5e3dbe5430))

# [10.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.9...@toptal/picasso@10.2.0) (2021-08-10)

### Features

- **Dropdown:** add contentOverflow option ([#2124](https://github.com/toptal/picasso/issues/2124)) ([55fe14b](https://github.com/toptal/picasso/commit/55fe14b434dae611806683589f99bdbfa735f62f))

## [10.1.9](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.8...@toptal/picasso@10.1.9) (2021-08-09)

### Bug Fixes

- adds data-testid for badge component ([#2126](https://github.com/toptal/picasso/issues/2126)) ([90cb384](https://github.com/toptal/picasso/commit/90cb384d405626ef1b7a0049d12de1777245ecc5))

## [10.1.8](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.7...@toptal/picasso@10.1.8) (2021-08-09)

### Bug Fixes

- [SPT-1814] change green color tags to darker shade ([#2123](https://github.com/toptal/picasso/issues/2123)) ([9467729](https://github.com/toptal/picasso/commit/9467729ebbf09bdc9460399c72fbc042bf28eade))

## [10.1.7](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.6...@toptal/picasso@10.1.7) (2021-07-16)

### Bug Fixes

- **Slider:** overlapping labels on range slider ([#2108](https://github.com/toptal/picasso/issues/2108)) ([806ebb1](https://github.com/toptal/picasso/commit/806ebb17b5c3cb3144590dcdfb0d054ee3a7d94e))

## [10.1.6](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.5...@toptal/picasso@10.1.6) (2021-07-14)

### Bug Fixes

- **Popper:** fix popper shaking on each render ([#2119](https://github.com/toptal/picasso/issues/2119)) ([66a17a3](https://github.com/toptal/picasso/commit/66a17a31aa31154dc8e522b897eaa98523339e5c))

## [10.1.5](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.4...@toptal/picasso@10.1.5) (2021-07-14)

**Note:** Version bump only for package @toptal/picasso

## [10.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.3...@toptal/picasso@10.1.4) (2021-07-12)

### Bug Fixes

- **Button:** replace background of flat button ([#2116](https://github.com/toptal/picasso/issues/2116)) ([a4c0d91](https://github.com/toptal/picasso/commit/a4c0d91b786c07a611e32b6ed223f56520315dad))

## [10.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.2...@toptal/picasso@10.1.3) (2021-07-09)

### Bug Fixes

- **TagSelector:** compare by value ([#2115](https://github.com/toptal/picasso/issues/2115)) ([4c1f385](https://github.com/toptal/picasso/commit/4c1f3855326be1f72ac0d9f1c50c96b02549767e))

## [10.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.1...@toptal/picasso@10.1.2) (2021-07-08)

### Bug Fixes

- **Select:** close Popper after disabling Select ([#2113](https://github.com/toptal/picasso/issues/2113)) ([8fc94c5](https://github.com/toptal/picasso/commit/8fc94c5d887ce438ca7e6cd15cdd997dbb5d7b57))

## [10.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@10.1.0...@toptal/picasso@10.1.1) (2021-07-07)

### Bug Fixes

- **OutlinedInput:** do not trigger onBlur event after clicking adornment ([#2111](https://github.com/toptal/picasso/issues/2111)) ([3c51eeb](https://github.com/toptal/picasso/commit/3c51eebf9c3d21334893f3e1baa3407a2b8dfbf5))

# [10.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@10.0.0...@toptal/picasso@10.1.0) (2021-06-29)

### Features

- **Icon:** add pin solid icon ([#2107](https://github.com/toptal/picasso/issues/2107)) ([9a0c192](https://github.com/toptal/picasso/commit/9a0c192be6d659cf8bc097e64ea07151da038a8a))

# [10.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.3.0...@toptal/picasso@10.0.0) (2021-06-25)

### Features

- [FX-1956] Add picasso-provider package ([#2104](https://github.com/toptal/picasso/issues/2104)) ([8a766bd](https://github.com/toptal/picasso/commit/8a766bd174e9662e663819a3d772b757a08cc9b4))

### BREAKING CHANGES

- Picasso root component has been moved to the separate package - `@toptal/picasso-provider`. This should help us in managing multiple different versions of Picasso package (`@toptal/picasso`) for sub-applications, while the main host application would be able to share Picasso Context via the locked version of `@toptal/picasso-provider` package.

To migrate to the new version you need to change

```
import Picasso from '@toptal/picasso'
```

to

```
import Picasso from '@toptal/picasso-provider'
```

in your applications.

# [9.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.4...@toptal/picasso@9.3.0) (2021-06-24)

### Bug Fixes

- **TagSelector:** add definition of popperContainer prop ([#2105](https://github.com/toptal/picasso/issues/2105)) ([9caabbb](https://github.com/toptal/picasso/commit/9caabbb9db4522f36b56e9e5314b9f370183b3bd))

### Features

- **tooltip:** show tooltip on both label and control ([#2102](https://github.com/toptal/picasso/issues/2102)) ([87553c1](https://github.com/toptal/picasso/commit/87553c17fd349bb83cd810c59a90b31b3f88f4b4))

## [9.2.4](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.3...@toptal/picasso@9.2.4) (2021-06-18)

### Bug Fixes

- **AppUpdateNotification:** [ER-12060] Fix non-intractable action buttons ([#2103](https://github.com/toptal/picasso/issues/2103)) ([9de2732](https://github.com/toptal/picasso/commit/9de2732fb2d1c31f21c938a35c5869a752fb3305))

## [9.2.3](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.2...@toptal/picasso@9.2.3) (2021-06-18)

**Note:** Version bump only for package @toptal/picasso

## [9.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.1...@toptal/picasso@9.2.2) (2021-06-10)

### Bug Fixes

- **TreeView:** fix tree view node selection ([#2098](https://github.com/toptal/picasso/issues/2098)) ([f07a4d8](https://github.com/toptal/picasso/commit/f07a4d88d245eca3af175cfb5b17bc72bf7c272c))

## [9.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@9.2.0...@toptal/picasso@9.2.1) (2021-06-10)

### Bug Fixes

- **picasso:** pin d3-array version ([#2097](https://github.com/toptal/picasso/issues/2097)) ([3dd9196](https://github.com/toptal/picasso/commit/3dd919681edbc99d695dabfc1dce2f9b33ef1e01))

# [9.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.1.1...@toptal/picasso@9.2.0) (2021-06-02)

### Features

- **CategoriesChart:** add categories chart ([#2024](https://github.com/toptal/picasso/issues/2024)) ([c0860fb](https://github.com/toptal/picasso/commit/c0860fb7a0c8153ad7d62f9d6684abff6c7455ad))

## [9.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@9.1.0...@toptal/picasso@9.1.1) (2021-06-01)

### Bug Fixes

- **TagSelector:** reduce height ([#2091](https://github.com/toptal/picasso/issues/2091)) ([339172f](https://github.com/toptal/picasso/commit/339172ffea8cb0f9330ef705f9c4e8c192e90ed1))

# [9.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@9.0.2...@toptal/picasso@9.1.0) (2021-05-31)

### Features

- **Tag:** add styles for tag content overflow ([#2048](https://github.com/toptal/picasso/issues/2048)) ([8b4abd0](https://github.com/toptal/picasso/commit/8b4abd08b35118c263f3c606e8c8fcc4cd915e37))

## [9.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@9.0.1...@toptal/picasso@9.0.2) (2021-05-28)

### Bug Fixes

- show tooltip on disabled radio button ([#2089](https://github.com/toptal/picasso/issues/2089)) ([0ac30d1](https://github.com/toptal/picasso/commit/0ac30d1cc5c1cf037f98c8eff8b50f4a47bf9419))

## [9.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@9.0.0...@toptal/picasso@9.0.1) (2021-05-24)

### Bug Fixes

- move dependenties to picasso from lab ([#2085](https://github.com/toptal/picasso/issues/2085)) ([f6d447a](https://github.com/toptal/picasso/commit/f6d447ae5eee3d559c1d1891bbecb446f701a516))

# [9.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.8.0...@toptal/picasso@9.0.0) (2021-05-24)

### Features

- migrate stable components from lab to picasso ([#2081](https://github.com/toptal/picasso/issues/2081)) ([1070a04](https://github.com/toptal/picasso/commit/1070a046a5860841e35481ac63ae9b1c4d5dfe8c))
- **FileInput:** implement multiple file input ([#2077](https://github.com/toptal/picasso/issues/2077)) ([b3ed80d](https://github.com/toptal/picasso/commit/b3ed80dc14d4a042cca57e5d3d914e8de299303f))
- **FileList:** [TEA-2545] Implement internal file list component ([#2067](https://github.com/toptal/picasso/issues/2067)) ([87c2f3a](https://github.com/toptal/picasso/commit/87c2f3ae2d138c2156db3b3f79f09166e6cd0632))
- **Page:** make naming consistent ([#2078](https://github.com/toptal/picasso/issues/2078)) ([a679bab](https://github.com/toptal/picasso/commit/a679bab9bc6af46963b6866ab8e918ca318a9ecc))
- **Page:** rename Head to Helmet ([#2079](https://github.com/toptal/picasso/issues/2079)) ([12837d7](https://github.com/toptal/picasso/commit/12837d7159d832c7787914819e5d70afbf58479b))

### BREAKING CHANGES

- stable components were moved from lab to picasso
- **FileInput:** The API of the `FileInput` component was changed and the migration requires manual intervention:

* Modified properties:
  - `value`: Instead of a `File` object, an array of [FileUpload](https://github.com/toptal/picasso/blob/f8bf6379dffc3c6b9d21fef5349e7c6d0df8da72/packages/picasso/src/FileInput/types.ts) objects should be provided.
  - `onChange`: This callback is now called when one or more files are selected and should be added to the component state.
* Removed properties:
  - `width`: The new component has a fixed width.
  - `progress` and `error`: Both properties are now handled on a per-file basis and should be included in the objects passed to the `value` property (see [FileUpload](https://github.com/toptal/picasso/blob/f8bf6379dffc3c6b9d21fef5349e7c6d0df8da72/packages/picasso/src/FileInput/types.ts) interface).
  - `status`: The new component doesn't have a global status label. You can use the `hint` property for instructions.
* New properties:
  - `hint`: Form field hint that can be used for instructions.
  - `maxFiles`: Limit the number of files that can be added to the component state.
  - `onRemove`: Callback called when a file is removed and should be excluded from the component state.

# [8.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.7.2...@toptal/picasso@8.8.0) (2021-05-21)

### Features

- **FileList:** [TEA-2545] Implement internal file list component ([#2067](https://github.com/toptal/picasso/issues/2067)) ([#2082](https://github.com/toptal/picasso/issues/2082)) ([4bd327b](https://github.com/toptal/picasso/commit/4bd327b0fc0b439fcd35b37abb58a603797ddc20))

## [8.7.2](https://github.com/toptal/picasso/compare/@toptal/picasso@8.7.1...@toptal/picasso@8.7.2) (2021-05-17)

### Bug Fixes

- **Modal:** fix width and height of top aligned modal on small screens ([#2075](https://github.com/toptal/picasso/issues/2075)) ([eba896c](https://github.com/toptal/picasso/commit/eba896ce89c555f47d2212301a55135ab477e9f9))

## [8.7.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.7.0...@toptal/picasso@8.7.1) (2021-05-17)

### Bug Fixes

- **modal:** the content is not scrollable on mobile ([#2072](https://github.com/toptal/picasso/issues/2072)) ([56bef03](https://github.com/toptal/picasso/commit/56bef036a89618ee040385bfe3a905ffccf0e8ff))

# [8.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.6.0...@toptal/picasso@8.7.0) (2021-05-14)

### Features

- **FileList:** [TEA-2545] Implement internal file list component ([#2067](https://github.com/toptal/picasso/issues/2067)) ([1dfbc86](https://github.com/toptal/picasso/commit/1dfbc86a285f5ba42397e7fc7bac17798c4c6e91))

# [8.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.3...@toptal/picasso@8.6.0) (2021-05-14)

### Features

- **Typography:** update green color ([#2071](https://github.com/toptal/picasso/issues/2071)) ([6591aac](https://github.com/toptal/picasso/commit/6591aac722c0567d116f003dab9d168ccd1362c2))

## [8.5.3](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.2...@toptal/picasso@8.5.3) (2021-05-13)

### Bug Fixes

- reappearing tooltip after moving mouse within boundaries of triggered button ([#2069](https://github.com/toptal/picasso/issues/2069)) ([9cd7b12](https://github.com/toptal/picasso/commit/9cd7b12ac18d903b0a685918f51a0c4166b32586))

## [8.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.1...@toptal/picasso@8.5.2) (2021-05-13)

**Note:** Version bump only for package @toptal/picasso

## [8.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.5.0...@toptal/picasso@8.5.1) (2021-05-13)

### Bug Fixes

- **Select:** close menu on second click ([#2065](https://github.com/toptal/picasso/issues/2065)) ([ce9ddb3](https://github.com/toptal/picasso/commit/ce9ddb3ddc465b01afdcb9a227d8949073308c2f))

# [8.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.4.1...@toptal/picasso@8.5.0) (2021-05-12)

### Features

- **shared:** export used helpers & group colorutils ([#2068](https://github.com/toptal/picasso/issues/2068)) ([b43688f](https://github.com/toptal/picasso/commit/b43688f10cfc569d6c41d4bdd02f6e2c14e1a249))

## [8.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.4.0...@toptal/picasso@8.4.1) (2021-05-11)

### Bug Fixes

- **Modal:** add scrollable shades paddings ([1be0c8d](https://github.com/toptal/picasso/commit/1be0c8d2075a3b7cae6f3681da85d05e93e60f37))

# [8.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.3.1...@toptal/picasso@8.4.0) (2021-05-06)

### Features

- **Icon:** add asterisk solid icon ([#2059](https://github.com/toptal/picasso/issues/2059)) ([830444f](https://github.com/toptal/picasso/commit/830444fce36f2c76312fbce2ce2c44a155e7a3f5))

## [8.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.3.0...@toptal/picasso@8.3.1) (2021-05-04)

### Bug Fixes

- **TypographyOverflow:** fix initial render perf issue ([#2061](https://github.com/toptal/picasso/issues/2061)) ([f2d3d7f](https://github.com/toptal/picasso/commit/f2d3d7fc23a252a19a94f254700559585bd18c12))

# [8.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.2.0...@toptal/picasso@8.3.0) (2021-05-04)

### Bug Fixes

- **dropdown:** render popper only when opened ([#2060](https://github.com/toptal/picasso/issues/2060)) ([7d56a5b](https://github.com/toptal/picasso/commit/7d56a5b5da163267985b0aa4d0a80a628d6d804e))

### Features

- **menu:** add drilldown mode ([#2041](https://github.com/toptal/picasso/issues/2041)) ([d047431](https://github.com/toptal/picasso/commit/d04743196024be5130f651ec66ef1e4a34b058e6))

# [8.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.1.1...@toptal/picasso@8.2.0) (2021-05-04)

### Features

- **ApplicationUpdateNotification:** [FX-1875] Add a new component ([#2055](https://github.com/toptal/picasso/issues/2055)) ([a1091b1](https://github.com/toptal/picasso/commit/a1091b1cc1b44685fbaffe02aea0d45c5de1f620))

## [8.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@8.1.0...@toptal/picasso@8.1.1) (2021-04-30)

### Bug Fixes

- **select:** fix indexing for grouped options ([#2058](https://github.com/toptal/picasso/issues/2058)) ([72ac94e](https://github.com/toptal/picasso/commit/72ac94e402d38d923e29804b8c310c259c8e326c))

# [8.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@8.0.0...@toptal/picasso@8.1.0) (2021-04-29)

### Features

- **Notification:** [FX-1872] Add showCustom for useNotifications ([#2054](https://github.com/toptal/picasso/issues/2054)) ([8c35e44](https://github.com/toptal/picasso/commit/8c35e44d034cc44f1371883f49e65e8101c75fa6))

# [8.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.4.0...@toptal/picasso@8.0.0) (2021-04-29)

### Features

- **button:** make children required ([#2049](https://github.com/toptal/picasso/issues/2049)) ([d38f7ea](https://github.com/toptal/picasso/commit/d38f7ea871c16aa2808eddcebc7be0ab56713bdf))

### BREAKING CHANGES

- **button:** use Button.Circular for buttons without text

# [7.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.3.1...@toptal/picasso@7.4.0) (2021-04-28)

### Features

- add grid support for radio and checkbox group ([#2042](https://github.com/toptal/picasso/issues/2042)) ([2563a0c](https://github.com/toptal/picasso/commit/2563a0cf809b9ee51e9c4dc0b35dc183e2444f1d))

## [7.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@7.3.0...@toptal/picasso@7.3.1) (2021-04-28)

**Note:** Version bump only for package @toptal/picasso

# [7.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.2.0...@toptal/picasso@7.3.0) (2021-04-23)

### Features

- **select:** show loader instead of options for Select ([#2032](https://github.com/toptal/picasso/issues/2032)) ([cce8b7e](https://github.com/toptal/picasso/commit/cce8b7e2ad25a371dfed591ae6379b55eac445f2))

# [7.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.1.0...@toptal/picasso@7.2.0) (2021-04-21)

### Features

- **Icon:** add icons to talent portfolio modal ([#2040](https://github.com/toptal/picasso/issues/2040)) ([44fe4d3](https://github.com/toptal/picasso/commit/44fe4d3d869c641ae6aad6156d5cf88e5a9eec32))

# [7.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.3...@toptal/picasso@7.1.0) (2021-04-21)

### Features

- **select:** [TEA-2501] add grouped options ([#2033](https://github.com/toptal/picasso/issues/2033)) ([f330405](https://github.com/toptal/picasso/commit/f3304054787c65023e326e3eb123363cd7f9336c))

## [7.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.2...@toptal/picasso@7.0.3) (2021-04-15)

**Note:** Version bump only for package @toptal/picasso

## [7.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.1...@toptal/picasso@7.0.2) (2021-04-14)

**Note:** Version bump only for package @toptal/picasso

## [7.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@7.0.0...@toptal/picasso@7.0.1) (2021-04-09)

**Note:** Version bump only for package @toptal/picasso

# [7.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@6.2.2...@toptal/picasso@7.0.0) (2021-04-05)

### Features

- **Table:** add appearance and spacing variants ([d140fb7](https://github.com/toptal/picasso/commit/d140fb727c8d1985619778d769e32af2d505ead7))

### BREAKING CHANGES

- **Table:** Updated appearance and props schema

## [6.2.2](https://github.com/toptal/picasso/compare/@toptal/picasso@6.2.1...@toptal/picasso@6.2.2) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso

## [6.2.1](https://github.com/toptal/picasso/compare/@toptal/picasso@6.2.0...@toptal/picasso@6.2.1) (2021-03-30)

**Note:** Version bump only for package @toptal/picasso

# [6.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.9...@toptal/picasso@6.2.0) (2021-03-27)

### Features

- **icon:** add time-convert icon ([#2008](https://github.com/toptal/picasso/issues/2008)) ([ed62c8a](https://github.com/toptal/picasso/commit/ed62c8a2a8deab588c86d730871bf6d801c2ff73))

## [6.1.9](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.8...@toptal/picasso@6.1.9) (2021-03-25)

### Bug Fixes

- readme not being published to npm ([#2006](https://github.com/toptal/picasso/issues/2006)) ([1b82c73](https://github.com/toptal/picasso/commit/1b82c7382acbc4d17423c28e42f1dadf773abe11))

## [6.1.8](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.7...@toptal/picasso@6.1.8) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.7](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.6...@toptal/picasso@6.1.7) (2021-03-24)

### Bug Fixes

- prepublish ([#2004](https://github.com/toptal/picasso/issues/2004)) ([800db08](https://github.com/toptal/picasso/commit/800db08bd0f47fb2b3f0752e6e5b3952ae503723))

## [6.1.6](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.5...@toptal/picasso@6.1.6) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.5](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.4...@toptal/picasso@6.1.5) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.3...@toptal/picasso@6.1.4) (2021-03-24)

**Note:** Version bump only for package @toptal/picasso

## [6.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.2...@toptal/picasso@6.1.3) (2021-03-23)

### Bug Fixes

- **select:** fix background color ([#1987](https://github.com/toptal/picasso/issues/1987)) ([2b2feea](https://github.com/toptal/picasso/commit/2b2feeaecf0f071cb873bf85f75fb136ccf14949))

## [6.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.1...@toptal/picasso@6.1.2) (2021-03-22)

**Note:** Version bump only for package @toptal/picasso

## [6.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@6.1.0...@toptal/picasso@6.1.1) (2021-03-18)

**Note:** Version bump only for package @toptal/picasso

# [6.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.6...@toptal/picasso@6.1.0) (2021-03-18)

### Features

- **tabs:** add scroll buttons ([#1980](https://github.com/toptal/picasso/issues/1980)) ([3f705e7](https://github.com/toptal/picasso/commit/3f705e7f158c3142d4bb49f3345ccbf0d26fc614))

## [6.0.6](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.5...@toptal/picasso@6.0.6) (2021-03-16)

### Bug Fixes

- **Autocomplete:** loading test case ([#1972](https://github.com/toptal/picasso/issues/1972)) ([6df7f0a](https://github.com/toptal/picasso/commit/6df7f0ace3c95ca73cc71e7501d4c2bb1902ca6c))

## [6.0.5](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.4...@toptal/picasso@6.0.5) (2021-03-16)

**Note:** Version bump only for package @toptal/picasso

## [6.0.4](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.3...@toptal/picasso@6.0.4) (2021-03-15)

### Bug Fixes

- versions dependency between packages ([#1981](https://github.com/toptal/picasso/issues/1981)) ([ca4ab84](https://github.com/toptal/picasso/commit/ca4ab84934204323c8842991fe382745f56b5ff6))

## [6.0.3](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.2...@toptal/picasso@6.0.3) (2021-03-11)

**Note:** Version bump only for package @toptal/picasso

## [6.0.2](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.1...@toptal/picasso@6.0.2) (2021-03-11)

### Bug Fixes

- **ButtonAction:** make button transparent ([#1964](https://github.com/toptal/picasso/issues/1964)) ([9a30c7b](https://github.com/toptal/picasso/commit/9a30c7b646c5e1971601c5203bb824731f7a26fc))

## [6.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@6.0.0...@toptal/picasso@6.0.1) (2021-03-09)

### Bug Fixes

- **TopBarMenu:** [TEA-2354] Improve responsiveness ([#1955](https://github.com/toptal/picasso/issues/1955)) ([1f7a646](https://github.com/toptal/picasso/commit/1f7a646dd96afae5208696947f67bd9bcab18c00))

# [6.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.14.2...@toptal/picasso@6.0.0) (2021-03-08)

### chore

- **tooltip:** compute arrow based on compact prop ([41a39c0](https://github.com/toptal/picasso/commit/41a39c07da609dc8657834f38d9794fc0bf5680a))

### Reverts

- Revert "chore(tooltip): adjust arrows and borders (#1952)" ([cb6a549](https://github.com/toptal/picasso/commit/cb6a549f30efe1bc70504bada464e0f7388d3125)), closes [#1952](https://github.com/toptal/picasso/issues/1952)

### BREAKING CHANGES

- **tooltip:** removed arrow prop

## [5.14.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.14.1...@toptal/picasso@5.14.2) (2021-03-05)

### Bug Fixes

- **outlinedinput:** make disabled input text readable on Safari 14 ([#1950](https://github.com/toptal/picasso/issues/1950)) ([c85647e](https://github.com/toptal/picasso/commit/c85647e3137166d19a29e58f8b9896794a7b8a2b))

## [5.14.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.14.0...@toptal/picasso@5.14.1) (2021-03-04)

### Bug Fixes

- **PromptModal:** rendering on mobile ([#1945](https://github.com/toptal/picasso/issues/1945)) ([3217711](https://github.com/toptal/picasso/commit/3217711cbc4b80ac330521674046c44ead84f0c8))

# [5.14.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.13.0...@toptal/picasso@5.14.0) (2021-03-04)

### Features

- **outlinedinput:** improve disabled input accessibility ([#1944](https://github.com/toptal/picasso/issues/1944)) ([8c53c52](https://github.com/toptal/picasso/commit/8c53c52731947c964c5b1c864dd5efd02ad811b5))

# [5.13.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.4...@toptal/picasso@5.13.0) (2021-03-04)

### Features

- **TableCell:** add rowSpan property ([#1943](https://github.com/toptal/picasso/issues/1943)) ([e7f735b](https://github.com/toptal/picasso/commit/e7f735b72a43398447a9e4640f9fffb7b3b5bc29))

## [5.12.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.3...@toptal/picasso@5.12.4) (2021-03-03)

**Note:** Version bump only for package @toptal/picasso

## [5.12.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.2...@toptal/picasso@5.12.3) (2021-03-02)

### Bug Fixes

- **PageArticle:** make smaller padding for smaller screens ([#1941](https://github.com/toptal/picasso/issues/1941)) ([c74d603](https://github.com/toptal/picasso/commit/c74d6031a5b9cae00298fc18f20807a25e6be3fe))

## [5.12.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.1...@toptal/picasso@5.12.2) (2021-03-02)

**Note:** Version bump only for package @toptal/picasso

## [5.12.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.12.0...@toptal/picasso@5.12.1) (2021-03-01)

### Bug Fixes

- **autocomplete:** fix focus on input reset ([#1930](https://github.com/toptal/picasso/issues/1930)) ([be492b5](https://github.com/toptal/picasso/commit/be492b5b7b89dc7efe9eaab6333fec73ea3c0f0d))

# [5.12.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.11.1...@toptal/picasso@5.12.0) (2021-02-26)

### Features

- allow passing data-testid to icons ([#1934](https://github.com/toptal/picasso/issues/1934)) ([29bd3c6](https://github.com/toptal/picasso/commit/29bd3c69de3cb8d2984a514961831e79c4aa5ab0))

## [5.11.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.11.0...@toptal/picasso@5.11.1) (2021-02-25)

**Note:** Version bump only for package @toptal/picasso

# [5.11.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.12...@toptal/picasso@5.11.0) (2021-02-25)

### Features

- cross platform package builds ([#1925](https://github.com/toptal/picasso/issues/1925)) ([21f30be](https://github.com/toptal/picasso/commit/21f30beeb360fcc67c88d70af5c3234d8dcfe213))

## [5.10.12](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.11...@toptal/picasso@5.10.12) (2021-02-25)

### Bug Fixes

- **Notification:** remove custom variant ([#1924](https://github.com/toptal/picasso/issues/1924)) ([235d8f4](https://github.com/toptal/picasso/commit/235d8f4f18f7ac61493489a0df3de22036ff03db))

## [5.10.11](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.10...@toptal/picasso@5.10.11) (2021-02-25)

**Note:** Version bump only for package @toptal/picasso

## [5.10.10](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.9...@toptal/picasso@5.10.10) (2021-02-18)

### Bug Fixes

- multiline radio, checkbox and switch label alignment ([#1890](https://github.com/toptal/picasso/issues/1890)) ([f7f4aa0](https://github.com/toptal/picasso/commit/f7f4aa0effa5b7218ae2fd171186eb9c2aa37a2a))

## [5.10.9](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.8...@toptal/picasso@5.10.9) (2021-02-16)

### Bug Fixes

- **ButtonAction + ButtonCircular:** type as overridable component ([#1918](https://github.com/toptal/picasso/issues/1918)) ([2256e54](https://github.com/toptal/picasso/commit/2256e545130e39abf0e45b4e387c44ab52a776de))

## [5.10.8](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.7...@toptal/picasso@5.10.8) (2021-02-15)

### Bug Fixes

- **ScrollMenu:** fix scroll menu error when no item selected ([#1909](https://github.com/toptal/picasso/issues/1909)) ([4bf871d](https://github.com/toptal/picasso/commit/4bf871d5a0008d8eb8385b87ae07bbd96c230deb))

## [5.10.7](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.6...@toptal/picasso@5.10.7) (2021-02-15)

**Note:** Version bump only for package @toptal/picasso

## [5.10.6](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.5...@toptal/picasso@5.10.6) (2021-02-12)

### Bug Fixes

- **Select:** make select to close on item click ([#1905](https://github.com/toptal/picasso/issues/1905)) ([dff9157](https://github.com/toptal/picasso/commit/dff91579d1f710b7625c32c96d38596f00fed532))

## [5.10.5](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.4...@toptal/picasso@5.10.5) (2021-02-11)

**Note:** Version bump only for package @toptal/picasso

## [5.10.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.3...@toptal/picasso@5.10.4) (2021-02-11)

### Bug Fixes

- **Sidebar:** make expanded sub menu with wrapper ([#1906](https://github.com/toptal/picasso/issues/1906)) ([c96fdff](https://github.com/toptal/picasso/commit/c96fdff06cfb6733a80ae972245335e55803e052))

## [5.10.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.2...@toptal/picasso@5.10.3) (2021-02-10)

**Note:** Version bump only for package @toptal/picasso

## [5.10.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.1...@toptal/picasso@5.10.2) (2021-02-10)

### Bug Fixes

- **Link:** fix visited state ([#1903](https://github.com/toptal/picasso/issues/1903)) ([d8c31ed](https://github.com/toptal/picasso/commit/d8c31ed38bf017ca59e4e46680fe940f522aacdd))

## [5.10.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.10.0...@toptal/picasso@5.10.1) (2021-02-09)

### Bug Fixes

- **ScrollMenu:** fix scrolling behaviour ([#1882](https://github.com/toptal/picasso/issues/1882)) ([6982a29](https://github.com/toptal/picasso/commit/6982a297602b7de626ac66da46819e88e38c5111))

# [5.10.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.9.0...@toptal/picasso@5.10.0) (2021-02-08)

### Features

- **NativeSelect:** extract native select ([#1863](https://github.com/toptal/picasso/issues/1863)) ([34b5739](https://github.com/toptal/picasso/commit/34b57397a6d361fe448f92f5a25adf54982ade5f))

# [5.9.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.8.1...@toptal/picasso@5.9.0) (2021-02-08)

### Features

- **Link:** add active and visited outline ([#1893](https://github.com/toptal/picasso/issues/1893)) ([906762a](https://github.com/toptal/picasso/commit/906762a51466165b7e028707d8fa5c4b6a013c57))

## [5.8.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.8.0...@toptal/picasso@5.8.1) (2021-02-03)

**Note:** Version bump only for package @toptal/picasso

# [5.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.7.0...@toptal/picasso@5.8.0) (2021-02-03)

### Features

- **InputAdornment:** add stopPropagation prop ([#1883](https://github.com/toptal/picasso/issues/1883)) ([c17f4cd](https://github.com/toptal/picasso/commit/c17f4cd94ce5891e94e45129057b3550b13c1d7b))

# [5.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.6.0...@toptal/picasso@5.7.0) (2021-02-01)

### Features

- **Icon:** add Referrals Dashboard icon ([#1876](https://github.com/toptal/picasso/issues/1876)) ([3fbef89](https://github.com/toptal/picasso/commit/3fbef89896f1ee39d493167a704064327576f822))

# [5.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.5.2...@toptal/picasso@5.6.0) (2021-01-29)

### Features

- **Icon:** add Archive icon ([#1873](https://github.com/toptal/picasso/issues/1873)) ([0db836f](https://github.com/toptal/picasso/commit/0db836f6cb82c2265aa8caa946ead4aca534896e))

## [5.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.5.1...@toptal/picasso@5.5.2) (2021-01-29)

**Note:** Version bump only for package @toptal/picasso

## [5.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.5.0...@toptal/picasso@5.5.1) (2021-01-28)

**Note:** Version bump only for package @toptal/picasso

# [5.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.9...@toptal/picasso@5.5.0) (2021-01-25)

### Features

- **Typography:** add option to inherit weight ([#1862](https://github.com/toptal/picasso/issues/1862)) ([146d3a4](https://github.com/toptal/picasso/commit/146d3a44926ed515c5cc284f3dbd2d459efd39bd))

## [5.4.9](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.8...@toptal/picasso@5.4.9) (2021-01-21)

**Note:** Version bump only for package @toptal/picasso

## [5.4.8](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.7...@toptal/picasso@5.4.8) (2021-01-21)

### Bug Fixes

- **Input:** fix autocomplete edges non-clickable ([#1855](https://github.com/toptal/picasso/issues/1855)) ([772607a](https://github.com/toptal/picasso/commit/772607a0ac6b8f66359b784f5834370a72bc5d83))

## [5.4.7](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.6...@toptal/picasso@5.4.7) (2021-01-20)

### Bug Fixes

- **FileInput:** not opening file picker ([#1859](https://github.com/toptal/picasso/issues/1859)) ([ac4451c](https://github.com/toptal/picasso/commit/ac4451cd3e71cbf62a252ec522455d346a39b3ab))

## [5.4.6](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.5...@toptal/picasso@5.4.6) (2021-01-20)

**Note:** Version bump only for package @toptal/picasso

## [5.4.5](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.4...@toptal/picasso@5.4.5) (2021-01-20)

**Note:** Version bump only for package @toptal/picasso

## [5.4.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.3...@toptal/picasso@5.4.4) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso

## [5.4.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.2...@toptal/picasso@5.4.3) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso

## [5.4.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.1...@toptal/picasso@5.4.2) (2021-01-18)

**Note:** Version bump only for package @toptal/picasso

## [5.4.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.4.0...@toptal/picasso@5.4.1) (2021-01-18)

### Bug Fixes

- **amount:** expose Amount formatter and extend Amount component ([#1842](https://github.com/toptal/picasso/issues/1842)) ([77f2358](https://github.com/toptal/picasso/commit/77f23582fe79f0ddf9044e5eacf97acc28e46211))

# [5.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.3.0...@toptal/picasso@5.4.0) (2021-01-15)

### Features

- **helpbox:** add prop width to the content ([#1843](https://github.com/toptal/picasso/issues/1843)) ([ebe98fd](https://github.com/toptal/picasso/commit/ebe98fd1480d68076b984c0a7be06e79f574b0a1))

# [5.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.2.0...@toptal/picasso@5.3.0) (2021-01-13)

### Features

- **icon:** add career icons ([#1837](https://github.com/toptal/picasso/issues/1837)) ([4557c5b](https://github.com/toptal/picasso/commit/4557c5b0fd3ea17deed3a35dc436663ad310097b))

# [5.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.4...@toptal/picasso@5.2.0) (2021-01-07)

### Features

- **TypographyOverflow:** tooltip variants ([#1823](https://github.com/toptal/picasso/issues/1823)) ([777796c](https://github.com/toptal/picasso/commit/777796c6162c52d3a47f9e761e34c57824739efc))

## [5.1.4](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.3...@toptal/picasso@5.1.4) (2021-01-07)

### Bug Fixes

- **Tooltip:** fix non-working delay prop ([#1827](https://github.com/toptal/picasso/issues/1827)) ([7120a93](https://github.com/toptal/picasso/commit/7120a9335d38b52968709eb53dfc8a62d6b996eb))
- changelog links ([#1828](https://github.com/toptal/picasso/issues/1828)) ([f87f43d](https://github.com/toptal/picasso/commit/f87f43d776572340ebd358207e2992092b61e70f))

## [5.1.3](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.2...@toptal/picasso@5.1.3) (2021-01-05)

**Note:** Version bump only for package @toptal/picasso

## [5.1.2](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.1...@toptal/picasso@5.1.2) (2020-12-31)

**Note:** Version bump only for package @toptal/picasso

## [5.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.1.0...@toptal/picasso@5.1.1) (2020-12-29)

**Note:** Version bump only for package @toptal/picasso

# [5.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@5.0.1...@toptal/picasso@5.1.0) (2020-12-29)

### Features

- **icon:** add talent referral icon ([#1817](https://github.com/toptal/picasso/issues/1817)) ([152549e](https://github.com/toptal/picasso/commit/152549e5d294e29148070da6f8429372d75eedc8))

## [5.0.1](https://github.com/toptal/picasso/compare/@toptal/picasso@5.0.0...@toptal/picasso@5.0.1) (2020-12-29)

### Bug Fixes

- **PageArticle:** reference to picasso package ([#1816](https://github.com/toptal/picasso/issues/1816)) ([dad13d5](https://github.com/toptal/picasso/commit/dad13d504afd29699fd9a6df85625edb35cf2af1))

# [5.0.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.117.1...@toptal/picasso@5.0.0) (2020-12-22)

## Introduction to BASE 2.0

### By Aleksandar Djuric

After the official launch of Talent Portal, the team received feedback through UserVoice related to better readability and ergonomics. At that point, Talent Portal was the first product that fully leaned on the first version of BASE, or BASE v1.

We took a deep dive into the analysis and listed out observations. Analysis can be found [here](https://toptal-core.atlassian.net/l/c/5KKKmANF).

After analysis, the design team started testing different solutions that were the origin of the evolution of BASE v1 into BASE v2. The goal was to change and build up confidence and approval from our talent audience, regarding implementation of updates that we listed out as possible solutions. Documentation regarding the test can be found [here](https://toptal-core.atlassian.net/l/c/2cdeaDu5).

### What is BASE v2?

Every interface language has its updates. Version 2 is just another step in our iterative process. We built the technical foundation on the design front where we have an easy way to update components according to user feedback. How technology changes and how the mindset of people using our products changes, our UI and UX are going to follow it, so that we make sure we have world-class product experience in place.

### Important changes:

- **Toning down interface with better contrast and readability.** Reducing heavy saturated header and unrecognizable sidebar.

- **Changing form elements to follow the corner radius of buttons (in other words making them consistent).** Due to previous leadership, we had this inconsistency in place that didn’t really have a lot of value in place. Consistent corner radius and rounded corners in general help with usability. With new VP Brand Strategy settling up in Toptal, we decided it is the right time to make them consistent. Here are two good sources on why this holds a lot of value:

  - [https://uxdesign.cc/make-sense-of-rounded-corners-on-buttons-dfc8e13ea7f7](https://uxdesign.cc/make-sense-of-rounded-corners-on-buttons-dfc8e13ea7f7)

  - [https://ux.stackexchange.com/questions/11150/how-do-rounded-corners-affect-usability](https://ux.stackexchange.com/questions/11150/how-do-rounded-corners-affect-usability)

- **Creating documentation for every component.** This is currently being worked on and we are on the good track to finish more than 85% of it by the end of 2020. Proper documentation will help designers as owners to know how to use the component the right way, but also other partners in the process — such as engineering, content, product or even stakeholders.

### Features

- **Alert**

  - added Alert.Inline component

    ![Alert Inline](https://user-images.githubusercontent.com/2836281/103081159-0e4f4900-45e0-11eb-81b1-894645718db8.png)

  - refactored Alert to use BASE 2.0 components

- **Autocomplete**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - added option description
  - added checkmark for selected options
  - removed checkmark and updated padding
  - fixed that adornment/icon click was not focusing the component
  - options list does not open on focus anymore. Users should press Space/Enter/ArrowUp/ArrowDown to open it now
- **Button**
  - aligned with BASE 2.0 design
  - added `flexShrink: 0`
- **Button.Action**

  - added a new component

    ![Button.Action](https://user-images.githubusercontent.com/2836281/103081204-245d0980-45e0-11eb-9ce4-709e73a32bef.png)

- **Button.Circular**

  - added a new component

    ![Button.Circular](https://user-images.githubusercontent.com/2836281/103081218-2fb03500-45e0-11eb-9352-7682a9dbc6d5.png)

- **Button.Group**
  - allow nesting `Button` components
- **Checkbox**
  - aligned with BASE 2.0 design
  - fix `Checkbox.Group` with nested `Checkbox`
  - set pointer by default, arrow for disabled
- **Container**
  - added `rounded` property
- **Drawer**
  - aligned with BASE 2.0 design
- **Datepicker**
  - set text cursor by default, arrow for disabled, pointer for dates and buttons inside dropdown
- **FileInput**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - fix adornment/icon click is focusing the component
- **Form**
  - exported `FORM_ERROR` constant from `picasso-forms`
  - if you return a string message from `onSubmit`, the message will be displayed as an error flash notification
  - spacing between form input components is decreased
  - added form config for setting required decoration (`asterisk` vs `(optional)`)
- **Form.Label**
  - added prop `requiredDecoration` to show `asterisk` or `(optional)`, but the prefered way - `(optional)`
- **Form.SubmitButton**
  - added 2 new button types - `circular` and `action`
- **Helpbox**
  - aligned with BASE 2.0 design
  - modified internal padding - set to `medium`
  - added rounded corners
- **Indicator**
  - aligned colors with BASE 2.0 design
  - `green` color changed to use `darker green` color
- **Input**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - set text cursor by default, arrow for disabled
- **Modal**
  - aligned with BASE 2.0 design
  - no close on backdrop click
  - added rounded corners
  - changed a style of the close button
  - added scroll shades for the end of the content
  - increased content paddings
  - fixed modal close button position
  - adjusted modal action spacing
- **MonthSelect**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
- **Notification**

  - aligned with BASE 2.0 design
  - added border radius, margin and shadows
  - content width increased
  - left-aligned content
  - icon size reduced

    | Before                                                                                                                       | After                                                                                                                       |
    | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
    | ![Notification before](https://user-images.githubusercontent.com/2836281/103081241-3d65ba80-45e0-11eb-8149-7dbaa838f995.png) | ![Notification after](https://user-images.githubusercontent.com/2836281/103081260-45bdf580-45e0-11eb-9588-d5f5852bf1c9.png) |
    |                                                                                                                              |                                                                                                                             |

- **NumberInput**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - changed icons to `ArrowUpMinor16` and `ArrowDownMinor16`
  - fixed adornment/icon click was not focusing the component
- **OverviewBlock**
  - aligned with BASE 2.0 design
  - changed background color to white
  - changed paddings, added vertical separators
  - added `OverviewBlock.Row` component to support multiple-line layout for blocks
- **OverviewBlock.Group**
  - added `align` and `blockWidth` props
- **Page.Article**
  - added a new component
- **Page.Header**
  - aligned with BASE 2.0 design
  - decreased height
- **PromptModal**
  - fixed operations on unmounted component
- **Radio**
  - aligned with BASE 2.0 design
  - changed hover & focus styles
  - set pointer by default, arrow for disabled
- **Radio.Group**
  - removed overriding of internal paddings inside `Form.Field`
- **Sidebar**

  - aligned with BASE 2.0 design
  - made width narrower
  - changed background color to `grey lighter`
  - increased top offset
  - induced grey background on the left side of the page

    | Before                                                                                                                  | After                                                                                                                   |
    | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
    | ![Sidebar before](https://user-images.githubusercontent.com/2836281/103081284-52424e00-45e0-11eb-8913-a7c1708da657.png) | ![Sidebar after](https://user-images.githubusercontent.com/17337276/103614563-1352b780-4f53-11eb-8285-30615c30c889.png) |
    |                                                                                                                         |                                                                                                                         |

- **Sidebar.Item**
  - changed the left margin for collapsible and non-collapsible items
  - added additional horizontal margins to align with BASE 2.0
  - fixed some issues with text-overflow for items in the collapsible menus
- **Select**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - fixed issue with multiple highlighted options
  - added option description
  - added checkmark for selected options
  - changed the color of the selected option to black
  - changed arrow icons
  - added dedicated search input
  - disabled input functionality for the select input, instead added Search input inside the options list
  - added property `searchPlaceholder` to set placeholder for the added Search input inside options list. Default value `Search`
  - `searchThreshold` default value is set to 10 instead of 4 previously
  - fixed cursor when hovering disabled component
  - options list does not open on focus anymore. Users should press Space/Enter/ArrowUp/ArrowDown to open it
  - open options list on key down for arrow up and arrow down for Native Select
  - set pointer cursor by default, arrow for disabled
- **Subheader**
  - aligned with BASE 2.0 design
  - removed left padding
- **Subheader.Breadcrumbs**

  - not part of Subheader anymore and Breadcrumbs decided to make as a separate component in scope of picasso-lab

    ```
    import { Breadcrumbs } from '@toptal/picasso-lab'
    ```

- **Switch**

  - added a new component

    ![Switch](https://user-images.githubusercontent.com/2836281/103081319-67b77800-45e0-11eb-9a8e-d492751e3867.png)

- **Tag.Rectangular**

  - added a new component

    ![Tag.Rectangular](https://user-images.githubusercontent.com/2836281/103081336-71d97680-45e0-11eb-8004-06e34593cb23.png)

    ![Tag.Rectangular indicator](https://user-images.githubusercontent.com/2836281/103081356-79991b00-45e0-11eb-983b-0552327c84b7.png)

- **TagSelector**
  - aligned with BASE 2.0 design
  - changed hover and focused outline
  - options list does not open on focus anymore. Users should press Space/Enter/ArrowUp/ArrowDown to open it
- **Timepicker**
  - set default cursor by default, pointer for icon
- **Tooltip**
  - prevent tooltip overflow by default
  - fixed positioning inside a dropdown
  - uncontrolled `Tooltip` is getting closed after second click/touch on children element
  - allow click events to propagate

### BREAKING CHANGES

- **Accordion**

  - aligned borders with BASE 2.0
  - Accordion: `bordered` prop is renamed to `borders`, which has 3 new values - `all`, `middle` and `none`

    Accordion borders:

    - `bordered: true` -> `all` (default value)
    - `bordered: false` -> `none`
    - `middle` is a new variant

- **Button**

  - variants have been changed and circular is extracted to separate component. Here is migration path:

    Button variants:

    - `primary-blue` -> `primary` (default value)
    - `primary-red` -> `negative`
    - `primary-green` -> `positive`
    - `secondary-blue, secondary-red, secondary-green` -> `secondary`
    - `flat` -> `secondary`
    - `flat-white` -> `transparent`
    - `secondary-white` -> `transparent`

  - `<Button circular />` was replaced with `<Button.Circular />` with dedicated variants only for circular button: `primary, flat and transparent`

- **Colors**
  - `grey.lighter` changed to `#f3f4f6`
  - `grey.light` changed to `#e5e7ea`
  - added new colors `grey.lighter2` and `grey.light2`, which have old color values of `grey.lighter` (`#ebeced`) and `grey.light` (`#d8d9dc`)
- **Checkbox**
  - `required` prop changed to `requiredDecoration`, which now supports two options: asterisk or optional
- **Form.Label**
  - `required` prop changed to `requiredDecoration`, which now supports two options: asterisk or optional
- **Label**
  - renamed to `Tag`
  - removed white variant
  - added blue variant
- **Modal**
  - `disableBackdropClick` is set by default now and can't be modified
  - set base `font-size` to `1rem`
- **Notification**
  - removed `variant`, `elevated`, `fullWidth` and `icon` props
- **Page.BannerMessage**
  - component is removed
- **Page.Content**
  - padding is reduced
  - removed horizontal padding, now you should use `Page.Article` component
- **Page.Header**
  - set the default Page.Header variant to dark. If you need a `light` variant - set `variant='light'`.
  - renamed to `Page.TopBar`
- **Page.HeaderMenu**
  - renamed to `Page.TopBarMenu`
- **PromptModal**

  - variant prop has changed its values to `positive` or `negative`

    PromptModal variants:

    - `green` -> `positive` (default value)
    - `red` -> `negative`
    - `blue` -> removed

- **Select**
  - `onSearchChange` is deprecated and will be removed in the next Picasso version. Select component should not be used with dynamic options anymore. Please use Autocomplete instead for such case
- **Subheader**
  - renamed to `PageHead`
- **Sidebar**
  - increased horizontal padding
  - background becomes gray lighter if there is a `Sidebar` on a page
- **Sidebar.Logo**
  - increased left padding
- **Tooltip**
  - `preventOverflow` property of Tooltip component changed default value from `false` to `true`
- **UserBadge**
  - avatar size is reduced

* `useModals` is removed, instead use `useModal`
* `showPrompt` is removed, instead use `showModal` in combination with `PromptModal`
* `useModal` expect you to add `Modal` or `PromptModal` in your component in explicit way
* for mutliple modals create declare multiple hooks, one per Modal

  ```
  import { useModal } from '@toptal/picasso-utils'

  ...

  const {showModal, hideModal, isOpen } = useModal()

  ...

  const handleClick = () => showModal()

  ...

  <Modal open={isOpen} onClose={hideModal} />
  ```

## [4.117.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.117.0...@toptal/picasso@4.117.1) (2020-12-15)

### Bug Fixes

- **picasso-forms:** scroll to any field with error ([#1779](https://github.com/toptal/picasso/issues/1779)) ([4ab2533](https://github.com/toptal/picasso/commit/4ab2533481770c52d8228609bfeec4505c847bd3))

# [4.117.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.116.0...@toptal/picasso@4.117.0) (2020-12-15)

### Features

- **Icon:** add commission icon ([#1785](https://github.com/toptal/picasso/issues/1785)) ([2f83ad0](https://github.com/toptal/picasso/commit/2f83ad09060ee5f9975f182e0c4096f195a07af2))

# [4.116.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.115.2...@toptal/picasso@4.116.0) (2020-12-14)

### Features

- [SPT-1202] Add tooltip delay on the typography overflow ([#1778](https://github.com/toptal/picasso/issues/1778)) ([0b77ffa](https://github.com/toptal/picasso/commit/0b77ffab2dbd23a55da0b15fb2141d6b525759a1))

## [4.115.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.115.1...@toptal/picasso@4.115.2) (2020-12-09)

**Note:** Version bump only for package @toptal/picasso

## [4.115.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.115.0...@toptal/picasso@4.115.1) (2020-11-30)

### Bug Fixes

- **Modal:** change Modal width size em to rem ([#1744](https://github.com/toptal/picasso/issues/1744)) ([4ec467a](https://github.com/toptal/picasso/commit/4ec467ad98729452577db02f45ccd989f531406e))

# [4.115.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.114.0...@toptal/picasso@4.115.0) (2020-11-30)

### Features

- **icons:** add TriangleLeftMinorSolid and TriangleRightMinorSolid16 ([#1707](https://github.com/toptal/picasso/issues/1707)) ([b4324bc](https://github.com/toptal/picasso/commit/b4324bcc441c55b9d3f20e9edbf00cb4191fd8b7))

# [4.114.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.113.1...@toptal/picasso@4.114.0) (2020-11-26)

### Features

- **icon:** new icon scheduledPayment ([#1725](https://github.com/toptal/picasso/issues/1725)) ([9b1e461](https://github.com/toptal/picasso/commit/9b1e461036dcec851d6daf3910d0e3ef473f0b1c))

## [4.113.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.113.0...@toptal/picasso@4.113.1) (2020-11-20)

### Bug Fixes

- **Select:** use white background for input ([#1697](https://github.com/toptal/picasso/issues/1697)) ([12627ad](https://github.com/toptal/picasso/commit/12627adaf2f807a241b31da03fcf219569bbffea))

# [4.113.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.112.1...@toptal/picasso@4.113.0) (2020-11-17)

### Features

- [PRO-1604] Expose input outline ref prop ([#1682](https://github.com/toptal/picasso/issues/1682)) ([b3250ce](https://github.com/toptal/picasso/commit/b3250ce5f2372230844fec5310b3cb2262187241))

## [4.112.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.112.0...@toptal/picasso@4.112.1) (2020-11-13)

**Note:** Version bump only for package @toptal/picasso

# [4.112.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.111.0...@toptal/picasso@4.112.0) (2020-11-12)

### Features

- **Tooltip:** add new placement variants ([#1678](https://github.com/toptal/picasso/issues/1678)) ([649b2f6](https://github.com/toptal/picasso/commit/649b2f6e27841cbecd1d14a5dc6566b5b827586e))

# [4.111.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.110.2...@toptal/picasso@4.111.0) (2020-11-10)

### Features

- update staging banner color and favicon ([#1668](https://github.com/toptal/picasso/issues/1668)) ([432915d](https://github.com/toptal/picasso/commit/432915dcddf320cd0554a283316a86839fb637da))

## [4.110.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.110.1...@toptal/picasso@4.110.2) (2020-11-10)

**Note:** Version bump only for package @toptal/picasso

## [4.110.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.110.0...@toptal/picasso@4.110.1) (2020-11-10)

**Note:** Version bump only for package @toptal/picasso

# [4.110.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.9...@toptal/picasso@4.110.0) (2020-11-09)

### Features

- **icons:** add award icon ([#1666](https://github.com/toptal/picasso/issues/1666)) ([03bb25d](https://github.com/toptal/picasso/commit/03bb25d545b6a9f9c64ab6559652b86275001e12))

## [4.109.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.8...@toptal/picasso@4.109.9) (2020-11-06)

**Note:** Version bump only for package @toptal/picasso

## [4.109.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.7...@toptal/picasso@4.109.8) (2020-11-04)

### Bug Fixes

- **Input:** update multiline limit text ([#1475](https://github.com/toptal/picasso/issues/1475)) ([f1d7f50](https://github.com/toptal/picasso/commit/f1d7f50bbe2bddf991b8a4e955895a2638aaafba))

## [4.109.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.6...@toptal/picasso@4.109.7) (2020-11-02)

**Note:** Version bump only for package @toptal/picasso

## [4.109.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.5...@toptal/picasso@4.109.6) (2020-11-02)

**Note:** Version bump only for package @toptal/picasso

## [4.109.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.4...@toptal/picasso@4.109.5) (2020-10-29)

### Bug Fixes

- **button:** add styles for transparent disabled button ([#1650](https://github.com/toptal/picasso/issues/1650)) ([3b5b170](https://github.com/toptal/picasso/commit/3b5b1704d4a2431f702e40469f2346944b0de195))

## [4.109.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.3...@toptal/picasso@4.109.4) (2020-10-27)

**Note:** Version bump only for package @toptal/picasso

## [4.109.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.2...@toptal/picasso@4.109.3) (2020-10-27)

**Note:** Version bump only for package @toptal/picasso

## [4.109.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.1...@toptal/picasso@4.109.2) (2020-10-21)

**Note:** Version bump only for package @toptal/picasso

## [4.109.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.109.0...@toptal/picasso@4.109.1) (2020-10-21)

**Note:** Version bump only for package @toptal/picasso

# [4.109.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.3...@toptal/picasso@4.109.0) (2020-10-15)

### Features

- **UserBadge:** extend `title` by adding `renderTitle` prop ([#1622](https://github.com/toptal/picasso/issues/1622)) ([6011e26](https://github.com/toptal/picasso/commit/6011e26187c46752f868c03b4a4aab7859a29c00))

## [4.108.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.2...@toptal/picasso@4.108.3) (2020-10-13)

### Bug Fixes

- **tooltip:** revert the enter delay changes to interactive tooltip ([#1618](https://github.com/toptal/picasso/issues/1618)) ([b429576](https://github.com/toptal/picasso/commit/b4295769b9cc16eb3e898a28b2ac63da976dac87)), closes [#1617](https://github.com/toptal/picasso/issues/1617)

## [4.108.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.1...@toptal/picasso@4.108.2) (2020-10-13)

### Bug Fixes

- **tooltip:** get rid of blinking from interactive tooltips ([#1617](https://github.com/toptal/picasso/issues/1617)) ([91086ee](https://github.com/toptal/picasso/commit/91086eefb89115b5d761d30f4e7cd3bbcd8ada83))

## [4.108.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.108.0...@toptal/picasso@4.108.1) (2020-10-12)

### Bug Fixes

- **Autocomplete:** fixed menu placement for custom width ([#1615](https://github.com/toptal/picasso/issues/1615)) ([e7fb696](https://github.com/toptal/picasso/commit/e7fb6967700e145e75d9ebcad8e0ef68d986b32e))

# [4.108.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.107.0...@toptal/picasso@4.108.0) (2020-10-12)

### Features

- **icons:** update org structure icons, add pod ([#1614](https://github.com/toptal/picasso/issues/1614)) ([d01a5a0](https://github.com/toptal/picasso/commit/d01a5a0dd523759f661edbd2e5b8395a01b51851))

# [4.107.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.106.0...@toptal/picasso@4.107.0) (2020-10-12)

### Features

- **autocomplete:** add menuWidth prop ([#1612](https://github.com/toptal/picasso/issues/1612)) ([2e24c3f](https://github.com/toptal/picasso/commit/2e24c3f1fe149d360108e763ed2c1fe9a6833487))

# [4.106.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.105.2...@toptal/picasso@4.106.0) (2020-10-08)

### Features

- **icon:** add org structure icons ([#1607](https://github.com/toptal/picasso/issues/1607)) ([b77d21c](https://github.com/toptal/picasso/commit/b77d21cb04b2464d085de003c1d3bbe5d6b31e2e))

## [4.105.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.105.1...@toptal/picasso@4.105.2) (2020-10-07)

### Bug Fixes

- autocomplete custom render example ([#1605](https://github.com/toptal/picasso/issues/1605)) ([46581fc](https://github.com/toptal/picasso/commit/46581fc40eabed06eea36609e6ceccc3a6b09fc6))

## [4.105.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.105.0...@toptal/picasso@4.105.1) (2020-10-07)

**Note:** Version bump only for package @toptal/picasso

# [4.105.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.104.0...@toptal/picasso@4.105.0) (2020-10-06)

### Features

- **icon:** add phoneDown16 icon ([#1602](https://github.com/toptal/picasso/issues/1602)) ([bd6d7a6](https://github.com/toptal/picasso/commit/bd6d7a68f4bdb5c78e3337852a2b04da2d896c41))

# [4.104.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.103.1...@toptal/picasso@4.104.0) (2020-10-02)

### Features

- **icons:** add RepresentativesSolid icons ([#1596](https://github.com/toptal/picasso/issues/1596)) ([cabc4e6](https://github.com/toptal/picasso/commit/cabc4e61303872674dc89536b24951698bc468c9))

## [4.103.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.103.0...@toptal/picasso@4.103.1) (2020-10-01)

### Bug Fixes

- fix value is not set when options dynamic ([#1591](https://github.com/toptal/picasso/issues/1591)) ([53a6241](https://github.com/toptal/picasso/commit/53a624192b7df90f5236d83d86cbcfd703055c2d))

# [4.103.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.102.0...@toptal/picasso@4.103.0) (2020-09-30)

### Features

- **icon:** add abstract icon ([#1594](https://github.com/toptal/picasso/issues/1594)) ([a7cf59a](https://github.com/toptal/picasso/commit/a7cf59a64bdba6195c940e06fbd2943c7b677ba7))

# [4.102.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.101.2...@toptal/picasso@4.102.0) (2020-09-30)

### Features

- **icon:** add confluence icon ([#1592](https://github.com/toptal/picasso/issues/1592)) ([efeb5f0](https://github.com/toptal/picasso/commit/efeb5f0ca919b0486f8cd06c4f98e72abcfb1a43))

## [4.101.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.101.1...@toptal/picasso@4.101.2) (2020-09-28)

### Bug Fixes

- default tooltip delay ([#1579](https://github.com/toptal/picasso/issues/1579)) ([df58e02](https://github.com/toptal/picasso/commit/df58e02abbcc4932ba584b0b8fce135a34152e34))

## [4.101.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.101.0...@toptal/picasso@4.101.1) (2020-09-25)

### Bug Fixes

- **ScrollMenu:** calculation in useLayoutEffect ([#1580](https://github.com/toptal/picasso/issues/1580)) ([2186a20](https://github.com/toptal/picasso/commit/2186a206395fad5f8d40d42e601dcc36ca144248))

# [4.101.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.100.1...@toptal/picasso@4.101.0) (2020-09-24)

### Features

- **Tooltip:** add maxWidth prop ([#1553](https://github.com/toptal/picasso/issues/1553)) ([bc9ad59](https://github.com/toptal/picasso/commit/bc9ad599cd4930dd88bf227205e25c648c1bce69))

## [4.100.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.100.0...@toptal/picasso@4.100.1) (2020-09-24)

### Bug Fixes

- **Select:** fix select behavior on-blur ([#1583](https://github.com/toptal/picasso/issues/1583)) ([e381ff2](https://github.com/toptal/picasso/commit/e381ff2cbc478babf81eae1820db7d983685a91d))

# [4.100.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.99.2...@toptal/picasso@4.100.0) (2020-09-24)

### Features

- **icons:** add rank icons ([#1582](https://github.com/toptal/picasso/issues/1582)) ([2208b74](https://github.com/toptal/picasso/commit/2208b747d988114608bd9a0ebe2c08cdd0282d3d))

## [4.99.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.99.1...@toptal/picasso@4.99.2) (2020-09-23)

### Bug Fixes

- **AccountSelect:** fix grid in the story for mobile ([#1574](https://github.com/toptal/picasso/issues/1574)) ([e9c4458](https://github.com/toptal/picasso/commit/e9c44585987fd2778993819306c265655f3a4146))

## [4.99.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.99.0...@toptal/picasso@4.99.1) (2020-09-18)

### Bug Fixes

- **tooltip:** trigger immediately on touch ([#1565](https://github.com/toptal/picasso/issues/1565)) ([5a8947b](https://github.com/toptal/picasso/commit/5a8947ba13f0217ee9339e3207f8d5aaac021446))

# [4.99.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.98.1...@toptal/picasso@4.99.0) (2020-09-17)

### Bug Fixes

- **tooltip:** fix compact size variant for tooltip component ([#1566](https://github.com/toptal/picasso/issues/1566)) ([93fae41](https://github.com/toptal/picasso/commit/93fae4172fe1695f88d658787ea6f4928255e7e0))

### Features

- **Modal:** add alignment prop ([#1568](https://github.com/toptal/picasso/issues/1568)) ([5e37748](https://github.com/toptal/picasso/commit/5e37748d9da5a528ba641348bb4f073e249d0070))

## [4.98.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.98.0...@toptal/picasso@4.98.1) (2020-09-14)

### Bug Fixes

- **Modal:** detect focus inside tooltip correctly if there are many ([59ebdff](https://github.com/toptal/picasso/commit/59ebdff726d7d98d5cf944ae8f27f018e928883e))

# [4.98.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.97.2...@toptal/picasso@4.98.0) (2020-09-10)

### Features

- **icon:** add services icon ([#1562](https://github.com/toptal/picasso/issues/1562)) ([91a39c8](https://github.com/toptal/picasso/commit/91a39c83ff8a8970abffa0fef9c2da24e347bea5))

## [4.97.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.97.1...@toptal/picasso@4.97.2) (2020-09-09)

**Note:** Version bump only for package @toptal/picasso

## [4.97.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.97.0...@toptal/picasso@4.97.1) (2020-09-04)

### Bug Fixes

- **Select:** fix scrolling for Select ([#1547](https://github.com/toptal/picasso/issues/1547)) ([ee893f5](https://github.com/toptal/picasso/commit/ee893f545fa7679cbc88256900342fdc459fde5b))

# [4.97.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.96.0...@toptal/picasso@4.97.0) (2020-09-04)

### Features

- **Autocomplete:** pass event in Autocomplete onSelect ([#1549](https://github.com/toptal/picasso/issues/1549)) ([ed47c51](https://github.com/toptal/picasso/commit/ed47c514edfec8023df277a1cb915eb7526959a0))

# [4.96.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.95.0...@toptal/picasso@4.96.0) (2020-09-03)

### Features

- **icon:** add timesheet icon ([#1546](https://github.com/toptal/picasso/issues/1546)) ([2e0b42c](https://github.com/toptal/picasso/commit/2e0b42c4889ccafd2cdb2d15b7fe692ea3d14ab8))

# [4.95.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.3...@toptal/picasso@4.95.0) (2020-09-02)

### Features

- **tooltip:** add compact size for tooltip component ([#1532](https://github.com/toptal/picasso/issues/1532)) ([3ed94f3](https://github.com/toptal/picasso/commit/3ed94f3fa1cadc33d83652baadb32e69d7becf2b))

## [4.94.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.2...@toptal/picasso@4.94.3) (2020-09-02)

### Reverts

- Revert "fix(Select): fix scrolling for Select (#1539)" (#1544) ([5acdaf7](https://github.com/toptal/picasso/commit/5acdaf73aaad6aa2ecca9ed74ed59c700b9ced34)), closes [#1539](https://github.com/toptal/picasso/issues/1539) [#1544](https://github.com/toptal/picasso/issues/1544)

## [4.94.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.1...@toptal/picasso@4.94.2) (2020-09-02)

### Bug Fixes

- **Select:** fix scrolling for Select ([#1539](https://github.com/toptal/picasso/issues/1539)) ([e9ba8e4](https://github.com/toptal/picasso/commit/e9ba8e470e258934f71e04eb7962f8c49bb43052))

## [4.94.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.94.0...@toptal/picasso@4.94.1) (2020-09-02)

**Note:** Version bump only for package @toptal/picasso

# [4.94.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.6...@toptal/picasso@4.94.0) (2020-09-02)

### Features

- **Link:** add rel="noopener" to target="\_blank" ([#1482](https://github.com/toptal/picasso/issues/1482)) ([2c7729e](https://github.com/toptal/picasso/commit/2c7729eb57d007df3dcfc1f70dbd41f3014febf2))

## [4.93.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.5...@toptal/picasso@4.93.6) (2020-09-01)

### Reverts

- Revert "fix: remove onMouseEnter (#1524)" (#1538) ([2bea39a](https://github.com/toptal/picasso/commit/2bea39af37131472484afc3b513a541f1b888407)), closes [#1524](https://github.com/toptal/picasso/issues/1524) [#1538](https://github.com/toptal/picasso/issues/1538)

## [4.93.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.4...@toptal/picasso@4.93.5) (2020-09-01)

### Bug Fixes

- **treeview:** fix issue with treeView on safari ([#1464](https://github.com/toptal/picasso/issues/1464)) ([3fd7606](https://github.com/toptal/picasso/commit/3fd76064733cf05851f4cf4d161a7f9cb5e61cd5))

## [4.93.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.3...@toptal/picasso@4.93.4) (2020-09-01)

### Bug Fixes

- remove onMouseEnter ([#1524](https://github.com/toptal/picasso/issues/1524)) ([e75378a](https://github.com/toptal/picasso/commit/e75378a12c21aef9b9a1d01c66b6826fc93d163e))

## [4.93.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.2...@toptal/picasso@4.93.3) (2020-09-01)

### Bug Fixes

- **OutlinedInput:** add tabIndex -1 to reset button ([#1534](https://github.com/toptal/picasso/issues/1534)) ([c98509f](https://github.com/toptal/picasso/commit/c98509fc72d129c2bcd77a4d45aba09e294c1f86))

## [4.93.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.1...@toptal/picasso@4.93.2) (2020-09-01)

**Note:** Version bump only for package @toptal/picasso

## [4.93.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.93.0...@toptal/picasso@4.93.1) (2020-08-31)

**Note:** Version bump only for package @toptal/picasso

# [4.93.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.92.1...@toptal/picasso@4.93.0) (2020-08-27)

### Features

- **NumberInput:** add start adornment ([#1501](https://github.com/toptal/picasso/issues/1501)) ([cc0e22a](https://github.com/toptal/picasso/commit/cc0e22a284ba899a0e6a4e8e6927a6305a213373))

## [4.92.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.92.0...@toptal/picasso@4.92.1) (2020-08-26)

**Note:** Version bump only for package @toptal/picasso

# [4.92.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.91.0...@toptal/picasso@4.92.0) (2020-08-26)

### Features

- **icon:** add light blue to icon color variants ([#1508](https://github.com/toptal/picasso/issues/1508)) ([b24210a](https://github.com/toptal/picasso/commit/b24210a28318cf3c39307da6f236c1a2dcb933a9))

# [4.91.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.90.0...@toptal/picasso@4.91.0) (2020-08-25)

### Features

- **tooltip:** add delay prop to the Tooltip component ([#1462](https://github.com/toptal/picasso/issues/1462)) ([65a235e](https://github.com/toptal/picasso/commit/65a235e1edc3c158ebab1df89faf6b662c20d087))

# [4.90.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.89.0...@toptal/picasso@4.90.0) (2020-08-24)

### Features

- **ExpandableRow:** allow rendering without initial transition ([#1494](https://github.com/toptal/picasso/issues/1494)) ([603ae31](https://github.com/toptal/picasso/commit/603ae31879765b407be2f3bb826bf3aa764b6fc7))

# [4.89.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.88.0...@toptal/picasso@4.89.0) (2020-08-20)

### Features

- **Slider:** add options to hide thumb and track highlight ([#1495](https://github.com/toptal/picasso/issues/1495)) ([adf27e4](https://github.com/toptal/picasso/commit/adf27e426a4dd1c21a133418b9009376cd26caf0))

# [4.88.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.87.1...@toptal/picasso@4.88.0) (2020-08-17)

### Features

- **indicator:** add green and light-grey Indicator colors ([#1489](https://github.com/toptal/picasso/issues/1489)) ([bb8f72e](https://github.com/toptal/picasso/commit/bb8f72e55ef038e5359ca1b9add7acf1d8e0d5dd))

## [4.87.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.87.0...@toptal/picasso@4.87.1) (2020-08-14)

**Note:** Version bump only for package @toptal/picasso

# [4.87.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.86.1...@toptal/picasso@4.87.0) (2020-08-13)

### Features

- **Select:** add noOptionText to Select props ([#1473](https://github.com/toptal/picasso/issues/1473)) ([164354a](https://github.com/toptal/picasso/commit/164354a371fd7307a833e3be086863ec8cebcad3))

## [4.86.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.86.0...@toptal/picasso@4.86.1) (2020-08-12)

**Note:** Version bump only for package @toptal/picasso

# [4.86.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.85.0...@toptal/picasso@4.86.0) (2020-08-12)

### Features

- **icon:** add reset icon ([#1477](https://github.com/toptal/picasso/issues/1477)) ([dd48b07](https://github.com/toptal/picasso/commit/dd48b078c8141f0679207a64cd8281ab1f6c7791))

# [4.85.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.84.2...@toptal/picasso@4.85.0) (2020-08-11)

### Features

- **TagSelector:** add noOptionText to TagSelector props ([#1466](https://github.com/toptal/picasso/issues/1466)) ([5cf4bfc](https://github.com/toptal/picasso/commit/5cf4bfcade283601dad56f185ada98861454a765))

## [4.84.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.84.1...@toptal/picasso@4.84.2) (2020-08-11)

**Note:** Version bump only for package @toptal/picasso

## [4.84.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.84.0...@toptal/picasso@4.84.1) (2020-08-10)

**Note:** Version bump only for package @toptal/picasso

# [4.84.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.83.0...@toptal/picasso@4.84.0) (2020-08-10)

### Features

- add disable portal for slider ([#1467](https://github.com/toptal/picasso/issues/1467)) ([08b4460](https://github.com/toptal/picasso/commit/08b4460ba2ebac7b26a82d35bb75e8fd48436c6e))

# [4.83.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.3...@toptal/picasso@4.83.0) (2020-08-10)

### Features

- **icon:** add component icon ([#1470](https://github.com/toptal/picasso/issues/1470)) ([b9e8eab](https://github.com/toptal/picasso/commit/b9e8eabf7c6520e32e131b5938db677b06b8b2e9))

## [4.82.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.2...@toptal/picasso@4.82.3) (2020-08-06)

### Bug Fixes

- **Select:** fix scrolling on hover of the bottom element ([#1461](https://github.com/toptal/picasso/issues/1461)) ([908cfe4](https://github.com/toptal/picasso/commit/908cfe40758cb2ed1b819672df0c6b460a2c7072))

## [4.82.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.1...@toptal/picasso@4.82.2) (2020-08-05)

### Bug Fixes

- the menu is not visible for disabled select ([#1459](https://github.com/toptal/picasso/issues/1459)) ([b8be7c0](https://github.com/toptal/picasso/commit/b8be7c0e9c11a96c58104499e3ceac35b8819b80))

## [4.82.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.82.0...@toptal/picasso@4.82.1) (2020-08-03)

### Bug Fixes

- show the tooltip for disabled checkbox ([#1456](https://github.com/toptal/picasso/issues/1456)) ([2ede2fb](https://github.com/toptal/picasso/commit/2ede2fbfd703bf73c56c4cc0b2e0ba9c9867ae73))

# [4.82.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.81.0...@toptal/picasso@4.82.0) (2020-08-03)

### Features

- **icon:** add gift icon ([#1457](https://github.com/toptal/picasso/issues/1457)) ([f6bcf3b](https://github.com/toptal/picasso/commit/f6bcf3ba767abea464cdff60d86337504a9286b1))

# [4.81.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.80.0...@toptal/picasso@4.81.0) (2020-07-31)

### Features

- **forms:** add CheckboxGroup ([#1448](https://github.com/toptal/picasso/issues/1448)) ([61e8570](https://github.com/toptal/picasso/commit/61e8570bf0842f3e55dc0ecc8b45cd85a9891bef))

# [4.80.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.3...@toptal/picasso@4.80.0) (2020-07-24)

### Features

- **icon:** add link icon ([#1445](https://github.com/toptal/picasso/issues/1445)) ([4248b13](https://github.com/toptal/picasso/commit/4248b139a410de2a6ebd3153a87e24dad993f98f))

## [4.79.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.2...@toptal/picasso@4.79.3) (2020-07-23)

### Bug Fixes

- **Slider:** add missing field in ValueLabelProps interface ([#1443](https://github.com/toptal/picasso/issues/1443)) ([612fdc5](https://github.com/toptal/picasso/commit/612fdc56a87715cd6f9e601645878e2f5b192e69))

## [4.79.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.1...@toptal/picasso@4.79.2) (2020-07-23)

### Bug Fixes

- **Modal:** background moving when modal is open ([#1439](https://github.com/toptal/picasso/issues/1439)) ([1588184](https://github.com/toptal/picasso/commit/1588184f625cfc26edd36074dfb7fb47dcb68279))

## [4.79.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.79.0...@toptal/picasso@4.79.1) (2020-07-16)

### Bug Fixes

- prompt modal submit button when loading is not disabled ([#1430](https://github.com/toptal/picasso/issues/1430)) ([41d0d46](https://github.com/toptal/picasso/commit/41d0d46b5b119e85e05871c830a73dcc12f6bb01))

# [4.79.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.78.1...@toptal/picasso@4.79.0) (2020-07-15)

### Features

- [TEA-1430] add eye crossed icons ([#1435](https://github.com/toptal/picasso/issues/1435)) ([f57bde6](https://github.com/toptal/picasso/commit/f57bde6a0b1dfae5ae208282aa206295de42c132))

## [4.78.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.78.0...@toptal/picasso@4.78.1) (2020-07-15)

### Bug Fixes

- export static props to be able to extend via styled ([#1434](https://github.com/toptal/picasso/issues/1434)) ([0aaffd2](https://github.com/toptal/picasso/commit/0aaffd2a0b73c80025028ce76f868d13e3fbd522))

# [4.78.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.77.2...@toptal/picasso@4.78.0) (2020-07-15)

### Features

- add text selection on focus to Select component ([#1433](https://github.com/toptal/picasso/issues/1433)) ([244e17e](https://github.com/toptal/picasso/commit/244e17ecae59a4ba6744effe5f7b088ad9119f62))

## [4.77.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.77.1...@toptal/picasso@4.77.2) (2020-07-14)

### Bug Fixes

- ignore titleCase for Autocomplete options ([#1432](https://github.com/toptal/picasso/issues/1432)) ([e35899e](https://github.com/toptal/picasso/commit/e35899e1ecc1148f2b049d24594574af6005125a))

## [4.77.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.77.0...@toptal/picasso@4.77.1) (2020-07-14)

### Bug Fixes

- ignore titleCase for Select options ([#1431](https://github.com/toptal/picasso/issues/1431)) ([5b24f3e](https://github.com/toptal/picasso/commit/5b24f3e7c4f5ccfff5400de7d233dedebcaa2002))

# [4.77.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.76.1...@toptal/picasso@4.77.0) (2020-07-14)

### Features

- add dispute and pause icons ([#1427](https://github.com/toptal/picasso/issues/1427)) ([c06cb46](https://github.com/toptal/picasso/commit/c06cb4645f1205a44e8b370b93664a977bc5ea74))

## [4.76.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.76.0...@toptal/picasso@4.76.1) (2020-07-13)

### Bug Fixes

- **TableSectionHead:** [BXFE-486] Add colspan ([#1424](https://github.com/toptal/picasso/issues/1424)) ([d2ccdf8](https://github.com/toptal/picasso/commit/d2ccdf85602eb8be5fe092fc3decb6f49bbf1bc6))

# [4.76.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.75.0...@toptal/picasso@4.76.0) (2020-07-13)

### Features

- use AP-style title case for components ([#1422](https://github.com/toptal/picasso/issues/1422)) ([b64ed4c](https://github.com/toptal/picasso/commit/b64ed4cdb50c9d306c1c492332e4db498ab0cb72))

# [4.75.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.7...@toptal/picasso@4.75.0) (2020-07-10)

### Features

- **tablesectionhead:** bxfe-486 Implement Table Section Head ([#1423](https://github.com/toptal/picasso/issues/1423)) ([e6dec1c](https://github.com/toptal/picasso/commit/e6dec1c9adb3f8e702bdb5cc3dd5e78d457688fb))

## [4.74.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.6...@toptal/picasso@4.74.7) (2020-07-03)

### Bug Fixes

- remove tooltip blur delay ([#1413](https://github.com/toptal/picasso/issues/1413)) ([1826f18](https://github.com/toptal/picasso/commit/1826f1858c6c6dbfc793300b062723b247d0ef8e))

## [4.74.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.5...@toptal/picasso@4.74.6) (2020-07-01)

### Bug Fixes

- **Grid:** fix for classes prop in Grid components ([#1408](https://github.com/toptal/picasso/issues/1408)) ([f6bc2e2](https://github.com/toptal/picasso/commit/f6bc2e2f8f2552f03077500516a3a7c07616113c))

## [4.74.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.4...@toptal/picasso@4.74.5) (2020-07-01)

### Bug Fixes

- add white Container variant ([#1405](https://github.com/toptal/picasso/issues/1405)) ([bdd613a](https://github.com/toptal/picasso/commit/bdd613a7b6f315b7ef716e96687d34a76784b2d5))

## [4.74.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.3...@toptal/picasso@4.74.4) (2020-07-01)

### Bug Fixes

- typings in type declarations for picasso-shared ([#1402](https://github.com/toptal/picasso/issues/1402)) ([4129e7c](https://github.com/toptal/picasso/commit/4129e7c04526f7f83a2e1074bd76f9a0ae3d5184))

## [4.74.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.2...@toptal/picasso@4.74.3) (2020-06-29)

### Bug Fixes

- enable the first option in NativeSelect if enableReset is true ([#1395](https://github.com/toptal/picasso/issues/1395)) ([1a48eb6](https://github.com/toptal/picasso/commit/1a48eb661a86c14edcf5e4a8a0e99be0427cef1b))

## [4.74.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.1...@toptal/picasso@4.74.2) (2020-06-24)

### Bug Fixes

- **FormField:** align the top margin with the base design ([#1391](https://github.com/toptal/picasso/issues/1391)) ([fbd1455](https://github.com/toptal/picasso/commit/fbd14558cf1b12046fffe9168f71146dc0fabf78))

## [4.74.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.74.0...@toptal/picasso@4.74.1) (2020-06-22)

**Note:** Version bump only for package @toptal/picasso

# [4.74.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.73.1...@toptal/picasso@4.74.0) (2020-06-22)

### Features

- set default tooltip delay to .5 seconds ([#1386](https://github.com/toptal/picasso/issues/1386)) ([7a5b374](https://github.com/toptal/picasso/commit/7a5b374ee1c97e6242c23574aa57e1d17425e753))

## [4.73.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.73.0...@toptal/picasso@4.73.1) (2020-06-22)

### Bug Fixes

- documentation for Button ([#1387](https://github.com/toptal/picasso/issues/1387)) ([e53beec](https://github.com/toptal/picasso/commit/e53beec52a02f5ae57a5a46aba46fb9d611bda5e))

# [4.73.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.72.0...@toptal/picasso@4.73.0) (2020-06-16)

### Features

- **Avatar:** limit initials to 3 and fix size ([#1377](https://github.com/toptal/picasso/issues/1377)) ([6a46923](https://github.com/toptal/picasso/commit/6a46923e820024d3949c623444d92f08e345a8fc))

# [4.72.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.71.0...@toptal/picasso@4.72.0) (2020-06-12)

### Features

- add topcall icons ([#1380](https://github.com/toptal/picasso/issues/1380)) ([fd4f29e](https://github.com/toptal/picasso/commit/fd4f29ea390edfb1228f6e7dffb1dcb1a9097096))

# [4.71.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.70.0...@toptal/picasso@4.71.0) (2020-06-11)

### Features

- add global component props overriding ([#1357](https://github.com/toptal/picasso/issues/1357)) ([c251d5b](https://github.com/toptal/picasso/commit/c251d5b09353d407b2332b177921a0d4dad54470))

# [4.70.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.4...@toptal/picasso@4.70.0) (2020-06-09)

### Features

- **TagSelector:** add custom label render ([#1367](https://github.com/toptal/picasso/issues/1367)) ([3f2f8fb](https://github.com/toptal/picasso/commit/3f2f8fb3ea08de60ef2bed1b11aa28c798e542b9))

## [4.69.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.3...@toptal/picasso@4.69.4) (2020-06-09)

### Bug Fixes

- **input:** set background color to white ([#1369](https://github.com/toptal/picasso/issues/1369)) ([9083580](https://github.com/toptal/picasso/commit/90835807bf2ad4a2bb0413dac3984fb4a03c5c69)), closes [#1368](https://github.com/toptal/picasso/issues/1368)

## [4.69.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.2...@toptal/picasso@4.69.3) (2020-06-08)

**Note:** Version bump only for package @toptal/picasso

## [4.69.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.1...@toptal/picasso@4.69.2) (2020-06-08)

### Bug Fixes

- **button:** eliminate circular dependency on utils ([#1363](https://github.com/toptal/picasso/issues/1363)) ([8ce21cf](https://github.com/toptal/picasso/commit/8ce21cf8ab6773deb5c8a65e02827df10d091fbc))

## [4.69.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.69.0...@toptal/picasso@4.69.1) (2020-06-04)

### Bug Fixes

- **modal:** fix modal height on iPhone ([#1353](https://github.com/toptal/picasso/issues/1353)) ([9724ba8](https://github.com/toptal/picasso/commit/9724ba89200964c72710f7b571bb45430ce923e6))

# [4.69.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.68.0...@toptal/picasso@4.69.0) (2020-06-04)

### Features

- add company icon ([#1356](https://github.com/toptal/picasso/issues/1356)) ([3e6fad0](https://github.com/toptal/picasso/commit/3e6fad00f6227fed72a8a6a9b382aa7e8817b353))

# [4.68.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.67.0...@toptal/picasso@4.68.0) (2020-06-03)

### Features

- forward all props for Indicator ([#1347](https://github.com/toptal/picasso/issues/1347)) ([331bbd6](https://github.com/toptal/picasso/commit/331bbd6e7ac298cfb90412a5f0ecb70f9523fc78))

# [4.67.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.66.1...@toptal/picasso@4.67.0) (2020-06-03)

### Features

- add titleCase configuration for Picasso ([#1354](https://github.com/toptal/picasso/issues/1354)) ([072add9](https://github.com/toptal/picasso/commit/072add9e2e7a65bc16aabf327136ab6899750503))

## [4.66.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.66.0...@toptal/picasso@4.66.1) (2020-06-02)

**Note:** Version bump only for package @toptal/picasso

# [4.66.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.65.0...@toptal/picasso@4.66.0) (2020-06-01)

### Features

- add full-screen size for modal ([#1342](https://github.com/toptal/picasso/issues/1342)) ([3f57fb5](https://github.com/toptal/picasso/commit/3f57fb588311c9f46050f9235286fecaff66a7f2))

# [4.65.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.64.1...@toptal/picasso@4.65.0) (2020-05-29)

### Features

- add question icons ([#1341](https://github.com/toptal/picasso/issues/1341)) ([cc77594](https://github.com/toptal/picasso/commit/cc775948b9dfbfe3672e62535d8b5a3b6c9be5d6))

## [4.64.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.64.0...@toptal/picasso@4.64.1) (2020-05-28)

### Bug Fixes

- **popper:** fix width calculation for Popper ([#1338](https://github.com/toptal/picasso/issues/1338)) ([46aeb4d](https://github.com/toptal/picasso/commit/46aeb4daab47fa0cbe526ef27f14a993ebd2faa2))

# [4.64.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.4...@toptal/picasso@4.64.0) (2020-05-26)

### Features

- add disabled state for TagSelector ([#1325](https://github.com/toptal/picasso/issues/1325)) ([6d9bb06](https://github.com/toptal/picasso/commit/6d9bb06bfef1a6ed023cac2eebde60fb2904f6f4))

## [4.63.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.3...@toptal/picasso@4.63.4) (2020-05-26)

### Bug Fixes

- add width for Numberinput ([#1328](https://github.com/toptal/picasso/issues/1328)) ([3a6da4f](https://github.com/toptal/picasso/commit/3a6da4f9fb2b43aab7097fb819562b981ff67cd3))

## [4.63.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.2...@toptal/picasso@4.63.3) (2020-05-25)

### Bug Fixes

- **popper:** disable compact mode for Autocomplete and Select ([#1320](https://github.com/toptal/picasso/issues/1320)) ([4f08250](https://github.com/toptal/picasso/commit/4f08250c9e8f34d5e678cc6e9bd5bc6d7b15b774))

## [4.63.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.1...@toptal/picasso@4.63.2) (2020-05-22)

### Bug Fixes

- **forms:** fix wrong references in types in picass-forms ([#1330](https://github.com/toptal/picasso/issues/1330)) ([c4aab7b](https://github.com/toptal/picasso/commit/c4aab7bd8e51888119d7a7697385239acbf33cdc))

## [4.63.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.63.0...@toptal/picasso@4.63.1) (2020-05-22)

### Bug Fixes

- **autocomplete:** add `isSelect` argument for keyboard selection ([#1331](https://github.com/toptal/picasso/issues/1331)) ([46b7d53](https://github.com/toptal/picasso/commit/46b7d53ef55a9b6b483895c8ad1b4f3430a23de6))

# [4.63.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.62.1...@toptal/picasso@4.63.0) (2020-05-21)

### Features

- update logo ([#1324](https://github.com/toptal/picasso/issues/1324)) ([10a43ae](https://github.com/toptal/picasso/commit/10a43ae3624ded54e713681217643affa80bdea9))

## [4.62.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.62.0...@toptal/picasso@4.62.1) (2020-05-21)

**Note:** Version bump only for package @toptal/picasso

# [4.62.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.61.0...@toptal/picasso@4.62.0) (2020-05-19)

### Features

- **Select:** [FX-959] Add onSearchChange handler ([#1318](https://github.com/toptal/picasso/issues/1318)) ([8e4bc28](https://github.com/toptal/picasso/commit/8e4bc289a156ac55b0163cb2b5eb56635951204c))

# [4.61.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.60.1...@toptal/picasso@4.61.0) (2020-05-19)

### Features

- ignore onClick for loading buttons ([#1319](https://github.com/toptal/picasso/issues/1319)) ([6984218](https://github.com/toptal/picasso/commit/69842186c1702009fca345cea59af6cbac311716))

## [4.60.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.60.0...@toptal/picasso@4.60.1) (2020-05-18)

### Bug Fixes

- **autocomplete:** fix size of the dropdown for full width autocomplete ([#1317](https://github.com/toptal/picasso/issues/1317)) ([ddab612](https://github.com/toptal/picasso/commit/ddab6122d6931863949458b49b98ee147a887811))

# [4.60.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.59.0...@toptal/picasso@4.60.0) (2020-05-18)

### Features

- add TagSelector, DatePicker in picasso-forms ([#1297](https://github.com/toptal/picasso/issues/1297)) ([0e8f2dc](https://github.com/toptal/picasso/commit/0e8f2dcb47f44e19ac4d72914b8a90576d70381c))

# [4.59.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.58.1...@toptal/picasso@4.59.0) (2020-05-15)

### Features

- **icon:** add report icon ([#1314](https://github.com/toptal/picasso/issues/1314)) ([19e401a](https://github.com/toptal/picasso/commit/19e401aa180139f3ca0ec2415405039dcee2252f))

## [4.58.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.58.0...@toptal/picasso@4.58.1) (2020-05-14)

### Bug Fixes

- **select:** forget highlighted option on toggle ([#1312](https://github.com/toptal/picasso/issues/1312)) ([8a5fa83](https://github.com/toptal/picasso/commit/8a5fa8333e15b77673ea1afa6d1e24ca42f93296))

# [4.58.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.57.1...@toptal/picasso@4.58.0) (2020-05-14)

### Features

- **icon:** change single and multi icons ([#1308](https://github.com/toptal/picasso/issues/1308)) ([1c4aee6](https://github.com/toptal/picasso/commit/1c4aee60c5de8350583a8ebbbfc938e16c485d39))

## [4.57.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.57.0...@toptal/picasso@4.57.1) (2020-05-14)

### Bug Fixes

- add picasso/utils import alias ([#1305](https://github.com/toptal/picasso/issues/1305)) ([905f808](https://github.com/toptal/picasso/commit/905f80867f940dd7971a8bb7454a5dc73a42818f))

# [4.57.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.3...@toptal/picasso@4.57.0) (2020-05-13)

### Features

- **icon:** add eye and ownerDefault icons ([#1306](https://github.com/toptal/picasso/issues/1306)) ([aed40a0](https://github.com/toptal/picasso/commit/aed40a07f31fd93b92818f8603fff89c4ca48001))

## [4.56.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.2...@toptal/picasso@4.56.3) (2020-05-13)

### Bug Fixes

- **select:** do not highlight first option ([#1301](https://github.com/toptal/picasso/issues/1301)) ([cd111e1](https://github.com/toptal/picasso/commit/cd111e1af429cc85471443d94a649ec5a7902ef8))

## [4.56.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.1...@toptal/picasso@4.56.2) (2020-05-13)

### Bug Fixes

- some types in picasso-forms by adding ts checks in examples ([#1304](https://github.com/toptal/picasso/issues/1304)) ([1b89f8f](https://github.com/toptal/picasso/commit/1b89f8f86f1ae1d59e51e08387efef2c158fe794))

## [4.56.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.56.0...@toptal/picasso@4.56.1) (2020-05-13)

### Bug Fixes

- add yarn deduplicate package ([#1299](https://github.com/toptal/picasso/issues/1299)) ([c6e5ea3](https://github.com/toptal/picasso/commit/c6e5ea387ef517aa894d975a73bf3f6fb20490a3))

# [4.56.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.4...@toptal/picasso@4.56.0) (2020-05-13)

### Features

- **icon:** add CMS icons ([#1302](https://github.com/toptal/picasso/issues/1302)) ([d370ba8](https://github.com/toptal/picasso/commit/d370ba8eb149c911708d9225a3eb06b1f2ea47f9))

## [4.55.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.3...@toptal/picasso@4.55.4) (2020-05-12)

**Note:** Version bump only for package @toptal/picasso

## [4.55.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.2...@toptal/picasso@4.55.3) (2020-05-12)

### Bug Fixes

- **Select:** fix scrolling on hover of boundary elements ([#1292](https://github.com/toptal/picasso/issues/1292)) ([9d28a9b](https://github.com/toptal/picasso/commit/9d28a9b7594b236e3da5ee1fde6952198b7dbc4e))

## [4.55.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.1...@toptal/picasso@4.55.2) (2020-05-12)

**Note:** Version bump only for package @toptal/picasso

## [4.55.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.55.0...@toptal/picasso@4.55.1) (2020-05-11)

### Bug Fixes

- add missing picasso utils exports ([#1295](https://github.com/toptal/picasso/issues/1295)) ([a38f71a](https://github.com/toptal/picasso/commit/a38f71ae363f08d7f82d4eb77d9224b37d600a60))

# [4.55.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.54.0...@toptal/picasso@4.55.0) (2020-05-11)

### Features

- **Icon:** add player icon ([#1288](https://github.com/toptal/picasso/issues/1288)) ([20a3e5b](https://github.com/toptal/picasso/commit/20a3e5bc93f1d9dc5daaf656e292ce520fa0c1a4))

# [4.54.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.53.2...@toptal/picasso@4.54.0) (2020-05-09)

### Features

- **icon:** add profileCrossed icon ([#1291](https://github.com/toptal/picasso/issues/1291)) ([0758503](https://github.com/toptal/picasso/commit/0758503ff36a79e5c1ea9effdc7aa0883e166c31))

## [4.53.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.53.1...@toptal/picasso@4.53.2) (2020-05-08)

### Bug Fixes

- **tablebody:** stripe all children ([#1290](https://github.com/toptal/picasso/issues/1290)) ([c0848b1](https://github.com/toptal/picasso/commit/c0848b105cf19b3d2289e3e1aaa12cf1eed835b1))

## [4.53.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.53.0...@toptal/picasso@4.53.1) (2020-05-08)

### Bug Fixes

- **autocomplete:** remove highlighted selection on change ([#1289](https://github.com/toptal/picasso/issues/1289)) ([bdaba64](https://github.com/toptal/picasso/commit/bdaba64f7d7afc266991e5c9036a6eabc294ddd2))

# [4.53.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.4...@toptal/picasso@4.53.0) (2020-05-07)

### Features

- **autocomplete:** allow not auto-selecting first option ([#1284](https://github.com/toptal/picasso/issues/1284)) ([b62e899](https://github.com/toptal/picasso/commit/b62e89993a959da5258b66837e65b4009b371d44))

## [4.52.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.3...@toptal/picasso@4.52.4) (2020-05-07)

### Bug Fixes

- **Picasso:** simplify theme override ([#1283](https://github.com/toptal/picasso/issues/1283)) ([56a3999](https://github.com/toptal/picasso/commit/56a3999b53e3c934255a9d13b86d87cba6620296))

## [4.52.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.2...@toptal/picasso@4.52.3) (2020-05-06)

### Bug Fixes

- **Select:** make Select a generic ([#1279](https://github.com/toptal/picasso/issues/1279)) ([f75810f](https://github.com/toptal/picasso/commit/f75810f97081e7fc59ae1f0df56994f38dd9baed))

## [4.52.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.1...@toptal/picasso@4.52.2) (2020-05-06)

**Note:** Version bump only for package @toptal/picasso

## [4.52.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.52.0...@toptal/picasso@4.52.1) (2020-05-04)

**Note:** Version bump only for package @toptal/picasso

# [4.52.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.10...@toptal/picasso@4.52.0) (2020-04-30)

### Features

- **Picasso:** add theme property ([#1262](https://github.com/toptal/picasso/issues/1262)) ([1ca7d44](https://github.com/toptal/picasso/commit/1ca7d44ee1716afcd5fddb038b4ac21fe7e35334))

## [4.51.10](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.9...@toptal/picasso@4.51.10) (2020-04-30)

### Bug Fixes

- **Accordion:** [FX-873] Add custom summary example, buttons line height ([#1271](https://github.com/toptal/picasso/issues/1271)) ([ea439c3](https://github.com/toptal/picasso/commit/ea439c3422b723aff0e0d6b0b9825d167ac0e87d))

## [4.51.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.8...@toptal/picasso@4.51.9) (2020-04-28)

**Note:** Version bump only for package @toptal/picasso

## [4.51.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.7...@toptal/picasso@4.51.8) (2020-04-28)

### Bug Fixes

- **Autocomplete:** pass input name property to Input component ([#1264](https://github.com/toptal/picasso/issues/1264)) ([bdca6d8](https://github.com/toptal/picasso/commit/bdca6d8bd2a32224c5cb949e62411280ee082b78))

## [4.51.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.6...@toptal/picasso@4.51.7) (2020-04-27)

### Bug Fixes

- **checkboxgroup:** typings and style issues ([#1261](https://github.com/toptal/picasso/issues/1261)) ([93f6c65](https://github.com/toptal/picasso/commit/93f6c65963bfcdd84cbd66020e019a43ebea604a))

## [4.51.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.5...@toptal/picasso@4.51.6) (2020-04-27)

**Note:** Version bump only for package @toptal/picasso

## [4.51.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.4...@toptal/picasso@4.51.5) (2020-04-24)

**Note:** Version bump only for package @toptal/picasso

## [4.51.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.3...@toptal/picasso@4.51.4) (2020-04-23)

**Note:** Version bump only for package @toptal/picasso

## [4.51.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.2...@toptal/picasso@4.51.3) (2020-04-22)

**Note:** Version bump only for package @toptal/picasso

## [4.51.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.1...@toptal/picasso@4.51.2) (2020-04-20)

### Bug Fixes

- **Input:** fix issue with multiline limit ([#1242](https://github.com/toptal/picasso/issues/1242)) ([d79b247](https://github.com/toptal/picasso/commit/d79b247ac4f2c05a8d6e4a7e5ac390ea6cc6ef26))

## [4.51.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.51.0...@toptal/picasso@4.51.1) (2020-04-17)

### Bug Fixes

- **dropdown:** fix closing dropdown by item click on mobile ([#1241](https://github.com/toptal/picasso/issues/1241)) ([04bfe31](https://github.com/toptal/picasso/commit/04bfe3163b152c7a2b7a98e671fd10ec6ba1e4ac)), closes [#786](https://github.com/toptal/picasso/issues/786)

# [4.51.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.50.2...@toptal/picasso@4.51.0) (2020-04-16)

### Features

- **select:** add checkmarks in multiple mode ([#1233](https://github.com/toptal/picasso/issues/1233)) ([bc42c63](https://github.com/toptal/picasso/commit/bc42c63a20c02824f4d61c2f10a418a16cae2741))

## [4.50.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.50.1...@toptal/picasso@4.50.2) (2020-04-16)

### Bug Fixes

- **tooltip:** get rid of the modifier warning ([#1228](https://github.com/toptal/picasso/issues/1228)) ([3766719](https://github.com/toptal/picasso/commit/37667191c2808450dadb3f93aa51cc86ddb9018e)), closes [re#1227](https://github.com/re/issues/1227)

## [4.50.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.50.0...@toptal/picasso@4.50.1) (2020-04-15)

### Bug Fixes

- export environment types for banner ([#1238](https://github.com/toptal/picasso/issues/1238)) ([4957f01](https://github.com/toptal/picasso/commit/4957f01ab8d780ffae53a302b50e156a20ad944c))

# [4.50.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.3...@toptal/picasso@4.50.0) (2020-04-15)

### Features

- add time icons ([#1237](https://github.com/toptal/picasso/issues/1237)) ([fcef14d](https://github.com/toptal/picasso/commit/fcef14ddcd21394b7b538c53a758952dfe822690))

## [4.49.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.2...@toptal/picasso@4.49.3) (2020-04-15)

### Bug Fixes

- **Select:** randomize id attribute value in forms ([#1225](https://github.com/toptal/picasso/issues/1225)) ([0f7b56b](https://github.com/toptal/picasso/commit/0f7b56b7103aa88acc56c9e0a6b3e09bf5936022))

## [4.49.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.1...@toptal/picasso@4.49.2) (2020-04-09)

**Note:** Version bump only for package @toptal/picasso

## [4.49.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.49.0...@toptal/picasso@4.49.1) (2020-04-09)

### Bug Fixes

- wrong ellipsis at Checkbox and Radio on overflow in Safari ([#1220](https://github.com/toptal/picasso/issues/1220)) ([e076c90](https://github.com/toptal/picasso/commit/e076c90a35d7026eafbb5bfe487a7027f918cc59))

# [4.49.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.3...@toptal/picasso@4.49.0) (2020-04-08)

### Features

- **autocomplete:** add extra `onFocus`/`onBlur` event handlers ([#1218](https://github.com/toptal/picasso/issues/1218)) ([04ae414](https://github.com/toptal/picasso/commit/04ae414a24146f45f51a9224e4bf07579088d32e))

## [4.48.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.2...@toptal/picasso@4.48.3) (2020-04-06)

**Note:** Version bump only for package @toptal/picasso

## [4.48.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.1...@toptal/picasso@4.48.2) (2020-04-06)

### Bug Fixes

- **Autocomplete:** prevent browser autofilling by default ([#1210](https://github.com/toptal/picasso/issues/1210)) ([7ed5d01](https://github.com/toptal/picasso/commit/7ed5d01e86a0146b6254a8a4b4e3fdbece138ee0))

## [4.48.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.48.0...@toptal/picasso@4.48.1) (2020-04-02)

### Bug Fixes

- **Sidebar:** speedup sidebar menu and menu items performance ([#1205](https://github.com/toptal/picasso/issues/1205)) ([0658ec0](https://github.com/toptal/picasso/commit/0658ec041dd4e415b714a0b1d76ee78a178268be))

# [4.48.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.3...@toptal/picasso@4.48.0) (2020-04-02)

### Features

- add TestingPicasso component ([#1171](https://github.com/toptal/picasso/issues/1171)) ([f2d4687](https://github.com/toptal/picasso/commit/f2d4687463f9838d4070ac6f8b7c590243b7018a))

## [4.47.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.2...@toptal/picasso@4.47.3) (2020-04-02)

### Bug Fixes

- **Select:** disable browser autofill by default ([#1200](https://github.com/toptal/picasso/issues/1200)) ([03b970f](https://github.com/toptal/picasso/commit/03b970f992456c3b65343c83a0bf8031cad1a614))

## [4.47.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.1...@toptal/picasso@4.47.2) (2020-04-01)

### Bug Fixes

- **tagselector:** pass `getKey` function to Autocomplete ([#1201](https://github.com/toptal/picasso/issues/1201)) ([be706ff](https://github.com/toptal/picasso/commit/be706ffae1e0812dca7aa92be95ed66fde051bfb))

## [4.47.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.47.0...@toptal/picasso@4.47.1) (2020-03-30)

### Bug Fixes

- **tooltip:** disable long press trigger on touch screens ([#1190](https://github.com/toptal/picasso/issues/1190)) ([636965a](https://github.com/toptal/picasso/commit/636965ad024efa0d62177b65be17f1f1870d62d4)), closes [#1175](https://github.com/toptal/picasso/issues/1175)

# [4.47.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.46.1...@toptal/picasso@4.47.0) (2020-03-30)

### Features

- **tab:** add icon prop to tab component ([#1189](https://github.com/toptal/picasso/issues/1189)) ([17136a1](https://github.com/toptal/picasso/commit/17136a1e1369cabadf7c3b137e13413514eb853f))

## [4.46.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.46.0...@toptal/picasso@4.46.1) (2020-03-30)

### Bug Fixes

- lint errors ([#1191](https://github.com/toptal/picasso/issues/1191)) ([2d830ac](https://github.com/toptal/picasso/commit/2d830ac37b63e5642ccc2c9a0016458dbdd6f7a6))

# [4.46.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.45.1...@toptal/picasso@4.46.0) (2020-03-27)

### Features

- **pagebanner:** extend with compound components ([#1183](https://github.com/toptal/picasso/issues/1183)) ([79c91a6](https://github.com/toptal/picasso/commit/79c91a61a30652803fabbbfce4643f75df3d3aa2))

## [4.45.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.45.0...@toptal/picasso@4.45.1) (2020-03-26)

### Bug Fixes

- **FormControl:** make label smaller by control width ([#1188](https://github.com/toptal/picasso/issues/1188)) ([9d19225](https://github.com/toptal/picasso/commit/9d192256498145ef78dd3b25642a2b131297907b))

# [4.45.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.11...@toptal/picasso@4.45.0) (2020-03-26)

### Features

- add ellipsis on control label overflow ([#1185](https://github.com/toptal/picasso/issues/1185)) ([a38be02](https://github.com/toptal/picasso/commit/a38be02d7a940df73dd6ee4a297ffd694cff71cb))

## [4.44.11](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.10...@toptal/picasso@4.44.11) (2020-03-25)

**Note:** Version bump only for package @toptal/picasso

## [4.44.10](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.9...@toptal/picasso@4.44.10) (2020-03-25)

**Note:** Version bump only for package @toptal/picasso

## [4.44.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.8...@toptal/picasso@4.44.9) (2020-03-25)

### Bug Fixes

- fix popper on header ([#1174](https://github.com/toptal/picasso/issues/1174)) ([8b8c3fd](https://github.com/toptal/picasso/commit/8b8c3fda0e9f455d0f2d36dc8a9ac4f01ba5f314))

## [4.44.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.7...@toptal/picasso@4.44.8) (2020-03-24)

### Bug Fixes

- make use notifications functions identity stable ([#1178](https://github.com/toptal/picasso/issues/1178)) ([0b224f8](https://github.com/toptal/picasso/commit/0b224f873c5beac5345dd25742d8da073a8945ef))

## [4.44.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.6...@toptal/picasso@4.44.7) (2020-03-23)

**Note:** Version bump only for package @toptal/picasso

## [4.44.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.5...@toptal/picasso@4.44.6) (2020-03-20)

### Bug Fixes

- **page.banner:** fix icon alignment ([#1177](https://github.com/toptal/picasso/issues/1177)) ([59b9170](https://github.com/toptal/picasso/commit/59b9170dbfa84a80395c099012ccf0bd93493c4c))

## [4.44.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.4...@toptal/picasso@4.44.5) (2020-03-20)

### Bug Fixes

- **Select:** improve rendering performance ([#1172](https://github.com/toptal/picasso/issues/1172)) ([4a56adb](https://github.com/toptal/picasso/commit/4a56adb7d736af7f2d487381d9bb417c7b14268c))

## [4.44.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.3...@toptal/picasso@4.44.4) (2020-03-19)

**Note:** Version bump only for package @toptal/picasso

## [4.44.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.2...@toptal/picasso@4.44.3) (2020-03-18)

**Note:** Version bump only for package @toptal/picasso

## [4.44.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.1...@toptal/picasso@4.44.2) (2020-03-17)

### Bug Fixes

- **pageheader:** update color of light variant ([#1170](https://github.com/toptal/picasso/issues/1170)) ([ffb4004](https://github.com/toptal/picasso/commit/ffb4004e56571facd3d3b0f95470e16a20f10160))

## [4.44.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.44.0...@toptal/picasso@4.44.1) (2020-03-16)

**Note:** Version bump only for package @toptal/picasso

# [4.44.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.43.0...@toptal/picasso@4.44.0) (2020-03-12)

### Features

- **slider:** show marks ([#1160](https://github.com/toptal/picasso/issues/1160)) ([e5056ff](https://github.com/toptal/picasso/commit/e5056ff748eaa4a4e0d5435879aae912a5a12787))

# [4.43.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.5...@toptal/picasso@4.43.0) (2020-03-11)

### Features

- add leftContent to PageHeader ([#1156](https://github.com/toptal/picasso/issues/1156)) ([afa9bd0](https://github.com/toptal/picasso/commit/afa9bd0b17390ec9628f5811384fbbbfdd11c4c7))

## [4.42.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.4...@toptal/picasso@4.42.5) (2020-03-11)

### Bug Fixes

- **Page:** [FX-823] Fix viewport scaling ([#1159](https://github.com/toptal/picasso/issues/1159)) ([a037d1b](https://github.com/toptal/picasso/commit/a037d1bead309b4422df2f7ff07c65b2c36b3a85))

## [4.42.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.3...@toptal/picasso@4.42.4) (2020-03-09)

### Bug Fixes

- **slider:** get rid of error about incorrect class override ([#1154](https://github.com/toptal/picasso/issues/1154)) ([81d8962](https://github.com/toptal/picasso/commit/81d89622f7553cb06ae7a4f06769b43cbcdc9ab8))

## [4.42.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.2...@toptal/picasso@4.42.3) (2020-03-06)

**Note:** Version bump only for package @toptal/picasso

## [4.42.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.1...@toptal/picasso@4.42.2) (2020-03-06)

### Bug Fixes

- **slider:** fix accessibility of setting value by click on the line ([#1152](https://github.com/toptal/picasso/issues/1152)) ([a1476cf](https://github.com/toptal/picasso/commit/a1476cf829d0dcd437ba7ff45634cc4637ede9cd)), closes [#1151](https://github.com/toptal/picasso/issues/1151)

## [4.42.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.42.0...@toptal/picasso@4.42.1) (2020-03-05)

**Note:** Version bump only for package @toptal/picasso

# [4.42.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.41.0...@toptal/picasso@4.42.0) (2020-03-04)

### Features

- prevent slider tooltip overflow ([#1141](https://github.com/toptal/picasso/issues/1141)) ([1ad08e9](https://github.com/toptal/picasso/commit/1ad08e924421825868a32b975d508098bfc6f4c1))

# [4.41.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.40.1...@toptal/picasso@4.41.0) (2020-03-04)

### Features

- list component ([#1139](https://github.com/toptal/picasso/issues/1139)) ([1c1edc7](https://github.com/toptal/picasso/commit/1c1edc78db8d341ff150a756cae880c61915390e))

## [4.40.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.40.0...@toptal/picasso@4.40.1) (2020-03-03)

### Bug Fixes

- **modal:** avoid circular dependency between modal and useModals hook ([#1145](https://github.com/toptal/picasso/issues/1145)) ([7764a4e](https://github.com/toptal/picasso/commit/7764a4e4c8f6e9abfcf60e24e08997aec438d708)), closes [#1144](https://github.com/toptal/picasso/issues/1144)

# [4.40.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.39.0...@toptal/picasso@4.40.0) (2020-03-03)

### Features

- **Form.Field:** [FX-793] Add final-form field props ([#1143](https://github.com/toptal/picasso/issues/1143)) ([fbed95c](https://github.com/toptal/picasso/commit/fbed95ce7402f09095ffe30a5cd15c70b4c408e7))

# [4.39.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.38.0...@toptal/picasso@4.39.0) (2020-02-28)

### Features

- **use-modals:** implement hideAllModals ([#1137](https://github.com/toptal/picasso/issues/1137)) ([8c45a41](https://github.com/toptal/picasso/commit/8c45a410fb538d6e3271869b277517680264d008))

# [4.38.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.37.0...@toptal/picasso@4.38.0) (2020-02-27)

### Features

- add role for reset button ([#1136](https://github.com/toptal/picasso/issues/1136)) ([00446bd](https://github.com/toptal/picasso/commit/00446bd04a5d22ca99d0d5cace63a01e317db8e9))

# [4.37.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.36.0...@toptal/picasso@4.37.0) (2020-02-26)

### Features

- support test environment at root component ([#1133](https://github.com/toptal/picasso/issues/1133)) ([9e3baaa](https://github.com/toptal/picasso/commit/9e3baaa6b3c23479a46695d0d5a85a702df83038))

# [4.36.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.35.2...@toptal/picasso@4.36.0) (2020-02-26)

### Features

- **input:** new prop to enable manual resize for multiline ([#1134](https://github.com/toptal/picasso/issues/1134)) ([a29388b](https://github.com/toptal/picasso/commit/a29388bdc5aaa16d073085481ccde7e309667b62))

## [4.35.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.35.1...@toptal/picasso@4.35.2) (2020-02-24)

**Note:** Version bump only for package @toptal/picasso

## [4.35.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.35.0...@toptal/picasso@4.35.1) (2020-02-20)

### Bug Fixes

- add environment prop to picasso root component ([#1120](https://github.com/toptal/picasso/issues/1120)) ([3282f58](https://github.com/toptal/picasso/commit/3282f580dcf4acf938e49086112d4aca2a66efee))

# [4.35.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.34.2...@toptal/picasso@4.35.0) (2020-02-20)

### Features

- add test utils ([#1123](https://github.com/toptal/picasso/issues/1123)) ([eddc6df](https://github.com/toptal/picasso/commit/eddc6df73c7be5071012a227e1932b607964f6bc))

## [4.34.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.34.1...@toptal/picasso@4.34.2) (2020-02-20)

### Bug Fixes

- **autocomplete:** onOtherOptionSelect invoke on enter ([#1121](https://github.com/toptal/picasso/issues/1121)) ([a2f8eed](https://github.com/toptal/picasso/commit/a2f8eedabbf64db77638158cd01203f20cec203e))

## [4.34.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.34.0...@toptal/picasso@4.34.1) (2020-02-19)

### Bug Fixes

- run validation on change instead of blur ([#1114](https://github.com/toptal/picasso/issues/1114)) ([edd2b2e](https://github.com/toptal/picasso/commit/edd2b2eb10b4cd00e927f9ea9708af0f7c82caee))

# [4.34.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.33.1...@toptal/picasso@4.34.0) (2020-02-19)

### Features

- disable responsive ui ([#1113](https://github.com/toptal/picasso/issues/1113)) ([cdf111f](https://github.com/toptal/picasso/commit/cdf111f0f50f704406c2cd1a88246458a610a2b7))

## [4.33.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.33.0...@toptal/picasso@4.33.1) (2020-02-18)

### Bug Fixes

- **Tooltip:** remove opacity ([#1117](https://github.com/toptal/picasso/issues/1117)) ([2e9fae8](https://github.com/toptal/picasso/commit/2e9fae8a38074a17ce928aeb36a278ec64403d71))

# [4.33.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.32.1...@toptal/picasso@4.33.0) (2020-02-17)

### Features

- **YearSelect:** allow descending order of years ([#1115](https://github.com/toptal/picasso/issues/1115)) ([65589cc](https://github.com/toptal/picasso/commit/65589cc5988ac420f2e0f5cb68d8d9cbcd8d5b95))

## [4.32.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.32.0...@toptal/picasso@4.32.1) (2020-02-13)

**Note:** Version bump only for package @toptal/picasso

# [4.32.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.6...@toptal/picasso@4.32.0) (2020-02-13)

### Features

- upgrade material-ui to 4.9.2 ([#1101](https://github.com/toptal/picasso/issues/1101)) ([3082e50](https://github.com/toptal/picasso/commit/3082e5081999e673b120d21e4a902cc300d2f922))

## [4.31.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.5...@toptal/picasso@4.31.6) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso

## [4.31.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.3...@toptal/picasso@4.31.5) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso

## [4.31.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.3...@toptal/picasso@4.31.4) (2020-02-12)

**Note:** Version bump only for package @toptal/picasso

## [4.31.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.2...@toptal/picasso@4.31.3) (2020-02-10)

### Bug Fixes

- follow up fix for autocomplete with null options ([#1100](https://github.com/toptal/picasso/issues/1100)) ([3876529](https://github.com/toptal/picasso/commit/3876529e631f30a3a04373577f390978ca2f0222))

## [4.31.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.1...@toptal/picasso@4.31.2) (2020-02-10)

### Bug Fixes

- allow null options for the Autocomplete ([#1091](https://github.com/toptal/picasso/issues/1091)) ([26b8809](https://github.com/toptal/picasso/commit/26b8809ed4616ebff86d41e36e5bc2f706e21f55))

## [4.31.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.31.0...@toptal/picasso@4.31.1) (2020-02-10)

### Bug Fixes

- **Accordion:** make className optional in details ([#1097](https://github.com/toptal/picasso/issues/1097)) ([814a509](https://github.com/toptal/picasso/commit/814a509f08b8e9f4591c2c1bd05d0fe7ee185463))

# [4.31.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.30.1...@toptal/picasso@4.31.0) (2020-02-05)

### Features

- add PageHead component ([#1064](https://github.com/toptal/picasso/issues/1064)) ([17a896e](https://github.com/toptal/picasso/commit/17a896e00a12f37d73f2943370742c98f4e1520c))

## [4.30.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.30.0...@toptal/picasso@4.30.1) (2020-02-05)

### Bug Fixes

- **TagSelector:** fix placeholder input width, align endAdornment ([#1054](https://github.com/toptal/picasso/issues/1054)) ([2b1f90a](https://github.com/toptal/picasso/commit/2b1f90ac0f0405ed25425516d3fa897fc2bb5f92))

# [4.30.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.29.0...@toptal/picasso@4.30.0) (2020-02-05)

### Features

- support wide desktop screen ([#1063](https://github.com/toptal/picasso/issues/1063)) ([0c9eb83](https://github.com/toptal/picasso/commit/0c9eb8366ecb8576143c63bf5a8777103b3e00d9))

# [4.29.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.28.0...@toptal/picasso@4.29.0) (2020-02-04)

### Features

- add focus state to checkbox and radio ([#1069](https://github.com/toptal/picasso/issues/1069)) ([5e714e0](https://github.com/toptal/picasso/commit/5e714e060aac5882be94c93ffc4ef92fc4891673))

# [4.28.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.27.0...@toptal/picasso@4.28.0) (2020-02-04)

### Features

- **Select:** [FX-742] Add threshold for enabling search ([#1065](https://github.com/toptal/picasso/issues/1065)) ([33534db](https://github.com/toptal/picasso/commit/33534dbc8e92ed1b79ea693dfe6e7f1b97759eaa))

# [4.27.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.26.1...@toptal/picasso@4.27.0) (2020-02-04)

### Features

- **popper:** expose popper container props to inputs ([#1050](https://github.com/toptal/picasso/issues/1050)) ([345d732](https://github.com/toptal/picasso/commit/345d7328b1ce915cc259807a55493f7b1e64ba03))

## [4.26.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.26.0...@toptal/picasso@4.26.1) (2020-02-03)

**Note:** Version bump only for package @toptal/picasso

# [4.26.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.25.0...@toptal/picasso@4.26.0) (2020-02-03)

### Features

- **Pagination:** renders null when activePage is bigger than totalPages ([#1040](https://github.com/toptal/picasso/issues/1040)) ([059757c](https://github.com/toptal/picasso/commit/059757c43a6d25002808f82a41591ec54dbba127))

# [4.25.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.24.1...@toptal/picasso@4.25.0) (2020-02-03)

### Features

- **Input:** hide input when type is hidden ([#1042](https://github.com/toptal/picasso/issues/1042)) ([87a5df2](https://github.com/toptal/picasso/commit/87a5df27e32da16115e382533f7efb5a6fa75efe))

## [4.24.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.24.0...@toptal/picasso@4.24.1) (2020-01-31)

**Note:** Version bump only for package @toptal/picasso

# [4.24.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.23.0...@toptal/picasso@4.24.0) (2020-01-30)

### Features

- [FX-698] Prepare forms examples ([#1057](https://github.com/toptal/picasso/issues/1057)) ([86da7ba](https://github.com/toptal/picasso/commit/86da7ba568d15aea619e9dfc8236285cf85741ff))

# [4.23.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.22.0...@toptal/picasso@4.23.0) (2020-01-30)

### Features

- [FX-728] Create FormFileInput ([#1049](https://github.com/toptal/picasso/issues/1049)) ([7c97b7b](https://github.com/toptal/picasso/commit/7c97b7b3a15f34350beecc1f52fbaea9296808d3))

# [4.22.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.21.0...@toptal/picasso@4.22.0) (2020-01-29)

### Features

- **icons:** add long arrow left and right ([#1053](https://github.com/toptal/picasso/issues/1053)) ([417a575](https://github.com/toptal/picasso/commit/417a57592e33dd286422454597848a6cdbda00e2)), closes [#1052](https://github.com/toptal/picasso/issues/1052)

# [4.21.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.20.0...@toptal/picasso@4.21.0) (2020-01-24)

### Features

- **logo:** replace the logo with the 2020 design ([#1044](https://github.com/toptal/picasso/issues/1044)) ([ff58ddb](https://github.com/toptal/picasso/commit/ff58ddb8592b36db6f421348053e57133d267dac))

# [4.20.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.19.2...@toptal/picasso@4.20.0) (2020-01-24)

### Features

- [FX-726] Add Form.Radio ([#1046](https://github.com/toptal/picasso/issues/1046)) ([6753d39](https://github.com/toptal/picasso/commit/6753d39250bc832224566184867936962d97b92f))

## [4.19.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.19.1...@toptal/picasso@4.19.2) (2020-01-24)

### Bug Fixes

- **Select:** issue with options stuck in Chrome when reset ([#1047](https://github.com/toptal/picasso/issues/1047)) ([3f8378b](https://github.com/toptal/picasso/commit/3f8378b5b8368e0207fcc6bc6c12875ffea3d38f))

## [4.19.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.19.0...@toptal/picasso@4.19.1) (2020-01-23)

### Bug Fixes

- **Tooltip:** export props type ([#1041](https://github.com/toptal/picasso/issues/1041)) ([0c2abd4](https://github.com/toptal/picasso/commit/0c2abd4f8cb347bbf71a010a01c47d5e074e7692))

# [4.19.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.18.0...@toptal/picasso@4.19.0) (2020-01-22)

### Features

- **Select:** add reset button ([#1035](https://github.com/toptal/picasso/issues/1035)) ([9f64150](https://github.com/toptal/picasso/commit/9f6415021124c9ddeb57db9eb0f2f42a208e6eb2))

# [4.18.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.17.0...@toptal/picasso@4.18.0) (2020-01-21)

### Features

- **Modal:** [FX-711] Make fullscreen on small screens ([#1034](https://github.com/toptal/picasso/issues/1034)) ([bcc43e2](https://github.com/toptal/picasso/commit/bcc43e2d0961d3f870dc6a42b547b080d41edb36))

# [4.17.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.16.0...@toptal/picasso@4.17.0) (2020-01-21)

### Features

- **Autocomplete:** [FX-353] Add reset button ([#1025](https://github.com/toptal/picasso/issues/1025)) ([207135b](https://github.com/toptal/picasso/commit/207135bbf194ff8efe82c95ed4579d61354f82aa))

# [4.16.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.15.0...@toptal/picasso@4.16.0) (2020-01-20)

### Features

- **icons:** add support for white color ([#1023](https://github.com/toptal/picasso/issues/1023)) ([feedf12](https://github.com/toptal/picasso/commit/feedf12d823446115797bfc19ea9990480798345))
- **input:** add autoFocus prop explicitly to docs ([#1020](https://github.com/toptal/picasso/issues/1020)) ([ab8ce47](https://github.com/toptal/picasso/commit/ab8ce47a205fd6d9c974dd3cd5cae825cca8be18))
- **input:** tweak TextArea counter position ([#1012](https://github.com/toptal/picasso/issues/1012)) ([7788386](https://github.com/toptal/picasso/commit/778838692ff572950dd43b8a2bc0a64681562281))
- **PageBanner:** handle text whitespaces ([#1022](https://github.com/toptal/picasso/issues/1022)) ([d173afe](https://github.com/toptal/picasso/commit/d173afe35dcbce3a07871636407f9dfe363ceb73))

# [4.15.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.14.0...@toptal/picasso@4.15.0) (2020-01-13)

### Features

- **UserBadge:** add support for custom name rendering ([#1005](https://github.com/toptal/picasso/issues/1005)) ([cad2f99](https://github.com/toptal/picasso/commit/cad2f99e0520c934bb1d15dc8d17e4092ff3bd73))

# [4.14.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.3...@toptal/picasso@4.14.0) (2020-01-09)

### Features

- add NumberInput component ([#998](https://github.com/toptal/picasso/issues/998)) ([57b3862](https://github.com/toptal/picasso/commit/57b3862fab18edc131a7a6b0da634b1f5cb057d9))

## [4.13.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.2...@toptal/picasso@4.13.3) (2020-01-09)

**Note:** Version bump only for package @toptal/picasso

## [4.13.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.1...@toptal/picasso@4.13.2) (2020-01-09)

### Bug Fixes

- **PromptModal:** [FX-696] Fix warning after submit ([#1002](https://github.com/toptal/picasso/issues/1002)) ([c7a8d08](https://github.com/toptal/picasso/commit/c7a8d08f4faf27b28d271460e766723316a3a1c8))

## [4.13.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.13.0...@toptal/picasso@4.13.1) (2020-01-07)

**Note:** Version bump only for package @toptal/picasso

# [4.13.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.12.0...@toptal/picasso@4.13.0) (2020-01-02)

### Features

- **checkbox:** add CheckboxGroup component ([#995](https://github.com/toptal/picasso/issues/995)) ([4710280](https://github.com/toptal/picasso/commit/4710280265b53004a8c3facfa95dbbdda0aadc76))

# [4.12.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.11.0...@toptal/picasso@4.12.0) (2020-01-02)

### Features

- **helpbox:** some tweaks ([#994](https://github.com/toptal/picasso/issues/994)) ([b4de027](https://github.com/toptal/picasso/commit/b4de0270426af6072dfea87493a08e2ab061c022))

# [4.11.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.10.1...@toptal/picasso@4.11.0) (2019-12-27)

### Features

- **DatePicker:** [FX-631] Calendar to be rendered in Popper ([#989](https://github.com/toptal/picasso/issues/989)) ([a395cc7](https://github.com/toptal/picasso/commit/a395cc74e7449f2b2db2eba27c65f45ba00ac38a))

## [4.10.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.10.0...@toptal/picasso@4.10.1) (2019-12-26)

**Note:** Version bump only for package @toptal/picasso

# [4.10.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.9.0...@toptal/picasso@4.10.0) (2019-12-26)

### Features

- **select:** add custom menu width ([#987](https://github.com/toptal/picasso/issues/987)) ([d2b64d4](https://github.com/toptal/picasso/commit/d2b64d4d3e5a79b725da0d2a226aded3df98ff35))

# [4.9.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.9...@toptal/picasso@4.9.0) (2019-12-25)

### Features

- **menuitem:** change text wrap to normal ([#986](https://github.com/toptal/picasso/issues/986)) ([81eb1ab](https://github.com/toptal/picasso/commit/81eb1ab043283d553da04fa3bc69443effdeccb9))

## [4.8.9](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.8...@toptal/picasso@4.8.9) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso

## [4.8.8](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.7...@toptal/picasso@4.8.8) (2019-12-24)

**Note:** Version bump only for package @toptal/picasso

## [4.8.7](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.6...@toptal/picasso@4.8.7) (2019-12-20)

**Note:** Version bump only for package @toptal/picasso

## [4.8.6](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.5...@toptal/picasso@4.8.6) (2019-12-20)

### Bug Fixes

- **Select:** allow changing dynamic options ([#977](https://github.com/toptal/picasso/issues/977)) ([18cf418](https://github.com/toptal/picasso/commit/18cf418b36c9c39b0dc2635f1e168c1d733ee555))

## [4.8.5](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.4...@toptal/picasso@4.8.5) (2019-12-17)

### Bug Fixes

- **Popper:** fix dynamic placement of Popper ([#957](https://github.com/toptal/picasso/issues/957)) ([9b53759](https://github.com/toptal/picasso/commit/9b537593d8bba656bf5a4d23c24ef90fbf99daca))

## [4.8.4](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.3...@toptal/picasso@4.8.4) (2019-12-16)

### Bug Fixes

- create Popper component ([#956](https://github.com/toptal/picasso/issues/956)) ([18eaa09](https://github.com/toptal/picasso/commit/18eaa09468917673bf8d5689b1d6e4ff2f38a4f6))

## [4.8.3](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.2...@toptal/picasso@4.8.3) (2019-12-13)

### Bug Fixes

- **notification:** overflow ([#964](https://github.com/toptal/picasso/issues/964)) ([336f044](https://github.com/toptal/picasso/commit/336f044a090bc4886286945fb03696f94d9f5a02))

## [4.8.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.1...@toptal/picasso@4.8.2) (2019-12-13)

### Bug Fixes

- **input:** document rowsMax prop ([#963](https://github.com/toptal/picasso/issues/963)) ([333c4c3](https://github.com/toptal/picasso/commit/333c4c36ca01d9ce7c61662bc631cbd37d215338))

## [4.8.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.8.0...@toptal/picasso@4.8.1) (2019-12-12)

### Bug Fixes

- [FX-653] Fix em-related sizes in components ([#958](https://github.com/toptal/picasso/issues/958)) ([726799c](https://github.com/toptal/picasso/commit/726799c02a11e4f23b7bc211eeb5c51a101ae2ce))

# [4.8.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.7.1...@toptal/picasso@4.8.0) (2019-12-12)

### Features

- **sidebar:** add collapsible behaviour ([#954](https://github.com/toptal/picasso/issues/954)) ([cd145f1](https://github.com/toptal/picasso/commit/cd145f1ed27391df82d4d0a3e35e2cca4ea82044))

## [4.7.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.7.0...@toptal/picasso@4.7.1) (2019-12-11)

### Bug Fixes

- **RadioGroup:** pass correct classes to MUI component ([#955](https://github.com/toptal/picasso/issues/955)) ([e0e269c](https://github.com/toptal/picasso/commit/e0e269c6d5565cf7e238ea06e03bb44dd90c2926))

# [4.7.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.6.0...@toptal/picasso@4.7.0) (2019-12-10)

### Features

- **Label:** add colors ([#950](https://github.com/toptal/picasso/issues/950)) ([cde15ba](https://github.com/toptal/picasso/commit/cde15ba6b5432f572cf3bc349ae12e8bc38ac22f))

# [4.6.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.5.2...@toptal/picasso@4.6.0) (2019-12-10)

### Features

- **slider:** add tooltip and range features ([#948](https://github.com/toptal/picasso/issues/948)) ([1ad8675](https://github.com/toptal/picasso/commit/1ad8675d855b37d78834915f698b4e0446c67206))

## [4.5.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.5.1...@toptal/picasso@4.5.2) (2019-12-10)

### Bug Fixes

- correct typings for withClasses HOC ([#949](https://github.com/toptal/picasso/issues/949)) ([053d6f5](https://github.com/toptal/picasso/commit/053d6f5eb7dcc9ad6d4ac3d81b702c3bf958322d))

## [4.5.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.5.0...@toptal/picasso@4.5.1) (2019-12-10)

### Bug Fixes

- **Modal:** use SvgClose16 icon to close Modal ([#951](https://github.com/toptal/picasso/issues/951)) ([d107bf5](https://github.com/toptal/picasso/commit/d107bf5fbd3e37cd52bdc1bdb087762c074e995f))

# [4.5.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.4.0...@toptal/picasso@4.5.0) (2019-12-09)

### Features

- **DatePicker:** [FX-608] Add default icon ([#944](https://github.com/toptal/picasso/issues/944)) ([9b0240f](https://github.com/toptal/picasso/commit/9b0240f4ecda048198774be588da7ec25c59f883))

# [4.4.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.3.2...@toptal/picasso@4.4.0) (2019-12-09)

### Features

- [BIL-789] extend NotificationProvider with createPortal ([#777](https://github.com/toptal/picasso/issues/777)) ([eaa69c8](https://github.com/toptal/picasso/commit/eaa69c8ac1f31cc623bcd7ce5a4fc768d836fe65))

## [4.3.2](https://github.com/toptal/picasso/compare/@toptal/picasso@4.3.1...@toptal/picasso@4.3.2) (2019-12-05)

**Note:** Version bump only for package @toptal/picasso

## [4.3.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.3.0...@toptal/picasso@4.3.1) (2019-12-05)

### Bug Fixes

- fix tree-shaking ([#941](https://github.com/toptal/picasso/issues/941)) ([6a9d2a0](https://github.com/toptal/picasso/commit/6a9d2a02f8c692e3b061a026d3cc5d748e9f2263))

# [4.3.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.2.0...@toptal/picasso@4.3.0) (2019-12-05)

### Features

- **Input:** small size variant ([#932](https://github.com/toptal/picasso/issues/932)) ([b5a049c](https://github.com/toptal/picasso/commit/b5a049c0b7659e5885674482ae75a64487d5122b))

# [4.2.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.1.1...@toptal/picasso@4.2.0) (2019-12-04)

### Features

- **Typography:** add lineThrough prop ([#936](https://github.com/toptal/picasso/issues/936)) ([f3b7f20](https://github.com/toptal/picasso/commit/f3b7f20d1be72915a29aaae73f5670be89926e4e))

## [4.1.1](https://github.com/toptal/picasso/compare/@toptal/picasso@4.1.0...@toptal/picasso@4.1.1) (2019-12-03)

**Note:** Version bump only for package @toptal/picasso

# [4.1.0](https://github.com/toptal/picasso/compare/@toptal/picasso@4.0.0...@toptal/picasso@4.1.0) (2019-12-03)

### Features

- **RadioGroup:** add horizontal prop ([#918](https://github.com/toptal/picasso/issues/918)) ([b2ac0f0](https://github.com/toptal/picasso/commit/b2ac0f01c3ae6505035eb1e2cd67d07a44b05ae0))

# 4.0.0 (2019-12-03)

### Features

- [FX-593] Fix package json versions ([#929](https://github.com/toptal/picasso/issues/929)) ([340a01c](https://github.com/toptal/picasso/commit/340a01c1806ff9e5b9a475dd1821899c5384c33a))
- v4 ([#820](https://github.com/toptal/picasso/issues/820)) ([4378192](https://github.com/toptal/picasso/commit/437819284fe13a6385346c730912d7b94adfdf44))

### BREAKING CHANGES

- Picasso v4 release

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
- **Link**: Remove `invert` prop. You should control color via `color` prop instead (https://github.com/toptal/picasso/pull/892)
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

- **Indicator:** add Indicator component ([#890](https://github.com/toptal/picasso/issues/890)) ([d298320](https://github.com/toptal/picasso/commit/d298320))

# [3.44.0](https://github.com/toptal/picasso/compare/v3.43.0...v3.44.0) (2019-11-22)

### Features

- **radio:** change label from string to ReactElement ([#891](https://github.com/toptal/picasso/issues/891)) ([21a8d36](https://github.com/toptal/picasso/commit/21a8d36))

# [3.43.0](https://github.com/toptal/picasso/compare/v3.42.0...v3.43.0) (2019-11-20)

### Features

- **button:** add secondary-green variant ([#883](https://github.com/toptal/picasso/issues/883)) ([c7ebde7](https://github.com/toptal/picasso/commit/c7ebde7))

# [3.42.0](https://github.com/toptal/picasso/compare/v3.41.0...v3.42.0) (2019-11-20)

### Features

- **icon:** add social icons ([#880](https://github.com/toptal/picasso/issues/880)) ([b4b7174](https://github.com/toptal/picasso/commit/b4b7174))

# [3.41.0](https://github.com/toptal/picasso/compare/v3.40.0...v3.41.0) (2019-11-14)

### Features

- **Table:** [FX-585] Add expandable rows ([#856](https://github.com/toptal/picasso/issues/856)) ([db058ee](https://github.com/toptal/picasso/commit/db058ee))

# [3.40.0](https://github.com/toptal/picasso/compare/v3.39.1...v3.40.0) (2019-11-13)

### Features

- **icon:** add guests icon ([#849](https://github.com/toptal/picasso/issues/849)) ([827566d](https://github.com/toptal/picasso/commit/827566d))

## [3.39.1](https://github.com/toptal/picasso/compare/v3.39.0...v3.39.1) (2019-11-12)

### Bug Fixes

- **TagSelector:** fix placeholder on loading ([#851](https://github.com/toptal/picasso/issues/851)) ([b2252cc](https://github.com/toptal/picasso/commit/b2252cc))

# [3.39.0](https://github.com/toptal/picasso/compare/v3.38.0...v3.39.0) (2019-11-08)

### Features

- **Accordion:** [FX-571] Align expand icon to the top ([#842](https://github.com/toptal/picasso/issues/842)) ([3266cc0](https://github.com/toptal/picasso/commit/3266cc0))

# [3.38.0](https://github.com/toptal/picasso/compare/v3.37.0...v3.38.0) (2019-11-08)

### Features

- create PageBanner component ([#835](https://github.com/toptal/picasso/issues/835)) ([a881c61](https://github.com/toptal/picasso/commit/a881c61))

# [3.37.0](https://github.com/toptal/picasso/compare/v3.36.1...v3.37.0) (2019-11-08)

### Features

- **TagSelector:** make TagSelector a controlled component ([#837](https://github.com/toptal/picasso/issues/837)) ([86fa5f3](https://github.com/toptal/picasso/commit/86fa5f3))

## [3.36.1](https://github.com/toptal/picasso/compare/v3.36.0...v3.36.1) (2019-11-07)

### Bug Fixes

- **Button:** accept all props of the component passed in the as property ([#834](https://github.com/toptal/picasso/issues/834)) ([753b953](https://github.com/toptal/picasso/commit/753b953))

# [3.36.0](https://github.com/toptal/picasso/compare/v3.35.0...v3.36.0) (2019-11-05)

### Features

- **SidebarItem:** [FX-510] Add 'as' type definitions ([#836](https://github.com/toptal/picasso/issues/836)) ([3db4216](https://github.com/toptal/picasso/commit/3db4216))

# [3.35.0](https://github.com/toptal/picasso/compare/v3.34.0...v3.35.0) (2019-11-01)

### Features

- **Input:** [FX-570] Add entered counter type ([#831](https://github.com/toptal/picasso/issues/831)) ([15dee54](https://github.com/toptal/picasso/commit/15dee54))

# [3.34.0](https://github.com/toptal/picasso/compare/v3.33.2...v3.34.0) (2019-10-30)

### Features

- **Tooltip:** allow controlling listeners ([#819](https://github.com/toptal/picasso/issues/819)) ([c5f757f](https://github.com/toptal/picasso/commit/c5f757f))

## [3.33.2](https://github.com/toptal/picasso/compare/v3.33.1...v3.33.2) (2019-10-28)

### Bug Fixes

- fix MUI version to 4.3 ([#826](https://github.com/toptal/picasso/issues/826)) ([1d3acc1](https://github.com/toptal/picasso/commit/1d3acc1))

## [3.33.1](https://github.com/toptal/picasso/compare/v3.33.0...v3.33.1) (2019-10-28)

### Bug Fixes

- **Helpbox:** render Helpbox.Content as a div element ([#821](https://github.com/toptal/picasso/issues/821)) ([f4ddfd7](https://github.com/toptal/picasso/commit/f4ddfd7)), closes [#789](https://github.com/toptal/picasso/issues/789)

# [3.33.0](https://github.com/toptal/picasso/compare/v3.32.0...v3.33.0) (2019-10-24)

### Features

- **Button:** add transparent variants ([#815](https://github.com/toptal/picasso/issues/815)) ([a2dda67](https://github.com/toptal/picasso/commit/a2dda67))

# [3.32.0](https://github.com/toptal/picasso/compare/v3.31.2...v3.32.0) (2019-10-21)

### Features

- **PromptModal:** improve api and error handling ([#805](https://github.com/toptal/picasso/issues/805)) ([e03f158](https://github.com/toptal/picasso/commit/e03f158))

## [3.31.2](https://github.com/toptal/picasso/compare/v3.31.1...v3.31.2) (2019-10-21)

### Bug Fixes

- **Autocomplete:** not show other option when matches with option ([#807](https://github.com/toptal/picasso/issues/807)) ([ba3520c](https://github.com/toptal/picasso/commit/ba3520c))

## [3.31.1](https://github.com/toptal/picasso/compare/v3.31.0...v3.31.1) (2019-10-18)

### Bug Fixes

- issue with content growing flexbox children element ([#804](https://github.com/toptal/picasso/issues/804)) ([f2eb6a8](https://github.com/toptal/picasso/commit/f2eb6a8))

# [3.31.0](https://github.com/toptal/picasso/compare/v3.30.0...v3.31.0) (2019-10-18)

### Features

- **Input:** add limit prop ([#803](https://github.com/toptal/picasso/issues/803)) ([8beab39](https://github.com/toptal/picasso/commit/8beab39))

# [3.30.0](https://github.com/toptal/picasso/compare/v3.29.1...v3.30.0) (2019-10-17)

### Features

- [FX-481] Autocomplete cleanup ([#799](https://github.com/toptal/picasso/issues/799)) ([960b749](https://github.com/toptal/picasso/commit/960b749))

## [3.29.1](https://github.com/toptal/picasso/compare/v3.29.0...v3.29.1) (2019-10-17)

### Bug Fixes

- **Modal:** fix scrollbar settings and spacing ([#800](https://github.com/toptal/picasso/issues/800)) ([a8155a3](https://github.com/toptal/picasso/commit/a8155a3))

# [3.29.0](https://github.com/toptal/picasso/compare/v3.28.0...v3.29.0) (2019-10-16)

### Features

- **DatePicker:** add possibility to use input props ([#785](https://github.com/toptal/picasso/issues/785)) ([a27bf1c](https://github.com/toptal/picasso/commit/a27bf1c))

# [3.28.0](https://github.com/toptal/picasso/compare/v3.27.0...v3.28.0) (2019-10-16)

### Features

- **Notification:** add notification acitons ([#767](https://github.com/toptal/picasso/issues/767)) ([c059d90](https://github.com/toptal/picasso/commit/c059d90))

# [3.27.0](https://github.com/toptal/picasso/compare/v3.26.1...v3.27.0) (2019-10-16)

### Features

- **Autocomplete:** add enableAutofill option ([#798](https://github.com/toptal/picasso/issues/798)) ([3de9683](https://github.com/toptal/picasso/commit/3de9683))
- **select:** add support for multiple selections ([#797](https://github.com/toptal/picasso/issues/797)) ([903b593](https://github.com/toptal/picasso/commit/903b593))

## [3.26.1](https://github.com/toptal/picasso/compare/v3.26.0...v3.26.1) (2019-10-14)

### Bug Fixes

- **ShowMore:** add props spreading to ShowMore component ([#793](https://github.com/toptal/picasso/issues/793)) ([e0f840f](https://github.com/toptal/picasso/commit/e0f840f))

# [3.26.0](https://github.com/toptal/picasso/compare/v3.25.1...v3.26.0) (2019-10-14)

### Features

- **icon:** add star solid ([#794](https://github.com/toptal/picasso/issues/794)) ([5c7884c](https://github.com/toptal/picasso/commit/5c7884c))

## [3.25.1](https://github.com/toptal/picasso/compare/v3.25.0...v3.25.1) (2019-10-14)

### Bug Fixes

- **icons:** glitch ([#784](https://github.com/toptal/picasso/issues/784)) ([1c200ed](https://github.com/toptal/picasso/commit/1c200ed))

# [3.25.0](https://github.com/toptal/picasso/compare/v3.24.5...v3.25.0) (2019-10-14)

### Features

- [FX-486] Add useScreens hook ([#773](https://github.com/toptal/picasso/issues/773)) ([78065df](https://github.com/toptal/picasso/commit/78065df))

## [3.24.5](https://github.com/toptal/picasso/compare/v3.24.4...v3.24.5) (2019-10-11)

### Bug Fixes

- **docs:** minor docs fix ([#788](https://github.com/toptal/picasso/issues/788)) ([61e428b](https://github.com/toptal/picasso/commit/61e428b))

## [3.24.4](https://github.com/toptal/picasso/compare/v3.24.3...v3.24.4) (2019-10-10)

### Bug Fixes

- **UserBadge:** [FX-179] Fix image squashing on IE11 ([#782](https://github.com/toptal/picasso/issues/782)) ([7020d7f](https://github.com/toptal/picasso/commit/7020d7f))
- modal overlay for autocomplete and dropdown ([#775](https://github.com/toptal/picasso/issues/775)) ([87f648f](https://github.com/toptal/picasso/commit/87f648f))

## [3.24.3](https://github.com/toptal/picasso/compare/v3.24.2...v3.24.3) (2019-10-09)

### Bug Fixes

- **Input:** [Fx-176] Fix icons in adornment in IE11 ([#778](https://github.com/toptal/picasso/issues/778)) ([383b53c](https://github.com/toptal/picasso/commit/383b53c))

## [3.24.2](https://github.com/toptal/picasso/compare/v3.24.1...v3.24.2) (2019-10-09)

### Bug Fixes

- **Button:** [FX-173] Fix styles for buttons in IE11 ([#770](https://github.com/toptal/picasso/issues/770)) ([e5e0aaf](https://github.com/toptal/picasso/commit/e5e0aaf))

## [3.24.1](https://github.com/toptal/picasso/compare/v3.24.0...v3.24.1) (2019-10-08)

### Bug Fixes

- [FX-173] Fix infinite loop of loading font in IE11 and Edge ([#769](https://github.com/toptal/picasso/issues/769)) ([30ffd96](https://github.com/toptal/picasso/commit/30ffd96))

# [3.24.0](https://github.com/toptal/picasso/compare/v3.23.0...v3.24.0) (2019-10-08)

### Features

- [FX-501] Make Sidebar and Top Header responsive for medium size ([#757](https://github.com/toptal/picasso/issues/757)) ([3045d2a](https://github.com/toptal/picasso/commit/3045d2a))

# [3.23.0](https://github.com/toptal/picasso/compare/v3.22.0...v3.23.0) (2019-10-07)

### Features

- [FX-502] Add grey variant to Container and Helpbox ([#747](https://github.com/toptal/picasso/issues/747)) ([d453f06](https://github.com/toptal/picasso/commit/d453f06))

# [3.22.0](https://github.com/toptal/picasso/compare/v3.21.1...v3.22.0) (2019-10-07)

### Features

- **Tabs:** add variant prop ([#720](https://github.com/toptal/picasso/issues/720)) ([a00ac45](https://github.com/toptal/picasso/commit/a00ac45))

## [3.21.1](https://github.com/toptal/picasso/compare/v3.21.0...v3.21.1) (2019-10-07)

### Bug Fixes

- **Autocomplete:** [FX-492] Extend the api with other option ([#760](https://github.com/toptal/picasso/issues/760)) ([780cd4f](https://github.com/toptal/picasso/commit/780cd4f))

# [3.21.0](https://github.com/toptal/picasso/compare/v3.20.0...v3.21.0) (2019-10-07)

### Features

- **userbadge:** new size xxsmall ([#751](https://github.com/toptal/picasso/issues/751)) ([d99cb6a](https://github.com/toptal/picasso/commit/d99cb6a))

# [3.20.0](https://github.com/toptal/picasso/compare/v3.19.0...v3.20.0) (2019-10-07)

### Features

- **PromptModal:** add PromptModal and showPrompt ([#753](https://github.com/toptal/picasso/issues/753)) ([a7c7c48](https://github.com/toptal/picasso/commit/a7c7c48))

# [3.19.0](https://github.com/toptal/picasso/compare/v3.18.0...v3.19.0) (2019-10-04)

### Features

- add DatePicker ([#736](https://github.com/toptal/picasso/issues/736)) ([9d0f506](https://github.com/toptal/picasso/commit/9d0f506))

# [3.18.0](https://github.com/toptal/picasso/compare/v3.17.4...v3.18.0) (2019-10-04)

### Features

- **Modal:** add sizes ([#756](https://github.com/toptal/picasso/issues/756)) ([49fb70d](https://github.com/toptal/picasso/commit/49fb70d))

## [3.17.4](https://github.com/toptal/picasso/compare/v3.17.3...v3.17.4) (2019-10-04)

### Bug Fixes

- **dropdown:** popper scrolling away ([#732](https://github.com/toptal/picasso/issues/732)) ([211dca8](https://github.com/toptal/picasso/commit/211dca8))

## [3.17.3](https://github.com/toptal/picasso/compare/v3.17.2...v3.17.3) (2019-10-03)

### Bug Fixes

- font loader for FF ([#750](https://github.com/toptal/picasso/issues/750)) ([5ba7ab0](https://github.com/toptal/picasso/commit/5ba7ab0))

## [3.17.2](https://github.com/toptal/picasso/compare/v3.17.1...v3.17.2) (2019-10-03)

### Bug Fixes

- **Typography:** add underline ([#744](https://github.com/toptal/picasso/issues/744)) ([8e63282](https://github.com/toptal/picasso/commit/8e63282))

## [3.17.1](https://github.com/toptal/picasso/compare/v3.17.0...v3.17.1) (2019-10-02)

### Bug Fixes

- **Input:** add ability to disable autofill for input ([#739](https://github.com/toptal/picasso/issues/739)) ([75c742c](https://github.com/toptal/picasso/commit/75c742c))

# [3.17.0](https://github.com/toptal/picasso/compare/v3.16.1...v3.17.0) (2019-10-02)

### Features

- **Autocomplete:** add error prop ([#742](https://github.com/toptal/picasso/issues/742)) ([9235f92](https://github.com/toptal/picasso/commit/9235f92))

## [3.16.1](https://github.com/toptal/picasso/compare/v3.16.0...v3.16.1) (2019-10-02)

### Bug Fixes

- **DropdownArrow:** added sizes for dropdown ([#741](https://github.com/toptal/picasso/issues/741)) ([a1e72dc](https://github.com/toptal/picasso/commit/a1e72dc))

# [3.16.0](https://github.com/toptal/picasso/compare/v3.15.2...v3.16.0) (2019-10-02)

### Features

- **Modal:** [FX-497] Change useModal hook api ([#737](https://github.com/toptal/picasso/issues/737)) ([f46fcc3](https://github.com/toptal/picasso/commit/f46fcc3))

## [3.15.2](https://github.com/toptal/picasso/compare/v3.15.1...v3.15.2) (2019-10-02)

### Bug Fixes

- **Menu:** refresh submenus in drill down ([#731](https://github.com/toptal/picasso/issues/731)) ([7905e7a](https://github.com/toptal/picasso/commit/7905e7a))

## [3.15.1](https://github.com/toptal/picasso/compare/v3.15.0...v3.15.1) (2019-09-30)

### Bug Fixes

- **EnvironmentBanner:** banner no longer steals clicks ([#726](https://github.com/toptal/picasso/issues/726)) ([f4ee655](https://github.com/toptal/picasso/commit/f4ee655)), closes [#725](https://github.com/toptal/picasso/issues/725)

# [3.15.0](https://github.com/toptal/picasso/compare/v3.14.0...v3.15.0) (2019-09-27)

### Features

- **Autocomplate:** icon, startAdornment, endAdornment ([#717](https://github.com/toptal/picasso/issues/717)) ([072e745](https://github.com/toptal/picasso/commit/072e745))

# [3.14.0](https://github.com/toptal/picasso/compare/v3.13.0...v3.14.0) (2019-09-26)

### Features

- **icon:** update color prop ([#712](https://github.com/toptal/picasso/issues/712)) ([f20cc41](https://github.com/toptal/picasso/commit/f20cc41))

# [3.13.0](https://github.com/toptal/picasso/compare/v3.12.2...v3.13.0) (2019-09-26)

### Features

- [FX-344] Activate tree-shaking for Picasso ([#714](https://github.com/toptal/picasso/issues/714)) ([349af61](https://github.com/toptal/picasso/commit/349af61))

## [3.12.2](https://github.com/toptal/picasso/compare/v3.12.1...v3.12.2) (2019-09-26)

### Bug Fixes

- **Menu:** fix arrow navigation ([#718](https://github.com/toptal/picasso/issues/718)) ([d5a2f70](https://github.com/toptal/picasso/commit/d5a2f70))

## [3.12.1](https://github.com/toptal/picasso/compare/v3.12.0...v3.12.1) (2019-09-25)

### Bug Fixes

- **sidebar & page header menu:** dropdown offsets ([#713](https://github.com/toptal/picasso/issues/713)) ([bd552cc](https://github.com/toptal/picasso/commit/bd552cc))

# [3.12.0](https://github.com/toptal/picasso/compare/v3.11.6...v3.12.0) (2019-09-24)

### Features

- **link:** add color prop ([#700](https://github.com/toptal/picasso/issues/700)) ([827684a](https://github.com/toptal/picasso/commit/827684a))

## [3.11.6](https://github.com/toptal/picasso/compare/v3.11.5...v3.11.6) (2019-09-24)

### Bug Fixes

- **TableCell:** children prop should be optional ([#687](https://github.com/toptal/picasso/issues/687)) ([a8f1729](https://github.com/toptal/picasso/commit/a8f1729))

## [3.11.5](https://github.com/toptal/picasso/compare/v3.11.4...v3.11.5) (2019-09-24)

### Bug Fixes

- **MenuItem:** remove useless class that provides a warning ([#711](https://github.com/toptal/picasso/issues/711)) ([66e466b](https://github.com/toptal/picasso/commit/66e466b))

## [3.11.4](https://github.com/toptal/picasso/compare/v3.11.3...v3.11.4) (2019-09-23)

### Bug Fixes

- **Picasso:** fix usePicassoRoot hook ([#710](https://github.com/toptal/picasso/issues/710)) ([2992ffc](https://github.com/toptal/picasso/commit/2992ffc))

## [3.11.3](https://github.com/toptal/picasso/compare/v3.11.2...v3.11.3) (2019-09-23)

### Bug Fixes

- **Autocomplete:** allow disabling default chrome autocomplete ([#706](https://github.com/toptal/picasso/issues/706)) ([05ed206](https://github.com/toptal/picasso/commit/05ed206))

## [3.11.2](https://github.com/toptal/picasso/compare/v3.11.1...v3.11.2) (2019-09-20)

### Bug Fixes

- **PageHeader:** title optional prop ([#704](https://github.com/toptal/picasso/issues/704)) ([98d0b06](https://github.com/toptal/picasso/commit/98d0b06))

## [3.11.1](https://github.com/toptal/picasso/compare/v3.11.0...v3.11.1) (2019-09-20)

### Bug Fixes

- **Page:** add flex to the Page.Content to simplify page layout ([#676](https://github.com/toptal/picasso/issues/676)) ([ddefacb](https://github.com/toptal/picasso/commit/ddefacb))

# [3.11.0](https://github.com/toptal/picasso/compare/v3.10.1...v3.11.0) (2019-09-19)

### Features

- **Menu:** [FX-436] drill-down functionality ([#684](https://github.com/toptal/picasso/issues/684)) ([3219579](https://github.com/toptal/picasso/commit/3219579)), closes [#2](https://github.com/toptal/picasso/issues/2) [#3](https://github.com/toptal/picasso/issues/3)

## [3.10.1](https://github.com/toptal/picasso/compare/v3.10.0...v3.10.1) (2019-09-19)

### Bug Fixes

- **utils:** expose controlled and uncontrolled mode hooks ([#697](https://github.com/toptal/picasso/issues/697)) ([583545f](https://github.com/toptal/picasso/commit/583545f))

# [3.10.0](https://github.com/toptal/picasso/compare/v3.9.0...v3.10.0) (2019-09-19)

### Features

- **Modal:** add useModal hook ([#694](https://github.com/toptal/picasso/issues/694)) ([bf2270f](https://github.com/toptal/picasso/commit/bf2270f))

# [3.9.0](https://github.com/toptal/picasso/compare/v3.8.7...v3.9.0) (2019-09-19)

### Features

- **autocomplete:** add custom renderer for an option ([#690](https://github.com/toptal/picasso/issues/690)) ([ab566df](https://github.com/toptal/picasso/commit/ab566df))

## [3.8.7](https://github.com/toptal/picasso/compare/v3.8.6...v3.8.7) (2019-09-18)

### Bug Fixes

- **Sidebar:** fix auto-closing on small screens ([#695](https://github.com/toptal/picasso/issues/695)) ([428ca2f](https://github.com/toptal/picasso/commit/428ca2f))

## [3.8.6](https://github.com/toptal/picasso/compare/v3.8.5...v3.8.6) (2019-09-18)

### Bug Fixes

- **autocomplete:** remove debouncing ([#682](https://github.com/toptal/picasso/issues/682)) ([6100769](https://github.com/toptal/picasso/commit/6100769))

## [3.8.5](https://github.com/toptal/picasso/compare/v3.8.4...v3.8.5) (2019-09-17)

### Bug Fixes

- **Accordion:** support inline components in content ([#688](https://github.com/toptal/picasso/issues/688)) ([59b0b61](https://github.com/toptal/picasso/commit/59b0b61))

## [3.8.4](https://github.com/toptal/picasso/compare/v3.8.3...v3.8.4) (2019-09-17)

### Bug Fixes

- visal test build image ([#691](https://github.com/toptal/picasso/issues/691)) ([a3f6ceb](https://github.com/toptal/picasso/commit/a3f6ceb))

## [3.8.3](https://github.com/toptal/picasso/compare/v3.8.2...v3.8.3) (2019-09-17)

### Bug Fixes

- **Modal:** fix close icon with content ([#686](https://github.com/toptal/picasso/issues/686)) ([1a15f24](https://github.com/toptal/picasso/commit/1a15f24))

## [3.8.2](https://github.com/toptal/picasso/compare/v3.8.1...v3.8.2) (2019-09-17)

### Bug Fixes

- **Icon:** [FX-456] Update miss-aligned icons inside viewbox ([#685](https://github.com/toptal/picasso/issues/685)) ([4bc7fa2](https://github.com/toptal/picasso/commit/4bc7fa2))

## [3.8.1](https://github.com/toptal/picasso/compare/v3.8.0...v3.8.1) (2019-09-16)

### Bug Fixes

- **Sidebar:** fix position on small screens ([#680](https://github.com/toptal/picasso/issues/680)) ([b862fa9](https://github.com/toptal/picasso/commit/b862fa9))

# [3.8.0](https://github.com/toptal/picasso/compare/v3.7.1...v3.8.0) (2019-09-13)

### Features

- add EnvironmentBanner component ([#674](https://github.com/toptal/picasso/issues/674)) ([f32ded0](https://github.com/toptal/picasso/commit/f32ded0))
- **Page:** make responsive page ([#656](https://github.com/toptal/picasso/issues/656)) ([4ff7a06](https://github.com/toptal/picasso/commit/4ff7a06))

## [3.7.1](https://github.com/toptal/picasso/compare/v3.7.0...v3.7.1) (2019-09-13)

### Bug Fixes

- **Menu:** export static props for Menu to fix ts type check ([#677](https://github.com/toptal/picasso/issues/677)) ([83d5908](https://github.com/toptal/picasso/commit/83d5908))

# [3.7.0](https://github.com/toptal/picasso/compare/v3.6.1...v3.7.0) (2019-09-12)

### Features

- add ThumbsUp and ThumbsDown icons ([#675](https://github.com/toptal/picasso/issues/675)) ([d4411c1](https://github.com/toptal/picasso/commit/d4411c1))

## [3.6.1](https://github.com/toptal/picasso/compare/v3.6.0...v3.6.1) (2019-09-12)

### Bug Fixes

- **Dropdown:** disable autofocus by default ([#657](https://github.com/toptal/picasso/issues/657)) ([7e29a8c](https://github.com/toptal/picasso/commit/7e29a8c)), closes [#664](https://github.com/toptal/picasso/issues/664) [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653) [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653)

# [3.6.0](https://github.com/toptal/picasso/compare/v3.5.0...v3.6.0) (2019-09-12)

### Features

- **Icon:** filter and sort icons ([#664](https://github.com/toptal/picasso/issues/664)) ([8dc3698](https://github.com/toptal/picasso/commit/8dc3698)), closes [#666](https://github.com/toptal/picasso/issues/666) [#667](https://github.com/toptal/picasso/issues/667) [#668](https://github.com/toptal/picasso/issues/668) [#669](https://github.com/toptal/picasso/issues/669) [#669](https://github.com/toptal/picasso/issues/669) [#666](https://github.com/toptal/picasso/issues/666) [#668](https://github.com/toptal/picasso/issues/668) [#667](https://github.com/toptal/picasso/issues/667) [#663](https://github.com/toptal/picasso/issues/663) [#654](https://github.com/toptal/picasso/issues/654) [#661](https://github.com/toptal/picasso/issues/661) [#655](https://github.com/toptal/picasso/issues/655) [#653](https://github.com/toptal/picasso/issues/653)

# [3.5.0](https://github.com/toptal/picasso/compare/v3.4.1...v3.5.0) (2019-09-11)

### Bug Fixes

- add read/write rights for jenkins user for release ([#669](https://github.com/toptal/picasso/issues/669)) ([298dc26](https://github.com/toptal/picasso/commit/298dc26))
- fix release by adding ci env variable ([#666](https://github.com/toptal/picasso/issues/666)) ([6a002fe](https://github.com/toptal/picasso/commit/6a002fe))
- fix release ci build ([#668](https://github.com/toptal/picasso/issues/668)) ([d6f891b](https://github.com/toptal/picasso/commit/d6f891b))
- fix release ci job ([#667](https://github.com/toptal/picasso/issues/667)) ([1e97ae5](https://github.com/toptal/picasso/commit/1e97ae5))
- **autocomplete:** auto highlight first option ([#663](https://github.com/toptal/picasso/issues/663)) ([31552a0](https://github.com/toptal/picasso/commit/31552a0))
- **autocomplete:** fix diverse issues ([#654](https://github.com/toptal/picasso/issues/654)) ([c46dda6](https://github.com/toptal/picasso/commit/c46dda6))
- **autocomplete:** fix missing details ([#661](https://github.com/toptal/picasso/issues/661)) ([1bbe9ed](https://github.com/toptal/picasso/commit/1bbe9ed))
- **Sidebar:** [FX-384] Fix minWidth for Sidebar, add page sidebar tutorial ([#655](https://github.com/toptal/picasso/issues/655)) ([b673d8d](https://github.com/toptal/picasso/commit/b673d8d))

### Features

- allow 'defaultExpanded' prop for SidebarItem for plugging to re… ([#653](https://github.com/toptal/picasso/issues/653)) ([7088e16](https://github.com/toptal/picasso/commit/7088e16))

## [3.4.1](https://github.com/toptal/picasso/compare/v3.4.0...v3.4.1) (2019-09-03)

### Bug Fixes

- remove spacing on the left from an iconless sidebar menu item ([#640](https://github.com/toptal/picasso/issues/640)) ([65a5b43](https://github.com/toptal/picasso/commit/65a5b43))

# [3.4.0](https://github.com/toptal/picasso/compare/v3.3.0...v3.4.0) (2019-09-03)

### Features

- make Picasso publicly accessible ([#637](https://github.com/toptal/picasso/issues/637)) ([c3f1b43](https://github.com/toptal/picasso/commit/c3f1b43))

# [3.3.0](https://github.com/toptal/picasso/compare/v3.2.2...v3.3.0) (2019-09-02)

### Features

- **Link:** extend `as` prop type definition ([#626](https://github.com/toptal/picasso/issues/626)) ([85a5952](https://github.com/toptal/picasso/commit/85a5952))

## [3.2.2](https://github.com/toptal/picasso/compare/v3.2.1...v3.2.2) (2019-08-30)

### Bug Fixes

- **tagselector:** fix input style override ([#636](https://github.com/toptal/picasso/issues/636)) ([b2e1492](https://github.com/toptal/picasso/commit/b2e1492))

## [3.2.1](https://github.com/toptal/picasso/compare/v3.2.0...v3.2.1) (2019-08-28)

### Bug Fixes

- master release job increase timeout ([#635](https://github.com/toptal/picasso/issues/635)) ([6d26ef0](https://github.com/toptal/picasso/commit/6d26ef0))

# [3.2.0](https://github.com/toptal/picasso/compare/v3.1.1...v3.2.0) (2019-08-28)

### Features

- add tagselector component ([#617](https://github.com/toptal/picasso/issues/617)) ([378bc19](https://github.com/toptal/picasso/commit/378bc19))

## [3.1.1](https://github.com/toptal/picasso/compare/v3.1.0...v3.1.1) (2019-08-28)

### Bug Fixes

- [FX-391] Fix loading fonts multiple times if many Picasso roots ([#633](https://github.com/toptal/picasso/issues/633)) ([c687fc3](https://github.com/toptal/picasso/commit/c687fc3))

# [3.1.0](https://github.com/toptal/picasso/compare/v3.0.1...v3.1.0) (2019-08-27)

### Features

- **Button:** add augmentation with as prop ([#630](https://github.com/toptal/picasso/issues/630)) ([fb3682e](https://github.com/toptal/picasso/commit/fb3682e))

## [3.0.1](https://github.com/toptal/picasso/compare/v3.0.0...v3.0.1) (2019-08-27)

### Bug Fixes

- [FX-386] Export missing props to unlock styled components typing ([#627](https://github.com/toptal/picasso/issues/627)) ([83ed4ae](https://github.com/toptal/picasso/commit/83ed4ae))

# [3.0.0](https://github.com/toptal/picasso/compare/v2.27.1...v3.0.0) (2019-08-23)

### Bug Fixes

- **Accordion:** fix Accordion styles ([#592](https://github.com/toptal/picasso/issues/592)) ([c2636b9](https://github.com/toptal/picasso/commit/c2636b9))
- **Accordion:** fix an issue with no children rendered ([b9d198e](https://github.com/toptal/picasso/commit/b9d198e))
- **CssBaseline:** [FX-368] Use our own css baseline ([#595](https://github.com/toptal/picasso/issues/595)) ([bf9052c](https://github.com/toptal/picasso/commit/bf9052c))
- **Grid:** divide Picasso grid spacing according to MUI ([#586](https://github.com/toptal/picasso/issues/586)) ([41b9783](https://github.com/toptal/picasso/commit/41b9783))
- **paper:** fix default text color ([#594](https://github.com/toptal/picasso/issues/594)) ([5522976](https://github.com/toptal/picasso/commit/5522976))
- **Select:** issues after upgrade to MUI v4 ([#590](https://github.com/toptal/picasso/issues/590)) ([7c34698](https://github.com/toptal/picasso/commit/7c34698))
- **Slider:** [FX-378] Move Slider from lab to core ([#596](https://github.com/toptal/picasso/issues/596)) ([58e33b9](https://github.com/toptal/picasso/commit/58e33b9))
- **Table:** adjust cell paddings ([#591](https://github.com/toptal/picasso/issues/591)) ([550d901](https://github.com/toptal/picasso/commit/550d901))
- **Tabs:** after upgrade to v4 ([#593](https://github.com/toptal/picasso/issues/593)) ([07dcef8](https://github.com/toptal/picasso/commit/07dcef8))
- fix disabled state for Checkbox and Radio ([#587](https://github.com/toptal/picasso/issues/587)) ([bc73cea](https://github.com/toptal/picasso/commit/bc73cea))
- **Tooltip:** issues after upgrade to v4 ([#581](https://github.com/toptal/picasso/issues/581)) ([65676e0](https://github.com/toptal/picasso/commit/65676e0))
- **Typography:** fix typography, baseline visual issues ([#585](https://github.com/toptal/picasso/issues/585)) ([68e8aec](https://github.com/toptal/picasso/commit/68e8aec))

### chore

- **TextField:** remove deprecated props and rename to Input ([#606](https://github.com/toptal/picasso/issues/606)) ([1d63602](https://github.com/toptal/picasso/commit/1d63602))
- rename `justifyContent` prop in Grid to match Container ([#600](https://github.com/toptal/picasso/issues/600)) ([8da9a02](https://github.com/toptal/picasso/commit/8da9a02))
- **Icon:** delete deprecated icon components ([#598](https://github.com/toptal/picasso/issues/598)) ([b37be08](https://github.com/toptal/picasso/commit/b37be08))
- **Icon:** remove deprecated prop `size` from icons ([#599](https://github.com/toptal/picasso/issues/599)) ([033a5ac](https://github.com/toptal/picasso/commit/033a5ac))

### Features

- [FX-377] Forward refs for all components ([#612](https://github.com/toptal/picasso/issues/612)) ([677af2e](https://github.com/toptal/picasso/commit/677af2e))
- [FX-377] Proxy ref from forwardRef to FileInput ([#621](https://github.com/toptal/picasso/issues/621)) ([54668a3](https://github.com/toptal/picasso/commit/54668a3))
- upgrade MUI to v4 ([29d14bd](https://github.com/toptal/picasso/commit/29d14bd))

### BREAKING CHANGES

- **TextField:** TextField component to Input
- **Slider:** Slider component has been moved from `@toptal/picasso/lab` to `@toptal/picasso`
- rename `justify` prop in `Grid` to `justifyContent`
- **Icon:** remove deprecated prop `size` from icons
- **Icon:** icon components deprecated in v2 have been fully removed in v3. To obtain support migrating these components, check: https://toptal-core.atlassian.net/wiki/x/boACG

## [2.27.1](https://github.com/toptal/picasso/compare/v2.27.0...v2.27.1) (2019-08-23)

### Bug Fixes

- **Checkbox:** adjust multiline label ([#615](https://github.com/toptal/picasso/issues/615)) ([90cfb2a](https://github.com/toptal/picasso/commit/90cfb2a))

# [2.27.0](https://github.com/toptal/picasso/compare/v2.26.4...v2.27.0) (2019-08-21)

### Features

- **Label:** add `white`variant to Label ([#607](https://github.com/toptal/picasso/issues/607)) ([5b62a0d](https://github.com/toptal/picasso/commit/5b62a0d))

## [2.26.4](https://github.com/toptal/picasso/compare/v2.26.3...v2.26.4) (2019-08-20)

### Bug Fixes

- **breakpoints:** fix useScreenSize hook ([#611](https://github.com/toptal/picasso/issues/611)) ([86a2caa](https://github.com/toptal/picasso/commit/86a2caa))

## [2.26.3](https://github.com/toptal/picasso/compare/v2.26.2...v2.26.3) (2019-08-19)

### Bug Fixes

- **autocomplete:** fix onchange event firing too often ([d9f3dcf](https://github.com/toptal/picasso/commit/d9f3dcf))
- **autocomplete:** fix onchange event firing too often ([aea8e4c](https://github.com/toptal/picasso/commit/aea8e4c))

## [2.26.2](https://github.com/toptal/picasso/compare/v2.26.1...v2.26.2) (2019-08-16)

### Bug Fixes

- **components:** reduce deprecation noise ([#597](https://github.com/toptal/picasso/issues/597)) ([e251579](https://github.com/toptal/picasso/commit/e251579))

## [2.26.1](https://github.com/toptal/picasso/compare/v2.26.0...v2.26.1) (2019-08-14)

### Bug Fixes

- [FX-370] Fix disabled label opacity for Radio and Checkbox ([#588](https://github.com/toptal/picasso/issues/588)) ([661bb1f](https://github.com/toptal/picasso/commit/661bb1f))

# [2.26.0](https://github.com/toptal/picasso/compare/v2.25.0...v2.26.0) (2019-08-13)

### Features

- **Slider:** add Slider component ([#576](https://github.com/toptal/picasso/issues/576)) ([c5d70f6](https://github.com/toptal/picasso/commit/c5d70f6))

# [2.25.0](https://github.com/toptal/picasso/compare/v2.24.0...v2.25.0) (2019-08-12)

### Features

- **Sidebar:** add dark variant ([#575](https://github.com/toptal/picasso/issues/575)) ([41744a9](https://github.com/toptal/picasso/commit/41744a9))

# [2.24.0](https://github.com/toptal/picasso/compare/v2.23.3...v2.24.0) (2019-08-09)

### Features

- **Sidebar:** implement Sidebar component ([#574](https://github.com/toptal/picasso/issues/574)) ([80f0add](https://github.com/toptal/picasso/commit/80f0add))

## [2.23.3](https://github.com/toptal/picasso/compare/v2.23.2...v2.23.3) (2019-08-07)

### Bug Fixes

- **textfield:** add new placeholder color to palette ([#573](https://github.com/toptal/picasso/issues/573)) ([b18bea4](https://github.com/toptal/picasso/commit/b18bea4))

## [2.23.2](https://github.com/toptal/picasso/compare/v2.23.1...v2.23.2) (2019-08-02)

### Bug Fixes

- **Autocomplete:** allow to pass any value to Autocomplete ([#568](https://github.com/toptal/picasso/issues/568)) ([c2c04d8](https://github.com/toptal/picasso/commit/c2c04d8))

## [2.23.1](https://github.com/toptal/picasso/compare/v2.23.0...v2.23.1) (2019-08-01)

### Performance Improvements

- use transpileOnly for ts-loader ([#567](https://github.com/toptal/picasso/issues/567)) ([842245e](https://github.com/toptal/picasso/commit/842245e))

# [2.23.0](https://github.com/toptal/picasso/compare/v2.22.0...v2.23.0) (2019-08-01)

### Features

- **Notification:** [FX-349] Add notifications stream ([#564](https://github.com/toptal/picasso/issues/564)) ([49e3b79](https://github.com/toptal/picasso/commit/49e3b79))

# [2.22.0](https://github.com/toptal/picasso/compare/v2.21.0...v2.22.0) (2019-07-31)

### Features

- **Autocomplete:** update autocomplete to accept Select options ([#562](https://github.com/toptal/picasso/issues/562)) ([493eac0](https://github.com/toptal/picasso/commit/493eac0))

# [2.21.0](https://github.com/toptal/picasso/compare/v2.20.0...v2.21.0) (2019-07-30)

### Features

- **Button:** add flat-white variant ([#565](https://github.com/toptal/picasso/issues/565)) ([ebcb4d5](https://github.com/toptal/picasso/commit/ebcb4d5))

# [2.20.0](https://github.com/toptal/picasso/compare/v2.19.1...v2.20.0) (2019-07-29)

### Features

- add MonthSelect and YearSelect components ([#557](https://github.com/toptal/picasso/issues/557)) ([0809c99](https://github.com/toptal/picasso/commit/0809c99))

## [2.19.1](https://github.com/toptal/picasso/compare/v2.19.0...v2.19.1) (2019-07-24)

### Bug Fixes

- update vulnerable dependencies to the latest versions ([#553](https://github.com/toptal/picasso/issues/553)) ([a47a89f](https://github.com/toptal/picasso/commit/a47a89f))

# [2.19.0](https://github.com/toptal/picasso/compare/v2.18.3...v2.19.0) (2019-07-22)

### Features

- **icon:** add ui guidelines and performance icons ([#559](https://github.com/toptal/picasso/issues/559)) ([0f3e7be](https://github.com/toptal/picasso/commit/0f3e7be))

## [2.18.3](https://github.com/toptal/picasso/compare/v2.18.2...v2.18.3) (2019-07-19)

### Bug Fixes

- **MenuItem:** allow to use MenuItem as react-router link ([#558](https://github.com/toptal/picasso/issues/558)) ([da4f7fe](https://github.com/toptal/picasso/commit/da4f7fe))

## [2.18.2](https://github.com/toptal/picasso/compare/v2.18.1...v2.18.2) (2019-07-19)

### Bug Fixes

- **Picasso:** refactor reset styles and portal destination ([#556](https://github.com/toptal/picasso/issues/556)) ([7138341](https://github.com/toptal/picasso/commit/7138341))

## [2.18.1](https://github.com/toptal/picasso/compare/v2.18.0...v2.18.1) (2019-07-16)

### Bug Fixes

- **Accordion:** adjust accordion styles for single item ([#551](https://github.com/toptal/picasso/issues/551)) ([11bd998](https://github.com/toptal/picasso/commit/11bd998))

# [2.18.0](https://github.com/toptal/picasso/compare/v2.17.0...v2.18.0) (2019-07-15)

### Features

- **typography:** add dark-grey color ([#510](https://github.com/toptal/picasso/issues/510)) ([b316dbe](https://github.com/toptal/picasso/commit/b316dbe))

# [2.17.0](https://github.com/toptal/picasso/compare/v2.16.1...v2.17.0) (2019-07-10)

### Bug Fixes

- **ShowMore:** remove icon leftover after its rotation ([#541](https://github.com/toptal/picasso/issues/541)) ([db912fd](https://github.com/toptal/picasso/commit/db912fd))

### Features

- **Dropdown:** add `onOpen` and `onClose` event handlers ([#538](https://github.com/toptal/picasso/issues/538)) ([cb4d055](https://github.com/toptal/picasso/commit/cb4d055))

## [2.16.1](https://github.com/toptal/picasso/compare/v2.16.0...v2.16.1) (2019-07-10)

### Bug Fixes

- **notification:** close icon margin ([#540](https://github.com/toptal/picasso/issues/540)) ([93b5669](https://github.com/toptal/picasso/commit/93b5669))

# [2.16.0](https://github.com/toptal/picasso/compare/v2.15.0...v2.16.0) (2019-07-10)

### Features

- **Link:** add invert prop ([#535](https://github.com/toptal/picasso/issues/535)) ([d5ae4ee](https://github.com/toptal/picasso/commit/d5ae4ee))

# [2.15.0](https://github.com/toptal/picasso/compare/v2.14.0...v2.15.0) (2019-07-09)

### Features

- **Label:** update colors and add disabled state ([#536](https://github.com/toptal/picasso/issues/536)) ([371ac62](https://github.com/toptal/picasso/commit/371ac62))

# [2.14.0](https://github.com/toptal/picasso/compare/v2.13.0...v2.14.0) (2019-07-08)

### Features

- **Helpbox:** implement Helpbox component ([#530](https://github.com/toptal/picasso/issues/530)) ([5afe038](https://github.com/toptal/picasso/commit/5afe038))

# [2.13.0](https://github.com/toptal/picasso/compare/v2.12.0...v2.13.0) (2019-07-05)

### Features

- **Autocomplete:** [FX-143] Add Autocomplete component ([#525](https://github.com/toptal/picasso/issues/525)) ([7f46aff](https://github.com/toptal/picasso/commit/7f46aff))

# [2.12.0](https://github.com/toptal/picasso/compare/v2.11.0...v2.12.0) (2019-07-05)

### Features

- spread native attributes ([#526](https://github.com/toptal/picasso/issues/526)) ([c0fe629](https://github.com/toptal/picasso/commit/c0fe629))

# [2.11.0](https://github.com/toptal/picasso/compare/v2.10.1...v2.11.0) (2019-07-04)

### Features

- **showmore:** add showmore component ([#502](https://github.com/toptal/picasso/issues/502)) ([7fa5db4](https://github.com/toptal/picasso/commit/7fa5db4))

## [2.10.1](https://github.com/toptal/picasso/compare/v2.10.0...v2.10.1) (2019-07-04)

### Bug Fixes

- **OutlinedInput:** spread props for TextField support ([#528](https://github.com/toptal/picasso/issues/528)) ([e4a8967](https://github.com/toptal/picasso/commit/e4a8967))

# [2.10.0](https://github.com/toptal/picasso/compare/v2.9.1...v2.10.0) (2019-07-03)

### Bug Fixes

- **icon:** update svg for Check icon ([#524](https://github.com/toptal/picasso/issues/524)) ([a7dfb40](https://github.com/toptal/picasso/commit/a7dfb40))

### Features

- **FileInput:** implement FileInput component ([#513](https://github.com/toptal/picasso/issues/513)) ([dd04ed0](https://github.com/toptal/picasso/commit/dd04ed0))

## [2.9.1](https://github.com/toptal/picasso/compare/v2.9.0...v2.9.1) (2019-07-01)

### Bug Fixes

- **button:** invalid markup ([#518](https://github.com/toptal/picasso/issues/518)) ([fd3d48d](https://github.com/toptal/picasso/commit/fd3d48d))

# [2.9.0](https://github.com/toptal/picasso/compare/v2.8.0...v2.9.0) (2019-06-29)

### Features

- **icon:** update whole icon library ([#491](https://github.com/toptal/picasso/issues/491)) ([1a224fd](https://github.com/toptal/picasso/commit/1a224fd))

# [2.8.0](https://github.com/toptal/picasso/compare/v2.7.5...v2.8.0) (2019-06-28)

### Features

- **Container:** add bordered prop ([#512](https://github.com/toptal/picasso/issues/512)) ([1d881fd](https://github.com/toptal/picasso/commit/1d881fd))

## [2.7.5](https://github.com/toptal/picasso/compare/v2.7.4...v2.7.5) (2019-06-28)

### Bug Fixes

- **button.group:** fix button style for secondary variant ([#475](https://github.com/toptal/picasso/issues/475)) ([a70c9ad](https://github.com/toptal/picasso/commit/a70c9ad))

## [2.7.4](https://github.com/toptal/picasso/compare/v2.7.3...v2.7.4) (2019-06-27)

### Bug Fixes

- **Table:** sync styles with base ([#504](https://github.com/toptal/picasso/issues/504)) ([aa8e710](https://github.com/toptal/picasso/commit/aa8e710))

## [2.7.3](https://github.com/toptal/picasso/compare/v2.7.2...v2.7.3) (2019-06-27)

### Bug Fixes

- **page-header:** prevent header from moving when dropdown is open ([#506](https://github.com/toptal/picasso/issues/506)) ([ed7337a](https://github.com/toptal/picasso/commit/ed7337a)), closes [#505](https://github.com/toptal/picasso/issues/505)

## [2.7.2](https://github.com/toptal/picasso/compare/v2.7.1...v2.7.2) (2019-06-25)

### Bug Fixes

- **TextField** pass native attributes correctly to the input ([#500](https://github.com/toptal/picasso/issues/500)) ([738cf93](https://github.com/toptal/picasso/commit/738cf93))

## [2.7.1](https://github.com/toptal/picasso/compare/v2.7.0...v2.7.1) (2019-06-24)

### Bug Fixes

- **accordion:** fix styles and editor docs ([#495](https://github.com/toptal/picasso/issues/495)) ([9adad1e](https://github.com/toptal/picasso/commit/9adad1e))

# [2.7.0](https://github.com/toptal/picasso/compare/v2.6.0...v2.7.0) (2019-06-24)

### Features

- **page-header-menu:** replace organization property with meta ([#487](https://github.com/toptal/picasso/issues/487)) ([de3882f](https://github.com/toptal/picasso/commit/de3882f))

# [2.6.0](https://github.com/toptal/picasso/compare/v2.5.0...v2.6.0) (2019-06-21)

### Features

- **accordion:** update styles accordingly with base ([#473](https://github.com/toptal/picasso/issues/473)) ([b984bca](https://github.com/toptal/picasso/commit/b984bca))

# [2.5.0](https://github.com/toptal/picasso/compare/v2.4.0...v2.5.0) (2019-06-21)

### Features

- **tabs:** add tabs component ([#478](https://github.com/toptal/picasso/issues/478)) ([479755d](https://github.com/toptal/picasso/commit/479755d))

# [2.4.0](https://github.com/toptal/picasso/compare/v2.3.0...v2.4.0) (2019-06-18)

### Features

- **TextField** add support of native input attributes ([#481](https://github.com/toptal/picasso/issues/481)) ([c2f882c](https://github.com/toptal/picasso/commit/c2f882c))

# [2.3.0](https://github.com/toptal/picasso/compare/v2.2.0...v2.3.0) (2019-06-18)

### Features

- **icon:** add crosshair icon ([#480](https://github.com/toptal/picasso/issues/480)) ([3d0937c](https://github.com/toptal/picasso/commit/3d0937c))

# [2.2.0](https://github.com/toptal/picasso/compare/v2.1.5...v2.2.0) (2019-06-14)

### Features

- **typography:** add yellow and light grey colors ([#467](https://github.com/toptal/picasso/issues/467)) ([56de5e6](https://github.com/toptal/picasso/commit/56de5e6)), closes [#464](https://github.com/toptal/picasso/issues/464)

## [2.1.5](https://github.com/toptal/picasso/compare/v2.1.4...v2.1.5) (2019-06-13)

### Bug Fixes

- **modal:** pass paperProps to enable custom styling of Modal dialog ([#465](https://github.com/toptal/picasso/issues/465)) ([cadcd68](https://github.com/toptal/picasso/commit/cadcd68))

## [2.1.4](https://github.com/toptal/picasso/compare/v2.1.3...v2.1.4) (2019-06-12)

### Bug Fixes

- **ci:** refactor release scripts ([#461](https://github.com/toptal/picasso/issues/461)) ([ae24f2a](https://github.com/toptal/picasso/commit/ae24f2a))

## [2.1.3](https://github.com/toptal/picasso/compare/v2.1.2...v2.1.3) (2019-06-12)

### Bug Fixes

- **ci:** fix incorrect generating of package.json ([#460](https://github.com/toptal/picasso/issues/460)) ([69718cb](https://github.com/toptal/picasso/commit/69718cb))

## [2.1.2](https://github.com/toptal/picasso/compare/v2.1.1...v2.1.2) (2019-06-12)

### Bug Fixes

- **ci:** allow installing picasso with git reference ([#458](https://github.com/toptal/picasso/issues/458)) ([8e0d7d2](https://github.com/toptal/picasso/commit/8e0d7d2))

## [2.1.1](https://github.com/toptal/picasso/compare/v2.1.0...v2.1.1) (2019-06-12)

### Bug Fixes

- **typography:** remove dropped bold font weight from typing ([#454](https://github.com/toptal/picasso/issues/454)) ([a27fd13](https://github.com/toptal/picasso/commit/a27fd13)), closes [#453](https://github.com/toptal/picasso/issues/453)

# [2.1.0](https://github.com/toptal/picasso/compare/v2.0.2...v2.1.0) (2019-06-10)

### Features

- **grid:** add wrap option ([#449](https://github.com/toptal/picasso/issues/449)) ([fa7f5a8](https://github.com/toptal/picasso/commit/fa7f5a8))

## [2.0.2](https://github.com/toptal/picasso/compare/v2.0.1...v2.0.2) (2019-06-10)

### Bug Fixes

- allow using Label and Link with Tooltip ([#432](https://github.com/toptal/picasso/issues/432)) ([d7fe5e7](https://github.com/toptal/picasso/commit/d7fe5e7))

## [2.0.1](https://github.com/toptal/picasso/compare/v2.0.0...v2.0.1) (2019-06-07)

### Bug Fixes

- **docs:** adjust changelog after major upgrade ([#448](https://github.com/toptal/picasso/issues/448)) ([dada27c](https://github.com/toptal/picasso/commit/dada27c))

# [2.0.0](https://github.com/toptal/picasso/compare/v1.9.3...v2.0.0) (2019-06-07)

### Bug Fixes

- **avatar:** change `Avatar` size for the `large` variant ([#416](https://github.com/toptal/picasso/issues/416)) ([68dd6ac](https://github.com/toptal/picasso/commit/68dd6ac))
- **dropdown:** change dropdown shadow elevation ([#433](https://github.com/toptal/picasso/issues/433)) ([235fba7](https://github.com/toptal/picasso/commit/235fba7))
- **loader:** change all `Loader` variant sizes ([#435](https://github.com/toptal/picasso/issues/435)) ([8e499cc](https://github.com/toptal/picasso/commit/8e499cc))
- **modal:** change design of `Modal` ([#343](https://github.com/toptal/picasso/issues/343)) ([8140e51](https://github.com/toptal/picasso/commit/8140e51))
- **radio:** change design of `Radio` and `Checkbox` components ([#369](https://github.com/toptal/picasso/issues/369)) ([50d8607](https://github.com/toptal/picasso/commit/50d8607))
- **stepper:** change `Stepper` margins and icon connector ([#437](https://github.com/toptal/picasso/issues/437)) ([b9043d4](https://github.com/toptal/picasso/commit/b9043d4))
- **table:** change design of `Table` component ([#365](https://github.com/toptal/picasso/issues/365)) ([d9f8090](https://github.com/toptal/picasso/commit/d9f8090))
- **text-field:** change design of `TextField` component ([#368](https://github.com/toptal/picasso/issues/368)) ([e288baf](https://github.com/toptal/picasso/commit/e288baf))
- **tooltip:** change size of an arrow and text for `Tooltip` ([#436](https://github.com/toptal/picasso/issues/436)) ([0091c7a](https://github.com/toptal/picasso/commit/0091c7a))
- **user-badge:** change `UserBadge` outer spacing ([#333](https://github.com/toptal/picasso/issues/333)) ([750e332](https://github.com/toptal/picasso/commit/750e332))

### Features

- **button:** add new variants for buttons ([3216787](https://github.com/toptal/picasso/commit/3216787))
- **colors:** change names and design of all colors ([#387](https://github.com/toptal/picasso/issues/387)) ([496dcdb](https://github.com/toptal/picasso/commit/496dcdb))
- **form:** add `Form.Error` component ([#410](https://github.com/toptal/picasso/issues/410)) ([cb329d7](https://github.com/toptal/picasso/commit/cb329d7))
- **form:** add new `Form.Label` component ([#372](https://github.com/toptal/picasso/issues/372)) ([f12e5f9](https://github.com/toptal/picasso/commit/f12e5f9))
- **label:** add ability to add `Icon` to `Label` component ([#396](https://github.com/toptal/picasso/issues/396)) ([1a10390](https://github.com/toptal/picasso/commit/1a10390))
- **page-header:** support enterprise variant for header ([#392](https://github.com/toptal/picasso/issues/392)) ([d0f9f61](https://github.com/toptal/picasso/commit/d0f9f61))
- **page-header-menu:** wrap header Menu to Page.HeaderMenu ([#406](https://github.com/toptal/picasso/issues/406)) ([0df9391](https://github.com/toptal/picasso/commit/0df9391))
- **pagination:** change design of `Pagination` component ([#412](https://github.com/toptal/picasso/issues/412)) ([989932a](https://github.com/toptal/picasso/commit/989932a))
- **select:** add ability to add icon to `Select` component ([#371](https://github.com/toptal/picasso/issues/371)) ([8b37458](https://github.com/toptal/picasso/commit/8b37458))
- **typography:** add new typography variants and colors ([#356](https://github.com/toptal/picasso/issues/356)) ([70dfb17](https://github.com/toptal/picasso/commit/70dfb17))

### BREAKING CHANGES

#### Select

- removed `variant` prop
- removed `label` prop

> You can check [Select](https://picasso.toptal.net/?path=/story/forms-folder--select) documentation.

#### Stepper

- stepper connector and margins were adjusted to larger
  size.

> You can check [Stepper](https://picasso.toptal.net/?path=/story/components-folder--stepper#default) documentation.

#### Tooltip

- font size and pointing arrow size were adjusted for
  `Tooltip` window.

> You can check [Tooltip](https://picasso.toptal.net/?path=/story/overlays-folder--tooltip#default) documentation.

#### Loader

- all sizes of `Loader` variants were adjusted. If you
  had any static elements counting with size of a `Loader` please adjust
  spacings accordingly.

New size list:

- _Small_ `20` => `16`
- _Medium_ `40` => `32`
- _Large_ `80` => `64`

> You can check [Loader](https://picasso.toptal.net/?path=/story/components-folder--loader#sizes) documentation.

#### Avatar

- large `Avatar` is now a bit smaller. Please check your
  layouts if you were directly using this variant.

> You can check [Avatar](https://picasso.toptal.net/?path=/story/components-folder--avatar#sizes) documentation.

#### Pagination

- pagination design and layout has been completely
  revamped. Now the layout is much skinner and smaller and using default
  buttons from UI kit. Please check your layouts.

> You can check [Pagination](https://picasso.toptal.net/?path=/story/components-folder--pagination#default) documentation.

#### UserBadge

- `children` is now wrapped to special component
  which is exported as `Page.HeaderMenu` which accepts aggregated props
  for `UserBadge` component. You should replace direct usage of `UserBadge`
  inside `Header` with this new component.

- UserBadge outer spacing is now reduced, therefore check
  your layouts which are using UserBadge as standalone component.

#### Page.Header

- header height has been adjusted and now is larger.
  Check any elements which had fixed positions on layout if they need to
  be adjusted to support new height of `Header`

- `zIndex` has been changed to `1100`

> You can check [Header](https://picasso.toptal.net/?path=/story/layout-folder--page#default) documentation.

#### Colors

- all colors shades which were specified as numbers, were
  dropped and replaced with more semantic names.

New shade list:

- `100` => `lighter`
- `200` => `light`
- `300` => `main`
- `400` => `dark`
- `500` => `darker`

> You can check [Colors](https://picasso.toptal.net/?path=/story/utils-folder--colors) documentation.

- most of the colors were updated to the correct HEX
  representations. Please use only those colors which are listed inside
  documentation!

#### TextField

- spacing and size of TextField and Select has been
  changed.
- `label` prop on `TextField` has been renamed to
  `placeholder`. Achieving form field labels is now done by composing
  field from new `Label` and `Hint` components.
- removed `inputLabelProps` prop

> You can check [Form](https://picasso.toptal.net/?path=/story/forms-folder--form#form-field) documentation.

#### Table

- decrease font size and paddings inside all `Table`
  components. Layout of whole table is a bit skinnier now.

> You can check the full result in [Table](https://picasso.toptal.net/?path=/story/components-folder--table#plain-table) documentation.

#### Modal

- replaced `Title` and `CloseIcon` inside modal window
  which makes layout and spacings a bit smaller now.

> You can check result in [Modal](https://picasso.toptal.net/?path=/story/overlays-folder--modal)
> documentation.

#### Typography

- rename old `variant` type and introduce more semantic names for every variant.

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
> documentation.

- all old variant names except `body` are now removed currently `Typography` styles are achieved with `variant`, `weight` and
  `color` prop.

- remove all old `color` variants and rename them to more
  semantic names.

* `primary` => `blue`
* `success` => `green`
* `error` => `red`
* `muted` => `grey`
* _New color:_ `black`

#### Button

- rename old `variant` type and introduce more semantic
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
> section of our documentation.

- remove `primary` variant and add multiple variants
  with different intents.

> `primary` => `primary-blue`

- remove `secondary` variant and add multiple variants
  with different intents.

> `secondary` => `secondary-blue`

- remove `success` variant and combine it with
  primary variant.

> `success` => `primary-green`

- remove `error` variant and combine it with `primary`
  and `secondary` variant.

> `error` => `primary-red`

- **_New Variant_** - `secondary-red`

- remove `basic` variant

#### AccountSelect

- layout has been changed

## [1.9.3](https://github.com/toptal/picasso/compare/v1.9.2...v1.9.3) (2019-06-06)

### Bug Fixes

- **ci:** run kill temploy job with cron ([#440](https://github.com/toptal/picasso/issues/440)) ([6018bae](https://github.com/toptal/picasso/commit/6018bae))

## [1.9.2](https://github.com/toptal/picasso/compare/v1.9.1...v1.9.2) (2019-06-04)

### Bug Fixes

- **ci:** post temploy comments only for PRs ([#429](https://github.com/toptal/picasso/issues/429)) ([53dac88](https://github.com/toptal/picasso/commit/53dac88))

## [1.9.1](https://github.com/toptal/picasso/compare/v1.9.0...v1.9.1) (2019-06-04)

### Bug Fixes

- **ci:** change folder structure of picasso docs ([#423](https://github.com/toptal/picasso/issues/423)) ([c9b961d](https://github.com/toptal/picasso/commit/c9b961d))

# [1.9.0](https://github.com/toptal/picasso/compare/v1.8.1...v1.9.0) (2019-06-03)

### Features

- **amount:** `amount` component to render currencies ([#418](https://github.com/toptal/picasso/issues/418)) ([b485826](https://github.com/toptal/picasso/commit/b485826))

## [1.8.1](https://github.com/toptal/picasso/compare/v1.8.0...v1.8.1) (2019-05-30)

### Bug Fixes

- **container:** add missing values to the `justifyContent` enum ([#409](https://github.com/toptal/picasso/issues/409)) ([b519782](https://github.com/toptal/picasso/commit/b519782))

# [1.8.0](https://github.com/toptal/picasso/compare/v1.7.4...v1.8.0) (2019-05-29)

### Features

- **icon:** add extra product icons ([#395](https://github.com/toptal/picasso/issues/395)) ([a5ee200](https://github.com/toptal/picasso/commit/a5ee200))

## [1.7.4](https://github.com/toptal/picasso/compare/v1.7.3...v1.7.4) (2019-05-28)

### Bug Fixes

- **button:** accept and proxy 'type' prop ([#373](https://github.com/toptal/picasso/issues/373)) ([395295d](https://github.com/toptal/picasso/commit/395295d))

## [1.7.3](https://github.com/toptal/picasso/compare/v1.7.2...v1.7.3) (2019-05-28)

### Bug Fixes

- **textfield:** add missing props ([#388](https://github.com/toptal/picasso/issues/388)) ([dc10b30](https://github.com/toptal/picasso/commit/dc10b30))

## [1.7.2](https://github.com/toptal/picasso/compare/v1.7.1...v1.7.2) (2019-05-28)

### Bug Fixes

- **radio:** fix interface definition for radio group ([#383](https://github.com/toptal/picasso/issues/383)) ([20de87c](https://github.com/toptal/picasso/commit/20de87c))

## [1.7.1](https://github.com/toptal/picasso/compare/v1.7.0...v1.7.1) (2019-05-27)

### Bug Fixes

- **header:** add proper zIndex on Page.Header ([#385](https://github.com/toptal/picasso/issues/385)) ([0d3d9f1](https://github.com/toptal/picasso/commit/0d3d9f1))

# [1.7.0](https://github.com/toptal/picasso/compare/v1.6.0...v1.7.0) (2019-05-27)

### Features

- **page-header:** add logoLink to PageHeader component ([#360](https://github.com/toptal/picasso/issues/360)) ([14e9a77](https://github.com/toptal/picasso/commit/14e9a77)), closes [#354](https://github.com/toptal/picasso/issues/354)

# [1.6.0](https://github.com/toptal/picasso/compare/v1.5.2...v1.6.0) (2019-05-17)

### Bug Fixes

- **textfield:** add autoFocus to TextField ([305b99e](https://github.com/toptal/picasso/commit/305b99e))

### Features

- **dropdown:** implement dropdown component ([834ef6a](https://github.com/toptal/picasso/commit/834ef6a))

## [1.5.2](https://github.com/toptal/picasso/compare/v1.5.1...v1.5.2) (2019-05-16)

### Bug Fixes

- **docs:** add contribution guide ([#277](https://github.com/toptal/picasso/issues/277)) ([f6d322d](https://github.com/toptal/picasso/commit/f6d322d))

## [1.5.1](https://github.com/toptal/picasso/compare/v1.5.0...v1.5.1) (2019-05-15)

### Bug Fixes

- **ci:** copy package.json to root and refactor releases ([#334](https://github.com/toptal/picasso/issues/334)) ([7610fd8](https://github.com/toptal/picasso/commit/7610fd8))

# [1.5.0](https://github.com/toptal/picasso/compare/v1.4.1...v1.5.0) (2019-05-15)

### Bug Fixes

- **ci:** update package.json with correct version after release ([#319](https://github.com/toptal/picasso/issues/319)) ([dbaf6ff](https://github.com/toptal/picasso/commit/dbaf6ff))

### Features

- trigger manual minor version change ([3e2f032](https://github.com/toptal/picasso/commit/3e2f032))

## [1.4.2](https://github.com/toptal/picasso/compare/v1.4.1...v1.4.2) (2019-05-15)

### Bug Fixes

- **ci:** update package.json with correct version after release ([#319](https://github.com/toptal/picasso/issues/319)) ([dbaf6ff](https://github.com/toptal/picasso/commit/dbaf6ff))

## [1.4.1](https://github.com/toptal/picasso/compare/v1.4.0...v1.4.1) (2019-05-15)

### Bug Fixes

- icons vertical alignment for Notification component ([#315](https://github.com/toptal/picasso/issues/315)) ([c3d6a7f](https://github.com/toptal/picasso/commit/c3d6a7f))

# [1.4.0](https://github.com/toptal/picasso/compare/v1.3.1...v1.4.0) (2019-05-14)

### Features

- **loader:** adjust color accordingly with BASE ([#317](https://github.com/toptal/picasso/issues/317)) ([88b4f12](https://github.com/toptal/picasso/commit/88b4f12))

## [1.3.1](https://github.com/toptal/picasso/compare/v1.3.0...v1.3.1) (2019-05-14)

### Bug Fixes

- Make some props not required for TextField, Select components ([#299](https://github.com/toptal/picasso/issues/299)) ([f97c7ce](https://github.com/toptal/picasso/commit/f97c7ce))

# [1.3.0](https://github.com/toptal/picasso/compare/v1.2.4...v1.3.0) (2019-05-13)

### Features

- **link:** adjust Link component and add docs ([#303](https://github.com/toptal/picasso/issues/303)) ([70313a9](https://github.com/toptal/picasso/commit/70313a9))

## [1.2.4](https://github.com/toptal/picasso/compare/v1.2.3...v1.2.4) (2019-05-13)

### Bug Fixes

- **docs:** fix layout tutorial example ([#310](https://github.com/toptal/picasso/issues/310)) ([82a0cc6](https://github.com/toptal/picasso/commit/82a0cc6))

## [1.2.3](https://github.com/toptal/picasso/compare/v1.2.2...v1.2.3) (2019-05-13)

### Bug Fixes

- **bash:** pascal case on linux ([#306](https://github.com/toptal/picasso/issues/306)) ([be55fb4](https://github.com/toptal/picasso/commit/be55fb4))

## [1.2.2](https://github.com/toptal/picasso/compare/v1.2.1...v1.2.2) (2019-05-10)

### Bug Fixes

- **storybook:** wrong Icon import path ([#309](https://github.com/toptal/picasso/issues/309)) ([b762249](https://github.com/toptal/picasso/commit/b762249)), closes [#308](https://github.com/toptal/picasso/issues/308)

## [1.2.1](https://github.com/toptal/picasso/compare/v1.2.0...v1.2.1) (2019-05-10)

### Bug Fixes

- [FX-154] Fix padding after removing padding for root ([#307](https://github.com/toptal/picasso/issues/307)) ([4fd84cb](https://github.com/toptal/picasso/commit/4fd84cb))

# [1.2.0](https://github.com/toptal/picasso/compare/v1.1.0...v1.2.0) (2019-05-10)

### Features

- **page-header:** [FX-154] Make PageHeader sticky ([#301](https://github.com/toptal/picasso/issues/301)) ([20fd7c0](https://github.com/toptal/picasso/commit/20fd7c0))

# [1.1.0](https://github.com/toptal/picasso/compare/v1.0.0...v1.1.0) (2019-05-09)

### Features

- **notification:** new notification component ([#275](https://github.com/toptal/picasso/issues/275)) ([cd5bc1d](https://github.com/toptal/picasso/commit/cd5bc1d))

# [1.0.0](https://github.com/toptal/picasso/compare/v0.3.1...v1.0.0) (2019-05-09)

### chore

- **timesheet:** migrate components into billing frontend ([#268](https://github.com/toptal/picasso/issues/268)) ([40e7583](https://github.com/toptal/picasso/commit/40e7583))

### BREAKING CHANGES

- **timesheet:** component removal

## [0.3.1](https://github.com/toptal/picasso/compare/v0.3.0...v0.3.1) (2019-05-08)

### Bug Fixes

- **ci:** fix pkgRoot while publishing to NPM ([d720b2f](https://github.com/toptal/picasso/commit/d720b2f))

# [0.3.0](https://github.com/toptal/picasso/compare/v0.2.0...v0.3.0) (2019-05-08)

### Features

- add title prop to UserBadge ([#267](https://github.com/toptal/picasso/issues/267)) ([247620b](https://github.com/toptal/picasso/commit/247620b))

# [0.2.0](https://github.com/toptal/picasso/compare/v0.1.0...v0.2.0) (2019-05-07)

### Bug Fixes

- **button:** pass icon.props.className in button component child icon ([#273](https://github.com/toptal/picasso/issues/273)) ([d4bb8bd](https://github.com/toptal/picasso/commit/d4bb8bd))
- **picasso:** expose types and `link` component ([#280](https://github.com/toptal/picasso/issues/280)) ([5ef3029](https://github.com/toptal/picasso/commit/5ef3029))

### Features

- add color property for Typography ([#261](https://github.com/toptal/picasso/issues/261)) ([f253a26](https://github.com/toptal/picasso/commit/f253a26))
- **button:** add circular style for the component ([#271](https://github.com/toptal/picasso/issues/271)) ([b645323](https://github.com/toptal/picasso/commit/b645323))
- **icon:** new notification icons ([#274](https://github.com/toptal/picasso/issues/274)) ([a2a3b45](https://github.com/toptal/picasso/commit/a2a3b45))
- [FX-141] Add Menu component ([#258](https://github.com/toptal/picasso/issues/258)) ([ccb55d4](https://github.com/toptal/picasso/commit/ccb55d4))
- initialize first semantic release ([d7ef6e4](https://github.com/toptal/picasso/commit/d7ef6e4))

# Changelog

## v0.1.0-beta.19 (25/04/2019)

_No changelog for this release._

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
- [**Chore**][fx-147] Group components doc pages by area of usage [#232](https://github.com/toptal/picasso/pull/232)

---

## v0.1.0-beta.16 (24/04/2019)

#### Chore

- [**Chore**] Update edited icons from Talent Onboarding Wizard [#220](https://github.com/toptal/picasso/pull/220)

#### WIP

- [**WIP**][fx-52] Add IE11 support for Storybook [#233](https://github.com/toptal/picasso/pull/233)

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

- [**closed**][fx-134] Add List example and Icon prop docs [#219](https://github.com/toptal/picasso/pull/219)

---

## v0.1.0-beta.14 (19/04/2019)

#### BREAKING CHANGE

- [**BREAKING CHANGE**][**chore**] [FX-6] Simplify Loader component api [#207](https://github.com/toptal/picasso/pull/207)

#### Bugfix

- [**Bugfix**] Fix root height [#218](https://github.com/toptal/picasso/pull/218)

#### Chore

- [**Chore**] Remove prop-types as we don't use them anymore after move all components to TS [#216](https://github.com/toptal/picasso/pull/216)
- [**Chore**][fx-44] Initial alias setup for types and components [#209](https://github.com/toptal/picasso/pull/209)
- [**Chore**][fx-9] Automate adding icons process [#199](https://github.com/toptal/picasso/pull/199)

#### Feature

- [**Feature**][fx-17] Add icons from Talent Onboarding Wizard project [#213](https://github.com/toptal/picasso/pull/213)
- [**Feature**][fx-145] Add Stepper variant without labels and full-width [#204](https://github.com/toptal/picasso/pull/204)

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

- [**Bugfix**][fx-62] Fix vertical alignment for icons inline [#160](https://github.com/toptal/picasso/pull/160)
- [**Bugfix**] Fix Button usage in Timesheets [#153](https://github.com/toptal/picasso/pull/153)

#### Chore

- [**Chore**] Initial change of rest and style, classname props [#161](https://github.com/toptal/picasso/pull/161)
- [**Chore**][fx-76] Align size props in between components [#183](https://github.com/toptal/picasso/pull/183)
- [**Chore**] Add dependency badge to README [#172](https://github.com/toptal/picasso/pull/172)
- [**Chore**][fx-67] Use Icons directly, remove IconLibrary [#157](https://github.com/toptal/picasso/pull/157)
- [**Chore**] Change shadows according to new design specs [#152](https://github.com/toptal/picasso/pull/152)

#### Feature

- [**Feature**][fx-16] Component stepper [#190](https://github.com/toptal/picasso/pull/190)
- [**Feature**][fx-123] Component user badge [#156](https://github.com/toptal/picasso/pull/156)

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

- [**Bugfix**][fx-121] Add support for Safari with clip-path [#150](https://github.com/toptal/picasso/pull/150)
- [**Bugfix**][fx-59] Add custom CssBaseline to add height 100vh to root tags [#141](https://github.com/toptal/picasso/pull/141)

#### CI

- [**CI**][inf] Improve build status reporting [#139](https://github.com/toptal/picasso/pull/139)

#### Chore

- [**Chore**][fx-73] Timesheets. Fix link for show more, replace with button [#151](https://github.com/toptal/picasso/pull/151)
- [**Chore**] Migrate Checkbox to TS [#149](https://github.com/toptal/picasso/pull/149)
- [**Chore**] Migrate Buttongroup to TS [#148](https://github.com/toptal/picasso/pull/148)
- [**Chore**] Migrate Button to TS [#145](https://github.com/toptal/picasso/pull/145)
- [**Chore**] Ugrade to the latest docgen package [#138](https://github.com/toptal/picasso/pull/138)
- [**Chore**][fx-81] Make lowercase for subcomponent names [#137](https://github.com/toptal/picasso/pull/137)

#### Feature

- [**Feature**][fx-121] Add avatar component [#147](https://github.com/toptal/picasso/pull/147)
- [**Feature**][fx-13] Add Paper component [#143](https://github.com/toptal/picasso/pull/143)
- [**Feature**][fx-61] Add option to make select dynamic in width size [#142](https://github.com/toptal/picasso/pull/142)
- [**Feature**][fx-14] Add Image component [#146](https://github.com/toptal/picasso/pull/146)
- [**Feature**][fx-73] Add show more to Timesheets [#136](https://github.com/toptal/picasso/pull/136)

---

## v0.1.0-beta.11 (29/03/2019)

#### Chore

- [**Chore**][fx-101] Migrate accordion to TSX [#133](https://github.com/toptal/picasso/pull/133)
- [**Chore**] Upgrade storybook to 5.0.5 [#134](https://github.com/toptal/picasso/pull/134)
- [**Chore**] Fix minor issues [#127](https://github.com/toptal/picasso/pull/127)
- [**Chore**] Selectable table example implemented with hooks [#128](https://github.com/toptal/picasso/pull/128)
- [**Chore**][fx-75] Refactor to use children props where possible [#129](https://github.com/toptal/picasso/pull/129)
- [**Chore**][fx-114] Migrate MenuItem to TSX [#132](https://github.com/toptal/picasso/pull/132)
- [**Chore**][fx-74] Fix positive/negative to success/error copies [#125](https://github.com/toptal/picasso/pull/125)

#### Feature

- [**Feature**][fx-64] Add Timesheets widget [#131](https://github.com/toptal/picasso/pull/131)
- [**Feature**][fx-77] Remove color for Radio [#135](https://github.com/toptal/picasso/pull/135)
- [**Feature**] Initial Table components [#124](https://github.com/toptal/picasso/pull/124)
- [**Feature**][tact-69] Change footer's paddings [#126](https://github.com/toptal/picasso/pull/126)

---

## v0.1.0-beta.10 (20/03/2019)

#### closed

- [**closed**] Changes toward davinci standard [#123](https://github.com/toptal/picasso/pull/123)

---

## v0.1.0-beta.9 (18/03/2019)

#### Bugfix

- [**Bugfix**][fx-66] Fix Icon mangled names inside prod build [#122](https://github.com/toptal/picasso/pull/122)

#### Chore

- [**Chore**] Update visual tests steps documentation [#121](https://github.com/toptal/picasso/pull/121)

---

## v0.1.0-beta.8 (15/03/2019)

#### Bugfix

- [**Bugfix**] Center Toptal logo vertically in header [#115](https://github.com/toptal/picasso/pull/115)

#### Chore

- [**Chore**] Add markdown prop description support [#120](https://github.com/toptal/picasso/pull/120)
- [**Chore**] Adjust support info [#118](https://github.com/toptal/picasso/pull/118)
- [**Chore**][fx-7] Add story sections anchor link [#117](https://github.com/toptal/picasso/pull/117)
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

- [**Chore**][fx-45] Prepare tsconfig for storybook [#111](https://github.com/toptal/picasso/pull/111)
- [**Chore**] Add symlink yarn command and document linking [#110](https://github.com/toptal/picasso/pull/110)
- [**Chore**] Add support info [#112](https://github.com/toptal/picasso/pull/112)

---

## v0.1.0-beta.5 (11/03/2019)

#### Chore

- [**Chore**][fx-18] Restructure Form examples [#108](https://github.com/toptal/picasso/pull/108)
- [**Chore**] Change logo [#109](https://github.com/toptal/picasso/pull/109)

#### Feature

- [**Feature**] Add Tooltip component [#104](https://github.com/toptal/picasso/pull/104)

---

## v0.1.0-beta.4 (08/03/2019)

_No changelog for this release._

---

## v0.1.0-beta.3 (08/03/2019)

#### CI

- [**CI**] Fix jenkins workspace concurrecy [#105](https://github.com/toptal/picasso/pull/105)

#### Chore

- [**Chore**] Add types file in Page folder [#103](https://github.com/toptal/picasso/pull/103)
- [**Chore**] Fix hot reload [#107](https://github.com/toptal/picasso/pull/107)

#### Feature

- [**Feature**][fx-42] Migrate manual props docs to auto-generated [#101](https://github.com/toptal/picasso/pull/101)
- [**Feature**][fx-18] Add Form.Field and Form.Hint components [#100](https://github.com/toptal/picasso/pull/100)

---

## v0.1.0-beta.2 (07/03/2019)

#### Chore

- [**Chore**][**do not merge**] Speed up webpack build [#102](https://github.com/toptal/picasso/pull/102)
- [**Chore**][fx-20] Add breakpoints [#98](https://github.com/toptal/picasso/pull/98)
- [**Chore**] Change PR template, adjust version badge [#97](https://github.com/toptal/picasso/pull/97)

#### Feature

- [**Feature**][fx-19] Add Page container component [#95](https://github.com/toptal/picasso/pull/95)
- [**Feature**][fx-20] Add grid component [#94](https://github.com/toptal/picasso/pull/94)
- [**Feature**][fx-18] Add full width option for TextField [#99](https://github.com/toptal/picasso/pull/99)
- [**Feature**] Add Modal component [#92](https://github.com/toptal/picasso/pull/92)
- [**Feature**][fx-48] Add CssBaseline component to provider [#96](https://github.com/toptal/picasso/pull/96)

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
- [**Chore**][**do not merge**] Move -examples to .examples [#78](https://github.com/toptal/picasso/pull/78)

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

_No changelog for this release._

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
