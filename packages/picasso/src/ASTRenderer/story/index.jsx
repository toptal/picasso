import { ASTRenderer } from '../ASTRenderer'
import PicassoBook from '~/.storybook/components/PicassoBook'

const page = PicassoBook.section('Components').createPage('ASTRenderer')

page
  .createTabChapter('Props')
  .addComponentDocs({ component: ASTRenderer, name: 'ASTRenderer' })

page
  .createChapter()
  .addExample('ASTRenderer/story/Default.example.tsx', 'Default') // picasso-skip-visuals
