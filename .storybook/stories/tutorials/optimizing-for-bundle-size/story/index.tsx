import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Tutorials').createPage(
  'How to optimize for bundle size',
  'Learn how to optimize Picasso usage for bundle size'
)

page.createChapter().addTextSection(`
Picasso is a large library and it's not always necessary to import the whole thing.
This tutorial will walk you through how to use Picasso in a way that optimizes for bundle size.
`)

page.createChapter('Avoiding compound components').addTextSection(`
Picasso's components are built with composition in mind.
This means that some of the components are compound components.
Compound components are components that are grouped together and share a common context.
Importing a compound component will import all of its children.

For example, using the compound \`<Form.Input/>\` will import \`<Form/>\` and consequently all of it's children (\`<Form.Select/>\`, \`<Form.Checkbox/>\`, etc.), even if you don't use them.
This is a even a greater problem for components that have many children, like \`<Form/>\`.
For this reason, importing compound components should be avoided, instead import the children directly.

Each child component of a compound component is exported as a named export, and for \`<Form/>\` an special \`<FormNonCompound/>\` component is also exported.
This component is a wrapper around the Form component that doesn't import any of the children.
Example of importing a single child component:

\`\`\`js
import { FormNonCompound as Form, Input } from '@toptal/picasso-forms'

const Example = () => (
  <Form>
    <Input />
  </Form>
)
\`\`\`

For automating this process, you can provide a special codemod that should replace all \`Form\` compound components with their non-compound counterparts.
To run the codemod, run the following command in your project:
\`\`\`sh
npx @toptal/picasso-codemod@latest v52.2.0/non-compound-forms
\`\`\`
`)
