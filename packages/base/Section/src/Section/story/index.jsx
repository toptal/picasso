import { Section } from '../Section'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Section',
  `Use sections to organize content on the page
  
  ${PicassoBook.createSourceLink(__filename)}
  `
)

page.createTabChapter('Props').addComponentDocs({
  component: Section,
  name: 'Section',
  additionalDocs: {
    variant: {
      name: 'variant',
      description: 'The variant to use',
      type: {
        name: 'enum',
        enums: ['bordered', 'default', 'withHeaderBar'],
      },
      defaultValue: 'default',
    },
  },
})

page.createChapter().addExample('Section/story/Default.example.tsx', 'Default')
page
  .createChapter()
  .addExample('Section/story/Actions.example.tsx', 'With Actions')
page
  .createChapter()
  .addExample('Section/story/Collapsible.example.tsx', 'Collapsible')
page.createChapter().addExample('Section/story/Variant.example.tsx', 'Variant')
page
  .createChapter()
  .addExample('Section/story/TitleSize.example.tsx', 'Title Size')
