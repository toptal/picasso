import { Section } from '../Section'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Picasso Lab').createPage('Section')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: Section, name: 'Section' })

page.createChapter().addExample('Section/story/Table.example.tsx', {
  title: 'Table',
  takeScreenshot: true
})
