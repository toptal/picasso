import { Menu } from '../Menu'
import { MenuItem } from '../MenuItem'

type MenuCompoundType = typeof Menu & {
  Item: typeof MenuItem
}

export const MenuCompound: MenuCompoundType = Object.assign(Menu, {
  Item: MenuItem,
})
