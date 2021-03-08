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
      variant: {
        type: 'enum',
        enums: ['light', 'dark']
      },
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
  .addExample('Tooltip/story/Default.example.tsx', 'Default') // picasso-skip-visuals
  .addExample('Tooltip/story/Placement.example.tsx', 'Placement') // picasso-skip-visuals
  .addExample('Tooltip/story/Variant.example.tsx', 'Variant') // picasso-skip-visuals
  .addExample('Tooltip/story/Trigger.example.tsx', 'Trigger') // picasso-skip-visuals
  .addExample('Tooltip/story/Interactive.example.tsx', 'Interactive') // picasso-skip-visuals
  .addExample('Tooltip/story/ControlListeners.example.tsx', 'Control Listeners') // picasso-skip-visuals
  .addExample(
    'Tooltip/story/DisabledElement.example.tsx',
    'Tooltip on disabled element'
  ) // picasso-skip-visuals
  .addExample('Tooltip/story/Delay.example.tsx', 'Delay') // picasso-skip-visuals
  .addExample('Tooltip/story/Compact.example.tsx', 'Compact') // picasso-skip-visuals
  .addExample('Tooltip/story/MaxWidth.example.tsx', 'Max Width') // picasso-skip-visuals
  .addExample('Tooltip/story/Dropdown.example.tsx', {
    title: 'Inside of a Dropdown',
    effect: async (testPage, makeScreenshot) => {
      await testPage.click('[data-testid="trigger"]')

      await makeScreenshot({ isFullScreen: true })
    }
  }) // picasso-skip-visuals
