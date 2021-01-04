import PicassoBook from '~/.storybook/components/PicassoBook'

const formsPage = PicassoBook.section('Tutorials').createPage(
  'How to layout forms',
  'Learn how to create form layouts using Picasso Form components.'
)

/** Introduction */
formsPage
  .createChapter()
  .addTextSection(
    `
In this tutorial you will learn how to create forms layouts from scratch using components from Picasso.
We will focus on using \`Form\`, \`Form.Field\`, input components \`Input\`, \`Select\`, \`Radio\` and
\`Checkbox\` to create imaginary form for creating new candidate.

### Goals
 * Explain \`Form\` component and it's child component \`Form.Field\`
 * Show how to use \`Grid\` and \`Grid.Item\` to create form layouts
 * Creating inline fields
`
  )
  .addExample('tutorials/Forms/story/Forms.final.example.tsx', {
    title: 'End result'
  }) // picasso-skip-visuals

/** Tutorial */
const tutorialChapter = formsPage.createChapter(
  'Tutorial',
  'Step-by-step guide to create form layout'
)

/** First step */
tutorialChapter
  .addTextSection(
    `
For this example we will use \`Grid\` component to make form responsive and adequate size for different
screen sizes. It can easily be centered using \`justifyContent\` prop. Each form should have
[\`Form\`](..?path=/story/forms-folder--form) component as root element to handle form interaction like
\`onSubmit\` events.

Let's add one form text field just to be able to test responsivness of our form.
  `,
    {
      title: 'First step: Define basic form container'
    }
  )
  .addExample('tutorials/Forms/story/Forms.1.example.tsx', {
    id: 'forms-1'
  }) // picasso-skip-visuals

/** Second step */
tutorialChapter
  .addTextSection(
    `
As you probably saw from the last step when we added \`Input\` we wrapped it with \`Form.Field\`. It is
important because \`Form.Field\` keeps correct spacings in form, allows the addition of hints and in future, it will
provide new features regarding validation and integration with data.

When you are adding new form controls like \`Checkbox\`, \`Select\`, etc. keep in mind to wrap it as we did in this
tutorial step. Each control has some specific interface to be used and please refer to Picasso documentation for
additional details.
  `,
    {
      title: 'Second step: Add form controls'
    }
  )
  .addExample('tutorials/Forms/story/Forms.2.example.tsx', {
    id: 'forms-2'
  }) // picasso-skip-visuals

/** Third step */
tutorialChapter
  .addTextSection(
    `
In this step, we will show how to add horizontal or inline form controls by using \`Grid\` to
define flexbox in the horizontal direction and define ratios for each control. 

The concept stays the same, we wrap each control with \`Form.Field\` and define a grid layout with
spacings and grid columns.
  `,
    {
      title: 'Third step: Inline form controls'
    }
  )
  .addExample('tutorials/Forms/story/Forms.3.example.tsx', {
    id: 'forms-3'
  }) // picasso-skip-visuals

/** Fourth step */
tutorialChapter
  .addTextSection(
    `
In this step we used the same form as in previous example, but replaced placeholders with labels.

The concept stays the same, we wrap each control with \`Form.Field\` , but also add \`Form.Label\` for every input.
If you'd like to focus \`Input\` by click on label, you need to specify \`id\` and \`htmlFor\`
`,
    {
      title: 'Fourth step: Use labels instead of placeholders'
    }
  )
  .addExample('tutorials/Forms/story/Forms.4.example.tsx', {
    id: 'forms-4'
  }) // picasso-skip-visuals

/** Third step */
tutorialChapter
  .addTextSection(
    `
In the final step, we will focus on \`Radio.Group\` that is used to group radio form
controls. Basically, all you need is to define \`Radio\` items and wrap them
with \`Radio.Group\` to set correct value and get events on select.

And that's it, we have implemented simple form layout.
  `,
    {
      title: 'Final step: Radio group'
    }
  )
  .addExample('tutorials/Forms/story/Forms.final.example.tsx', {
    id: 'forms-5'
  }) // picasso-skip-visuals
