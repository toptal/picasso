# @toptal/picasso-codemod

[![Picasso NPM package](https://img.shields.io/npm/v/@toptal/picasso-codemod?color=green&logo=toptal)](https://www.npmjs.com/package/@toptal/picasso-codemod)

> Codemod scripts for Picasso

This repository contains a collection of codemod scripts based for use with [JSCodeshift](https://github.com/facebook/jscodeshift) that help update Picasso APIs.

## Setup & Usage

- `yarn add -D @toptal/picasso-codemod`
- `npx jscodeshift -t <codemod-script> --parser=tsx <path>`
- [jscodeshift CLI usage](https://github.com/facebook/jscodeshift#usage-cli)

## Limitations

Codemods do not guarantee the code format preservation. Therefore be sure to run `prettier` and `eslint` on your repo after applying a codemod. Take a look [here](https://github.com/benjamn/recast/issues/140) to learn more about the issue.

## Included Scripts

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
npx jscodeshift --parser=tsx -t node_modules/@toptal/picasso-codemod/v17.0.0/typography-sizes src/**/*.tsx
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
npx jscodeshift --parser=tsx -t node_modules/@toptal/picasso-codemod/v17.0.0/typography-sizes src/**/*.tsx --parser-config=path/to/your/config.json
```

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
npx jscodeshift --parser=tsx -t node_modules/@toptal/picasso-codemod/v16.0.0/revert-colors src/**/*.tsx
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
npx jscodeshift --parser=tsx -t node_modules/@toptal/picasso-codemod/v5.0.0/prompt-modal-variants src/**/*.tsx
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
npx jscodeshift -t node_modules/@toptal/picasso-codemod/v5.0.0/label-tag src/**/*.tsx --parser=tsx
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
npx jscodeshift --parser=tsx -t node_modules/@toptal/picasso-codemod/v5.0.0/accordion-borders src/**/*.tsx
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
npx jscodeshift -t node_modules/@toptal/picasso-codemod/v5.0.0/subheader-pagehead src/**/*.tsx --parser=tsx
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
npx jscodeshift -t node_modules/@toptal/picasso-codemod/v5.0.0/header-topbar src/**/*.tsx --parser=tsx
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
npx jscodeshift -t node_modules/@toptal/picasso-codemod/v5.0.0/button-variants src/**/*.tsx --parser=tsx
```

</details>
