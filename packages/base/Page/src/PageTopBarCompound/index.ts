import { PageTopBar } from '../PageTopBar'
import { TopBarMenu } from '../TopBarMenu'
import { TopBarItem } from '../TopBarItem'

type PageTopBarCompoundType = typeof PageTopBar & {
  Menu: typeof TopBarMenu
  Item: typeof TopBarItem
}

export const PageTopBarCompound: PageTopBarCompoundType = Object.assign(
  PageTopBar,
  {
    Menu: TopBarMenu,
    Item: TopBarItem,
  }
)
