import type { ReactElement } from 'react'
import type React from 'react'

import useMenuItemKey from '../use-menu-item-key'
import useSlideMenuItem from '../use-slide-menu-item'
import useDrilldownMenuItem from '../use-drilldown-menu-item'

interface Props {
  menu?: ReactElement
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
  onMouseEnter?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}

const useMenuItem = (props: Props) => {
  const { menu, onClick, onMouseEnter } = props
  const key = useMenuItemKey()

  const { openSlideMenuWithKeyboard, ...slide } = useSlideMenuItem({
    key,
    menu,
    onClick,
  })
  const { openDrilldownMenuWithKeyboard, ...drilldown } = useDrilldownMenuItem({
    key,
    menu,
    onMouseEnter,
  })

  const openMenuWithKeyboard = () => {
    openSlideMenuWithKeyboard()
    openDrilldownMenuWithKeyboard()
  }

  return {
    ...slide,
    ...drilldown,
    openMenuWithKeyboard,
  }
}

export default useMenuItem
