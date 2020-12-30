import PicassoBook from '~/.storybook/components/PicassoBook'

const spacingsPage = PicassoBook.section('Tutorials').createPage(
  'How to use spacings',
  'Explain goal of this tutorial'
)

/** Introduction */
spacingsPage
  .createChapter()
  .addTextSection(
    `
In this tutorial you will learn how to create simple card component using
[\`Container\`](..?path=/story/layout-folder--container) component from Picasso. 
We will focus on explaning inner and outer spacings and stacking of components using flexbox.
Card will render info about job position opening and will show status of filling the position
with list of candidates in a pipeline.

### Goals
 * Explain \`Container\` component
 * How to define inner/outer spacings
 * How to layout component
`
  )
  .addExample('tutorials/Spacings/story/Spacings.final.example.tsx', {
    title: 'End result'
  }) // picasso-skip-visuals

/** Tutorial */
const tutorialChapter = spacingsPage.createChapter(
  'Tutorial',
  'Step-by-step guide to create simple card component'
)

/** First step */
tutorialChapter
  .addTextSection(
    `
We will start with defining basic card container by using
[\`Paper\`](..?path=/story/layout-folder--paper) and [\`Container\`](..?path=/story/layout-folder--container)
component to get elevated item with inner spacing. 

We are using \`padded='medium'\` container's prop to define inner spacing and it is translated to
\`padding: 1.5em\`. You can also pass numeric value that represents \`em\` unit, but we are recommending
use of size types: \`xsmall, small, medium and large\` to get standard spacings.
  `,
    {
      title: 'First step: Define Card container'
    }
  )
  .addExample('tutorials/Spacings/story/Spacings.1.example.tsx', {
    id: 'spacings-1'
  }) // picasso-skip-visuals

/** Second step */
tutorialChapter
  .addTextSection(
    `
Let's add Card header that will contain info about job position name, number of open positions and 
in the right side of the card indicator that represents the status of a process.

We want to create two items in a row, one item will contain position name and number, and another item will
contain an indicator. Plus, first item should go to left, and second item to right. \`Container\` can use flexbox
functionality to define such layout but we need to pass \`flex\` prop to it. By default, it behaves as \`block\`.

As you can see we are creating a layout by composing containers inside other containers. We could say \`Container\`
is a basic building block along with \`Grid\`.
  `,
    {
      title: 'Second step: Add Card header'
    }
  )
  .addExample('tutorials/Spacings/story/Spacings.2.example.tsx', {
    id: 'spacings-2'
  }) // picasso-skip-visuals

/** Third step */
tutorialChapter
  .addTextSection(
    `
We have a list of candidates with their avatar picture so we will use
[\`Avatar\`](..?path=/story/components-folder--avatar) component to render each item
in a card. For this example we can use \`Grid\` but we will use \`Container\` to show some tricks with
layouts and spacings.

Let's add new \`Container\` in a card and define it as a \`flex\` and by
default get horizontal stacking of items in a row. Each job candidate item is implemented as
\`JobCandidate\` component and passed as children of the container. We want some spacing between
them so we will add some right margin using \`right\` container prop.

Card header and candidate list are to close to each other so we will also add a bottom margin to
header container using \`bottom\` prop.

And that's it, we have implemented a simple job position card.
  `,
    {
      title: 'Third step: Render candidates list'
    }
  )
  .addExample('tutorials/Spacings/story/Spacings.final.example.tsx', {
    id: 'spacings-3'
  }) // picasso-skip-visuals
