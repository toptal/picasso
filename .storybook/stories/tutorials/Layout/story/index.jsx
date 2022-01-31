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
We will focus on using \`Page\`, \`PageHead\`, \`Section\` components to create simple page layout consisting of
header, footer, sidebar and main content.

### Goals
 * Explain \`Page\` component and it's child components
 * Usage of \`PageHead\` for title of the main content
 * Usage of \`Section\` for defining content sections
`
  )
  .addExample('tutorials/Layout/story/Layout.final.example.tsx', {
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
  .addExample('tutorials/Layout/story/Layout.1.example.tsx', {
    id: 'layout-1'
  }) // picasso-skip-visuals

/** Second step */
tutorialChapter
  .addTextSection(
    `
Great, now that we have basic layout let's divide content part of the page into a left sidebar and main content sections.
We will use [\`Container\`](..?path=/story/layout-folder--container) component for placing them side by side by using \`flex\` property.

For demonstration purposes, it's been added additional padding for Sidebar and the Main Content.
  `,
    {
      title: 'Second step: Implement sidebar and main content layout'
    }
  )
  .addExample('tutorials/Layout/story/Layout.2.example.tsx', {
    id: 'layout-2'
  }) // picasso-skip-visuals

/** Third step */
tutorialChapter
  .addTextSection(
    `
To add the sidebar menu we will be using [\`Sidebar\`](..?path=/story/components-sidebar--sidebar) component,
which is a part of Picasso librabry. It should fill all available height of the left column.
  `,
    {
      title: 'Third step: Sidebar menu'
    }
  )
  .addExample('tutorials/Layout/story/Layout.3.example.tsx', {
    id: 'layout-3'
  }) // picasso-skip-visuals

/** Forth step */
tutorialChapter
  .addTextSection(
    `
Main content can have various layouts, but for this tutorial, we choose to have a title
and two sections. We use [\`PageHead\`](..?path=/story/picasso-pagehead--pagehead) for
the title and [\`Section\`](..?path=/story/components-section--section) for content
sections. Also, it's very important to use use
\`Page.Article\` component, because we use a flexbox wrapper
around the page and we need to make \`MainContent\` grow and fill all available space.
  `,
    {
      title: 'Forth step: Title and sections'
    }
  )
  .addExample('tutorials/Layout/story/Layout.4.example.tsx', {
    id: 'layout-4'
  }) // picasso-skip-visuals

/** Fifth step */
tutorialChapter
  .addTextSection(
    `
We use [\`Container\`](..?path=/story/utils-folder--container) component
to define inner spacings of the talent details container.

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
  .addExample('tutorials/Layout/story/Layout.final.example.tsx', {
    id: 'layout-5'
  }) // picasso-skip-visuals
