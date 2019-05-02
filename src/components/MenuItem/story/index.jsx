import PicassoBook from '~/.storybook/components/PicassoBook'

import { MenuItem } from '../MenuItem'

const chapter = PicassoBook.connectToPage(page => page)

const componentDocs = PicassoBook.createComponentDocs(MenuItem, 'Menu.Item')

export default {
  chapter,
  componentDocs
}
