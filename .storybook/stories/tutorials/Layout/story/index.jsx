import PicassoBook from '~/.storybook/components/PicassoBook'

const layoutPage = PicassoBook.createPage(
  'How to layout a page',
  'Learn how to create page layouts using Picasso Grid component along with Page and Container components.',
  'Tutorials'
)

/** Introduction */
layoutPage
  .createChapter()
  .addTextSection(
    `
In this tutorial you will learn how to create page layouts from scratch using components from Picasso.
We will focus on using \`Page\`, \`Grid\` and \`Container\` components to create simple page layout consisting of
header, footer, sidebar and main content.

### Goals
 * Explain \`Page\` component and it's childs components
 * Show how \`Grid\` and \`Grid.Item\` is used to create responsive layouts
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

\`Page\` consists of \`Page.Header\`, \`Page.Footer\` and \`Page.Content\` so when we import it we
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
We want to make them responsive so we will use [\`Grid\`](..?path=/story/layout-folder--grid) component.

\`Grid\` component is based on flexbox and 12-column grid layout that supports breakpoints and spacings between items.
It allows us to create consistent layout across different screen sizes.

Let's import \`Grid\` from Picasso library and then define a grid with two items using \`Grid.Item\`, one for sidebar
and other for main content section. We want to have them in different ratios for different screen sizes based on
[breakpoints](..?path=/story/utils-folder--breakpoints) so we are using \`medium\` and \`large\` props to define ratio.
We didn't specify ratio for \`small\` breakpoint, so it will automatically keep ratio defined for the medium breakpoint.
Also, we don't need any spacing between those 2 items. 

Because this is a specific case we need to define some styling for grid components to remove margins and give components
full height. We are doing this using \`styled-components\`.
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
For the sidebar we want to have various items stacked vertically with some spacing between them.
Each item will have an icon and label. \`Grid\` is based on the flexbox and we can use \`direction\`
and \`alignItems\` props to define vertical stacking of the items. We need to keep in mind to wrap each
item with \`Grid.Item\` for proper functioning of layout.

We extracted item implementation into \`SidebarItem\` component to make our code more readable and
used grid for defining layout of label and icon. Each item should have hover and we want to add
some inner spacing for each item so we used [\`Container\`](..?path=/story/layout-folder--container)
component to add some padding.
  `,
    {
      title: 'Third step: Sidebar items'
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
showing us talent details. We use \`Container\` component to define inner spacings of the root and
talent details container.

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
