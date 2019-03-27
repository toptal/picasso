import PicassoBook from '../../../.storybook/components/PicassoBook'
import { Dropdown } from '../Dropdown'

const page = PicassoBook.createPage(
  'Dropdown',
  'Use Dropdown to show adittional content or context menu after user performs click on triggerable element.'
)

page
  .addComponentDocs(Dropdown)
  .addExample('Dropdown/story/Default.example.jsx', 'Default')
  .addExample(
    'Dropdown/story/CustomTrigger.example.jsx',
    'Custom trigger element'
  )
  .addExample(
    'Dropdown/story/CustomContent.example.jsx',
    'Custom content element'
  )
  .addExample(
    'Dropdown/story/CustomTriggerContent.example.jsx',
    'Fully customized content and trigger'
  )
