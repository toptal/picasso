import { TypographyOverflow } from '../TypographyOverflow'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'TypographyOverflow',
  `Show tooltip when typography overflows
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: TypographyOverflow,
  name: 'TypographyOverflow',
})

page
  .createChapter()
  .addExample(
    'TypographyOverflow/story/Default.example.tsx',
    {
      title: 'Default',
      takeScreenshot: false,
    },
    'base/TypographyOverflow'
  )
  .addExample(
    'TypographyOverflow/story/Multiline.example.tsx',
    {
      title: 'Multiline',
      takeScreenshot: false,
    },
    'base/TypographyOverflow'
  )
  .addExample(
    'TypographyOverflow/story/CheckboxLabel.example.tsx',
    {
      title: 'Checkbox label',
      takeScreenshot: false,
    },
    'base/TypographyOverflow'
  )
  .addExample(
    'TypographyOverflow/story/CustomTooltip.example.tsx',
    {
      title: 'Custom tooltip content',
      takeScreenshot: false,
    },
    'base/TypographyOverflow'
  )
  .addExample(
    'TypographyOverflow/story/Delay.example.tsx',
    {
      title: 'Delay',
      takeScreenshot: false,
    },
    'base/TypographyOverflow'
  )
  .addExample(
    'TypographyOverflow/story/Placement.example.tsx',
    {
      title: 'Placement',
      takeScreenshot: false,
    },
    'base/TypographyOverflow'
  )
