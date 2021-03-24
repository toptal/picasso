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
