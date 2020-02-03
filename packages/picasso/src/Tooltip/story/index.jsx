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
    name: 'Timesheets',
    additionalDocs: {
      placement: {
        type: 'enum',
        enums: ['bottom', 'left', 'right', 'top']
      },
      variant: {
        type: 'enum',
        enums: ['light', 'dark']
      }
    }
  })
  .addTextSection(
    `
  Note: On mobile, the tooltip is displayed when the user long-presses the element and hides after a delay of 1500ms.
  `
  )

page
  .createChapter()
  .addExample('Tooltip/story/Default.example.jsx', 'Default')
  .addExample('Tooltip/story/Placement.example.jsx', 'Placement')
  .addExample('Tooltip/story/Arrow.example.jsx', 'Arrow')
  .addExample('Tooltip/story/Variant.example.jsx', 'Variant')
  .addExample('Tooltip/story/Trigger.example.jsx', 'Trigger') // picasso-skip-visuals
  .addExample('Tooltip/story/Interactive.example.jsx', 'Interactive') // picasso-skip-visuals
  .addExample('Tooltip/story/ControlListeners.example.tsx', 'Control Listeners') // picasso-skip-visuals
  .addExample(
    'Tooltip/story/DisabledElement.example.tsx',
    'Tooltip on disabled element'
  ) // picasso-skip-visuals
