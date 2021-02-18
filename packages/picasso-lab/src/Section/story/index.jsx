import { Section } from '../Section'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage('Section', '123')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Section, name: 'Section' })

page.createChapter().addExample('Section/story/Default.example.tsx', {
  title: 'Default',
  takeScreenshot: true
})
