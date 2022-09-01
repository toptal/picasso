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
  .addExample('TypographyOverflow/story/Default.example.tsx', {
    title: 'Default',
    takeScreenshot: false,
  })
  .addExample('TypographyOverflow/story/Multiline.example.tsx', {
    title: 'Multiline',
    takeScreenshot: false,
  })
  .addExample('TypographyOverflow/story/CheckboxLabel.example.tsx', {
    title: 'Checkbox label',
    takeScreenshot: false,
  })
  .addExample('TypographyOverflow/story/CustomTooltip.example.tsx', {
    title: 'Custom tooltip content',
    takeScreenshot: false,
  })
  .addExample('TypographyOverflow/story/Delay.example.tsx', {
    title: 'Delay',
    takeScreenshot: false,
  })
