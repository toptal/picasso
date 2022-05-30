import { Section } from '../Section'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage(
  'Section',
  'Use sections to organize content on the page'
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
        enums: ['bordered', 'default', 'withHeaderBar']
      },
      defaultValue: 'default'
    }
  }
})

page.createChapter().addExample('Section/story/Default.example.tsx', {
  title: 'Default',
  takeScreenshot: false
}) // picasso-skip-visuals
page.createChapter().addExample('Section/story/Actions.example.tsx', {
  title: 'With Actions',
  takeScreenshot: false
}) // picasso-skip-visuals
page.createChapter().addExample('Section/story/Collapsible.example.tsx', {
  title: 'Collapsible',
  takeScreenshot: false
}) // picasso-skip-visuals
page.createChapter().addExample('Section/story/Variant.example.tsx', {
  title: 'Variant',
  takeScreenshot: false
}) // picasso-skip-visuals
page.createChapter().addExample('Section/story/TitleSize.example.tsx', {
  title: 'Title Size',
  takeScreenshot: false
}) // picasso-skip-visuals
