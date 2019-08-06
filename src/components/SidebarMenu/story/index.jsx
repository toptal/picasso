import PicassoBook from '~/.storybook/components/PicassoBook'

import { SidebarMenu } from '../SidebarMenu'

const page = PicassoBook.createPage('SidebarMenu', `<-- description -->`)

page
  .createTabChapter('Props')
  .addComponentDocs({ component: SidebarMenu, name: 'SidebarMenu' })

page.createChapter()
