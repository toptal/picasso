import { SidebarLogo } from '../SidebarLogo'
import PicassoBook from '~/.storybook/components/PicassoBook'

const componentDocs = PicassoBook.createComponentDocs(
  SidebarLogo,
  'Sidebar.Logo'
)

export default {
  componentDocs,
}
