import PicassoBook from '~/.storybook/components/PicassoBook'

const layoutPage = PicassoBook.section('Tutorials').createPage(
  'How to layout a page',
  'Learn how to create page layouts using Picasso Grid component along with Page and Container components.'
)

/** Introduction */
layoutPage
  .createChapter()
  .addTextSection(
    `
In this tutorial you will learn how to create page layouts from scratch using components from Picasso.
We will focus on using \`Page\` and \`Container\` components to create simple page layout consisting of
header, footer, sidebar and main content.

### Goals
 * Explain \`Page\` component and it's childs components
 * Usage of \`Container\` for defining spacings of components
`
  )
  .addExample('tutorials/Layout/story/Layout.final.example.jsx', {
    title: 'End result'
  })

/** Tutorial */
const tutorialChapter = layoutPage.createChapter(
  'Tutorial',
  'Step-by-step guide to create page layout'
)

/** First step */
tutorialChapter
  .addTextSection(
    `
We will start with defining basic page layout containing header, content and footer. BASE design specifies
how should page look like and Picasso provides implementation with [\`Page\`](..?path=/story/layout-folder--page) component.

The first step is to import Page component from our library \`@toptal/picasso\`. Each component that you will
need is imported in the same way:

~~~javascript
import { Page } from '@toptal/picasso'
~~~

\`Page\` consists of \`Page.TopBar\`, \`Page.Footer\` and \`Page.Content\` so when we import it we
automatically have all necessary components to define our base page layout. Idea is to use composition
pattern and pass props to each component to define e.g. page title, footer links or in most cases
content in \`Page.Content\`.
  `,
    {
      title: 'First step: Define page'
    }
  )
  .addExample('tutorials/Layout/story/Layout.1.example.jsx', {
    id: 'layout-1'
  }) // picasso-skip-visuals

/** Second step */
tutorialChapter
  .addTextSection(
    `
Great, now that we have basic layout let's divide content part of the page into a left sidebar and main content sections.
We will use [\`Container\`](..?path=/story/layout-folder--container) component for placing them side by side by using \`flex\` property.

Because this is a specific case we need to define some styling for wrapper container component to give it full height. We are doing this using \`styled-components\`.
Also, for demonstration purposes, it's been added additional padding for Sidebar and the Main Content.
  `,
    {
      title: 'Second step: Implement sidebar and main content layout'
    }
  )
  .addExample('tutorials/Layout/story/Layout.2.example.jsx', {
    id: 'layout-2'
  }) // picasso-skip-visuals

/** Third step */
tutorialChapter
  .addTextSection(
    `
To add the sidebar menu we will be using [\`Sidebar\`](..?path=/story/lab-folder--sidebar) component,
which is a part of Picasso librabry. It should fill all available height of the left column.
  `,
    {
      title: 'Third step: Sidebar menu'
    }
  )
  .addExample('tutorials/Layout/story/Layout.3.example.jsx', {
    id: 'layout-3'
  }) // picasso-skip-visuals

/** Forth step */
tutorialChapter
  .addTextSection(
    `
Main content can have various layouts, but for this tutorial, we choose to have simple item
showing us talent details. We use [\`Container\`](..?path=/story/utils-folder--container) component
to define inner spacings of the root and talent details container. Also, because we use a flexbox wrapper
around the page, we need to make MainContent grow and fill all available space.

Picasso defines standard BASE [colors](..?path=/story/utils-folder--colors) so we can
easily set color of containers by using \`palette\`.

Talent details item is using \`Typography\` with different variants and \`Table\` for structuring
data.

And that's it, we have implemented our goal.
  `,
    {
      title: 'Forth step: Main content'
    }
  )
  .addExample('tutorials/Layout/story/Layout.final.example.jsx', {
    id: 'layout-4'
  }) // picasso-skip-visuals
