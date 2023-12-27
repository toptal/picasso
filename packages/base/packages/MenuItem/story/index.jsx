import { MenuItem } from '../MenuItem'
import PicassoBook from '~/.storybook/components/PicassoBook'

const chapter = PicassoBook.connectToPage(page =>
  page
    .createChapter('Menu.Item', 'An Item component')
    .addExample('MenuItem/story/Router.example.tsx', {
      title: 'Usage with react-router',
      takeScreenshot: false,
    })
)

const componentDocs = PicassoBook.createComponentDocs(MenuItem, 'Menu.Item')

export default {
  chapter,
  componentDocs,
}
