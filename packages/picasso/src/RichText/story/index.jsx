import { RichText } from '../RichText'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('RichText')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: RichText, name: 'RichText' })

page.createChapter().addExample('RichText/story/Default.example.tsx', 'Default') // picasso-skip-visuals
