import PicassoBook from '~/.storybook/components/PicassoBook'

import { SidebarItem } from '../SidebarItem'

const page = PicassoBook.createPage('SidebarItem', `<-- description -->`)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: SidebarItem, name: 'SidebarItem' })

page.createChapter()
