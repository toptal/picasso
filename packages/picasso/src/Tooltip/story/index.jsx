import { Tooltip } from '../Tooltip'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Overlays').createPage(
  'Tooltip',
  `
    Tooltips display informative text when users hover over, focus on, or tap an element
    
    ${PicassoBook.createBaseDocsLink(
      'https://share.goabstract.com/ab7bce05-1d32-4074-aef0-eb5f705c1c04?collectionLayerId=35500bab-2fc9-4120-8789-f96ed95ad683&mode=design&present=true'
    )}
  `
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Tooltip,
    name: 'Tooltip',
    additionalDocs: {
      delay: {
        type: 'enum',
        enums: ['short', 'long']
      }
    }
  })
  .addTextSection(
    `
  Note: On mobile, the tooltip is immediately displayed when the user presses the element.
  `
  )

page
  .createChapter()
  .addExample('Tooltip/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/Placement.example.tsx', {
    title: 'Placement',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/Trigger.example.tsx', {
    title: 'Trigger',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/Interactive.example.tsx', {
    title: 'Interactive',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/ControlListeners.example.tsx', {
    title: 'Control Listeners',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/DisabledElement.example.tsx', {
    title: 'Tooltip on disabled element',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/Delay.example.tsx', {
    title: 'Delay',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/Compact.example.tsx', {
    title: 'Compact',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/MaxWidth.example.tsx', {
    title: 'Max Width',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/FollowCursor.example.tsx', {
    title: 'Follow Cursor',
    takeScreenshot: false
  })
  .addExample('Tooltip/story/Dropdown.example.tsx', {
    title: 'Inside of a Dropdown',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')

      await makeScreenshot({ isFullScreen: true })
    },
    takeScreenshot: false
  })
