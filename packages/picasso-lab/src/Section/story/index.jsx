import { Section } from '../Section'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage(
  'Section',
  'Use sections to organize content on the page'
)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Section, name: 'Section' })

page.createChapter().addExample('Section/story/Default.example.tsx', 'Default')
page
  .createChapter()
  .addExample('Section/story/Collapsible.example.tsx', 'Collapsible')
