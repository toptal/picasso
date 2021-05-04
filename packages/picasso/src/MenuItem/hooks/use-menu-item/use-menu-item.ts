import React, { ReactElement } from 'react'

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

  return {
    ...useSlideMenuItem({ key, menu, onClick }),
    ...useDrilldownMenuItem({ key, menu, onMouseEnter })
  }
}

export default useMenuItem
