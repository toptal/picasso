import { Tooltip } from '../Tooltip'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Overlays').createPage(
  'Tooltip',
  'Tooltips display informative text when users hover over, focus on, or tap an element'
)

page
  .createTabChapter('Props')
  .addComponentDocs({
    component: Tooltip,
    name: 'Tooltip',
    additionalDocs: {
      placement: {
        type: 'enum',
        enums: ['bottom', 'left', 'right', 'top']
      },
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
  .addExample('Tooltip/story/Default.example.tsx', 'Default')
  .addExample('Tooltip/story/Placement.example.tsx', 'Placement')
  .addExample('Tooltip/story/Arrow.example.tsx', 'Arrow')
  .addExample('Tooltip/story/Variant.example.tsx', 'Variant')
  .addExample('Tooltip/story/Trigger.example.tsx', 'Trigger') // picasso-skip-visuals
  .addExample('Tooltip/story/Interactive.example.tsx', 'Interactive') // picasso-skip-visuals
  .addExample('Tooltip/story/ControlListeners.example.tsx', 'Control Listeners') // picasso-skip-visuals
  .addExample(
    'Tooltip/story/DisabledElement.example.tsx',
    'Tooltip on disabled element'
  ) // picasso-skip-visuals
  .addExample('Tooltip/story/Delay.example.tsx', 'Delay') // picasso-skip-visuals
  .addExample('Tooltip/story/Compact.example.tsx', 'Compact')
  .addExample('Tooltip/story/MaxWidth.example.tsx', 'Max Width')
