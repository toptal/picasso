# @toptal/picasso-codemod

[![Picasso NPM package](https://img.shields.io/npm/v/@toptal/picasso-codemod?color=green&logo=toptal)](https://www.npmjs.com/package/@toptal/picasso-codemod)

> Codemod scripts for Picasso

This repository contains a collection of codemod scripts based for use with [JSCodeshift](https://github.com/facebook/jscodeshift) that help update Picasso APIs.

## Usage:

```shell
npx @toptal/picasso-codemod <codemod> [<files>] [options]
```

@toptal/picasso-codemod can detect what type of
repository you use and select files automatically for you.

For `monorepo` it looks through following paths:

```shell
*libs/*/src/**/*.tsx
*hosts/*/src/**/*.tsx
*apps/*/src/**/*.tsx
*namespaces/*/libs/*/src/**/*.tsx
*namespaces/*/apps/*/src/**/*.tsx
```

and for `SPA` it checks:

```shell
src/**/*.tsx
```

If your repository follows a different structure, you can **specify
path to your files as a second parameter** (`files`) shown in the usage
command.

## Limitations

Codemods do not guarantee the code format preservation. Therefore be sure to run `prettier` and `eslint` on your repo after applying a codemod. Take a look [here](https://github.com/benjamn/recast/issues/140) to learn more about the issue.

## Included Scripts


### v38.1.0

Replaces spacing property values of `Container` and `Dropdown` components with BASE-aligned property values according to the https://github.com/toptal/picasso/blob/master/docs/decisions/18-spacings.md. Property values that do not have BASE counterpart or are complex expressions have to be updated manually (non-BASE values have to be replaced with BASE ones after consulting with Design Team), codemod outputs the list of such cases for convenience. Run linter or prettier to align updated code with project code style

```sh
npx @toptal/picasso-codemod v38.1.0@latest
```

### v36.0.0

Replaces all imports of RichTextEditor related components to `@toptal/picasso-rich-text-editor` and updates package.json with a new version of `@toptal/picasso`, `@toptal/picasso-rich-text-editor` and `@toptal/picasso-forms`

```sh
npx @toptal/picasso-codemod v36.0.0 --run-in-band
```

### v52.2.0

Replaces compound `Form` with `FormNonCompound` and adjusts all the compound components to be directly imported from `picasso-forms`.

#### `non-compound-forms`

```diff
-<Form>
-  <Form.Input/>
-  <Form.CheckboxGroup>
-    <Form.Checkbox/>
-  </Form.CheckboxGroup>
-</Form>
+<FormNonCompound>
+  <Input/>
+  <CheckboxGroup>
+    <Checkbox/>
+  </CheckboxGroup>
+</FormNonCompound>
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v52.2.0/non-compound-forms src/**/*.tsx
```

</details>

### v24.0.0

Replaces imports and components from `Sidebar` to `Page.Sidebar`

#### `page-sidebar`

```diff
-<Sidebar>
-  <Sidebar.Logo>Foo</Sidebar.Logo>
-  <Sidebar.Menu>
-    <Sidebar.Item></Sidebar.Item>
-  </Sidebar.Menu>
-</Sidebar>
+<Page.Sidebar>
+  <Page.Sidebar.Logo>Foo</Page.Sidebar.Logo>
+  <Page.Sidebar.Menu>
+    <Page.Sidebar.Item></Page.Sidebar.Item>
+  </Page.Sidebar.Menu>
+</Page.Sidebar>
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v24.0.0/page-sidebar
```

</details>

### v20.0.0

#### `remove-tooltip-variant`

Removes tooltip variant

```diff
-<Tooltip open variant='dark' />
+<Tooltip open />

-<Tooltip open variant='light' />
+<Tooltip open />
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v20.0.0/remove-tooltip-variant
```

</details>

#### `replace-error`

Replaces `error` prop with `status` prop for input components that supports `error` prop: `Input`, `NumberInput`, `Autocomplete`, `PasswordInput`, `DatePicker`, `TimePicker`, `Select` and `TagSelector`

```diff
-<Input error={true} />
+<Input status='error' />

-<Input error={error} />
+<Input status={error ? 'error' : 'default'} />

-<Input error={hasError || isValid} />
+<Input status={hasError || isValid ? 'error' : 'default'} />
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v20.0.0/replace-error
```

</details>

#### `overlay-badge`

Rename the removed `OverlayBadge` to `Badge`, `Badge` now has functionality from
both components. We also add an prop `size` as `medium` in previous
`OverlayBadge`s if `size` is missing, this is because the default for `Badge` is
actually `large`

```diff
-import { OverlayBadge } from '@toptal/picasso'
+import { Badge } from '@toptal/picasso'

const foo = () => (
-  <OverlayBadge>
-    <Avatar />
-  </OverlayBadge>
+  <Badge size="medium">
+    <Avatar />
+  </Badge>
)
```

### v19.0.0

#### `rename-rating-stars`

Transforms old `Rating` and `Form.Ratings` to their new names, `Rating.Stars` and `Form.Rating.Stars`

```diff
-<Rating />
+<Rating.Stars />

-<Form.Rating />
+<Form.Rating.Stars />
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v19.0.0/rename-rating-stars
```

</details>

### v18.0.0

#### `picasso-lab`

Merges `picasso-lab` imports into `picasso` and replaces `picasso-lab` reference with `picasso`.

> Note: Some edge cases are not covered.
>
> If imports cannot be resolved, user will be shown with the warning - which
> files cannot be updated and needs manual inspection.

Here's how the diff should look like:

```diff
-import { Component1, Component2 } from '@toptal/picasso-lab'
+import { Component1, Component2 } from '@toptal/picasso'
-import * as NamespaceImport from '@toptal/picasso-lab'
+import * as NamespaceImport from '@toptal/picasso'
-import { Component1 } from '@toptal/picasso'
-import { Component2 } from '@toptal/picasso-lab'
+import { Component1, Component2 } from '@toptal/picasso'
-import { Component1 } from '@toptal/picasso'
-// unresolved import
-import { Component2 } from '@toptal/picasso-lab'
+import { Component1 } from '@toptal/picasso'
+// unresolved import
+import { Component2 } from '@toptal/picasso'
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v18.0.0/picasso-lab
```

</details>

### v17.0.0

#### `typography-sizes`

Transforms `Typography`, `TypographyOverflow` and `Amount` size prop from `'small' | 'xsmall'` to `'xsmall' | 'xxsmall'`.

This change only applies to variant `body` (which is default)

> **Remember to run this codemod only once in your structure!**
>
> Because in first run: `small --> xsmall`
>
> but in second run: `xsmall --> xxsmall`
>
> If you need to run it again, revert/checkout previous changes

Here's how the diff should look like:

```diff
-<Typography size='small'>Text</Typography>
+<Typography size='xsmall'>Text</Typography>
-<Typography size='xsmall'>Text</Typography>
+<Typography size='xxsmall'>Text</Typography>
-<Typography size={condition ? 'small' : 'xsmall'}>Text</Typography>
+<Typography size={condition ? 'xsmall' : 'xxsmall'}>Text</Typography>
-<TypographyOverflow size='small'>Text</TypographyOverflow>
+<TypographyOverflow size='xsmall'>Text</TypographyOverflow>
-<TypographyOverflow size='xsmall'>Text</TypographyOverflow>
+<TypographyOverflow size='xxsmall'>Text</TypographyOverflow>
-<TypographyOverflow size={condition ? 'small' : 'xsmall'}>Text</TypographyOverflow>
+<TypographyOverflow size={condition ? 'xsmall' : 'xxsmall'}>Text</TypographyOverflow>
-<Amount size='small'>Text</Amount>
+<Amount size='xsmall'>Text</Amount>
-<Amount size='xsmall'>Text</Amount>
+<Amount size='xxsmall'>Text</Amount>
-<Amount size={condition ? 'small' : 'xsmall'}>Text</Amount>
+<Amount size={condition ? 'xsmall' : 'xxsmall'}>Text</Amount>
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v17.0.0/typography-sizes
```

</details>

#### In case you use wrapper components for `Typography`

codemod by default checks only `Typography`, `TypographyOverflow` and `Amount` components.

If you want to include other components, you need to:

1. create a json file and put your components in it:

```json
{
  "includeComponents": ["Foo", "Bar"]
}
```

2. run command with `--parser-config` param:

```shell
npx @toptal/picasso-codemod v17.0.0/typography-sizes --parser-config=path/to/your/config.json
```

#### `container-borders`

Removes `bordered` prop from `Container` components with all colored variants.

Here's how the diff should look like:

```diff
-<Container variant='red' bordered>text</Container>
+<Container variant='red'>text</Container>
-<Container variant='green' bordered>text</Container>
+<Container variant='green'>text</Container>
-<Container variant='yellow' bordered>text</Container>
+<Container variant='yellow'>text</Container>
-<Container variant='blue' bordered>text</Container>
+<Container variant='blue'>text</Container>
-<Container variant='grey' bordered>text</Container>
+<Container variant='grey'>text</Container>
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v17.0.0/container-borders
```

</details>

### v16.0.0

#### `revert-colors`

Transforms props with `ColorType` for the `Tag.Rectangular`, `Tag` and `Indicator`
from `'dark' | 'positive' | 'light' | 'negative' | 'warning' | 'primary'` to `'red' | 'yellow' | 'dark-grey' | 'light-grey' | 'green' | 'blue'`.

The diff should look like this:

```diff
-<Tag variant='negative'>Label</Tag>
-<Tag variant='warning'>Label</Tag>
-<Tag variant='primary'>Label</Tag>
-<Tag variant='positive'>Label</Tag>
-<Tag variant='light'>Label</Tag>
+<Tag variant='red'>Label</Tag>
+<Tag variant='yellow'>Label</Tag>
+<Tag variant='blue'>Label</Tag>
+<Tag variant='green'>Label</Tag>
+<Tag variant='light-grey'>Label</Tag>
-<Tag.Rectangular variant='negative'>Label</Tag.Rectangular>
-<Tag.Rectangular variant='warning'>Label</Tag.Rectangular>
-<Tag.Rectangular variant='dark'>Label</Tag.Rectangular>
-<Tag.Rectangular variant='positive'>Label</Tag.Rectangular>
-<Tag.Rectangular variant='light'>Label</Tag.Rectangular>
+<Tag.Rectangular variant='red'>Label</Tag.Rectangular>
+<Tag.Rectangular variant='yellow'>Label</Tag.Rectangular>
+<Tag.Rectangular variant='dark-grey'>Label</Tag.Rectangular>
+<Tag.Rectangular variant='green'>Label</Tag.Rectangular>
+<Tag.Rectangular variant='light-grey'>Label</Tag.Rectangular>
-<Indicator color='negative' />
-<Indicator color='warning' />
-<Indicator color='primary' />
-<Indicator color='positive' />
-<Indicator color='light' />
+<Indicator color='red' />
+<Indicator color='yellow' />
+<Indicator color='blue' />
+<Indicator color='green' />
+<Indicator color='light-grey' />
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v16.0.0/revert-colors
```

</details>

### v5.0.0

#### `prompt-modal-variants`

Updates the PromptModal variant prop from `red | green | blue` to `positive | negative`.

The diff should look like this:

```diff
-<PromptModal title="Title" message="message" onSubmit={handleSubmit} open={isOpen} variant='red' />
-<PromptModal title="Title" message="message" onSubmit={handleSubmit} open={isOpen} variant='blue' />
-<PromptModal title="Title" message="message" onSubmit={handleSubmit} open={isOpen} variant='green' />
+<PromptModal title="Title" message="message" onSubmit={handleSubmit} open={isOpen} variant='negative' />
+<PromptModal title="Title" message="message" onSubmit={handleSubmit} open={isOpen} variant='positive' />
+<PromptModal title="Title" message="message" onSubmit={handleSubmit} open={isOpen} variant='positive' />
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v5.0.0/prompt-modal-variants
```

</details>

#### `label-tag`

Renames occurrences of `Label` to `Tag`.

```diff
- import { Label } from '@toptal/picasso'
+ import { Tag } from '@toptal/picasso'

  const Example = () => (
-   <Label.Group>
+   <Tag.Group>
-     <Label>Angular JS</Label>
+     <Tag>Angular JS</Tag>
-     <Label>React JS</Label>
+     <Tag>React JS</Tag>
-     <Label onDelete={handleDelete}>Ember JS</Label>
+     <Tag onDelete={handleDelete}>Ember JS</Tag>
-     <Label>Vue JS</Label>
+     <Tag>Vue JS</Tag>
-   </Label.Group>
+   </Tag.Group>
  )
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v5.0.0/label-tag
```

</details>

#### `accordion-borders`

Updates the Accordion prop `bordered?: boolean` to `borders: 'all' | 'none'`.

The diff should look like this:

```diff
-<Accordion content='Accordion content' bordered>Summary</Accordion>
-<Accordion content='Accordion content' bordered={true}>Summary</Accordion>
-<Accordion content='Accordion content' bordered={false}>Summary</Accordion>
-<Accordion content='Accordion content'>Summary</Accordion>
+<Accordion content='Accordion content' borders='all'>Summary</Accordion>
+<Accordion content='Accordion content' borders='all'>Summary</Accordion>
+<Accordion content='Accordion content' borders='none'>Summary</Accordion>
+<Accordion content='Accordion content'>Summary</Accordion>
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v5.0.0/accordion-borders
```

</details>

#### `subheader-pagehead`

Renames occurrences of `Subheader` to `PageHead`.

```diff
- import { Subheader } from '@toptal/picasso'
+ import { PageHead } from '@toptal/picasso'

  const Example = () => (
-   <Subheader>
+   <PageHead>
-     <Subheader.Main>
+     <PageHead.Main>
-        <Subheader.Title>Title</Subheader.Title>
+        <PageHead.Title>Title</PageHead.Title>
-     </Subheader.Main>
+     </PageHead.Main>
-   </Subheader>
+   </PageHead>
  )
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v5.0.0/subheader-pagehead
```

</details>

#### `header-topbar`

Renames occurrences of `Page.Header` to `Page.TopBar`.

````diff
  import { Page } from '@toptal/picasso'

  const Example = () => (
-   <Page.Header>
+   <Page.TopBar>
       Content
-   </Page.Header>
+   </Page.TopBar>

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v5.0.0/header-topbar
````

</details>

#### `button-variants`

Renames variants of button to new values, replaced circular button with `Button.Circular`.

```diff
  const Example = () => (
-     <Button variant='primary-blue'>Primary Red</Button>
+     <Button variant='primary'>Primary Red</Button>
  )
```

<details>
<summary>Command</summary>

```sh
npx @toptal/picasso-codemod v5.0.0/button-variants
```

</details>
