import PicassoBook from '.storybook/components/PicassoBook'

import { Tooltip } from '../Tooltip'

const page = PicassoBook.createPage(
  'Tooltip',
  'Tooltips display informative text when users hover over, focus on, or tap an element'
)

page
  .addComponentDocs(Tooltip, {
    placement: {
      type: 'enum',
      enums: ['bottom', 'left', 'right', 'top']
    },
    variant: {
      type: 'enum',
      enums: ['light', 'dark']
    }
  })
  .addExample('Tooltip/story/Default.example.jsx', 'Default')
  .addExample('Tooltip/story/Placement.example.jsx', 'Placement')
  .addExample('Tooltip/story/Arrow.example.jsx', 'Arrow')
  .addExample('Tooltip/story/Variant.example.jsx', 'Variant')
  .addExample('Tooltip/story/Trigger.example.jsx', 'Trigger') // picasso-skip-visuals
  .addExample('Tooltip/story/Interactive.example.jsx', 'Interactive') // picasso-skip-visuals
