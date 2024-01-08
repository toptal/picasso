import PageTopBar from '../PageTopBar'
import TopBarMenu from '../TopBarMenu'
import TopBarItem from '../TopBarItem'

export const PageTopBarCompound = Object.assign(PageTopBar, {
  Menu: TopBarMenu,
  Item: TopBarItem,
})
