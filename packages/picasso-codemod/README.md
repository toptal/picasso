# @toptal/picasso-codemod

> Codemod scripts for Picasso

This repository contains a collection of codemod scripts based for use with [JSCodeshift](https://github.com/facebook/jscodeshift) that help update Picasso APIs.

## Setup & Run

- `npm install -D @toptal/picasso-codemod`
- `npx jscodeshift -t <codemod-script> --parser=tsx <path>`
- [jscodeshift CLI usage](https://github.com/facebook/jscodeshift#usage-cli)

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

