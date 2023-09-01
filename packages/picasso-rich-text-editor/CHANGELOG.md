# @toptal/picasso-rich-text-editor

## 6.0.0

### Patch Changes

- Updated dependencies [[`9a02bbdb4`](https://github.com/toptal/picasso/commit/9a02bbdb4574cbdac26a2f6e9e4cf9de65609695)]:
  - @toptal/picasso@38.0.0

## 5.0.3

### Patch Changes

- [#3830](https://github.com/toptal/picasso/pull/3830) [`7cc4f93aa`](https://github.com/toptal/picasso/commit/7cc4f93aadf07a3fdd297e6c87e15702d80f49a9) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### RichTextEditor

- set width `auto` to headings select

## 5.0.2

### Patch Changes

- [#3829](https://github.com/toptal/picasso/pull/3829) [`00b4b159c`](https://github.com/toptal/picasso/commit/00b4b159c11046f747f5a1c97877bd2bb867899a) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### RichTextEditor

- apply Picasso Typography styles to RichTextEditor headings

## 5.0.1

### Patch Changes

- [#3805](https://github.com/toptal/picasso/pull/3805) [`ee1456aa3`](https://github.com/toptal/picasso/commit/ee1456aa35ded27a7a7fc6dbb7319167f52d9e6a) Thanks [@sashuk](https://github.com/sashuk)!

### RichTextEditor

- fix placeholder wrap

## 5.0.0

### Major Changes

- [#3790](https://github.com/toptal/picasso/pull/3790) [`4d0ec2b97`](https://github.com/toptal/picasso/commit/4d0ec2b9767ff43399888a05b66946bc31de01d1) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- add support for the code block
  - the only breaking change is the need of updating Picasso to ^37.3.0

## 4.2.1

### Patch Changes

- [#3784](https://github.com/toptal/picasso/pull/3784) [`a41d75d34`](https://github.com/toptal/picasso/commit/a41d75d34c2e2680fd078ec373ea9d1a5ec3496c) Thanks [@sashuk](https://github.com/sashuk)!
- rename files according to guidelines

## 4.2.0

### Minor Changes

- [#3761](https://github.com/toptal/picasso/pull/3761) [`bc10a745a`](https://github.com/toptal/picasso/commit/bc10a745abcfa32e9b6254b4fea476217c5c9561) Thanks [@mkrl](https://github.com/mkrl)!
- modify LinkPlugin to be able to insert links as text if nothing is selected in the editor

## 4.1.0

### Minor Changes

- [`613c1da99`](https://github.com/toptal/picasso/commit/613c1da99ba9a3b47b3e9e9f96832c6dd29215f2) Thanks [@TomasSlama](https://github.com/TomasSlama)!
- add support for highlighted inline code

## 4.0.2

### Patch Changes

- [#3745](https://github.com/toptal/picasso/pull/3745) [`e9c9d76c4`](https://github.com/toptal/picasso/commit/e9c9d76c40949204543035f7cbbb4594739f02e7) Thanks [@mkrl](https://github.com/mkrl)!
- fix internal Lexical state being initialized without empty paragraph when `{ root: { children: [] } }` is provided as a default value
  - fix editor crash when empty list is being inserted into the editor with no paragraph

## 4.0.1

### Patch Changes

- [#3733](https://github.com/toptal/picasso/pull/3733) [`bbea3a6b8`](https://github.com/toptal/picasso/commit/bbea3a6b8a461e7dc33976068dacaeeda5dd665f) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### RichTextEditor

- return `id` to the toolbar for backward compatibility

## 4.0.0

### Major Changes

- [#3723](https://github.com/toptal/picasso/pull/3723) [`11d846365`](https://github.com/toptal/picasso/commit/11d846365006281218dcf36a4b322618183963ff) Thanks [@TomasSlama](https://github.com/TomasSlama)!

### RichText

- add support for images ([example](https://picasso.toptal.net/?path=/story/forms-richtexteditor--richtexteditor#image-upload))
- update peer dependency of Picasso to `37.1.0` (BREAKING CHANGE)

## 3.1.0

### Minor Changes

- [#3708](https://github.com/toptal/picasso/pull/3708) [`f3b2622cd`](https://github.com/toptal/picasso/commit/f3b2622cd7f6ad8cdf53cec3b0dae1b9222558a0) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### EmojiPlugin

- implement emoji plugin as a component

### Patch Changes

- [#3708](https://github.com/toptal/picasso/pull/3708) [`f3b2622cd`](https://github.com/toptal/picasso/commit/f3b2622cd7f6ad8cdf53cec3b0dae1b9222558a0) Thanks [@augustobmoura](https://github.com/augustobmoura)!

### RichTextEditorToolbar

- add groups for component plugins using the Toolbar portal automatically

## 3.0.0

### Patch Changes

- [#3716](https://github.com/toptal/picasso/pull/3716) [`25f9fd26c`](https://github.com/toptal/picasso/commit/25f9fd26cf4492a011bccd6b78021cf11fb65020) Thanks [@mkrl](https://github.com/mkrl)!
- updated Lexical editor to 0.11.1
  - fixed extra line breaks appearing when copy/pasting HTML content into the editor
  - fixed `RichText` preview component to render `strong` + `h3` tags at the same time correctly
- Updated dependencies [[`7fe284d96`](https://github.com/toptal/picasso/commit/7fe284d96dea180744f4f3eb6c274517b5a24153)]:
  - @toptal/picasso@37.0.0

## 2.1.0

### Minor Changes

- [#3607](https://github.com/toptal/picasso/pull/3607) [`e122dee5d`](https://github.com/toptal/picasso/commit/e122dee5d7ec036d3c24234075ac339ea16d469b) Thanks [@dmaklygin](https://github.com/dmaklygin)!
- replace Quill with Lexical editor (no existing API changes)
  - add new plugin API

## 2.0.1

### Patch Changes

- [#3665](https://github.com/toptal/picasso/pull/3665) [`2e8a86f30`](https://github.com/toptal/picasso/commit/2e8a86f30a7b165d7767775685c6180b83f3a91d) Thanks [@sashuk](https://github.com/sashuk)!
- properties were added to block Grammarly from accessing rich text editor fields

## 2.0.0

### Patch Changes

- Updated dependencies [[`d4795a8a5`](https://github.com/toptal/picasso/commit/d4795a8a5fb9f36ae724c0cddf80822701e753cc)]:
  - @toptal/picasso@36.0.0

## 1.0.1

### Patch Changes

- [#3652](https://github.com/toptal/picasso/pull/3652) [`6b3b4111c`](https://github.com/toptal/picasso/commit/6b3b4111c7836b2b8a3b435205a25ad75d120c4e) Thanks [@dmaklygin](https://github.com/dmaklygin)!

### RichTextEditor

- create `Rich Text Editor` package.
